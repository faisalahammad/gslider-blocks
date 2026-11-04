import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { blockId, slideHash } = attributes;

	// Only output the attribute when set, so markup of existing blocks stays the same
	const blockProps = useBlockProps.save( {
		className: `flexi-content-item swiper-slide ${ blockId }`,
		...( slideHash && { 'data-hash': slideHash } ),
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
