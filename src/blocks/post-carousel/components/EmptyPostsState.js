import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * EmptyPostsState Component for Post Carousel.
 *
 * Renders an actionable empty query state in the Gutenberg editor canvas with a
 * 1-click "Reset Query Filters" CTA when query parameters yield zero results.
 *
 * @param {Object}   props                  Component props.
 * @param {boolean}  props.hasActiveFilters Whether any query filters (categories, tags, authors, search, etc.) are active.
 * @param {Function} props.onResetFilters   Callback to clear query restrictions.
 * @return {Element} Rendered empty state element.
 */
export default function EmptyPostsState( {
	hasActiveFilters = false,
	onResetFilters,
} ) {
	return (
		<div className="gslider-empty-posts-state" role="status">
			<div className="gslider-empty-icon" aria-hidden="true">
				{ hasActiveFilters ? (
					<svg
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.75"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
						<circle cx="11.5" cy="14.5" r="2.5" />
						<path d="m13.5 16.5 2.5 2.5" />
					</svg>
				) : (
					<svg
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.75"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
						<polyline points="14 2 14 8 20 8" />
						<line x1="12" y1="18" x2="12" y2="12" />
						<line x1="9" y1="15" x2="15" y2="15" />
					</svg>
				) }
			</div>

			<h4 className="gslider-empty-title">
				{ hasActiveFilters
					? __(
							'No Posts Found Matching Your Criteria',
							'gslider-blocks'
					  )
					: __( 'No Posts Published Yet', 'gslider-blocks' ) }
			</h4>

			<p className="gslider-empty-description">
				{ hasActiveFilters
					? __(
							'Try loosening taxonomy, author, date, or keyword filters to display posts.',
							'gslider-blocks'
					  )
					: __(
							'Publish some posts or items in WordPress to display them in this carousel.',
							'gslider-blocks'
					  ) }
			</p>

			{ hasActiveFilters && typeof onResetFilters === 'function' && (
				<Button
					variant="primary"
					className="gslider-empty-reset-button"
					onClick={ onResetFilters }
				>
					{ __( 'Reset Query Filters', 'gslider-blocks' ) }
				</Button>
			) }
		</div>
	);
}
