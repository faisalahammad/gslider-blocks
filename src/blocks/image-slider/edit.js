/* global refreshFsLightbox */
/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, no-shadow, object-shorthand, jsdoc/require-param, no-nested-ternary, import/no-unresolved */
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
import SwitcherControl from '@Components/switcher-control';
import InputControls from '@Components/input-control';
import { IMAGE_SLIDER_VIDEO_SOURCE } from '@Constants';
import Inspector from './inspector';

// Swiper is loaded globally via FrontendAssets.php (swiper-bundle.min.js)
// We use vanilla JS Swiper in useEffect instead of swiper/react
import {
	ToolbarMoveLeftIcon,
	ToolbarMoveRightIcon,
	ToolbarDeleteIcon,
	ToolbarDuplicateIcon,
	ToolbarLinkIcon,
	ToolbarVideoIcon,
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
	videoSource: 'html5',
	videoExternalUrl: '',
	videoExternalId: '',
} );

/** Only a strict ID match is stored, so the ID is safe to put in an embed URL later */
const VIDEO_ID_PATTERNS = {
	youtube:
		/^(?:(?:https?:)?\/\/)?(?:[\w-]+\.)*(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})(?![\w-])/i,
	/** A showcase, album, channel or group name is not the video ID, an unlisted video keeps its hash as id/hash */
	vimeo: /^(?:(?:https?:)?\/\/)?(?:[\w-]+\.)*vimeo\.com\/(?:(?:showcase|album|channels|groups)\/[^/?#]+\/|(?!(?:showcase|album|channels|groups)\/|\d+\/)[^/?#]+\/)*(\d+(?:\/[\da-f]+)?)(?:[/?#]|$)/i,
};

const getVideoExternalId = ( type, url ) => {
	const value = ( url || '' ).trim();
	const id = value.match( VIDEO_ID_PATTERNS[ type ] )?.[ 1 ] || '';
	// Unlisted player links keep the hash in ?h= instead of the path
	const hash =
		type === 'vimeo' &&
		! id.includes( '/' ) &&
		value.match( /[?&]h=([\da-f]+)/i )?.[ 1 ];
	const videoId = id && hash ? `${ id }/${ hash }` : id;
	// Vimeo hashes are lowercase hex, the frontend only accepts that form
	return type === 'vimeo' ? videoId.toLowerCase() : videoId;
};

/** A slide plays an external video only when a provider ID was parsed and saved */
const isExternalVideo = ( item ) =>
	( item.videoSource === 'youtube' || item.videoSource === 'vimeo' ) &&
	!! item.videoExternalId;

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

	const trimmedGlobalClass = globalClass?.trim();

	/** Block props for container */
	const blockProps = useBlockProps( {
		className: `gslider-image-slider-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ trimmedGlobalClass ? ` ${ trimmedGlobalClass }` : '' }`,
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

	const onSelectGallery = ( selection ) => {
		const list = Array.isArray( selection ) ? selection : [ selection ];
		const next = list
			.filter(
				( m ) =>
					m &&
					( m.type === 'image' ||
						( m.mime && m.mime.startsWith( 'image/' ) ) )
			)
			.map( ( m ) => {
				const fresh = mapMedia( m );
				// Keep per-slide settings (link, tooltip, video) of images already in the slider
				const existing = images.find( ( image ) => image.id === m.id );
				if ( ! existing ) {
					return fresh;
				}
				return {
					...fresh,
					link: existing.link ?? fresh.link,
					tooltipText: existing.tooltipText ?? fresh.tooltipText,
					videoSource: existing.videoSource ?? fresh.videoSource,
					videoExternalUrl:
						existing.videoExternalUrl ?? fresh.videoExternalUrl,
					videoExternalId:
						existing.videoExternalId ?? fresh.videoExternalId,
				};
			} );
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

	/** State for video editing popover, saved values wait in temp state so typing does not re-render the slider */
	const [ editingVideoimageId, setEditingVideoimageId ] = useState( null );
	const [ tempVideoSource, setTempVideoSource ] = useState( 'html5' );
	const [ tempVideoUrl, setTempVideoUrl ] = useState( '' );
	const [ tempVideoId, setTempVideoId ] = useState( '' );

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
	 * Video management functions
	 */
	const handleEditVideo = ( image ) => {
		setEditingVideoimageId( image.id );
		setTempVideoSource( image.videoSource || 'html5' );
		setTempVideoUrl( image.videoExternalUrl || '' );
		setTempVideoId( image.videoExternalId || '' );
	};

	const handleVideoSourceChange = ( value ) => {
		setTempVideoSource( value );
		setTempVideoId( getVideoExternalId( value, tempVideoUrl ) );
	};

	const handleVideoUrlChange = ( value ) => {
		setTempVideoUrl( value );
		setTempVideoId( getVideoExternalId( tempVideoSource, value ) );
	};

	const applyVideoAttributes = (
		imageId,
		videoSource,
		videoUrl,
		videoId
	) => {
		const updatedimages = images.map( ( image ) =>
			image.id === imageId
				? {
						...image,
						videoSource,
						videoExternalUrl: videoUrl,
						videoExternalId: videoId,
				  }
				: image
		);
		setAttributes( { images: updatedimages } );
		setEditingVideoimageId( null );
		setTempVideoSource( 'html5' );
		setTempVideoUrl( '' );
		setTempVideoId( '' );
	};

	const handleSaveVideo = () => {
		if ( editingVideoimageId === null ) {
			return;
		}
		const hasVideo = tempVideoSource !== 'html5';
		applyVideoAttributes(
			editingVideoimageId,
			hasVideo ? tempVideoSource : 'html5',
			hasVideo ? tempVideoUrl : '',
			hasVideo ? tempVideoId : ''
		);
	};

	const handleRemoveVideo = () => {
		if ( editingVideoimageId !== null ) {
			applyVideoAttributes( editingVideoimageId, 'html5', '', '' );
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
						aria-label={ __( 'Image Slider', 'gslider-blocks' ) }
						{ ...( globalID && { id: globalID } ) }
					>
						<div className="swiper-wrapper">
							{ images.map( ( item, index ) => (
								<div className="swiper-slide" key={ item.id }>
									<div
										className="gslider-image-slider-content-wrapper"
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
											{ isExternalVideo( item ) ? (
												<div className="gslider-embed-video gslider-embed-video-editor">
													<img
														className="gslider-embed-video-poster"
														src={ item.url }
														alt={
															item.alt ||
															`video ${
																images.indexOf(
																	item
																) + 1
															}`
														}
													/>
													<span
														className="gslider-embed-video-play"
														aria-hidden="true"
													></span>
												</div>
											) : enableLightbox?.[
													deviceType
											  ] ? (
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

											<Button
												icon={ <ToolbarVideoIcon /> }
												className="gslider-image-action-btn gslider-image-edit-btn"
												onClick={ () =>
													handleEditVideo( item )
												}
												label={ __(
													'Edit Video',
													'gslider-blocks'
												) }
												showTooltip={ true }
											/>
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

										{ editingVideoimageId === item.id && (
											<Popover
												position="middle center"
												onClose={ () =>
													setEditingVideoimageId(
														null
													)
												}
												focusOnMount="firstElement"
												className="gslider-image-link-popover gslider-video-popover"
											>
												<div className="gslider-image-link-popover-wrapper">
													<SwitcherControl
														label={ __(
															'Video Source',
															'gslider-blocks'
														) }
														options={
															IMAGE_SLIDER_VIDEO_SOURCE
														}
														value={
															tempVideoSource
														}
														onChange={
															handleVideoSourceChange
														}
													/>
													{ tempVideoSource !==
														'html5' && (
														<InputControls
															label={ __(
																'Video URL',
																'gslider-blocks'
															) }
															value={
																tempVideoUrl
															}
															onChangeValue={
																handleVideoUrlChange
															}
															helpText={
																tempVideoUrl &&
																! tempVideoId
																	? __(
																			'Could not find a video ID in this URL.',
																			'gslider-blocks'
																	  )
																	: __(
																			'The video opens on click, the slide image stays as its poster.',
																			'gslider-blocks'
																	  )
															}
														/>
													) }
													<div className="gslider-image-link-popover-buttons-wrapper">
														<Button
															variant="primary"
															disabled={
																tempVideoSource !==
																	'html5' &&
																! tempVideoId
															}
															onClick={
																handleSaveVideo
															}
															className="gslider-image-link-save-button"
														>
															{ __(
																'Save',
																'gslider-blocks'
															) }
														</Button>
														{ isExternalVideo(
															item
														) && (
															<Button
																variant="secondary"
																isDestructive
																onClick={
																	handleRemoveVideo
																}
																className="gslider-image-link-remove-button"
															>
																{ __(
																	'Remove Video',
																	'gslider-blocks'
																) }
															</Button>
														) }
														<Button
															variant="tertiary"
															onClick={ () =>
																setEditingVideoimageId(
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
											aria-label={ __(
												'Previous slide',
												'gslider-blocks'
											) }
										></div>
										<div
											ref={ nextRef }
											className="swiper-button-next"
											role="button"
											tabIndex={ 0 }
											aria-label={ __(
												'Next slide',
												'gslider-blocks'
											) }
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
										aria-label={ __(
											'Previous slide',
											'gslider-blocks'
										) }
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
										aria-label={ __(
											'Next slide',
											'gslider-blocks'
										) }
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
									aria-label={ __(
										'Previous slide',
										'gslider-blocks'
									) }
								></div>
								<div
									ref={ nextRef }
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label={ __(
										'Next slide',
										'gslider-blocks'
									) }
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
								aria-label={ __(
									'Previous slide',
									'gslider-blocks'
								) }
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
								aria-label={ __(
									'Next slide',
									'gslider-blocks'
								) }
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
					aria-label={ __( 'Slider pagination', 'gslider-blocks' ) }
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
