/**
 * BlocksTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Provides live enable/disable toggles for all 5 core slider blocks,
 * updating the WordPress Gutenberg inserter filter via REST API.
 *
 * @since 1.2.0
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import ToggleSwitch from '../components/ToggleSwitch';
import {
	BaseSliderIcon,
	FlexiSliderIcon,
	ImageSliderIcon,
	LogoCarouselIcon,
	TestimonialSliderIcon,
	ActiveStatusDotIcon,
	ToastSuccessIcon,
	ToastErrorIcon,
} from '../icons';

/**
 * Returns metadata for all 5 top-level GSlider blocks in alphabetical order.
 *
 * Evaluated lazily at call time so the `__()` name and description lookups
 * run after WordPress has injected the script translations locale data.
 *
 * @return {Array} Block metadata items.
 */
const getBlocksMetadata = () => [
	{
		slug: 'base',
		name: __( 'Base Slider', 'gslider-blocks' ),
		description: __(
			'Flexible, full-featured carousel block with customizable slides, buttons, and animations.',
			'gslider-blocks'
		),
		icon: <BaseSliderIcon />,
	},
	{
		slug: 'flexi-content',
		name: __( 'Flexi Content Slider', 'gslider-blocks' ),
		description: __(
			'Multi-slide layout container supporting nested Gutenberg blocks per slide.',
			'gslider-blocks'
		),
		icon: <FlexiSliderIcon />,
	},
	{
		slug: 'image-slider',
		name: __( 'Image Slider', 'gslider-blocks' ),
		description: __(
			'High-performance image gallery carousel with lightbox and thumbnail navigation.',
			'gslider-blocks'
		),
		icon: <ImageSliderIcon />,
	},
	{
		slug: 'logo-carousel',
		name: __( 'Logo Carousel', 'gslider-blocks' ),
		description: __(
			'Continuous client and sponsor logo showcase with grayscale and hover effects.',
			'gslider-blocks'
		),
		icon: <LogoCarouselIcon />,
	},
	{
		slug: 'testimonial',
		name: __( 'Testimonial Slider', 'gslider-blocks' ),
		description: __(
			'Customer reviews and ratings carousel with star ratings and avatar styling.',
			'gslider-blocks'
		),
		icon: <TestimonialSliderIcon />,
	},
];

/**
 * BlocksTab Component.
 *
 * @param {Object}   props                    Component props.
 * @param {Object}   [props.dashboardData]    Current dashboard metrics.
 * @param {Function} [props.setDashboardData] Parent dashboard state setter.
 * @return {JSX.Element} Rendered blocks management view.
 */
const BlocksTab = ( { dashboardData = null, setDashboardData } ) => {
	const getInitialBlocks = () => {
		const serverBlocks = dashboardData?.blocks || [];
		return getBlocksMetadata().map( ( meta ) => {
			const found = serverBlocks.find( ( b ) => b.slug === meta.slug );
			return {
				...meta,
				enabled: found ? Boolean( found.enabled ) : true,
			};
		} );
	};

	const [ blocks, setBlocks ] = useState( getInitialBlocks );
	const [ isToggling, setIsToggling ] = useState( {} );
	const [ isBulkUpdating, setIsBulkUpdating ] = useState( false );
	const [ toast, setToast ] = useState( null );
	const toastTimeoutRef = useRef( null );

	useEffect( () => {
		if (
			dashboardData?.blocks &&
			Object.values( isToggling ).every( ( v ) => ! v ) &&
			! isBulkUpdating
		) {
			setBlocks( ( currentBlocks ) =>
				currentBlocks.map( ( block ) => {
					const found = dashboardData.blocks.find(
						( b ) => b.slug === block.slug
					);
					return found
						? { ...block, enabled: Boolean( found.enabled ) }
						: block;
				} )
			);
		}
	}, [ dashboardData, isToggling, isBulkUpdating ] );

	useEffect( () => {
		return () => {
			if ( toastTimeoutRef.current ) {
				clearTimeout( toastTimeoutRef.current );
			}
		};
	}, [] );

	const showToast = ( type, message ) => {
		if ( toastTimeoutRef.current ) {
			clearTimeout( toastTimeoutRef.current );
		}
		setToast( { type, message, id: Date.now() } );
		toastTimeoutRef.current = setTimeout( () => {
			setToast( null );
		}, 3000 );
	};

	const handleToggle = async ( slug, nextEnabled ) => {
		if ( isToggling[ slug ] || isBulkUpdating ) {
			return;
		}

		const prevBlocks = [ ...blocks ];
		const updatedBlocks = blocks.map( ( b ) =>
			b.slug === slug ? { ...b, enabled: nextEnabled } : b
		);

		setBlocks( updatedBlocks );
		setIsToggling( ( prev ) => ( { ...prev, [ slug ]: true } ) );

		if ( typeof setDashboardData === 'function' ) {
			setDashboardData( ( prev ) =>
				prev
					? {
							...prev,
							blocks: updatedBlocks.map( ( b ) => ( {
								slug: b.slug,
								name: b.name,
								enabled: b.enabled,
							} ) ),
					  }
					: prev
			);
		}

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/toggle-block',
				method: 'POST',
				data: {
					slug,
					enabled: nextEnabled,
				},
			} );

			if ( response && response.status === 'success' ) {
				const blockMeta = getBlocksMetadata().find(
					( b ) => b.slug === slug
				);
				const blockName = blockMeta ? blockMeta.name : slug;

				showToast(
					'success',
					nextEnabled
						? sprintf(
								/* translators: %s: Block name */
								__(
									'%s enabled successfully',
									'gslider-blocks'
								),
								blockName
						  )
						: sprintf(
								/* translators: %s: Block name */
								__(
									'%s disabled successfully',
									'gslider-blocks'
								),
								blockName
						  )
				);

				if (
					response.blocks &&
					typeof setDashboardData === 'function'
				) {
					setDashboardData( ( prev ) =>
						prev ? { ...prev, blocks: response.blocks } : prev
					);
				}
			} else {
				throw new Error( 'Toggle rejected by server' );
			}
		} catch ( err ) {
			setBlocks( prevBlocks );
			if ( typeof setDashboardData === 'function' ) {
				setDashboardData( ( prev ) =>
					prev
						? {
								...prev,
								blocks: prevBlocks.map( ( b ) => ( {
									slug: b.slug,
									name: b.name,
									enabled: b.enabled,
								} ) ),
						  }
						: prev
				);
			}
			showToast(
				'error',
				__(
					'Failed to update block status. Please try again.',
					'gslider-blocks'
				)
			);
		} finally {
			setIsToggling( ( prev ) => ( { ...prev, [ slug ]: false } ) );
		}
	};

	const handleToggleAll = async ( nextEnabled ) => {
		if ( isBulkUpdating ) {
			return;
		}

		const prevBlocks = [ ...blocks ];
		const updatedBlocks = blocks.map( ( b ) => ( {
			...b,
			enabled: nextEnabled,
		} ) );

		setBlocks( updatedBlocks );
		setIsBulkUpdating( true );

		if ( typeof setDashboardData === 'function' ) {
			setDashboardData( ( prev ) =>
				prev
					? {
							...prev,
							blocks: updatedBlocks.map( ( b ) => ( {
								slug: b.slug,
								name: b.name,
								enabled: b.enabled,
							} ) ),
					  }
					: prev
			);
		}

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/toggle-block',
				method: 'POST',
				data: {
					slug: 'all',
					enabled: nextEnabled,
				},
			} );

			if ( response && response.status === 'success' ) {
				showToast(
					'success',
					nextEnabled
						? __(
								'All slider blocks activated successfully',
								'gslider-blocks'
						  )
						: __(
								'All slider blocks deactivated successfully',
								'gslider-blocks'
						  )
				);

				if (
					response.blocks &&
					typeof setDashboardData === 'function'
				) {
					setDashboardData( ( prev ) =>
						prev ? { ...prev, blocks: response.blocks } : prev
					);
				}
			} else {
				throw new Error( 'Bulk toggle rejected by server' );
			}
		} catch ( err ) {
			setBlocks( prevBlocks );
			if ( typeof setDashboardData === 'function' ) {
				setDashboardData( ( prev ) =>
					prev
						? {
								...prev,
								blocks: prevBlocks.map( ( b ) => ( {
									slug: b.slug,
									name: b.name,
									enabled: b.enabled,
								} ) ),
						  }
						: prev
				);
			}
			showToast(
				'error',
				__(
					'Failed to update all blocks. Please try again.',
					'gslider-blocks'
				)
			);
		} finally {
			setIsBulkUpdating( false );
		}
	};

	const activeCount = blocks.filter( ( b ) => b.enabled ).length;
	const totalCount = blocks.length;

	return (
		<div className="gslider-dashboard-blocks-container">
			{ /* Header Card */ }
			<div className="gslider-dashboard-card gslider-dashboard-blocks-header-card">
				<div className="gslider-dashboard-blocks-header">
					<div className="gslider-dashboard-blocks-header-left">
						<h2 className="gslider-dashboard-blocks-title">
							{ __( 'Core Slider Blocks', 'gslider-blocks' ) }
						</h2>
						<p className="gslider-dashboard-blocks-desc">
							{ __(
								'Enable or disable individual slider blocks in the Gutenberg inserter. Disabled blocks will not appear in the inserter, but existing published sliders on your site remain fully functional.',
								'gslider-blocks'
							) }
						</p>
					</div>
					<div className="gslider-dashboard-blocks-header-right">
						<div className="gslider-dashboard-blocks-actions">
							<button
								type="button"
								className="gslider-dashboard-btn-sm"
								disabled={
									activeCount === totalCount || isBulkUpdating
								}
								onClick={ () => handleToggleAll( true ) }
							>
								{ __( 'Activate All', 'gslider-blocks' ) }
							</button>
							<button
								type="button"
								className="gslider-dashboard-btn-sm"
								disabled={ activeCount === 0 || isBulkUpdating }
								onClick={ () => handleToggleAll( false ) }
							>
								{ __( 'Deactivate All', 'gslider-blocks' ) }
							</button>
						</div>
						<span className="gslider-dashboard-blocks-badge">
							<ActiveStatusDotIcon />
							<span>
								{ sprintf(
									/* translators: 1: number of active blocks, 2: total number of blocks */
									__(
										'%1$d of %2$d Active',
										'gslider-blocks'
									),
									activeCount,
									totalCount
								) }
							</span>
						</span>
					</div>
				</div>
			</div>

			{ /* 3-Column / 2-Column Responsive Card Grid */ }
			<div className="gslider-dashboard-blocks-grid" role="list">
				{ blocks.map( ( block ) => (
					<div
						key={ block.slug }
						role="listitem"
						className={ `gslider-dashboard-card gslider-dashboard-block-card ${
							block.enabled ? 'is-enabled' : 'is-disabled'
						} ${ isToggling[ block.slug ] ? 'is-toggling' : '' }` }
					>
						<div className="gslider-dashboard-block-card-top">
							<div className="gslider-dashboard-block-identity">
								<div className="gslider-dashboard-block-icon">
									{ block.icon }
								</div>
								<div className="gslider-dashboard-block-meta">
									<h3 className="gslider-dashboard-block-name">
										{ block.name }
									</h3>
									<span
										className={ `gslider-dashboard-block-status-tag ${
											block.enabled
												? 'is-enabled'
												: 'is-disabled'
										}` }
									>
										{ block.enabled
											? __( 'Active', 'gslider-blocks' )
											: __(
													'Disabled',
													'gslider-blocks'
											  ) }
									</span>
								</div>
							</div>
							<div className="gslider-dashboard-block-control">
								<ToggleSwitch
									id={ `gslider-toggle-${ block.slug }` }
									checked={ block.enabled }
									disabled={ Boolean(
										isToggling[ block.slug ] ||
											isBulkUpdating
									) }
									onChange={ ( nextVal ) =>
										handleToggle( block.slug, nextVal )
									}
									ariaLabel={ sprintf(
										/* translators: %s: Block name */
										__(
											'Toggle %s status',
											'gslider-blocks'
										),
										block.name
									) }
								/>
							</div>
						</div>

						<div className="gslider-dashboard-block-card-body">
							<p className="gslider-dashboard-block-description">
								{ block.description }
							</p>
						</div>
					</div>
				) ) }
			</div>

			{ /* Live regions stay mounted so screen readers catch text changes. The key remounts the text so a repeated message is read again. */ }
			<div className="screen-reader-text" role="status">
				{ toast?.type === 'success' && (
					<span key={ toast.id }>{ toast.message }</span>
				) }
			</div>
			<div className="screen-reader-text" role="alert">
				{ toast?.type === 'error' && (
					<span key={ toast.id }>{ toast.message }</span>
				) }
			</div>

			{ /* Transient Toast Notification */ }
			{ toast && (
				<div
					className={ `gslider-dashboard-toast ${
						toast.type === 'error' ? 'is-error' : 'is-success'
					}` }
					aria-hidden="true"
				>
					{ toast.type === 'success' ? (
						<ToastSuccessIcon />
					) : (
						<ToastErrorIcon />
					) }
					<span>{ toast.message }</span>
				</div>
			) }
		</div>
	);
};

export default BlocksTab;
