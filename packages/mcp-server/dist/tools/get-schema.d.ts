import { z } from 'zod';
export declare const getBlockSchemaInputZod: z.ZodObject<{
    blockSlug: z.ZodEnum<["image-slider", "testimonial", "logo-carousel", "flexi-content", "flexi-content-item", "post-carousel", "base"]>;
}, "strip", z.ZodTypeAny, {
    blockSlug: "image-slider" | "testimonial" | "logo-carousel" | "flexi-content" | "flexi-content-item" | "post-carousel" | "base";
}, {
    blockSlug: "image-slider" | "testimonial" | "logo-carousel" | "flexi-content" | "flexi-content-item" | "post-carousel" | "base";
}>;
export declare const getBlockSchemaToolDefinition: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            blockSlug: {
                type: string;
                enum: readonly ["image-slider", "testimonial", "logo-carousel", "flexi-content", "flexi-content-item", "post-carousel", "base"];
                description: string;
            };
        };
        required: string[];
    };
};
/**
 * Handles the gslider_get_block_schema MCP tool request.
 *
 * Returns raw schema payload directly without wrapper noise.
 * Returns { isError: true } on validation or lookup errors so callers receive clear diagnostics.
 * @param args
 */
export declare function handleGetBlockSchema(args: unknown): Promise<{
    isError: boolean;
    content: {
        type: string;
        text: string;
    }[];
} | {
    content: {
        type: string;
        text: string;
    }[];
    isError?: undefined;
}>;
//# sourceMappingURL=get-schema.d.ts.map