/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import AnimationControl from '@Components/animation-control';
import QuerySettingsPanel from '@Components/query-settings-panel';
import LayoutModePanel from './LayoutModePanel';
import ShowHidePanel from './ShowHidePanel';
import LayoutContentPanel from './LayoutContentPanel';
import ContentOrderPanel from './ContentOrderPanel';
import MetaSettingsPanel from './MetaSettingsPanel';
import CarouselSettingsPanel from './CarouselSettingsPanel';
import CarouselEffectPanel from './CarouselEffectPanel';
import ReadMoreSettingsPanel from './ReadMoreSettingsPanel';
import NavigationSettingsPanel from './NavigationSettingsPanel';
import PaginationSettingsPanel from './PaginationSettingsPanel';
import PerformanceSettingsPanel from './PerformanceSettingsPanel';
import SeoPerformancePanel from './SeoPerformancePanel';

/**
 * Renders the General inspector tab with all modular configuration panels.
 *
 * @param {Object}   props                        Component properties.
 * @param {Object}   props.attributes             Current block attributes.
 * @param {Function} props.setAttributes          Block attribute setter callback.
 * @param {string}   props.deviceType             Active responsive viewport.
 * @param {string[]} props.normalizedContentOrder Normalized post element order array.
 * @param {string}   props.openPanel              Currently expanded general panel key.
 * @param {Function} props.onTogglePanel          Accordion toggle callback for panel key.
 * @return {Element} General inspector tab content.
 */
const GeneralTab = ( {
	attributes,
	setAttributes,
	deviceType,
	normalizedContentOrder,
	openPanel,
	onTogglePanel,
} ) => {
	const { showReadMoreButton, showNavigation, showPagination } = attributes;

	return (
		<>
			<LayoutModePanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				isOpen={ openPanel === 'layout-presets' }
				onToggle={ () => onTogglePanel( 'layout-presets' ) }
			/>

			<ShowHidePanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				isOpen={ openPanel === 'show-hide-elements' }
				onToggle={ () => onTogglePanel( 'show-hide-elements' ) }
			/>

			<LayoutContentPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				isOpen={ openPanel === 'layout-content-setting' }
				onToggle={ () => onTogglePanel( 'layout-content-setting' ) }
			/>

			<AnimationControl
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				opened={ openPanel === 'animation-settings' }
				onToggle={ () => onTogglePanel( 'animation-settings' ) }
			/>

			<QuerySettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				opened={ openPanel === 'query-settings' }
				onToggle={ () => onTogglePanel( 'query-settings' ) }
				panelTitle={ __( 'Query Settings', 'gslider-blocks' ) }
				deviceType={ deviceType }
				showRelatedPostsQuery={ true }
			/>

			<ContentOrderPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				normalizedContentOrder={ normalizedContentOrder }
				isOpen={ openPanel === 'content-order' }
				onToggle={ () => onTogglePanel( 'content-order' ) }
			/>

			<MetaSettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				isOpen={ openPanel === 'meta-settings' }
				onToggle={ () => onTogglePanel( 'meta-settings' ) }
			/>

			<CarouselSettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				isOpen={ openPanel === 'carousel-settings' }
				onToggle={ () => onTogglePanel( 'carousel-settings' ) }
			/>

			<CarouselEffectPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				isOpen={ openPanel === 'carousel-effect' }
				onToggle={ () => onTogglePanel( 'carousel-effect' ) }
			/>

			{ showReadMoreButton?.[ deviceType ] && (
				<ReadMoreSettingsPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					isOpen={ openPanel === 'read-more-button' }
					onToggle={ () => onTogglePanel( 'read-more-button' ) }
				/>
			) }

			{ showNavigation?.[ deviceType ] && (
				<NavigationSettingsPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'navigation' }
					onToggle={ () => onTogglePanel( 'navigation' ) }
				/>
			) }

			{ showPagination?.[ deviceType ] && (
				<PaginationSettingsPanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					isOpen={ openPanel === 'pagination' }
					onToggle={ () => onTogglePanel( 'pagination' ) }
				/>
			) }

			<PerformanceSettingsPanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				isOpen={ openPanel === 'performance-settings' }
				onToggle={ () => onTogglePanel( 'performance-settings' ) }
			/>

			<SeoPerformancePanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				isOpen={ openPanel === 'seo-structured-data' }
				onToggle={ () => onTogglePanel( 'seo-structured-data' ) }
			/>
		</>
	);
};

export default GeneralTab;
