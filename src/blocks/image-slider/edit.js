/* global refreshFsLightbox */
/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, no-shadow, object-shorthand, jsdoc/require-param, no-nested-ternary */
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
import generateImageSliderStyle from './styling';

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
		deviceType,
		blockStyle,
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

		images,
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

		enableimageLinks,
		showTooltip,
		imageLinkHoverEffect,
		imageLinkHoverOpacity,
		imageLinkHoverScale,
		imageLinkHoverLift,
		imageLinkHoverLiftUnits,
		enableLazyLoad,
		enableLightbox,
	} = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider-image-slider',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generateImageSliderStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	/** Block props for container */
	const blockProps = useBlockProps( {
		className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
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
		setAttributes( { images: next } );
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
		setAttributes( { images: next } );
	};

	/** Local state management for slider items and active slide index */
	const [ selectedSlideIndex, setSelectedSlideIndex ] = useState( 0 );

	/** Refs for vanilla JS Swiper */
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );

	/** State for link editing popover */
	const [ editingimageId, setEditingimageId ] = useState( null );
	const [ tempLinkUrl, setTempLinkUrl ] = useState( '' );
	const [ tempTooltipText, setTempTooltipText ] = useState( '' );

	/** Ref for panel settings focus management */
	const panelRef = useRef( null );
	SwitchToBlockSettings( panelRef );

	/** Refs for navigation buttons */
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
			images.length === 0
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
		images,
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

	/* Custom Icon Navigation - handled by main useEffect now */

	/**
	 * Refresh fsLightbox when images or lightbox setting changes
	 */
	useEffect( () => {
		if (
			enableLightbox?.[ deviceType ] &&
			typeof refreshFsLightbox === 'function'
		) {
			refreshFsLightbox();
		}
	}, [ images, enableLightbox, deviceType, blockId ] );

	/**
	 * Link management functions
	 */
	const handleEditLink = ( imageId, currentLink, currentTooltip ) => {
		setEditingimageId( imageId );
		setTempLinkUrl( currentLink || '' );
		setTempTooltipText( currentTooltip || '' );
	};

	const handleSaveLink = () => {
		if ( editingimageId !== null ) {
			const updatedimages = images.map( ( image ) =>
				image.id === editingimageId
					? {
							...image,
							link: tempLinkUrl,
							tooltipText: tempTooltipText,
					  }
					: image
			);
			setAttributes( { images: updatedimages } );
			setEditingimageId( null );
			setTempLinkUrl( '' );
			setTempTooltipText( '' );
		}
	};

	const handleRemoveLink = () => {
		if ( editingimageId !== null ) {
			const updatedimages = images.map( ( image ) =>
				image.id === editingimageId
					? { ...image, link: '', tooltipText: '' }
					: image
			);
			setAttributes( { images: updatedimages } );
			setEditingimageId( null );
			setTempLinkUrl( '' );
			setTempTooltipText( '' );
		}
	};

	/**
	 * Renders toolbar controls for slide management
	 * Provides buttons for adding and duplicating images
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
							value={ images.map( ( l ) => l.id ) }
							onSelect={ onSelectGallery }
							render={ ( { open } ) => (
								<ToolbarButton
									icon="edit"
									label={ __(
										'Edit images',
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
				{ ! images.length && (
					<MediaPlaceholder
						icon={
							<span className="dashicons dashicons-format-gallery" />
						}
						labels={ {
							title: __(
								'Upload Clients images',
								'gslider-blocks'
							),
							instructions: __(
								'Upload multiple images directly or from your media library',
								'gslider-blocks'
							),
						} }
						onSelect={ onSelectFromPlaceholder }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						multiple
						className="gslider-image-slider-placeholder"
					/>
				) }

				{ images?.length > 0 && (
					<div
						className="swiper"
						ref={ swiperContainerRef }
						role="region"
						aria-label="Image Slider"
					>
						<div className="swiper-wrapper">
							{ images.map( ( item, index ) => (
								<div className="swiper-slide" key={ item.id }>
									<div
										className={ `gslider-image-slider-content-wrapper ${ globalClass }` }
										{ ...( globalID && { id: globalID } ) }
										ref={ panelRef }
									>
										<div
											className="gslider-image-item"
											data-hover-effect={
												imageLinkHoverEffect
											}
											onMouseEnter={ ( e ) => {
												if (
													imageLinkHoverEffect &&
													imageLinkHoverEffect !==
														'none' &&
													imageLinkHoverEffect !==
														'grayscale'
												) {
													if (
														imageLinkHoverEffect ===
															'opacity' ||
														imageLinkHoverEffect ===
															'both'
													) {
														e.currentTarget.style.opacity =
															imageLinkHoverOpacity?.[
																deviceType
															] || 0.8;
													}
													if (
														imageLinkHoverEffect ===
															'scale' ||
														imageLinkHoverEffect ===
															'both'
													) {
														e.currentTarget.style.transform = `scale(${
															imageLinkHoverScale?.[
																deviceType
															] || 1.05
														})`;
													}
													if (
														imageLinkHoverEffect ===
														'move-up'
													) {
														e.currentTarget.style.transform = `translateY(-${
															imageLinkHoverLift?.[
																deviceType
															] || 10
														}${
															imageLinkHoverLiftUnits?.[
																deviceType
															] || 'px'
														})`;
													}
												}
											} }
											onMouseLeave={ ( e ) => {
												if (
													imageLinkHoverEffect &&
													imageLinkHoverEffect !==
														'none' &&
													imageLinkHoverEffect !==
														'grayscale'
												) {
													e.currentTarget.style.opacity = 1;
													e.currentTarget.style.transform =
														'scale(1) translateY(0)';
												}
											} }
										>
											{ enableLightbox?.[ deviceType ] ? (
												<a
													href={ item.url }
													data-fslightbox={ blockId }
													data-caption={
														item.caption
													}
													className="gslider-image-link"
													onClick={ ( e ) =>
														e.preventDefault()
													}
												>
													<img
														src={ item.url }
														alt={
															item.alt ||
															`image ${
																images.indexOf(
																	item
																) + 1
															}`
														}
														loading={
															enableLazyLoad
																? 'lazy'
																: undefined
														}
													/>
												</a>
											) : (
												<img
													src={ item.url }
													alt={
														item.alt ||
														`image ${
															images.indexOf(
																item
															) + 1
														}`
													}
													loading={
														enableLazyLoad
															? 'lazy'
															: undefined
													}
												/>
											) }
											{ showTooltip &&
												item.tooltipText && (
													<div className="gslider-image-tooltip">
														{ item.tooltipText }
													</div>
												) }
										</div>
										{ showCaption?.[ deviceType ] &&
										item.caption ? (
											<div
												className="gslider-image-slider-caption"
												aria-live="polite"
											>
												{ item.caption }
											</div>
										) : null }

										{ /* image Action Toolbar */ }
										<div className="gslider-image-action-toolbar">
											{ /* Move Left Button */ }
											{ index > 0 && (
												<Button
													icon={
														<ToolbarMoveLeftIcon />
													}
													className="gslider-image-action-btn gslider-image-move-btn"
													onClick={ () => {
														const newimages = [
															...images,
														];
														const temp =
															newimages[
																index - 1
															];
														newimages[ index - 1 ] =
															newimages[ index ];
														newimages[ index ] =
															temp;
														setAttributes( {
															images: newimages,
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
											{ index < images.length - 1 && (
												<Button
													icon={
														<ToolbarMoveRightIcon />
													}
													className="gslider-image-action-btn gslider-image-move-btn"
													onClick={ () => {
														const newimages = [
															...images,
														];
														const temp =
															newimages[
																index + 1
															];
														newimages[ index + 1 ] =
															newimages[ index ];
														newimages[ index ] =
															temp;
														setAttributes( {
															images: newimages,
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
												index < images.length - 1 ) && (
												<div className="gslider-toolbar-divider" />
											) }

											<Button
												icon={ <ToolbarDeleteIcon /> }
												className="gslider-image-action-btn gslider-image-delete-btn"
												onClick={ () => {
													const updatedimages =
														images.filter(
															( image ) =>
																image.id !==
																item.id
														);
													setAttributes( {
														images: updatedimages,
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
												className="gslider-image-action-btn gslider-image-duplicate-btn"
												onClick={ () => {
													const duplicatedimage = {
														...item,
														id:
															Date.now() +
															Math.random(),
													};
													const imageIndex =
														images.findIndex(
															( image ) =>
																image.id ===
																item.id
														);
													const updatedimages = [
														...images.slice(
															0,
															imageIndex + 1
														),
														duplicatedimage,
														...images.slice(
															imageIndex + 1
														),
													];
													setAttributes( {
														images: updatedimages,
													} );
												} }
												label={ __(
													'Duplicate',
													'gslider-blocks'
												) }
												showTooltip={ true }
											/>

											{ ( enableimageLinks ||
												showTooltip ) && (
												<Button
													icon={ <ToolbarLinkIcon /> }
													className="gslider-image-action-btn gslider-image-edit-btn"
													onClick={ () =>
														handleEditLink(
															item.id,
															item.link,
															item.tooltipText
														)
													}
													label={
														enableimageLinks &&
														showTooltip
															? __(
																	'Edit Link & Tooltip',
																	'gslider-blocks'
															  )
															: enableimageLinks
															? __(
																	'Edit Link',
																	'gslider-blocks'
															  )
															: __(
																	'Edit Tooltip',
																	'gslider-blocks'
															  )
													}
													showTooltip={ true }
												/>
											) }
										</div>

										{ editingimageId === item.id && (
											<Popover
												position="middle center"
												onClose={ () =>
													setEditingimageId( null )
												}
												focusOnMount="firstElement"
												className="gslider-image-link-popover"
											>
												<div className="gslider-image-link-popover-wrapper">
													{ enableimageLinks && (
														<TextControl
															label={ __(
																'image Link URL',
																'gslider-blocks'
															) }
															className="gslider-image-link-url"
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
																'Enter the URL for this image',
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
															className="gslider-image-tooltip-text"
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
																'Text shown when hovering over the image',
																'gslider-blocks'
															) }
														/>
													) }
													<div className="gslider-image-link-popover-buttons-wrapper">
														<Button
															variant="primary"
															onClick={
																handleSaveLink
															}
															className="gslider-image-link-save-button"
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
																className="gslider-image-link-remove-button"
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
																setEditingimageId(
																	null
																)
															}
															className="gslider-image-link-cancel-button"
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

						{ /* Navigation inside swiper container */ }
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
							className="swiper-pagination swiper-pagination-image-slider"
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
					className={ `swiper-pagination swiper-pagination-image-slider swiper-pagination-${ blockId }` }
					ref={ paginationOutsideRef }
					aria-label="Slider pagination"
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
