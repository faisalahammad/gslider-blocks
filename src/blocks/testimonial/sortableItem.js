/* eslint-disable import/no-unresolved, react-hooks/exhaustive-deps */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	Button,
	BaseControl,
	Dropdown,
	Dashicon,
	TextControl,
	TextareaControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import BackgroundControl from '@Components/background-control';
import ImageControl from '@Components/image-control';
import { ICON_IMAGE_ALIGN } from '@Constants';
import SwitcherControl from '@Components/switcher-control';

export default function SortableItem( {
	id,
	item,
	handleChangeItem,
	handleDeleteItem,
	handleDuplicateItem,
	index,
	deviceType,
	authorPlaceholderUrl,
	setAttributes,
} ) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable( { id } );
	const [ isOpen, setIsOpen ] = useState( false );

	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};

	const toggleOpen = () => setIsOpen( ! isOpen );

	const defaultPlaceholder = authorPlaceholderUrl;

	/**
	 * Set default placeholder if missing
	 */
	useEffect( () => {
		if ( defaultPlaceholder && ! item.authorImage?.url ) {
			handleChangeItem( item.id, 'authorImage', {
				url: defaultPlaceholder,
				id: '',
				alt: 'Author Placeholder',
			} );
		}
	}, [ defaultPlaceholder ] );

	return (
		<li
			className="sortable-item"
			ref={ setNodeRef }
			{ ...attributes }
			style={ style }
		>
			<div className="sortable-header">
				<span
					className="sortable-title"
					role="button"
					tabIndex={ 0 }
					onClick={ toggleOpen }
					onKeyDown={ ( event ) => {
						if ( event.key === 'Enter' || event.key === ' ' ) {
							event.preventDefault();
							toggleOpen();
						}
					} }
				>
					{ item.testimonialTitle ||
						item.title ||
						/* translators: %d: testimonial item number */ sprintf(
							__( 'Testimonial Item %d', 'gslider-blocks' ),
							index + 1
						) }
				</span>
				<span
					className="sortable-sort"
					{ ...listeners }
					style={ { cursor: 'grab' } }
				>
					<Button
						icon="move"
						label={ __( 'Sort', 'gslider-blocks' ) }
						aria-label={ __( 'Move item', 'gslider-blocks' ) }
					/>
				</span>
				<span className="sortable-duplicate">
					<Button
						icon="admin-page"
						label={ __( 'Duplicate', 'gslider-blocks' ) }
						aria-label={ __( 'Duplicate item', 'gslider-blocks' ) }
						onClick={ () => handleDuplicateItem( item.id ) }
					/>
				</span>
				<span className="sortable-delete">
					<Button
						icon="trash"
						label={ __( 'Delete', 'gslider-blocks' ) }
						aria-label={ __( 'Delete item', 'gslider-blocks' ) }
						onClick={ () => handleDeleteItem( item.id ) }
					/>
				</span>
			</div>

			{ isOpen && (
				<div className="sortable-item-content">
					<BaseControl
						id={ `testimonial-slide-content-${ item.id }` }
						className="gslider-setting-background-color-setting-wrapper"
						label={ __( 'Slide Content', 'gslider-blocks' ) }
					>
						<Dropdown
							className="gslider-setting-icon-dropdown"
							contentClassName="gslider-setting-icon-dropdown-content sortable-item-content-dropdown"
							popoverProps={ { placement: 'bottom-start' } }
							renderToggle={ ( {
								isOpen: dropdownIsOpen,
								onToggle,
							} ) => (
								<Button
									variant="primary"
									onClick={ onToggle }
									aria-expanded={ dropdownIsOpen }
									className="gslider-setting-icon-btn"
								>
									<Dashicon
										icon="edit"
										className="gslider-setting-panel-icon"
									/>
								</Button>
							) }
							renderContent={ () => (
								<div className="gslider-setting-contant-popup-wrapper">
									<TextControl
										label={ __(
											'Testimonial Title',
											'gslider-blocks'
										) }
										value={ item.testimonialTitle }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'testimonialTitle',
												value
											)
										}
										help="Leave blank to hide testimonial title"
									/>
									<TextareaControl
										label={ __(
											'Testimonial Text',
											'gslider-blocks'
										) }
										value={ item.testimonialText }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'testimonialText',
												value
											)
										}
										help="Leave blank to hide testimonial text"
									/>
									<TextControl
										label={ __(
											'Author Name',
											'gslider-blocks'
										) }
										value={ item.authorName }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'authorName',
												value
											)
										}
										help="Leave blank to hide author name"
									/>
									<TextControl
										label={ __(
											'Author Designation',
											'gslider-blocks'
										) }
										value={ item.authorDesignation }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'authorDesignation',
												value
											)
										}
										help="Leave blank to hide designation"
									/>
									<ImageControl
										label={ __(
											'Author Image',
											'gslider-blocks'
										) }
										imageUrl={ item.authorImage?.url }
										setImageUrl={ ( value ) =>
											handleChangeItem(
												item.id,
												'authorImage',
												{ url: value }
											)
										}
										imageAlt={ item.authorImage?.alt }
										setImageAlt={ ( value ) =>
											handleChangeItem(
												item.id,
												'authorImage',
												{ alt: value }
											)
										}
										imageID={ item.authorImage?.id }
										setImageID={ ( value ) =>
											handleChangeItem(
												item.id,
												'authorImage',
												{ id: value }
											)
										}
										isImageSize={ false }
									/>
									<ImageControl
										label={ __(
											'Company Logo',
											'gslider-blocks'
										) }
										imageUrl={ item.companyLogo?.url }
										setImageUrl={ ( value ) =>
											handleChangeItem(
												item.id,
												'companyLogo',
												{ url: value }
											)
										}
										imageAlt={ item.companyLogo?.alt }
										setImageAlt={ ( value ) =>
											handleChangeItem(
												item.id,
												'companyLogo',
												{ alt: value }
											)
										}
										imageID={ item.companyLogo?.id }
										setImageID={ ( value ) =>
											handleChangeItem(
												item.id,
												'companyLogo',
												{ id: value }
											)
										}
										isImageSize={ false }
									/>

									<SwitcherControl
										label={ __(
											'Rating Icon Type',
											'gslider-blocks'
										) }
										options={ ICON_IMAGE_ALIGN }
										value={ item.ratingIconAlign }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'ratingIconAlign',
												value
											)
										}
										help={ __(
											'Icon: SVG star ratings with fractional support. Image: Upload a custom SVG or image (no fractional support). None: Hide rating.',
											'gslider-blocks'
										) }
									/>

									{ item.ratingIconAlign === 'image' && (
										<ImageControl
											label={ __(
												'Image',
												'gslider-blocks'
											) }
											imageUrl={ item.ratingImage?.url }
											setImageUrl={ ( value ) =>
												handleChangeItem(
													item.id,
													'ratingImage',
													{
														...item.ratingImage,
														url: value,
													}
												)
											}
											imageAlt={ item.ratingImage?.alt }
											setImageAlt={ ( value ) =>
												handleChangeItem(
													item.id,
													'ratingImage',
													{
														...item.ratingImage,
														alt: value,
													}
												)
											}
											imageID={ item.ratingImage?.id }
											setImageID={ ( value ) =>
												handleChangeItem(
													item.id,
													'ratingImage',
													{
														...item.ratingImage,
														id: value,
													}
												)
											}
											isImageSize={ false }
										/>
									) }

									{ item.ratingIconAlign === 'icon' && (
										<RangeControl
											label={ __(
												'Rating Number',
												'gslider-blocks'
											) }
											value={ item.ratingNumber }
											onChange={ ( value ) =>
												handleChangeItem(
													item.id,
													'ratingNumber',
													value
												)
											}
											min={ 0 }
											max={ 5 }
											step={ 0.1 }
											help={ __(
												'Supports fractional values (e.g. 4.5, 3.7)',
												'gslider-blocks'
											) }
										/>
									) }

									{ item.ratingIconAlign === 'image' && (
										<RangeControl
											label={ __(
												'Rating Number',
												'gslider-blocks'
											) }
											value={ item.ratingNumber }
											onChange={ ( value ) =>
												handleChangeItem(
													item.id,
													'ratingNumber',
													value
												)
											}
											min={ 0 }
											max={ 5 }
											step={ 1 }
											help={ __(
												'Number of images or Svg to display (1–5)',
												'gslider-blocks'
											) }
										/>
									) }
								</div>
							) }
						/>
					</BaseControl>
					<BaseControl
						id={ `testimonial-background-${ item.id }` }
						className="gslider-setting-background-color-setting-wrapper"
						label={ __( 'Background', 'gslider-blocks' ) }
					>
						<Dropdown
							className="gslider-setting-icon-dropdown"
							contentClassName="gslider-setting-icon-dropdown-content sortable-item-content-dropdown"
							popoverProps={ { placement: 'bottom-start' } }
							renderToggle={ ( {
								isOpen: dropdownIsOpen,
								onToggle,
							} ) => (
								<Button
									onClick={ onToggle }
									aria-expanded={ dropdownIsOpen }
									className="gslider-setting-icon-btn"
								>
									<Dashicon
										icon="edit"
										className="gslider-setting-panel-icon"
									/>
								</Button>
							) }
							renderContent={ () => (
								<div className="gslider-setting-background-color-popup-wrapper">
									<BackgroundControl
										deviceType={ deviceType }
										normalBackgroundType={
											item.normalItemBackgroundType
										}
										setNormalBackgroundType={ ( value ) =>
											handleChangeItem(
												item.id,
												'normalItemBackgroundType',
												value
											)
										}
										normalClassicColor={
											item.normalItemClassicColor
										}
										setNormalClassicColor={ ( value ) =>
											handleChangeItem(
												item.id,
												'normalItemClassicColor',
												value
											)
										}
										normalGradientColor={
											item.normalItemGradientColor
										}
										setNormalGradientColor={ ( value ) =>
											handleChangeItem(
												item.id,
												'normalItemGradientColor',
												value
											)
										}
										normalCustomGradientSwitcher={
											item.normalItemCustomGradientSwitcher
										}
										setNormalCustomGradientSwitcher={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalItemCustomGradientSwitcher',
												value
											)
										}
										normalCustomGradientInputValue={
											item.normalItemCustomGradientInputValue
										}
										setNormalCustomGradientInputValue={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalItemCustomGradientInputValue',
												value
											)
										}
										normalBackgroundImageUrl={
											item.normalBackgroundImageUrl
										}
										setNormalBackgroundImageUrl={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageUrl',
												value
											)
										}
										normalBackgroundImageAlt={
											item.normalBackgroundImageAlt
										}
										setNormalBackgroundImageAlt={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageAlt',
												value
											)
										}
										normalBackgroundImageID={
											item.normalBackgroundImageID
										}
										setNormalBackgroundImageID={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageID',
												value
											)
										}
										normalBackgroundImagePosition={
											item.normalBackgroundImagePosition
										}
										setNormalBackgroundImagePosition={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImagePosition',
												value
											)
										}
										normalBackgroundImageAttachment={
											item.normalBackgroundImageAttachment
										}
										setNormalBackgroundImageAttachment={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageAttachment',
												value
											)
										}
										normalBackgroundImageRepeat={
											item.normalBackgroundImageRepeat
										}
										setNormalBackgroundImageRepeat={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageRepeat',
												value
											)
										}
										normalBackgroundImageSize={
											item.normalBackgroundImageSize
										}
										setNormalBackgroundImageSize={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageSize',
												value
											)
										}
										normalClassicDefaultColor={ '#EDEDED' }
										setAttributes={ setAttributes }
										isHover={ false }
									/>
									<ToggleControl
										label={ __(
											'Enable Overlay',
											'gslider-blocks'
										) }
										checked={
											item.itemBackgroundOverlaySwitcher
										}
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'itemBackgroundOverlaySwitcher',
												value
											)
										}
									/>
									{ item.itemBackgroundOverlaySwitcher && (
										<>
											<BackgroundControl
												deviceType={ deviceType }
												normalBackgroundType={
													item.itemBackgroundOverlayType
												}
												setNormalBackgroundType={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayType',
														value
													)
												}
												normalClassicColor={
													item.itemBackgroundOverlayClassicColor
												}
												setNormalClassicColor={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayClassicColor',
														value
													)
												}
												normalGradientColor={
													item.itemBackgroundOverlayGradientColor
												}
												setNormalGradientColor={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayGradientColor',
														value
													)
												}
												normalCustomGradientSwitcher={
													item.itemBackgroundOverlayCustomGradientSwitcher
												}
												setNormalCustomGradientSwitcher={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayCustomGradientSwitcher',
														value
													)
												}
												normalCustomGradientInputValue={
													item.itemBackgroundOverlayCustomGradientInputValue
												}
												setNormalCustomGradientInputValue={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayCustomGradientInputValue',
														value
													)
												}
												setAttributes={ setAttributes }
												isBackgroundImage={ false }
												isHover={ false }
											/>
											<RangeControl
												label={ __(
													'Opacity',
													'gslider-blocks'
												) }
												value={
													item.itemBackgroundOverlayOpacity
												}
												onChange={ ( value ) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayOpacity',
														value
													)
												}
												min={ 0 }
												max={ 1 }
												step={ 0.1 }
											/>
										</>
									) }
								</div>
							) }
						/>
					</BaseControl>
				</div>
			) }
		</li>
	);
}
