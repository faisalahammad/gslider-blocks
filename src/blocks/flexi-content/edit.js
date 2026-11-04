/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import Inspector from './inspector';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generateFlexiContentStyle from './styling';
import { renderShapeDivider } from '@Constants/shapeDividers';

const ALLOWED_BLOCKS = [ 'gslider-blocks/flexi-content-item' ];

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
		sliderType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		enableAutoplayProgress,
		autoplayProgressPosition,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		direction,
		carouselEffect,
		slideEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,
		enableContinuousMarquee,
		marqueeSpeed,
		marqueePauseOnHover,

		showNavigation,
		showPagination,
		paginationPositionType,

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

		layoutHeightSwitcher,

		enableCursorFollower,
		cursorFollowerType,
		cursorFollowerLeftIcon,
		cursorFollowerRightIcon,
		cursorFollowerLeftImageUrl,
		cursorFollowerLeftImageAlt,
		cursorFollowerRightImageUrl,
		cursorFollowerRightImageAlt,
		cursorFollowerDirectionalText,
		cursorFollowerText,
		cursorFollowerLeftText,
		cursorFollowerRightText,

		enableTopDivider,
		topDividerShape,
		enableBottomDivider,
		bottomDividerShape,
	} = attributes;

	const marqueeEnabled = !! enableContinuousMarquee?.[ deviceType ];
	const marqueePause =
		marqueeEnabled && marqueePauseOnHover?.[ deviceType ] !== false;
	// Effect and loop are shared by all devices on the frontend
	const anyMarqueeEnabled =
		!! enableContinuousMarquee?.Desktop ||
		!! enableContinuousMarquee?.Tablet ||
		!! enableContinuousMarquee?.Mobile;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider-flexi-content',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generateFlexiContentStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	// Block props for container
	const blockProps = useBlockProps( {
		className: `gslider-flexi-content-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ marqueeEnabled ? ' gslider-marquee-mode' : '' }`,
	} );

	// Local state management for swiper instance is replaced by useRef
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );
	const autoplayProgressFillRef = useRef( null );
	const followerRef = useRef( null );

	// Ref for panel settings focus management
	const panelRef = useRef( null );
	SwitchToBlockSettings( panelRef );

	// Refs for navigation buttons
	const prevRef = useRef( null );
	const nextRef = useRef( null );
	const paginationInsideRef = useRef( null );
	const paginationOutsideRef = useRef( null );

	// Slide count, so Swiper is rebuilt when a slide is added, duplicated or removed.
	const slideCount = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ),
		[ clientId ]
	);

	/**
	 * Vanilla JS Swiper initialization
	 * Destroys and recreates Swiper when settings change for instant updates
	 */
	useEffect( () => {
		// Check if Swiper is available globally and container exists
		if ( ! window.Swiper || ! swiperContainerRef.current ) {
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

		const sliderEffect =
			sliderType === 'carousel' ? carouselEffect : slideEffect;

		// Same as the frontend, the marquee does not move for users who ask for less motion
		const reduceMotion =
			marqueeEnabled &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		const marqueeTransition = reduceMotion
			? 0
			: marqueeSpeed?.[ deviceType ] || 5000;

		// Build Swiper settings
		const swiperSettings = {
			// Marquee needs the slide effect, other effects can not move in a line
			effect: anyMarqueeEnabled ? 'slide' : sliderEffect,
			...( sliderType === 'carousel' && {
				breakpoints: {
					0: {
						slidesPerView: carouselPerColumn?.[ deviceType ] || 1,
						spaceBetween: carouselPerColumnGap?.[ deviceType ] || 0,
					},
					768: {
						slidesPerView: carouselPerColumn?.[ deviceType ] || 2,
						spaceBetween:
							carouselPerColumnGap?.[ deviceType ] ?? 20,
					},
					1025: {
						slidesPerView: carouselPerColumn?.[ deviceType ] || 2,
						spaceBetween:
							carouselPerColumnGap?.[ deviceType ] ?? 20,
					},
				},
			} ),
			...( direction === 'vertical' && { direction: 'vertical' } ),
			// Vertical slides use the fixed height, autoHeight does not work with it
			...( layoutHeightSwitcher === 'adapt' &&
				direction !== 'vertical' && {
					autoHeight: true,
				} ),
			loop: anyMarqueeEnabled || infiniteLoop,
			autoplay: autoplay
				? {
						delay: autoplayDelay?.[ deviceType ] || 1000,
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide,
						reverseDirection,
				  }
				: false,
			speed: marqueeEnabled
				? marqueeTransition
				: speed?.[ deviceType ] || 800,
			allowTouchMove,
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
			...( slideEffect === 'creative' && {
				creativeEffect: {
					prev: { shadow: true, translate: [ 0, 0, -400 ] },
					next: {
						translate:
							direction === 'vertical'
								? [ 0, '100%', 0 ]
								: [ '100%', 0, 0 ],
					},
				},
			} ),
		};

		if ( marqueeEnabled ) {
			swiperSettings.autoplay = reduceMotion
				? false
				: {
						delay: 0,
						disableOnInteraction: false,
						reverseDirection,
				  };
		}

		// Initialize new Swiper instance
		swiperInstanceRef.current = new window.Swiper(
			swiperContainerRef.current,
			swiperSettings
		);

		if ( autoplayProgressFillRef.current ) {
			swiperInstanceRef.current.on(
				'autoplayTimeLeft',
				( swiper, timeLeft, progress ) => {
					if ( autoplayProgressFillRef.current ) {
						autoplayProgressFillRef.current.style.transform = `scaleX(${
							1 - progress
						})`;
					}
				}
			);
		}

		let cleanupMarqueeHover = null;

		if ( marqueeEnabled && marqueePause ) {
			const swiper = swiperInstanceRef.current;
			const sliderContainer =
				swiperContainerRef.current?.parentElement ||
				swiperContainerRef.current;
			let frozen = null;
			let onResumeEnd = null;

			const getSign = () =>
				swiper.isHorizontal() && swiper.rtlTranslate ? -1 : 1;

			const getCurrentTranslate = () => {
				const matrix = new ( window.DOMMatrix ||
					window.WebKitCSSMatrix )(
					window.getComputedStyle( swiper.wrapperEl ).transform
				);
				return (
					( swiper.isHorizontal() ? matrix.m41 : matrix.m42 ) *
					getSign()
				);
			};

			const cancelResume = () => {
				if ( ! onResumeEnd ) {
					return;
				}
				swiper.wrapperEl.removeEventListener(
					'transitionend',
					onResumeEnd
				);
				onResumeEnd = null;
				const current = getCurrentTranslate();
				swiper.setTransition( 0 );
				swiper.setTranslate( current );
			};

			const startAutoplay = () => {
				if ( ! swiper.destroyed && swiper.params.autoplay ) {
					swiper.autoplay.start();
				}
			};

			const handlePointerEnter = ( event ) => {
				if (
					event.pointerType !== 'mouse' ||
					! ( swiper.autoplay?.running || onResumeEnd )
				) {
					return;
				}

				const target = swiper.translate * getSign();
				cancelResume();
				const current = getCurrentTranslate();
				const step =
					Math.abs(
						swiper.slidesGrid[ 1 ] - swiper.slidesGrid[ 0 ]
					) || swiper.width;

				swiper.autoplay?.stop();
				swiper.setTransition( 0 );
				swiper.setTranslate( current );
				swiper.animating = false;
				frozen = {
					target,
					remaining:
						Math.min( 1, Math.abs( target - current ) / step ) *
						swiper.params.speed,
				};
			};

			const handleSlideChange = () => {
				if ( frozen ) {
					frozen = {
						target: swiper.translate * getSign(),
						remaining: 0,
					};
				}
			};

			const handlePointerLeave = () => {
				if ( ! frozen ) {
					return;
				}

				const { target, remaining } = frozen;
				frozen = null;

				if ( remaining < 1 ) {
					swiper.setTranslate( target );
					if ( ! swiper.animating ) {
						startAutoplay();
						return;
					}
				}

				onResumeEnd = ( event ) => {
					if ( event.target !== swiper.wrapperEl ) {
						return;
					}
					swiper.wrapperEl.removeEventListener(
						'transitionend',
						onResumeEnd
					);
					onResumeEnd = null;
					startAutoplay();
				};
				swiper.wrapperEl.addEventListener(
					'transitionend',
					onResumeEnd
				);
				if ( remaining >= 1 ) {
					swiper.setTransition( remaining );
					swiper.setTranslate( target );
				}
			};

			sliderContainer.addEventListener(
				'pointerenter',
				handlePointerEnter
			);
			sliderContainer.addEventListener(
				'pointerleave',
				handlePointerLeave
			);
			swiper.on( 'slideChangeTransitionStart', handleSlideChange );

			cleanupMarqueeHover = () => {
				cancelResume();
				sliderContainer.removeEventListener(
					'pointerenter',
					handlePointerEnter
				);
				sliderContainer.removeEventListener(
					'pointerleave',
					handlePointerLeave
				);
				swiper.off( 'slideChangeTransitionStart', handleSlideChange );
			};
		}

		// Cleanup on unmount or before re-initialization
		return () => {
			if ( cleanupMarqueeHover ) {
				cleanupMarqueeHover();
			}
			if ( swiperInstanceRef.current ) {
				swiperInstanceRef.current.destroy( true, true );
				swiperInstanceRef.current = null;
			}
		};
	}, [
		deviceType,
		sliderType,
		carouselEffect,
		slideEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		infiniteLoop,
		autoplay,
		autoplayDelay,
		enableAutoplayProgress,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		direction,
		speed,
		allowTouchMove,
		mousewheelControl,
		keyboardNavigation,
		showNavigation,
		showPagination,
		paginationPositionType,
		paginationType,
		dynamicBullets,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
		layoutHeightSwitcher,
		marqueeEnabled,
		anyMarqueeEnabled,
		marqueeSpeed,
		marqueePause,
		slideCount,
	] );

	const isCursorFollowerEnabled = !! enableCursorFollower?.[ deviceType ];

	useEffect( () => {
		const swiperEl = swiperContainerRef.current;
		const followerEl = followerRef.current;
		if ( ! isCursorFollowerEnabled || ! swiperEl || ! followerEl ) {
			return;
		}

		let pointer = null;
		let frame = 0;

		const interactiveSelector =
			'a, button, input, select, textarea, label, summary, iframe, video, [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="switch"], [role="menuitem"], [role="option"], [role="slider"], [contenteditable]:not([contenteditable="false"]), .swiper-pagination, .swiper-button-prev, .swiper-button-next, .block-editor-block-toolbar, .block-editor-block-popover';

		const isFreeArea = ( target ) =>
			!! target &&
			target.closest( '.swiper' ) === swiperEl &&
			! target.closest( interactiveSelector );

		const isLeftHalf = ( clientX ) => {
			const rect = swiperEl.getBoundingClientRect();
			return clientX - rect.left < rect.width / 2;
		};

		const render = () => {
			frame = 0;
			const active =
				pointer &&
				isFreeArea(
					document.elementFromPoint(
						pointer.clientX,
						pointer.clientY
					)
				);

			swiperEl.classList.toggle( 'gslider-cursor-active', !! active );
			if ( ! active ) {
				return;
			}

			const rect = swiperEl.getBoundingClientRect();
			const x = pointer.clientX - rect.left;
			const y = pointer.clientY - rect.top;
			const isRTL = swiperInstanceRef.current?.rtlTranslate || false;
			followerEl.classList.toggle(
				'is-left',
				isLeftHalf( pointer.clientX ) !== Boolean( isRTL )
			);
			followerEl.style.transform = `translate3d(${ x }px, ${ y }px, 0) translate(-50%, -50%)`;
		};

		const scheduleRender = () => {
			if ( ! frame ) {
				frame = window.requestAnimationFrame( render );
			}
		};

		const onPointerMove = ( event ) => {
			pointer = event.pointerType === 'mouse' ? event : null;
			scheduleRender();
		};

		const onPointerLeave = () => {
			pointer = null;
			scheduleRender();
		};

		swiperEl.addEventListener( 'pointermove', onPointerMove );
		swiperEl.addEventListener( 'pointerleave', onPointerLeave );

		return () => {
			if ( frame ) {
				window.cancelAnimationFrame( frame );
			}
			swiperEl.removeEventListener( 'pointermove', onPointerMove );
			swiperEl.removeEventListener( 'pointerleave', onPointerLeave );
			swiperEl.classList.remove( 'gslider-cursor-active' );
		};
	}, [
		isCursorFollowerEnabled,
		cursorFollowerType,
		cursorFollowerLeftIcon,
		cursorFollowerRightIcon,
		cursorFollowerLeftImageUrl,
		cursorFollowerRightImageUrl,
		cursorFollowerDirectionalText,
		cursorFollowerText,
		cursorFollowerLeftText,
		cursorFollowerRightText,
		deviceType,
	] );

	const getSliderTemplate = [
		[ 'gslider-blocks/flexi-content-item' ],
		[ 'gslider-blocks/flexi-content-item' ],
		[ 'gslider-blocks/flexi-content-item' ],
	];

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `swiper-wrapper gslider-swiper-wrapper`,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: getSliderTemplate,
			renderAppender: false,
			orientation: 'horizontal',
		}
	);

	return (
		<>
			{ isSelected && (
				<Inspector
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			) }

			<div { ...blockProps }>
				<div
					className={ `swiper ${ globalClass }` }
					ref={ swiperContainerRef }
					{ ...( globalID && { id: globalID } ) }
				>
					<div { ...innerBlocksProps } />

					{ isCursorFollowerEnabled && (
						<div
							ref={ followerRef }
							className="gslider-cursor-follower"
							aria-hidden="true"
						>
							{ ( ! cursorFollowerType ||
								cursorFollowerType === 'icon' ) && (
								<>
									<div className="gslider-cursor-icon gslider-cursor-left">
										{ renderSVG(
											cursorFollowerLeftIcon ||
												'arrow-left'
										) }
									</div>
									<div className="gslider-cursor-icon gslider-cursor-right">
										{ renderSVG(
											cursorFollowerRightIcon ||
												'arrow-right'
										) }
									</div>
								</>
							) }
							{ cursorFollowerType === 'image' && (
								<>
									{ cursorFollowerLeftImageUrl && (
										<div className="gslider-cursor-image gslider-cursor-left">
											<img
												src={
													cursorFollowerLeftImageUrl
												}
												alt={
													cursorFollowerLeftImageAlt ||
													'Previous'
												}
											/>
										</div>
									) }
									{ cursorFollowerRightImageUrl && (
										<div className="gslider-cursor-image gslider-cursor-right">
											<img
												src={
													cursorFollowerRightImageUrl
												}
												alt={
													cursorFollowerRightImageAlt ||
													'Next'
												}
											/>
										</div>
									) }
								</>
							) }
							{ cursorFollowerType === 'text' &&
								( cursorFollowerDirectionalText ? (
									<>
										<span className="gslider-cursor-text gslider-cursor-left">
											{ cursorFollowerLeftText || 'PREV' }
										</span>
										<span className="gslider-cursor-text gslider-cursor-right">
											{ cursorFollowerRightText ||
												'NEXT' }
										</span>
									</>
								) : (
									<span className="gslider-cursor-text">
										{ cursorFollowerText || 'DRAG' }
									</span>
								) ) }
						</div>
					) }

					{ autoplay && enableAutoplayProgress?.[ deviceType ] && (
						<div
							className={ `gslider-autoplay-progress ${ autoplayProgressPosition }` }
							aria-hidden="true"
						>
							<div
								ref={ autoplayProgressFillRef }
								className="gslider-autoplay-progress-fill"
							></div>
						</div>
					) }
					{ enableTopDivider?.[ deviceType ] &&
						renderShapeDivider( 'top', topDividerShape ) }
					{ enableBottomDivider?.[ deviceType ] &&
						renderShapeDivider( 'bottom', bottomDividerShape ) }

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
										renderSVG( navigationArrowsIconRight )
									) }
								</div>
							</div>
						) }

					{ /* Pagination inside swiper container */ }
					<div
						className="swiper-pagination swiper-pagination-flexi-content"
						ref={ paginationInsideRef }
					></div>
				</div>

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
					className={ `swiper-pagination swiper-pagination-flexi-content swiper-pagination-${ blockId }` }
					ref={ paginationOutsideRef }
					aria-label="Slider pagination"
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
