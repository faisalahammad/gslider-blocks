<?php
/**
 * Unit tests for GSlider\Blocks\PostCarousel\NavigationBuilder.
 *
 * Verifies inside/outside navigation & pagination slot rendering, accessibility
 * attributes, SupportSVG::sanitize_inline_svg() allowlist & regex hardening
 * (exercised via the lightweight DOMDocument wp_kses() stub), and safe custom
 * image icon escaping across PHP 7.4 through 8.5.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */

require_once dirname( __DIR__, 2 ) . '/stubs/wp-kses-escaping.php';
require_once dirname( __DIR__, 2 ) . '/bootstrap.php';

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		if ( ! ( error_reporting() & $severity ) ) {
			return false;
		}
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/SupportSVG.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/NavigationBuilder.php';

use GSlider\Blocks\PostCarousel\NavigationBuilder;

/**
 * Test class for GSlider\Blocks\PostCarousel\NavigationBuilder.
 *
 * @package GSlider\Tests\Blocks\PostCarousel
 */
class NavigationBuilderTest {

	/**
	 * Asserts that a condition evaluates strictly to true.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion description.
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
	 * Asserts strict identity (`===`) between expected and actual values.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion description.
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
	 * Runs all unit test cases for NavigationBuilder.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		fwrite( STDOUT, "=== GSlider PostCarousel NavigationBuilder Unit Tests ===\n\n" );

		$this->test_class_exists();
		$this->test_render_navigation_guards_and_default_icons();
		$this->test_render_navigation_custom_svg_xss_and_image_icons();
		$this->test_render_pagination_slots_and_block_id_scoping();

		fwrite( STDOUT, "\nAll NavigationBuilder unit tests passed successfully!\n" );
	}

	/**
	 * Verifies NavigationBuilder class autoloads cleanly.
	 *
	 * @return void
	 */
	public function test_class_exists(): void {
		$this->assert_true( class_exists( NavigationBuilder::class ), 'NavigationBuilder class exists' );
	}

	/**
	 * Verifies disabled/slot guards and accessible default arrow markup.
	 *
	 * @return void
	 */
	public function test_render_navigation_guards_and_default_icons(): void {
		$disabled = NavigationBuilder::render_navigation(
			'inside',
			[
				'enabled'       => false,
				'position_type' => 'inside',
			]
		);
		$this->assert_same( '', $disabled, 'render_navigation() returns empty string when navigation is disabled' );

		$mismatched = NavigationBuilder::render_navigation(
			'inside',
			[
				'enabled'       => true,
				'position_type' => 'outside',
			]
		);
		$this->assert_same( '', $mismatched, 'render_navigation() returns empty string when slot position does not match' );

		$inside_html = NavigationBuilder::render_navigation(
			'inside',
			[
				'enabled'          => true,
				'position_type'    => 'inside',
				'use_custom_icons' => false,
				'arrow_position'   => 'top-right" onclick="alert(1)',
			]
		);

		$this->assert_true(
			false !== strpos( $inside_html, 'class="gslider-navigation-default-icon-wrapper inside top-right&quot; onclick=&quot;alert(1)"' ),
			'render_navigation() escapes arrow_position class attribute cleanly'
		);
		$this->assert_true(
			false !== strpos( $inside_html, '<div class="swiper-button-prev" role="button" tabindex="0" aria-label="Previous slide"></div>' ),
			'render_navigation() renders accessible previous button when default icons are active'
		);
		$this->assert_true(
			false !== strpos( $inside_html, '<div class="swiper-button-next" role="button" tabindex="0" aria-label="Next slide"></div>' ),
			'render_navigation() renders accessible next button when default icons are active'
		);
	}

	/**
	 * Verifies custom SVG XSS stripping via SupportSVG and custom image escaping.
	 *
	 * @return void
	 */
	public function test_render_navigation_custom_svg_xss_and_image_icons(): void {
		$malicious_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onload="alert(1)">'
			. '<script>alert(1)</script>'
			. '<path d="M15 18l-6-6 6-6" onclick="alert(2)" href="javascript:alert(3)"/>'
			. '</svg>';
		$safe_svg      = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>';

		$svg_nav = NavigationBuilder::render_navigation(
			'outside',
			[
				'enabled'          => true,
				'position_type'    => 'outside',
				'use_custom_icons' => true,
				'arrow_position'   => 'center',
				'left'             => [
					'align' => 'icon',
					'html'  => $malicious_svg,
				],
				'right'            => [
					'align' => 'icon',
					'html'  => $safe_svg,
				],
			]
		);

		$this->assert_true(
			false !== strpos( $svg_nav, 'class="gslider-navigation-custom-icon-wrapper outside center"' ),
			'render_navigation() applies custom icon wrapper class when use_custom_icons is true'
		);
		$this->assert_true( false !== stripos( $svg_nav, '<svg' ), 'render_navigation() retains valid custom SVG icon markup' );
		$this->assert_true( false !== strpos( $svg_nav, 'd="M15 18l-6-6 6-6"' ), 'render_navigation() preserves safe left arrow SVG path' );
		$this->assert_true( false !== strpos( $svg_nav, 'd="M9 18l6-6-6-6"' ), 'render_navigation() preserves safe right arrow SVG path' );
		$this->assert_true( false === stripos( $svg_nav, '<script' ), 'render_navigation() strips <script> tags from custom arrow SVG' );
		$this->assert_true( false === stripos( $svg_nav, 'onload' ), 'render_navigation() strips onload handler from custom arrow SVG' );
		$this->assert_true( false === stripos( $svg_nav, 'onclick' ), 'render_navigation() strips onclick handler from custom arrow SVG' );
		$this->assert_true( false === stripos( $svg_nav, 'javascript:' ), 'render_navigation() strips javascript: protocol from custom arrow SVG' );

		$image_nav = NavigationBuilder::render_navigation(
			'inside',
			[
				'enabled'          => true,
				'position_type'    => 'inside',
				'use_custom_icons' => true,
				'arrow_position'   => 'bottom',
				'left'             => [
					'align'     => 'image',
					'image_url' => 'https://example.org/prev.png',
					'image_alt' => 'Prev "Arrow"',
				],
				'right'            => [
					'align'     => 'image',
					'image_url' => 'javascript:alert(9)',
					'image_alt' => 'Blocked Arrow',
				],
			]
		);

		$this->assert_true(
			false !== strpos( $image_nav, '<img src="https://example.org/prev.png" alt="Prev &quot;Arrow&quot;" />' ),
			'render_navigation() renders escaped custom image URL and alt attribute'
		);
		$this->assert_true(
			false === stripos( $image_nav, 'javascript:' ),
			'render_navigation() strips unsafe javascript: protocol in custom image icon URL'
		);
	}

	/**
	 * Verifies pagination disabled/slot checks, accessibility label, and blockId class scoping.
	 *
	 * @return void
	 */
	public function test_render_pagination_slots_and_block_id_scoping(): void {
		$this->assert_same(
			'',
			NavigationBuilder::render_pagination( 'inside', 'gslider-abc', false, 'inside' ),
			'render_pagination() returns empty string when disabled'
		);
		$this->assert_same(
			'',
			NavigationBuilder::render_pagination( 'inside', 'gslider-abc', true, 'outside' ),
			'render_pagination() returns empty string when slot position does not match'
		);

		$inside_pag = NavigationBuilder::render_pagination( 'inside', 'gslider-abc', true, 'inside' );
		$this->assert_same(
			'<div class="swiper-pagination swiper-pagination-post-carousel" aria-label="Carousel pagination"></div>',
			$inside_pag,
			'render_pagination() renders unscoped pagination inside container slot'
		);

		$outside_pag = NavigationBuilder::render_pagination( 'outside', 'gslider-xyz', true, 'outside' );
		$this->assert_same(
			'<div class="swiper-pagination swiper-pagination-post-carousel swiper-pagination-gslider-xyz" aria-label="Carousel pagination"></div>',
			$outside_pag,
			'render_pagination() appends scoped blockId class for outside slot'
		);
	}
}

try {
	( new NavigationBuilderTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
