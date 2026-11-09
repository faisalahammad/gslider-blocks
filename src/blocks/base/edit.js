/* eslint-disable jsdoc/require-param */

import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import { arrayMove } from '@dnd-kit/sortable';
import Inspector from './inspector';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generateBaseSliderStyle from './styling';

// Swiper is loaded globally via FrontendAssets.php (swiper-bundle.min.js)
// We use vanilla JS Swiper in useEffect instead of swiper/react

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
		sliderItems,
		sliderType,
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
		slideEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		showSubTitle,
		showTitle,
		showDescription,
		showButton,
		showNavigation,
		showPagination,
		paginationPositionType,
		subTitleHtmlTag,
		titleHtmlTag,
		descriptionHtmlTag,
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
	} = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generateBaseSliderStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	const trimmedGlobalClass = globalClass?.trim();

	// Block props for container
	const blockProps = useBlockProps( {
		className: `gslider-base-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ trimmedGlobalClass ? ` ${ trimmedGlobalClass }` : '' }`,
	} );

	// Local state management for slider items and active slide index
	const [ sliderItemList, setSliderItemList ] = useState( sliderItems );
	const [ selectedSlideIndex, setSelectedSlideIndex ] = useState( 0 );

	// Refs for vanilla JS Swiper
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );

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
			sliderItemList.length === 0
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
			effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
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
			...( layoutHeightSwitcher === 'adapt' && {
				autoHeight: true,
			} ),
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						delay: autoplayDelay?.[ deviceType ] || 1000,
						pauseOnMouseEnter: pauseOnHover,
						disableOnInteraction: false,
						stopOnLastSlide,
						reverseDirection,
				  }
				: false,
			speed: speed?.[ deviceType ] || 800,
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
					next: { translate: [ '100%', 0, 0 ] },
				},
			} ),
			on: {
				init: ( swiper ) => setSelectedSlideIndex( swiper.realIndex ),
				slideChange: ( swiper ) =>
					setSelectedSlideIndex( swiper.realIndex ),
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
		deviceType,
		sliderType,
		sliderItemList,
		carouselEffect,
		slideEffect,
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
		paginationPositionType,
		paginationType,
		dynamicBullets,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
		layoutHeightSwitcher,
	] );

	/* Custom Icon Navigation - handled by main useEffect now */

	/**
	 * Creates and adds a new slide with default content and settings
	 * Generates a unique ID for the new slide
	 */
	const handleAddItem = () => {
		const newItem = {
			id: `item-${ sliderItems.length + 1 }`,
			subTitle: 'Sub Title',
			title: `Slider Item ${ sliderItems.length + 1 }`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
			primaryButtonText: 'Get Started',
			primaryButtonLink: '#',
			primaryButtonTargetLink: true,
			primaryButtonNofollow: false,
			primaryButtonSponsored: false,

			secondaryButtonSwitcher: false,
			secondaryButtonText: 'Get Started',
			secondaryButtonLink: '#',
			secondaryButtonTargetLink: true,
			secondaryButtonNofollow: false,
			secondaryButtonSponsored: false,

			normalItemBackgroundType: 'classic',
			normalItemClassicColor: '#EDEDED',
			normalItemGradientColor: '',
			normalItemCustomGradientSwitcher: false,
			normalItemCustomGradientInputValue: '',

			normalBackgroundImageUrl: {
				Desktop: '',
				Tablet: '',
				Mobile: '',
			},
			normalBackgroundImageAlt: {
				Desktop: '',
				Tablet: '',
				Mobile: '',
			},
			normalBackgroundImageID: {
				Desktop: '',
				Tablet: '',
				Mobile: '',
			},
			normalBackgroundImagePosition: {
				Desktop: { x: 0.5, y: 0.5 },
				Tablet: { x: 0.5, y: 0.5 },
				Mobile: { x: 0.5, y: 0.5 },
			},
			normalBackgroundImageAttachment: {
				Desktop: 'scroll',
				Tablet: 'scroll',
				Mobile: 'scroll',
			},
			normalBackgroundImageRepeat: {
				Desktop: 'no-repeat',
				Tablet: 'no-repeat',
				Mobile: 'no-repeat',
			},
			normalBackgroundImageSize: {
				Desktop: 'cover',
				Tablet: 'cover',
				Mobile: 'cover',
			},

			itemBackgroundOverlaySwitcher: false,
			itemBackgroundOverlayType: 'classic',
			itemBackgroundOverlayClassicColor: '#000',
			itemBackgroundOverlayGradientColor: '',
			itemBackgroundOverlayCustomGradientSwitcher: false,
			itemBackgroundOverlayCustomGradientInputValue: '',
			itemBackgroundOverlayOpacity: 0.5,
		};
		setAttributes( { sliderItems: [ ...sliderItems, newItem ] } );
		setSliderItemList( [ ...sliderItemList, newItem ] );
	};

	/**
	 * Updates a specific property of a slide item
	 * Handles special cases for background images with WordPress media integration
	 */
	const handleChangeItem = ( id, key, value ) => {
		// Get current device type ("Desktop", "Tablet", or "Mobile")
		const currentDevice = deviceType;

		const updatedItems = sliderItemList.map( ( item ) => {
			if ( item.id === id ) {
				// Handle normal background image updates for the current device only
				if ( key === 'normalBackgroundImageID' ) {
					// Get the full image data from WordPress media library
					const image = wp.media.attachment( value ).toJSON();
					return {
						...item,
						normalBackgroundImageID: {
							...item.normalBackgroundImageID,
							[ currentDevice ]: value,
						},
						normalBackgroundImageUrl: {
							...item.normalBackgroundImageUrl,
							[ currentDevice ]: image.url,
						},
						normalBackgroundImageAlt: {
							...item.normalBackgroundImageAlt,
							[ currentDevice ]: image.alt || '',
						},
					};
				}

				// Handle hover background image updates for the current device only
				if ( key === 'hoverBackgroundImageID' ) {
					const image = wp.media.attachment( value ).toJSON();
					return {
						...item,
						hoverBackgroundImageID: {
							...item.hoverBackgroundImageID,
							[ currentDevice ]: value,
						},
						hoverBackgroundImageUrl: {
							...item.hoverBackgroundImageUrl,
							[ currentDevice ]: image.url,
						},
						hoverBackgroundImageAlt: {
							...item.hoverBackgroundImageAlt,
							[ currentDevice ]: image.alt || '',
						},
					};
				}

				// For other properties, update as before
				return { ...item, [ key ]: value };
			}
			return item;
		} );

		setSliderItemList( updatedItems );
		setAttributes( { sliderItems: updatedItems } );
	};

	/**
	 * Handles duplicate slide functionality
	 */
	const handleDuplicateItem = ( id ) => {
		const itemToDuplicate = sliderItems.find( ( item ) => item.id === id );
		if ( itemToDuplicate ) {
			const newItem = {
				...itemToDuplicate,
				id: `item-${ sliderItems.length + 1 }`,
			};
			setAttributes( { sliderItems: [ ...sliderItems, newItem ] } );
			setSliderItemList( [ ...sliderItemList, newItem ] );
		}
	};

	/**
	 * Handles slide reordering via drag and drop functionality
	 * Updates slide order in both state and attributes
	 */
	const handleDragEnd = ( event ) => {
		const { active, over } = event;
		if ( active && over && active.id !== over.id ) {
			const oldIndex = sliderItems.findIndex(
				( item ) => item.id === active.id
			);
			const newIndex = sliderItems.findIndex(
				( item ) => item.id === over.id
			);
			const updatedItems = arrayMove( sliderItems, oldIndex, newIndex );
			setAttributes( { sliderItems: updatedItems } );
			setSliderItemList( updatedItems );
		}
	};

	/**
	 * Removes a slide from the slider by its ID
	 * Updates both state and block attributes
	 */
	const handleDeleteItem = ( id ) => {
		const updatedItems = sliderItemList.filter(
			( item ) => item.id !== id
		);
		setAttributes( { sliderItems: updatedItems } );
		setSliderItemList( updatedItems );
	};

	/**
	 * Keep sliderItems attribute in sync with local state
	 */
	useEffect( () => {
		setAttributes( { sliderItems: sliderItemList } );
	}, [ sliderItemList, setAttributes ] );

	/**
	 * Updates a specific field of a slide at the given index
	 * Used for RichText component changes
	 */
	const updateItem = ( index, field, value ) => {
		const newItems = sliderItems.map( ( item, i ) => {
			if ( i === index ) {
				return { ...item, [ field ]: value };
			}
			return item;
		} );
		setAttributes( { sliderItems: newItems } );
	};

	/**
	 * Renders toolbar controls for slide management
	 * Provides buttons for adding and duplicating slides
	 */
	const renderSliderToolbarControls = () => {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="plus"
						label={ __( 'Add New Slide', 'gslider-blocks' ) }
						onClick={ handleAddItem }
					/>
					<ToolbarButton
						icon="admin-page"
						label={ __(
							'Duplicate Current Slide',
							'gslider-blocks'
						) }
						onClick={ () => {
							// Get the currently visible slide's ID
							const currentSlideId =
								sliderItems[ selectedSlideIndex ]?.id;
							if ( currentSlideId ) {
								handleDuplicateItem( currentSlideId );
							}
						} }
					/>
				</ToolbarGroup>
			</BlockControls>
		);
	};

	/**
	 * Prevent default behavior for link clicks in the editor
	 */
	const handleButtonClick = ( event ) => {
		event.preventDefault();
	};

	return (
		<>
			{ isSelected && (
				<Inspector
					attributes={ attributes }
					setAttributes={ setAttributes }
					handleAddItem={ handleAddItem }
					handleChangeItem={ handleChangeItem }
					handleDuplicateItem={ handleDuplicateItem }
					handleDragEnd={ handleDragEnd }
					handleDeleteItem={ handleDeleteItem }
				/>
			) }

			{ renderSliderToolbarControls() }

			<div { ...blockProps }>
				<div
					className="swiper"
					ref={ swiperContainerRef }
					{ ...( globalID && { id: globalID } ) }
				>
					<div className="swiper-wrapper">
						{ sliderItemList.map( ( item, index ) => (
							<div className="swiper-slide" key={ item.id }>
								<div
									className={ `gslider-content-wrapper ${ item.id }` }
									ref={ panelRef }
								>
									<div className="gslider-content-inner-wrapper">
										<div className="gslider-list-item">
											<div className="gslider-list-content">
												{ showSubTitle && (
													<div className="gslider-subtitle-wrapper">
														<RichText
															tagName={
																subTitleHtmlTag
															}
															className="gslider-subtitle"
															value={
																item.subTitle
															}
															onChange={ (
																value
															) =>
																updateItem(
																	index,
																	'subTitle',
																	value
																)
															}
															placeholder={ __(
																'Enter subtitle',
																'gslider-blocks'
															) }
														/>
													</div>
												) }
												{ showTitle && (
													<div className="gslider-title-wrapper">
														<RichText
															tagName={
																titleHtmlTag
															}
															className="gslider-title"
															value={ item.title }
															onChange={ (
																value
															) =>
																updateItem(
																	index,
																	'title',
																	value
																)
															}
															placeholder={ __(
																'Enter title',
																'gslider-blocks'
															) }
														/>
													</div>
												) }
												{ showDescription && (
													<div className="gslider-description-wrapper">
														<RichText
															tagName={
																descriptionHtmlTag
															}
															className="gslider-description"
															value={
																item.description
															}
															onChange={ (
																value
															) =>
																updateItem(
																	index,
																	'description',
																	value
																)
															}
															placeholder={ __(
																'Enter description',
																'gslider-blocks'
															) }
														/>
													</div>
												) }
												{ showButton && (
													<div className="gslider-btn-wrapper">
														<div className="gslider-btn-inner-wrapper">
															<>
																{ item.primaryButtonLink ? (
																	// eslint-disable-next-line react/jsx-no-target-blank
																	<a
																		className="gslider-btn primary-btn"
																		href={
																			item.primaryButtonLink
																		}
																		target={
																			item.primaryButtonTargetLink
																				? '_blank'
																				: undefined
																		}
																		rel={ [
																			item.primaryButtonNofollow &&
																				'nofollow',
																			item.primaryButtonSponsored &&
																				'sponsored',
																			item.primaryButtonTargetLink &&
																				'noopener noreferrer',
																		]
																			.filter(
																				Boolean
																			)
																			.join(
																				' '
																			) }
																		onClick={
																			handleButtonClick
																		}
																	>
																		<RichText
																			value={
																				item.primaryButtonText
																			}
																			onChange={ (
																				value
																			) =>
																				updateItem(
																					index,
																					'primaryButtonText',
																					value
																				)
																			}
																			placeholder={ __(
																				'Enter button text…',
																				'gslider-blocks'
																			) }
																		/>
																	</a>
																) : (
																	<RichText
																		value={
																			item.primaryButtonText
																		}
																		className="gslider-btn primary-btn"
																		onChange={ (
																			value
																		) =>
																			updateItem(
																				index,
																				'primaryButtonText',
																				value
																			)
																		}
																		placeholder={ __(
																			'Enter button text…',
																			'gslider-blocks'
																		) }
																	/>
																) }

																{ item.secondaryButtonSwitcher &&
																	( item.secondaryButtonLink ? (
																		// eslint-disable-next-line react/jsx-no-target-blank
																		<a
																			className="gslider-btn secondary-btn"
																			href={
																				item.secondaryButtonLink
																			}
																			target={
																				item.secondaryButtonTargetLink
																					? '_blank'
																					: undefined
																			}
																			rel={ [
																				item.secondaryButtonNofollow &&
																					'nofollow',
																				item.secondaryButtonSponsored &&
																					'sponsored',
																				item.secondaryButtonTargetLink &&
																					'noopener noreferrer',
																			]
																				.filter(
																					Boolean
																				)
																				.join(
																					' '
																				) }
																			onClick={
																				handleButtonClick
																			}
																		>
																			<RichText
																				value={
																					item.secondaryButtonText
																				}
																				onChange={ (
																					value
																				) =>
																					updateItem(
																						index,
																						'secondaryButtonText',
																						value
																					)
																				}
																				placeholder={ __(
																					'Enter button text…',
																					'gslider-blocks'
																				) }
																			/>
																		</a>
																	) : (
																		<RichText
																			value={
																				item.secondaryButtonText
																			}
																			className="gslider-btn secondary-btn"
																			onChange={ (
																				value
																			) =>
																				updateItem(
																					index,
																					'secondaryButtonText',
																					value
																				)
																			}
																			placeholder={ __(
																				'Enter button text…',
																				'gslider-blocks'
																			) }
																		/>
																	) ) }
															</>
														</div>
													</div>
												) }
											</div>
										</div>
									</div>
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
						className="swiper-pagination swiper-pagination-base-slider"
						ref={ paginationInsideRef }
						aria-label={ __(
							'Carousel pagination',
							'gslider-blocks'
						) }
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
					className={ `swiper-pagination swiper-pagination-base-slider swiper-pagination-${ blockId }` }
					ref={ paginationOutsideRef }
					aria-label={ __( 'Slider pagination', 'gslider-blocks' ) }
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
