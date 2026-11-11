/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, object-shorthand, jsdoc/require-param, no-nested-ternary */
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
import { normalizeContentOrder } from './content-order';

// Swiper is loaded globally via FrontendAssets.php (swiper-bundle.min.js)
// We use vanilla JS Swiper in useEffect instead of swiper/react

/**
 * Testimonial Slider Gutenberg editor component.
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

		showAuthorName,
		showAuthorDesignation,
		showTestimonialTitle,
		showTestimonialText,
		showAuthorImage,
		showRating,
		showRatingNumber,
		showQuoteIcon,
		quoteIconAlign,
		quoteIcon,
		quoteImageUrl,
		quoteImageAlt,
		showNavigation,
		showPagination,
		paginationPositionType,
		authorNameHtmlTag,
		authorDesignationHtmlTag,
		testimonialTitleHtmlTag,
		testimonialTextHtmlTag,
		globalID,
		globalClass,
		navigationArrowPositionType,
		navigationArrowPosition,

		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,

		direction,
		layoutHeightSwitcher,
		contentOrder,
		authorPlaceholderUrl,
	} = attributes;

	const normalizedContentOrder = normalizeContentOrder( contentOrder );

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
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	const trimmedGlobalClass = globalClass?.trim();

	// Block props for container
	const blockProps = useBlockProps( {
		className: `gslider-testimonial-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination?.Desktop ||
			showPagination?.Tablet ||
			showPagination?.Mobile
				? 'has-pagination'
				: ''
		}${ trimmedGlobalClass ? ` ${ trimmedGlobalClass }` : '' }`,
	} );

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

	const authorImagePlaceholder = authorPlaceholderUrl;

	/**
	 * Fix for image display on initial load
	 * Ensures all items have valid image URLs (placeholders) if missing
	 */
	useEffect( () => {
		const calculatedPlaceholder = window.GSliderBlocksData?.pluginUrl
			? `${ window.GSliderBlocksData.pluginUrl }assets/images/author-placeholder.svg`
			: '';

		if ( calculatedPlaceholder && ! authorPlaceholderUrl ) {
			setAttributes( { authorPlaceholderUrl: calculatedPlaceholder } );
		}

		const placeholderToUse = authorPlaceholderUrl || calculatedPlaceholder;

		if ( sliderItemList.some( ( item ) => ! item.authorImage?.url ) ) {
			const updatedItems = sliderItemList.map( ( item ) => {
				const updatedItem = { ...item };

				if ( placeholderToUse && ! item.authorImage?.url ) {
					updatedItem.authorImage = {
						...( item.authorImage || {} ),
						url: placeholderToUse,
						alt: item.authorImage?.alt || 'Author Placeholder',
					};
				}

				return updatedItem;
			} );
			setSliderItemList( updatedItems );
			setAttributes( { sliderItems: updatedItems } );
		}
	}, [] );

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
			...( direction === 'vertical' && { direction: 'vertical' } ),
			// Vertical slides use the fixed height, autoHeight does not work with it
			...( layoutHeightSwitcher === 'adapt' &&
				direction !== 'vertical' && {
					autoHeight: true,
				} ),
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
		blockId,
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
		direction,
		layoutHeightSwitcher,
	] );

	/**
	 * Creates and adds a new slide with default content and settings
	 * Generates a unique ID for the new slide
	 */
	const handleAddItem = () => {
		const newItem = {
			id: `item-${ Date.now() }-${ Math.random()
				.toString( 36 )
				.substr( 2, 5 ) }`,
			testimonialTitle: 'Excellent Testimonial Plugin',
			testimonialText:
				'This is the best testimonial plugin I have ever used. Highly recommended for any WordPress site!',
			authorName: 'Alex Hunter',
			authorDesignation: 'Software Engineer, Google',
			authorImage: {
				url: authorImagePlaceholder,
				id: '',
				alt: 'Author Placeholder',
			},
			ratingIconAlign: 'icon',
			ratingNumber: 5,
			ratingImage: {
				url: '',
				id: '',
				alt: '',
			},

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
					const image = value
						? wp.media.attachment( value ).toJSON()
						: { url: '', alt: '' };
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
					const image = value
						? wp.media.attachment( value ).toJSON()
						: { url: '', alt: '' };
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

				// Special handling for authorImage to allow partial updates (merging)
				if ( key === 'authorImage' ) {
					// Ensure null values from ImageControl (delete) are converted to defaults
					const normalizedValue = {};
					if ( value ) {
						if ( value.url === null ) {
							normalizedValue.url = '';
						} else if ( value.url !== undefined ) {
							normalizedValue.url = value.url;
						}

						if ( value.id === null ) {
							normalizedValue.id = '';
						} else if ( value.id !== undefined ) {
							normalizedValue.id = value.id;
						}

						if ( value.alt === null ) {
							normalizedValue.alt = '';
						} else if ( value.alt !== undefined ) {
							normalizedValue.alt = value.alt;
						}
					}

					return {
						...item,
						[ key ]: {
							...item[ key ],
							...normalizedValue,
						},
					};
				}

				// For other properties, update as before
				return { ...item, [ key ]: value };
			}
			return item;
		} );

		setSliderItemList( updatedItems );
	};

	/**
	 * Handles duplicate slide functionality
	 */
	const handleDuplicateItem = ( id ) => {
		const itemToDuplicate = sliderItems.find( ( item ) => item.id === id );
		if ( itemToDuplicate ) {
			const newItem = {
				...itemToDuplicate,
				id: `item-${ Date.now() }-${ Math.random()
					.toString( 36 )
					.substr( 2, 5 ) }`,
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

	return (
		<>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				handleAddItem={ handleAddItem }
				handleChangeItem={ handleChangeItem }
				handleDuplicateItem={ handleDuplicateItem }
				handleDragEnd={ handleDragEnd }
				handleDeleteItem={ handleDeleteItem }
			/>

			{ renderSliderToolbarControls() }

			<div { ...blockProps }>
				<div
					className="swiper"
					ref={ swiperContainerRef }
					{ ...( globalID && { id: globalID } ) }
				>
					<div className="swiper-wrapper">
						{ sliderItemList.map( ( item, index ) => {
							return (
								<div className="swiper-slide" key={ item.id }>
									<div
										className={ `gslider-content-wrapper ${ item.id }` }
										ref={ panelRef }
									>
										<div className="gslider-content-inner-wrapper">
											{ ( () => {
												// Group render map — each group is a self-contained JSX block
												const renderGroupMap = {
													quote:
														showQuoteIcon &&
														quoteIconAlign !==
															'none' ? (
															<div
																key="quote"
																className="gslider-testimonial-quote-icon-wrapper"
															>
																{ quoteIconAlign ===
																	'icon' &&
																	renderSVG(
																		quoteIcon
																	) }
																{ quoteIconAlign ===
																	'image' &&
																	quoteImageUrl && (
																		<img
																			src={
																				quoteImageUrl
																			}
																			alt={
																				quoteImageAlt
																			}
																		/>
																	) }
															</div>
														) : null,

													content: (
														<div
															key="content"
															className="gslider-testimonial-content-group"
														>
															{ showTestimonialTitle &&
																item.testimonialTitle && (
																	<div className="gslider-testimonial-title-wrapper">
																		<RichText
																			tagName={
																				testimonialTitleHtmlTag
																			}
																			className="gslider-testimonial-title"
																			value={
																				item.testimonialTitle
																			}
																			onChange={ (
																				value
																			) =>
																				updateItem(
																					index,
																					'testimonialTitle',
																					value
																				)
																			}
																			placeholder="Enter title"
																		/>
																	</div>
																) }
															{ showTestimonialText &&
																item.testimonialText && (
																	<div className="gslider-testimonial-text-wrapper">
																		<RichText
																			tagName={
																				testimonialTextHtmlTag
																			}
																			className="gslider-testimonial-text"
																			value={
																				item.testimonialText
																			}
																			onChange={ (
																				value
																			) =>
																				updateItem(
																					index,
																					'testimonialText',
																					value
																				)
																			}
																			placeholder="Enter description"
																		/>
																	</div>
																) }
														</div>
													),

													rating: showRating ? (
														<div
															key="rating"
															className="gslider-testimonial-rating-wrapper"
														>
															<div className="gslider-testimonial-rating-inner">
																<div className="gslider-testimonial-rating-wrap">
																	{ ( () => {
																		const {
																			ratingNumber,
																			ratingIconAlign,
																		} =
																			item;
																		const ratingImageUrl =
																			item
																				.ratingImage
																				?.url;
																		const ratingImageAlt =
																			item
																				.ratingImage
																				?.alt;
																		const rating =
																			Math.max(
																				0,
																				Math.min(
																					5,
																					parseFloat(
																						ratingNumber ||
																							0
																					)
																				)
																			);

																		if (
																			ratingIconAlign ===
																				'none' ||
																			rating ===
																				0
																		) {
																			return null;
																		}

																		// For image mode, show images based on full star count
																		if (
																			ratingIconAlign ===
																				'image' &&
																			ratingImageUrl
																		) {
																			const fullCount =
																				Math.round(
																					rating
																				);
																			const icons =
																				[];
																			for (
																				let i = 0;
																				i <
																				fullCount;
																				i++
																			) {
																				icons.push(
																					<div
																						key={
																							i
																						}
																						className="gslider-testimonial-rating-icon"
																					>
																						<img
																							src={
																								ratingImageUrl
																							}
																							alt={
																								ratingImageAlt
																							}
																						/>
																					</div>
																				);
																			}
																			return icons;
																		}

																		// For icon mode, render 5 SVG stars (full/partial/empty)
																		if (
																			ratingIconAlign ===
																			'icon'
																		) {
																			const fullStars =
																				Math.floor(
																					rating
																				);
																			const fraction =
																				rating -
																				fullStars;
																			const emptyStars =
																				5 -
																				fullStars -
																				( fraction >
																				0
																					? 1
																					: 0 );

																			const FullStar =
																				() => (
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						viewBox="0 0 49.23 48.44"
																						className="gslider-testimonial-rating-star-svg"
																					>
																						<path
																							d="M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z"
																							transform="translate(-0.39 -0.78)"
																						/>
																					</svg>
																				);

																			const EmptyStar =
																				() => (
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						viewBox="0 0 49.23 48.44"
																						className="gslider-testimonial-rating-star-svg"
																					>
																						<path
																							d="M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z"
																							transform="translate(-0.49 -0.53)"
																						/>
																					</svg>
																				);

																			const stars =
																				[];

																			// Full stars
																			for (
																				let i = 0;
																				i <
																				fullStars;
																				i++
																			) {
																				stars.push(
																					<div
																						key={ `full-${ i }` }
																						className="gslider-testimonial-rating-icon"
																					>
																						<FullStar />
																					</div>
																				);
																			}

																			// Partial star
																			if (
																				fraction >
																				0
																			) {
																				stars.push(
																					<div
																						key="partial"
																						className="gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap"
																					>
																						<div className="gslider-testimonial-star-partial-container">
																							<EmptyStar />
																							<div
																								className="gslider-testimonial-star-partial-fill"
																								style={ {
																									width: `${
																										fraction *
																										100
																									}%`,
																								} }
																							>
																								<FullStar />
																							</div>
																						</div>
																					</div>
																				);
																			}

																			// Empty stars
																			for (
																				let i = 0;
																				i <
																				emptyStars;
																				i++
																			) {
																				stars.push(
																					<div
																						key={ `empty-${ i }` }
																						className="gslider-testimonial-rating-icon empty"
																					>
																						<EmptyStar />
																					</div>
																				);
																			}

																			return stars;
																		}

																		return null;
																	} )() }
																</div>
																{ showRatingNumber && (
																	<div className="gslider-testimonial-rating-number">
																		(
																		{ Math.max(
																			0,
																			Math.min(
																				5,
																				parseFloat(
																					item.ratingNumber ||
																						0
																				)
																			)
																		) }
																		)
																	</div>
																) }
															</div>
														</div>
													) : null,

													author: (
														<div
															key="author"
															className="gslider-author-info-group"
														>
															{ showAuthorImage &&
																( item
																	.authorImage
																	?.url ||
																	authorImagePlaceholder ) && (
																	<div className="gslider-testimonial-author-image-wrapper">
																		<img
																			src={
																				item
																					.authorImage
																					?.url ||
																				authorImagePlaceholder
																			}
																			alt={
																				item
																					.authorImage
																					?.alt ||
																				'Author'
																			}
																			className="gslider-testimonial-author-image"
																		/>
																	</div>
																) }
															<div className="gslider-author-meta">
																{ showAuthorName &&
																	item.authorName && (
																		<div className="gslider-testimonial-author-name-wrapper">
																			<RichText
																				tagName={
																					authorNameHtmlTag
																				}
																				className="gslider-testimonial-author-name"
																				value={
																					item.authorName
																				}
																				onChange={ (
																					value
																				) =>
																					updateItem(
																						index,
																						'authorName',
																						value
																					)
																				}
																				placeholder="Enter author name"
																			/>
																		</div>
																	) }
																{ showAuthorDesignation &&
																	item.authorDesignation && (
																		<div className="gslider-testimonial-author-designation-wrapper">
																			<RichText
																				tagName={
																					authorDesignationHtmlTag
																				}
																				className="gslider-testimonial-author-designation"
																				value={
																					item.authorDesignation
																				}
																				onChange={ (
																					value
																				) =>
																					updateItem(
																						index,
																						'authorDesignation',
																						value
																					)
																				}
																				placeholder="Enter author designation"
																			/>
																		</div>
																	) }
															</div>
														</div>
													),
												};

												// Render groups in contentOrder
												return normalizedContentOrder.map(
													( groupKey ) =>
														renderGroupMap[
															groupKey
														] || null
												);
											} )() }
										</div>
									</div>
								</div>
							);
						} ) }
					</div>

					{ /* Navigation inside swiper container */ }
					{ showNavigation?.[ deviceType ] &&
						! navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<>
								<div
									className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<button
										type="button"
										ref={ prevRef }
										className="swiper-button-prev"
										aria-label={ __(
											'Previous slide',
											'gslider-blocks'
										) }
									></button>
									<button
										type="button"
										ref={ nextRef }
										className="swiper-button-next"
										aria-label={ __(
											'Next slide',
											'gslider-blocks'
										) }
									></button>
								</div>
							</>
						) }

					{ showNavigation?.[ deviceType ] &&
						navigationArrowsIconSwitcher &&
						navigationArrowPositionType === 'inside' && (
							<div
								className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<button
									type="button"
									className="swiper-button-prev"
									ref={ prevRef }
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
											alt=""
											aria-hidden="true"
										/>
									) : (
										<span aria-hidden="true">
											{ renderSVG(
												navigationArrowsIconLeft
											) }
										</span>
									) }
								</button>
								<button
									type="button"
									className="swiper-button-next"
									ref={ nextRef }
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
											alt=""
											aria-hidden="true"
										/>
									) : (
										<span aria-hidden="true">
											{ renderSVG(
												navigationArrowsIconRight
											) }
										</span>
									) }
								</button>
							</div>
						) }

					{ /* Pagination inside swiper container */ }
					<div
						className="swiper-pagination swiper-pagination-testimonial-slider"
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
								<button
									type="button"
									ref={ prevRef }
									className="swiper-button-prev"
									aria-label={ __(
										'Previous slide',
										'gslider-blocks'
									) }
								></button>
								<button
									type="button"
									ref={ nextRef }
									className="swiper-button-next"
									aria-label={ __(
										'Next slide',
										'gslider-blocks'
									) }
								></button>
							</div>
						</>
					) }

				{ showNavigation?.[ deviceType ] &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<button
								type="button"
								className="swiper-button-prev"
								ref={ prevRef }
								aria-label={ __(
									'Previous slide',
									'gslider-blocks'
								) }
							>
								{ navigationArrowsIconLeftAlign === 'image' &&
								navigationArrowsIconLeftImageUrl ? (
									<img
										src={ navigationArrowsIconLeftImageUrl }
										alt=""
										aria-hidden="true"
									/>
								) : (
									<span aria-hidden="true">
										{ renderSVG(
											navigationArrowsIconLeft
										) }
									</span>
								) }
							</button>
							<button
								type="button"
								className="swiper-button-next"
								ref={ nextRef }
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
										alt=""
										aria-hidden="true"
									/>
								) : (
									<span aria-hidden="true">
										{ renderSVG(
											navigationArrowsIconRight
										) }
									</span>
								) }
							</button>
						</div>
					) }

				{ /* Pagination outside swiper container */ }
				<div
					className={ `swiper-pagination swiper-pagination-testimonial-slider swiper-pagination-${ blockId }` }
					ref={ paginationOutsideRef }
					aria-label={ __( 'Slider pagination', 'gslider-blocks' ) }
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
