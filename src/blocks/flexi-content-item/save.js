import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { blockId, isSlideHidden } = attributes;

	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }${
			isSlideHidden ? ' is-slide-hidden' : ''
		}`,
	} );

	return (
		<div { ...blockProps }>
			<div className="gslider-content-wrapper">
				<div className="gslider-content-inner-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
