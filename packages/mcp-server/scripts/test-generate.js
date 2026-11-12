/* eslint-disable no-console */
import { isDeepStrictEqual } from 'util';
import { handleGenerateBlock } from '../dist/tools/generate-block.js';
import { handleValidateBlock } from '../dist/tools/validate-block.js';
import {
	attributeDefaults,
	loadBundledBlock,
} from '../dist/core/block-runtime.js';
import { BLOCK_ID_PREFIX } from '../dist/core/registry.js';
import { listTemplates } from '../dist/resources/templates.js';

const slugs = [ 'base', 'testimonial', 'image-slider', 'logo-carousel' ];
const blockIds = [];
let failed = false;

function fail( message ) {
	failed = true;
	throw new Error( message );
}

function slideFor( slug ) {
	if ( slug === 'base' ) {
		return { title: 'Hello', description: 'World' };
	}
	if ( slug === 'testimonial' ) {
		return { testimonialText: 'Great', authorName: 'Ada', rating: 5 };
	}
	return { url: 'https://example.com/slide.jpg', alt: 'Slide' };
}

function swiperSettingsIn( markup ) {
	const match = markup.match( /data-swiper-settings="([^"]*)"[\s>]/ );
	if ( ! match ) {
		fail( 'markup has no data-swiper-settings attribute' );
	}
	const decoded = match[ 1 ]
		.replace( /&quot;/g, '"' )
		.replace( /&amp;/g, '&' );
	return JSON.parse( decoded );
}

function effectIn( markup ) {
	return swiperSettingsIn( markup ).effect;
}

async function generate( input ) {
	const result = await handleGenerateBlock( input );
	const text = result.content[ 0 ].text;
	if ( result.isError ) {
		throw new Error( text );
	}
	return JSON.parse( text );
}

async function check( slug, extra, expectedEffect, label ) {
	const result = await generate( {
		blockSlug: slug,
		slides: [ slideFor( slug ) ],
		...extra,
	} );
	if ( ! result.markup.startsWith( `<!-- wp:gslider-blocks/${ slug } ` ) ) {
		fail(
			`${ slug } ${ label }: comment is not wp:gslider-blocks/${ slug }`
		);
	}
	if ( ! result.markup.includes( 'data-swiper-settings' ) ) {
		fail( `${ slug } ${ label }: markup has no data-swiper-settings` );
	}
	const effect = effectIn( result.markup );
	if ( effect !== expectedEffect ) {
		fail(
			`${ slug } ${ label }: effect is ${ effect }, expected ${ expectedEffect }`
		);
	}
	const prefix = BLOCK_ID_PREFIX[ slug ];
	if ( ! new RegExp( `^${ prefix }-[a-f0-9]{8}$` ).test( result.blockId ) ) {
		fail(
			`${ slug } ${ label }: blockId ${ result.blockId } does not use ${ prefix }`
		);
	}
	blockIds.push( result.blockId );
	if (
		! result.validation.isValid ||
		result.validation.issues.length !== 0
	) {
		fail( `${ slug } ${ label }: validation failed` );
	}
	const bundled = loadBundledBlock( slug );
	const defaults = attributeDefaults( bundled.attributes );
	for ( const [ key, value ] of Object.entries( result.attributes ) ) {
		if ( isDeepStrictEqual( value, defaults[ key ] ) ) {
			fail(
				`${ slug } ${ label }: comment keeps default attribute ${ key }`
			);
		}
	}
	const recomputed = bundled.styling( { ...defaults, ...result.attributes } );
	if ( result.attributes.blockStyle !== recomputed ) {
		fail( `${ slug } ${ label }: blockStyle does not match styling()` );
	}
	console.log( `ok ${ slug } ${ label }` );
}

async function rejects( input, needle ) {
	const result = await handleGenerateBlock( input );
	const text = result.content[ 0 ].text;
	if ( ! result.isError || ! text.includes( needle ) ) {
		fail( `expected a rejection containing "${ needle }", got: ${ text }` );
	}
	console.log( `ok reject ${ needle }` );
}

for ( const slug of slugs ) {
	const carouselOnly = slug === 'image-slider' || slug === 'logo-carousel';
	await check( slug, {}, 'slide', 'defaults' );
	await check(
		slug,
		{
			layout: {
				columns: 3,
				autoplay: true,
				effect: 'coverflow',
				loop: false,
				...( carouselOnly ? {} : { mode: 'carousel' } ),
			},
		},
		'coverflow',
		'layout'
	);
}

for ( const slug of [ 'base', 'testimonial' ] ) {
	await check(
		slug,
		{ layout: { mode: 'slider', effect: 'fade' } },
		'fade',
		'fade'
	);
	await check(
		slug,
		{ layout: { mode: 'carousel', effect: 'coverflow' } },
		'coverflow',
		'coverflow'
	);
}

for ( const slug of [ 'image-slider', 'logo-carousel' ] ) {
	const generated = await generate( {
		blockSlug: slug,
		slides: [
			slideFor( slug ),
			{ ...slideFor( slug ), alt: 'Second slide' },
		],
	} );
	const field = slug === 'image-slider' ? 'images' : 'logos';
	const items = generated.attributes[ field ];
	if (
		! Array.isArray( items ) ||
		items.length !== 2 ||
		items.some( ( item ) => ! ( item.id < 0 ) ) ||
		new Set( items.map( ( item ) => item.id ) ).size !== items.length
	) {
		fail(
			`${ slug } generated slides must use unique negative non-attachment ids`
		);
	}
}
console.log( 'ok generated image and logo slides have no attachment ids' );

for ( const template of listTemplates() ) {
	let field = null;
	if ( template.blockSlug === 'image-slider' ) {
		field = 'images';
	} else if ( template.blockSlug === 'logo-carousel' ) {
		field = 'logos';
	}
	if ( ! field ) {
		continue;
	}
	const items = template.data[ field ];
	if (
		! Array.isArray( items ) ||
		items.some( ( item ) => ! ( item.id < 0 ) ) ||
		new Set( items.map( ( item ) => item.id ) ).size !== items.length
	) {
		fail( `${ template.uri } must not invent media attachment ids` );
	}
}
console.log(
	'ok image and logo templates have unique negative non-attachment ids'
);

if ( new Set( blockIds ).size !== blockIds.length ) {
	fail( 'generated block ids are not unique' );
}

// Testimonial vertical direction: the saved Swiper settings must keep the
// horizontal default free of a direction key, and vertical mode must set
// direction while dropping autoHeight (issue #648 backward compatibility).
const testimonialHorizontal = await generate( {
	blockSlug: 'testimonial',
	slides: [ slideFor( 'testimonial' ) ],
} );
if ( 'direction' in swiperSettingsIn( testimonialHorizontal.markup ) ) {
	fail( 'testimonial default markup must not include a direction key' );
}
const testimonialVertical = await generate( {
	blockSlug: 'testimonial',
	slides: [ slideFor( 'testimonial' ) ],
	attributes: { direction: 'vertical' },
} );
const verticalSettings = swiperSettingsIn( testimonialVertical.markup );
if ( verticalSettings.direction !== 'vertical' ) {
	fail( 'testimonial vertical markup must set direction to vertical' );
}
if ( 'autoHeight' in verticalSettings ) {
	fail( 'testimonial vertical markup must not include autoHeight' );
}
console.log( 'ok testimonial swiper settings direction handling' );

// Testimonial vertical styling must use the dedicated verticalHeight
// defaults and never fall back to the horizontal layoutHeight attributes.
const testimonialBlock = loadBundledBlock( 'testimonial' );
const testimonialDefaults = attributeDefaults( testimonialBlock.attributes );
const verticalStyle = testimonialBlock.styling( {
	...testimonialDefaults,
	direction: 'vertical',
	layoutHeight: { Desktop: '', Tablet: '', Mobile: '' },
	layoutHeightUnits: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
} );
const verticalHeights = [
	...verticalStyle.matchAll(
		/gslider-testimonial-wrapper > \.swiper \{\s*height: ([^;]+);/g
	),
].map( ( match ) => match[ 1 ].trim() );
if ( ! isDeepStrictEqual( verticalHeights, [ '500px', '420px', '350px' ] ) ) {
	fail(
		`testimonial vertical heights ${ JSON.stringify(
			verticalHeights
		) } do not use the dedicated verticalHeight defaults`
	);
}
console.log( 'ok testimonial vertical height independence' );

// Vertical sliders using outside pagination must place the bullets outside
// the slider. Swiper tags the pagination element with swiper-pagination-vertical
// when the direction is vertical, so the outside offset has to be applied on
// the vertical axis. Horizontal sliders must keep the horizontal rule only.
const horizontalPaginationStyle = testimonialBlock.styling( {
	...testimonialDefaults,
	paginationPositionType: 'outside',
} );
if ( horizontalPaginationStyle.includes( 'swiper-pagination-vertical' ) ) {
	fail(
		'testimonial horizontal pagination must not use vertical pagination rules'
	);
}
if (
	! horizontalPaginationStyle.includes(
		'.gslider-testimonial-wrapper.has-pagination { margin-bottom:'
	)
) {
	fail(
		'testimonial horizontal outside pagination must keep the bottom margin'
	);
}
if (
	horizontalPaginationStyle.includes(
		'.gslider-testimonial-wrapper.has-pagination { margin-right:'
	)
) {
	fail(
		'testimonial horizontal outside pagination must not use the right margin'
	);
}

const verticalPaginationStyle = testimonialBlock.styling( {
	...testimonialDefaults,
	direction: 'vertical',
	paginationPositionType: 'outside',
} );
if (
	! verticalPaginationStyle.includes(
		'.swiper-pagination-bullets.swiper-pagination-vertical'
	)
) {
	fail(
		'testimonial vertical outside pagination must target the vertical pagination class'
	);
}
if (
	! verticalPaginationStyle.includes(
		'.gslider-testimonial-wrapper.has-pagination { margin-right:'
	)
) {
	fail(
		'testimonial vertical outside pagination must reserve space on the right'
	);
}
if (
	verticalPaginationStyle.includes(
		'.gslider-testimonial-wrapper.has-pagination { margin-bottom:'
	)
) {
	fail(
		'testimonial vertical outside pagination must not use the bottom margin'
	);
}
// The generic pagination rule can emit a bottom offset. Vertical bullets are
// centered with top: 50%, so every breakpoint must reset bottom or the element
// stretches between both edges.
const verticalBulletBottomResets = [
	...verticalPaginationStyle.matchAll(
		/\.swiper-pagination-vertical\.swiper-pagination-bullets \{ top: 50%; bottom: auto !important;/g
	),
];
if ( verticalBulletBottomResets.length !== 3 ) {
	fail(
		`testimonial vertical outside bullets must reset bottom at all 3 breakpoints, found ${ verticalBulletBottomResets.length }`
	);
}
console.log( 'ok testimonial vertical outside pagination positioning' );

// Fraction pagination stays bottom positioned in vertical mode, so only
// bullets may switch the outside space reservation to the right margin.
const verticalFractionStyle = testimonialBlock.styling( {
	...testimonialDefaults,
	direction: 'vertical',
	paginationType: 'fraction',
	paginationPositionType: 'outside',
} );
if (
	! verticalFractionStyle.includes(
		'.gslider-testimonial-wrapper.has-pagination { margin-bottom:'
	)
) {
	fail(
		'testimonial vertical fraction outside pagination must keep the bottom margin'
	);
}
if (
	verticalFractionStyle.includes(
		'.gslider-testimonial-wrapper.has-pagination { margin-right:'
	)
) {
	fail(
		'testimonial vertical fraction outside pagination must not reserve right margin'
	);
}
console.log( 'ok testimonial vertical fraction outside pagination margin' );

for ( const slug of slugs ) {
	await rejects(
		{
			blockSlug: slug,
			slides: [ slideFor( slug ) ],
			layout: { effect: 'cube' },
		},
		'cube'
	);
}
await rejects(
	{
		blockSlug: 'image-slider',
		slides: [ slideFor( 'image-slider' ) ],
		layout: { effect: 'fade' },
	},
	'fade'
);
await rejects(
	{
		blockSlug: 'logo-carousel',
		slides: [ { url: 'https://example.com/slide.jpg', rating: 4 } ],
	},
	'rating'
);
await rejects(
	{
		blockSlug: 'base',
		slides: [ slideFor( 'base' ) ],
		attributes: { notARealAttribute: true },
	},
	'notARealAttribute'
);

const sample = await generate( {
	blockSlug: 'image-slider',
	slides: [ slideFor( 'image-slider' ) ],
} );
const valid = await handleValidateBlock( { markup: sample.markup } );
const validReport = JSON.parse( valid.content[ 0 ].text );
if (
	valid.isError ||
	! validReport.isValid ||
	validReport.warnings.length !== 0
) {
	fail(
		`generated markup did not validate cleanly: ${ valid.content[ 0 ].text }`
	);
}
console.log( 'ok validate generated markup' );

const badEffect = await handleValidateBlock( {
	blockSlug: 'image-slider',
	attributes: {
		blockId: 'gslider-image-slider-abcd1234',
		carouselEffect: 'cube',
	},
} );
if ( ! badEffect.content[ 0 ].text.includes( 'cube' ) ) {
	fail(
		`validate did not report the cube effect: ${ badEffect.content[ 0 ].text }`
	);
}
console.log( 'ok validate cube' );

const badKey = await handleValidateBlock( {
	blockSlug: 'base',
	attributes: { blockId: 'gslider-abcd1234', notARealAttribute: true },
} );
if ( ! badKey.content[ 0 ].text.includes( 'notARealAttribute' ) ) {
	fail(
		`validate did not report the unknown key: ${ badKey.content[ 0 ].text }`
	);
}
console.log( 'ok validate unknown key' );

const badType = await handleValidateBlock( {
	blockSlug: 'base',
	attributes: { blockId: 'gslider-abcd1234', autoplay: 'yes' },
} );
if ( ! badType.content[ 0 ].text.includes( 'autoplay' ) ) {
	fail(
		`validate did not report the wrong type: ${ badType.content[ 0 ].text }`
	);
}
console.log( 'ok validate wrong type' );

await rejects(
	{ blockSlug: 'flexi-content', slides: [ { title: 'One' } ] },
	'title'
);
await rejects(
	{ blockSlug: 'flexi-content-item', slides: [ { title: 'One' } ] },
	'blockSlug'
);
await rejects(
	{
		blockSlug: 'flexi-content',
		slides: [ { blocks: [ { type: 'paragraph', text: 'Hi' } ] } ],
		layout: { effect: 'cube' },
	},
	'cube'
);

const flexi = await generate( {
	blockSlug: 'flexi-content',
	slides: [
		{ blocks: [ { type: 'paragraph', text: 'First slide' } ] },
		{
			blocks: [
				{ type: 'heading', text: 'Second', level: 2 },
				{ type: 'button', text: 'Go', url: 'https://example.com' },
			],
		},
	],
	layout: { mode: 'carousel', effect: 'coverflow', columns: 2 },
} );
if ( ! flexi.markup.includes( '<!-- wp:gslider-blocks/flexi-content ' ) ) {
	fail( 'flexi comment name' );
}
const itemMatches =
	flexi.markup.match( /<!-- wp:gslider-blocks\/flexi-content-item /g ) || [];
if ( itemMatches.length !== 2 ) {
	fail( `flexi expected 2 items, found ${ itemMatches.length }` );
}
if (
	! flexi.markup.includes( 'wp:paragraph' ) ||
	! flexi.markup.includes( 'wp:heading' ) ||
	! flexi.markup.includes( 'wp:buttons' )
) {
	fail( 'flexi inner core blocks are missing' );
}
if ( ! /^gslider-flexi-content-[a-f0-9]{8}$/.test( flexi.blockId ) ) {
	fail( `flexi blockId ${ flexi.blockId }` );
}
const itemIds = [
	...flexi.markup.matchAll(
		/"blockId":"(gslider-flexi-content-item-[a-f0-9]{8})"/g
	),
].map( ( match ) => match[ 1 ] );
if ( itemIds.length !== 2 || new Set( itemIds ).size !== 2 ) {
	fail( `flexi item ids ${ itemIds.join( ', ' ) }` );
}
if ( effectIn( flexi.markup ) !== 'coverflow' ) {
	fail( `flexi effect ${ effectIn( flexi.markup ) }` );
}
if ( ! flexi.validation.isValid ) {
	fail( 'flexi validation' );
}
console.log( 'ok flexi-content' );

// Post Carousel (dynamic SSR block with save() => null and WP_Query attributes).
await rejects(
	{
		blockSlug: 'post-carousel',
		slides: [ { title: 'Static slide not allowed' } ],
	},
	'WP_Query'
);
await rejects(
	{
		blockSlug: 'post-carousel',
		layout: { mode: 'slider' },
	},
	'no slider mode'
);
await rejects(
	{
		blockSlug: 'post-carousel',
		layout: { effect: 'fade' },
	},
	'fade'
);
await rejects(
	{
		blockSlug: 'base',
	},
	'slides'
);

const postCarousel = await generate( {
	blockSlug: 'post-carousel',
	layout: {
		columns: { Desktop: 3, Tablet: 2, Mobile: 1 },
		gap: 20,
		effect: 'coverflow',
		autoplay: true,
		navigation: true,
		pagination: true,
	},
	attributes: {
		postType: 'post',
		postsPerPage: { Desktop: 6, Tablet: 6, Mobile: 6 },
		postTaxonomyDisplay: 'both',
	},
} );
if (
	! postCarousel.markup.startsWith( '<!-- wp:gslider-blocks/post-carousel ' )
) {
	fail( `post-carousel comment mismatch: ${ postCarousel.markup }` );
}
if ( ! postCarousel.markup.endsWith( '/-->' ) ) {
	fail(
		`dynamic post-carousel save() => null should serialize as self-closing block delimiter: ${ postCarousel.markup }`
	);
}
if ( ! /^gslider-post-carousel-[a-f0-9]{8}$/.test( postCarousel.blockId ) ) {
	fail( `post-carousel blockId ${ postCarousel.blockId }` );
}
if (
	! postCarousel.validation.isValid ||
	postCarousel.validation.issues.length !== 0
) {
	fail( 'post-carousel validation failed' );
}
const postCarouselBundled = loadBundledBlock( 'post-carousel' );
const postCarouselDefaults = attributeDefaults(
	postCarouselBundled.attributes
);
if (
	postCarousel.attributes.blockStyle !==
	postCarouselBundled.styling( {
		...postCarouselDefaults,
		...postCarousel.attributes,
	} )
) {
	fail( 'post-carousel blockStyle does not match styling()' );
}
const postValid = await handleValidateBlock( { markup: postCarousel.markup } );
const postValidReport = JSON.parse( postValid.content[ 0 ].text );
if (
	postValid.isError ||
	! postValidReport.isValid ||
	postValidReport.warnings.length !== 0
) {
	fail(
		`post-carousel markup did not validate cleanly: ${ postValid.content[ 0 ].text }`
	);
}
const postBadEffect = await handleValidateBlock( {
	blockSlug: 'post-carousel',
	attributes: {
		blockId: 'gslider-post-carousel-abcd1234',
		carouselEffect: 'cube',
	},
} );
if ( ! postBadEffect.content[ 0 ].text.includes( 'cube' ) ) {
	fail(
		`post-carousel validate did not report cube effect: ${ postBadEffect.content[ 0 ].text }`
	);
}

const postTemplates = listTemplates().filter(
	( tpl ) => tpl.blockSlug === 'post-carousel'
);
if ( postTemplates.length < 2 ) {
	fail(
		`expected at least 2 post-carousel templates, found ${ postTemplates.length }`
	);
}
for ( const tpl of postTemplates ) {
	const tplValid = await handleValidateBlock( {
		blockSlug: 'post-carousel',
		attributes: {
			...tpl.data,
			blockId: 'gslider-post-carousel-1234abcd',
		},
	} );
	const tplReport = JSON.parse( tplValid.content[ 0 ].text );
	if ( ! tplReport.isValid || tplReport.errors.length !== 0 ) {
		fail(
			`post-carousel template ${ tpl.uri } failed attribute validation: ${ tplValid.content[ 0 ].text }`
		);
	}
}
console.log( 'ok post-carousel' );

if ( failed ) {
	process.exit( 1 );
}
console.log( 'generate tests passed' );
