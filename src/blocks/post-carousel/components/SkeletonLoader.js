/**
 * SkeletonLoader Component for Post Carousel.
 *
 * Renders an adaptive shimmer placeholder matching the geometry of the selected
 * layout mode (classic, horizontal, hero, newsroom, timeline).
 *
 * @param {Object} props                 Block skeleton properties.
 * @param {string} props.postLayoutMode  Active post layout mode archetype.
 * @param {number} props.columns         Number of columns to display in grid modes.
 * @param {number} props.gap             Gap between columns in pixels.
 * @param {number} [props.heroHeight]    Optional height for hero mode in pixels.
 * @param {number} [props.newsroomWidth] Optional main width percentage for newsroom mode.
 * @return {Element} Rendered layout-aware skeleton shimmer element.
 */
export default function SkeletonLoader( {
	postLayoutMode = 'classic',
	columns = 3,
	gap = 20,
	heroHeight = 420,
	newsroomWidth = 65,
} ) {
	const safeColumns = Math.max(
		1,
		Math.min( 6, Math.round( Number( columns ) || 3 ) )
	);
	const safeGap = typeof gap === 'number' ? gap : 20;

	// 1. Horizontal Split Layout Skeleton (Editorial Split)
	if ( postLayoutMode === 'horizontal' ) {
		const horizontalCols = Math.min( 2, safeColumns );
		return (
			<div
				className="gslider-post-carousel-loading-container"
				aria-hidden="true"
			>
				<div
					className="gslider-post-carousel-skeleton-wrapper is-skeleton-horizontal"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ horizontalCols }, 1fr)`,
						gap: `${ safeGap }px`,
					} }
				>
					{ Array.from( { length: horizontalCols } ).map(
						( _, idx ) => (
							<div
								key={ idx }
								className="gslider-post-carousel-skeleton-card is-horizontal-card"
							>
								<div className="gslider-skeleton-item gslider-skeleton-split-image"></div>
								<div className="gslider-skeleton-content">
									<div className="gslider-skeleton-item gslider-skeleton-category"></div>
									<div className="gslider-skeleton-item gslider-skeleton-title"></div>
									<div className="gslider-skeleton-item gslider-skeleton-text"></div>
									<div className="gslider-skeleton-item gslider-skeleton-text short"></div>
									<div className="gslider-skeleton-item gslider-skeleton-meta"></div>
								</div>
							</div>
						)
					) }
				</div>
			</div>
		);
	}

	// 2. Cinematic Hero Layout Skeleton (Full-Width Banner)
	if ( postLayoutMode === 'hero' ) {
		const heroBannerHeight = Math.max(
			280,
			Math.min( 800, Number( heroHeight ) || 420 )
		);
		return (
			<div
				className="gslider-post-carousel-loading-container"
				aria-hidden="true"
			>
				<div
					className="gslider-post-carousel-skeleton-wrapper is-skeleton-hero"
					style={ { height: `${ heroBannerHeight }px` } }
				>
					<div className="gslider-skeleton-hero-overlay">
						<div className="gslider-skeleton-item gslider-skeleton-category"></div>
						<div className="gslider-skeleton-item gslider-skeleton-hero-title"></div>
						<div className="gslider-skeleton-item gslider-skeleton-text short"></div>
						<div className="gslider-skeleton-hero-bottom">
							<div className="gslider-skeleton-item gslider-skeleton-meta"></div>
							<div className="gslider-skeleton-item gslider-skeleton-button"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// 3. Newsroom Stage Layout Skeleton (65% Main Hero + 35% Vertical Queue)
	if ( postLayoutMode === 'newsroom' ) {
		const mainPercent = Math.max(
			50,
			Math.min( 80, Number( newsroomWidth ) || 65 )
		);
		const queuePercent = 100 - mainPercent;
		return (
			<div
				className="gslider-post-carousel-loading-container"
				aria-hidden="true"
			>
				<div
					className="gslider-post-carousel-skeleton-wrapper is-skeleton-newsroom"
					style={ {
						display: 'grid',
						gridTemplateColumns: `${ mainPercent }% ${ queuePercent }%`,
						gap: `${ safeGap }px`,
					} }
				>
					{ /* Main featured story skeleton */ }
					<div className="gslider-post-carousel-skeleton-card is-newsroom-main-card">
						<div className="gslider-skeleton-item gslider-skeleton-newsroom-image"></div>
						<div className="gslider-skeleton-content">
							<div className="gslider-skeleton-item gslider-skeleton-category"></div>
							<div className="gslider-skeleton-item gslider-skeleton-title"></div>
							<div className="gslider-skeleton-item gslider-skeleton-text"></div>
							<div className="gslider-skeleton-item gslider-skeleton-meta"></div>
						</div>
					</div>

					{ /* Vertical headline queue playlist skeleton */ }
					<div className="gslider-skeleton-newsroom-queue">
						{ Array.from( { length: 4 } ).map( ( _, qIdx ) => (
							<div
								key={ qIdx }
								className="gslider-skeleton-newsroom-queue-item"
							>
								<div className="gslider-skeleton-item gslider-skeleton-queue-thumb"></div>
								<div className="gslider-skeleton-queue-content">
									<div className="gslider-skeleton-item gslider-skeleton-queue-title"></div>
									<div className="gslider-skeleton-item gslider-skeleton-queue-meta"></div>
								</div>
							</div>
						) ) }
					</div>
				</div>
			</div>
		);
	}

	// 4. Changelog Timeline Layout Skeleton (Horizontal Rail + Milestone Dots)
	if ( postLayoutMode === 'timeline' ) {
		const timelineCols = Math.min( 4, Math.max( 2, safeColumns ) );
		return (
			<div
				className="gslider-post-carousel-loading-container"
				aria-hidden="true"
			>
				<div className="gslider-post-carousel-skeleton-wrapper is-skeleton-timeline">
					<div className="gslider-skeleton-timeline-track">
						<div className="gslider-skeleton-timeline-rail"></div>
						<div
							className="gslider-skeleton-timeline-grid"
							style={ {
								display: 'grid',
								gridTemplateColumns: `repeat(${ timelineCols }, 1fr)`,
								gap: `${ safeGap }px`,
							} }
						>
							{ Array.from( { length: timelineCols } ).map(
								( _, tIdx ) => (
									<div
										key={ tIdx }
										className="gslider-skeleton-timeline-node"
									>
										<div className="gslider-skeleton-item gslider-skeleton-timeline-date"></div>
										<div className="gslider-skeleton-timeline-dot-wrapper">
											<div className="gslider-skeleton-timeline-stem"></div>
											<div className="gslider-skeleton-timeline-dot"></div>
										</div>
										<div className="gslider-post-carousel-skeleton-card is-timeline-card">
											<div className="gslider-skeleton-item gslider-skeleton-timeline-title"></div>
											<div className="gslider-skeleton-item gslider-skeleton-text"></div>
											<div className="gslider-skeleton-item gslider-skeleton-text short"></div>
										</div>
									</div>
								)
							) }
						</div>
					</div>
				</div>
			</div>
		);
	}

	// 5. Classic Card / Overlay / Minimal Layout Skeleton (Default)
	return (
		<div
			className="gslider-post-carousel-loading-container"
			aria-hidden="true"
		>
			<div
				className="gslider-post-carousel-skeleton-wrapper is-skeleton-classic"
				style={ {
					display: 'grid',
					gridTemplateColumns: `repeat(${ safeColumns }, 1fr)`,
					gap: `${ safeGap }px`,
				} }
			>
				{ Array.from( { length: safeColumns } ).map( ( _, idx ) => (
					<div
						key={ idx }
						className="gslider-post-carousel-skeleton-card"
					>
						<div className="gslider-skeleton-item gslider-skeleton-image"></div>
						<div className="gslider-skeleton-content">
							<div className="gslider-skeleton-item gslider-skeleton-category"></div>
							<div className="gslider-skeleton-item gslider-skeleton-title"></div>
							<div className="gslider-skeleton-item gslider-skeleton-text"></div>
							<div className="gslider-skeleton-item gslider-skeleton-text short"></div>
							<div className="gslider-skeleton-item gslider-skeleton-meta"></div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
