import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		blockId,
		backgroundVideoUrl,
		backgroundVideoPoster,
		backgroundVideoLoop,
		backgroundVideoMuted,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }`,
	} );

	return (
		<div { ...blockProps }>
			{ backgroundVideoUrl && (
				<video
					className="gslider-video-bg"
					src={ backgroundVideoUrl }
					poster={ backgroundVideoPoster || undefined }
					muted={ backgroundVideoMuted }
					loop={ backgroundVideoLoop }
					playsInline
					preload="metadata"
					aria-hidden="true"
				/>
			) }
			<div className="gslider-content-wrapper">
				<div className="gslider-content-inner-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
