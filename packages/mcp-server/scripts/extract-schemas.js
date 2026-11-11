/* eslint-disable no-console */
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
	'post-carousel',
	'base',
];

const aliases = {
	'@Components': path.join( rootDir, 'src/components' ),
	'@Utils': path.join( rootDir, 'src/utils' ),
	'@Constants': path.join( rootDir, 'src/constants' ),
	'@Blocks': path.join( rootDir, 'src/blocks' ),
	'@Controls': path.join( rootDir, 'blocks-config/gslider-controls' ),
	'@Store': path.join( rootDir, 'src/store' ),
	'@Attributes': path.join( rootDir, 'blocks-config/blocks-attributes' ),
};

async function extractBlockAttributes( slug ) {
	const attrPath = path.resolve(
		rootDir,
		'src/blocks',
		slug,
		'attributes.js'
	);
	if ( ! fs.existsSync( attrPath ) ) {
		throw new Error(
			`Attributes file not found for slug: ${ slug } at ${ attrPath }`
		);
	}

	const result = await esbuild.build( {
		entryPoints: [ attrPath ],
		bundle: true,
		write: false,
		format: 'cjs',
		platform: 'node',
		loader: { '.js': 'jsx' },
		alias: aliases,
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

async function extractBlockJson( slug ) {
	const jsonPath = path.resolve( rootDir, 'src/blocks', slug, 'block.json' );
	if ( ! fs.existsSync( jsonPath ) ) {
		return { name: `gslider-blocks/${ slug }`, title: slug };
	}
	return JSON.parse( fs.readFileSync( jsonPath, 'utf8' ) );
}

async function extractPresets( slug ) {
	const presetPath = path.resolve( rootDir, 'src/blocks', slug, 'preset.js' );
	if ( ! fs.existsSync( presetPath ) ) {
		return [];
	}

	const result = await esbuild.build( {
		entryPoints: [ presetPath ],
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
	fn( { createElement: () => null }, mod, mod.exports, () => ( {
		__: ( s ) => ( typeof s === 'string' ? s : '' ),
		Dashicon: () => null,
	} ) );

	return Object.keys( mod.exports.presetStyles || {} );
}

async function loadConstants() {
	const constantsPath = path.resolve( rootDir, 'src/constants/index.js' );
	const result = await esbuild.build( {
		entryPoints: [ constantsPath ],
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
	fn( { createElement: () => null }, mod, mod.exports, () => ( {
		__: ( s ) => ( typeof s === 'string' ? s : '' ),
		Dashicon: () => null,
	} ) );

	return mod.exports;
}

function optionValues( options ) {
	return Array.isArray( options ) ? options.map( ( o ) => o?.value ) : [];
}

// Skips a string, template literal, or comment starting at i; returns the index after it, or -1.
function skipNonCode( source, i ) {
	const ch = source[ i ];
	if ( ch === '"' || ch === "'" || ch === '`' ) {
		for ( let j = i + 1; j < source.length; j++ ) {
			if ( source[ j ] === '\\' ) {
				j++;
			} else if ( source[ j ] === ch ) {
				return j + 1;
			}
		}
		return source.length;
	}
	if ( ch === '/' && source[ i + 1 ] === '/' ) {
		const end = source.indexOf( '\n', i );
		return end === -1 ? source.length : end;
	}
	if ( ch === '/' && source[ i + 1 ] === '*' ) {
		const end = source.indexOf( '*/', i + 2 );
		return end === -1 ? source.length : end + 2;
	}
	return -1;
}

// Returns the index just past the `}` that closes the `{` at openIndex.
function findClosingBrace( source, openIndex ) {
	let depth = 0;
	for ( let i = openIndex; i < source.length;  ) {
		const skipped = skipNonCode( source, i );
		if ( skipped !== -1 ) {
			i = skipped;
			continue;
		}
		if ( source[ i ] === '{' ) {
			depth++;
		}
		if ( source[ i ] === '}' && --depth === 0 ) {
			return i + 1;
		}
		i++;
	}
	return source.length;
}

// Returns the index just past the `>` or `/>` that ends the JSX opening tag at start.
function findTagEnd( source, start ) {
	for ( let i = start + 1; i < source.length;  ) {
		const ch = source[ i ];
		if ( ch === '{' ) {
			i = findClosingBrace( source, i );
		} else if ( ch === '"' || ch === "'" ) {
			i = skipNonCode( source, i );
		} else if ( ch === '>' ) {
			return i + 1;
		} else {
			i++;
		}
	}
	return source.length;
}

// Finds the JSX opening tag that contains index, skipping nested elements in earlier props.
function findEnclosingTag( source, index ) {
	const starts = [];
	const re = /<[A-Z][\w.]*\b/g;
	let m;
	while ( ( m = re.exec( source ) ) && m.index < index ) {
		starts.push( m.index );
	}
	for ( let k = starts.length - 1; k >= 0; k-- ) {
		const end = findTagEnd( source, starts[ k ] );
		if ( end > index ) {
			return source.slice( starts[ k ], end );
		}
	}
	return null;
}

function extractLocalOptionArrays( source ) {
	const map = {};
	const declRe =
		/(?:^|\n)\s*(?:export\s+)?const\s+([A-Z][A-Z0-9_]*)\s*=\s*\[/g;
	let m;
	while ( ( m = declRe.exec( source ) ) ) {
		const name = m[ 1 ];
		const openBracket = m.index + m[ 0 ].length - 1;
		let depth = 0;
		let endIndex = source.length;
		for ( let i = openBracket; i < source.length;  ) {
			const skipped = skipNonCode( source, i );
			if ( skipped !== -1 ) {
				i = skipped;
				continue;
			}
			if ( source[ i ] === '[' ) {
				depth++;
			} else if ( source[ i ] === ']' && --depth === 0 ) {
				endIndex = i + 1;
				break;
			}
			i++;
		}
		const values = [
			...source
				.slice( openBracket, endIndex )
				.matchAll( /\bvalue:\s*(['"])(.*?)\1/g ),
		].map( ( v ) => v[ 2 ] );
		if ( values.length ) {
			map[ name ] = values;
		}
	}
	return map;
}

function collectInspectorFiles( slug ) {
	const blockDir = path.resolve( rootDir, 'src/blocks', slug );
	const files = [];
	const mainInspector = path.join( blockDir, 'inspector.js' );
	if ( fs.existsSync( mainInspector ) ) {
		files.push( { rel: 'inspector.js', abs: mainInspector } );
	}
	const inspectorDir = path.join( blockDir, 'inspector' );
	if (
		fs.existsSync( inspectorDir ) &&
		fs.statSync( inspectorDir ).isDirectory()
	) {
		const walk = ( dir ) => {
			for ( const entry of fs
				.readdirSync( dir, { withFileTypes: true } )
				.sort( ( a, b ) => a.name.localeCompare( b.name ) ) ) {
				const full = path.join( dir, entry.name );
				if ( entry.isDirectory() ) {
					walk( full );
				} else if ( entry.isFile() && entry.name.endsWith( '.js' ) ) {
					files.push( {
						rel: path.relative( blockDir, full ),
						abs: full,
					} );
				}
			}
		};
		walk( inspectorDir );
	}
	return files;
}

function resolveOptions( expression, constants, localOptions = {} ) {
	const expr = expression.trim();
	if ( /^[A-Z][A-Z0-9_]*$/.test( expr ) ) {
		if ( Array.isArray( constants[ expr ] ) ) {
			return optionValues( constants[ expr ] );
		}
		if ( Array.isArray( localOptions[ expr ] ) ) {
			return localOptions[ expr ];
		}
		return null;
	}
	if ( expr.startsWith( '[' ) && expr.endsWith( ']' ) ) {
		const values = [ ...expr.matchAll( /\bvalue:\s*(['"])(.*?)\1/g ) ].map(
			( v ) => v[ 2 ]
		);
		return values.length ? values : null;
	}
	return null;
}

/**
 * Reads every `options={...}` control in the block's inspector.js (and split inspector/ modules)
 * and maps the attribute it writes through setAttributes to the option values it offers.
 *
 * @param {string} slug      - Block directory slug.
 * @param {Object} rawAttrs  - Raw parsed block attributes map.
 * @param {Object} constants - Shared block constants map.
 * @return {Object} Allowed values map keyed by attribute name.
 */
function extractAllowedValues( slug, rawAttrs, constants ) {
	const files = collectInspectorFiles( slug );
	if ( files.length === 0 ) {
		return {};
	}

	const allowed = {};
	const unresolved = [];
	const re = /\boptions=\{/g;

	for ( const { rel, abs } of files ) {
		const source = fs.readFileSync( abs, 'utf8' );
		const localOptions = extractLocalOptionArrays( source );
		let m;
		re.lastIndex = 0;
		while ( ( m = re.exec( source ) ) ) {
			const line = source.slice( 0, m.index ).split( '\n' ).length;
			const openIndex = m.index + m[ 0 ].length - 1;
			const values = resolveOptions(
				source.slice(
					openIndex + 1,
					findClosingBrace( source, openIndex ) - 1
				),
				constants,
				localOptions
			);
			const tag = findEnclosingTag( source, m.index );
			const keys = new Set(
				[
					...( tag || '' ).matchAll(
						/setAttributes\(\s*\{\s*(\w+)\s*:/g
					),
				]
					.map( ( k ) => k[ 1 ] )
					.filter( ( k ) =>
						Object.prototype.hasOwnProperty.call( rawAttrs, k )
					)
			);

			if ( ! values || keys.size !== 1 ) {
				unresolved.push( `${ rel }:${ line }` );
				continue;
			}

			const [ key ] = keys;
			if (
				allowed[ key ] &&
				! isDeepStrictEqual( allowed[ key ], values )
			) {
				throw new Error(
					`"${ slug }" attribute "${ key }" has different option lists in ${ rel }: ${ JSON.stringify(
						allowed[ key ]
					) } and ${ JSON.stringify( values ) } (line ${ line })`
				);
			}
			allowed[ key ] = values;
		}
	}

	if ( unresolved.length ) {
		console.warn(
			`⚠️  ${ slug }: skipped option controls with no single attribute: ${ unresolved.join(
				', '
			) }`
		);
	}

	return Object.fromEntries(
		Object.keys( allowed )
			.sort()
			.map( ( k ) => [ k, allowed[ k ] ] )
	);
}

async function resolveSlideSchema( slug, rawAttrs, slideFields, blockJson ) {
	if ( slug === 'flexi-content-item' ) {
		return {
			slideField: '',
			slideItemSchema: {
				type: 'childBlock',
				name: 'gslider-blocks/flexi-content-item',
				parent: [ 'gslider-blocks/flexi-content' ],
			},
		};
	}

	if ( slug === 'post-carousel' ) {
		return {
			slideField: '',
			slideItemSchema: {
				type: 'dynamicQuery',
				source: 'WP_Query',
				render: blockJson.render || 'file:./render.php',
				postFields: [
					'id',
					'title',
					'excerpt',
					'link',
					'date',
					'featuredImage',
					'author',
					'categories',
					'tags',
				],
			},
		};
	}

	if ( slug !== 'flexi-content' ) {
		const slideField = slideFields[ slug ];
		const slideAttr = rawAttrs[ slideField ];
		return {
			slideField,
			slideItemSchema:
				slideAttr?.items || slideAttr?.default?.[ 0 ] || {},
		};
	}

	const child = await extractBlockJson( 'flexi-content-item' );
	const name = child.name;
	const parent = Array.isArray( child.parent ) ? child.parent : [];
	if (
		name !== 'gslider-blocks/flexi-content-item' ||
		! parent.includes( 'gslider-blocks/flexi-content' )
	) {
		throw new Error(
			'flexi-content slides must be the child block gslider-blocks/flexi-content-item'
		);
	}

	return {
		slideField: name,
		slideItemSchema: {
			type: 'childBlock',
			name,
			parent,
			content: 'nested blocks',
		},
	};
}

async function generate() {
	const constantsModule = await loadConstants();
	const constants = {
		sliderEffects: optionValues( constantsModule.SLIDER_EFFECT_OPTIONS ),
		carouselEffects: optionValues(
			constantsModule.CAROUSEL_EFFECT_OPTIONS
		),
		sliderTypes: optionValues( constantsModule.SLIDER_TYPE ),
	};

	const slideFields = {
		'image-slider': 'images',
		'logo-carousel': 'logos',
		testimonial: 'sliderItems',
		base: 'sliderItems',
	};

	const srcSchemasDir = path.resolve( __dirname, '../src/core/schemas' );
	const distSchemasDir = path.resolve( __dirname, '../dist/core/schemas' );

	fs.mkdirSync( srcSchemasDir, { recursive: true } );
	fs.mkdirSync( distSchemasDir, { recursive: true } );

	for ( const slug of BLOCK_SLUGS ) {
		const rawAttrs = await extractBlockAttributes( slug );
		const blockJson = await extractBlockJson( slug );
		const presets = await extractPresets( slug );

		const hasSliderType = slug in rawAttrs && 'sliderType' in rawAttrs;
		const allowedEffects = {};
		if ( slug !== 'flexi-content-item' ) {
			allowedEffects.carouselEffect = constants.carouselEffects;
		}
		if (
			slug !== 'flexi-content-item' &&
			( hasSliderType ||
				slug === 'base' ||
				slug === 'testimonial' ||
				slug === 'flexi-content' )
		) {
			allowedEffects.slideEffect = constants.sliderEffects;
			allowedEffects.sliderType = constants.sliderTypes;
		}

		const { slideField, slideItemSchema } = await resolveSlideSchema(
			slug,
			rawAttrs,
			slideFields,
			blockJson
		);

		const blockData = {
			slug,
			name: blockJson.name || `gslider-blocks/${ slug }`,
			title: blockJson.title || slug,
			description: blockJson.description || '',
			category: blockJson.category || 'gslider-blocks',
			...( blockJson.render ? { isDynamic: true } : {} ),
			slideField,
			presets,
			allowedEffects,
			totalAttributes: Object.keys( rawAttrs ).length,
			slideItemSchema,
			allowedValues: extractAllowedValues(
				slug,
				rawAttrs,
				constantsModule
			),
			attributes: rawAttrs,
		};

		const outSrcFile = path.resolve( srcSchemasDir, `${ slug }.json` );
		const outDistFile = path.resolve( distSchemasDir, `${ slug }.json` );

		fs.writeFileSync(
			outSrcFile,
			JSON.stringify( blockData, null, 2 ),
			'utf8'
		);
		fs.writeFileSync(
			outDistFile,
			JSON.stringify( blockData, null, 2 ),
			'utf8'
		);

		console.log(
			`✅ Extracted block: ${ slug } (${ blockData.totalAttributes } attributes) -> schemas/${ slug }.json`
		);
	}
}

generate().catch( ( err ) => {
	console.error( 'Fatal error in schema extraction:', err );
	process.exit( 1 );
} );
