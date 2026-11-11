import fs from 'fs';
export const SUPPORTED_BLOCK_SLUGS = [
    'image-slider',
    'testimonial',
    'logo-carousel',
    'flexi-content',
    'flexi-content-item',
    'post-carousel',
    'base',
];
/**
 * The `blockPrefix` each block's `edit.js` passes to `useBlockIdGenerator`.
 * A block id is the prefix plus 8 characters, for example `gslider-1a2b3c4d`.
 * Shared by the templates and the block generator so the two never diverge.
 */
export const BLOCK_ID_PREFIX = {
    base: 'gslider',
    testimonial: 'gslider',
    'image-slider': 'gslider-image-slider',
    'logo-carousel': 'gslider-logo-carousel',
    'flexi-content': 'gslider-flexi-content',
    'flexi-content-item': 'gslider-flexi-content-item',
    'post-carousel': 'gslider-post-carousel',
};
function loadBlockSchema(slug) {
    const url = new URL(`./schemas/${slug}.json`, import.meta.url);
    if (!fs.existsSync(url)) {
        const validSlugs = SUPPORTED_BLOCK_SLUGS.join(', ');
        throw new Error(`Unknown block slug: "${slug}". Valid block slugs are: ${validSlugs}`);
    }
    return JSON.parse(fs.readFileSync(url, 'utf8'));
}
/**
 * Returns a summary list of all registered GSlider blocks.
 */
export function listBlocks() {
    return SUPPORTED_BLOCK_SLUGS.map((slug) => {
        const block = loadBlockSchema(slug);
        return {
            slug: block.slug,
            name: block.name,
            title: block.title,
            description: block.description,
            category: block.category,
            ...(block.isDynamic ? { isDynamic: true } : {}),
            slideField: block.slideField,
            totalAttributes: block.totalAttributes,
            presets: block.presets,
            allowedEffects: block.allowedEffects,
        };
    });
}
/**
 * Returns the comprehensive schema, real defaults, and full attribute dictionary
 * for a specific block slug loaded directly from its dedicated schema file.
 * @param slug
 */
export function getBlockSchema(slug) {
    return loadBlockSchema(slug);
}
/**
 * Checks whether a given slug is a valid GSlider block.
 * @param slug
 */
export function isValidBlockSlug(slug) {
    return SUPPORTED_BLOCK_SLUGS.includes(slug);
}
//# sourceMappingURL=registry.js.map