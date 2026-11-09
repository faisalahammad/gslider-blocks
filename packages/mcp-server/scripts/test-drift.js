/* eslint-disable no-console, eqeqeq */
import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { isDeepStrictEqual } from 'util';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const rootDir = path.resolve( __dirname, '../../..' );

const BLOCK_SLUGS = [
	'image-slider',
	'testimonial',
	'logo-carousel',
	'flexi-content',
	'flexi-content-item',
	'base',
];

async function extractBlockAttributes( slug ) {
	const attrPath = path.resolve(
		rootDir,
		'src/blocks',
		slug,
		'attributes.js'
	);
	const result = await esbuild.build( {
		entryPoints: [ attrPath ],
		bundle: true,
		write: false,
		format: 'cjs',
		platform: 'node',
		loader: { '.js': 'jsx' },
		external: [ '@wordpress/*' ],
	} );

	const code = result.outputFiles[ 0 ].text;
	const mod = { exports: {} };
	const fn = new Function( 'React', 'module', 'exports', 'require', code );
	fn( { createElement: () => null }, mod, mod.exports, ( id ) => {
		if ( id.startsWith( '@wordpress/' ) ) {
			return { __: ( s ) => ( typeof s === 'string' ? s : '' ) };
		}
		return {};
	} );

	return mod.exports.default || mod.exports;
}

export function isEmptySlideItemSchema( schema ) {
	if ( schema == null ) {
		return true;
	}
	if ( typeof schema === 'string' ) {
		return schema.trim() === '';
	}
	if ( Array.isArray( schema ) ) {
		return schema.length === 0;
	}
	if ( typeof schema === 'object' ) {
		return Object.keys( schema ).length === 0;
	}
	return false;
}

export function slideSchemaProblems( slug, block ) {
	const problems = [];
	if ( slug === 'flexi-content-item' ) {
		const schema = block?.slideItemSchema;
		if (
			schema?.type !== 'childBlock' ||
			schema?.name !== 'gslider-blocks/flexi-content-item'
		) {
			problems.push(
				`"${ slug }" must be described as the flexi-content child block`
			);
		}
		if ( block?.slideField ) {
			problems.push(
				`"${ slug }" is a child block and has no slide field`
			);
		}
		return problems;
	}
	if ( block?.slideField === 'innerBlocks' ) {
		problems.push( `"${ slug }" slideField is "innerBlocks"` );
	}
	if ( isEmptySlideItemSchema( block?.slideItemSchema ) ) {
		problems.push( `"${ slug }" slideItemSchema is empty` );
	}
	if ( slug === 'flexi-content' ) {
		const described = JSON.stringify( block?.slideItemSchema ?? null );
		if ( ! described.includes( 'gslider-blocks/flexi-content-item' ) ) {
			problems.push(
				`"${ slug }" slideItemSchema does not name gslider-blocks/flexi-content-item`
			);
		}
		if ( ! described.includes( 'nested blocks' ) ) {
			problems.push(
				`"${ slug }" slideItemSchema does not say its content is nested blocks`
			);
		}
		if (
			Object.prototype.hasOwnProperty.call(
				block?.attributes || {},
				'innerBlocks'
			)
		) {
			problems.push( `"${ slug }" attributes include "innerBlocks"` );
		}
	}
	return problems;
}

export function attributeDriftProblems( slug, liveAttrs, cachedAttrs ) {
	const problems = [];
	// Round-trip through JSON so live definitions compare like the written schema.
	const live = JSON.parse( JSON.stringify( liveAttrs || {} ) );
	const cached = cachedAttrs || {};

	for ( const key of Object.keys( live ) ) {
		if ( ! Object.prototype.hasOwnProperty.call( cached, key ) ) {
			problems.push(
				`Attribute "${ key }" in "${ slug }" is missing from the schema file.`
			);
			continue;
		}
		for ( const field of new Set( [
			...Object.keys( live[ key ] || {} ),
			...Object.keys( cached[ key ] || {} ),
		] ) ) {
			if (
				! isDeepStrictEqual(
					live[ key ]?.[ field ],
					cached[ key ]?.[ field ]
				)
			) {
				problems.push(
					`Attribute "${ key }" in "${ slug }" has a different "${ field }". Live: ${ JSON.stringify(
						live[ key ]?.[ field ]
					) }, schema: ${ JSON.stringify(
						cached[ key ]?.[ field ]
					) }.`
				);
			}
		}
	}

	for ( const key of Object.keys( cached ) ) {
		if ( ! Object.prototype.hasOwnProperty.call( live, key ) ) {
			problems.push(
				`Attribute "${ key }" in "${ slug }" is in the schema file but not in attributes.js.`
			);
		}
	}

	return problems;
}

export function allowedValuesProblems( slug, block ) {
	const problems = [];
	const allowed = block?.allowedValues;
	if (
		allowed == null ||
		typeof allowed !== 'object' ||
		Array.isArray( allowed )
	) {
		return [ `"${ slug }" allowedValues is missing` ];
	}

	const isAllowed = ( values, value ) =>
		value === '' || values.includes( value );
	for ( const [ key, values ] of Object.entries( allowed ) ) {
		const attr = block.attributes?.[ key ];
		if ( ! attr ) {
			problems.push(
				`"${ slug }" allowedValues names "${ key }", which is not an attribute`
			);
			continue;
		}
		if (
			! Array.isArray( values ) ||
			values.length === 0 ||
			! values.every( ( v ) => typeof v === 'string' )
		) {
			problems.push(
				`"${ slug }" allowedValues "${ key }" is not a non-empty list of strings`
			);
			continue;
		}
		const defaults =
			attr.type === 'object' &&
			attr.default &&
			typeof attr.default === 'object'
				? Object.values( attr.default )
				: [ attr.default ];
		for ( const value of defaults ) {
			if ( value !== undefined && ! isAllowed( values, value ) ) {
				problems.push(
					`"${ slug }" default ${ JSON.stringify(
						value
					) } of "${ key }" is not in allowedValues ${ JSON.stringify(
						values
					) }`
				);
			}
		}
	}

	for ( const [ field, values ] of Object.entries(
		block.allowedEffects || {}
	) ) {
		if (
			allowed[ field ] &&
			! isDeepStrictEqual( allowed[ field ], values )
		) {
			problems.push(
				`"${ slug }" allowedEffects.${ field } does not match allowedValues.${ field }`
			);
		}
	}

	return problems;
}

const JS_TYPE_FOR_ATTRIBUTE_TYPE = {
	string: 'string',
	number: 'number',
	integer: 'number',
	boolean: 'boolean',
};

export function defaultTypeProblems( slug, block ) {
	const problems = [];

	const checkDefault = ( name, def ) => {
		if ( ! def || typeof def !== 'object' || Array.isArray( def ) ) {
			return;
		}
		if ( def.source !== undefined ) {
			// Sourced attributes read their value from the HTML, not the comment.
			return;
		}
		if ( ! ( 'default' in def ) || def.default === undefined ) {
			return;
		}
		const expected = JS_TYPE_FOR_ATTRIBUTE_TYPE[ def.type ];
		if ( ! expected ) {
			// object/array/null-union types have no single JS type to match.
			return;
		}
		if ( typeof def.default !== expected ) {
			problems.push(
				`Attribute "${ name }" in "${ slug }" declares type "${
					def.type
				}" but its default is ${ JSON.stringify( def.default ) }`
			);
		}
	};

	for ( const [ name, def ] of Object.entries( block.attributes || {} ) ) {
		checkDefault( name, def );
		if ( def?.type === 'array' && def.items?.properties ) {
			for ( const [ propName, propDef ] of Object.entries(
				def.items.properties
			) ) {
				checkDefault( `${ name }.${ propName }`, propDef );
			}
		}
	}

	// Sample items stitched into the array default must be type-correct too.
	for ( const [ name, def ] of Object.entries( block.attributes || {} ) ) {
		if ( def?.type !== 'array' || ! Array.isArray( def.default ) ) {
			continue;
		}
		const properties = def.items?.properties || {};
		for ( const [ itemIndex, item ] of def.default.entries() ) {
			if ( ! item || typeof item !== 'object' || Array.isArray( item ) ) {
				continue;
			}
			for ( const [ propName, value ] of Object.entries( item ) ) {
				const propDef = properties[ propName ];
				if ( ! propDef ) {
					continue;
				}
				const expected = JS_TYPE_FOR_ATTRIBUTE_TYPE[ propDef.type ];
				if ( expected && typeof value !== expected ) {
					problems.push(
						`Attribute "${ name }.default[${ itemIndex }].${ propName }" in "${ slug }" declares type "${
							propDef.type
						}" but its sample value is ${ JSON.stringify( value ) }`
					);
				}
			}
		}
	}

	return problems;
}

async function runDriftCheck() {
	const schemasDir = path.resolve( __dirname, '../src/core/schemas' );
	let hasDrift = false;

	for ( const slug of BLOCK_SLUGS ) {
		const schemaFile = path.resolve( schemasDir, `${ slug }.json` );
		if ( ! fs.existsSync( schemaFile ) ) {
			console.error(
				`FAIL: Schema file missing: schemas/${ slug }.json. Run "npm run generate-schemas" first.`
			);
			hasDrift = true;
			continue;
		}

		const cachedBlock = JSON.parse( fs.readFileSync( schemaFile, 'utf8' ) );
		for ( const problem of slideSchemaProblems( slug, cachedBlock ) ) {
			console.error( `FAIL: ${ problem }.` );
			hasDrift = true;
		}

		for ( const problem of allowedValuesProblems( slug, cachedBlock ) ) {
			console.error( `FAIL: ${ problem }.` );
			hasDrift = true;
		}

		for ( const problem of defaultTypeProblems( slug, cachedBlock ) ) {
			console.error( `FAIL: ${ problem }.` );
			hasDrift = true;
		}

		const liveAttrs = await extractBlockAttributes( slug );

		for ( const problem of attributeDriftProblems(
			slug,
			liveAttrs,
			cachedBlock.attributes
		) ) {
			console.error( `FAIL: ${ problem }` );
			hasDrift = true;
		}
	}

	if ( hasDrift ) {
		console.error(
			'❌ Schema drift detected! Run "npm run generate-schemas" to re-sync.'
		);
		process.exit( 1 );
	}

	console.log(
		`✅ PASS: Zero schema drift. All ${ BLOCK_SLUGS.length } individual block schemas match source code 1:1.`
	);
}

runDriftCheck().catch( ( err ) => {
	console.error( 'Fatal test error:', err );
	process.exit( 1 );
} );
