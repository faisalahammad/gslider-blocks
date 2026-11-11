export declare const validateBlockToolDefinition: {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            markup: {
                type: string;
                description: string;
            };
            blockSlug: {
                type: string;
                enum: readonly ["base", "testimonial", "image-slider", "logo-carousel", "flexi-content", "post-carousel"];
                description: string;
            };
            attributes: {
                type: string;
                description: string;
            };
        };
    };
};
export declare function handleValidateBlock(args: unknown): Promise<{
    isError: boolean;
    content: {
        type: "text";
        text: string;
    }[];
}>;
//# sourceMappingURL=validate-block.d.ts.map