<?php
/**
 * Unit tests for GSlider\Classes\FontLoader.
 *
 * Verifies that:
 * 1. FontLoader implements Registrable interface and SingletonTrait.
 * 2. register() hooks font collection into 'render_block' and loading into 'wp_footer'.
 * 3. Default, inherit, empty and system font stacks never trigger a Google Fonts request.
 * 4. The Google Fonts URL requests only the used variants of each family.
 * 5. Privacy mode in gslider_settings suppresses all Google Fonts enqueues.
 * 6. The 'gslider_google_fonts_privacy_enabled' filter suppresses all Google Fonts enqueues.
 * 7. Several blocks using the same font are merged into one stylesheet handle.
 *
 * @package GSlider\Tests\Classes
 */

require_once dirname( __DIR__ ) . '/bootstrap.php';

// Require Core Classes Under Test
require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/FontLoader.php';
require_once ABSPATH . 'includes/Plugin.php';

use GSlider\Classes\FontLoader;
use GSlider\Interfaces\Registrable;
use GSlider\Plugin;

/**
 * Test class for GSlider\Classes\FontLoader.
 *
 * @package GSlider\Tests\Classes
 */
class FontLoaderTest {

	/**
	 * Stylesheet handle used by FontLoader.
	 *
	 * @var string
	 */
	const STYLE_HANDLE = 'gslider-blocks-fonts';

	/**
	 * Run all test methods in class.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider Blocks Font Loader Tests ===\n\n";

		$this->test_class_implements_registrable_and_singleton();
		$this->test_register_hooks_render_block_and_wp_footer();
		$this->test_ignored_font_families();
		$this->test_google_fonts_url_builder();
		$this->test_privacy_mode_suppression();
		$this->test_privacy_filter_suppresses_google_fonts();
		$this->test_font_deduplication();

		echo "\nAll GSlider Blocks Font Loader tests passed successfully!\n";
	}

	/**
	 * Test 1: Verify FontLoader implements Registrable, follows Singleton pattern and is a Plugin service.
	 *
	 * @return void
	 */
	public function test_class_implements_registrable_and_singleton(): void {
		$loader = FontLoader::getInstance();
		if ( ! in_array( Registrable::class, class_implements( FontLoader::class ), true ) ) {
			$this->fail( 'FontLoader does not implement Registrable interface' );
		}
		echo "OK: FontLoader implements Registrable interface\n";

		if ( $loader !== FontLoader::getInstance() ) {
			$this->fail( 'FontLoader getInstance() returned different instances' );
		}
		echo "OK: FontLoader follows Singleton pattern\n";

		$plugin_reflection = new ReflectionClass( Plugin::class );
		$services_property = $plugin_reflection->getProperty( 'services' );
		if ( PHP_VERSION_ID < 80100 ) {
			$services_property->setAccessible( true );
		}

		$services = $services_property->getValue( Plugin::getInstance() );
		if ( ! in_array( FontLoader::class, $services, true ) ) {
			$this->fail( 'FontLoader::class is not registered in Plugin::$services' );
		}
		echo "OK: Plugin services array contains FontLoader::class\n";
	}

	/**
	 * Test 2: Verify register() hooks the font collector and the footer loader.
	 *
	 * Fonts are collected while blocks render, so they are enqueued on
	 * 'wp_footer' instead of 'wp_enqueue_scripts'.
	 *
	 * @return void
	 */
	public function test_register_hooks_render_block_and_wp_footer(): void {
		global $wp_actions, $wp_filters;
		$this->reset_state();
		unset( $wp_filters['render_block'], $wp_actions['wp_footer'] );

		$loader = FontLoader::getInstance();
		$loader->register();

		$render_hook = $this->find_hook( $wp_filters['render_block'] ?? [], $loader, 'get_fonts_on_render_block' );
		if ( null === $render_hook || 10 !== $render_hook['priority'] || 2 !== $render_hook['accepted_args'] ) {
			$this->fail( "register() did not hook get_fonts_on_render_block into 'render_block' at priority 10 with 2 args" );
		}
		echo "OK: FontLoader hooks get_fonts_on_render_block into 'render_block'\n";

		$footer_hook = $this->find_hook( $wp_actions['wp_footer'] ?? [], $loader, 'fonts_loader' );
		if ( null === $footer_hook || 10 !== $footer_hook['priority'] ) {
			$this->fail( "register() did not hook fonts_loader into 'wp_footer' at priority 10" );
		}
		echo "OK: FontLoader hooks fonts_loader into 'wp_footer'\n";

		unset( $wp_filters['render_block'], $wp_actions['wp_footer'] );
	}

	/**
	 * Test 3: Verify ignored, system and invalid font families never request Google Fonts.
	 *
	 * @return void
	 */
	public function test_ignored_font_families(): void {
		$ignored = [
			'default'           => 'default',
			'Default'           => 'Default',
			'inherit'           => 'inherit',
			'empty'             => '',
			'whitespace'        => '   ',
			'system stack'      => 'Arial, sans-serif',
			'injection payload' => 'Roboto&family=Evil',
			'non-string'        => [ 'Roboto' ],
		];

		foreach ( $ignored as $label => $family ) {
			$fonts = FontLoader::get_fonts_family( [ 'titleFontFamily' => $family ] );
			if ( [] !== $fonts ) {
				$this->fail( sprintf( "get_fonts_family() should ignore %s family, got %s", $label, json_encode( $fonts ) ) );
			}
		}
		echo "OK: get_fonts_family() ignores default, inherit, empty, system stack and invalid families\n";

		// @phpstan-ignore argument.type (a non-array value is passed on purpose to test the input guard)
		if ( [] !== FontLoader::get_fonts_family( 'not-an-array' ) ) {
			$this->fail( 'get_fonts_family() should return an empty array for non-array attributes' );
		}
		echo "OK: get_fonts_family() returns empty array for non-array attributes\n";

		$this->reset_state();
		$loader = FontLoader::getInstance();
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'default' ] ) );
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'inherit' ] ) );
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'Arial, sans-serif' ] ) );
		$loader->get_fonts_on_render_block( '', $this->block( [] ) );
		$loader->get_fonts_on_render_block( '', [ 'blockName' => 'core/paragraph', 'attrs' => [ 'titleFontFamily' => 'Roboto' ] ] );
		$loader->get_fonts_on_render_block( '', [ 'blockName' => null, 'attrs' => [ 'titleFontFamily' => 'Roboto' ] ] );
		// @phpstan-ignore argument.type (a non-array block is passed on purpose to test the input guard)
		$loader->get_fonts_on_render_block( '', 'not-a-block' );
		$loader->fonts_loader();

		$this->assert_no_font_style( 'Ignored families and non-GSlider blocks' );
		echo "OK: Ignored families and non-GSlider blocks make zero Google Fonts requests\n";
	}

	/**
	 * Test 4: Verify the Google Fonts URL requests only the used variants.
	 *
	 * @return void
	 */
	public function test_google_fonts_url_builder(): void {
		global $wp_styles;

		$this->reset_state();
		$loader = FontLoader::getInstance();
		$loader->get_fonts_on_render_block(
			'',
			$this->block(
				[
					'titleFontFamily' => 'Roboto',
					'titleFontWeight' => '700',
					'descFontFamily'  => 'Roboto',
				]
			)
		);
		$loader->fonts_loader();

		$this->assert_font_url( 'Roboto:400,700', 'Font' );
		echo "OK: Font URL requests //fonts.googleapis.com/css?family=Roboto:400,700&display=swap\n";

		if ( GSLIDER_VERSION !== $wp_styles[ self::STYLE_HANDLE ]['ver'] ) {
			$this->fail( sprintf( "Font style version should be '%s', got '%s'", GSLIDER_VERSION, $wp_styles[ self::STYLE_HANDLE ]['ver'] ) );
		}
		echo "OK: Font stylesheet is versioned with GSLIDER_VERSION\n";

		$this->reset_state();
		$loader->get_fonts_on_render_block(
			'',
			$this->block(
				[
					'nameFontFamily'  => 'Open Sans',
					'nameFontWeight'  => '600',
					'nameFontStyle'   => 'italic',
					'titleFontFamily' => 'Lato',
					'titleFontWeight' => 'bold',
				]
			)
		);
		$loader->fonts_loader();

		$this->assert_font_url( 'Lato:400|Open Sans:600italic', 'Font' );
		echo "OK: Font URL sorts families, encodes spaces, adds italic variants and falls back to 400\n";

		global $enqueued_styles;
		$enqueued_styles = [];
		$wp_styles       = [];
		$loader->fonts_loader();
		$this->assert_no_font_style( 'Second fonts_loader() call' );
		echo "OK: fonts_loader() clears collected fonts after loading\n";
	}

	/**
	 * Test 5: Verify privacy mode in gslider_settings suppresses all Google Fonts requests.
	 *
	 * @return void
	 */
	public function test_privacy_mode_suppression(): void {
		global $wp_options;

		$this->reset_state();
		$wp_options['gslider_settings'] = [ 'google_fonts_privacy' => true ];

		if ( true !== FontLoader::is_privacy_mode_enabled() ) {
			$this->fail( 'is_privacy_mode_enabled() should return true when google_fonts_privacy is set' );
		}
		echo "OK: is_privacy_mode_enabled() reads gslider_settings['google_fonts_privacy']\n";

		$loader  = FontLoader::getInstance();
		$content = '<div class="gslider">Slide</div>';
		$result  = $loader->get_fonts_on_render_block( $content, $this->block( [ 'titleFontFamily' => 'Roboto' ] ) );
		if ( $content !== $result ) {
			$this->fail( 'get_fonts_on_render_block() should return block content unchanged in privacy mode' );
		}
		if ( [] !== $this->collected_fonts() ) {
			$this->fail( sprintf( 'get_fonts_on_render_block() should not collect fonts in privacy mode, got %s', json_encode( $this->collected_fonts() ) ) );
		}
		echo "OK: Privacy mode skips font collection during block render\n";

		$loader->fonts_loader();
		$this->assert_no_font_style( 'Privacy mode' );
		echo "OK: Privacy mode makes zero Google Fonts requests\n";

		// Fonts collected before privacy mode turns on must be dropped, not loaded later.
		$wp_options = [];
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'Roboto' ] ) );
		$wp_options['gslider_settings'] = [ 'google_fonts_privacy' => true ];
		$loader->fonts_loader();
		if ( [] !== $this->collected_fonts() ) {
			$this->fail( 'fonts_loader() should clear collected fonts in privacy mode' );
		}
		$wp_options = [];
		$loader->fonts_loader();
		$this->assert_no_font_style( 'Fonts collected before privacy mode' );
		echo "OK: Privacy mode clears fonts collected earlier in the request\n";

		$wp_options['gslider_settings'] = 'invalid';
		if ( false !== FontLoader::is_privacy_mode_enabled() ) {
			$this->fail( 'is_privacy_mode_enabled() should return false for non-array settings' );
		}
		echo "OK: is_privacy_mode_enabled() returns false for invalid settings\n";

		$this->reset_state();
	}

	/**
	 * Test 6: Verify the privacy filter suppresses all Google Fonts requests.
	 *
	 * The production filter is 'gslider_google_fonts_privacy_enabled'.
	 *
	 * @return void
	 */
	public function test_privacy_filter_suppresses_google_fonts(): void {
		$this->reset_state();
		add_filter( 'gslider_google_fonts_privacy_enabled', '__return_true' );

		if ( true !== FontLoader::is_privacy_mode_enabled() ) {
			$this->fail( "'gslider_google_fonts_privacy_enabled' filter did not enable privacy mode" );
		}

		$loader = FontLoader::getInstance();
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'Roboto' ] ) );
		$loader->fonts_loader();
		$this->assert_no_font_style( "'gslider_google_fonts_privacy_enabled' filter" );
		echo "OK: 'gslider_google_fonts_privacy_enabled' filter suppresses Google Fonts requests\n";

		remove_all_filters( 'gslider_google_fonts_privacy_enabled' );

		global $wp_options;
		$wp_options['gslider_settings'] = [ 'google_fonts_privacy' => true ];
		add_filter( 'gslider_google_fonts_privacy_enabled', '__return_false' );
		if ( false !== FontLoader::is_privacy_mode_enabled() ) {
			$this->fail( "'gslider_google_fonts_privacy_enabled' filter could not disable privacy mode" );
		}
		echo "OK: 'gslider_google_fonts_privacy_enabled' filter overrides the saved setting\n";

		$this->reset_state();
	}

	/**
	 * Test 7: Verify several blocks using the same font share one stylesheet handle.
	 *
	 * @return void
	 */
	public function test_font_deduplication(): void {
		global $wp_styles, $enqueued_styles;

		$this->reset_state();
		$loader = FontLoader::getInstance();
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'Roboto', 'titleFontWeight' => '700' ] ) );
		$loader->get_fonts_on_render_block( '', $this->block( [ 'titleFontFamily' => 'Roboto', 'titleFontWeight' => '700' ] ) );
		$loader->get_fonts_on_render_block( '', $this->block( [ 'descFontFamily' => 'Roboto', 'descFontWeight' => 400 ], 'gslider-blocks/testimonial' ) );
		$loader->fonts_loader();

		if ( 1 !== count( $wp_styles ) || 1 !== count( $enqueued_styles ) || ! isset( $enqueued_styles[ self::STYLE_HANDLE ] ) ) {
			$this->fail( sprintf( "Expected one '%s' stylesheet, got %d registered and %d enqueued", self::STYLE_HANDLE, count( $wp_styles ), count( $enqueued_styles ) ) );
		}
		echo "OK: Repeated fonts register and enqueue a single stylesheet handle\n";

		$this->assert_font_url( 'Roboto:400,700', 'Merged font' );
		echo "OK: Repeated fonts merge into one family with unique variants\n";

		$this->reset_state();
	}

	/**
	 * Build a GSlider block array for render_block.
	 *
	 * @param array  $attrs      Block attributes.
	 * @param string $block_name Block name.
	 * @return array
	 */
	private function block( array $attrs, string $block_name = 'gslider-blocks/base' ): array {
		return [
			'blockName' => $block_name,
			'attrs'     => $attrs,
		];
	}

	/**
	 * Find a registered hook entry for a callback.
	 *
	 * @param array  $entries Hook entries for one hook name.
	 * @param object $object  Callback object.
	 * @param string $method  Callback method name.
	 * @return array|null
	 */
	private function find_hook( array $entries, object $object, string $method ): ?array {
		foreach ( $entries as $entry ) {
			if (
				is_array( $entry['callback'] ) &&
				$entry['callback'][0] === $object &&
				$method === $entry['callback'][1]
			) {
				return $entry;
			}
		}
		return null;
	}

	/**
	 * Get the fonts FontLoader has collected so far.
	 *
	 * @return array
	 */
	private function collected_fonts(): array {
		$gfonts_property = ( new ReflectionClass( FontLoader::class ) )->getProperty( 'gfonts' );
		if ( PHP_VERSION_ID < 80100 ) {
			$gfonts_property->setAccessible( true );
		}

		return $gfonts_property->getValue();
	}

	/**
	 * Assert the font stylesheet requests the expected Google Fonts family.
	 *
	 * The raw URL is parsed, so host, path and each query parameter are
	 * checked on their own. A family value cannot fake the display parameter.
	 * The raw URL must not contain spaces, since family names use '+'.
	 *
	 * @param string $family  Expected decoded family parameter, where '+' reads as a space.
	 * @param string $context Scenario name for the failure message.
	 * @return void
	 */
	private function assert_font_url( string $family, string $context ): void {
		global $wp_styles, $enqueued_styles;

		if ( ! isset( $wp_styles[ self::STYLE_HANDLE ], $enqueued_styles[ self::STYLE_HANDLE ] ) ) {
			$this->fail( sprintf( "Stylesheet '%s' was not registered and enqueued", self::STYLE_HANDLE ) );
		}

		$src   = $wp_styles[ self::STYLE_HANDLE ]['src'];
		$parts = parse_url( $src );
		$query = [];
		if ( is_array( $parts ) && isset( $parts['query'] ) ) {
			parse_str( $parts['query'], $query );
		}

		$valid = is_array( $parts )
			&& false === strpos( $src, ' ' )
			&& ( ! isset( $parts['scheme'] ) || 'https' === $parts['scheme'] )
			&& 'fonts.googleapis.com' === ( $parts['host'] ?? '' )
			&& '/css' === ( $parts['path'] ?? '' )
			&& [ 'family' => $family, 'display' => 'swap' ] === $query;

		if ( ! $valid ) {
			$this->fail( sprintf( "%s URL mismatch. Expected //fonts.googleapis.com/css with family '%s' and display 'swap', got '%s'", $context, $family, $src ) );
		}
	}

	/**
	 * Assert the font stylesheet was not registered or enqueued.
	 *
	 * @param string $context Scenario name for the failure message.
	 * @return void
	 */
	private function assert_no_font_style( string $context ): void {
		global $wp_styles, $enqueued_styles;

		if ( isset( $wp_styles[ self::STYLE_HANDLE ] ) || isset( $enqueued_styles[ self::STYLE_HANDLE ] ) ) {
			$this->fail( sprintf( "%s should not enqueue Google Fonts, got '%s'", $context, $wp_styles[ self::STYLE_HANDLE ]['src'] ?? '' ) );
		}
	}

	/**
	 * Reset collected fonts, styles, options and privacy filters.
	 *
	 * @return void
	 */
	private function reset_state(): void {
		global $wp_styles, $enqueued_styles, $wp_options;

		FontLoader::reset_collected_fonts();
		$wp_styles       = [];
		$enqueued_styles = [];
		$wp_options      = [];
		remove_all_filters( 'gslider_google_fonts_privacy_enabled' );
	}

	/**
	 * Print a failure message and stop the test run.
	 *
	 * @param string $message Failure message.
	 * @return void
	 */
	private function fail( string $message ): void {
		fwrite( STDERR, 'FAIL: ' . $message . "\n" );
		exit( 1 );
	}
}

// Standalone execution entry point.
( new FontLoaderTest() )->run_all_tests();
