import { z } from 'zod';
import { getBlockSchema, SUPPORTED_BLOCK_SLUGS } from '../core/registry.js';

export const getBlockSchemaInputZod = z.object( {
	blockSlug: z
		.enum( SUPPORTED_BLOCK_SLUGS )
		.describe(
			'Slug of the GSlider block to inspect (e.g. image-slider, testimonial, logo-carousel, flexi-content, flexi-content-item, post-carousel, base)'
		),
} );

export const getBlockSchemaToolDefinition = {
	name: 'gslider_get_block_schema',
	description:
		'Retrieves the complete attribute schema, real defaults, slide structure, and allowed options for a specific GSlider block.',
	inputSchema: {
		type: 'object',
		properties: {
			blockSlug: {
				type: 'string',
				enum: SUPPORTED_BLOCK_SLUGS,
				description:
					'Slug of the GSlider block (e.g. image-slider, testimonial, logo-carousel, flexi-content, flexi-content-item, post-carousel, base)',
			},
		},
		required: [ 'blockSlug' ],
	},
};

/**
 * Handles the gslider_get_block_schema MCP tool request.
 *
 * Returns raw schema payload directly without wrapper noise.
 * Returns { isError: true } on validation or lookup errors so callers receive clear diagnostics.
 * @param args
 */
export async function handleGetBlockSchema( args: unknown ) {
	const parsed = getBlockSchemaInputZod.safeParse( args );
	if ( ! parsed.success ) {
		const errorMsg = parsed.error.issues
			.map( ( e ) => `${ e.path.join( '.' ) }: ${ e.message }` )
			.join( ', ' );
		return {
			isError: true,
			content: [
				{
					type: 'text',
					text: `Invalid arguments for gslider_get_block_schema: ${ errorMsg }. Valid slugs are: ${ SUPPORTED_BLOCK_SLUGS.join(
						', '
					) }`,
				},
			],
		};
	}

	const { blockSlug } = parsed.data;
	try {
		const schema = getBlockSchema( blockSlug );
		return {
			content: [
				{
					type: 'text',
					text: JSON.stringify( schema, null, 2 ),
				},
			],
		};
	} catch ( error ) {
		return {
			isError: true,
			content: [
				{
					type: 'text',
					text:
						error instanceof Error
							? error.message
							: String( error ),
				},
			],
		};
	}
}
