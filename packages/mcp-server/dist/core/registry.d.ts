export interface BlockSummary {
    slug: string;
    name: string;
    title: string;
    description: string;
    category: string;
    isDynamic?: boolean;
    slideField: string;
    totalAttributes: number;
    presets: string[];
    allowedEffects: {
        carouselEffect?: string[];
        slideEffect?: string[];
        sliderType?: string[];
    };
}
export interface BlockDetail extends BlockSummary {
    slideItemSchema: Record<string, unknown>;
    allowedValues?: Record<string, string[]>;
    attributes: Record<string, {
        type: string;
        default?: unknown;
        items?: Record<string, unknown>;
        properties?: Record<string, unknown>;
    }>;
}
export declare const SUPPORTED_BLOCK_SLUGS: readonly ["image-slider", "testimonial", "logo-carousel", "flexi-content", "flexi-content-item", "post-carousel", "base"];
export type SupportedBlockSlug = (typeof SUPPORTED_BLOCK_SLUGS)[number];
/**
 * The `blockPrefix` each block's `edit.js` passes to `useBlockIdGenerator`.
 * A block id is the prefix plus 8 characters, for example `gslider-1a2b3c4d`.
 * Shared by the templates and the block generator so the two never diverge.
 */
export declare const BLOCK_ID_PREFIX: Record<SupportedBlockSlug, string>;
/**
 * Returns a summary list of all registered GSlider blocks.
 */
export declare function listBlocks(): BlockSummary[];
/**
 * Returns the comprehensive schema, real defaults, and full attribute dictionary
 * for a specific block slug loaded directly from its dedicated schema file.
 * @param slug
 */
export declare function getBlockSchema(slug: string): BlockDetail;
/**
 * Checks whether a given slug is a valid GSlider block.
 * @param slug
 */
export declare function isValidBlockSlug(slug: string): boolean;
//# sourceMappingURL=registry.d.ts.map