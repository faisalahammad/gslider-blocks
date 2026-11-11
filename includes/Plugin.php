<?php
/**
 * Main plugin bootstrap file for GSlider Blocks.
 *
 * Initializes all plugin services including assets, blocks,
 * fonts, styles, SVG support, and text domain loading.
 *
 * @package GSlider
 * @since   1.0.0
 */

namespace GSlider;

use GSlider\Interfaces\Registrable;
use GSlider\Traits\SingletonTrait;
use GSlider\Classes\StyleGenerator;
use GSlider\Assets\FrontendAssets;
use GSlider\Assets\AdminAssets;
use GSlider\Classes\RegistrationBlocks;
use GSlider\Classes\RegistrationCategory;
use GSlider\Classes\RegistrationPatterns;
use GSlider\Classes\FontLoader;
use GSlider\Classes\SupportSVG;
use GSlider\Utils\Utils;
use GSlider\RestApi\BlocksController;
use GSlider\RestApi\QueryManager;
use GSlider\Admin\Dashboard;
use GSlider\Admin\DashboardController;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Plugin::class, false ) ) {

	/**
	 * Main plugin class for GSlider Blocks.
	 *
	 * Acts as the central bootstrap, initializing all plugin
	 * components on the plugins_loaded hook.
	 *
	 * @since 1.0.0
	 */
	class Plugin {

		use SingletonTrait;

		/**
		 * Core service classes implementing Registrable.
		 *
		 * @since 1.1.9
		 *
		 * @var array<class-string<Registrable>>
		 */
		private $services = [
			StyleGenerator::class,
			FrontendAssets::class,
			AdminAssets::class,
			RegistrationBlocks::class,
			RegistrationCategory::class,
			RegistrationPatterns::class,
			FontLoader::class,
			Utils::class,
			BlocksController::class,
			QueryManager::class,
			Dashboard::class,
			DashboardController::class,
		];

		/**
		 * Sets up core plugin hooks.
		 *
		 * Registers the plugins_loaded action for component initialization.
		 * Translation loading is handled automatically by WordPress for
		 * plugins hosted on WordPress.org (since WordPress 4.6).
		 *
		 * @since 1.0.0
		 */
		private function __construct() {
			add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ] );
		}

		/**
		 * Initializes all plugin components.
		 *
		 * Registers style generation, frontend and admin assets,
		 * block registration, block categories, font loading,
		 * analytics tracking, and SVG support (admin only).
		 *
		 * @since 1.0.0
		 *
		 * @return void
		 */
		public function plugins_loaded() {
			foreach ( $this->services as $service_class ) {
				$service_class::getInstance()->register();
			}

			// SVG Support (admin only).
			if ( is_admin() ) {
				SupportSVG::getInstance()->register();
			}
		}

	}

}

Plugin::getInstance();
