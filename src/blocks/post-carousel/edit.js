/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, import/no-unresolved, jsdoc/require-param, no-nested-ternary, jsx-a11y/anchor-is-valid */
import { __, _n, sprintf } from '@wordpress/i18n';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { Fragment, useEffect, useRef, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useMergeRefs } from '@wordpress/compose';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import Inspector from './inspector';
import NewsroomQueue from './components/NewsroomQueue';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyPostsState from './components/EmptyPostsState';
import POST_CAROUSEL_PRESETS from './preset';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generatePostCarouselStyle from './styling';
import { normalizeContentOrder } from './content-order';
import usePostQuery from '@Utils/hooks/usePostQuery';
import {
	getFeaturedImageUrl,
	getPostCategories,
	getPostTags,
	getExcerpt,
	getAuthorName,
	getAuthorAvatarUrl,
	getFormattedDate,
	calculateReadingTime,
	getRelativeDate,
	getCommentCount,
	decodeHtmlEntities,
} from '@Utils/postHelpers';
import { getPostQueryArgs } from '@Utils/getPostQueryArgs';
import {
	initCardTilt,
	initEntranceAnimations,
	applyStaggerDelays,
	prefersReducedMotion,
	onReducedMotionChange,
} from '@Utils/animation-utils';

/**
 * Post Carousel Gutenberg editor component.
 *
 * @param {Object}   props               Block editor component props.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Attribute setter callback.
 * @param {string}   props.clientId      Unique block client ID.
 * @param {boolean}  props.isSelected    Whether the block is selected in the editor.
 * @return {Element} Rendered block editor element.
 */
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
		carouselMode,
		marqueeSpeed,
		marqueePauseOnHover,
		showAutoplayProgress,
		autoplayProgressPosition,
		autoplayProgressColor,
		autoplayProgressHeight,
		desktopGridColumns,
		desktopGridGap,

		paginationPositionType,
		showNavigation,
		showPagination,
		showFeaturedImage,
		showPostTitle,
		showExcerpt,
		showMeta,
		showMetaAuthor,
		showMetaAvatar,
		showMetaDate,
		showReadingTime,
		showCommentCount,
		dateFormat,
		taxonomyMaxCount,
		metaSeparator,
		showTaxonomy,
		postLayoutMode,
		presetStyle,
		heroContentAlignment,
		enableSpotlight,
		newsroomMainWidth,
		newsroomQueuePosition,
		timelineDatePosition,
		horizontalMediaPosition,
		equalHeight,
		enableCardClickableLink,

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

		enableLazyLoad,
		enableFallbackThumbnail,
		fallbackThumbnailUrl,
		contentOrder,
		postTaxonomyDisplay,

		readMoreButtonText,
		showReadMoreButton,
		readMoreButtonLinkType,
		readMoreButtonLink,
		readMoreButtonTargetLink,
		readMoreButtonNofollow,
		readMoreButtonSponsored,

		readMoreButtonIconSwitcher,
		readMoreButtonIconType,
		readMoreButtonIconPosition,
		readMoreButtonIcon,
		readMoreButtonIconImageUrl,
		readMoreButtonIconImageAlt,

		postType,
		useRelatedPostsQuery,
		relatedPostsTaxonomy,
		postTitleHtmlTag,
		enablePostTitleLimit,
		postTitleLimitType,
		postTitleLimit,
		postTitleLimitSuffix,

		enablePostTitleLink,
		postTitleLinkTarget,
		postTitleLinkNofollow,
		postTitleLinkSponsored,

		enablePostTitleHoverUnderlineAnim,
		postTitleHoverUnderlineColor,
		postTitleHoverUnderlineHeight,
		postTitleHoverUnderlineBottomOffset,
		postTitleHoverUnderlineTransitionSpeed,

		showPostTitleDivider,
		postTitleDividerStyle,
		postTitleDividerColorSwitcher,
		postTitleDividerColor,
		postTitleDividerHoverColor,
		postTitleDividerWidth,
		postTitleDividerWidthUnits,
		postTitleDividerHeight,
		postTitleDividerHeightUnits,
		enablePostTitleDividerHoverExpand,
		postExcerptHtmlTag,
		enablePostExcerptLimit,
		postExcerptLimitType,
		postExcerptLimit,
		postExcerptLimitSuffix,
		postExcerptSource,
		postExcerptLineClamp,

		// Animations
		cardEntranceAnimation,
		cardEntranceAnimationDuration,
		cardEntranceAnimationDelay,
		cardEntranceAnimationOffset,
		cardEntranceAnimationEasing,
		enableStaggerAnimation,
		cardStaggerDelay,
		cardHoverAnimation,
		cardHoverAnimationDuration,
		enableCardTilt,
		cardTiltMaxAngle,
		cardTiltPerspective,
		cardTiltHoverScale,
		cardTiltTransitionSpeed,
		enableTaxonomyBadgeOverlay,
		taxonomyBadgeOverlayPosition,
		taxonomyBadgeOverlayVisibility,
	} = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider-post-carousel',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generatePostCarouselStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	const hasEntranceAnimation =
		cardEntranceAnimation && cardEntranceAnimation !== 'none';

	const trimmedGlobalClass = globalClass?.trim();
	const activeLayoutMode = postLayoutMode || 'classic';
	const activePresetStyle = presetStyle || 'classic-card';
	const allowedHeroAlignments = [ 'bottom-left', 'center', 'bottom-center' ];
	const safeHeroAlign = allowedHeroAlignments.includes( heroContentAlignment )
		? heroContentAlignment
		: 'bottom-left';
	const isSpotlightActive = Boolean( enableSpotlight );
	const isEqualHeight = equalHeight ?? true;
	const isCardClickable = Boolean( enableCardClickableLink );

	const activeCarouselMode = carouselMode || 'carousel';
	const isMobileOnlyDesktop =
		activeCarouselMode === 'mobile-only' && deviceType === 'Desktop';
	const canShowNavigation =
		activeCarouselMode !== 'marquee' &&
		! isMobileOnlyDesktop &&
		Boolean( showNavigation?.[ deviceType ] );
	const canShowPagination =
		activeCarouselMode !== 'marquee' &&
		! isMobileOnlyDesktop &&
		Boolean( showPagination?.[ deviceType ] );
	const canShowAutoplayProgress =
		Boolean( showAutoplayProgress ) &&
		activeCarouselMode !== 'marquee' &&
		! isMobileOnlyDesktop;

	/** Block props for container */
	const blockProps = useBlockProps( {
		className: `gslider-post-carousel-wrapper ${ blockId } is-layout-${ activeLayoutMode } is-preset-${ activePresetStyle } is-mode-${ activeCarouselMode }${
			isMobileOnlyDesktop ? ' editor-device-desktop' : ''
		}${ canShowAutoplayProgress ? ' has-autoplay-progress' : '' }${
			activeLayoutMode === 'hero' ? ` hero-align-${ safeHeroAlign }` : ''
		}${
			activeLayoutMode === 'newsroom'
				? ` queue-position-${ newsroomQueuePosition || 'right' }`
				: ''
		}${
			isSpotlightActive ? ' is-spotlight' : ''
		} ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			isEqualHeight ? 'has-equal-height ' : ''
		}${ showPagination ? 'has-pagination' : '' } ${
			cardHoverAnimation !== 'none'
				? `gslider-card-hover-${ cardHoverAnimation }`
				: ''
		}${ trimmedGlobalClass ? ` ${ trimmedGlobalClass }` : '' }`,
		...( globalID && { id: globalID } ),
		'data-animation-settings': hasEntranceAnimation
			? JSON.stringify( {
					duration: {
						Desktop: cardEntranceAnimationDuration?.Desktop ?? 600,
						Tablet: cardEntranceAnimationDuration?.Tablet ?? 600,
						Mobile: cardEntranceAnimationDuration?.Mobile ?? 600,
					},
					delay: {
						Desktop: cardEntranceAnimationDelay?.Desktop ?? 0,
						Tablet: cardEntranceAnimationDelay?.Tablet ?? 0,
						Mobile: cardEntranceAnimationDelay?.Mobile ?? 0,
					},
					offset: {
						Desktop: cardEntranceAnimationOffset?.Desktop ?? 15,
						Tablet: cardEntranceAnimationOffset?.Tablet ?? 15,
						Mobile: cardEntranceAnimationOffset?.Mobile ?? 15,
					},
					easing: cardEntranceAnimationEasing,
			  } )
			: undefined,
		'data-stagger-enabled':
			enableStaggerAnimation && hasEntranceAnimation ? '1' : undefined,
		'data-stagger-delay':
			enableStaggerAnimation && hasEntranceAnimation
				? JSON.stringify( {
						Desktop: cardStaggerDelay?.Desktop ?? 100,
						Tablet: cardStaggerDelay?.Tablet ?? 100,
						Mobile: cardStaggerDelay?.Mobile ?? 100,
				  } )
				: undefined,
		'data-tilt-max': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltMaxAngle?.Desktop ?? 12,
					Tablet: cardTiltMaxAngle?.Tablet ?? 12,
					Mobile: cardTiltMaxAngle?.Mobile ?? 12,
			  } )
			: undefined,
		'data-tilt-perspective': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltPerspective?.Desktop ?? 800,
					Tablet: cardTiltPerspective?.Tablet ?? 800,
					Mobile: cardTiltPerspective?.Mobile ?? 800,
			  } )
			: undefined,
		'data-tilt-scale': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltHoverScale?.Desktop ?? 1.02,
					Tablet: cardTiltHoverScale?.Tablet ?? 1.02,
					Mobile: cardTiltHoverScale?.Mobile ?? 1.02,
			  } )
			: undefined,
		'data-tilt-speed': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltTransitionSpeed?.Desktop ?? 400,
					Tablet: cardTiltTransitionSpeed?.Tablet ?? 400,
					Mobile: cardTiltTransitionSpeed?.Mobile ?? 400,
			  } )
			: undefined,
	} );

	const normalizedContentOrder = normalizeContentOrder( contentOrder );

	/** Fetch current post ID, categories, tags, and CPT taxonomies for query mapping */
	const {
		currentPostId,
		taxonomies,
		currentPostCategories,
		currentPostTags,
		currentPostType,
	} = useSelect( ( select ) => {
		const { getCurrentPostId, getEditedPostAttribute, getCurrentPostType } =
			select( 'core/editor' ) || {};
		const { getTaxonomies } = select( 'core' );
		return {
			currentPostId: getCurrentPostId ? getCurrentPostId() : null,
			taxonomies: getTaxonomies ? getTaxonomies() || [] : [],
			currentPostCategories: getEditedPostAttribute
				? getEditedPostAttribute( 'categories' ) || []
				: [],
			currentPostTags: getEditedPostAttribute
				? getEditedPostAttribute( 'tags' ) || []
				: [],
			currentPostType: getCurrentPostType ? getCurrentPostType() : null,
		};
	}, [] );

	/** Construct dynamic query arguments for the REST API */
	const queryArgs = getPostQueryArgs(
		attributes,
		deviceType,
		currentPostId,
		taxonomies,
		currentPostCategories,
		currentPostTags
	);

	/** Fetch posts using global usePostQuery hook */
	const resolvedPostType =
		useRelatedPostsQuery && currentPostType ? currentPostType : postType;
	const { posts, isLoading } = usePostQuery( queryArgs, resolvedPostType );

	/** Refs for vanilla JS Swiper */
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );
	const autoplayProgressFillRef = useRef( null );
	const queueContainerRef = useRef( null );
	const thumbsSwiperRef = useRef( null );
	const [ activeQueueIndex, setActiveQueueIndex ] = useState( 0 );

	/** Ref for panel settings focus management */
	const panelRef = useRef( null );
	SwitchToBlockSettings( panelRef );
	const mergedBlockRef = useMergeRefs( [ blockProps.ref, panelRef ] );

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
			! posts ||
			posts.length === 0
		) {
			return;
		}

		// Destroy existing Swiper instance and clear loop duplicates/pagination before init
		const resetSwiper = () => {
			if ( swiperInstanceRef.current ) {
				swiperInstanceRef.current.destroy( true, true );
				swiperInstanceRef.current = null;
			}
			if ( thumbsSwiperRef.current ) {
				thumbsSwiperRef.current.destroy( true, true );
				thumbsSwiperRef.current = null;
			}
			if ( swiperContainerRef.current ) {
				const duplicates = swiperContainerRef.current.querySelectorAll(
					'.swiper-slide-duplicate'
				);
				duplicates.forEach( ( slide ) => slide.remove() );
			}
			if ( queueContainerRef.current ) {
				const queueDups = queueContainerRef.current.querySelectorAll(
					'.swiper-slide-duplicate'
				);
				queueDups.forEach( ( slide ) => slide.remove() );
			}
			if ( paginationInsideRef.current ) {
				paginationInsideRef.current.innerHTML = '';
			}
			if ( paginationOutsideRef.current ) {
				paginationOutsideRef.current.innerHTML = '';
			}
		};

		resetSwiper();

		// Build Swiper settings based on the current reduced-motion state
		const createSwiperSettings = ( reduceMotion ) => {
			if ( activeCarouselMode === 'marquee' ) {
				const effectiveMarqueeSpeed = marqueeSpeed || 6000;
				return {
					effect: 'slide',
					freeMode: {
						enabled: true,
						momentum: false,
					},
					loop: true,
					allowTouchMove: false,
					speed: reduceMotion ? 0 : effectiveMarqueeSpeed,
					autoplay: ! reduceMotion
						? {
								delay: 0,
								disableOnInteraction: false,
								pauseOnMouseEnter: marqueePauseOnHover ?? true,
						  }
						: false,
					breakpoints: {
						0: {
							slidesPerView:
								carouselPerColumn?.[ deviceType ] || 1,
							spaceBetween:
								carouselPerColumnGap?.[ deviceType ] ?? 0,
							speed: reduceMotion ? 0 : effectiveMarqueeSpeed,
							autoplay: { delay: 0 },
							navigation: false,
							pagination: false,
						},
						768: {
							slidesPerView:
								carouselPerColumn?.[ deviceType ] || 2,
							spaceBetween:
								carouselPerColumnGap?.[ deviceType ] ?? 20,
							speed: reduceMotion ? 0 : effectiveMarqueeSpeed,
							autoplay: { delay: 0 },
							navigation: false,
							pagination: false,
						},
						1025: {
							slidesPerView:
								carouselPerColumn?.[ deviceType ] || 3,
							spaceBetween:
								carouselPerColumnGap?.[ deviceType ] ?? 20,
							speed: reduceMotion ? 0 : effectiveMarqueeSpeed,
							autoplay: { delay: 0 },
							navigation: false,
							pagination: false,
						},
					},
					navigation: false,
					pagination: false,
				};
			}

			return {
				effect: carouselEffect,
				...( isSpotlightActive ? { centeredSlides: true } : {} ),
				breakpoints: {
					0: {
						slidesPerView: carouselPerColumn?.[ deviceType ] || 1,
						spaceBetween: carouselPerColumnGap?.[ deviceType ] ?? 0,
					},
					768: {
						slidesPerView: carouselPerColumn?.[ deviceType ] || 2,
						spaceBetween:
							carouselPerColumnGap?.[ deviceType ] ?? 20,
					},
					1025: {
						slidesPerView: carouselPerColumn?.[ deviceType ] || 3,
						spaceBetween:
							carouselPerColumnGap?.[ deviceType ] ?? 20,
					},
				},
				loop: infiniteLoop,
				autoplay:
					! reduceMotion && autoplay
						? {
								delay: autoplayDelay?.[ deviceType ] || 1000,
								pauseOnMouseEnter:
									pauseOnHover ||
									enableCardTilt ||
									cardHoverAnimation !== 'none',
								disableOnInteraction: false,
								stopOnLastSlide,
								reverseDirection,
						  }
						: false,
				speed: reduceMotion ? 0 : speed?.[ deviceType ] || 800,
				allowTouchMove,
				mousewheel: mousewheelControl,
				keyboard: keyboardNavigation
					? {
							enabled: true,
							onlyInViewport: true,
							pageUpDown: false,
					  }
					: false,
				navigation: canShowNavigation
					? {
							prevEl: prevRef.current,
							nextEl: nextRef.current,
					  }
					: false,
				pagination: canShowPagination
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
			};
		};

		// Helper to initialize Swiper with thumbs in newsroom mode or standard swiper
		const initSwiperInstance = ( reduceMotion ) => {
			if ( isMobileOnlyDesktop ) {
				return null;
			}

			if (
				activeLayoutMode === 'newsroom' &&
				queueContainerRef.current
			) {
				const isDesktop = deviceType === 'Desktop';
				const thumbsSwiper = new window.Swiper(
					queueContainerRef.current,
					{
						slidesPerView: isDesktop
							? 4
							: deviceType === 'Tablet'
							? 3
							: 'auto',
						direction: isDesktop ? 'vertical' : 'horizontal',
						watchSlidesProgress: true,
						spaceBetween: 12,
						slideToClickedSlide: true,
					}
				);
				thumbsSwiperRef.current = thumbsSwiper;

				const baseSettings = createSwiperSettings( reduceMotion );
				const newsroomSettings = {
					...baseSettings,
					slidesPerView: 1,
					breakpoints: Object.fromEntries(
						Object.entries( baseSettings.breakpoints || {} ).map(
							( [ width, bp ] ) => [
								width,
								{ ...bp, slidesPerView: 1 },
							]
						)
					),
					watchSlidesProgress: true,
					thumbs: {
						swiper: thumbsSwiper,
					},
				};

				const mainSwiper = new window.Swiper(
					swiperContainerRef.current,
					newsroomSettings
				);
				mainSwiper.on( 'slideChange', () => {
					const realIdx = mainSwiper.params?.loop
						? mainSwiper.realIndex
						: mainSwiper.activeIndex;
					setActiveQueueIndex( realIdx );
				} );
				if (
					canShowAutoplayProgress &&
					autoplayProgressFillRef.current
				) {
					mainSwiper.on(
						'autoplayTimeLeft',
						( s, time, progress ) => {
							if ( autoplayProgressFillRef.current ) {
								autoplayProgressFillRef.current.style.transform = `scaleX(${
									1 - progress
								})`;
							}
						}
					);
				}
				return mainSwiper;
			}

			const standardSwiper = new window.Swiper(
				swiperContainerRef.current,
				createSwiperSettings( reduceMotion )
			);
			if ( canShowAutoplayProgress && autoplayProgressFillRef.current ) {
				standardSwiper.on(
					'autoplayTimeLeft',
					( s, time, progress ) => {
						if ( autoplayProgressFillRef.current ) {
							autoplayProgressFillRef.current.style.transform = `scaleX(${
								1 - progress
							})`;
						}
					}
				);
			}
			return standardSwiper;
		};

		// Initialize new Swiper instance
		swiperInstanceRef.current = initSwiperInstance(
			prefersReducedMotion()
		);
		if ( activeLayoutMode === 'newsroom' ) {
			setActiveQueueIndex( 0 );
		}

		const unsubscribeReducedMotion = onReducedMotionChange(
			( reduceMotion ) => {
				if ( ! swiperContainerRef.current || ! window.Swiper ) {
					return;
				}
				const currentSwiper = swiperInstanceRef.current;
				let activeIndex = 0;
				if ( currentSwiper ) {
					activeIndex = currentSwiper.params?.loop
						? currentSwiper.realIndex
						: currentSwiper.activeIndex;
				}
				resetSwiper();
				const nextSwiper = initSwiperInstance( reduceMotion );
				swiperInstanceRef.current = nextSwiper;
				if ( typeof activeIndex === 'number' && activeIndex > 0 ) {
					if ( nextSwiper.params?.loop ) {
						nextSwiper.slideToLoop( activeIndex, 0, false );
					} else {
						nextSwiper.slideTo( activeIndex, 0, false );
					}
				}
			}
		);

		// Initialize Card Tilt & Entrance Animations in editor
		if ( swiperContainerRef.current ) {
			const wrapper = swiperContainerRef.current.closest(
				'.gslider-post-carousel-wrapper'
			);
			if ( wrapper ) {
				if ( enableCardTilt ) {
					/**
					 * Serialize responsive tilt configuration objects cleanly for data attributes.
					 *
					 * @param {Object|number|undefined} val      Tilt setting value or responsive map.
					 * @param {number}                  fallback Fallback numeric value per breakpoint.
					 * @return {string} Serialized tilt value or JSON string.
					 */
					const serializeTilt = ( val, fallback ) =>
						typeof val === 'object' || val === undefined
							? JSON.stringify( {
									Desktop: val?.Desktop ?? fallback,
									Tablet: val?.Tablet ?? fallback,
									Mobile: val?.Mobile ?? fallback,
							  } )
							: String( val );
					wrapper.dataset.tiltMax = serializeTilt(
						cardTiltMaxAngle,
						12
					);
					wrapper.dataset.tiltPerspective = serializeTilt(
						cardTiltPerspective,
						800
					);
					wrapper.dataset.tiltScale = serializeTilt(
						cardTiltHoverScale,
						1.02
					);
					wrapper.dataset.tiltSpeed = serializeTilt(
						cardTiltTransitionSpeed,
						400
					);
					initCardTilt( wrapper );
				}

				if ( hasEntranceAnimation ) {
					// Reset inline styles on cards before initializing to trigger replay
					const cards = wrapper.querySelectorAll(
						'.gslider-has-entrance-anim'
					);
					cards.forEach( ( card ) => {
						card.style.visibility = '';
						card.style.animationDelay = '';
						card.style.animationTimingFunction = '';
						card.style.removeProperty( '--animate-duration' );
					} );
					applyStaggerDelays( wrapper );
					initEntranceAnimations( wrapper );
				}
			}
		}

		// Cleanup on unmount or before re-initialization
		return () => {
			unsubscribeReducedMotion();
			if ( swiperInstanceRef.current ) {
				swiperInstanceRef.current.destroy( true, true );
				swiperInstanceRef.current = null;
			}
			if ( thumbsSwiperRef.current ) {
				thumbsSwiperRef.current.destroy( true, true );
				thumbsSwiperRef.current = null;
			}
			if ( swiperContainerRef.current ) {
				const duplicates = swiperContainerRef.current.querySelectorAll(
					'.swiper-slide-duplicate'
				);
				duplicates.forEach( ( slide ) => slide.remove() );
			}
			if ( queueContainerRef.current ) {
				const queueDups = queueContainerRef.current.querySelectorAll(
					'.swiper-slide-duplicate'
				);
				queueDups.forEach( ( slide ) => slide.remove() );
			}
		};
	}, [
		blockId,
		deviceType,
		activeLayoutMode,
		newsroomMainWidth,
		newsroomQueuePosition,
		posts,
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
		carouselMode,
		marqueeSpeed,
		marqueePauseOnHover,
		showAutoplayProgress,
		autoplayProgressPosition,
		autoplayProgressColor,
		autoplayProgressHeight,
		desktopGridColumns,
		desktopGridGap,
		paginationPositionType,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
		enableCardTilt,
		cardTiltMaxAngle,
		cardTiltPerspective,
		cardTiltHoverScale,
		cardTiltTransitionSpeed,
		cardEntranceAnimation,
		cardEntranceAnimationDuration,
		cardEntranceAnimationDelay,
		cardEntranceAnimationOffset,
		cardEntranceAnimationEasing,
		enableStaggerAnimation,
		cardStaggerDelay,
		enableSpotlight,
	] );

	const skeletonColumns = Math.max(
		1,
		Math.round( Number( carouselPerColumn?.[ deviceType ] ) || 3 )
	);

	const handleSelectPreset = ( presetSlug ) => {
		const preset = POST_CAROUSEL_PRESETS.find(
			( p ) => p.value === presetSlug
		);
		if ( ! preset ) {
			return;
		}

		const sides = [ 'top', 'right', 'bottom', 'left' ];
		const merged = { ...attributes, ...( preset.styles || {} ) };
		const updates = { presetStyle: presetSlug, ...( preset.styles || {} ) };

		Object.entries( preset.styles || {} ).forEach( ( [ key, value ] ) => {
			const deviceMatch = key.match( /(Desktop|Tablet|Mobile)/ );
			if ( ! deviceMatch ) {
				return;
			}
			const device = deviceMatch[ 1 ];
			if (
				! value ||
				typeof value !== 'object' ||
				Array.isArray( value ) ||
				! sides.every( ( s ) => s in value )
			) {
				return;
			}
			const units =
				merged?.[ `${ key.replace( device, '' ) }Units` ]?.[ device ] ||
				'px';
			const fmt = ( v ) =>
				v === '' || v === undefined || v === null
					? '0'
					: `${ v }${ units }`;
			const hasAny = sides.some(
				( s ) =>
					value[ s ] !== '' &&
					value[ s ] !== undefined &&
					value[ s ] !== null
			);
			updates[ `${ key }CssStyle` ] = hasAny
				? sides.map( ( s ) => fmt( value[ s ] ) ).join( ' ' )
				: '';
		} );

		setAttributes( updates );
	};

	const rawPostsPerPage = attributes?.postsPerPage;
	const currentPostCount =
		typeof rawPostsPerPage === 'object' && rawPostsPerPage !== null
			? Number(
					rawPostsPerPage?.[ deviceType ] ??
						rawPostsPerPage?.Desktop ??
						6
			  ) || 6
			: Number( rawPostsPerPage ) || 6;

	const handleUpdatePostCount = ( delta ) => {
		const newCount = Math.max(
			1,
			Math.min( 30, currentPostCount + delta )
		);
		if ( typeof rawPostsPerPage === 'object' && rawPostsPerPage !== null ) {
			setAttributes( {
				postsPerPage: {
					...rawPostsPerPage,
					[ deviceType || 'Desktop' ]: newCount,
				},
			} );
		} else {
			setAttributes( { postsPerPage: newCount } );
		}
	};

	const hasActiveFilters = Boolean(
		( attributes?.categories && attributes.categories.length > 0 ) ||
			( attributes?.tags && attributes.tags.length > 0 ) ||
			( attributes?.authors && attributes.authors.length > 0 ) ||
			( typeof attributes?.searchQuery === 'string' &&
				attributes.searchQuery.trim() !== '' ) ||
			( typeof attributes?.excludePosts === 'string' &&
				attributes.excludePosts.trim() !== '' ) ||
			( typeof attributes?.metaKey === 'string' &&
				attributes.metaKey.trim() !== '' ) ||
			( attributes?.dateRange && attributes.dateRange !== 'any' ) ||
			( attributes?.taxonomyQuery &&
				typeof attributes.taxonomyQuery === 'object' &&
				Object.keys( attributes.taxonomyQuery ).length > 0 ) ||
			( typeof attributes?.offset === 'object' &&
				( Number( attributes.offset?.Desktop ) > 0 ||
					Number( attributes.offset?.Tablet ) > 0 ||
					Number( attributes.offset?.Mobile ) > 0 ) ) ||
			attributes?.excludeCurrentPost === true
	);

	const handleResetFilters = () => {
		setAttributes( {
			categories: [],
			tags: [],
			authors: [],
			searchQuery: '',
			excludePosts: '',
			metaKey: '',
			metaValue: '',
			dateRange: 'any',
			taxonomyQuery: {},
			offset: { Desktop: 0, Tablet: 0, Mobile: 0 },
			excludeCurrentPost: false,
		} );
	};

	const currentHeroHeight =
		deviceType === 'Mobile'
			? attributes?.heroHeightMobile ?? 340
			: deviceType === 'Tablet'
			? attributes?.heroHeightTablet ?? 420
			: attributes?.heroHeightDesktop ?? 520;

	return (
		<>
			<BlockControls group="other">
				<ToolbarDropdownMenu
					icon="layout"
					label={ __( 'Card Preset', 'gslider-blocks' ) }
					controls={ POST_CAROUSEL_PRESETS.map( ( preset ) => ( {
						title: preset.label,
						isActive: activePresetStyle === preset.value,
						onClick: () => handleSelectPreset( preset.value ),
					} ) ) }
				/>
				<ToolbarGroup>
					<ToolbarButton
						icon="minus"
						label={ __( 'Decrease Posts Count', 'gslider-blocks' ) }
						onClick={ () => handleUpdatePostCount( -1 ) }
						disabled={ currentPostCount <= 1 }
					/>
					<span
						className="gslider-toolbar-post-count-label"
						role="status"
						aria-label={ sprintf(
							/* translators: %d: number of posts per page */
							__( 'Posts count: %d', 'gslider-blocks' ),
							currentPostCount
						) }
						title={ __( 'Posts per page', 'gslider-blocks' ) }
					>
						{ currentPostCount }
					</span>
					<ToolbarButton
						icon="plus"
						label={ __( 'Increase Posts Count', 'gslider-blocks' ) }
						onClick={ () => handleUpdatePostCount( 1 ) }
						disabled={ currentPostCount >= 30 }
					/>
				</ToolbarGroup>
			</BlockControls>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div { ...blockProps } ref={ mergedBlockRef }>
				{ ( isLoading || ! posts ) && (
					<SkeletonLoader
						postLayoutMode={ activeLayoutMode }
						columns={ skeletonColumns }
						gap={ carouselPerColumnGap?.[ deviceType ] ?? 20 }
						heroHeight={ currentHeroHeight }
						newsroomWidth={ newsroomMainWidth }
					/>
				) }

				{ ! isLoading && posts && posts.length === 0 && (
					<EmptyPostsState
						hasActiveFilters={ hasActiveFilters }
						onResetFilters={ handleResetFilters }
					/>
				) }

				{ ! isLoading && posts && posts.length > 0 && (
					<div
						className={
							activeLayoutMode === 'newsroom'
								? 'gslider-newsroom-main swiper'
								: 'swiper'
						}
						ref={ swiperContainerRef }
						role="region"
						aria-label={
							activeLayoutMode === 'newsroom'
								? __( 'Featured Story', 'gslider-blocks' )
								: __( 'Post Carousel', 'gslider-blocks' )
						}
						key={ posts.map( ( p ) => p.id ).join( '-' ) }
					>
						{ canShowAutoplayProgress &&
							( autoplayProgressPosition === 'top' ||
								! autoplayProgressPosition ) && (
								<div
									className="gslider-autoplay-progress position-top"
									aria-hidden="true"
								>
									<span
										className="gslider-autoplay-progress-fill"
										ref={ autoplayProgressFillRef }
									/>
								</div>
							) }
						<div className="swiper-wrapper">
							{ posts.map( ( post ) => {
								const postTitleText =
									decodeHtmlEntities(
										post?.title?.rendered
									) || __( '(Untitled)', 'gslider-blocks' );
								const featuredImageUrl =
									getFeaturedImageUrl( post );
								const categories = getPostCategories( post );
								const tags = getPostTags( post );
								const excerpt = getExcerpt( post, 20, {
									enablePostExcerptLimit,
									postExcerptLimitType,
									postExcerptLimit,
									postExcerptLimitSuffix,
									postExcerptSource,
									deviceType,
								} );
								const authorName = getAuthorName( post );
								const authorAvatarUrl =
									getAuthorAvatarUrl( post );
								const formattedDate = getFormattedDate( post );
								const TagName = postTitleHtmlTag || 'h3';
								const ExcerptTagName =
									postExcerptHtmlTag || 'p';

								const renderTaxonomies = () => {
									if ( ! showTaxonomy?.[ deviceType ] ) {
										return null;
									}
									const showCat =
										postTaxonomyDisplay === 'category' ||
										postTaxonomyDisplay === 'both';
									const showTag =
										postTaxonomyDisplay === 'tag' ||
										postTaxonomyDisplay === 'both';

									const hasCat =
										showCat && categories.length > 0;
									const hasTag = showTag && tags.length > 0;

									if ( ! hasCat && ! hasTag ) {
										return null;
									}

									const maxCount = Math.min(
										5,
										Math.max(
											1,
											parseInt( taxonomyMaxCount, 10 ) ||
												2
										)
									);
									const visibleCats = categories.slice(
										0,
										maxCount
									);
									const catOverflow =
										categories.length - visibleCats.length;
									const visibleTags = tags.slice(
										0,
										maxCount
									);
									const tagOverflow =
										tags.length - visibleTags.length;

									return (
										<Fragment key="categories">
											{ hasCat && (
												<div
													key="categories-wrap"
													className="gslider-post-carousel-categories"
												>
													{ visibleCats.map(
														( cat ) => (
															<span
																key={ `cat-${ cat.id }` }
																className="gslider-category-item"
															>
																{ decodeHtmlEntities(
																	cat.name
																) }
															</span>
														)
													) }
													{ catOverflow > 0 && (
														<span className="gslider-category-item is-more-badge">
															<span className="screen-reader-text">
																{ sprintf(
																	/* translators: %d: Number of remaining categories. */
																	_n(
																		'%d more category',
																		'%d more categories',
																		catOverflow,
																		'gslider-blocks'
																	),
																	catOverflow
																) }
															</span>
															<span aria-hidden="true">
																+{ catOverflow }
															</span>
														</span>
													) }
												</div>
											) }
											{ hasTag && (
												<div
													key="tags-wrap"
													className="gslider-post-carousel-tags"
												>
													{ visibleTags.map(
														( tag ) => (
															<span
																key={ `tag-${ tag.id }` }
																className="gslider-tag-item"
															>
																{ decodeHtmlEntities(
																	tag.name
																) }
															</span>
														)
													) }
													{ tagOverflow > 0 && (
														<span className="gslider-tag-item is-more-badge">
															<span className="screen-reader-text">
																{ sprintf(
																	/* translators: %d: Number of remaining tags. */
																	_n(
																		'%d more tag',
																		'%d more tags',
																		tagOverflow,
																		'gslider-blocks'
																	),
																	tagOverflow
																) }
															</span>
															<span aria-hidden="true">
																+{ tagOverflow }
															</span>
														</span>
													) }
												</div>
											) }
										</Fragment>
									);
								};

								const sanitizedFallbackUrl =
									typeof fallbackThumbnailUrl === 'string' &&
									/^(?:https?:\/\/|\/)/i.test(
										fallbackThumbnailUrl.trim()
									)
										? fallbackThumbnailUrl.trim()
										: '';
								const allowFallback =
									enableFallbackThumbnail ?? true;
								const hasThumbnailMedia = Boolean(
									featuredImageUrl || allowFallback
								);
								const hasRenderedThumbnail = Boolean(
									showFeaturedImage?.[ deviceType ] &&
										hasThumbnailMedia
								);

								let thumbnailMedia = null;
								if ( featuredImageUrl ) {
									thumbnailMedia = (
										<img
											src={ featuredImageUrl }
											alt={ postTitleText }
											loading={
												enableLazyLoad
													? 'lazy'
													: undefined
											}
										/>
									);
								} else if ( sanitizedFallbackUrl ) {
									thumbnailMedia = (
										<img
											className="gslider-post-carousel-fallback-img"
											src={ sanitizedFallbackUrl }
											alt={ postTitleText }
											loading={
												enableLazyLoad
													? 'lazy'
													: undefined
											}
										/>
									);
								} else {
									thumbnailMedia = (
										<svg
											className="gslider-post-carousel-placeholder-svg"
											viewBox="0 0 400 225"
											width="400"
											height="225"
											aria-hidden="true"
											focusable="false"
											preserveAspectRatio="xMidYMid slice"
										>
											<rect
												width="400"
												height="225"
												fill="#f1f5f9"
											/>
											<rect
												x="164"
												y="84"
												width="72"
												height="56"
												rx="8"
												fill="#cbd5e1"
											/>
											<circle
												cx="184"
												cy="102"
												r="6"
												fill="#94a3b8"
											/>
											<path
												d="M172 132 L194 110 L210 124 L222 114 L232 132 Z"
												fill="#94a3b8"
											/>
										</svg>
									);
								}

								return (
									<div
										className="swiper-slide"
										key={ post.id }
									>
										<div className="gslider-post-carousel-content-wrapper">
											<article
												className={ `gslider-post-carousel-card${
													isEqualHeight
														? ' has-equal-height'
														: ''
												}${
													isCardClickable
														? ' is-clickable'
														: ''
												}${
													activeLayoutMode ===
													'horizontal'
														? ` media-position-${
																horizontalMediaPosition ===
																'right'
																	? 'right'
																	: 'left'
														  }${
																! hasRenderedThumbnail
																	? ' has-no-image'
																	: ''
														  }`
														: ''
												}${
													activeLayoutMode ===
													'timeline'
														? ' is-timeline-card'
														: ''
												}${
													hasEntranceAnimation
														? ` animated ${ cardEntranceAnimation } gslider-has-entrance-anim`
														: ''
												}${
													enableCardTilt
														? ' gslider-has-tilt'
														: ''
												}` }
											>
												{ ( () => {
													const renderGroupMap = {
														thumbnail:
															hasRenderedThumbnail ? (
																<div
																	key="thumbnail"
																	className="gslider-post-carousel-image"
																>
																	<a
																		className="gslider-post-thumb-link"
																		href="#"
																		onClick={ (
																			e
																		) =>
																			e.preventDefault()
																		}
																		aria-label={
																			postTitleText
																		}
																	>
																		{
																			thumbnailMedia
																		}
																	</a>
																	{ enableTaxonomyBadgeOverlay && (
																		<div
																			className={ `gslider-taxonomy-badge-overlay gslider-badge-visibility-${ taxonomyBadgeOverlayVisibility } gslider-badge-position-${ taxonomyBadgeOverlayPosition }` }
																		>
																			{ renderTaxonomies() }
																		</div>
																	) }
																</div>
															) : null,

														categories:
															! enableTaxonomyBadgeOverlay ||
															! hasRenderedThumbnail
																? renderTaxonomies()
																: null,

														title: showPostTitle?.[
															deviceType
														]
															? ( () => {
																	const rawTitleText =
																		postTitleText;
																	let trimmedTitle =
																		rawTitleText;
																	if (
																		enablePostTitleLimit
																	) {
																		const limitVal =
																			parseInt(
																				postTitleLimit?.[
																					deviceType
																				] ||
																					( postTitleLimitType ===
																					'words'
																						? '10'
																						: '50' ),
																				10
																			);
																		if (
																			postTitleLimitType ===
																			'words'
																		) {
																			const words =
																				rawTitleText.split(
																					/\s+/
																				);
																			if (
																				words.length >
																				limitVal
																			) {
																				trimmedTitle =
																					words
																						.slice(
																							0,
																							limitVal
																						)
																						.join(
																							' '
																						) +
																					( postTitleLimitSuffix ||
																						'...' );
																			}
																		} else if (
																			rawTitleText.length >
																			limitVal
																		) {
																			trimmedTitle =
																				rawTitleText.substring(
																					0,
																					limitVal
																				) +
																				( postTitleLimitSuffix ||
																					'...' );
																		}
																	}

																	const wrapperClass = `gslider-post-carousel-title-wrapper${
																		showPostTitleDivider
																			? ' has-divider'
																			: ''
																	}`;
																	const titleClass = `gslider-post-carousel-title${
																		enablePostTitleHoverUnderlineAnim
																			? ' hover-underline-anim'
																			: ''
																	}`;

																	return (
																		<div
																			key="title"
																			className={
																				wrapperClass
																			}
																		>
																			<TagName
																				className={
																					titleClass
																				}
																			>
																				{ enablePostTitleLink ? (
																					<a
																						className="gslider-post-carousel-title-link"
																						href="#"
																						onClick={ (
																							e
																						) =>
																							e.preventDefault()
																						}
																					>
																						<span className="gslider-post-title-text">
																							{
																								trimmedTitle
																							}
																						</span>
																					</a>
																				) : (
																					<span className="gslider-post-title-text">
																						{
																							trimmedTitle
																						}
																					</span>
																				) }
																			</TagName>
																		</div>
																	);
															  } )()
															: null,

														excerpt:
															showExcerpt?.[
																deviceType
															] && excerpt
																? ( () => {
																		const clampValue =
																			postExcerptLineClamp?.[
																				deviceType
																			];
																		const clampStyles =
																			clampValue
																				? {
																						display:
																							'-webkit-box',
																						WebkitBoxOrient:
																							'vertical',
																						overflow:
																							'hidden',
																						WebkitLineClamp:
																							clampValue,
																				  }
																				: {};

																		return (
																			<div
																				key="excerpt"
																				className="gslider-post-carousel-excerpt-wrapper"
																			>
																				<ExcerptTagName
																					className="gslider-post-carousel-excerpt"
																					style={
																						clampStyles
																					}
																				>
																					{
																						excerpt
																					}
																				</ExcerptTagName>
																			</div>
																		);
																  } )()
																: null,

														meta: showMeta?.[
															deviceType
														]
															? ( () => {
																	const canShowAuthor =
																		( showMetaAuthor?.[
																			deviceType
																		] ??
																			true ) &&
																		authorName;
																	const canShowDate =
																		( showMetaDate?.[
																			deviceType
																		] ??
																			true ) &&
																		post.date;
																	const canShowReadingTime =
																		showReadingTime ??
																		true;
																	const canShowCommentCount =
																		Boolean(
																			showCommentCount
																		);

																	if (
																		! canShowAuthor &&
																		! canShowDate &&
																		! canShowReadingTime &&
																		! canShowCommentCount
																	) {
																		return null;
																	}

																	const metaItems =
																		[];

																	if (
																		canShowAuthor
																	) {
																		metaItems.push(
																			<div
																				key="author"
																				className="gslider-post-author-wrapper"
																			>
																				{ ( showMetaAvatar?.[
																					deviceType
																				] ??
																					true ) && (
																					<div className="gslider-post-author-avatar-wrapper">
																						{ authorAvatarUrl ? (
																							<img
																								className="gslider-post-author-avatar"
																								src={
																									authorAvatarUrl
																								}
																								alt={
																									authorName
																								}
																								width="28"
																								height="28"
																							/>
																						) : (
																							<svg
																								className="gslider-post-author-avatar-placeholder"
																								width="28"
																								height="28"
																								viewBox="0 0 24 24"
																								fill="none"
																								stroke="currentColor"
																								strokeWidth="2"
																							>
																								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
																								<circle
																									cx="12"
																									cy="7"
																									r="4"
																								/>
																							</svg>
																						) }
																					</div>
																				) }
																				<div className="gslider-post-author">
																					{
																						authorName
																					}
																				</div>
																			</div>
																		);
																	}

																	if (
																		canShowDate
																	) {
																		const rawDate =
																			post.date_gmt
																				? `${ post.date_gmt }Z`
																				: post.date;
																		const dateText =
																			dateFormat ===
																			'relative'
																				? getRelativeDate(
																						rawDate
																				  )
																				: formattedDate;
																		metaItems.push(
																			<div
																				key="date"
																				className="gslider-post-date-wrapper"
																			>
																				<time
																					className="gslider-post-date"
																					dateTime={
																						post.date
																					}
																				>
																					{
																						dateText
																					}
																				</time>
																			</div>
																		);
																	}

																	if (
																		canShowReadingTime
																	) {
																		const rawContent =
																			post
																				.content
																				?.raw ||
																			post
																				.content
																				?.rendered ||
																			post
																				.excerpt
																				?.rendered ||
																			'';
																		const minutes =
																			calculateReadingTime(
																				rawContent
																			);
																		const readingStr =
																			sprintf(
																				/* translators: %d: Estimated reading time in minutes. */
																				_n(
																					'%d min read',
																					'%d min read',
																					minutes,
																					'gslider-blocks'
																				),
																				minutes
																			);
																		metaItems.push(
																			<div
																				key="reading-time"
																				className="gslider-post-reading-time-wrapper"
																			>
																				<span className="gslider-post-reading-time">
																					{
																						readingStr
																					}
																				</span>
																			</div>
																		);
																	}

																	if (
																		canShowCommentCount
																	) {
																		const commentNum =
																			getCommentCount(
																				post
																			);
																		const commentStr =
																			sprintf(
																				/* translators: %d: Number of comments. */
																				_n(
																					'%d comment',
																					'%d comments',
																					commentNum,
																					'gslider-blocks'
																				),
																				commentNum
																			);
																		metaItems.push(
																			<div
																				key="comments"
																				className="gslider-post-comments-wrapper"
																			>
																				<span className="gslider-post-comments">
																					<svg
																						className="gslider-meta-icon"
																						aria-hidden="true"
																						width="14"
																						height="14"
																						viewBox="0 0 24 24"
																						fill="none"
																						stroke="currentColor"
																						strokeWidth="2"
																						strokeLinecap="round"
																						strokeLinejoin="round"
																					>
																						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
																					</svg>
																					<a
																						className="gslider-post-comments-link"
																						href="#"
																						onClick={ (
																							e
																						) =>
																							e.preventDefault()
																						}
																					>
																						{
																							commentStr
																						}
																					</a>
																				</span>
																			</div>
																		);
																	}

																	if (
																		metaItems.length ===
																		0
																	) {
																		return null;
																	}

																	const sepMap =
																		{
																			bullet: '•',
																			pipe: '|',
																			slash: '/',
																			dash: '—',
																			none: '',
																		};
																	const sepChar =
																		sepMap[
																			metaSeparator ||
																				'bullet'
																		] ??
																		'•';

																	return (
																		<div
																			key="meta"
																			className="gslider-post-carousel-meta"
																		>
																			{ metaItems.map(
																				(
																					item,
																					idx
																				) => (
																					<Fragment
																						key={
																							item.key
																						}
																					>
																						{ idx >
																							0 &&
																							sepChar !==
																								'' && (
																								<span
																									className="gslider-meta-sep"
																									aria-hidden="true"
																								>
																									{
																										sepChar
																									}
																								</span>
																							) }
																						{
																							item
																						}
																					</Fragment>
																				)
																			) }
																		</div>
																	);
															  } )()
															: null,

														readmore:
															showReadMoreButton?.[
																deviceType
															]
																? ( () => {
																		const readMoreText =
																			readMoreButtonText ||
																			__(
																				'Read More',
																				'gslider-blocks'
																			);
																		const hasIcon =
																			readMoreButtonIconSwitcher;

																		let iconMarkup =
																			null;
																		if (
																			hasIcon
																		) {
																			if (
																				readMoreButtonIconType ===
																					'icon' &&
																				readMoreButtonIcon
																			) {
																				iconMarkup =
																					(
																						<span className="gslider-readmore-icon-wrap">
																							{ renderSVG(
																								readMoreButtonIcon
																							) }
																						</span>
																					);
																			} else if (
																				readMoreButtonIconType ===
																					'image' &&
																				readMoreButtonIconImageUrl
																			) {
																				iconMarkup =
																					(
																						<span className="gslider-readmore-icon-wrap">
																							<img
																								src={
																									readMoreButtonIconImageUrl
																								}
																								alt={
																									readMoreButtonIconImageAlt
																								}
																							/>
																						</span>
																					);
																			}
																		}

																		return (
																			<div
																				key="readmore"
																				className="gslider-post-carousel-readmore"
																			>
																				<a
																					className="gslider-post-carousel-readmore-btn"
																					href="#"
																					onClick={ (
																						e
																					) =>
																						e.preventDefault()
																					}
																				>
																					{ hasIcon &&
																						readMoreButtonIconPosition ===
																							'left' &&
																						iconMarkup }
																					<span className="gslider-readmore-text">
																						{
																							readMoreText
																						}
																					</span>
																					{ hasIcon &&
																						readMoreButtonIconPosition ===
																							'right' &&
																						iconMarkup }
																				</a>
																			</div>
																		);
																  } )()
																: null,
													};

													const thumbnailEl =
														renderGroupMap.thumbnail;
													const beforeThumb = [];
													const afterThumb = [];
													let seenThumb =
														! thumbnailEl;

													normalizedContentOrder.forEach(
														( groupKey ) => {
															if (
																groupKey ===
																'thumbnail'
															) {
																seenThumb = true;
																return;
															}
															const el =
																renderGroupMap[
																	groupKey
																] || null;
															if ( ! el ) {
																return;
															}
															if ( seenThumb ) {
																afterThumb.push(
																	el
																);
															} else {
																beforeThumb.push(
																	el
																);
															}
														}
													);

													const hasTitleLink =
														Boolean(
															showPostTitle?.[
																deviceType
															]
														) &&
														Boolean(
															enablePostTitleLink
														);

													let bodyAndThumb;
													if ( ! thumbnailEl ) {
														bodyAndThumb = (
															<div className="gslider-post-carousel-body">
																{ afterThumb }
															</div>
														);
													} else if (
														! [
															'classic',
															'minimal',
														].includes(
															activeLayoutMode
														)
													) {
														bodyAndThumb = (
															<>
																{ thumbnailEl }
																<div className="gslider-post-carousel-body">
																	{
																		beforeThumb
																	}
																	{
																		afterThumb
																	}
																</div>
															</>
														);
													} else if (
														afterThumb.length ===
															0 &&
														beforeThumb.length > 0
													) {
														bodyAndThumb = (
															<>
																<div className="gslider-post-carousel-body">
																	{
																		beforeThumb
																	}
																</div>
																{ thumbnailEl }
															</>
														);
													} else {
														bodyAndThumb = (
															<>
																{ beforeThumb }
																{ thumbnailEl }
																<div className="gslider-post-carousel-body">
																	{
																		afterThumb
																	}
																</div>
															</>
														);
													}

													return (
														<>
															{ activeLayoutMode ===
																'timeline' && (
																<div
																	className={ `gslider-timeline-node ${
																		timelineDatePosition ===
																		'below'
																			? 'date-position-below'
																			: 'date-position-above'
																	}` }
																	aria-hidden="true"
																>
																	<div className="gslider-timeline-stem"></div>
																	<div className="gslider-timeline-dot">
																		<div className="gslider-timeline-dot-inner"></div>
																	</div>
																	<time
																		className="gslider-timeline-date"
																		dateTime={
																			post?.date
																				? String(
																						post.date
																				  ).split(
																						'T'
																				  )[ 0 ]
																				: undefined
																		}
																	>
																		{
																			formattedDate
																		}
																	</time>
																</div>
															) }
															{ bodyAndThumb }
															{ isCardClickable &&
																! hasTitleLink && (
																	<a
																		className="gslider-post-carousel-card-link"
																		href="#"
																		onClick={ (
																			e
																		) =>
																			e.preventDefault()
																		}
																		aria-label={
																			postTitleText
																		}
																	/>
																) }
														</>
													);
												} )() }
											</article>
										</div>
									</div>
								);
							} ) }
						</div>

						{ canShowAutoplayProgress &&
							autoplayProgressPosition === 'bottom' && (
								<div
									className="gslider-autoplay-progress position-bottom"
									aria-hidden="true"
								>
									<span
										className="gslider-autoplay-progress-fill"
										ref={ autoplayProgressFillRef }
									/>
								</div>
							) }

						{ canShowNavigation &&
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

						{ canShowNavigation &&
							navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' &&
							( navigationArrowsIconLeftAlign === 'icon' ||
								navigationArrowsIconRightAlign === 'icon' ) && (
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
										{ renderSVG(
											navigationArrowsIconLeft
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
										{ renderSVG(
											navigationArrowsIconRight
										) }
									</div>
								</div>
							) }

						{ canShowNavigation &&
							navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' &&
							( navigationArrowsIconLeftAlign === 'image' ||
								navigationArrowsIconRightAlign === 'image' ) &&
							( navigationArrowsIconLeftImageUrl ||
								navigationArrowsIconRightImageUrl ) && (
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
										<img
											src={
												navigationArrowsIconLeftImageUrl
											}
											alt={
												navigationArrowsIconLeftImageAlt
											}
										/>
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
										<img
											src={
												navigationArrowsIconRightImageUrl
											}
											alt={
												navigationArrowsIconRightImageAlt
											}
										/>
									</div>
								</div>
							) }

						{ /* Pagination inside swiper container */ }
						{ canShowPagination && (
							<div
								className="swiper-pagination swiper-pagination-post-carousel"
								ref={ paginationInsideRef }
							></div>
						) }
					</div>
				) }

				{ activeLayoutMode === 'newsroom' &&
					! isLoading &&
					posts &&
					posts.length > 0 && (
						<NewsroomQueue
							posts={ posts }
							queueRef={ queueContainerRef }
							activeIndex={ activeQueueIndex }
							showReadingTime={ showReadingTime }
							onSelectIndex={ ( idx ) => {
								if ( swiperInstanceRef.current ) {
									if (
										swiperInstanceRef.current.params?.loop
									) {
										swiperInstanceRef.current.slideToLoop(
											idx
										);
									} else {
										swiperInstanceRef.current.slideTo(
											idx
										);
									}
								}
								setActiveQueueIndex( idx );
							} }
						/>
					) }

				{ canShowNavigation &&
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

				{ canShowNavigation &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'icon' ||
						navigationArrowsIconRightAlign === 'icon' ) && (
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
								{ renderSVG( navigationArrowsIconLeft ) }
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
								{ renderSVG( navigationArrowsIconRight ) }
							</div>
						</div>
					) }

				{ canShowNavigation &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'image' ||
						navigationArrowsIconRightAlign === 'image' ) &&
					( navigationArrowsIconLeftImageUrl ||
						navigationArrowsIconRightImageUrl ) && (
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
								<img
									src={ navigationArrowsIconLeftImageUrl }
									alt={ navigationArrowsIconLeftImageAlt }
								/>
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
								<img
									src={ navigationArrowsIconRightImageUrl }
									alt={ navigationArrowsIconRightImageAlt }
								/>
							</div>
						</div>
					) }

				{ /* Pagination outside swiper container */ }
				{ canShowPagination && (
					<div
						className="swiper-pagination swiper-pagination-post-carousel"
						ref={ paginationOutsideRef }
						aria-label={ __(
							'Carousel pagination',
							'gslider-blocks'
						) }
					></div>
				) }
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
