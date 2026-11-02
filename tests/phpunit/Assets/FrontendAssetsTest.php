<?php
/**
 * Unit tests for GSlider\Assets\FrontendAssets.
 *
 * Verifies that:
 * 1. FrontendAssets implements Registrable interface and SingletonTrait.
 * 2. register() hooks into WordPress 'enqueue_block_assets'.
 * 3. Frontend assets register Swiper CSS and deferred scripts (WP 6.3+ strategy).
 * 4. fsLightbox script is registered with defer strategy and enqueued only in admin.
 * 5. Plugin services array contains FrontendAssets::class.
 * 6. fsLightbox is enqueued for Flexi Content only when the slide lightbox is on.
 *
 * @package GSlider\Tests\Assets
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

global $is_admin_mock;
$is_admin_mock = false;

// Require Core Classes Under Test.
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Assets/FrontendAssets.php';
require_once ABSPATH . 'includes/Plugin.php';

use GSlider\Assets\FrontendAssets;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for GSlider\Assets\FrontendAssets.
 *
 * @package GSlider\Tests\Assets
 */
class FrontendAssetsTest {

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider FrontendAssets Unit Tests ===\n\n";

		$this->test_implements_registrable_and_singleton();
		$this->test_plugin_services_contains_class();
		$this->test_register_hooks();
		$this->test_enqueue_assets_registers_scripts_with_defer();
		$this->test_vendor_scripts_not_registered_twice();
		$this->test_fslightbox_admin_enqueue();
		$this->test_slide_lightbox_enqueue();

		echo "\nAll FrontendAssets unit tests passed successfully!\n";
	}

	/**
	 * Test 1: Verify FrontendAssets implements Registrable and follows Singleton pattern.
	 *
	 * @return void
	 */
	public function test_implements_registrable_and_singleton(): void {
		$assets = FrontendAssets::getInstance();
		if ( ! ( $assets instanceof Registrable ) ) {
			fwrite( STDERR, "FAIL: FrontendAssets does not implement Registrable interface\n" );
			exit( 1 );
		}
		echo "OK: FrontendAssets implements Registrable interface\n";

		$assets_again = FrontendAssets::getInstance();
		if ( $assets !== $assets_again ) {
			fwrite( STDERR, "FAIL: FrontendAssets does not maintain singleton identity\n" );
			exit( 1 );
		}
		echo "OK: FrontendAssets implements SingletonTrait correctly\n";
	}

	/**
	 * Test 2: Verify Plugin::$services array contains FrontendAssets::class.
	 *
	 * @return void
	 */
	public function test_plugin_services_contains_class(): void {
		$ref = new ReflectionProperty( Plugin::class, 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$ref->setAccessible( true );
		}
		$services = $ref->getValue( Plugin::getInstance() );

		if ( ! in_array( FrontendAssets::class, $services, true ) ) {
			fwrite( STDERR, "FAIL: Plugin::\$services array does not contain FrontendAssets::class\n" );
			exit( 1 );
		}
		echo "OK: Plugin::\$services contains FrontendAssets::class\n";
	}

	/**
	 * Test 3: Verify register() registers proper action hook.
	 *
	 * @return void
	 */
	public function test_register_hooks(): void {
		global $wp_actions;

		$assets = FrontendAssets::getInstance();
		$assets->register();

		$has_hook = false;
		if ( ! empty( $wp_actions['enqueue_block_assets'] ) ) {
			foreach ( $wp_actions['enqueue_block_assets'] as $action ) {
				if ( is_array( $action['callback'] ) && $action['callback'][0] instanceof FrontendAssets && 'enqueue_assets' === $action['callback'][1] ) {
					$has_hook = true;
					break;
				}
			}
		}

		if ( ! $has_hook ) {
			fwrite( STDERR, "FAIL: FrontendAssets does not hook enqueue_assets into enqueue_block_assets\n" );
			exit( 1 );
		}
		echo "OK: FrontendAssets hooks into enqueue_block_assets action\n";
	}

	/**
	 * Test 4: Verify Swiper and fsLightbox scripts are registered with modern defer strategy.
	 *
	 * @return void
	 */
	public function test_enqueue_assets_registers_scripts_with_defer(): void {
		global $wp_scripts, $wp_styles, $is_admin_mock;
		$is_admin_mock = false;

		$assets = FrontendAssets::getInstance();
		$assets->enqueue_assets();

		// Swiper Style.
		if ( empty( $wp_styles['gslider-blocks-swiper-style'] ) ) {
			fwrite( STDERR, "FAIL: gslider-blocks-swiper-style is not registered\n" );
			exit( 1 );
		}
		echo "OK: Swiper stylesheet registered successfully\n";

		// Swiper Script.
		if ( empty( $wp_scripts['gslider-blocks-swiper-script'] ) ) {
			fwrite( STDERR, "FAIL: gslider-blocks-swiper-script is not registered\n" );
			exit( 1 );
		}
		$swiper_args = $wp_scripts['gslider-blocks-swiper-script']['args'];
		if ( ! is_array( $swiper_args ) || empty( $swiper_args['in_footer'] ) || ( $swiper_args['strategy'] ?? null ) !== 'defer' ) {
			fwrite( STDERR, "FAIL: gslider-blocks-swiper-script is missing strategy => defer\n" );
			exit( 1 );
		}
		echo "OK: Swiper script registered with strategy => defer\n";

		// fsLightbox Script.
		if ( empty( $wp_scripts['gslider-blocks-fslightbox-script'] ) ) {
			fwrite( STDERR, "FAIL: gslider-blocks-fslightbox-script is not registered\n" );
			exit( 1 );
		}
		$lightbox_args = $wp_scripts['gslider-blocks-fslightbox-script']['args'];
		if ( ! is_array( $lightbox_args ) || empty( $lightbox_args['in_footer'] ) || ( $lightbox_args['strategy'] ?? null ) !== 'defer' ) {
			fwrite( STDERR, "FAIL: gslider-blocks-fslightbox-script is missing strategy => defer\n" );
			exit( 1 );
		}
		echo "OK: fsLightbox script registered with strategy => defer\n";
	}

	/**
	 * Verify register_vendor_scripts() never re-registers an existing handle.
	 *
	 * @return void
	 */
	public function test_vendor_scripts_not_registered_twice(): void {
		global $wp_scripts, $wp_actions;

		$assets = FrontendAssets::getInstance();
		$assets->register_vendor_scripts();
		$wp_scripts['gslider-blocks-swiper-script']['src'] = 'sentinel';
		$assets->register_vendor_scripts();
		$assets->enqueue_assets();

		if ( 'sentinel' !== $wp_scripts['gslider-blocks-swiper-script']['src'] ) {
			fwrite( STDERR, "FAIL: gslider-blocks-swiper-script was registered twice\n" );
			exit( 1 );
		}
		echo "OK: Vendor scripts are registered only once\n";

		$assets->register();
		$hooked = false;
		foreach ( $wp_actions['init'] ?? [] as $action ) {
			if ( is_array( $action['callback'] ) && $action['callback'][0] instanceof FrontendAssets && 'register_vendor_scripts' === $action['callback'][1] && 5 === $action['priority'] ) {
				$hooked = true;
			}
		}
		if ( ! $hooked ) {
			fwrite( STDERR, "FAIL: register_vendor_scripts is not hooked on init priority 5\n" );
			exit( 1 );
		}
		echo "OK: register_vendor_scripts hooked on init:5 (before block registration)\n";
	}

	/**
	 * Test 5: Verify fsLightbox script is enqueued only in admin.
	 *
	 * @return void
	 */
	public function test_fslightbox_admin_enqueue(): void {
		global $enqueued_scripts, $is_admin_mock;

		$enqueued_scripts = [];
		$is_admin_mock    = false;

		$assets = FrontendAssets::getInstance();
		$assets->enqueue_assets();

		if ( isset( $enqueued_scripts['gslider-blocks-fslightbox-script'] ) ) {
			fwrite( STDERR, "FAIL: fsLightbox script was enqueued on frontend\n" );
			exit( 1 );
		}
		echo "OK: fsLightbox script is not enqueued on frontend\n";

		$is_admin_mock = true;
		$assets->enqueue_assets();

		if ( ! isset( $enqueued_scripts['gslider-blocks-fslightbox-script'] ) ) {
			fwrite( STDERR, "FAIL: fsLightbox script was not enqueued in admin\n" );
			exit( 1 );
		}
		echo "OK: fsLightbox script is enqueued in admin\n";

		$is_admin_mock = false;
	}

	/**
	 * Test 6: Verify Flexi Content enqueues fsLightbox only when the slide lightbox is on.
	 *
	 * @return void
	 */
	public function test_slide_lightbox_enqueue(): void {
		global $enqueued_scripts, $wp_filters;

		$assets = FrontendAssets::getInstance();
		$assets->register();

		$hooked = false;
		foreach ( $wp_filters['render_block_gslider-blocks/flexi-content'] ?? [] as $filter ) {
			if ( is_array( $filter['callback'] ) && $filter['callback'][0] instanceof FrontendAssets && 'enqueue_slide_lightbox' === $filter['callback'][1] && 2 === $filter['accepted_args'] ) {
				$hooked = true;
			}
		}
		if ( ! $hooked ) {
			fwrite( STDERR, "FAIL: enqueue_slide_lightbox is not hooked on render_block_gslider-blocks/flexi-content\n" );
			exit( 1 );
		}
		echo "OK: enqueue_slide_lightbox hooked on render_block_gslider-blocks/flexi-content\n";

		$off_blocks = [
			[ 'attrs' => [] ],
			[ 'attrs' => [ 'enableSlideLightbox' => [ 'Desktop' => false, 'Tablet' => false, 'Mobile' => false ] ] ],
			[ 'attrs' => [ 'enableSlideLightbox' => 'true' ] ],
		];
		foreach ( $off_blocks as $block ) {
			$enqueued_scripts = [];
			$html             = $assets->enqueue_slide_lightbox( '<div>slider</div>', $block );

			if ( '<div>slider</div>' !== $html ) {
				fwrite( STDERR, "FAIL: enqueue_slide_lightbox changed the block content\n" );
				exit( 1 );
			}
			if ( isset( $enqueued_scripts['gslider-blocks-fslightbox-script'] ) ) {
				fwrite( STDERR, "FAIL: fsLightbox enqueued while the slide lightbox is off\n" );
				exit( 1 );
			}
		}
		echo "OK: fsLightbox is not enqueued when the slide lightbox is off\n";

		$enqueued_scripts = [];
		$assets->enqueue_slide_lightbox(
			'<div>slider</div>',
			[ 'attrs' => [ 'enableSlideLightbox' => [ 'Desktop' => false, 'Tablet' => false, 'Mobile' => true ] ] ]
		);
		if ( ! isset( $enqueued_scripts['gslider-blocks-fslightbox-script'] ) ) {
			fwrite( STDERR, "FAIL: fsLightbox not enqueued when the slide lightbox is on\n" );
			exit( 1 );
		}
		echo "OK: fsLightbox is enqueued when the slide lightbox is on for any device\n";
	}
}

// Standalone execution entrypoint.
( new FrontendAssetsTest() )->run_all_tests();
