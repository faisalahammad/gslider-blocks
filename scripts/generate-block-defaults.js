/* eslint-disable no-console */
/**
 * Writes one PHP defaults file per GSlider block to includes/RestApi/defaults/.
 *
 * Each file returns `attribute name => default value` for one block, the same
 * way wp-scripts writes `index.asset.php`. BlockParser loads only the file for
 * the block it is normalizing.
 *
 * Source: the MCP block schemas in packages/mcp-server/src/core/schemas, which
 * are extracted from each block's attributes.js. Attributes without a default
 * are left out, as Gutenberg does.
 *
 * Run with `npm run defaults:generate`. `npm run build` runs it too.
 */
const fs = require( 'fs' );
const path = require( 'path' );

const rootDir = path.resolve( __dirname, '..' );
const schemasDir = path.join( rootDir, 'packages/mcp-server/src/core/schemas' );
const outDir = path.join( rootDir, 'includes/RestApi/defaults' );

const BLOCK_SLUGS = [
	'base',
	'testimonial',
	'image-slider',
	'logo-carousel',
	'flexi-content',
	'post-carousel',
];

const phpString = ( value ) =>
	`'${ value.replace( /\\/g, '\\\\' ).replace( /'/g, "\\'" ) }'`;

function toPhp( value, depth ) {
	if ( value === null || value === undefined ) {
		return 'null';
	}
	if ( typeof value === 'boolean' ) {
		return value ? 'true' : 'false';
	}
	if ( typeof value === 'number' ) {
		if ( ! Number.isFinite( value ) ) {
			throw new Error(
				`Cannot write non-finite number ${ value } as a PHP default.`
			);
		}
		return String( value );
	}
	if ( typeof value === 'string' ) {
		return phpString( value );
	}

	const entries = Array.isArray( value )
		? value.map( ( item ) => [ null, item ] )
		: Object.entries( value );
	if ( entries.length === 0 ) {
		return '[]';
	}

	const pad = '\t'.repeat( depth + 1 );
	const lines = entries.map( ( [ key, item ] ) => {
		const prefix = key === null ? '' : `${ phpString( key ) } => `;
		return `${ pad }${ prefix }${ toPhp( item, depth + 1 ) },`;
	} );

	return `[\n${ lines.join( '\n' ) }\n${ '\t'.repeat( depth ) }]`;
}

function fileHeader( slug, blockName ) {
	return `<?php
/**
 * Default attribute values for the ${ blockName } block.
 *
 * GENERATED FILE. DO NOT EDIT BY HAND. Edit src/blocks/${ slug }/attributes.js,
 * then run \`npm run mcp:build\` and \`npm run defaults:generate\`
 * (\`npm run build\` runs the second one too).
 *
 * Why it exists: Gutenberg leaves an attribute out of the block comment while
 * it equals its default, and this block's block.json declares no attributes,
 * so PHP cannot know those values. BlockParser::attribute_defaults() loads this
 * file, and BlockParser::normalize_block() fills every omitted attribute from
 * it, so the REST \`attrs\` and \`slides\` match what the editor renders.
 *
 * How it is made: scripts/generate-block-defaults.js reads
 * packages/mcp-server/src/core/schemas/${ slug }.json, which is extracted from
 * attributes.js, and writes each attribute's \`default\`. Attributes without a
 * default are left out. tests/phpunit/RestApi/BlockParserTest.php fails if this file and the
 * schema disagree.
 *
 * @package GSlider\\RestApi
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return `;
}

fs.mkdirSync( outDir, { recursive: true } );

for ( const slug of BLOCK_SLUGS ) {
	const schemaFile = path.join( schemasDir, `${ slug }.json` );
	if ( ! fs.existsSync( schemaFile ) ) {
		console.error(
			`Missing schema: ${ path.relative(
				rootDir,
				schemaFile
			) }. Run "npm run mcp:build" first.`
		);
		process.exit( 1 );
	}

	const schema = JSON.parse( fs.readFileSync( schemaFile, 'utf8' ) );
	const blockName = schema.name || `gslider-blocks/${ slug }`;
	const defaults = {};

	for ( const [ name, definition ] of Object.entries(
		schema.attributes || {}
	) ) {
		if (
			definition &&
			Object.prototype.hasOwnProperty.call( definition, 'default' )
		) {
			defaults[ name ] = definition.default;
		}
	}

	const outFile = path.join( outDir, `${ slug }.php` );
	fs.writeFileSync(
		outFile,
		`${ fileHeader( slug, blockName ) }${ toPhp( defaults, 0 ) };\n`,
		'utf8'
	);
	console.log(
		`Wrote ${ path.relative( rootDir, outFile ) } (${
			Object.keys( defaults ).length
		} defaults).`
	);
}
