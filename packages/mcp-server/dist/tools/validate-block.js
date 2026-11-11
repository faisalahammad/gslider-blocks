/* eslint-disable no-nested-ternary */
import { z } from 'zod';
import { BLOCK_ID_PREFIX } from '../core/registry.js';
import { attributeDefaults, prepareBlock, validationOf, } from '../core/block-runtime.js';
import { blockNameFromMarkup, commentAttributes } from '../core/markup.js';
import { GENERATABLE_SLUGS } from './generate-block.js';
const validateInputZod = z
    .object({
    markup: z.string().optional(),
    blockSlug: z.enum(GENERATABLE_SLUGS).optional(),
    attributes: z.record(z.string(), z.unknown()).optional(),
})
    .strict();
export const validateBlockToolDefinition = {
    name: 'gslider_validate_block',
    description: 'Checks GSlider markup or attributes. Reports unknown keys, wrong types, disallowed effects, a bad blockId, and whether the markup passes validateBlock. A blockStyle that the editor would rewrite is a warning.',
    inputSchema: {
        type: 'object',
        properties: {
            markup: {
                type: 'string',
                description: 'A block comment to parse and validate. Use this or blockSlug plus attributes.',
            },
            blockSlug: {
                type: 'string',
                enum: GENERATABLE_SLUGS,
                description: 'Block slug, required when markup is omitted.',
            },
            attributes: {
                type: 'object',
                description: 'Attribute object to check, required when markup is omitted.',
            },
        },
    },
};
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
function checkAttributes(slug, raw) {
    const schema = prepareBlock(slug).schema;
    const errors = [];
    const carouselOnly = slug === 'image-slider' ||
        slug === 'logo-carousel' ||
        slug === 'post-carousel';
    for (const [key, value] of Object.entries(raw)) {
        const definition = schema.attributes[key];
        if (!definition) {
            errors.push(`Unknown attribute "${key}".`);
            continue;
        }
        if (!typeMatches(definition.type, value)) {
            errors.push(`Attribute "${key}" must be a ${definition.type}.`);
        }
        const allowed = schema.allowedValues?.[key];
        if (Array.isArray(allowed) &&
            typeof value === 'string' &&
            !allowed.includes(value)) {
            errors.push(`Attribute "${key}" must be one of: ${allowed.join(', ')}.`);
        }
    }
    for (const effectKey of ['slideEffect', 'carouselEffect']) {
        const value = raw[effectKey];
        if (typeof value !== 'string') {
            continue;
        }
        const allowed = schema.allowedEffects[effectKey] ?? [];
        if (!allowed.includes(value)) {
            errors.push(`Effect "${value}" is not allowed for ${schema.name} (${effectKey}). Allowed: ${allowed.join(', ')}.`);
        }
    }
    const sliderType = typeof raw.sliderType === 'string'
        ? raw.sliderType
        : carouselOnly
            ? 'carousel'
            : 'slider';
    const activeKey = sliderType === 'carousel' ? 'carouselEffect' : 'slideEffect';
    if (raw[activeKey] !== undefined &&
        typeof raw[activeKey] !== 'string') {
        errors.push(`${activeKey} must be a string.`);
    }
    const prefix = BLOCK_ID_PREFIX[slug];
    const blockId = raw.blockId;
    if (typeof blockId !== 'string' ||
        !new RegExp(`^${prefix}-[a-z0-9]{8}$`).test(blockId)) {
        errors.push(`blockId must be ${prefix}- followed by 8 characters.`);
    }
    return errors;
}
function styleWarning(slug, raw) {
    const { bundled } = prepareBlock(slug);
    const recomputed = bundled.styling({
        ...attributeDefaults(bundled.attributes),
        ...raw,
    });
    if (raw.blockStyle !== recomputed) {
        return 'blockStyle differs from what the editor would write, so opening the block rewrites it.';
    }
    return null;
}
function validate(input) {
    if (input.markup && (input.blockSlug || input.attributes)) {
        throw new Error('Pass markup, or blockSlug with attributes, not both.');
    }
    if (input.markup) {
        const name = blockNameFromMarkup(input.markup);
        const slug = name?.startsWith('gslider-blocks/')
            ? name.slice('gslider-blocks/'.length)
            : '';
        if (!GENERATABLE_SLUGS.includes(slug)) {
            throw new Error(`markup must be one of: ${GENERATABLE_SLUGS.map((item) => `gslider-blocks/${item}`).join(', ')}.`);
        }
        const blockSlug = slug;
        const { blocks } = prepareBlock(blockSlug);
        const raw = commentAttributes(input.markup);
        if (!raw) {
            throw new Error('markup has no attribute JSON in the block comment.');
        }
        const errors = checkAttributes(blockSlug, raw);
        const parsed = blocks.parse(input.markup)[0];
        const validation = parsed
            ? validationOf(blocks.validateBlock(parsed))
            : { isValid: false, issues: ['nothing parsed'] };
        if (!validation.isValid) {
            errors.push('Block markup does not match the block save output.');
        }
        const warning = styleWarning(blockSlug, raw);
        return {
            isValid: errors.length === 0,
            errors,
            warnings: warning ? [warning] : [],
            validationLog: validation.issues,
        };
    }
    if (!input.blockSlug || !input.attributes) {
        throw new Error('Pass markup, or blockSlug with attributes.');
    }
    const errors = checkAttributes(input.blockSlug, input.attributes);
    const warning = styleWarning(input.blockSlug, input.attributes);
    return {
        isValid: errors.length === 0,
        errors,
        warnings: warning ? [warning] : [],
    };
}
export async function handleValidateBlock(args) {
    const parsed = validateInputZod.safeParse(args);
    if (!parsed.success) {
        const message = parsed.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        return {
            isError: true,
            content: [
                {
                    type: 'text',
                    text: `Invalid arguments for gslider_validate_block: ${message}`,
                },
            ],
        };
    }
    try {
        const report = validate(parsed.data);
        return {
            isError: !report.isValid,
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(report, null, 2),
                },
            ],
        };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
            isError: true,
            content: [{ type: 'text', text: message }],
        };
    }
}
//# sourceMappingURL=validate-block.js.map