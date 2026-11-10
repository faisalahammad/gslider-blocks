/**
 * Root Application component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Manages tab navigation state with bidirectional browser URL hash synchronization.
 *
 * @package
 * @since   1.2.0
 */

import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import Header from './components/Header';
import Navigation from './components/Navigation';
import OverviewTab from './tabs/OverviewTab';
import BlocksTab from './tabs/BlocksTab';

/**
 * Valid tab identifiers.
 */
const VALID_TABS = [ 'overview', 'blocks' ];
const DEFAULT_TAB = 'overview';

/**
 * Helper to parse the initial tab from the window URL hash.
 *
 * @return {string} Valid tab id.
 */
const getTabFromHash = () => {
	if ( typeof window === 'undefined' ) {
		return DEFAULT_TAB;
	}
	const hash = window.location.hash.replace( '#', '' ).toLowerCase();
	return VALID_TABS.includes( hash ) ? hash : DEFAULT_TAB;
};

/**
 * Main Dashboard Application component.
 *
 * @return {JSX.Element} The root dashboard element.
 */
const App = () => {
	const [ activeTab, setActiveTabState ] = useState( getTabFromHash );
	const [ dashboardData, setDashboardData ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ hasError, setHasError ] = useState( false );
	const isMountedRef = useRef( true );

	/**
	 * Slugs with a pending toggle request, held in App because it never
	 * unmounts. The per-slug guard must survive tab switches: BlocksTab
	 * unmounts on a tab change and would otherwise forget a toggle that is
	 * still in flight (issue #329, duplicate overlapping toggle).
	 */
	const inFlightTogglesRef = useRef( new Set() );

	useEffect( () => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, [] );

	/**
	 * Sets the active tab and synchronizes the browser URL hash.
	 */
	const setActiveTab = useCallback( ( tabId ) => {
		if ( VALID_TABS.includes( tabId ) ) {
			setActiveTabState( tabId );
			if ( window.location.hash !== `#${ tabId }` ) {
				window.location.hash = tabId;
			}
		}
	}, [] );

	/**
	 * Fetches dashboard metrics from the REST API endpoint.
	 */
	const fetchDashboardData = useCallback( async () => {
		setIsLoading( true );
		setHasError( false );

		try {
			const data = await apiFetch( { path: '/gslider/v1/dashboard' } );
			if ( ! isMountedRef.current ) {
				return;
			}
			if ( data && data.status === 'success' ) {
				setDashboardData( data );
			} else {
				setHasError( true );
			}
		} catch ( err ) {
			if ( isMountedRef.current ) {
				setHasError( true );
			}
		} finally {
			if ( isMountedRef.current ) {
				setIsLoading( false );
			}
		}
	}, [] );

	/**
	 * Fetch initial dashboard metrics on mount.
	 */
	useEffect( () => {
		fetchDashboardData();
	}, [ fetchDashboardData ] );

	/**
	 * Listens to hashchange events to support browser back/forward and bookmarking.
	 */
	useEffect( () => {
		const handleHashChange = () => {
			const newTab = getTabFromHash();
			setActiveTabState( newTab );
		};

		window.addEventListener( 'hashchange', handleHashChange );
		return () => {
			window.removeEventListener( 'hashchange', handleHashChange );
		};
	}, [] );

	const activeBlocksCount =
		dashboardData?.blocks && Array.isArray( dashboardData.blocks )
			? dashboardData.blocks.filter( ( b ) => b.enabled ).length
			: null;

	return (
		<div className="gslider-dashboard-wrap">
			<Header />
			<Navigation
				activeTab={ activeTab }
				setActiveTab={ setActiveTab }
				activeBlocksCount={ activeBlocksCount }
			/>
			<main className="gslider-dashboard-main">
				<div
					role="tabpanel"
					id={ `gslider-tabpanel-${ activeTab }` }
					aria-labelledby={ `gslider-tab-${ activeTab }` }
					className="gslider-dashboard-tabpanel"
					tabIndex={ 0 }
				>
					{ activeTab === 'overview' && (
						<OverviewTab
							setActiveTab={ setActiveTab }
							dashboardData={ dashboardData }
							isLoading={ isLoading }
							hasError={ hasError }
							onRetry={ fetchDashboardData }
						/>
					) }

					{ activeTab === 'blocks' && (
						<BlocksTab
							dashboardData={ dashboardData }
							setDashboardData={ setDashboardData }
							inFlightTogglesRef={ inFlightTogglesRef }
							isLoading={ isLoading }
							hasError={ hasError }
							onRetry={ fetchDashboardData }
						/>
					) }
				</div>
			</main>
		</div>
	);
};

export default App;
