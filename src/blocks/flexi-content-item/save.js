import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { blockId } = attributes;

	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }`,
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
