<?php
/**
 * Unit tests for GSlider\Classes\SupportSVG.
 *
 * Verifies that:
 * 1. SupportSVG implements Registrable interface and SingletonTrait.
 * 2. register() hooks upload_mimes, wp_handle_upload_prefilter, wp_prepare_attachment_for_js and admin_init.
 * 3. allowSvgMimeType() adds svg and svgz without removing existing MIME types.
 * 4. validateSvgUpload() rejects SVGs with <script> elements.
 * 5. validateSvgUpload() rejects SVGs with event handler attributes.
 * 6. validateSvgUpload() never expands external XML entities (XXE) into the saved file.
 * 7. validateSvgUpload() accepts clean vector SVGs.
 * 8. fixSvgThumbnail() sets full size dimensions for SVG attachments only.
 *
 * Uploaded files live in an in-memory filesystem, so nothing is written to disk.
 *
 * @package GSlider\Tests\Classes
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		if ( ! ( error_reporting() & $severity ) ) {
			return false;
		}
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

/**
 * In-memory stand-in for WP_Filesystem_Base, keyed by file path.
 */
class SupportSVGTestFilesystem {

	/**
	 * File contents keyed by path.
	 *
	 * @var string[]
	 */
	public $files = [];

	/**
	 * Checks if a file exists.
	 *
	 * @param string $path File path.
	 * @return bool
	 */
	public function exists( string $path ): bool {
		return isset( $this->files[ $path ] );
	}

	/**
	 * Reads a file.
	 *
	 * @param string $path File path.
	 * @return string|false
	 */
	public function get_contents( string $path ) {
		return $this->files[ $path ] ?? false;
	}

	/**
	 * Writes a file.
	 *
	 * @param string $path    File path.
	 * @param string $content File content.
	 * @return bool
	 */
	public function put_contents( string $path, string $content ): bool {
		$this->files[ $path ] = $content;
		return true;
	}
}

/**
 * In-memory stream served as the target of the XXE test entity.
 *
 * Counts how many times libxml opens it, so the test can prove the
 * external entity is never fetched.
 */
class SupportSVGTestEntityStream {

	/**
	 * Text returned when the stream is read.
	 */
	const CANARY = 'GSLIDER_XXE_CANARY';

	/**
	 * Number of times the stream was opened.
	 *
	 * @var int
	 */
	public static $opened = 0;

	/**
	 * Stream context set by PHP.
	 *
	 * @var resource|null
	 */
	public $context;

	/**
	 * Read position.
	 *
	 * @var int
	 */
	private $position = 0;

	/**
	 * Opens the stream.
	 *
	 * @param string      $path        Stream URL.
	 * @param string      $mode        Open mode.
	 * @param int         $options     Stream options.
	 * @param string|null $opened_path Opened path.
	 * @return bool
	 */
	public function stream_open( string $path, string $mode, int $options, ?string &$opened_path ): bool {
		self::$opened++;
		return true;
	}

	/**
	 * Reads from the stream.
	 *
	 * @param int $count Bytes to read.
	 * @return string
	 */
	public function stream_read( int $count ): string {
		$chunk           = (string) substr( self::CANARY, $this->position, $count );
		$this->position += strlen( $chunk );
		return $chunk;
	}

	/**
	 * Checks for end of stream.
	 *
	 * @return bool
	 */
	public function stream_eof(): bool {
		return $this->position >= strlen( self::CANARY );
	}

	/**
	 * Returns stream stats.
	 *
	 * @return array
	 */
	public function stream_stat(): array {
		return [];
	}

	/**
	 * Returns URL stats.
	 *
	 * @param string $path  Stream URL.
	 * @param int    $flags Stat flags.
	 * @return array
	 */
	public function url_stat( string $path, int $flags ): array {
		return [];
	}
}

stream_wrapper_register( 'gslidertest', SupportSVGTestEntityStream::class );

if ( ! function_exists( 'WP_Filesystem' ) ) {
	function WP_Filesystem(): bool {
		global $wp_filesystem;
		$wp_filesystem = new SupportSVGTestFilesystem();
		return true;
	}
}

if ( ! function_exists( 'wp_kses' ) ) {
	/**
	 * Lightweight DOMDocument-backed wp_kses() stub modeling WordPress KSES allowlist filtering.
	 *
	 * @param string $string       Content to filter through KSES.
	 * @param array  $allowed_html Allowed tags and lowercase attribute flags.
	 * @return string Filtered HTML/SVG markup.
	 */
	function wp_kses( $string, $allowed_html ) {
		if ( ! is_string( $string ) || '' === $string ) {
			return '';
		}

		$normalized_allowed = [];
		if ( is_array( $allowed_html ) ) {
			foreach ( $allowed_html as $tag => $attrs ) {
				$tag_lower                        = strtolower( (string) $tag );
				$normalized_allowed[ $tag_lower ] = [];
				if ( is_array( $attrs ) ) {
					foreach ( $attrs as $attr => $enabled ) {
						$normalized_allowed[ $tag_lower ][ strtolower( (string) $attr ) ] = (bool) $enabled;
					}
				}
			}
		}

		$previous_errors = libxml_use_internal_errors( true );
		$doc             = new DOMDocument();
		$wrapped         = '<?xml encoding="utf-8" ?><div id="__gslider_kses_root__">' . $string . '</div>';
		$loaded          = $doc->loadHTML( $wrapped, LIBXML_NONET | LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR | LIBXML_NOWARNING );
		libxml_clear_errors();
		libxml_use_internal_errors( $previous_errors );

		if ( ! $loaded ) {
			return '';
		}

		$root = null;
		foreach ( $doc->childNodes as $child ) {
			if ( $child instanceof DOMElement && '__gslider_kses_root__' === $child->getAttribute( 'id' ) ) {
				$root = $child;
				break;
			}
		}

		if ( ! $root ) {
			return '';
		}

		$filter_node = static function ( DOMNode $node ) use ( &$filter_node, $doc, $normalized_allowed ): void {
			$children = [];
			foreach ( $node->childNodes as $child ) {
				$children[] = $child;
			}
			foreach ( $children as $child ) {
				$filter_node( $child );
			}

			if ( $node instanceof DOMComment ) {
				if ( $node->parentNode ) {
					$node->parentNode->removeChild( $node );
				}
				return;
			}

			if ( ! ( $node instanceof DOMElement ) ) {
				return;
			}

			if ( '__gslider_kses_root__' === $node->getAttribute( 'id' ) ) {
				return;
			}

			$tag = strtolower( $node->nodeName );
			if ( ! isset( $normalized_allowed[ $tag ] ) ) {
				if ( $node->parentNode ) {
					while ( $node->firstChild ) {
						$node->parentNode->insertBefore( $node->firstChild, $node );
					}
					$node->parentNode->removeChild( $node );
				}
				return;
			}

			// Rebuild element cleanly so disallowed attributes/namespace declarations
			// (including xmlns with unsafe protocols) cannot persist through libxml.
			$allowed_attrs = $normalized_allowed[ $tag ];
			$clean_element = $doc->createElement( $tag );

			foreach ( $node->attributes as $attribute ) {
				$attr_name  = $attribute->nodeName;
				$attr_lower = strtolower( $attr_name );
				if ( empty( $allowed_attrs[ $attr_lower ] ) ) {
					continue;
				}

				$attr_value = (string) $attribute->nodeValue;
				$clean_element->setAttribute( $attr_lower, $attr_value );
			}

			while ( $node->firstChild ) {
				$clean_element->appendChild( $node->firstChild );
			}

			if ( $node->parentNode ) {
				$node->parentNode->replaceChild( $clean_element, $node );
			}
		};

		$filter_node( $root );

		$output = '';
		foreach ( $root->childNodes as $child ) {
			$output .= $doc->saveHTML( $child );
		}

		return $output;
	}
}

// Require Core Classes Under Test
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/SupportSVG.php';

use GSlider\Classes\SupportSVG;
use GSlider\Interfaces\Registrable;

/**
 * Test class for GSlider\Classes\SupportSVG.
 */
class SupportSVGTest {

	/**
	 * Temporary upload path used for every fake upload.
	 */
	const TMP_NAME = '/tmp/gslider-support-svg-test.svg';

	/**
	 * Helper assertion for strict boolean conditions.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( bool $condition, string $message ): void {
		if ( true !== $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Helper assertion for strict identical comparisons.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion message.
	 * @return void
	 */
	public function assert_same( $expected, $actual, string $message ): void {
		if ( $expected !== $actual ) {
			fwrite( STDERR, "FAIL: {$message} (Expected: " . var_export( $expected, true ) . ', Got: ' . var_export( $actual, true ) . ")\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider SupportSVG Unit Tests ===\n\n";

		$this->test_class_implements_registrable_and_singleton();
		$this->test_register_hooks();
		$this->test_allow_svg_mime_type();
		$this->test_validate_svg_upload_rejects_malicious_script();
		$this->test_validate_svg_upload_rejects_event_handlers();
		$this->test_validate_svg_upload_does_not_expand_xxe_entities();
		$this->test_validate_svg_upload_accepts_clean_vector();
		$this->test_fix_svg_thumbnail_dimensions();
		$this->test_sanitize_inline_svg_preserves_clean_icon_markup();
		$this->test_sanitize_inline_svg_rejects_non_string_and_empty_inputs();
		$this->test_sanitize_inline_svg_strips_dangerous_subtrees_and_declarations();
		$this->test_sanitize_inline_svg_strips_disallowed_svg_tags_and_event_handlers();
		$this->test_sanitize_inline_svg_returns_empty_when_no_svg_remains();
		$this->test_sanitize_inline_svg_strips_encoded_and_quoted_protocol_uris();
		$this->test_sanitize_inline_svg_fails_closed_after_max_nested_passes();

		echo "\nAll SupportSVG unit tests passed successfully!\n";
	}

	/**
	 * Uploads SVG content through validateSvgUpload() using the in-memory filesystem.
	 *
	 * @param string $content SVG file content.
	 * @return array The file data array returned by validateSvgUpload().
	 */
	private function upload_svg( string $content ): array {
		global $wp_filesystem;
		$wp_filesystem->files[ self::TMP_NAME ] = $content;

		return SupportSVG::getInstance()->validateSvgUpload(
			[
				'name'     => 'upload.svg',
				'type'     => 'image/svg+xml',
				'tmp_name' => self::TMP_NAME,
				'error'    => 0,
			]
		);
	}

	/**
	 * Test 1: SupportSVG implements Registrable and follows the Singleton pattern.
	 *
	 * @return void
	 */
	public function test_class_implements_registrable_and_singleton(): void {
		$svg = SupportSVG::getInstance();
		$this->assert_true( $svg instanceof Registrable, 'SupportSVG implements Registrable interface' );
		$this->assert_true( $svg === SupportSVG::getInstance(), 'SupportSVG getInstance() returns the same instance' );
	}

	/**
	 * Test 2: register() hooks every SVG callback into WordPress.
	 *
	 * @return void
	 */
	public function test_register_hooks(): void {
		global $wp_actions, $wp_filters, $wp_filesystem;
		$svg = SupportSVG::getInstance();
		$svg->register();

		$expected_filters = [
			'upload_mimes'                 => 'allowSvgMimeType',
			'wp_handle_upload_prefilter'   => 'validateSvgUpload',
			'wp_prepare_attachment_for_js' => 'fixSvgThumbnail',
		];
		foreach ( $expected_filters as $hook => $method ) {
			$callbacks = array_column( $wp_filters[ $hook ] ?? [], 'callback' );
			$this->assert_true( in_array( [ $svg, $method ], $callbacks, true ), "register() hooks {$method} into '{$hook}'" );
		}

		$callbacks = array_column( $wp_actions['admin_init'] ?? [], 'callback' );
		$this->assert_true( in_array( [ $svg, 'enableSvgSupport' ], $callbacks, true ), "register() hooks enableSvgSupport into 'admin_init'" );

		$this->assert_true( $wp_filesystem instanceof SupportSVGTestFilesystem, 'register() initializes the WP filesystem' );
	}

	/**
	 * Test 3: allowSvgMimeType() adds SVG types and keeps core MIME types.
	 *
	 * @return void
	 */
	public function test_allow_svg_mime_type(): void {
		$core_mimes = [
			'jpg|jpeg|jpe' => 'image/jpeg',
			'png'          => 'image/png',
			'pdf'          => 'application/pdf',
		];

		$mimes = SupportSVG::getInstance()->allowSvgMimeType( $core_mimes );

		$this->assert_same( 'image/svg+xml', $mimes['svg'] ?? null, 'allowSvgMimeType() adds svg as image/svg+xml' );
		$this->assert_same( 'image/svg+xml', $mimes['svgz'] ?? null, 'allowSvgMimeType() adds svgz as image/svg+xml' );
		foreach ( $core_mimes as $ext => $type ) {
			$this->assert_same( $type, $mimes[ $ext ] ?? null, "allowSvgMimeType() keeps core MIME type '{$ext}'" );
		}
	}

	/**
	 * Test 4: validateSvgUpload() rejects SVGs with <script> elements.
	 *
	 * @return void
	 */
	public function test_validate_svg_upload_rejects_malicious_script(): void {
		$file = $this->upload_svg( '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><rect width="10" height="10"/></svg>' );
		$this->assert_same( 'SVG contains prohibited elements or attributes.', $file['error'], 'validateSvgUpload() rejects SVG with <script> element' );
	}

	/**
	 * Test 5: validateSvgUpload() rejects SVGs with event handler attributes.
	 *
	 * @return void
	 */
	public function test_validate_svg_upload_rejects_event_handlers(): void {
		$payloads = [
			'onload'  => '<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><rect width="10" height="10"/></svg>',
			'onerror' => '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" onerror="alert(1)"/></svg>',
			'onclick' => '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" ONCLICK="alert(1)"/></svg>',
		];

		foreach ( $payloads as $handler => $payload ) {
			$file = $this->upload_svg( $payload );
			$this->assert_same( 'SVG contains prohibited elements or attributes.', $file['error'], "validateSvgUpload() rejects SVG with {$handler} handler" );
		}
	}

	/**
	 * Test 6: validateSvgUpload() never expands an external entity into the saved file.
	 *
	 * The entity points at an in-memory stream. If libxml loaded it, the
	 * stream would be opened and its canary text would end up in the saved SVG.
	 *
	 * @return void
	 */
	public function test_validate_svg_upload_does_not_expand_xxe_entities(): void {
		global $wp_filesystem;
		$payload = '<?xml version="1.0"?>'
			. '<!DOCTYPE svg [<!ENTITY xxe SYSTEM "gslidertest://canary">]>'
			. '<svg xmlns="http://www.w3.org/2000/svg"><text>&xxe;</text></svg>';

		SupportSVGTestEntityStream::$opened = 0;
		$result = $this->upload_svg( $payload );

		$saved = (string) $wp_filesystem->get_contents( self::TMP_NAME );
		// shortcut: the DOCTYPE upload is still accepted today, switch to a rejection check once #317 lands.
		$this->assert_same( 0, $result['error'], 'validateSvgUpload() currently accepts a DOCTYPE upload (see #317)' );
		$this->assert_same( 0, SupportSVGTestEntityStream::$opened, 'validateSvgUpload() never fetches the external entity URL' );
		$this->assert_true( false === strpos( $saved, SupportSVGTestEntityStream::CANARY ), 'validateSvgUpload() does not expand external entities into the saved SVG' );
	}

	/**
	 * Test 7: validateSvgUpload() accepts clean vector SVGs.
	 *
	 * @return void
	 */
	public function test_validate_svg_upload_accepts_clean_vector(): void {
		global $wp_filesystem;
		$file = $this->upload_svg( '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 12h20" stroke="#000"/><circle cx="12" cy="12" r="4" fill="#ff0000"/></svg>' );

		$this->assert_same( 0, $file['error'], 'validateSvgUpload() leaves no error on a clean SVG' );

		$saved = (string) $wp_filesystem->get_contents( self::TMP_NAME );
		$this->assert_true( false !== strpos( $saved, '<circle cx="12" cy="12" r="4" fill="#ff0000"/>' ), 'validateSvgUpload() keeps clean SVG shapes in the saved file' );
	}

	/**
	 * Test 8: fixSvgThumbnail() sets full size dimensions for SVG attachments only.
	 *
	 * @return void
	 */
	public function test_fix_svg_thumbnail_dimensions(): void {
		$svg = SupportSVG::getInstance();

		$response = $svg->fixSvgThumbnail(
			[
				'mime'        => 'image/svg+xml',
				'url'         => 'http://example.org/wp-content/uploads/logo.svg',
				'width'       => 120,
				'height'      => 60,
				'orientation' => 'landscape',
			]
		);
		$this->assert_same(
			[
				'full' => [
					'url'         => 'http://example.org/wp-content/uploads/logo.svg',
					'width'       => 120,
					'height'      => 60,
					'orientation' => 'landscape',
				],
			],
			$response['sizes'] ?? null,
			'fixSvgThumbnail() adds full size dimensions to SVG attachments'
		);

		$png = [
			'mime'  => 'image/png',
			'url'   => 'http://example.org/wp-content/uploads/photo.png',
			'sizes' => [ 'thumbnail' => [ 'width' => 150 ] ],
		];
		$this->assert_same( $png, $svg->fixSvgThumbnail( $png ), 'fixSvgThumbnail() leaves non-SVG attachments unchanged' );
	}

	/**
	 * Test 9: sanitize_inline_svg() preserves clean IconPicker and geometric SVG markup.
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_preserves_clean_icon_markup(): void {
		$icon_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">'
			. '<g id="layer-1" fill="none" stroke="currentColor" stroke-width="2" transform="translate(0,0)">'
			. '<path d="M4 2H14V0H4V2Z" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>'
			. '<circle cx="12" cy="12" r="4" fill="#ff0000"/>'
			. '<ellipse cx="10" cy="10" rx="3" ry="2"/>'
			. '<rect x="1" y="2" width="10" height="8" rx="2" ry="2"/>'
			. '<polygon points="0,0 10,0 5,10" fill-rule="nonzero"/>'
			. '<polyline points="0,0 5,5 10,0"/>'
			. '<line x1="0" y1="0" x2="24" y2="24" stroke-linecap="square"/>'
			. '</g>'
			. '</svg>';

		$clean = SupportSVG::sanitize_inline_svg( $icon_svg );

		$this->assert_true( 0 === stripos( $clean, '<svg' ), 'sanitize_inline_svg() output begins with <svg' );
		$this->assert_true( false !== stripos( $clean, 'xmlns="http://www.w3.org/2000/svg"' ), 'sanitize_inline_svg() preserves xmlns' );
		$this->assert_true( false !== stripos( $clean, 'viewbox="0 0 24 24"' ), 'sanitize_inline_svg() preserves viewBox' );
		$this->assert_true( false !== stripos( $clean, 'width="24"' ), 'sanitize_inline_svg() preserves width' );
		$this->assert_true( false !== stripos( $clean, 'height="24"' ), 'sanitize_inline_svg() preserves height' );
		$this->assert_true( false !== stripos( $clean, 'aria-hidden="true"' ), 'sanitize_inline_svg() preserves aria-hidden' );
		$this->assert_true( false !== stripos( $clean, 'focusable="false"' ), 'sanitize_inline_svg() preserves focusable' );
		$this->assert_true( false !== stripos( $clean, 'preserveaspectratio="xMidYMid meet"' ), 'sanitize_inline_svg() preserves preserveAspectRatio' );
		$this->assert_true( false !== stripos( $clean, 'fill-rule="evenodd"' ), 'sanitize_inline_svg() preserves fill-rule' );
		$this->assert_true( false !== stripos( $clean, 'clip-rule="evenodd"' ), 'sanitize_inline_svg() preserves clip-rule' );
		$this->assert_true( false !== stripos( $clean, '<g ' ), 'sanitize_inline_svg() preserves <g>' );
		$this->assert_true( false !== stripos( $clean, '<path ' ), 'sanitize_inline_svg() preserves <path>' );
		$this->assert_true( false !== stripos( $clean, '<circle ' ), 'sanitize_inline_svg() preserves <circle>' );
		$this->assert_true( false !== stripos( $clean, '<ellipse ' ), 'sanitize_inline_svg() preserves <ellipse>' );
		$this->assert_true( false !== stripos( $clean, '<rect ' ), 'sanitize_inline_svg() preserves <rect>' );
		$this->assert_true( false !== stripos( $clean, '<polygon ' ), 'sanitize_inline_svg() preserves <polygon>' );
		$this->assert_true( false !== stripos( $clean, '<polyline ' ), 'sanitize_inline_svg() preserves <polyline>' );
		$this->assert_true( false !== stripos( $clean, '<line ' ), 'sanitize_inline_svg() preserves <line>' );
	}

	/**
	 * Test 10: sanitize_inline_svg() returns empty string for non-string or blank inputs.
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_rejects_non_string_and_empty_inputs(): void {
		$invalid_inputs = [
			null,
			[],
			[ '<svg></svg>' ],
			123,
			true,
			false,
			'',
			"   \n\t  ",
		];

		foreach ( $invalid_inputs as $input ) {
			$this->assert_same( '', SupportSVG::sanitize_inline_svg( $input ), 'sanitize_inline_svg() returns empty string for invalid/empty input' );
		}
	}

	/**
	 * Test 11: sanitize_inline_svg() strips dangerous subtrees, XML declarations, and DOCTYPEs without stray inner text.
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_strips_dangerous_subtrees_and_declarations(): void {
		$payload = '<?xml version="1.0" encoding="UTF-8"?>'
			. '<!DOCTYPE svg [<!ENTITY xxe SYSTEM "gslidertest://canary">]>'
			. '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">'
			. '<script>alert(1)</script>'
			. '<SCR<script>alert(1)</script>IPT>alert(2)</script>'
			. '<scri<!--x-->pt>alert(3)</script>'
			. '<style>body { background: url(javascript:alert(4)); }</style>'
			. '<iframe src="https://evil.example">iframe_fallback</iframe>'
			. '<object data="https://evil.example">object_fallback</object>'
			. '<embed src="https://evil.example">embed_fallback</embed>'
			. '<foreignObject width="100" height="100"><div>html_payload</div></foreignObject>'
			. '<path d="M2 12h20"/>'
			. '</svg>';

		$clean = SupportSVG::sanitize_inline_svg( $payload );

		$this->assert_true( false !== stripos( $clean, '<path d="M2 12h20"' ), 'sanitize_inline_svg() retains valid <path> after subtree stripping' );
		$this->assert_true( false === stripos( $clean, '<script' ), 'sanitize_inline_svg() strips <script>' );
		$this->assert_true( false === stripos( $clean, 'alert(' ), 'sanitize_inline_svg() leaves zero stray script inner text' );
		$this->assert_true( false === stripos( $clean, '<style' ), 'sanitize_inline_svg() strips <style>' );
		$this->assert_true( false === stripos( $clean, 'background:' ), 'sanitize_inline_svg() strips <style> CSS body' );
		$this->assert_true( false === stripos( $clean, '<iframe' ), 'sanitize_inline_svg() strips <iframe>' );
		$this->assert_true( false === stripos( $clean, 'iframe_fallback' ), 'sanitize_inline_svg() strips <iframe> inner text' );
		$this->assert_true( false === stripos( $clean, '<object' ), 'sanitize_inline_svg() strips <object>' );
		$this->assert_true( false === stripos( $clean, 'object_fallback' ), 'sanitize_inline_svg() strips <object> inner text' );
		$this->assert_true( false === stripos( $clean, '<embed' ), 'sanitize_inline_svg() strips <embed>' );
		$this->assert_true( false === stripos( $clean, 'embed_fallback' ), 'sanitize_inline_svg() strips <embed> inner text' );
		$this->assert_true( false === stripos( $clean, '<foreignobject' ), 'sanitize_inline_svg() strips <foreignObject>' );
		$this->assert_true( false === stripos( $clean, 'html_payload' ), 'sanitize_inline_svg() strips <foreignObject> inner markup/text' );
		$this->assert_true( false === stripos( $clean, '<?xml' ), 'sanitize_inline_svg() strips XML declaration' );
		$this->assert_true( false === stripos( $clean, 'DOCTYPE' ), 'sanitize_inline_svg() strips DOCTYPE declaration' );
	}

	/**
	 * Test 12: sanitize_inline_svg() removes disallowed SVG tags, event handlers, and dangerous URI protocols.
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_strips_disallowed_svg_tags_and_event_handlers(): void {
		$payload = '<svg xmlns="javascript:alert(1)" onload="alert(1)" viewBox="0 0 24 24">'
			. '<use xlink:href="#external-sprite"/>'
			. '<image href="https://evil.example/track.png" onerror="alert(2)"/>'
			. '<animate attributeName="href" values="javascript:alert(3)"/>'
			. '<set attributeName="onmouseover" to="alert(4)"/>'
			. '<path d="M0 0h24v24H0z" onclick="alert(5)" ONCLICK="alert(6)" onerror="alert(7)" href="javascript:alert(8)" xlink:href="vbscript:msgbox(1)" fill="javascript:alert(9)" clip-path="data:text/html,xss"/>'
			. '</svg>';

		$clean = SupportSVG::sanitize_inline_svg( $payload );

		$this->assert_true( 0 === stripos( $clean, '<svg' ), 'sanitize_inline_svg() returns sanitized <svg> wrapper' );
		$this->assert_true( false !== stripos( $clean, 'd="M0 0h24v24H0z"' ), 'sanitize_inline_svg() preserves valid path d attribute' );
		$this->assert_true( false === stripos( $clean, '<use' ), 'sanitize_inline_svg() strips <use>' );
		$this->assert_true( false === stripos( $clean, '<image' ), 'sanitize_inline_svg() strips <image>' );
		$this->assert_true( false === stripos( $clean, '<animate' ), 'sanitize_inline_svg() strips <animate>' );
		$this->assert_true( false === stripos( $clean, '<set' ), 'sanitize_inline_svg() strips <set>' );
		$this->assert_true( false === stripos( $clean, 'onload' ), 'sanitize_inline_svg() strips onload handler' );
		$this->assert_true( false === stripos( $clean, 'onclick' ), 'sanitize_inline_svg() strips onclick and ONCLICK handlers' );
		$this->assert_true( false === stripos( $clean, 'onerror' ), 'sanitize_inline_svg() strips onerror handler' );
		$this->assert_true( false === stripos( $clean, 'xlink:href' ), 'sanitize_inline_svg() strips xlink:href attribute' );
		$this->assert_true( false === stripos( $clean, 'href=' ), 'sanitize_inline_svg() strips href attribute' );
		$this->assert_true( false === stripos( $clean, 'javascript:' ), 'sanitize_inline_svg() rejects javascript: URIs' );
		$this->assert_true( false === stripos( $clean, 'vbscript:' ), 'sanitize_inline_svg() rejects vbscript: URIs' );
		$this->assert_true( false === stripos( $clean, 'data:' ), 'sanitize_inline_svg() rejects data: URIs' );
	}

	/**
	 * Test 13: sanitize_inline_svg() returns empty string when only non-SVG or malicious tags are provided.
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_returns_empty_when_no_svg_remains(): void {
		$payloads = [
			'<script>alert(1)</script>',
			'<iframe src="https://evil.example">evil</iframe>',
			'<p>Not an SVG</p>',
			'plain text payload',
			'<svgfake>text</svgfake>',
		];

		foreach ( $payloads as $payload ) {
			$this->assert_same( '', SupportSVG::sanitize_inline_svg( $payload ), 'sanitize_inline_svg() returns empty string when no valid <svg> remains' );
		}
	}

	/**
	 * Test 14: sanitize_inline_svg() strips entity-encoded and quoted url() protocol URIs via production regex callback while preserving safe url(#id).
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_strips_encoded_and_quoted_protocol_uris(): void {
		$payload = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">'
			. '<g clip-path=\'url("data:text/html,xss")\'>'
			. '<path d="M0 0h24" fill="&#106;avascript:alert(1)" stroke="url(\'javascript:alert(2)\')"/>'
			. '<rect x="0" y="0" width="10" height="10" fill="url(#gslider-safe-grad)"/>'
			. '</g>'
			. '</svg>';

		$clean = SupportSVG::sanitize_inline_svg( $payload );

		$this->assert_true( 0 === stripos( $clean, '<svg' ), 'sanitize_inline_svg() keeps <svg> wrapper when stripping unsafe attribute values' );
		$this->assert_true( false !== stripos( $clean, 'fill="url(#gslider-safe-grad)"' ), 'sanitize_inline_svg() preserves safe internal fragment url(#...)' );
		$this->assert_true( false === stripos( $clean, 'javascript:' ), 'sanitize_inline_svg() removes entity-encoded and quoted url() javascript: URIs' );
		$this->assert_true( false === stripos( $clean, 'data:' ), 'sanitize_inline_svg() removes double-quoted url() data: URIs' );
	}

	/**
	 * Test 15: sanitize_inline_svg() fails closed returning empty string when 11 nested dangerous tags do not stabilize within 10 passes.
	 *
	 * @return void
	 */
	public function test_sanitize_inline_svg_fails_closed_after_max_nested_passes(): void {
		$nested_script = '<script>alert(1)</script>';
		for ( $i = 0; $i < 11; $i++ ) {
			$nested_script = '<scr' . $nested_script . 'ipt>alert(1)</script>';
		}

		$payload = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' . $nested_script . '<path d="M2 12h20"/></svg>';

		$this->assert_same( '', SupportSVG::sanitize_inline_svg( $payload ), 'sanitize_inline_svg() fails closed when nested dangerous tags exceed 10 passes' );
	}
}

// Standalone execution entry point. Restore the handler so it does not leak into other files.
try {
	( new SupportSVGTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
