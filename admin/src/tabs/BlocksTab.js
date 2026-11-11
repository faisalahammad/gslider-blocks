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
 * Server error code returned when another toggle holds the advisory lock.
 *
 * @type {string}
 */
const TOGGLE_BUSY_ERROR_CODE = 'gslider_toggle_busy';

/**
 * Tries per toggle: one initial request plus one retry on a busy lock, so
 * concurrent toggles for different slugs both persist (issue #329).
 *
 * @type {number}
 */
const TOGGLE_MAX_ATTEMPTS = 2;

/**
 * Wait between toggle attempts, in milliseconds.
 *
 * @type {number}
 */
const TOGGLE_RETRY_DELAY_MS = 500;

/**
 * Registry key that marks an in-flight bulk (toggle all) request in the
 * App-held in-flight set.
 *
 * @type {string}
 */
const BULK_TOGGLE_KEY = '__all__';

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
 * Waits for the given delay before a retry attempt.
 *
 * @param {number} ms Delay in milliseconds.
 * @return {Promise<void>} Promise that resolves after the delay.
 */
const wait = ( ms ) => new Promise( ( resolve ) => setTimeout( resolve, ms ) );

/**
 * BlocksTab Component.
 *
 * @param {Object}   props                      Component props.
 * @param {Object}   [props.dashboardData]      Current dashboard metrics.
 * @param {Function} [props.setDashboardData]   Parent dashboard state setter.
 * @param {Set}      [props.inFlightTogglesRef] Ref set of slugs with pending toggle requests, held in App so the guard survives tab switches.
 * @param {boolean}  [props.isLoading=false]    Whether the dashboard request is still running.
 * @param {boolean}  [props.hasError=false]     Whether dashboard data failed to load.
 * @param {Function} [props.onRetry]            Callback to retry loading dashboard data.
 * @return {JSX.Element} Rendered blocks management view.
 */
const BlocksTab = ( {
	dashboardData = null,
	setDashboardData,
	inFlightTogglesRef,
	isLoading = false,
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

	/**
	 * Marks a slug as in-flight in the App-held set and mirrors it into
	 * local state. The set lives in App, so the guard survives tab switches
	 * where this component unmounts and remounts.
	 *
	 * @param {string}  key     Slug (or bulk key) to mark.
	 * @param {boolean} running Whether the request is in flight.
	 * @return {void}
	 */
	const setInFlight = ( key, running ) => {
		if ( inFlightTogglesRef && inFlightTogglesRef.current instanceof Set ) {
			if ( running ) {
				inFlightTogglesRef.current.add( key );
			} else {
				inFlightTogglesRef.current.delete( key );
			}
		}
		setIsToggling( ( prev ) => ( { ...prev, [ key ]: running } ) );
	};

	const hasAnyToggleInFlight = () =>
		Boolean(
			inFlightTogglesRef?.current instanceof Set &&
				inFlightTogglesRef.current.size > 0
		) || Object.values( isToggling ).some( Boolean );

	/**
	 * Whether one slug's toggle request is pending, checking the App-held
	 * set first so the guard survives a BlocksTab unmount and remount. A
	 * bulk toggle is busy for every slug: its success replaces the whole
	 * block list and its failure reverts every slug to its prior state.
	 *
	 * @param {string} slug Block slug to check.
	 * @return {boolean} True when that slug already has a request in flight.
	 */
	const isSlugInFlight = ( slug ) =>
		Boolean(
			( inFlightTogglesRef?.current instanceof Set &&
				( inFlightTogglesRef.current.has( slug ) ||
					inFlightTogglesRef.current.has( BULK_TOGGLE_KEY ) ) ) ||
				isToggling[ slug ] ||
				isToggling[ BULK_TOGGLE_KEY ]
		);

	const handleToggle = async ( slug, nextEnabled ) => {
		if ( isSlugInFlight( slug ) || isBulkUpdating ) {
			return;
		}

		setBlockEnabled( slug, nextEnabled );
		setInFlight( slug, true );

		try {
			let response = null;

			// One retry on a busy lock. The server already waits up to 3s on
			// GET_LOCK, so a 409 means the lock stayed busy for that whole
			// time; one more try after a short pause lets a concurrent
			// toggle for a different slug persist instead of dropping it
			// (issue #329). More than two overlapping toggles can still
			// fail, and that slug reverts with the busy message.
			for ( let attempt = 1; attempt <= TOGGLE_MAX_ATTEMPTS; attempt++ ) {
				try {
					response = await apiFetch( {
						path: '/gslider/v1/dashboard/toggle-block',
						method: 'POST',
						data: {
							slug,
							enabled: nextEnabled,
						},
					} );
					break;
				} catch ( attemptErr ) {
					const isLastAttempt = attempt === TOGGLE_MAX_ATTEMPTS;
					const isBusy =
						attemptErr &&
						TOGGLE_BUSY_ERROR_CODE === attemptErr.code;
					if ( ! isBusy || isLastAttempt ) {
						throw attemptErr;
					}
					await wait( TOGGLE_RETRY_DELAY_MS );
				}
			}

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
				// Throw without a message so the translated generic fallback
				// shows instead of a raw English server string.
				throw new Error();
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
			setInFlight( slug, false );
		}
	};

	const handleToggleAll = async ( nextEnabled ) => {
		if ( isBulkUpdating || hasAnyToggleInFlight() ) {
			return;
		}

		setInFlight( BULK_TOGGLE_KEY, true );

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
				// Throw without a message so the translated generic fallback
				// shows instead of a raw English server string.
				throw new Error();
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
			setInFlight( BULK_TOGGLE_KEY, false );
		}
	};

	const totalCount = blocks.length;

	// No server state yet: show a loading card while fetching, an error card
	// with retry when the load failed or finished with no blocks (so an
	// empty list never leaves a stuck loading card). Never default switches
	// to enabled.
	const hasServerState = Boolean(
		dashboardData?.blocks && dashboardData.blocks.length
	);
	const showLoadFailure = ( hasError || ! isLoading ) && ! hasServerState;

	// Derive the displayed enabled values from the server data during render
	// while no toggle is running. The post-commit sync effect alone would let
	// the first render after a dashboard load paint the local defaults
	// (enabled: true) for one frame before the effect corrects them. Mid
	//-toggle the derivation pauses: the optimistic values in both the local
	// state and the parent data are then newer than the server list.
	const toggleIdle =
		Object.values( isToggling ).every( ( v ) => ! v ) && ! isBulkUpdating;
	const displayedBlocks =
		toggleIdle && hasServerState
			? blocks.map( ( block ) => {
					const found = dashboardData.blocks.find(
						( b ) => b.slug === block.slug
					);
					return found
						? { ...block, enabled: Boolean( found.enabled ) }
						: block;
			  } )
			: blocks;
	const activeCount = displayedBlocks.filter( ( b ) => b.enabled ).length;

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
				{ displayedBlocks.map( ( block ) => (
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
										isSlugInFlight( block.slug ) ||
											isBulkUpdating
									) }
									onChange={ ( nextVal ) => {
										if ( isSlugInFlight( block.slug ) ) {
											return;
										}
										handleToggle( block.slug, nextVal );
									} }
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
