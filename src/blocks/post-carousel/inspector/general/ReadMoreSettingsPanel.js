/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, BaseControl } from '@wordpress/components';
import { ICON_TYPE, ICON_POSITION } from '@Constants';
import InputControls from '@Components/input-control';
import SwitcherControl from '@Components/switcher-control';
import UrlControl from '@Components/url-control';
import IconPicker from '@Components/icon-picker';
import ImageControl from '@Components/image-control';

const LINK_TYPE_OPTIONS = [
	{ label: __( 'Post Permalink', 'gslider-blocks' ), value: 'post' },
	{ label: __( 'Custom Link', 'gslider-blocks' ), value: 'custom' },
];

/**
 * General inspector panel for Read More button text, link behavior, and icon source.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Read More settings panel element.
 */
const ReadMoreSettingsPanel = ( {
	attributes,
	setAttributes,
	isOpen,
	onToggle,
} ) => {
	const {
		readMoreButtonText,
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
		readMoreButtonIconImageID,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Read More Button', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<InputControls
				label={ __( 'Read More Button Text', 'gslider-blocks' ) }
				value={ readMoreButtonText }
				onChangeValue={ ( value ) =>
					setAttributes( { readMoreButtonText: value } )
				}
			/>

			<SwitcherControl
				label={ __( 'Link Type', 'gslider-blocks' ) }
				options={ LINK_TYPE_OPTIONS }
				value={ readMoreButtonLinkType }
				onChange={ ( value ) =>
					setAttributes( { readMoreButtonLinkType: value } )
				}
			/>

			{ readMoreButtonLinkType === 'custom' ? (
				<UrlControl
					url={ readMoreButtonLink }
					onChangeUrl={ ( value ) =>
						setAttributes( { readMoreButtonLink: value } )
					}
					openInNewTab={ readMoreButtonTargetLink }
					onChangeOpenInNewTab={ ( value ) =>
						setAttributes( { readMoreButtonTargetLink: value } )
					}
					nofollow={ readMoreButtonNofollow }
					onChangeNofollow={ ( value ) =>
						setAttributes( { readMoreButtonNofollow: value } )
					}
					sponsored={ readMoreButtonSponsored }
					onChangeSponsored={ ( value ) =>
						setAttributes( { readMoreButtonSponsored: value } )
					}
				/>
			) : (
				<>
					<ToggleControl
						label={ __( 'Open in New Tab', 'gslider-blocks' ) }
						checked={ readMoreButtonTargetLink }
						onChange={ ( value ) =>
							setAttributes( {
								readMoreButtonTargetLink: value,
							} )
						}
					/>
					<ToggleControl
						label={ __( 'Add Nofollow rel', 'gslider-blocks' ) }
						checked={ readMoreButtonNofollow }
						onChange={ ( value ) =>
							setAttributes( { readMoreButtonNofollow: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Add Sponsored rel', 'gslider-blocks' ) }
						checked={ readMoreButtonSponsored }
						onChange={ ( value ) =>
							setAttributes( { readMoreButtonSponsored: value } )
						}
					/>
				</>
			) }

			<ToggleControl
				label={ __( 'Show Read More Icon', 'gslider-blocks' ) }
				checked={ readMoreButtonIconSwitcher }
				onChange={ ( value ) =>
					setAttributes( { readMoreButtonIconSwitcher: value } )
				}
			/>

			{ readMoreButtonIconSwitcher && (
				<>
					<BaseControl>
						<SwitcherControl
							label={ __( 'Icon Type', 'gslider-blocks' ) }
							options={ ICON_TYPE }
							value={ readMoreButtonIconType }
							onChange={ ( value ) =>
								setAttributes( {
									readMoreButtonIconType: value,
								} )
							}
						/>

						{ readMoreButtonIconType === 'icon' && (
							<IconPicker
								value={ readMoreButtonIcon }
								setIconHandler={ ( iconName ) =>
									setAttributes( {
										readMoreButtonIcon: iconName,
									} )
								}
							/>
						) }

						{ readMoreButtonIconType === 'image' && (
							<ImageControl
								imageUrl={ readMoreButtonIconImageUrl }
								setImageUrl={ ( value ) =>
									setAttributes( {
										readMoreButtonIconImageUrl: value,
									} )
								}
								imageAlt={ readMoreButtonIconImageAlt }
								setImageAlt={ ( value ) =>
									setAttributes( {
										readMoreButtonIconImageAlt: value,
									} )
								}
								imageID={ readMoreButtonIconImageID }
								setImageID={ ( value ) =>
									setAttributes( {
										readMoreButtonIconImageID: value,
									} )
								}
								isImageSize={ false }
							/>
						) }
					</BaseControl>
					<SwitcherControl
						label={ __( 'Icon Position', 'gslider-blocks' ) }
						options={ ICON_POSITION }
						value={ readMoreButtonIconPosition }
						onChange={ ( value ) =>
							setAttributes( {
								readMoreButtonIconPosition: value,
							} )
						}
					/>
				</>
			) }
		</PanelBody>
	);
};

export default ReadMoreSettingsPanel;
