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

function effectIn( markup ) {
	const match = markup.match( /data-swiper-settings="([^"]*)"/ );
	if ( ! match ) {
		fail( 'markup has no data-swiper-settings attribute' );
	}
	const decoded = match[ 1 ]
		.replace( /&quot;/g, '"' )
		.replace( /&amp;/g, '&' );
	return JSON.parse( decoded ).effect;
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

if ( failed ) {
	process.exit( 1 );
}
console.log( 'generate tests passed' );
