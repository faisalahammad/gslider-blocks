/**
 * Navigation tabs component for GSlider Blocks React Admin Dashboard.
 *
 * Provides floating pill tabs with keyboard accessibility and ARIA semantics.
 *
 * @since 1.2.0
 */

import { useRef } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { OverviewTabIcon, BlocksTabIcon } from '../icons';

/**
 * Returns the tab items definition with modular icon components.
 *
 * Evaluated lazily at render time so the `__()` label lookups run after
 * WordPress has injected the script translations locale data.
 *
 * @return {Array} Tab items.
 */
const getTabs = () => [
	{
		id: 'overview',
		label: __( 'Overview', 'gslider-blocks' ),
		icon: <OverviewTabIcon />,
	},
	{
		id: 'blocks',
		label: __( 'Blocks', 'gslider-blocks' ),
		hasBadge: true,
		icon: <BlocksTabIcon />,
	},
];

/**
 * Navigation Component.
 *
 * @param {Object}      props                          Component properties.
 * @param {string}      props.activeTab                Current active tab identifier.
 * @param {Function}    props.setActiveTab             Function to update the active tab.
 * @param {number|null} [props.activeBlocksCount=null] Total count of active blocks for badge.
 * @return {JSX.Element} Navigation tablist.
 */
const Navigation = ( {
	activeTab,
	setActiveTab,
	activeBlocksCount = null,
} ) => {
	const tabRefs = useRef( {} );
	const tabs = getTabs();

	/**
	 * Handles arrow key navigation across tabs.
	 *
	 * @param {KeyboardEvent} event Keyboard event.
	 * @param {number}        index Current tab index.
	 */
	const handleKeyDown = ( event, index ) => {
		const count = tabs.length;
		let nextIndex = null;

		switch ( event.key ) {
			case 'ArrowRight':
				nextIndex = ( index + 1 ) % count;
				break;
			case 'ArrowLeft':
				nextIndex = ( index - 1 + count ) % count;
				break;
			case 'Home':
				nextIndex = 0;
				break;
			case 'End':
				nextIndex = count - 1;
				break;
			default:
				return;
		}

		event.preventDefault();
		const nextTab = tabs[ nextIndex ];
		if ( nextTab ) {
			setActiveTab( nextTab.id );
			if ( tabRefs.current[ nextTab.id ] ) {
				tabRefs.current[ nextTab.id ].focus();
			}
		}
	};

	return (
		<nav
			className="gslider-dashboard-nav"
			aria-label={ __( 'Dashboard Navigation', 'gslider-blocks' ) }
		>
			<div
				className="gslider-dashboard-tabs"
				role="tablist"
				aria-orientation="horizontal"
			>
				{ tabs.map( ( tab, index ) => {
					const isActive = activeTab === tab.id;
					const badgeCount =
						tab.hasBadge && typeof activeBlocksCount === 'number'
							? activeBlocksCount
							: null;

					return (
						<button
							key={ tab.id }
							ref={ ( el ) => {
								tabRefs.current[ tab.id ] = el;
							} }
							role="tab"
							id={ `gslider-tab-${ tab.id }` }
							aria-selected={ isActive }
							aria-controls={
								isActive
									? `gslider-tabpanel-${ tab.id }`
									: undefined
							}
							tabIndex={ isActive ? 0 : -1 }
							className={ `gslider-dashboard-tab ${
								isActive ? 'is-active' : ''
							}` }
							onClick={ () => setActiveTab( tab.id ) }
							onKeyDown={ ( e ) => handleKeyDown( e, index ) }
							type="button"
						>
							<span className="gslider-dashboard-tab-icon">
								{ tab.icon }
							</span>
							<span className="gslider-dashboard-tab-label">
								{ tab.label }
							</span>
							{ badgeCount !== null && (
								<>
									<span
										className="gslider-dashboard-tab-badge"
										aria-hidden="true"
									>
										{ badgeCount }
									</span>
									<span className="screen-reader-text">
										{ sprintf(
											/* translators: %d: number of active blocks */
											_n(
												'%d active block',
												'%d active blocks',
												badgeCount,
												'gslider-blocks'
											),
											badgeCount
										) }
									</span>
								</>
							) }
						</button>
					);
				} ) }
			</div>
		</nav>
	);
};

export default Navigation;
