/**
 * BlocksTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Provides live enable/disable toggles for all 6 core slider blocks,
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
	PostCarouselIcon,
	TestimonialSliderIcon,
	ActiveStatusDotIcon,
	ToastSuccessIcon,
	ToastErrorIcon,
} from '../icons';

/**
 * Returns metadata for all 6 top-level GSlider blocks in alphabetical order.
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
		slug: 'post-carousel',
		name: __( 'Post Carousel', 'gslider-blocks' ),
		description: __(
			'Dynamic WordPress post query carousel with custom layouts, metadata, and hover animations.',
			'gslider-blocks'
		),
		icon: <PostCarouselIcon />,
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
 * Extracts a readable message from an apiFetch error.
 *
 * Nonce expiry gets a dedicated hint; otherwise the server message is shown
 * so admins can see why a toggle failed (permission, busy lock, bad slug).
 *
 * @param {Object} err Error thrown by apiFetch.
 * @return {string} Message to surface in the error toast.
 */
const getToggleErrorMessage = ( err ) => {
	if ( err && 'rest_cookie_invalid_nonce' === err.code ) {
		return __(
			'Your session has expired. Please reload the page and try again.',
			'gslider-blocks'
		);
	}

	if ( err && err.message ) {
		return err.message;
	}

	return __(
		'Failed to update block status. Please try again.',
		'gslider-blocks'
	);
};

/**
 * BlocksTab Component.
 *
 * @param {Object}   props                    Component props.
 * @param {Object}   [props.dashboardData]    Current dashboard metrics.
 * @param {Function} [props.setDashboardData] Parent dashboard state setter.
 * @param {boolean}  [props.hasError=false]   Whether dashboard data failed to load.
 * @param {Function} [props.onRetry]          Callback to retry loading dashboard data.
 * @return {JSX.Element} Rendered blocks management view.
 */
const BlocksTab = ( {
	dashboardData = null,
	setDashboardData,
	hasError = false,
	onRetry,
} ) => {
	const [ blocks, setBlocks ] = useState( () => {
		const serverBlocks = dashboardData?.blocks || [];
		return getBlocksMetadata().map( ( meta ) => {
			const found = serverBlocks.find( ( b ) => b.slug === meta.slug );
			return {
				...meta,
				enabled: found ? Boolean( found.enabled ) : true,
			};
		} );
	} );
	const [ isToggling, setIsToggling ] = useState( {} );
	const [ isBulkUpdating, setIsBulkUpdating ] = useState( false );
	const [ toast, setToast ] = useState( null );
	const toastTimeoutRef = useRef( null );
	const isMountedRef = useRef( true );
	const blocksRef = useRef( blocks );

	useEffect( () => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
			if ( toastTimeoutRef.current ) {
				clearTimeout( toastTimeoutRef.current );
			}
		};
	}, [] );

	/**
	 * Mirrors the latest blocks state so async handlers read the true
	 * current values instead of render-time closures.
	 */
	useEffect( () => {
		blocksRef.current = blocks;
	}, [ blocks ] );

	/**
	 * Syncs block state from dashboardData whenever no toggle is in flight.
	 */
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

	const showToast = ( type, message ) => {
		if ( toastTimeoutRef.current ) {
			clearTimeout( toastTimeoutRef.current );
		}
		setToast( { type, message, id: Date.now() } );
		toastTimeoutRef.current = setTimeout( () => {
			setToast( null );
		}, 3000 );
	};

	/**
	 * Merges the toggled slug's entry into the parent dashboard state.
	 *
	 * setDashboardData lives in App, which never unmounts, so this stays
	 * safe even after the user switches tabs mid-request. Per-slug merge
	 * keeps an older in-flight response from clobbering a newer toggle.
	 *
	 * @param {Array}  newServerBlocks Full updated server block list.
	 * @param {string} slug            Block slug to merge from the list.
	 * @return {void}
	 */
	const mergeServerBlocks = ( newServerBlocks, slug ) => {
		if (
			! Array.isArray( newServerBlocks ) ||
			typeof setDashboardData !== 'function'
		) {
			return;
		}

		setDashboardData( ( prev ) => {
			if ( ! prev ) {
				return prev;
			}

			const updatedServerBlock = newServerBlocks.find(
				( b ) => b.slug === slug
			);
			if ( ! updatedServerBlock ) {
				return prev;
			}

			return {
				...prev,
				blocks: prev.blocks
					? prev.blocks.map( ( b ) =>
							b.slug === slug ? updatedServerBlock : b
					  )
					: [ updatedServerBlock ],
			};
		} );
	};

	/**
	 * Sets a single block's enabled state in both local and parent state.
	 *
	 * @param {string}  slug    Block slug to update.
	 * @param {boolean} enabled New enabled value.
	 * @return {void}
	 */
	// The functional setDashboardData updater keeps prev untouched when
	// dashboard data is absent, so no render-closure check is needed here.
	const setBlockEnabled = ( slug, enabled ) => {
		// Keep the ref in sync immediately so a bulk toggle started in the
		// same tick snapshots the true latest values, not the last render.
		blocksRef.current = blocksRef.current.map( ( b ) =>
			b.slug === slug ? { ...b, enabled } : b
		);
		setBlocks( ( prev ) =>
			prev.map( ( b ) => ( b.slug === slug ? { ...b, enabled } : b ) )
		);
		if ( typeof setDashboardData === 'function' ) {
			setDashboardData( ( prev ) =>
				prev
					? {
							...prev,
							blocks: prev.blocks
								? prev.blocks.map( ( b ) =>
										b.slug === slug ? { ...b, enabled } : b
								  )
								: prev.blocks,
					  }
					: prev
			);
		}
	};

	const hasAnyToggleInFlight = () =>
		Object.values( isToggling ).some( Boolean );

	const handleToggle = async ( slug, nextEnabled ) => {
		if ( isToggling[ slug ] || isBulkUpdating ) {
			return;
		}

		setBlockEnabled( slug, nextEnabled );
		setIsToggling( ( prev ) => ( { ...prev, [ slug ]: true } ) );

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
				// Parent state carries server truth across tab switches, so
				// update it before the unmount check below.
				mergeServerBlocks( response.blocks, slug );

				if ( ! isMountedRef.current ) {
					return;
				}

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
			} else {
				throw new Error( 'Toggle rejected by server' );
			}
		} catch ( err ) {
			// Revert only this slug so concurrent toggles survive; parent
			// state reverts even though the tab may have unmounted.
			setBlockEnabled( slug, ! nextEnabled );

			if ( ! isMountedRef.current ) {
				return;
			}

			showToast( 'error', getToggleErrorMessage( err ) );
		} finally {
			setIsToggling( ( prev ) => ( { ...prev, [ slug ]: false } ) );
		}
	};

	const handleToggleAll = async ( nextEnabled ) => {
		if ( isBulkUpdating || hasAnyToggleInFlight() ) {
			return;
		}

		// Snapshot the true latest state via the ref, then flip every switch.
		const priorEnabled = {};
		blocksRef.current.forEach( ( b ) => {
			priorEnabled[ b.slug ] = b.enabled;
		} );

		blocksRef.current = blocksRef.current.map( ( b ) => ( {
			...b,
			enabled: nextEnabled,
		} ) );
		setBlocks( ( prev ) =>
			prev.map( ( b ) => ( {
				...b,
				enabled: nextEnabled,
			} ) )
		);
		setIsBulkUpdating( true );

		if ( typeof setDashboardData === 'function' ) {
			setDashboardData( ( prev ) =>
				prev
					? {
							...prev,
							blocks: prev.blocks
								? prev.blocks.map( ( b ) => ( {
										...b,
										enabled: nextEnabled,
								  } ) )
								: prev.blocks,
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
				// Bulk response reflects every slug at completion time.
				if (
					response.blocks &&
					typeof setDashboardData === 'function'
				) {
					setDashboardData( ( prev ) =>
						prev ? { ...prev, blocks: response.blocks } : prev
					);
				}

				if ( ! isMountedRef.current ) {
					return;
				}

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
			} else {
				throw new Error( 'Bulk toggle rejected by server' );
			}
		} catch ( err ) {
			const revertBlocks = ( prevBlocks ) =>
				prevBlocks.map( ( b ) =>
					Object.prototype.hasOwnProperty.call( priorEnabled, b.slug )
						? { ...b, enabled: priorEnabled[ b.slug ] }
						: b
				);

			if ( typeof setDashboardData === 'function' ) {
				setDashboardData( ( prev ) =>
					prev
						? {
								...prev,
								blocks: prev.blocks
									? revertBlocks( prev.blocks )
									: prev.blocks,
						  }
						: prev
				);
			}

			if ( ! isMountedRef.current ) {
				return;
			}

			setBlocks( ( prev ) => revertBlocks( prev ) );
			showToast( 'error', getToggleErrorMessage( err ) );
		} finally {
			setIsBulkUpdating( false );
		}
	};

	const activeCount = blocks.filter( ( b ) => b.enabled ).length;
	const totalCount = blocks.length;

	// No server state yet: show a loading card while fetching, an error card
	// with retry when the load failed. Never default switches to enabled.
	const hasServerState = Boolean(
		dashboardData?.blocks && dashboardData.blocks.length
	);
	const showLoadFailure = hasError && ! hasServerState;

	if ( ! hasServerState ) {
		return (
			<div className="gslider-dashboard-blocks-container">
				<div className="gslider-dashboard-card gslider-dashboard-blocks-header-card">
					<div className="gslider-dashboard-blocks-header">
						<div className="gslider-dashboard-blocks-header-left">
							<h2 className="gslider-dashboard-blocks-title">
								{ showLoadFailure
									? __(
											'Unable to load block status',
											'gslider-blocks'
									  )
									: __(
											'Loading block status',
											'gslider-blocks'
									  ) }
							</h2>
							<p className="gslider-dashboard-blocks-desc">
								{ showLoadFailure
									? __(
											'The block list could not be loaded. Your saved settings are unchanged.',
											'gslider-blocks'
									  )
									: __(
											'Fetching the current block status from the server.',
											'gslider-blocks'
									  ) }
							</p>
						</div>
					</div>
				</div>
				{ showLoadFailure && typeof onRetry === 'function' && (
					<button
						type="button"
						onClick={ onRetry }
						className="gslider-dashboard-btn-sm"
					>
						{ __( 'Try again', 'gslider-blocks' ) }
					</button>
				) }
			</div>
		);
	}

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
									activeCount === totalCount ||
									isBulkUpdating ||
									hasAnyToggleInFlight()
								}
								onClick={ () => handleToggleAll( true ) }
							>
								{ __( 'Activate All', 'gslider-blocks' ) }
							</button>
							<button
								type="button"
								className="gslider-dashboard-btn-sm"
								disabled={
									activeCount === 0 ||
									isBulkUpdating ||
									hasAnyToggleInFlight()
								}
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
