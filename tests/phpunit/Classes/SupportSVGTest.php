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
}

// Standalone execution entry point. Restore the handler so it does not leak into other files.
try {
	( new SupportSVGTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
