import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { blockId, embedVideoType, embedVideoId, embedVideoMediaUrl } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }`,
	} );

	return (
		<div { ...blockProps }>
			{ /* preload none, the file loads only after the visitor presses play */ }
			{ embedVideoType === 'upload' && embedVideoMediaUrl && (
				<div
					className="gslider-embed-video"
					data-embed-type={ embedVideoType }
				>
					<video
						src={ embedVideoMediaUrl }
						controls
						playsInline
						preload="none"
					/>
				</div>
			) }
			{ /* Facade only, view.js loads the player iframe on play click */ }
			{ embedVideoType !== 'upload' && embedVideoId && (
				<div
					className="gslider-embed-video"
					data-embed-type={ embedVideoType }
					data-embed-id={ embedVideoId }
				>
					<button
						type="button"
						className="gslider-embed-video-play"
						aria-label="Play video"
					></button>
				</div>
			) }
			<div className="gslider-content-wrapper">
				<div className="gslider-content-inner-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
