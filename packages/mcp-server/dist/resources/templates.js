/**
 * Curated GSlider Design Templates & Presets
 *
 * Exposes production-ready slider configurations matching real GSlider
 * block attributes and responsive `{ Desktop, Tablet, Mobile }` shapes.
 *
 * Every key in `data` is a real attribute of `gslider-blocks/<blockSlug>`.
 * `blockId` and `blockStyle` are left empty: the editor sets `blockId` to
 * `<blockIdPrefix>-` plus 8 characters and writes `blockStyle` from the
 * block's `styling.js`, so a template only renders fully after it is opened
 * and saved in the block editor.
 */
import fs from 'fs';
import { BLOCK_ID_PREFIX, getBlockSchema } from '../core/registry.js';
function loadTemplateFixtures(folder) {
    const dirUrl = new URL(`../templates/${folder}/`, import.meta.url);
    if (!fs.existsSync(dirUrl)) {
        return [];
    }
    return fs
        .readdirSync(dirUrl)
        .filter((file) => file.endsWith('.json'))
        .sort()
        .map((file) => {
        const raw = JSON.parse(fs.readFileSync(new URL(file, dirUrl), 'utf8'));
        return {
            ...raw,
            blockIdPrefix: BLOCK_ID_PREFIX[raw.blockSlug],
        };
    });
}
/**
 * Fills each slide with the block's first default slide item, so templates
 * carry the same per-slide fields the editor writes.
 * @param slug
 * @param slides
 */
function withDefaultSlideFields(slug, slides) {
    const schema = getBlockSchema(slug);
    const defaults = schema.attributes[schema.slideField]?.default;
    const base = Array.isArray(defaults) && defaults.length > 0 ? defaults[0] : {};
    return slides.map((slide) => ({
        ...structuredClone(base),
        ...slide,
    }));
}
export const SLIDER_TEMPLATES = [
    {
        uri: 'gslider://templates/hero-slider',
        name: 'Full-Width Hero Slider',
        description: 'High-impact full-width slider with responsive layout, auto-play, navigation arrows, and bullet pagination.',
        mimeType: 'application/json',
        blockSlug: 'image-slider',
        blockName: 'gslider-blocks/image-slider',
        blockIdPrefix: BLOCK_ID_PREFIX['image-slider'],
        data: {
            blockId: '',
            blockStyle: '',
            images: [
                {
                    id: -1,
                    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80',
                    alt: 'Digital Transformation Banner',
                    caption: 'Build Modern Digital Experiences',
                    link: '#get-started',
                },
                {
                    id: -2,
                    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80',
                    alt: 'Creative Architecture',
                    caption: 'Design Without Limitations',
                    link: '#explore',
                },
                {
                    id: -3,
                    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80',
                    alt: 'Tropical Paradise Coast',
                    caption: 'Discover Inspiring Destinations',
                    link: '#discover',
                },
                {
                    id: -4,
                    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
                    alt: 'Future Technology & Space',
                    caption: 'Empowering Next-Gen Innovation',
                    link: '#innovate',
                },
            ],
            carouselPerColumn: { Desktop: 1, Tablet: 1, Mobile: 1 },
            carouselPerColumnGap: { Desktop: 0, Tablet: 0, Mobile: 0 },
            carouselEffect: 'slide',
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: true,
            autoplayDelay: { Desktop: 4000, Tablet: 4000, Mobile: 4000 },
            infiniteLoop: true,
            showNavigation: { Desktop: true, Tablet: true, Mobile: true },
            showPagination: { Desktop: true, Tablet: true, Mobile: true },
            paginationType: 'bullets',
        },
    },
    {
        uri: 'gslider://templates/product-carousel',
        name: 'E-commerce Product Showcase Carousel',
        description: 'Responsive 3-column card carousel with space between items and navigation controls.',
        mimeType: 'application/json',
        blockSlug: 'image-slider',
        blockName: 'gslider-blocks/image-slider',
        blockIdPrefix: BLOCK_ID_PREFIX['image-slider'],
        data: {
            blockId: '',
            blockStyle: '',
            images: [
                {
                    id: -1,
                    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
                    alt: 'Wireless Headphones',
                    caption: 'Studio Headphones',
                    link: '#shop',
                },
                {
                    id: -2,
                    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
                    alt: 'Minimalist Watch',
                    caption: 'Chronograph Classic',
                    link: '#shop',
                },
                {
                    id: -3,
                    url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
                    alt: 'Smart Watch',
                    caption: 'Smart Band Series',
                    link: '#shop',
                },
                {
                    id: -4,
                    url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop&q=80',
                    alt: 'Premium Perfume Bottle',
                    caption: 'Luxury Fragrance',
                    link: '#shop',
                },
                {
                    id: -5,
                    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
                    alt: 'Designer Sunglasses',
                    caption: 'Polarized Sunglasses',
                    link: '#shop',
                },
            ],
            carouselPerColumn: { Desktop: 3, Tablet: 2, Mobile: 1 },
            carouselPerColumnGap: { Desktop: 20, Tablet: 15, Mobile: 10 },
            carouselEffect: 'slide',
            speed: { Desktop: 700, Tablet: 700, Mobile: 700 },
            autoplay: false,
            autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
            infiniteLoop: true,
            showNavigation: { Desktop: true, Tablet: true, Mobile: true },
            showPagination: { Desktop: true, Tablet: true, Mobile: false },
            paginationType: 'bullets',
        },
    },
    {
        uri: 'gslider://templates/testimonial-cards',
        name: 'Social Proof Testimonial Cards',
        description: 'Two-column client review cards with 5-star ratings and reviewer details.',
        mimeType: 'application/json',
        blockSlug: 'testimonial',
        blockName: 'gslider-blocks/testimonial',
        blockIdPrefix: BLOCK_ID_PREFIX.testimonial,
        data: {
            blockId: '',
            blockStyle: '',
            sliderItems: withDefaultSlideFields('testimonial', [
                {
                    id: 'item-1',
                    testimonialTitle: 'Game changer for our agency',
                    testimonialText: 'We migrated 40 client sites to GSlider. The responsive controls and dynamic styling save us hours every sprint.',
                    authorName: 'Marcus Vance',
                    authorDesignation: 'CTO, Vertex Media',
                    authorImage: {
                        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
                        id: '',
                        alt: 'Marcus Vance',
                    },
                    ratingNumber: 5,
                },
                {
                    id: 'item-2',
                    testimonialTitle: 'Flawless headless integration',
                    testimonialText: 'Our Next.js frontend fetches the pre-parsed Swiper settings directly. Zero runtime CSS calculation needed!',
                    authorName: 'Elena Rostova',
                    authorDesignation: 'Lead Frontend Architect',
                    authorImage: {
                        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
                        id: '',
                        alt: 'Elena Rostova',
                    },
                    ratingNumber: 5,
                },
                {
                    id: 'item-3',
                    testimonialTitle: 'Incredible speed & performance',
                    testimonialText: 'Our Google Core Web Vitals score jumped to 99 after replacing heavy slider plugins with GSlider Blocks.',
                    authorName: 'Sarah Jenkins',
                    authorDesignation: 'VP of Product, CloudScale',
                    authorImage: {
                        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
                        id: '',
                        alt: 'Sarah Jenkins',
                    },
                    ratingNumber: 5,
                },
                {
                    id: 'item-4',
                    testimonialTitle: 'The cleanest code in the ecosystem',
                    testimonialText: 'As WordPress VIP developers, code quality is paramount. GSlider follows modern PSR-4 and React standards to perfection.',
                    authorName: 'David Chen',
                    authorDesignation: 'Senior WordPress Architect',
                    authorImage: {
                        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
                        id: '',
                        alt: 'David Chen',
                    },
                    ratingNumber: 5,
                },
            ]),
            sliderType: 'carousel',
            carouselPerColumn: { Desktop: 2, Tablet: 2, Mobile: 1 },
            carouselPerColumnGap: { Desktop: 20, Tablet: 20, Mobile: 0 },
            carouselEffect: 'slide',
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: false,
            autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
            infiniteLoop: true,
            showNavigation: { Desktop: true, Tablet: true, Mobile: true },
            showPagination: { Desktop: true, Tablet: true, Mobile: true },
            paginationType: 'bullets',
        },
    },
    {
        uri: 'gslider://templates/brand-logos',
        name: 'Partner Brand Logo Carousel',
        description: 'Two-column logo carousel for trusted brands and client showcases, with autoplay off.',
        mimeType: 'application/json',
        blockSlug: 'logo-carousel',
        blockName: 'gslider-blocks/logo-carousel',
        blockIdPrefix: BLOCK_ID_PREFIX['logo-carousel'],
        data: {
            blockId: '',
            blockStyle: '',
            logos: [
                {
                    id: -1,
                    url: 'https://dummyimage.com/200x80/222/fff.png&text=Google',
                    alt: 'Google',
                    link: '#',
                },
                {
                    id: -2,
                    url: 'https://dummyimage.com/200x80/222/fff.png&text=Stripe',
                    alt: 'Stripe',
                    link: '#',
                },
                {
                    id: -3,
                    url: 'https://dummyimage.com/200x80/222/fff.png&text=Vercel',
                    alt: 'Vercel',
                    link: '#',
                },
                {
                    id: -4,
                    url: 'https://dummyimage.com/200x80/222/fff.png&text=Automattic',
                    alt: 'Automattic',
                    link: '#',
                },
                {
                    id: -5,
                    url: 'https://dummyimage.com/200x80/222/fff.png&text=GitHub',
                    alt: 'GitHub',
                    link: '#',
                },
                {
                    id: -6,
                    url: 'https://dummyimage.com/200x80/222/fff.png&text=Shopify',
                    alt: 'Shopify',
                    link: '#',
                },
            ],
            carouselPerColumn: { Desktop: 2, Tablet: 2, Mobile: 1 },
            carouselPerColumnGap: { Desktop: 10, Tablet: 10, Mobile: 10 },
            carouselEffect: 'slide',
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: false,
            autoplayDelay: { Desktop: 1000, Tablet: 1000, Mobile: 1000 },
            infiniteLoop: true,
            showNavigation: { Desktop: true, Tablet: true, Mobile: true },
            showPagination: { Desktop: false, Tablet: false, Mobile: false },
        },
    },
    {
        uri: 'gslider://templates/content-hero',
        name: 'Content Hero Slider',
        description: 'Single-column content slider with titles, descriptions, and call-to-action buttons, using a fade transition and autoplay.',
        mimeType: 'application/json',
        blockSlug: 'base',
        blockName: 'gslider-blocks/base',
        blockIdPrefix: BLOCK_ID_PREFIX.base,
        data: {
            blockId: '',
            blockStyle: '',
            sliderItems: withDefaultSlideFields('base', [
                {
                    id: 'item-1',
                    subTitle: 'New Release',
                    title: 'Launch Faster With GSlider',
                    description: 'Build responsive sliders in the block editor without writing code.',
                    primaryButtonText: 'Get Started',
                    primaryButtonLink: '#get-started',
                },
                {
                    id: 'item-2',
                    subTitle: 'Headless Ready',
                    title: 'Ship To Any Frontend',
                    description: 'Read pre-parsed Swiper settings and styles from the REST API.',
                    primaryButtonText: 'Read The Docs',
                    primaryButtonLink: '#docs',
                },
                {
                    id: 'item-3',
                    subTitle: 'Speed Optimized',
                    title: 'Lightweight & Blazing Fast',
                    description: 'Zero bloat, zero jQuery dependencies. Powered by pure modern Swiper and CSS variables.',
                    primaryButtonText: 'Explore Features',
                    primaryButtonLink: '#features',
                },
                {
                    id: 'item-4',
                    subTitle: 'Community Driven',
                    title: '100% Free & Open Source',
                    description: 'No pro nags, no locked settings. Build unlimited sliders with total design freedom.',
                    primaryButtonText: 'Join Community',
                    primaryButtonLink: '#community',
                },
            ]),
            sliderType: 'slider',
            slideEffect: 'fade',
            speed: { Desktop: 800, Tablet: 800, Mobile: 800 },
            autoplay: true,
            autoplayDelay: { Desktop: 5000, Tablet: 5000, Mobile: 5000 },
            infiniteLoop: true,
            showNavigation: { Desktop: true, Tablet: true, Mobile: false },
            showPagination: { Desktop: true, Tablet: true, Mobile: true },
            paginationType: 'bullets',
        },
    },
    ...loadTemplateFixtures('post-carousel'),
];
/**
 * Lists all available slider templates for MCP resource discovery.
 */
export function listTemplates() {
    return SLIDER_TEMPLATES;
}
/**
 * Retrieves a specific slider template by its URI.
 * @param uri
 */
export function getTemplateByUri(uri) {
    return SLIDER_TEMPLATES.find((tpl) => tpl.uri === uri);
}
//# sourceMappingURL=templates.js.map