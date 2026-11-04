<?php
/**
 * Unit tests for GSlider\RestApi\BlockParser.
 *
 * Verifies that:
 * 1. normalize_block() accurately converts Gutenberg block comments and attributes into clean slide arrays.
 * 2. Default schema values are populated when omitted by the editor.
 * 3. Stored attribute overrides (e.g. false booleans, custom objects) are preserved without being overwritten.
 * 4. Image, Logo, Testimonial, and Flexi-Content slide structures are parsed with appropriate fields.
 * 5. blockStyle CSS is strictly sanitized to prevent arbitrary code injection for REST consumers.
 * 6. Flexi Content slides keep their CSS in REST output (slides[].css and <style> in innerHtml).
 * 7. Flexi Content vertical direction reaches swiperConfig and turns off autoHeight.
 *
 * @package GSlider\Tests\RestApi
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

if ( ! function_exists( 'sanitize_text_field' ) ) {
	function sanitize_text_field( $text ) {
		return is_string( $text ) ? trim( wp_strip_all_tags( $text ) ) : $text;
	}
}

if ( ! function_exists( 'sanitize_key' ) ) {
	function sanitize_key( $key ) {
		$key = strtolower( (string) $key );
		return preg_replace( '/[^a-z0-9_\-]/', '', $key );
	}
}

if ( ! function_exists( 'wp_kses_post' ) ) {
	function wp_kses_post( $text ) {
		return (string) $text;
	}
}

if ( ! function_exists( 'render_block' ) ) {
	function render_block( $block ) {
		return '<p>flexi</p>';
	}
}

if ( ! function_exists( 'wp_strip_all_tags' ) ) {
	function wp_strip_all_tags( $text ) {
		return trim( strip_tags( preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', '', (string) $text ) ) );
	}
}

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Utils/CssSanitizer.php';
require_once ABSPATH . 'includes/RestApi/BlockParser.php';

use GSlider\RestApi\BlockParser;
use GSlider\Utils\CssSanitizer;

/**
 * Test class for BlockParser.
 */
class BlockParserTest {

	/**
	 * Helper assertion.
	 *
	 * @param bool   $condition Evaluated condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( $condition, string $message ): void {
		if ( ! $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Normalizes a block definition via BlockParser.
	 *
	 * @param array  $attrs Attributes array.
	 * @param string $name  Block name.
	 * @return array
	 */
	private function normalize( array $attrs, string $name ): array {
		return BlockParser::normalize_block(
			[
				'blockName' => $name,
				'attrs'     => $attrs,
			]
		);
	}

	/**
	 * Runs all unit test assertions for BlockParser.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider BlockParser Tests ===\n\n";

		$this->test_base_block_slide_parsing();
		$this->test_attribute_defaults_matching_schemas();
		$this->test_stored_overrides_and_preservation();
		$this->test_block_types_normalization();
		$this->test_css_sanitization();
		$this->test_flexi_slide_css_in_rest_output();
		$this->test_flexi_vertical_direction();
		$this->test_flexi_hash_navigation();

		fwrite( STDOUT, "\nAll BlockParser tests passed successfully!\n" );
	}

	/**
	 * Test 1: Base Block Slide Parsing & Normalization.
	 *
	 * @return void
	 */
	public function test_base_block_slide_parsing(): void {
		$one = $this->normalize(
			[
				'blockId'     => 'gslider-base',
				'images'      => [
					[
						'id'  => 9,
						'url' => 'https://example.com/not-a-base-slide.jpg',
					],
				],
				'sliderItems' => [
					[
						'id'                      => 'item-1',
						'subTitle'                => 'Sub Title',
						'title'                   => 'Slider Item 1',
						'description'             => 'First slide copy',
						'primaryButtonText'       => 'Get Started',
						'primaryButtonLink'       => '#',
						'primaryButtonTargetLink' => false,
						'secondaryButtonSwitcher' => true,
						'secondaryButtonText'     => 'Learn more',
						'secondaryButtonLink'     => 'https://example.com/more',
					],
				],
			],
			'gslider-blocks/base'
		);

		$this->assert_true( 'gslider-blocks/base' === $one['blockName'], 'blockName stays gslider-blocks/base' );
		$this->assert_true( 1 === $one['totalSlides'], 'one default item counts as one slide' );
		$this->assert_true( 'Slider Item 1' === $one['slides'][0]['title'], 'slides[0].title is the item title' );
		$this->assert_true( 'item-1' === $one['slides'][0]['id'], 'slide id is copied' );
		$this->assert_true( 'Sub Title' === $one['slides'][0]['subTitle'], 'subTitle is copied' );
		$this->assert_true( 'First slide copy' === $one['slides'][0]['description'], 'description is copied' );
		$this->assert_true( 'Get Started' === $one['slides'][0]['primaryButtonText'], 'primary button text is copied' );
		$this->assert_true( false === $one['slides'][0]['primaryButtonTargetLink'] && is_bool( $one['slides'][0]['primaryButtonTargetLink'] ), 'primaryButtonTargetLink stays boolean false' );
		$this->assert_true( true === $one['slides'][0]['secondaryButtonSwitcher'] && is_bool( $one['slides'][0]['secondaryButtonSwitcher'] ), 'secondaryButtonSwitcher stays boolean true' );
		$this->assert_true( ! isset( $one['slides'][0]['url'], $one['slides'][0]['authorName'], $one['slides'][0]['ratingNumber'] ), 'base slides are not image or testimonial items' );
		$this->assert_true( 'Slider Item 1' === $one['attrs']['sliderItems'][0]['title'], 'raw attrs.sliderItems stays on the payload' );

		$two = $this->normalize(
			[
				'sliderItems' => [
					[ 'id' => 'item-1', 'title' => 'Slider Item 1' ],
					[ 'id' => 'item-2', 'title' => 'Slider Item 2' ],
					'not-an-item',
				],
			],
			'gslider-blocks/base'
		);
		$this->assert_true( 2 === $two['totalSlides'] && 2 === count( $two['slides'] ), 'two slider items return two slides' );
		$this->assert_true( 'Slider Item 2' === $two['slides'][1]['title'], 'the second slide title is copied' );
		$this->assert_true( true === $two['slides'][0]['primaryButtonTargetLink'] && false === $two['slides'][0]['secondaryButtonSwitcher'], 'omitted button flags use the editor defaults as booleans' );

		$untouched = $this->normalize( [ 'blockId' => 'gslider-empty' ], 'gslider-blocks/base' );
		$this->assert_true( 3 === $untouched['totalSlides'] && 3 === count( $untouched['slides'] ), 'missing sliderItems returns the three default slides' );
		$this->assert_true( 'Slider Item 1' === $untouched['slides'][0]['title'] && 'item-3' === $untouched['slides'][2]['id'], 'default base slides keep their default content' );
		$this->assert_true( 'gslider-empty' === $untouched['blockId'] && 'gslider-empty' === $untouched['attrs']['blockId'], 'stored blockId wins over its default' );

		$empty = $this->normalize( [ 'sliderItems' => [] ], 'gslider-blocks/base' );
		$this->assert_true( [] === $empty['slides'] && 0 === $empty['totalSlides'], 'a stored empty sliderItems stays empty' );
	}

	/**
	 * Test 2: Attribute Defaults Matching MCP Schemas.
	 *
	 * @return void
	 */
	public function test_attribute_defaults_matching_schemas(): void {
		$schemas_dir = GSLIDER_DIR_PATH . 'packages/mcp-server/src/core/schemas';
		foreach ( [ 'base', 'testimonial', 'image-slider', 'logo-carousel', 'flexi-content' ] as $slug ) {
			$schema_file = "{$schemas_dir}/{$slug}.json";
			if ( ! file_exists( $schema_file ) ) {
				continue;
			}
			$schema   = json_decode( file_get_contents( $schema_file ), true );
			$expected = [];
			foreach ( $schema['attributes'] as $name => $definition ) {
				if ( array_key_exists( 'default', $definition ) ) {
					$expected[ $name ] = $definition['default'];
				}
			}
			$defaults = BlockParser::attribute_defaults( "gslider-blocks/{$slug}" );
			$this->assert_true( $expected === $defaults, "{$slug} defaults match the MCP schema (run npm run defaults:generate if not)" );

			$filled = $this->normalize( [], "gslider-blocks/{$slug}" );
			$this->assert_true( $expected === $filled['attrs'], "an untouched {$slug} block returns every default in attrs" );
		}

		$base_defaults = BlockParser::attribute_defaults( 'gslider-blocks/base' );
		$this->assert_true( true === $base_defaults['showTitle'] || false === $base_defaults['showTitle'], 'base defaults include showTitle' );
	}

	/**
	 * Test 3: Stored Overrides Preservation.
	 *
	 * @return void
	 */
	public function test_stored_overrides_and_preservation(): void {
		$stored = $this->normalize(
			[
				'infiniteLoop'      => false,
				'carouselPerColumn' => [ 'Desktop' => 4 ],
				'showTitle'         => false,
				'blockStyle'        => '',
			],
			'gslider-blocks/base'
		);
		$this->assert_true( false === $stored['attrs']['infiniteLoop'] && false === $stored['attrs']['showTitle'], 'stored false values are not replaced by defaults' );
		$this->assert_true( [ 'Desktop' => 4 ] === $stored['attrs']['carouselPerColumn'], 'a stored object replaces the default object, as in Gutenberg' );
		$this->assert_true( false === $stored['swiperConfig']['loop'], 'swiperConfig still honors stored values' );
	}

	/**
	 * Test 4: Block Types Normalization (Image, Logo, Testimonial, Flexi).
	 *
	 * @return void
	 */
	public function test_block_types_normalization(): void {
		$untouched_testimonial = $this->normalize( [], 'gslider-blocks/testimonial' );
		$this->assert_true( 3 === $untouched_testimonial['totalSlides'], 'an untouched testimonial returns the three default slides' );
		$this->assert_true( 'Alex Hunter' === $untouched_testimonial['slides'][0]['authorName'], 'default testimonial slides keep their default content' );

		$title_units = [ 'Desktop' => 'px', 'Tablet' => 'px', 'Mobile' => 'px' ];
		$this->assert_true( $title_units === $untouched_testimonial['attrs']['testimonialTitleFontSizeUnits'], 'untouched testimonial title font-size units contain only the three devices' );

		$stored_units       = [ 'Desktop' => 'em', 'Tablet' => 'rem', 'Mobile' => 'px', 'em' => 'px', 'rem' => 'px' ];
		$stored_testimonial = $this->normalize(
			[ 'testimonialTitleFontSizeUnits' => $stored_units ],
			'gslider-blocks/testimonial'
		);
		$this->assert_true( $stored_units === $stored_testimonial['attrs']['testimonialTitleFontSizeUnits'], 'stored testimonial units and legacy stray keys remain unchanged' );

		$untouched_image = $this->normalize( [], 'gslider-blocks/image-slider' );
		$this->assert_true( 0 === $untouched_image['totalSlides'] && [] === $untouched_image['attrs']['images'], 'an untouched image slider has no default images' );
		$this->assert_true( [] === BlockParser::attribute_defaults( 'gslider-blocks/unknown' ), 'an unknown block has no defaults' );

		$image = $this->normalize(
			[
				'images' => [
					[
						'id'          => 4,
						'url'         => 'https://example.com/photo.jpg',
						'alt'         => 'Photo',
						'caption'     => 'Caption',
						'link'        => 'https://example.com',
						'tooltipText' => 'Tip',
					],
				],
			],
			'gslider-blocks/image-slider'
		);
		$this->assert_true( 1 === $image['totalSlides'] && 'https://example.com/photo.jpg' === $image['slides'][0]['url'], 'image slides stay url items' );

		$logo = $this->normalize(
			[
				'logos' => [
					[
						'id'  => 5,
						'url' => 'https://example.com/logo.png',
						'alt' => 'Logo',
					],
				],
			],
			'gslider-blocks/logo-carousel'
		);
		$this->assert_true( 'https://example.com/logo.png' === $logo['slides'][0]['url'] && ! isset( $logo['slides'][0]['title'] ), 'logo slides stay logo items' );

		$testimonial = $this->normalize(
			[
				'sliderItems' => [
					[
						'id'              => 't-1',
						'authorName'      => 'Ada',
						'testimonialText' => 'Great',
						'ratingNumber'    => 5,
					],
				],
			],
			'gslider-blocks/testimonial'
		);
		$this->assert_true( 'Ada' === $testimonial['slides'][0]['authorName'] && ! isset( $testimonial['slides'][0]['subTitle'] ), 'testimonial slides keep testimonial fields' );

		$flexi = BlockParser::normalize_block(
			[
				'blockName'   => 'gslider-blocks/flexi-content',
				'attrs'       => [],
				'innerBlocks' => [
					[
						'blockName'   => 'gslider-blocks/flexi-content-item',
						'attrs'       => [ 'blockId' => 'slide-a' ],
						'innerBlocks' => [],
					],
				],
			]
		);
		$this->assert_true( 'gslider-blocks/flexi-content-item' === $flexi['slides'][0]['blockName'] && 1 === $flexi['totalSlides'], 'flexi slides stay child blocks' );
	}

	/**
	 * Test 5: CSS Sanitization for REST consumers.
	 *
	 * @return void
	 */
	public function test_css_sanitization(): void {
		$valid_css = ".gslider-base-1 .swiper{padding:10px 20px !important;background-image:url(https://example.com/a.jpg);background:linear-gradient(90deg, rgba(0,0,0,.5) 0%, #fff 100%);}\n@media (max-width: 767px){.gslider-base-1 .slide{background:url(\"https://example.com/b.png\") center/cover no-repeat;}}";
		$this->assert_true( $valid_css === CssSanitizer::sanitize( $valid_css ), 'valid generated CSS passes through unchanged' );

		$payloads = [
			'.a{color:red}@import url(https://evil.example/a.css);',
			'@IMPORT "https://evil.example/a.css";.a{color:red}',
			'@im@import x;port url(https://evil.example/a.css);.a{color:red}',
			'.a{background:url(javajavascript:script:alert(1));color:red}',
			'@\69mport url(https://evil.example/a.css);.a{color:red}',
			'.a{width:expression(alert(1));color:red}',
			'.a{background:url(JaVaScRiPt :alert(1));color:red}',
			'.a{-moz-binding:url(https://evil.example/x.xml#x);color:red}',
			'.a{behavior:url(x.htc);color:red}',
			'.a{background:url( "data:text/html;base64,PHNjcmlwdD4=");color:red}',
			'.a{color:red}</style><script>alert(1)</script>',
			'.a{color:red}</STYLE ',
		];
		foreach ( $payloads as $payload ) {
			$clean = strtolower( CssSanitizer::sanitize( $payload ) );
			$bad   = preg_match( '/<|@import|@\\\\|expression\s*\(|javascript\s*:|-moz-binding|behavior\s*:|url\s*\(\s*[\'"]?\s*data:/', $clean );
			$this->assert_true( ! $bad && false !== strpos( $clean, 'color:red' ), 'sanitizer neutralizes ' . $payload );
		}
		$this->assert_true( '' === CssSanitizer::sanitize( [ 'x' ] ) && '' === CssSanitizer::sanitize( null ), 'sanitizer rejects non-strings' );

		$styled = $this->normalize(
			[
				'blockId'    => 'gslider-base',
				'blockStyle' => '.x{color:red}@import url(https://evil.example/a.css);</style><script>alert(1)</script>',
			],
			'gslider-blocks/base'
		);
		$this->assert_true( '.x{color:red}' === $styled['css'] && $styled['css'] === $styled['attrs']['blockStyle'], 'REST css and attrs.blockStyle are sanitized' );
	}

	/**
	 * Test 6: Flexi Content slide CSS survives a REST request (headless /gslider API).
	 *
	 * @return void
	 */
	public function test_flexi_slide_css_in_rest_output(): void {
		global $is_rest_mock, $is_admin_mock;
		$is_rest_mock  = true;
		$is_admin_mock = false;

		$generator = \GSlider\Classes\StyleGenerator::getInstance();
		\GSlider\Classes\StyleGenerator::reset_styles();
		$GLOBALS['gslider_render_block_impl'] = static function ( $block ) use ( $generator ) {
			return $generator->collect_and_render_dynamic_styles( '<div class="flexi-content-item swiper-slide">Slide</div>', $block );
		};

		$flexi = BlockParser::normalize_block(
			[
				'blockName'   => 'gslider-blocks/flexi-content',
				'attrs'       => [],
				'innerBlocks' => [
					[
						'blockName'   => 'gslider-blocks/flexi-content-item',
						'attrs'       => [
							'blockId'    => 'slide-a',
							'blockStyle' => '.slide-a{color:#abcdef}',
							'slideHash'  => 'pricing',
						],
						'innerBlocks' => [
							[
								'blockName'   => 'gslider-blocks/flexi-content-item',
								'attrs'       => [
									'blockId'    => 'slide-a-inner',
									'blockStyle' => '.slide-a-inner{margin:1px}',
								],
								'innerBlocks' => [],
							],
						],
					],
				],
			]
		);
		unset( $GLOBALS['gslider_render_block_impl'] );
		$is_rest_mock = false;

		$slide = $flexi['slides'][0];
		$this->assert_true( false !== strpos( $slide['css'], '.slide-a{color:#abcdef}' ) && false !== strpos( $slide['css'], '.slide-a-inner{margin:1px}' ), 'flexi slides[].css carries own and nested CSS' );
		$this->assert_true( false !== strpos( $slide['innerHtml'], '<style id="gslider-style-slide-a">' ), 'flexi innerHtml keeps its <style> during REST requests' );
		$this->assert_true( 'pricing' === $slide['slideHash'], 'flexi slides[].slideHash carries the slide slug' );
	}

	/**
	 * Test 7: Flexi Content Vertical Direction.
	 *
	 * @return void
	 */
	public function test_flexi_vertical_direction(): void {
		$horizontal = $this->normalize( [ 'layoutHeightSwitcher' => 'adapt' ], 'gslider-blocks/flexi-content' );
		$this->assert_true( ! isset( $horizontal['swiperConfig']['direction'] ), 'default flexi config has no direction key' );
		$this->assert_true( true === $horizontal['swiperConfig']['autoHeight'], 'horizontal adapt height keeps autoHeight' );

		$vertical = $this->normalize(
			[
				'direction'            => 'vertical',
				'layoutHeightSwitcher' => 'adapt',
			],
			'gslider-blocks/flexi-content'
		);
		$this->assert_true( 'vertical' === $vertical['swiperConfig']['direction'], 'vertical flexi config sets direction' );
		$this->assert_true( ! isset( $vertical['swiperConfig']['autoHeight'] ), 'vertical flexi config skips autoHeight' );
	}

	/**
	 * Test 8: Flexi Content Hash Navigation.
	 *
	 * @return void
	 */
	public function test_flexi_hash_navigation(): void {
		$off = $this->normalize( [], 'gslider-blocks/flexi-content' );
		$this->assert_true( ! isset( $off['swiperConfig']['hashNavigation'] ), 'default flexi config has no hashNavigation key' );

		$on = $this->normalize( [ 'enableHashNavigation' => true ], 'gslider-blocks/flexi-content' );
		$this->assert_true(
			[
				'watchState'   => true,
				'replaceState' => true,
			] === $on['swiperConfig']['hashNavigation'],
			'enabled flexi config matches save.js hashNavigation'
		);
	}
}

// Standalone execution entrypoint
( new BlockParserTest() )->run_all_tests();
