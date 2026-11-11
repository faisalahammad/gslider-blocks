<?php
/**
 * Unit tests for GSlider\Classes\StyleGenerator.
 *
 * Verifies that:
 * 1. StyleGenerator implements Registrable interface and SingletonTrait.
 * 2. register() hooks into WordPress 'render_block', 'wp_footer', and 'wp_enqueue_scripts'.
 * 3. Dynamic styles are sanitized and scoped strictly to block IDs (#318: selectors must start at the block class).
 * 4. Duplicate <style> tags are prevented for identical block IDs in the same request (#312).
 * 5. <style> tags are completely excluded from RSS feeds (#312).
 * 6. Generic REST responses get no <style>, but the plugin's headless render keeps it,
 *    and JSON-Accept AJAX requests are not treated as REST.
 * 7. LCP image optimization (WP_HTML_Tag_Processor) prioritizes only the first real slide image,
 *    skips testimonial rating icons, cannot be abused via attribute values (XSS), and can be disabled.
 * 8. reset_styles() resets collected styles, printed IDs, and optimization state.
 *
 * @package GSlider\Tests\Classes
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

global $is_admin_mock, $is_feed_mock;
$is_admin_mock = false;
$is_feed_mock  = false;

// Require Core Classes Under Test.
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Utils/CssSanitizer.php';
require_once ABSPATH . 'includes/Classes/StyleGenerator.php';
require_once ABSPATH . 'includes/Plugin.php';

use GSlider\Classes\StyleGenerator;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for GSlider\Classes\StyleGenerator.
 */
class StyleGeneratorTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider StyleGenerator Unit Tests ===\n\n";

		$this->test_implements_registrable_and_singleton();
		$this->test_plugin_services_contains_class();
		$this->test_register_hooks();
		$this->test_css_scoping_and_sanitization();
		$this->test_css_scope_anchor_and_block_id_validation();
		$this->test_invalid_block_id_skips_style_output();
		$this->test_sanitize_css_emits_desktop_before_media_queries();
		$this->test_dynamic_css_deduplication();
		$this->test_feed_exclusion();
		$this->test_rest_request_exclusion();
		$this->test_json_accept_ajax_keeps_styles();
		$this->test_headless_render_keeps_styles_in_rest();
		$this->test_lcp_image_optimization();
		$this->test_lcp_preserves_existing_fetchpriority_and_decoding();
		$this->test_lcp_xss_payload_creates_no_attribute();
		$this->test_lcp_skips_rating_icon();
		$this->test_lcp_post_carousel_skips_avatars_icons_and_secondary_slides();
		$this->test_lcp_skips_non_slide_markup();
		$this->test_gslider_lcp_optimize_filter();
		$this->test_ensure_image_dimensions();
		$this->test_ensure_image_dimensions_edge_cases();
		$this->test_ensure_image_dimensions_testimonial_author_image();
		$this->test_reset_styles();
		$this->test_csp_nonce_injection();
		$this->test_print_footer_styles_deduplication();

		echo "\nAll StyleGenerator unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Verify StyleGenerator implements Registrable and follows Singleton pattern.
	 *
	 * @return void
	 */
	public function test_implements_registrable_and_singleton(): void {
		$generator = StyleGenerator::getInstance();
		if ( ! ( $generator instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not implement Registrable interface\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator implements Registrable interface\n";

		$generator_again = StyleGenerator::getInstance();
		if ( $generator !== $generator_again ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not maintain singleton identity\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator implements SingletonTrait correctly\n";
	}

	/**
	 * Test 2: Verify Plugin::$services array contains StyleGenerator::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_contains_class(): void {
		$ref = new ReflectionProperty( Plugin::class, 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref->setAccessible( true );
		}
		$services = $ref->getValue( Plugin::getInstance() );

		if ( ! in_array( StyleGenerator::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: Plugin::\$services array does not contain StyleGenerator::class\n" );
			exit( 1 );
		}
		echo "OK: Plugin::\$services contains StyleGenerator::class\n";
	}

	/**
	 * Test 3: Verify register() registers proper filters and actions.
	 *
	 * @return void
	 */
	public function test_register_hooks(): void {
		global $wp_filters, $wp_actions;

		$generator = StyleGenerator::getInstance();
		$generator->register();

		// Check render_block filter.
		$has_filter = false;
		if ( ! empty( $wp_filters['render_block'] ) ) {
			foreach ( $wp_filters['render_block'] as $filter ) {
				if ( is_array( $filter['callback'] ) && $filter['callback'][0] instanceof StyleGenerator && 'collect_and_render_dynamic_styles' === $filter['callback'][1] ) {
					$has_filter = true;
					break;
				}
			}
		}
		if ( ! $has_filter ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not hook collect_and_render_dynamic_styles into render_block\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator hooks into render_block filter\n";

		// Check wp_footer action.
		$has_footer_action = false;
		if ( ! empty( $wp_actions['wp_footer'] ) ) {
			foreach ( $wp_actions['wp_footer'] as $action ) {
				if ( is_array( $action['callback'] ) && $action['callback'][0] instanceof StyleGenerator && 'print_footer_styles' === $action['callback'][1] ) {
					$has_footer_action = true;
					break;
				}
			}
		}
		if ( ! $has_footer_action ) {
			fwrite( STDERR, "FAIL: StyleGenerator does not hook print_footer_styles into wp_footer\n" );
			exit( 1 );
		}
		echo "OK: StyleGenerator hooks into wp_footer action\n";
	}

	/**
	 * Test 4: Verify CSS sanitization enforces scoping to block ID and strips dangerous constructs.
	 *
	 * @return void
	 */
	public function test_css_scoping_and_sanitization(): void {
		$generator = StyleGenerator::getInstance();
		$block_id  = 'gslider-test-block';

		// Rule properly scoped to block ID.
		$valid_css = ".{$block_id} { color: #ff0000; padding: 20px; }";
		$clean     = $generator->sanitize_css( $valid_css, $block_id );

		if ( false === strpos( $clean, $block_id ) || false === strpos( $clean, 'color:#ff0000' ) ) {
			fwrite( STDERR, "FAIL: Valid scoped CSS was improperly stripped: $clean\n" );
			exit( 1 );
		}
		echo "OK: Valid scoped CSS is preserved\n";

		// Unscoped rule targeting global body should be dropped.
		$unscoped_css = "body { background: black; } .{$block_id} { margin: 10px; }";
		$clean_unscoped = $generator->sanitize_css( $unscoped_css, $block_id );

		if ( false !== strpos( $clean_unscoped, 'body' ) ) {
			fwrite( STDERR, "FAIL: Unscoped selector 'body' was not dropped: $clean_unscoped\n" );
			exit( 1 );
		}
		if ( false === strpos( $clean_unscoped, $block_id ) ) {
			fwrite( STDERR, "FAIL: Scoped rule was dropped alongside unscoped rule: $clean_unscoped\n" );
			exit( 1 );
		}
		echo "OK: Unscoped CSS selectors are strictly dropped\n";
	}

	/**
	 * Verify selectors must start at the block class and block IDs must be valid (#318).
	 *
	 * @return void
	 */
	public function test_css_scope_anchor_and_block_id_validation(): void {
		$generator = StyleGenerator::getInstance();
		$block_id  = 'gslider-abc';
		$root      = '.' . $block_id;

		$kept = $generator->sanitize_css(
			"{$root} { color: #111111; } {$root}.gslider-wrapper { margin: 0; } {$root} .swiper-slide > .inner { padding: 8px; }",
			$block_id
		);
		if ( false === strpos( $kept, 'color:#111111' ) || false === strpos( $kept, 'margin:0' ) || false === strpos( $kept, 'padding:8px' ) ) {
			fwrite( STDERR, "FAIL: Legitimate generated selectors were stripped: $kept\n" );
			exit( 1 );
		}
		echo "OK: Compound, descendant, and child selectors at the block root are kept\n";

		$media = $generator->sanitize_css(
			"@media (max-width: 767px) { html:has({$root}) body { color: #ff0000; } {$root} { padding: 4px; } }",
			$block_id
		);
		if ( false !== strpos( $media, 'html' ) || false === strpos( $media, 'padding:4px' ) ) {
			fwrite( STDERR, "FAIL: Media-query scope filter failed: $media\n" );
			exit( 1 );
		}
		echo "OK: Unscoped selectors inside @media are dropped; rooted rules remain\n";

		$dropped = [
			"html:has({$root}) body { background: #000000; }",
			"body:not({$root}) { display: none; }",
			"{$root}:is(body, html) { color: #ff0000; }",
			"{$root} ~ header { opacity: 0; }",
			"{$root} + * { position: static; }",
			".{$block_id}def { color: #ff0000; }",
		];
		foreach ( $dropped as $css ) {
			$clean = $generator->sanitize_css( $css, $block_id );
			if ( '' !== $clean ) {
				fwrite( STDERR, "FAIL: Selector that does not stay inside the block was kept ($css) => $clean\n" );
				exit( 1 );
			}
		}
		echo "OK: :has()/:not()/:is(), sibling combinators, and prefix collisions are dropped\n";

		if ( ! StyleGenerator::is_valid_block_id( 'gslider-test-block' ) ||
			! StyleGenerator::is_valid_block_id( 'gslider-flexi-content-item-a1b2c3d4' ) ) {
			fwrite( STDERR, "FAIL: Editor-format block IDs were rejected\n" );
			exit( 1 );
		}
		if ( StyleGenerator::is_valid_block_id( '' ) ||
			StyleGenerator::is_valid_block_id( 'g' ) ||
			StyleGenerator::is_valid_block_id( 'slide-a' ) ) {
			fwrite( STDERR, "FAIL: Invalid block IDs were accepted\n" );
			exit( 1 );
		}

		if ( '' !== $generator->sanitize_css( "{$root} { color: #111111; }", '' ) ||
			'' !== $generator->sanitize_css( 'body { color: #111111; }', 'g' ) ) {
			fwrite( STDERR, "FAIL: sanitize_css emitted CSS for an invalid block ID\n" );
			exit( 1 );
		}
		echo "OK: Empty, short, and non-gslider block IDs produce no CSS\n";
	}

	/**
	 * Verify collect_and_render_dynamic_styles skips output when blockId is invalid (#318).
	 *
	 * @return void
	 */
	public function test_invalid_block_id_skips_style_output(): void {
		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$empty = $generator->collect_and_render_dynamic_styles(
			'<div>Slider</div>',
			[
				'blockName' => 'gslider-blocks/image-slider',
				'attrs'     => [
					'blockId'    => '',
					'blockStyle' => 'body { color: #ff0000; }',
				],
			]
		);
		if ( false !== strpos( $empty, '<style' ) ) {
			fwrite( STDERR, "FAIL: Empty blockId still printed a style tag: $empty\n" );
			exit( 1 );
		}

		$short = $generator->collect_and_render_dynamic_styles(
			'<div>Slider</div>',
			[
				'blockName' => 'gslider-blocks/image-slider',
				'attrs'     => [
					'blockId'    => 'ab',
					'blockStyle' => '.ab { color: #ff0000; }',
				],
			]
		);
		if ( false !== strpos( $short, '<style' ) ) {
			fwrite( STDERR, "FAIL: Short blockId still printed a style tag: $short\n" );
			exit( 1 );
		}
		echo "OK: Invalid blockId skips style output\n";
	}

	/**
	 * Verify sanitize_css() emits desktop rules before @media breakpoints (#709).
	 *
	 * @return void
	 */
	public function test_sanitize_css_emits_desktop_before_media_queries(): void {
		$generator = StyleGenerator::getInstance();
		$block_id  = 'gslider-b0d690d4';

		$raw_css = ".{$block_id}.gslider-base-wrapper { border-radius: 30px 30px 30px 30px !important; } "
			. ".{$block_id} .gslider-btn.primary-btn { font-size: 16px; padding: 12px 24px 12px 24px; } "
			. ".{$block_id} .swiper-wrapper { min-height: 500px; } "
			. '@media only screen and (max-width: 1024px) { '
			. 'body { background: #ff0000; } '
			. ".{$block_id}.gslider-base-wrapper { border-radius: 10px 10px 10px 10px !important; } "
			. ".{$block_id} .gslider-btn.primary-btn { font-size: 15px; padding: 10px 20px 10px 20px; } "
			. ".{$block_id} .swiper-wrapper { min-height: 400px; } "
			. '} '
			. '@media only screen and (max-width: 767px) { '
			. ".{$block_id}.gslider-base-wrapper { border-radius: 0px 0px 0px 0px !important; } "
			. ".{$block_id} .gslider-btn.primary-btn { font-size: 14px; padding: 8px 16px 8px 16px; } "
			. ".{$block_id} .swiper-wrapper { min-height: 300px; } "
			. '} '
			. ".{$block_id} .gslider-content-wrapper.item-1 { background: #ededed; } "
			. '@media only screen and (max-width: 1024px) { '
			. ".{$block_id} .gslider-content-wrapper.item-1 { background: #cccccc; } "
			. '} '
			. '@media only screen and (max-width: 767px) { '
			. ".{$block_id} .gslider-content-wrapper.item-1 { background: #aaaaaa; } "
			. '}';

		$clean = $generator->sanitize_css( $raw_css, $block_id );

		if ( false !== strpos( $clean, 'body' ) ) {
			fwrite(
				STDERR,
				sprintf(
					"FAIL: Expected unscoped 'body' selector inside @media to be dropped (expected: false, actual pos: %d). Output: %s\n",
					strpos( $clean, 'body' ),
					$clean
				)
			);
			exit( 1 );
		}

		$pos_desktop_radius = strpos( $clean, '30px 30px 30px 30px !important' );
		$pos_desktop_btn    = strpos( $clean, 'font-size:16px' );
		$pos_desktop_item   = strpos( $clean, 'background:#ededed' );
		$pos_tablet_media   = strpos( $clean, 'max-width:1024px' );
		$pos_tablet_radius  = strpos( $clean, '10px 10px 10px 10px !important' );
		$pos_tablet_btn     = strpos( $clean, 'font-size:15px' );
		$pos_mobile_media   = strpos( $clean, 'max-width:767px' );
		$pos_mobile_radius  = strpos( $clean, '0px 0px 0px 0px !important' );
		$pos_mobile_btn     = strpos( $clean, 'font-size:14px' );

		if (
			false === $pos_desktop_radius ||
			false === $pos_desktop_btn ||
			false === $pos_desktop_item ||
			false === $pos_tablet_media ||
			false === $pos_tablet_radius ||
			false === $pos_tablet_btn ||
			false === $pos_mobile_media ||
			false === $pos_mobile_radius ||
			false === $pos_mobile_btn
		) {
			fwrite(
				STDERR,
				sprintf(
					"FAIL: Expected all responsive selectors to be present (expected: non-false offsets; actual desktop_radius=%s, desktop_btn=%s, desktop_item=%s, tablet_media=%s, tablet_radius=%s, tablet_btn=%s, mobile_media=%s, mobile_radius=%s, mobile_btn=%s). Output: %s\n",
					var_export( $pos_desktop_radius, true ),
					var_export( $pos_desktop_btn, true ),
					var_export( $pos_desktop_item, true ),
					var_export( $pos_tablet_media, true ),
					var_export( $pos_tablet_radius, true ),
					var_export( $pos_tablet_btn, true ),
					var_export( $pos_mobile_media, true ),
					var_export( $pos_mobile_radius, true ),
					var_export( $pos_mobile_btn, true ),
					$clean
				)
			);
			exit( 1 );
		}

		if (
			! ( $pos_desktop_radius < $pos_tablet_media ) ||
			! ( $pos_desktop_btn < $pos_tablet_media ) ||
			! ( $pos_desktop_item < $pos_tablet_media ) ||
			! ( $pos_tablet_media < $pos_tablet_radius ) ||
			! ( $pos_tablet_radius < $pos_mobile_media ) ||
			! ( $pos_tablet_btn < $pos_mobile_media ) ||
			! ( $pos_mobile_media < $pos_mobile_radius ) ||
			! ( $pos_mobile_media < $pos_mobile_btn )
		) {
			fwrite(
				STDERR,
				sprintf(
					"FAIL: Expected cascade order desktop (radius/btn/item) < tablet_media < tablet (radius/btn) < mobile_media < mobile (radius/btn); actual positions desktop_radius=%d, desktop_btn=%d, desktop_item=%d, tablet_media=%d, tablet_radius=%d, tablet_btn=%d, mobile_media=%d, mobile_radius=%d, mobile_btn=%d. Output: %s\n",
					$pos_desktop_radius,
					$pos_desktop_btn,
					$pos_desktop_item,
					$pos_tablet_media,
					$pos_tablet_radius,
					$pos_tablet_btn,
					$pos_mobile_media,
					$pos_mobile_radius,
					$pos_mobile_btn,
					$clean
				)
			);
			exit( 1 );
		}

		echo "OK: sanitize_css() preserves Desktop -> Tablet -> Mobile CSS cascade order\n";
	}

	/**
	 * Test 5: Verify dynamic CSS deduplication per block ID on a single request (#312).
	 *
	 * @return void
	 */
	public function test_dynamic_css_deduplication(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-dedup-1';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { background: #fff; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper ' . $block_id . '">Slider 1</div>';

		// First render should prepend <style id="gslider-style-{id}">.
		$first_render = $generator->collect_and_render_dynamic_styles( $content, $block );
		$expected_style_tag = '<style id="gslider-style-' . $block_id . '">';

		if ( false === strpos( $first_render, $expected_style_tag ) ) {
			fwrite( STDERR, "FAIL: First render did not include expected style tag\n" );
			exit( 1 );
		}
		echo "OK: First render outputs dynamic <style> tag scoped to block ID\n";

		// Second render of the same block (e.g. query loop or synced pattern) should NOT prepend duplicate style tag.
		$second_render = $generator->collect_and_render_dynamic_styles( $content, $block );
		if ( false !== strpos( $second_render, $expected_style_tag ) ) {
			fwrite( STDERR, "FAIL: Second render included duplicate <style> tag for block ID '$block_id'\n" );
			exit( 1 );
		}
		echo "OK: Second render deduplicates and skips duplicate <style> tag\n";
	}

	/**
	 * Test 6: Verify <style> tags are excluded from RSS feeds (#312).
	 *
	 * @return void
	 */
	public function test_feed_exclusion(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = true; // Simulate RSS feed context.

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-feed-block';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { opacity: 0.9; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper">Feed Content</div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );

		if ( false !== strpos( $output, '<style' ) ) {
			fwrite( STDERR, "FAIL: <style> tag leaked into RSS feed output\n" );
			exit( 1 );
		}
		if ( $output !== $content ) {
			fwrite( STDERR, "FAIL: Feed content was altered in feed context\n" );
			exit( 1 );
		}
		echo "OK: Dynamic <style> tags are completely excluded from RSS feeds\n";

		$is_feed_mock = false;
	}

	/**
	 * Test 7: Verify <style> tags are excluded from REST requests (#312).
	 *
	 * @return void
	 */
	public function test_rest_request_exclusion(): void {
		global $is_admin_mock, $is_feed_mock, $is_rest_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;
		$is_rest_mock  = true; // Simulate REST request.

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-rest-block';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { opacity: 0.9; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper">REST Content</div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );

		if ( false !== strpos( $output, '<style' ) ) {
			fwrite( STDERR, "FAIL: <style> tag leaked into REST request output\n" );
			exit( 1 );
		}
		if ( $output !== $content ) {
			fwrite( STDERR, "FAIL: Block content was altered in REST context\n" );
			exit( 1 );
		}
		echo "OK: Dynamic <style> tags are completely excluded from REST requests\n";

		$is_rest_mock = false;
	}

	/**
	 * Verify a front-end AJAX request with a JSON Accept header still gets styles.
	 *
	 * @return void
	 */
	public function test_json_accept_ajax_keeps_styles(): void {
		global $is_json_mock, $is_rest_mock;
		$is_json_mock = true;
		$is_rest_mock = false;

		StyleGenerator::reset_styles();
		$block  = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => 'gslider-ajax-block',
				'blockStyle' => '.gslider-ajax-block { opacity: 0.5; }',
			],
		];
		$output = StyleGenerator::getInstance()->collect_and_render_dynamic_styles( '<div>AJAX</div>', $block );

		if ( false === strpos( $output, '<style id="gslider-style-gslider-ajax-block">' ) ) {
			fwrite( STDERR, "FAIL: JSON Accept AJAX request lost its <style> tag\n" );
			exit( 1 );
		}
		echo "OK: wp_is_json_request() alone does not strip styles (AJAX loaders keep CSS)\n";

		$is_json_mock = false;
	}

	/**
	 * Verify StyleGenerator::render_block_with_styles() keeps per-slide CSS inside REST requests.
	 *
	 * @return void
	 */
	public function test_headless_render_keeps_styles_in_rest(): void {
		global $is_rest_mock, $wp_filters;
		$is_rest_mock = true;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();
		$slide     = [
			'blockName' => 'gslider-blocks/flexi-content-item',
			'attrs'     => [
				'blockId'    => 'gslider-flexi-slide-1',
				'blockStyle' => '.gslider-flexi-slide-1 { background: #123456; }',
			],
		];

		// Route the render_block stub through the real filter so the test mirrors core.
		$GLOBALS['gslider_render_block_impl'] = static function ( $block ) use ( $generator ) {
			return $generator->collect_and_render_dynamic_styles( '<div class="flexi-content-item swiper-slide">Slide</div>', $block );
		};

		$first  = StyleGenerator::render_block_with_styles( $slide );
		$second = StyleGenerator::render_block_with_styles( $slide );
		unset( $GLOBALS['gslider_render_block_impl'] );

		if ( false === strpos( $first, '<style id="gslider-style-gslider-flexi-slide-1">' ) || false === strpos( $first, 'background:#123456' ) ) {
			fwrite( STDERR, "FAIL: Headless REST render dropped the Flexi slide CSS: $first\n" );
			exit( 1 );
		}
		if ( false === strpos( $second, '<style' ) ) {
			fwrite( STDERR, "FAIL: Headless render must not dedupe slide CSS between payload items\n" );
			exit( 1 );
		}
		if ( false !== strpos( $first, 'fetchpriority' ) ) {
			fwrite( STDERR, "FAIL: LCP optimization must not run in headless REST output\n" );
			exit( 1 );
		}
		echo "OK: Headless /gslider render keeps Flexi slide <style> during REST requests\n";

		// After the headless scope ends, generic REST rendering is stripped again.
		$plain = $generator->collect_and_render_dynamic_styles( '<div>x</div>', $slide );
		if ( '<div>x</div>' !== $plain ) {
			fwrite( STDERR, "FAIL: Headless scope leaked into generic REST rendering\n" );
			exit( 1 );
		}
		echo "OK: Headless scope is restored after rendering\n";

		$is_rest_mock = false;
	}

	/**
	 * Test 7: Verify LCP image optimization on first slide of first slider on the frontend (#391).
	 *
	 * @return void
	 */
	public function test_lcp_image_optimization(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-hero-slider';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { height: 500px; }",
			],
		];

		$content = '<div class="gslider-image-slider-wrapper ' . $block_id . '">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/slide1.jpg" alt="Slide 1" loading="lazy" /></div>' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/slide2.jpg" alt="Slide 2" loading="lazy"></div>' .
			'</div></div></div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );

		// Verify slide 1 received fetchpriority="high", loading="eager", decoding="async" and preserved self-closing syntax.
		if ( preg_match( '/\/\s+[a-z]/i', $output ) ) {
			fwrite( STDERR, "FAIL: Malformed slash in middle of attributes for self-closing tag: $output\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/<img[^>]*slide1\.jpg[^>]*\/>/i', $output ) ) {
			fwrite( STDERR, "FAIL: Self-closing slash was lost on slide 1: $output\n" );
			exit( 1 );
		}
		echo "OK: Self-closing tag properly formatted without misplaced slashes\n";

		// Verify slide 1 received fetchpriority="high", loading="eager", decoding="async".
		if ( ! preg_match( '/<img[^>]*slide1\.jpg[^>]*fetchpriority="high"[^>]*>/i', $output ) &&
		     ! preg_match( '/<img[^>]*fetchpriority="high"[^>]*slide1\.jpg[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: First slide image did not receive fetchpriority=\"high\"\n" );
			exit( 1 );
		}
		echo "OK: First slide image received fetchpriority=\"high\"\n";

		if ( preg_match( '/<img[^>]*slide1\.jpg[^>]*loading="lazy"/i', $output ) ) {
			fwrite( STDERR, "FAIL: First slide image retained loading=\"lazy\"\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/<img[^>]*slide1\.jpg[^>]*loading="eager"/i', $output ) &&
		     ! preg_match( '/<img[^>]*loading="eager"[^>]*slide1\.jpg/i', $output ) ) {
			fwrite( STDERR, "FAIL: First slide image did not receive loading=\"eager\"\n" );
			exit( 1 );
		}
		echo "OK: First slide image converted loading=\"lazy\" to loading=\"eager\"\n";

		// Verify slide 2 retained loading="lazy" and did NOT get fetchpriority="high".
		if ( ! preg_match( '/<img[^>]*slide2\.jpg[^>]*loading="lazy"/i', $output ) &&
		     ! preg_match( '/<img[^>]*loading="lazy"[^>]*slide2\.jpg/i', $output ) ) {
			fwrite( STDERR, "FAIL: Second slide image lost loading=\"lazy\"\n" );
			exit( 1 );
		}
		if ( preg_match( '/<img[^>]*slide2\.jpg[^>]*fetchpriority/i', $output ) ||
		     preg_match( '/<img[^>]*fetchpriority[^>]*slide2\.jpg/i', $output ) ) {
			fwrite( STDERR, "FAIL: Second slide image improperly received fetchpriority\n" );
			exit( 1 );
		}
		echo "OK: Second slide image preserved loading=\"lazy\" without fetchpriority\n";

		// Second slider on the page: should NOT receive fetchpriority on its first image.
		$block_id_2 = 'gslider-second-slider';
		$block_2    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id_2,
				'blockStyle' => ".{$block_id_2} { height: 300px; }",
			],
		];
		$content_2  = '<div class="gslider-image-slider-wrapper ' . $block_id_2 . '">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/slide3.jpg" alt="Slide 3" loading="lazy"></div>' .
			'</div></div></div>';

		$output_2 = $generator->collect_and_render_dynamic_styles( $content_2, $block_2 );

		if ( preg_match( '/<img[^>]*slide3\.jpg[^>]*fetchpriority/i', $output_2 ) ||
		     preg_match( '/<img[^>]*fetchpriority[^>]*slide3\.jpg/i', $output_2 ) ) {
			fwrite( STDERR, "FAIL: Subsequent slider improperly received fetchpriority\n" );
			exit( 1 );
		}
		echo "OK: Subsequent sliders on the page do not receive duplicate fetchpriority\n";
	}

	/**
	 * Verify an <img> with fetchpriority="low" decoding="sync" keeps both values,
	 * and an <img> with neither gets "high" and "async".
	 *
	 * @return void
	 */
	public function test_lcp_preserves_existing_fetchpriority_and_decoding(): void {
		global $is_admin_mock, $is_feed_mock, $is_rest_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;
		$is_rest_mock  = false;

		$generator = StyleGenerator::getInstance();

		// Case 1: Image already has fetchpriority="low" and decoding="sync".
		StyleGenerator::reset_styles();
		$content_custom = '<div class="gslider-image-slider-wrapper gslider-custom">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/custom.jpg" alt="Custom" fetchpriority="low" decoding="sync" loading="lazy" /></div>' .
			'</div></div></div>';

		$output_custom = $generator->collect_and_render_dynamic_styles( $content_custom, $this->slider_block( 'gslider-custom' ) );

		if ( ! preg_match( '/fetchpriority="low"/i', $output_custom ) ) {
			fwrite( STDERR, "FAIL: Existing fetchpriority=\"low\" was overwritten: $output_custom\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/decoding="sync"/i', $output_custom ) ) {
			fwrite( STDERR, "FAIL: Existing decoding=\"sync\" was overwritten: $output_custom\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/loading="eager"/i', $output_custom ) ) {
			fwrite( STDERR, "FAIL: loading=\"lazy\" was not converted to \"eager\" on custom image: $output_custom\n" );
			exit( 1 );
		}
		echo "OK: Existing fetchpriority=\"low\" and decoding=\"sync\" were preserved on LCP image\n";

		// Case 2: Image with neither gets fetchpriority="high" and decoding="async".
		StyleGenerator::reset_styles();
		$content_default = '<div class="gslider-image-slider-wrapper gslider-default">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/default.jpg" alt="Default" loading="lazy" /></div>' .
			'</div></div></div>';

		$output_default = $generator->collect_and_render_dynamic_styles( $content_default, $this->slider_block( 'gslider-default' ) );

		if ( ! preg_match( '/fetchpriority="high"/i', $output_default ) ) {
			fwrite( STDERR, "FAIL: Image with no fetchpriority did not receive \"high\": $output_default\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/decoding="async"/i', $output_default ) ) {
			fwrite( STDERR, "FAIL: Image with no decoding did not receive \"async\": $output_default\n" );
			exit( 1 );
		}
		echo "OK: Image with neither attribute received fetchpriority=\"high\" and decoding=\"async\"\n";
	}

	/**
	 * Builds an image-slider block array for LCP tests.
	 *
	 * @param string $block_id Block ID.
	 * @return array
	 */
	private function slider_block( string $block_id ): array {
		return [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [ 'blockId' => $block_id ],
		];
	}

	/**
	 * Verify an attribute-value payload cannot become a real attribute (stored XSS).
	 *
	 * @return void
	 */
	public function test_lcp_xss_payload_creates_no_attribute(): void {
		global $is_admin_mock, $is_feed_mock, $is_rest_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;
		$is_rest_mock  = false;
		StyleGenerator::reset_styles();

		$content = '<div class="swiper"><div class="swiper-wrapper"><div class="swiper-slide">' .
			'<img src="http://localhost/wp-content/uploads/x.jpg" alt="loading=\'lazy\' onerror=alert(1)">' .
			'</div></div></div>';

		$output = StyleGenerator::getInstance()->collect_and_render_dynamic_styles( $content, $this->slider_block( 'gslider-xss' ) );

		$processor = new WP_HTML_Tag_Processor( $output );
		$processor->next_tag( 'img' );

		if ( null !== $processor->get_attribute( 'onerror' ) ) {
			fwrite( STDERR, "FAIL: XSS payload created a real onerror attribute: $output\n" );
			exit( 1 );
		}
		if ( "loading='lazy' onerror=alert(1)" !== $processor->get_attribute( 'alt' ) ) {
			fwrite( STDERR, "FAIL: alt attribute value was modified: $output\n" );
			exit( 1 );
		}
		if ( 'high' !== $processor->get_attribute( 'fetchpriority' ) || null !== $processor->get_attribute( 'loading' ) ) {
			fwrite( STDERR, "FAIL: Expected fetchpriority=high and no loading attribute to be invented: $output\n" );
			exit( 1 );
		}
		echo "OK: alt=\"loading='lazy' onerror=alert(1)\" creates no new attribute and alt stays intact\n";
	}

	/**
	 * Verify the testimonial rating icon is skipped and the real slide image is chosen.
	 *
	 * @return void
	 */
	public function test_lcp_skips_rating_icon(): void {
		StyleGenerator::reset_styles();

		$content = '<div class="swiper"><div class="swiper-wrapper"><div class="swiper-slide">' .
			'<div class="gslider-testimonial-rating-icon"><img src="http://localhost/wp-content/uploads/star.png" alt="star" loading="lazy"></div>' .
			'<div class="gslider-testimonial-image"><img src="http://localhost/wp-content/uploads/avatar.jpg" alt="Jane" loading="lazy"></div>' .
			'</div></div></div>';

		$output = StyleGenerator::getInstance()->collect_and_render_dynamic_styles(
			$content,
			[
				'blockName' => 'gslider-blocks/testimonial',
				'attrs'     => [ 'blockId' => 'gslider-testimonial' ],
			]
		);

		$processor = new WP_HTML_Tag_Processor( $output );
		$processor->next_tag( 'img' );
		if ( null !== $processor->get_attribute( 'fetchpriority' ) || 'lazy' !== $processor->get_attribute( 'loading' ) ) {
			fwrite( STDERR, "FAIL: Testimonial rating icon was optimized: $output\n" );
			exit( 1 );
		}
		$processor->next_tag( 'img' );
		if ( 'high' !== $processor->get_attribute( 'fetchpriority' ) || 'eager' !== $processor->get_attribute( 'loading' ) || 'async' !== $processor->get_attribute( 'decoding' ) ) {
			fwrite( STDERR, "FAIL: Real testimonial image was not optimized: $output\n" );
			exit( 1 );
		}
		echo "OK: Rating icon untouched, first real slide image optimized\n";
	}

	/**
	 * Verify post-carousel skips author avatars, readmore icons, nav icons, and secondary slides.
	 *
	 * @return void
	 */
	public function test_lcp_post_carousel_skips_avatars_icons_and_secondary_slides(): void {
		global $is_admin_mock, $is_feed_mock, $is_rest_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;
		$is_rest_mock  = false;

		$generator = StyleGenerator::getInstance();

		// Case 1: Custom contentOrder puts avatar and readmore icon BEFORE first featured image.
		StyleGenerator::reset_styles();
		$content_first_slide_thumb = '<div class="gslider-post-carousel-wrapper gslider-pc-lcp">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><article class="gslider-post-carousel-card">' .
			'<div class="gslider-post-carousel-meta"><div class="gslider-post-author-wrapper"><div class="gslider-post-author-avatar-wrapper">' .
			'<img class="gslider-post-author-avatar" src="http://localhost/wp-content/uploads/avatar1.jpg" alt="Author" loading="lazy" />' .
			'</div></div></div>' .
			'<div class="gslider-post-carousel-readmore"><a class="gslider-post-carousel-readmore-btn" href="#"><span class="gslider-readmore-icon-wrap"><img src="http://localhost/wp-content/uploads/arrow.png" alt="Arrow" /></span></a></div>' .
			'<div class="gslider-post-carousel-image"><a href="#"><img src="http://localhost/wp-content/uploads/post1-thumb.jpg" alt="Post 1" loading="lazy" /></a></div>' .
			'</article></div>' .
			'<div class="swiper-slide"><article class="gslider-post-carousel-card">' .
			'<div class="gslider-post-carousel-image"><a href="#"><img src="http://localhost/wp-content/uploads/post2-thumb.jpg" alt="Post 2" loading="lazy" /></a></div>' .
			'</article></div>' .
			'</div></div></div>';

		$output_1 = $generator->collect_and_render_dynamic_styles(
			$content_first_slide_thumb,
			[
				'blockName' => 'gslider-blocks/post-carousel',
				'attrs'     => [ 'blockId' => 'gslider-pc-lcp' ],
			]
		);

		$processor = new WP_HTML_Tag_Processor( $output_1 );
		$processor->next_tag( 'img' ); // Author avatar.
		if ( null !== $processor->get_attribute( 'fetchpriority' ) || 'lazy' !== $processor->get_attribute( 'loading' ) ) {
			fwrite( STDERR, "FAIL: Post carousel author avatar was improperly promoted for LCP: $output_1\n" );
			exit( 1 );
		}
		$processor->next_tag( 'img' ); // Readmore button image icon.
		if ( null !== $processor->get_attribute( 'fetchpriority' ) ) {
			fwrite( STDERR, "FAIL: Post carousel readmore image icon was improperly promoted for LCP: $output_1\n" );
			exit( 1 );
		}
		$processor->next_tag( 'img' ); // Slide 0 featured thumbnail.
		if ( 'high' !== $processor->get_attribute( 'fetchpriority' ) || 'eager' !== $processor->get_attribute( 'loading' ) || 'async' !== $processor->get_attribute( 'decoding' ) ) {
			fwrite( STDERR, "FAIL: Slide 0 post thumbnail was not optimized for LCP: $output_1\n" );
			exit( 1 );
		}
		$processor->next_tag( 'img' ); // Slide 1 featured thumbnail.
		if ( null !== $processor->get_attribute( 'fetchpriority' ) || 'lazy' !== $processor->get_attribute( 'loading' ) ) {
			fwrite( STDERR, "FAIL: Slide 1 post thumbnail lost loading=\"lazy\" or got fetchpriority: $output_1\n" );
			exit( 1 );
		}
		echo "OK: Post carousel skips avatar/readmore icon and optimizes only slide 0 featured image\n";

		// Case 2: Slide 0 has NO featured thumbnail, Slide 1 HAS featured thumbnail, plus custom image navigation inside .swiper.
		StyleGenerator::reset_styles();
		$content_no_first_thumb = '<div class="gslider-post-carousel-wrapper gslider-pc-nothumb">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><article class="gslider-post-carousel-card">' .
			'<div class="gslider-post-carousel-meta"><div class="gslider-post-author-wrapper"><div class="gslider-post-author-avatar-wrapper">' .
			'<img class="gslider-post-author-avatar" src="http://localhost/wp-content/uploads/avatar1.jpg" alt="Author" loading="lazy" />' .
			'</div></div></div>' .
			'</article></div>' .
			'<div class="swiper-slide"><article class="gslider-post-carousel-card">' .
			'<div class="gslider-post-carousel-image"><a href="#"><img src="http://localhost/wp-content/uploads/post2-thumb.jpg" alt="Post 2" loading="lazy" /></a></div>' .
			'</article></div>' .
			'</div>' .
			'<div class="gslider-navigation-custom-icon-wrapper inside center">' .
			'<div class="swiper-button-prev" role="button"><img src="http://localhost/wp-content/uploads/prev.png" alt="Prev" /></div>' .
			'</div>' .
			'</div></div>';

		$output_2 = $generator->collect_and_render_dynamic_styles(
			$content_no_first_thumb,
			[
				'blockName' => 'gslider-blocks/post-carousel',
				'attrs'     => [ 'blockId' => 'gslider-pc-nothumb' ],
			]
		);

		if ( false !== strpos( $output_2, 'fetchpriority' ) ) {
			fwrite( STDERR, "FAIL: Secondary slide thumbnail or nav icon received fetchpriority when slide 0 had no featured image: $output_2\n" );
			exit( 1 );
		}
		echo "OK: Secondary slide thumbnail and navigation icon images remain untouched when slide 0 has no featured thumbnail\n";
	}

	/**
	 * Verify images outside slide markup are ignored and do not consume the once-per-page guard.
	 *
	 * @return void
	 */
	public function test_lcp_skips_non_slide_markup(): void {
		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$no_slide = $generator->collect_and_render_dynamic_styles( '<div><img src="http://localhost/wp-content/uploads/a.jpg" loading="lazy"></div>', $this->slider_block( 'gslider-noslide' ) );
		if ( false !== strpos( $no_slide, 'fetchpriority' ) ) {
			fwrite( STDERR, "FAIL: Image outside .swiper-slide was optimized\n" );
			exit( 1 );
		}

		$later = $generator->collect_and_render_dynamic_styles(
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/b.jpg" loading="lazy"></div>',
			$this->slider_block( 'gslider-slide' )
		);
		if ( false === strpos( $later, 'fetchpriority="high"' ) ) {
			fwrite( STDERR, "FAIL: Slide image after non-slide markup was not optimized\n" );
			exit( 1 );
		}
		echo "OK: Non-slide images are ignored; first real slide image still optimized\n";
	}

	/**
	 * Test 9: Verify 'gslider_lcp_optimize' filter allows disabling or customizing LCP optimization.
	 *
	 * @return void
	 */
	public function test_gslider_lcp_optimize_filter(): void {
		global $is_admin_mock, $is_feed_mock, $is_rest_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;
		$is_rest_mock  = false;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		// Add filter to disable LCP optimization.
		add_filter( 'gslider_lcp_optimize', '__return_false' );

		$block_id = 'gslider-filtered-slider';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { height: 400px; }",
			],
		];

		$content = '<div class="gslider-image-slider-wrapper ' . $block_id . '">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/filtered.jpg" alt="Filtered" loading="lazy" /></div>' .
			'</div></div></div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );

		// Should retain loading="lazy" and NOT have fetchpriority="high" because filter returned false.
		if ( false !== strpos( $output, 'fetchpriority' ) ) {
			fwrite( STDERR, "FAIL: LCP optimization ran despite gslider_lcp_optimize filter returning false\n" );
			exit( 1 );
		}
		if ( false === strpos( $output, 'loading="lazy"' ) ) {
			fwrite( STDERR, "FAIL: Image lost loading=\"lazy\" despite filter returning false\n" );
			exit( 1 );
		}
		echo "OK: 'gslider_lcp_optimize' filter returning false successfully disables LCP image optimization\n";

		// Remove filter and test with filter returning true.
		remove_filter( 'gslider_lcp_optimize', '__return_false' );
		StyleGenerator::reset_styles();

		$output_enabled = $generator->collect_and_render_dynamic_styles( $content, $block );
		if ( false === strpos( $output_enabled, 'fetchpriority="high"' ) ) {
			fwrite( STDERR, "FAIL: LCP optimization did not run when gslider_lcp_optimize was unhooked\n" );
			exit( 1 );
		}
		echo "OK: 'gslider_lcp_optimize' filter default true successfully performs LCP optimization\n";
	}

	/**
	 * Verify ensure_image_dimensions injects width and height on slide images.
	 *
	 * @return void
	 */
	public function test_ensure_image_dimensions(): void {
		global $is_admin_mock, $is_feed_mock, $attachment_metadata_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		$attachment_metadata_mock = [
			42 => [
				'file'   => '2026/01/photo1.jpg',
				'width'  => 800,
				'height' => 600,
			],
			43 => [
				'file'   => '2026/01/photo2.jpg',
				'width'  => 400,
				'height' => 300,
			],
			44 => [
				'file'   => '2026/01/photo3.jpg',
				'width'  => 1200,
				'height' => 800,
			],
		];

		$generator = StyleGenerator::getInstance();

		$block = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId' => 'gslider-img-test',
				'images'  => [
					[
						'id'  => -1, // Template mock id: must be skipped gracefully
						'url' => 'http://localhost/wp-content/uploads/template-placeholder.jpg',
					],
					[
						'id'  => 42,
						'url' => 'http://localhost/wp-content/uploads/2026/01/photo1.jpg',
					],
					[
						'id'  => 43,
						'url' => 'http://localhost/wp-content/uploads/2026/01/photo2.jpg',
					],
					[
						'id'  => 44,
						'url' => 'http://localhost/wp-content/uploads/2026/01/photo3.jpg',
					],
					[
						// CodeRabbit safety test: non-string url or malformed item should not trigger TypeError
						'id'  => 45,
						'url' => [ 'malformed' => 'array' ],
					],
				],
			],
		];

		$content = '<div class="wp-block-gslider-blocks-image-slider gslider-image-slider-wrapper">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/template-placeholder.jpg" alt="Template" /></div>' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/2026/01/photo1.jpg" alt="Photo 1" /></div>' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/2026/01/photo2.jpg" alt="Photo 2" width="500" height="400" /></div>' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/2026/01/photo3.jpg" alt="Photo 3" /></div>' .
			'</div></div></div>';

		$output = $generator->ensure_image_dimensions( $content, $block );

		// Image 1: dimensions injected.
		if ( ! preg_match( '/<img(?=[^>]*photo1\.jpg)(?=[^>]*\swidth="800")(?=[^>]*\sheight="600")[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions failed to inject width=\"800\" height=\"600\" on photo1.jpg\n" );
			exit( 1 );
		}

		// Image 2: existing dimensions preserved (not overwritten).
		if ( ! preg_match( '/<img(?=[^>]*photo2\.jpg)(?=[^>]*\swidth="500")(?=[^>]*\sheight="400")[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions failed to preserve existing width=\"500\" height=\"400\" on photo2.jpg\n" );
			exit( 1 );
		}

		// Image 3: dimensions injected.
		if ( ! preg_match( '/<img(?=[^>]*photo3\.jpg)(?=[^>]*\swidth="1200")(?=[^>]*\sheight="800")[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions failed to inject width=\"1200\" height=\"800\" on photo3.jpg\n" );
			exit( 1 );
		}

		// Template mock image: no dimensions injected.
		if ( preg_match( '/<img[^>]*template-placeholder\.jpg[^>]*width=/i', $output ) ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions should not inject dimensions for negative attachment IDs\n" );
			exit( 1 );
		}

		echo "OK: ensure_image_dimensions injects width/height from attachment metadata\n";

		// Admin bypass test.
		$is_admin_mock = true;
		$admin_output  = $generator->ensure_image_dimensions( $content, $block );
		$is_admin_mock = false;
		if ( $admin_output !== $content ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions should bypass in admin context\n" );
			exit( 1 );
		}
		echo "OK: ensure_image_dimensions bypasses in admin context\n";

		// Feed bypass test.
		$is_feed_mock = true;
		$feed_output  = $generator->ensure_image_dimensions( $content, $block );
		$is_feed_mock = false;
		if ( $feed_output !== $content ) {
			fwrite( STDERR, "FAIL: ensure_image_dimensions should bypass in feed context\n" );
			exit( 1 );
		}
		echo "OK: ensure_image_dimensions bypasses in feed context\n";
	}

	/**
	 * Verify ensure_image_dimensions edge cases: intermediate sizes, data-* attributes,
	 * non-slide images and same-basename images from another folder.
	 *
	 * @return void
	 */
	public function test_ensure_image_dimensions_edge_cases(): void {
		global $is_admin_mock, $is_feed_mock, $attachment_metadata_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		$attachment_metadata_mock = [
			50 => [
				'file'   => '2026/02/hero.jpg',
				'width'  => 2000,
				'height' => 1000,
				'sizes'  => [
					'medium' => [
						'file'   => 'hero-300x300.jpg',
						'width'  => 300,
						'height' => 300,
					],
				],
			],
			51 => [
				'file'   => '2026/02/logo.png',
				'width'  => 640,
				'height' => 320,
			],
		];

		$generator = StyleGenerator::getInstance();
		$block     = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId' => 'gslider-img-edge',
				'images'  => [
					[
						'id'  => 50,
						'url' => 'http://localhost/wp-content/uploads/2026/02/hero-300x300.jpg',
					],
					[
						'id'  => 51,
						'url' => 'http://localhost/wp-content/uploads/2026/02/logo.png',
					],
				],
			],
		];

		$content = '<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/2026/02/hero-300x300.jpg" alt="a > b" /></div>' .
			'<div class="swiper-slide"><img data-width="9" data-height="9" src="http://localhost/wp-content/uploads/2026/02/logo.png" alt="Logo"></div>' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/plugins/x/logo.png" class="nav-icon" alt="Nav"></div>' .
			'</div></div>';

		$output = $generator->ensure_image_dimensions( $content, $block );

		if ( ! preg_match( '/<img(?=[^>]*hero-300x300\.jpg)(?=[^>]*\swidth="300")(?=[^>]*\sheight="300")/i', $output ) ) {
			fwrite( STDERR, "FAIL: intermediate size did not get its own 300x300 dimensions. Expected width=\"300\" height=\"300\" on hero-300x300.jpg. Actual: $output\n" );
			exit( 1 );
		}
		if ( false !== strpos( $output, 'width="2000"' ) ) {
			fwrite( STDERR, "FAIL: full-size dimensions were injected on an intermediate size. Expected no width=\"2000\". Actual: $output\n" );
			exit( 1 );
		}
		if ( ! preg_match( '/<img(?=[^>]*uploads\/2026\/02\/logo\.png)(?=[^>]*\swidth="640")(?=[^>]*\sheight="320")(?=[^>]*data-width="9")/i', $output ) ) {
			fwrite( STDERR, "FAIL: data-width/data-height blocked real width/height injection. Expected width=\"640\" height=\"320\" and data-width=\"9\". Actual: $output\n" );
			exit( 1 );
		}
		if ( 1 !== substr_count( $output, 'width="640"' ) ) {
			fwrite( STDERR, "FAIL: same-basename image from another folder got slide dimensions. Expected exactly 1 occurrence of width=\"640\". Actual: $output\n" );
			exit( 1 );
		}

		$outside        = '<div class="gslider-nav"><img src="http://localhost/wp-content/uploads/2026/02/logo.png" alt="x"></div>';
		$outside_actual = $generator->ensure_image_dimensions( $outside, $block );
		if ( $outside !== $outside_actual ) {
			fwrite( STDERR, "FAIL: image outside .swiper-slide was modified. Expected: $outside. Actual: $outside_actual\n" );
			exit( 1 );
		}

		echo "OK: ensure_image_dimensions handles sizes, data-* attributes and non-slide images\n";
	}

	/**
	 * Verify ensure_image_dimensions injects dimensions on testimonial author, quote, and rating images.
	 *
	 * @return void
	 */
	public function test_ensure_image_dimensions_testimonial_author_image(): void {
		global $is_admin_mock, $is_feed_mock, $attachment_metadata_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		$attachment_metadata_mock = [
			60 => [
				'file'   => '2026/02/author.jpg',
				'width'  => 400,
				'height' => 400,
			],
			61 => [
				'file'   => '2026/02/quote-mark.png',
				'width'  => 80,
				'height' => 80,
			],
			62 => [
				'file'   => '2026/02/star.png',
				'width'  => 24,
				'height' => 24,
			],
		];

		$generator = StyleGenerator::getInstance();
		$block     = [
			'blockName' => 'gslider-blocks/testimonial',
			'attrs'     => [
				'blockId'       => 'gslider-test-author',
				'quoteImageID'  => 61,
				'quoteImageUrl' => 'http://localhost/wp-content/uploads/2026/02/quote-mark.png',
				'sliderItems'   => [
					[
						'authorName'  => 'Jane Doe',
						'authorImage' => [
							'id'  => 60,
							'url' => 'http://localhost/wp-content/uploads/2026/02/author.jpg',
						],
						'ratingImage' => [
							'id'  => 62,
							'url' => 'http://localhost/wp-content/uploads/2026/02/star.png',
						],
					],
				],
			],
		];

		$content = '<div class="wp-block-gslider-blocks-testimonial gslider-testimonial-wrapper">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide">' .
			'<div class="gslider-testimonial-quote-icon-wrapper">' .
			'<img src="http://localhost/wp-content/uploads/2026/02/quote-mark.png" alt="Quote" />' .
			'</div>' .
			'<div class="gslider-testimonial-author-image-wrapper">' .
			'<img src="http://localhost/wp-content/uploads/2026/02/author.jpg" alt="Jane" class="gslider-testimonial-author-image" />' .
			'</div>' .
			'<div class="gslider-testimonial-rating-wrapper">' .
			'<div class="gslider-testimonial-rating-icon">' .
			'<img src="http://localhost/wp-content/uploads/2026/02/star.png" alt="Star" />' .
			'</div>' .
			'</div>' .
			'</div>' .
			'</div>' .
			'</div></div></div>';

		$output = $generator->ensure_image_dimensions( $content, $block );

		if ( ! preg_match( '/<img(?=[^>]*author\.jpg)(?=[^>]*\swidth="400")(?=[^>]*\sheight="400")[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: Testimonial author image did not receive injected width=\"400\" height=\"400\". Expected dimensions on author.jpg. Actual: $output\n" );
			exit( 1 );
		}

		if ( ! preg_match( '/<img(?=[^>]*quote-mark\.png)(?=[^>]*\swidth="80")(?=[^>]*\sheight="80")[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: Testimonial quote image did not receive injected width=\"80\" height=\"80\". Expected dimensions on quote-mark.png. Actual: $output\n" );
			exit( 1 );
		}

		if ( ! preg_match( '/<img(?=[^>]*star\.png)(?=[^>]*\swidth="24")(?=[^>]*\sheight="24")[^>]*>/i', $output ) ) {
			fwrite( STDERR, "FAIL: Testimonial rating image did not receive injected width=\"24\" height=\"24\". Expected dimensions on star.png. Actual: $output\n" );
			exit( 1 );
		}

		echo "OK: ensure_image_dimensions injects dimensions on testimonial author, quote, and rating images\n";
	}

	/**
	 * Test 11: Verify reset_styles() cleans all internal state.
	 *
	 * @return void
	 */
	public function test_reset_styles(): void {
		global $is_admin_mock, $is_feed_mock, $is_rest_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;
		$is_rest_mock  = false;

		$generator = StyleGenerator::getInstance();
		StyleGenerator::reset_styles();

		$styles = StyleGenerator::get_collected_styles();
		if ( ! empty( $styles ) ) {
			fwrite( STDERR, "FAIL: reset_styles() did not clear collected styles\n" );
			exit( 1 );
		}

		$block_id = 'gslider-reset-test';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { background: #fff; }",
			],
		];
		$content  = '<div class="wp-block-gslider-blocks-image-slider ' . $block_id . '">' .
			'<div class="swiper"><div class="swiper-wrapper">' .
			'<div class="swiper-slide"><img src="http://localhost/wp-content/uploads/reset.jpg" alt="Reset" loading="lazy" /></div>' .
			'</div></div></div>';

		// First render sets printed-ID and LCP state.
		$generator->collect_and_render_dynamic_styles( $content, $block );
		StyleGenerator::reset_styles();

		// After reset, re-rendering must output the style tag and apply LCP optimization again.
		$output = $generator->collect_and_render_dynamic_styles( $content, $block );
		if ( false === strpos( $output, '<style id="gslider-style-' . $block_id . '">' ) ) {
			fwrite( STDERR, "FAIL: reset_styles() did not clear printed block IDs\n" );
			exit( 1 );
		}
		if ( false === strpos( $output, 'fetchpriority="high"' ) || false === strpos( $output, 'reset.jpg' ) ) {
			fwrite( STDERR, "FAIL: reset_styles() did not clear the LCP flag\n" );
			exit( 1 );
		}

		echo "OK: reset_styles() clears collected styles, printed block IDs, and the LCP flag\n";
	}
	/**
	 * Test 9: Verify CSP nonce injection on dynamic <style> tags (#314).
	 *
	 * @return void
	 */
	public function test_csp_nonce_injection(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		remove_all_filters( 'gslider_style_nonce' );
		remove_all_filters( 'gslider_csp_nonce' );
		remove_all_filters( 'wp_csp_nonce' );

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		// Case 1: Custom gslider_style_nonce filter.
		add_filter( 'gslider_style_nonce', function() {
			return 'nonce-gslider-custom-123';
		} );

		$block_id = 'gslider-csp-block-1';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { opacity: 1; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper">CSP Test 1</div>';

		$output = $generator->collect_and_render_dynamic_styles( $content, $block );
		$expected_nonce_tag = '<style id="gslider-style-' . $block_id . '" nonce="nonce-gslider-custom-123">';

		if ( false === strpos( $output, $expected_nonce_tag ) ) {
			fwrite( STDERR, "FAIL: Inline <style> tag missing expected nonce attribute. Expected: {$expected_nonce_tag}, Got: {$output}\n" );
			exit( 1 );
		}
		echo "OK: Dynamic <style> tag receives nonce from 'gslider_style_nonce' filter\n";

		remove_all_filters( 'gslider_style_nonce' );

		// Case 2: Third-party security compatibility filter 'wp_csp_nonce'.
		add_filter( 'wp_csp_nonce', function() {
			return 'nonce-wp-core-456';
		} );

		StyleGenerator::reset_styles();
		$block_id_2 = 'gslider-csp-block-2';
		$block_2    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id_2,
				'blockStyle' => ".{$block_id_2} { opacity: 0.8; }",
			],
		];
		$output_2   = $generator->collect_and_render_dynamic_styles( $content, $block_2 );
		$expected_wp_tag = '<style id="gslider-style-' . $block_id_2 . '" nonce="nonce-wp-core-456">';

		if ( false === strpos( $output_2, $expected_wp_tag ) ) {
			fwrite( STDERR, "FAIL: Inline <style> tag missing fallback nonce attribute. Expected: {$expected_wp_tag}, Got: {$output_2}\n" );
			exit( 1 );
		}
		echo "OK: Dynamic <style> tag falls back cleanly to 'wp_csp_nonce' compatibility filter\n";

		remove_all_filters( 'wp_csp_nonce' );

		// Case 3: Malicious nonce payload is sanitized and HTML-escaped in both output paths.
		add_filter( 'gslider_style_nonce', function() {
			return 'bad-nonce" onload="alert(1)" <script>alert(2)</script>';
		} );

		StyleGenerator::reset_styles();
		$block_id_3 = 'gslider-csp-block-3';
		$block_3    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id_3,
				'blockStyle' => ".{$block_id_3} { opacity: 0.5; }",
			],
		];
		$output_3   = $generator->collect_and_render_dynamic_styles( $content, $block_3 );

		if ( false !== strpos( $output_3, '<script' ) || false !== strpos( $output_3, '" onload=' ) ) {
			fwrite( STDERR, "FAIL: Malicious CSP nonce was not safely contained in inline style tag: $output_3\n" );
			exit( 1 );
		}
		if ( false === strpos( $output_3, 'nonce="bad-nonce&quot; onload=&quot;alert(1)&quot;"' ) ) {
			fwrite( STDERR, "FAIL: Expected escaped nonce attribute not found in inline style tag: $output_3\n" );
			exit( 1 );
		}
		echo "OK: Malicious CSP nonce is safely contained and escaped in inline <style> tag\n";

		// Verify footer output path also sanitizes and escapes malicious nonce.
		StyleGenerator::reset_styles();
		$ref_styles = new ReflectionProperty( StyleGenerator::class, 'styles' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref_styles->setAccessible( true );
		}
		$ref_styles->setValue( null, [ 'footer-csp-block' => '.footer-csp-block { color: red; }' ] );

		ob_start();
		$generator->print_footer_styles();
		$footer_output = ob_get_clean();

		if ( false !== strpos( $footer_output, '<script' ) || false !== strpos( $footer_output, '" onload=' ) ) {
			fwrite( STDERR, "FAIL: Malicious CSP nonce was not safely contained in footer style tag: $footer_output\n" );
			exit( 1 );
		}
		if ( false === strpos( $footer_output, 'nonce="bad-nonce&quot; onload=&quot;alert(1)&quot;"' ) ) {
			fwrite( STDERR, "FAIL: Expected escaped nonce attribute not found in footer style tag: $footer_output\n" );
			exit( 1 );
		}
		echo "OK: Malicious CSP nonce is safely contained and escaped in footer <style> tag\n";

		remove_all_filters( 'gslider_style_nonce' );
	}

	/**
	 * Test 11: Verify print_footer_styles() deduplicates inline printed styles.
	 *
	 * @return void
	 */
	public function test_print_footer_styles_deduplication(): void {
		global $is_admin_mock, $is_feed_mock;
		$is_admin_mock = false;
		$is_feed_mock  = false;

		StyleGenerator::reset_styles();
		$generator = StyleGenerator::getInstance();

		$block_id = 'gslider-footer-test';
		$block    = [
			'blockName' => 'gslider-blocks/image-slider',
			'attrs'     => [
				'blockId'    => $block_id,
				'blockStyle' => ".{$block_id} { color: red; }",
			],
		];
		$content  = '<div class="gslider-image-slider-wrapper ' . $block_id . '">Slider</div>';

		// Render block inline (it gets printed and stored in self::$printed).
		$generator->collect_and_render_dynamic_styles( $content, $block );

		// Capture print_footer_styles() output.
		ob_start();
		$generator->print_footer_styles();
		$footer_output = ob_get_clean();

		if ( ! empty( $footer_output ) ) {
			fwrite( STDERR, "FAIL: print_footer_styles() unexpectedly printed duplicate styles that were already printed inline: $footer_output\n" );
			exit( 1 );
		}
		echo "OK: print_footer_styles() does not duplicate styles already rendered inline\n";
	}

}

// Standalone execution entrypoint.
( new StyleGeneratorTest() )->run_all_tests();
