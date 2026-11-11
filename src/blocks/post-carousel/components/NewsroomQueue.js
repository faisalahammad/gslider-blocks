/* eslint-disable import/no-unresolved */
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	getFeaturedImageUrl,
	getFormattedDate,
	decodeHtmlEntities,
	calculateReadingTime,
} from '@Utils/postHelpers';

/**
 * Calculates estimated reading time for a post in minutes.
 *
 * @param {Object} post Post object from WordPress REST API.
 * @return {string} Formatted localized reading time or date string.
 */
const getReadingTime = ( post ) => {
	const rawContent = post?.content?.rendered || '';
	if ( ! rawContent ) {
		return getFormattedDate( post ) || '';
	}

	const minutes = calculateReadingTime( rawContent );

	return sprintf(
		/* translators: %d: Estimated reading time in minutes. */
		_n( '%d min read', '%d min read', minutes, 'gslider-blocks' ),
		minutes
	);
};

/**
 * Post Carousel Newsroom Stage — Synchronized Headline Queue Component.
 *
 * Renders the story playlist aside track in Gutenberg editor and
 * coordinates with Swiper Thumbs.
 *
 * @param {Object}   props                 Component props.
 * @param {Array}    props.posts           Queried post items.
 * @param {Object}   props.queueRef        React ref for the queue Swiper container.
 * @param {Function} props.onSelectIndex   Click callback to navigate the main slider.
 * @param {number}   props.activeIndex     Active slide index.
 * @param {boolean}  props.showReadingTime Whether reading time is enabled.
 * @return {JSX.Element} Rendered aside element.
 */
export default function NewsroomQueue( {
	posts,
	queueRef,
	onSelectIndex,
	activeIndex = 0,
	showReadingTime = true,
} ) {
	if ( ! posts || posts.length === 0 ) {
		return null;
	}

	return (
		<aside
			className="gslider-newsroom-queue swiper"
			ref={ queueRef }
			aria-label={ __( 'Story Playlist', 'gslider-blocks' ) }
		>
			<div className="swiper-wrapper">
				{ posts.map( ( post, index ) => {
					const title =
						decodeHtmlEntities( post?.title?.rendered ) ||
						__( '(Untitled)', 'gslider-blocks' );
					const thumbUrl = getFeaturedImageUrl( post );
					const meta = showReadingTime
						? getReadingTime( post )
						: getFormattedDate( post ) || '';
					const isActive = activeIndex === index;

					return (
						<div
							key={ `queue-${ post.id }` }
							className={ `swiper-slide gslider-newsroom-queue-item${
								isActive ? ' swiper-slide-thumb-active' : ''
							}` }
							role="button"
							tabIndex={ 0 }
							onClick={ () => onSelectIndex?.( index ) }
							onKeyDown={ ( e ) => {
								if ( e.key === 'Enter' || e.key === ' ' ) {
									e.preventDefault();
									onSelectIndex?.( index );
								}
							} }
						>
							<div
								className="gslider-queue-active-indicator"
								aria-hidden="true"
							/>
							<div className="gslider-queue-thumb">
								{ thumbUrl ? (
									<img
										src={ thumbUrl }
										alt={ title }
										loading="lazy"
									/>
								) : (
									<svg
										className="gslider-queue-placeholder-svg"
										viewBox="0 0 64 48"
										width="64"
										height="48"
										aria-hidden="true"
										focusable="false"
									>
										<rect
											width="64"
											height="48"
											fill="#e2e8f0"
										/>
										<circle
											cx="32"
											cy="24"
											r="8"
											fill="#94a3b8"
										/>
									</svg>
								) }
							</div>
							<div className="gslider-queue-content">
								<h4 className="gslider-queue-title">
									{ title }
								</h4>
								{ meta && (
									<span className="gslider-queue-meta">
										{ meta }
									</span>
								) }
							</div>
						</div>
					);
				} ) }
			</div>
		</aside>
	);
}
