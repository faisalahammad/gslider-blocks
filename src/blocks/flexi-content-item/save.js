import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { blockId, slideHash, embedVideoType, embedVideoId } = attributes;

	// Only output the attribute when set, so markup of existing blocks stays the same
	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }`,
		...( slideHash && { 'data-hash': slideHash } ),
	} );

	return (
		<div { ...blockProps }>
			{ /* Facade only, view.js loads the player iframe on play click */ }
			{ embedVideoId && (
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
