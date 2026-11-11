import { randomBytes } from 'crypto';
import { z } from 'zod';
import { BLOCK_ID_PREFIX } from '../core/registry.js';
import { attributeDefaults, loadBundledBlock, prepareBlock, registerCoreBlocksOnce, validationOf, } from '../core/block-runtime.js';
import { commentAttributes } from '../core/markup.js';
export const GENERATABLE_SLUGS = [
    'base',
    'testimonial',
    'image-slider',
    'logo-carousel',
    'flexi-content',
    'post-carousel',
];
const SLIDE_FIELDS = {
    base: [
        'subTitle',
        'title',
        'description',
        'buttonText',
        'buttonUrl',
        'secondaryButtonText',
        'secondaryButtonUrl',
        'backgroundColor',
        'backgroundImageUrl',
    ],
    testimonial: [
        'testimonialTitle',
        'testimonialText',
        'authorName',
        'authorDesignation',
        'authorImageUrl',
        'authorImageAlt',
        'rating',
    ],
    'image-slider': ['url', 'alt', 'link', 'caption', 'tooltipText'],
    'logo-carousel': ['url', 'alt', 'link', 'caption', 'tooltipText'],
    'flexi-content': ['blocks'],
    'post-carousel': [],
};
const RESERVED_ATTRIBUTES = ['blockId', 'blockStyle', 'deviceType'];
const deviceNumber = z.union([
    z.number(),
    z
        .object({
        Desktop: z.number().optional(),
        Tablet: z.number().optional(),
        Mobile: z.number().optional(),
    })
        .strict(),
]);
const deviceBoolean = z.union([
    z.boolean(),
    z
        .object({
        Desktop: z.boolean().optional(),
        Tablet: z.boolean().optional(),
        Mobile: z.boolean().optional(),
    })
        .strict(),
]);
const slideSchema = z
    .object({
    subTitle: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    buttonText: z.string().optional(),
    buttonUrl: z.string().optional(),
    secondaryButtonText: z.string().optional(),
    secondaryButtonUrl: z.string().optional(),
    backgroundColor: z.string().optional(),
    backgroundImageUrl: z.string().optional(),
    testimonialTitle: z.string().optional(),
    testimonialText: z.string().optional(),
    authorName: z.string().optional(),
    authorDesignation: z.string().optional(),
    authorImageUrl: z.string().optional(),
    authorImageAlt: z.string().optional(),
    rating: z.number().int().min(0).max(5).optional(),
    url: z.string().optional(),
    alt: z.string().optional(),
    link: z.string().optional(),
    caption: z.string().optional(),
    tooltipText: z.string().optional(),
    blocks: z
        .array(z
        .object({
        type: z.enum([
            'paragraph',
            'heading',
            'image',
            'button',
        ]),
        text: z.string().optional(),
        level: z.number().int().min(1).max(6).optional(),
        url: z.string().optional(),
        alt: z.string().optional(),
    })
        .strict())
        .min(1)
        .optional(),
})
    .strict();
export const generateBlockInputZod = z
    .object({
    blockSlug: z.enum(GENERATABLE_SLUGS),
    slides: z.array(slideSchema).optional(),
    layout: z
        .object({
        mode: z.enum(['slider', 'carousel']).optional(),
        effect: z.string().optional(),
        columns: deviceNumber.optional(),
        gap: deviceNumber.optional(),
        speed: z.number().optional(),
        autoplay: z.boolean().optional(),
        autoplayDelay: z.number().optional(),
        loop: z.boolean().optional(),
        pauseOnHover: z.boolean().optional(),
        navigation: deviceBoolean.optional(),
        pagination: deviceBoolean.optional(),
        paginationType: z.string().optional(),
    })
        .strict()
        .optional(),
    attributes: z.record(z.string(), z.unknown()).optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.blockSlug === 'post-carousel') {
        if (data.slides !== undefined) {
            ctx.addIssue({
                code: 'custom',
                path: ['slides'],
                message: 'post-carousel queries posts dynamically via WP_Query; omit slides and configure query/carousel options via layout and attributes.',
            });
        }
        return;
    }
    if (!data.slides || data.slides.length === 0) {
        ctx.addIssue({
            code: 'custom',
            path: ['slides'],
            message: 'slides is required and must contain at least 1 item.',
        });
    }
});
export class GeneratorInputError extends Error {
}
export const generateBlockToolDefinition = {
    name: 'gslider_generate_block',
    description: "Generates paste-ready Gutenberg markup for a GSlider block. The markup is produced by the block's own save function and checked with validateBlock before it is returned. Flexi Content slides are child flexi-content-item blocks; Post Carousel is a dynamic server-rendered block (save returns null) configured without slides.",
    inputSchema: {
        type: 'object',
        properties: {
            blockSlug: {
                type: 'string',
                enum: GENERATABLE_SLUGS,
                description: 'Block to generate: base, testimonial, image-slider, logo-carousel, flexi-content, or post-carousel.',
            },
            slides: {
                type: 'array',
                minItems: 1,
                description: 'One object per slide for static blocks (required for base, testimonial, image-slider, logo-carousel, flexi-content; omit for dynamic post-carousel). Fields must belong to the chosen block.',
                items: { type: 'object' },
            },
            layout: {
                type: 'object',
                description: 'High-level layout: mode, effect, columns, gap, speed, autoplay, loop, navigation, pagination.',
            },
            attributes: {
                type: 'object',
                description: 'Raw attribute overrides by their real attribute names. These win over layout. Unknown names are rejected.',
            },
        },
        required: ['blockSlug'],
    },
};
function toolError(text) {
    return { isError: true, content: [{ type: 'text', text }] };
}
function deviceObject(value, fallback) {
    if (value !== null && typeof value === 'object') {
        return { ...(fallback ?? {}), ...value };
    }
    return { Desktop: value, Tablet: value, Mobile: value };
}
function typeMatches(type, value) {
    if (type === 'array') {
        return Array.isArray(value);
    }
    if (type === 'object') {
        return (value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value));
    }
    if (type === 'boolean') {
        return typeof value === 'boolean';
    }
    if (type === 'string') {
        return typeof value === 'string';
    }
    if (type === 'number') {
        return typeof value === 'number' && Number.isFinite(value);
    }
    return true;
}
function buildSlide(slug, slide, index, fallback) {
    const foreign = Object.keys(slide).filter((key) => !SLIDE_FIELDS[slug].includes(key));
    if (foreign.length > 0) {
        throw new GeneratorInputError(`Slide field "${foreign[0]}" is not valid for ${slug}. Valid fields: ${SLIDE_FIELDS[slug].join(', ')}.`);
    }
    if (slug === 'image-slider' || slug === 'logo-carousel') {
        if (!slide.url) {
            throw new GeneratorInputError(`Each ${slug} slide needs a url. The generator does not upload media.`);
        }
        return {
            id: -(index + 1),
            url: slide.url,
            alt: slide.alt ?? '',
            link: slide.link ?? '',
            caption: slide.caption ?? '',
            tooltipText: slide.tooltipText ?? '',
        };
    }
    const item = fallback
        ? structuredClone(fallback)
        : {};
    item.id = `item-${index + 1}`;
    const copy = (from, to) => {
        if (slide[from] !== undefined) {
            item[to] = slide[from];
        }
    };
    if (slug === 'base') {
        copy('subTitle', 'subTitle');
        copy('title', 'title');
        copy('description', 'description');
        copy('buttonText', 'primaryButtonText');
        copy('buttonUrl', 'primaryButtonLink');
        if (slide.secondaryButtonText !== undefined ||
            slide.secondaryButtonUrl !== undefined) {
            item.secondaryButtonSwitcher = true;
            copy('secondaryButtonText', 'secondaryButtonText');
            copy('secondaryButtonUrl', 'secondaryButtonLink');
        }
        if (slide.backgroundColor !== undefined) {
            item.normalItemBackgroundType = 'classic';
            item.normalItemClassicColor = slide.backgroundColor;
        }
        if (slide.backgroundImageUrl !== undefined) {
            const current = (item.normalBackgroundImageUrl ?? {});
            item.normalBackgroundImageUrl = {
                ...current,
                Desktop: slide.backgroundImageUrl,
            };
        }
    }
    else {
        copy('testimonialTitle', 'testimonialTitle');
        copy('testimonialText', 'testimonialText');
        copy('authorName', 'authorName');
        copy('authorDesignation', 'authorDesignation');
        copy('rating', 'ratingNumber');
        if (slide.authorImageUrl !== undefined ||
            slide.authorImageAlt !== undefined) {
            const current = (item.authorImage ?? {});
            item.authorImage = {
                url: slide.authorImageUrl ?? current.url ?? '',
                id: '',
                alt: slide.authorImageAlt ?? current.alt ?? '',
            };
        }
    }
    return item;
}
function coreBlock(blocksApi, inner) {
    if (inner.type === 'paragraph') {
        if (!inner.text) {
            throw new GeneratorInputError('A paragraph needs text.');
        }
        return blocksApi.createBlock('core/paragraph', {
            content: inner.text,
        });
    }
    if (inner.type === 'heading') {
        if (!inner.text) {
            throw new GeneratorInputError('A heading needs text.');
        }
        return blocksApi.createBlock('core/heading', {
            content: inner.text,
            level: inner.level ?? 2,
        });
    }
    if (inner.type === 'image') {
        if (!inner.url) {
            throw new GeneratorInputError('An image needs a url. The generator does not upload media.');
        }
        return blocksApi.createBlock('core/image', {
            url: inner.url,
            alt: inner.alt ?? '',
        });
    }
    if (!inner.text) {
        throw new GeneratorInputError('A button needs text.');
    }
    return blocksApi.createBlock('core/buttons', {}, [
        blocksApi.createBlock('core/button', {
            text: inner.text,
            url: inner.url ?? '',
        }),
    ]);
}
function validationIssues(blocksApi, block) {
    const current = block;
    const result = validationOf(blocksApi.validateBlock(current));
    const nested = (current.innerBlocks ?? []).flatMap((child) => validationIssues(blocksApi, child));
    return result.isValid ? nested : [...result.issues, ...nested];
}
function generate(input) {
    const slug = input.blockSlug;
    const { blocks, bundled, schema } = prepareBlock(slug);
    const defaults = attributeDefaults(bundled.attributes);
    const isDynamic = slug === 'post-carousel';
    const carouselOnly = slug === 'image-slider' ||
        slug === 'logo-carousel' ||
        slug === 'post-carousel';
    const layout = input.layout ?? {};
    const overrides = input.attributes ?? {};
    if (layout.mode && carouselOnly) {
        throw new GeneratorInputError(`${slug} is always a carousel and has no slider mode.`);
    }
    for (const key of Object.keys(overrides)) {
        if (RESERVED_ATTRIBUTES.includes(key)) {
            throw new GeneratorInputError(`"${key}" cannot be set through attributes. blockId and blockStyle are generated, and deviceType is editor-only state.`);
        }
        const definition = schema.attributes[key];
        if (!definition) {
            throw new GeneratorInputError(`Unknown attribute "${key}" for ${slug}.`);
        }
        if (!typeMatches(definition.type, overrides[key])) {
            throw new GeneratorInputError(`Attribute "${key}" must be a ${definition.type}.`);
        }
        const allowed = schema.allowedValues?.[key];
        if (Array.isArray(allowed) &&
            typeof overrides[key] === 'string' &&
            !allowed.includes(overrides[key])) {
            throw new GeneratorInputError(`Attribute "${key}" must be one of: ${allowed.join(', ')}.`);
        }
    }
    const isFlexi = slug === 'flexi-content';
    const inputSlides = input.slides ?? [];
    let flexiItems = [];
    let slides = [];
    if (isFlexi) {
        registerCoreBlocksOnce();
        prepareBlock('flexi-content-item');
        const itemBundled = loadBundledBlock('flexi-content-item');
        const itemDefaults = attributeDefaults(itemBundled.attributes);
        flexiItems = inputSlides.map((slide) => {
            const foreign = Object.keys(slide).filter((key) => key !== 'blocks');
            if (foreign.length > 0) {
                throw new GeneratorInputError(`Slide field "${foreign[0]}" is not valid for flexi-content. Each slide needs a blocks array.`);
            }
            if (!slide.blocks || slide.blocks.length === 0) {
                throw new GeneratorInputError('Each flexi slide needs at least one block.');
            }
            const itemId = `${BLOCK_ID_PREFIX['flexi-content-item']}-${randomBytes(4).toString('hex')}`;
            const itemChanged = { blockId: itemId };
            const itemStyle = itemBundled.styling({
                ...itemDefaults,
                ...itemChanged,
            });
            return blocks.createBlock('gslider-blocks/flexi-content-item', { ...itemChanged, blockStyle: itemStyle }, slide.blocks.map((inner) => coreBlock(blocks, inner)));
        });
    }
    else if (!isDynamic) {
        const fallbackItems = defaults[schema.slideField];
        const fallbackItem = Array.isArray(fallbackItems) && fallbackItems.length > 0
            ? fallbackItems[0]
            : null;
        if (!carouselOnly && !fallbackItem) {
            throw new GeneratorInputError(`${slug} has no default slide item to build from.`);
        }
        slides = inputSlides.map((slide, index) => buildSlide(slug, slide, index, fallbackItem));
    }
    const changed = {
        blockId: `${BLOCK_ID_PREFIX[slug]}-${randomBytes(4).toString('hex')}`,
    };
    if (!isFlexi && !isDynamic && schema.slideField) {
        changed[schema.slideField] = slides;
    }
    if (layout.mode) {
        changed.sliderType = layout.mode;
    }
    if (layout.columns !== undefined) {
        changed.carouselPerColumn = deviceObject(layout.columns, defaults.carouselPerColumn);
    }
    if (layout.gap !== undefined) {
        changed.carouselPerColumnGap = deviceObject(layout.gap, defaults.carouselPerColumnGap);
    }
    if (layout.speed !== undefined) {
        changed.speed = deviceObject(layout.speed, defaults.speed);
    }
    if (layout.autoplay !== undefined) {
        changed.autoplay = layout.autoplay;
    }
    if (layout.autoplayDelay !== undefined) {
        changed.autoplayDelay = deviceObject(layout.autoplayDelay, defaults.autoplayDelay);
    }
    if (layout.loop !== undefined) {
        changed.infiniteLoop = layout.loop;
    }
    if (layout.pauseOnHover !== undefined) {
        changed.pauseOnHover = layout.pauseOnHover;
    }
    if (layout.navigation !== undefined) {
        changed.showNavigation = deviceObject(layout.navigation, defaults.showNavigation);
    }
    if (layout.pagination !== undefined) {
        changed.showPagination = deviceObject(layout.pagination, defaults.showPagination);
    }
    if (layout.paginationType !== undefined) {
        const allowed = schema.allowedValues?.paginationType ?? [];
        if (allowed.length > 0 &&
            !allowed.includes(layout.paginationType)) {
            throw new GeneratorInputError(`paginationType must be one of: ${allowed.join(', ')}.`);
        }
        changed.paginationType = layout.paginationType;
    }
    const sliderType = (typeof overrides.sliderType === 'string'
        ? overrides.sliderType
        : undefined) ??
        (typeof changed.sliderType === 'string'
            ? changed.sliderType
            : undefined) ??
        (carouselOnly ? 'carousel' : 'slider');
    if (layout.effect !== undefined) {
        const effectKey = sliderType === 'carousel' ? 'carouselEffect' : 'slideEffect';
        const allowed = schema.allowedEffects[effectKey] ?? [];
        if (!allowed.includes(layout.effect)) {
            throw new GeneratorInputError(`Effect "${layout.effect}" is not allowed for ${slug} in ${sliderType} mode. Allowed: ${allowed.join(', ')}.`);
        }
        changed[effectKey] = layout.effect;
    }
    Object.assign(changed, overrides);
    if (changed.navigationArrowsIconSwitcher === true ||
        changed.showQuoteIcon === true) {
        throw new GeneratorInputError('Custom arrow icons and the quote icon need the editor icon set, which the generator does not load. Leave navigationArrowsIconSwitcher and showQuoteIcon off.');
    }
    changed.blockStyle = bundled.styling({ ...defaults, ...changed });
    const block = blocks.createBlock(schema.name, changed, isFlexi ? flexiItems : undefined);
    const markup = blocks.serialize([block]);
    const parsed = blocks.parse(markup)[0];
    const issues = validationIssues(blocks, parsed);
    if (issues.length > 0) {
        throw new GeneratorInputError(`Generated markup failed block validation: ${JSON.stringify(issues)}`);
    }
    return {
        blockName: schema.name,
        blockId: changed.blockId,
        markup,
        attributes: commentAttributes(markup) ?? {},
        validation: { isValid: true, issues: [] },
    };
}
export async function handleGenerateBlock(args) {
    const parsed = generateBlockInputZod.safeParse(args);
    if (!parsed.success) {
        const message = parsed.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        return toolError(`Invalid arguments for gslider_generate_block: ${message}`);
    }
    try {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(generate(parsed.data), null, 2),
                },
            ],
        };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return toolError(message);
    }
}
//# sourceMappingURL=generate-block.js.map