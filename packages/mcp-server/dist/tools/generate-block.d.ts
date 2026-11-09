import { z } from 'zod';
export declare const GENERATABLE_SLUGS: readonly ['base', 'testimonial', 'image-slider', 'logo-carousel', 'flexi-content'];
export type GeneratableSlug = (typeof GENERATABLE_SLUGS)[number];
export declare const generateBlockInputZod: z.ZodObject<{
    blockSlug: z.ZodEnum<{
        base: "base";
        "flexi-content": "flexi-content";
        "image-slider": "image-slider";
        "logo-carousel": "logo-carousel";
        testimonial: "testimonial";
    }>;
    slides: z.ZodArray<z.ZodObject<{
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
            type: z.ZodEnum<{
                button: "button";
                heading: "heading";
                image: "image";
                paragraph: "paragraph";
            }>;
            text: z.ZodOptional<z.ZodString>;
            level: z.ZodOptional<z.ZodNumber>;
            url: z.ZodOptional<z.ZodString>;
            alt: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    layout: z.ZodOptional<z.ZodObject<{
        mode: z.ZodOptional<z.ZodEnum<{
            carousel: "carousel";
            slider: "slider";
        }>>;
        effect: z.ZodOptional<z.ZodString>;
        columns: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodNumber>;
            Tablet: z.ZodOptional<z.ZodNumber>;
            Mobile: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>]>>;
        gap: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodNumber>;
            Tablet: z.ZodOptional<z.ZodNumber>;
            Mobile: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>]>>;
        speed: z.ZodOptional<z.ZodNumber>;
        autoplay: z.ZodOptional<z.ZodBoolean>;
        autoplayDelay: z.ZodOptional<z.ZodNumber>;
        loop: z.ZodOptional<z.ZodBoolean>;
        pauseOnHover: z.ZodOptional<z.ZodBoolean>;
        navigation: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodBoolean>;
            Tablet: z.ZodOptional<z.ZodBoolean>;
            Mobile: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>]>>;
        pagination: z.ZodOptional<z.ZodUnion<readonly [z.ZodBoolean, z.ZodObject<{
            Desktop: z.ZodOptional<z.ZodBoolean>;
            Tablet: z.ZodOptional<z.ZodBoolean>;
            Mobile: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>]>>;
        paginationType: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strict>;
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
                enum: readonly ["base", "testimonial", "image-slider", "logo-carousel", "flexi-content"];
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
        type: 'text';
        text: string;
    }[];
} | {
    content: {
        type: 'text';
        text: string;
    }[];
}>;
//# sourceMappingURL=generate-block.d.ts.map