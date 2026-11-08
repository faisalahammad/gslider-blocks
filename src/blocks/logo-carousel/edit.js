/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, object-shorthand, jsdoc/require-param */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
	Button,
	TextControl,
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import Inspector from './inspector';

// Swiper is loaded globally via FrontendAssets.php (swiper-bundle.min.js)
// We use vanilla JS Swiper in useEffect instead of swiper/react
import {
	ToolbarMoveLeftIcon,
	ToolbarMoveRightIcon,
	ToolbarDeleteIcon,
	ToolbarDuplicateIcon,
	ToolbarLinkIcon,
} from '@Utils/svgIcons';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generateLogoCarouselStyle from './styling';

const mapMedia = ( m ) => ( {
	id: m.id,
	url: m?.sizes?.full?.url || m.url,
	alt: m.alt || m.title || '',
	caption: m.caption || '',
	link: '',
	tooltipText: '',
} );

export default function Edit( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const {
		blockId,
		blockStyle,
		deviceType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		logos,
		showCaption,
		paginationPositionType,
		showNavigation,
		showPagination,

		globalID,
		globalClass,
		navigationArrowPositionType,
		navigationArrowPosition,

		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,

		enableLogoLinks,
		showTooltip,
		logoLinkHoverEffect,
		logoLinkHoverOpacity,
		logoLinkHoverScale,
		logoLinkHoverLift,
		logoLinkHoverLiftUnits,
		enableLazyLoad,
	} = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider-logo-carousel',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generateLogoCarouselStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	// Block props for container
	const blockProps = useBlockProps( {
		className: `gslider-logo-carousel-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}`,
	} );

	const onSelectFromPlaceholder = ( selection ) => {
		const list = Array.isArray( selection ) ? selection : [ selection ];
		const next = list
			.filter(
				( m ) =>
					m &&
					( m.type === 'image' ||
						( m.mime && m.mime.startsWith( 'image/' ) ) )
			)
			.map( mapMedia );
		setAttributes( { logos: next } );
	};

	const onSelectGallery = ( images ) => {
		const list = Array.isArray( images ) ? images : [ images ];
		const next = list
			.filter(
				( m ) =>
					m &&
					( m.type === 'image' ||
						( m.mime && m.mime.startsWith( 'image/' ) ) )
			)
			.map( mapMedia );
		setAttributes( { logos: next } );
	};

	// Local state management for slider items and active slide index
	const [ selectedSlideIndex, setSelectedSlideIndex ] = useState( 0 );

	// Refs for vanilla JS Swiper
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );

	// State for link editing popover
	const [ editingLogoId, setEditingLogoId ] = useState( null );
	const [ tempLinkUrl, setTempLinkUrl ] = useState( '' );
	const [ tempTooltipText, setTempTooltipText ] = useState( '' );

	// Ref for panel settings focus management
	const panelRef = useRef( null );
	SwitchToBlockSettings( panelRef );

	// Refs for navigation buttons
	const prevRef = useRef( null );
	const nextRef = useRef( null );
	const paginationInsideRef = useRef( null );
	const paginationOutsideRef = useRef( null );

	/**
	 * Vanilla JS Swiper initialization
	 * Destroys and recreates Swiper when settings change for instant updates
	 */
	useEffect( () => {
		// Check if Swiper is available globally and container exists
		if (
			! window.Swiper ||
			! swiperContainerRef.current ||
			logos.length === 0
		) {
			return;
		}

		// Destroy previous instance if exists
		if ( swiperInstanceRef.current ) {
			swiperInstanceRef.current.destroy( true, true );
			swiperInstanceRef.current = null;
		}

		// Clear both pagination elements to prevent stale bullets when switching position
		if ( paginationInsideRef.current ) {
			paginationInsideRef.current.innerHTML = '';
		}
		if ( paginationOutsideRef.current ) {
			paginationOutsideRef.current.innerHTML = '';
		}

		// Build Swiper settings
		const swiperSettings = {
			effect: carouselEffect,
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.[ deviceType ] || 1,
					spaceBetween: carouselPerColumnGap?.[ deviceType ] || 0,
				},
				768: {
					slidesPerView: carouselPerColumn?.[ deviceType ] || 2,
					spaceBetween: carouselPerColumnGap?.[ deviceType ] ?? 20,
				},
				1025: {
					slidesPerView: carouselPerColumn?.[ deviceType ] || 2,
					spaceBetween: carouselPerColumnGap?.[ deviceType ] ?? 20,
				},
			},
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						delay: autoplayDelay?.[ deviceType ] || 1000,
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide: stopOnLastSlide,
						reverseDirection: reverseDirection,
				  }
				: false,
			speed: speed?.[ deviceType ] || 800,
			allowTouchMove: allowTouchMove,
			mousewheel: mousewheelControl,
			keyboard: keyboardNavigation
				? {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: false,
				  }
				: false,
			navigation: showNavigation?.[ deviceType ]
				? {
						prevEl: prevRef.current,
						nextEl: nextRef.current,
				  }
				: false,
			pagination: showPagination?.[ deviceType ]
				? {
						el:
							paginationPositionType === 'outside'
								? paginationOutsideRef.current
								: paginationInsideRef.current,
						type: paginationType,
						dynamicBullets:
							paginationType === 'bullets'
								? dynamicBullets
								: false,
						clickable: true,
				  }
				: false,
			on: {
				slideChange: ( swiper ) =>
					setSelectedSlideIndex( swiper.activeIndex ),
			},
		};

		// Initialize new Swiper instance
		swiperInstanceRef.current = new window.Swiper(
			swiperContainerRef.current,
			swiperSettings
		);

		// Cleanup on unmount or before re-initialization
		return () => {
			if ( swiperInstanceRef.current ) {
				swiperInstanceRef.current.destroy( true, true );
				swiperInstanceRef.current = null;
			}
		};
	}, [
		blockId,
		deviceType,
		logos,
		carouselEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		infiniteLoop,
		autoplay,
		autoplayDelay,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		speed,
		allowTouchMove,
		mousewheelControl,
		keyboardNavigation,
		showNavigation,
		showPagination,
		paginationType,
		dynamicBullets,
		paginationPositionType,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
	] );

	/**
	 * Link management functions
	 */
	const handleEditLink = ( logoId, currentLink, currentTooltip ) => {
		setEditingLogoId( logoId );
		setTempLinkUrl( currentLink || '' );
		setTempTooltipText( currentTooltip || '' );
	};

	const handleSaveLink = () => {
		if ( editingLogoId !== null ) {
			const updatedLogos = logos.map( ( logo ) =>
				logo.id === editingLogoId
					? {
							...logo,
							link: tempLinkUrl,
							tooltipText: tempTooltipText,
					  }
					: logo
			);
			setAttributes( { logos: updatedLogos } );
			setEditingLogoId( null );
			setTempLinkUrl( '' );
			setTempTooltipText( '' );
		}
	};

	const handleRemoveLink = () => {
		if ( editingLogoId !== null ) {
			const updatedLogos = logos.map( ( logo ) =>
				logo.id === editingLogoId
					? { ...logo, link: '', tooltipText: '' }
					: logo
			);
			setAttributes( { logos: updatedLogos } );
			setEditingLogoId( null );
			setTempLinkUrl( '' );
			setTempTooltipText( '' );
		}
	};

	/**
	 * Renders toolbar controls for slide management
	 * Provides buttons for adding and duplicating logos
	 */
	const renderSliderToolbarControls = () => {
		return (
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							gallery
							multiple
							addToGallery
							value={ logos.map( ( l ) => l.id ) }
							onSelect={ onSelectGallery }
							render={ ( { open } ) => (
								<ToolbarButton
									icon="edit"
									label={ __(
										'Edit Logos',
										'gslider-blocks'
									) }
									onClick={ open }
								/>
							) }
						/>
					</MediaUploadCheck>
				</ToolbarGroup>
			</BlockControls>
		);
	};

	let linkTooltipButtonLabel = __( 'Edit Tooltip', 'gslider-blocks' );
	if ( enableLogoLinks && showTooltip ) {
		linkTooltipButtonLabel = __( 'Edit Link & Tooltip', 'gslider-blocks' );
	} else if ( enableLogoLinks ) {
		linkTooltipButtonLabel = __( 'Edit Link', 'gslider-blocks' );
	}

	return (
		<>
			{ isSelected && (
				<Inspector
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }

			{ renderSliderToolbarControls() }

			<div { ...blockProps }>
				{ ! logos.length && (
					<MediaPlaceholder
						icon={
							<span className="dashicons dashicons-format-gallery" />
						}
						labels={ {
							title: __(
								'Upload Clients Logos',
								'gslider-blocks'
							),
							instructions: __(
								'Upload multiple logos directly or from your media library',
								'gslider-blocks'
							),
						} }
						onSelect={ onSelectFromPlaceholder }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						multiple
						className="gslider-logo-carousel-placeholder"
					/>
				) }

				{ logos?.length > 0 && (
					<div
						className="swiper"
						ref={ swiperContainerRef }
						role="region"
						aria-label="Logo Carousel"
					>
						<div className="swiper-wrapper">
							{ logos.map( ( item, index ) => (
								<div className="swiper-slide" key={ item.id }>
									<div
										className={ `gslider-logo-carousel-content-wrapper ${ globalClass }` }
										{ ...( globalID && { id: globalID } ) }
										ref={ panelRef }
									>
										<div
											className="gslider-logo-item"
											data-hover-effect={
												logoLinkHoverEffect
											}
											onMouseEnter={ ( e ) => {
												if (
													logoLinkHoverEffect &&
													logoLinkHoverEffect !==
														'none' &&
													logoLinkHoverEffect !==
														'grayscale'
												) {
													if (
														logoLinkHoverEffect ===
															'opacity' ||
														logoLinkHoverEffect ===
															'both'
													) {
														e.currentTarget.style.opacity =
															logoLinkHoverOpacity?.[
																deviceType
															] || 0.8;
													}
													if (
														logoLinkHoverEffect ===
															'scale' ||
														logoLinkHoverEffect ===
															'both'
													) {
														e.currentTarget.style.transform = `scale(${
															logoLinkHoverScale?.[
																deviceType
															] || 1.05
														})`;
													}
													if (
														logoLinkHoverEffect ===
														'move-up'
													) {
														e.currentTarget.style.transform = `translateY(-${
															logoLinkHoverLift?.[
																deviceType
															] || 10
														}${
															logoLinkHoverLiftUnits?.[
																deviceType
															] || 'px'
														})`;
													}
												}
											} }
											onMouseLeave={ ( e ) => {
												if (
													logoLinkHoverEffect &&
													logoLinkHoverEffect !==
														'none' &&
													logoLinkHoverEffect !==
														'grayscale'
												) {
													e.currentTarget.style.opacity = 1;
													e.currentTarget.style.transform =
														'scale(1) translateY(0)';
												}
											} }
										>
											<img
												src={ item.url }
												alt={
													item.alt ||
													`Logo ${
														logos.indexOf( item ) +
														1
													}`
												}
												loading={
													enableLazyLoad
														? 'lazy'
														: undefined
												}
											/>
											{ showTooltip &&
												item.tooltipText && (
													<div className="gslider-logo-tooltip">
														{ item.tooltipText }
													</div>
												) }
										</div>
										{ showCaption?.[ deviceType ] &&
										item.caption ? (
											<div
												className="gslider-logo-carousel-caption"
												aria-live="polite"
											>
												{ item.caption }
											</div>
										) : null }

										{ /* Logo Action Toolbar */ }
										<div className="gslider-logo-action-toolbar">
											{ /* Move Left Button */ }
											{ index > 0 && (
												<Button
													icon={
														<ToolbarMoveLeftIcon />
													}
													className="gslider-logo-action-btn gslider-logo-move-btn"
													onClick={ () => {
														const newLogos = [
															...logos,
														];
														const temp =
															newLogos[
																index - 1
															];
														newLogos[ index - 1 ] =
															newLogos[ index ];
														newLogos[ index ] =
															temp;
														setAttributes( {
															logos: newLogos,
														} );
													} }
													label={ __(
														'Move Left',
														'gslider-blocks'
													) }
													showTooltip={ true }
												/>
											) }

											{ /* Move Right Button */ }
											{ index < logos.length - 1 && (
												<Button
													icon={
														<ToolbarMoveRightIcon />
													}
													className="gslider-logo-action-btn gslider-logo-move-btn"
													onClick={ () => {
														const newLogos = [
															...logos,
														];
														const temp =
															newLogos[
																index + 1
															];
														newLogos[ index + 1 ] =
															newLogos[ index ];
														newLogos[ index ] =
															temp;
														setAttributes( {
															logos: newLogos,
														} );
													} }
													label={ __(
														'Move Right',
														'gslider-blocks'
													) }
													showTooltip={ true }
												/>
											) }

											{ /* Divider */ }
											{ ( index > 0 ||
												index < logos.length - 1 ) && (
												<div className="gslider-toolbar-divider" />
											) }

											<Button
												icon={ <ToolbarDeleteIcon /> }
												className="gslider-logo-action-btn gslider-logo-delete-btn"
												onClick={ () => {
													const updatedLogos =
														logos.filter(
															( logo ) =>
																logo.id !==
																item.id
														);
													setAttributes( {
														logos: updatedLogos,
													} );
												} }
												label={ __(
													'Delete',
													'gslider-blocks'
												) }
												showTooltip={ true }
											/>

											<Button
												icon={
													<ToolbarDuplicateIcon />
												}
												className="gslider-logo-action-btn gslider-logo-duplicate-btn"
												onClick={ () => {
													const duplicatedLogo = {
														...item,
														id:
															Date.now() +
															Math.random(),
													};
													const logoIndex =
														logos.findIndex(
															( logo ) =>
																logo.id ===
																item.id
														);
													const updatedLogos = [
														...logos.slice(
															0,
															logoIndex + 1
														),
														duplicatedLogo,
														...logos.slice(
															logoIndex + 1
														),
													];
													setAttributes( {
														logos: updatedLogos,
													} );
												} }
												label={ __(
													'Duplicate',
													'gslider-blocks'
												) }
												showTooltip={ true }
											/>

											{ ( enableLogoLinks ||
												showTooltip ) && (
												<Button
													icon={ <ToolbarLinkIcon /> }
													className="gslider-logo-action-btn gslider-logo-edit-btn"
													onClick={ () =>
														handleEditLink(
															item.id,
															item.link,
															item.tooltipText
														)
													}
													label={
														linkTooltipButtonLabel
													}
													showTooltip={ true }
												/>
											) }
										</div>

										{ editingLogoId === item.id && (
											<Popover
												position="middle center"
												onClose={ () =>
													setEditingLogoId( null )
												}
												focusOnMount="firstElement"
												className="gslider-logo-link-popover"
											>
												<div className="gslider-logo-link-popover-wrapper">
													{ enableLogoLinks && (
														<TextControl
															label={ __(
																'Logo Link URL',
																'gslider-blocks'
															) }
															className="gslider-logo-link-url"
															value={
																tempLinkUrl
															}
															onChange={ (
																value
															) =>
																setTempLinkUrl(
																	value
																)
															}
															placeholder="https://example.com"
															help={ __(
																'Enter the URL for this logo',
																'gslider-blocks'
															) }
														/>
													) }
													{ showTooltip && (
														<TextControl
															label={ __(
																'Tooltip Text',
																'gslider-blocks'
															) }
															className="gslider-logo-tooltip-text"
															value={
																tempTooltipText
															}
															onChange={ (
																value
															) =>
																setTempTooltipText(
																	value
																)
															}
															placeholder="Visit our website"
															help={ __(
																'Text shown when hovering over the logo',
																'gslider-blocks'
															) }
														/>
													) }
													<div className="gslider-logo-link-popover-buttons-wrapper">
														<Button
															variant="primary"
															onClick={
																handleSaveLink
															}
															className="gslider-logo-link-save-button"
														>
															{ __(
																'Save',
																'gslider-blocks'
															) }
														</Button>
														{ item.link && (
															<Button
																variant="secondary"
																isDestructive
																onClick={
																	handleRemoveLink
																}
																className="gslider-logo-link-remove-button"
															>
																{ __(
																	'Remove Link',
																	'gslider-blocks'
																) }
															</Button>
														) }
														<Button
															variant="tertiary"
															onClick={ () =>
																setEditingLogoId(
																	null
																)
															}
															className="gslider-logo-link-cancel-button"
														>
															{ __(
																'Cancel',
																'gslider-blocks'
															) }
														</Button>
													</div>
												</div>
											</Popover>
										) }
									</div>
								</div>
							) ) }
						</div>

						{ showNavigation?.[ deviceType ] &&
							! navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' && (
								<>
									<div
										className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
									>
										<div
											ref={ prevRef }
											className="swiper-button-prev"
											role="button"
											tabIndex={ 0 }
											aria-label="Previous slide"
										></div>
										<div
											ref={ nextRef }
											className="swiper-button-next"
											role="button"
											tabIndex={ 0 }
											aria-label="Next slide"
										></div>
									</div>
								</>
							) }

						{ showNavigation?.[ deviceType ] &&
							navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' && (
								<div
									className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										ref={ prevRef }
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									>
										{ navigationArrowsIconLeftAlign ===
											'image' &&
										navigationArrowsIconLeftImageUrl ? (
											<img
												src={
													navigationArrowsIconLeftImageUrl
												}
												alt={
													navigationArrowsIconLeftImageAlt
												}
											/>
										) : (
											renderSVG(
												navigationArrowsIconLeft
											)
										) }
									</div>
									<div
										className="swiper-button-next"
										ref={ nextRef }
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									>
										{ navigationArrowsIconRightAlign ===
											'image' &&
										navigationArrowsIconRightImageUrl ? (
											<img
												src={
													navigationArrowsIconRightImageUrl
												}
												alt={
													navigationArrowsIconRightImageAlt
												}
											/>
										) : (
											renderSVG(
												navigationArrowsIconRight
											)
										) }
									</div>
								</div>
							) }

						{ /* Pagination inside swiper container */ }
						<div
							className="swiper-pagination swiper-pagination-logo-carousel"
							ref={ paginationInsideRef }
						></div>
					</div>
				) }

				{ showNavigation?.[ deviceType ] &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									ref={ prevRef }
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									ref={ nextRef }
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						</>
					) }

				{ showNavigation?.[ deviceType ] &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								ref={ prevRef }
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								{ navigationArrowsIconLeftAlign === 'image' &&
								navigationArrowsIconLeftImageUrl ? (
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt={ navigationArrowsIconLeftImageAlt }
									/>
								) : (
									renderSVG( navigationArrowsIconLeft )
								) }
							</div>
							<div
								className="swiper-button-next"
								ref={ nextRef }
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								{ navigationArrowsIconRightAlign === 'image' &&
								navigationArrowsIconRightImageUrl ? (
									<img
										src={
											navigationArrowsIconRightImageUrl
										}
										alt={
											navigationArrowsIconRightImageAlt
										}
									/>
								) : (
									renderSVG( navigationArrowsIconRight )
								) }
							</div>
						</div>
					) }

				{ /* Pagination outside swiper container */ }
				<div
					className="swiper-pagination swiper-pagination-logo-carousel"
					ref={ paginationOutsideRef }
					aria-label="Carousel pagination"
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
