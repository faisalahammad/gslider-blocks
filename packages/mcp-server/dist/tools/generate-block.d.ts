import { z } from 'zod';
export declare const GENERATABLE_SLUGS: readonly ["base", "testimonial", "image-slider", "logo-carousel", "flexi-content", "post-carousel"];
export type GeneratableSlug = (typeof GENERATABLE_SLUGS)[number];
export declare const generateBlockInputZod: z.ZodEffects<z.ZodObject<{
    blockSlug: z.ZodEnum<["base", "testimonial", "image-slider", "logo-carousel", "flexi-content", "post-carousel"]>;
    slides: z.ZodOptional<z.ZodArray<z.ZodObject<{
        subTitle: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        buttonText: z.ZodOptional<z.ZodString>;
        buttonUrl: z.ZodOptional<z.ZodString>;
        secondaryButtonText: z.ZodOptional<z.ZodString>;
        secondaryButtonUrl: z.ZodOptional<z.ZodString>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        backgroundImageUrl: z.ZodOptional<z.ZodString>;
        testimonialTitle: z.ZodOptional<z.ZodString>;
        testimonialText: z.ZodOptional<z.ZodString>;
        authorName: z.ZodOptional<z.ZodString>;
        authorDesignation: z.ZodOptional<z.ZodString>;
        authorImageUrl: z.ZodOptional<z.ZodString>;
        authorImageAlt: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodNumber>;
        url: z.ZodOptional<z.ZodString>;
        alt: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
        tooltipText: z.ZodOptional<z.ZodString>;
        blocks: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["paragraph", "heading", "image", "button"]>;
            text: z.ZodOptional<z.ZodString>;
            level: z.ZodOptional<z.ZodNumber>;
            url: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }, {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        link?: string | undefined;
        title?: string | undefined;
        subTitle?: string | undefined;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonUrl?: string | undefined;
        secondaryButtonText?: string | undefined;
        secondaryButtonUrl?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImageUrl?: string | undefined;
        testimonialTitle?: string | undefined;
        testimonialText?: string | undefined;
        authorName?: string | undefined;
        authorDesignation?: string | undefined;
        authorImageUrl?: string | undefined;
        authorImageAlt?: string | undefined;
        rating?: number | undefined;
        url?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        tooltipText?: string | undefined;
        blocks?: {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }[] | undefined;
    }, {
        link?: string | undefined;
        title?: string | undefined;
        subTitle?: string | undefined;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonUrl?: string | undefined;
        secondaryButtonText?: string | undefined;
        secondaryButtonUrl?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImageUrl?: string | undefined;
        testimonialTitle?: string | undefined;
        testimonialText?: string | undefined;
        authorName?: string | undefined;
        authorDesignation?: string | undefined;
        authorImageUrl?: string | undefined;
        authorImageAlt?: string | undefined;
        rating?: number | undefined;
        url?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        tooltipText?: string | undefined;
        blocks?: {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }[] | undefined;
    }>, "many">>;
    layout: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodEnum<["slider", "carousel"]>>;
        effect: z.ZodOptional<z.ZodString>;
        columns: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodNumber>;
            Tablet: z.ZodOptional<z.ZodNumber>;
            Mobile: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        }, {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        }>]>>;
        gap: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodNumber>;
            Tablet: z.ZodOptional<z.ZodNumber>;
            Mobile: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        }, {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        }>]>>;
        speed: z.ZodOptional<z.ZodNumber>;
        autoplay: z.ZodOptional<z.ZodBoolean>;
        autoplayDelay: z.ZodOptional<z.ZodNumber>;
        loop: z.ZodOptional<z.ZodBoolean>;
        pauseOnHover: z.ZodOptional<z.ZodBoolean>;
        navigation: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodBoolean>;
            Tablet: z.ZodOptional<z.ZodBoolean>;
            Mobile: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        }, {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        }>]>>;
        pagination: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodBoolean>;
            Tablet: z.ZodOptional<z.ZodBoolean>;
            Mobile: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        }, {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        }>]>>;
        paginationType: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        mode?: "slider" | "carousel" | undefined;
        effect?: string | undefined;
        columns?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        gap?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        speed?: number | undefined;
        autoplay?: boolean | undefined;
        autoplayDelay?: number | undefined;
        loop?: boolean | undefined;
        pauseOnHover?: boolean | undefined;
        navigation?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        pagination?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        paginationType?: string | undefined;
    }, {
        mode?: "slider" | "carousel" | undefined;
        effect?: string | undefined;
        columns?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        gap?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        speed?: number | undefined;
        autoplay?: boolean | undefined;
        autoplayDelay?: number | undefined;
        loop?: boolean | undefined;
        pauseOnHover?: boolean | undefined;
        navigation?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        pagination?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        paginationType?: string | undefined;
    }>>;
    attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strict", z.ZodTypeAny, {
    blockSlug: "image-slider" | "testimonial" | "logo-carousel" | "flexi-content" | "post-carousel" | "base";
    attributes?: Record<string, unknown> | undefined;
    slides?: {
        link?: string | undefined;
        title?: string | undefined;
        subTitle?: string | undefined;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonUrl?: string | undefined;
        secondaryButtonText?: string | undefined;
        secondaryButtonUrl?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImageUrl?: string | undefined;
        testimonialTitle?: string | undefined;
        testimonialText?: string | undefined;
        authorName?: string | undefined;
        authorDesignation?: string | undefined;
        authorImageUrl?: string | undefined;
        authorImageAlt?: string | undefined;
        rating?: number | undefined;
        url?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        tooltipText?: string | undefined;
        blocks?: {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }[] | undefined;
    }[] | undefined;
    layout?: {
        mode?: "slider" | "carousel" | undefined;
        effect?: string | undefined;
        columns?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        gap?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        speed?: number | undefined;
        autoplay?: boolean | undefined;
        autoplayDelay?: number | undefined;
        loop?: boolean | undefined;
        pauseOnHover?: boolean | undefined;
        navigation?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        pagination?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        paginationType?: string | undefined;
    } | undefined;
}, {
    blockSlug: "image-slider" | "testimonial" | "logo-carousel" | "flexi-content" | "post-carousel" | "base";
    attributes?: Record<string, unknown> | undefined;
    slides?: {
        link?: string | undefined;
        title?: string | undefined;
        subTitle?: string | undefined;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonUrl?: string | undefined;
        secondaryButtonText?: string | undefined;
        secondaryButtonUrl?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImageUrl?: string | undefined;
        testimonialTitle?: string | undefined;
        testimonialText?: string | undefined;
        authorName?: string | undefined;
        authorDesignation?: string | undefined;
        authorImageUrl?: string | undefined;
        authorImageAlt?: string | undefined;
        rating?: number | undefined;
        url?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        tooltipText?: string | undefined;
        blocks?: {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }[] | undefined;
    }[] | undefined;
    layout?: {
        mode?: "slider" | "carousel" | undefined;
        effect?: string | undefined;
        columns?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        gap?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        speed?: number | undefined;
        autoplay?: boolean | undefined;
        autoplayDelay?: number | undefined;
        loop?: boolean | undefined;
        pauseOnHover?: boolean | undefined;
        navigation?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        pagination?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        paginationType?: string | undefined;
    } | undefined;
}>, {
    blockSlug: "image-slider" | "testimonial" | "logo-carousel" | "flexi-content" | "post-carousel" | "base";
    attributes?: Record<string, unknown> | undefined;
    slides?: {
        link?: string | undefined;
        title?: string | undefined;
        subTitle?: string | undefined;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonUrl?: string | undefined;
        secondaryButtonText?: string | undefined;
        secondaryButtonUrl?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImageUrl?: string | undefined;
        testimonialTitle?: string | undefined;
        testimonialText?: string | undefined;
        authorName?: string | undefined;
        authorDesignation?: string | undefined;
        authorImageUrl?: string | undefined;
        authorImageAlt?: string | undefined;
        rating?: number | undefined;
        url?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        tooltipText?: string | undefined;
        blocks?: {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }[] | undefined;
    }[] | undefined;
    layout?: {
        mode?: "slider" | "carousel" | undefined;
        effect?: string | undefined;
        columns?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        gap?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        speed?: number | undefined;
        autoplay?: boolean | undefined;
        autoplayDelay?: number | undefined;
        loop?: boolean | undefined;
        pauseOnHover?: boolean | undefined;
        navigation?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        pagination?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        paginationType?: string | undefined;
    } | undefined;
}, {
    blockSlug: "image-slider" | "testimonial" | "logo-carousel" | "flexi-content" | "post-carousel" | "base";
    attributes?: Record<string, unknown> | undefined;
    slides?: {
        link?: string | undefined;
        title?: string | undefined;
        subTitle?: string | undefined;
        description?: string | undefined;
        buttonText?: string | undefined;
        buttonUrl?: string | undefined;
        secondaryButtonText?: string | undefined;
        secondaryButtonUrl?: string | undefined;
        backgroundColor?: string | undefined;
        backgroundImageUrl?: string | undefined;
        testimonialTitle?: string | undefined;
        testimonialText?: string | undefined;
        authorName?: string | undefined;
        authorDesignation?: string | undefined;
        authorImageUrl?: string | undefined;
        authorImageAlt?: string | undefined;
        rating?: number | undefined;
        url?: string | undefined;
        alt?: string | undefined;
        caption?: string | undefined;
        tooltipText?: string | undefined;
        blocks?: {
            type: "paragraph" | "heading" | "image" | "button";
            text?: string | undefined;
            url?: string | undefined;
            alt?: string | undefined;
            level?: number | undefined;
        }[] | undefined;
    }[] | undefined;
    layout?: {
        mode?: "slider" | "carousel" | undefined;
        effect?: string | undefined;
        columns?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        gap?: number | {
            Desktop?: number | undefined;
            Tablet?: number | undefined;
            Mobile?: number | undefined;
        } | undefined;
        speed?: number | undefined;
        autoplay?: boolean | undefined;
        autoplayDelay?: number | undefined;
        loop?: boolean | undefined;
        pauseOnHover?: boolean | undefined;
        navigation?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        pagination?: boolean | {
            Desktop?: boolean | undefined;
            Tablet?: boolean | undefined;
            Mobile?: boolean | undefined;
        } | undefined;
        paginationType?: string | undefined;
    } | undefined;
}>;
export declare class GeneratorInputError extends Error {
}
export declare const generateBlockToolDefinition: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            blockSlug: {
                type: string;
                enum: readonly ["base", "testimonial", "image-slider", "logo-carousel", "flexi-content", "post-carousel"];
                description: string;
            };
            slides: {
                type: string;
                minItems: number;
                description: string;
                items: {
                    type: string;
                };
            };
            layout: {
                type: string;
                description: string;
            };
            attributes: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare function handleGenerateBlock(args: unknown): Promise<{
    isError: boolean;
    content: {
        type: "text";
        text: string;
    }[];
} | {
    content: {
        type: "text";
        text: string;
    }[];
}>;
//# sourceMappingURL=generate-block.d.ts.map