/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { prepareBlock } from '../dist/core/block-runtime.js';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const patternsDir = path.resolve( __dirname, '../../../patterns' );
const write = process.argv.includes( '--write' );

// Patterns print asset URLs from PHP. Swap them for a fake URL so the
// markup can be parsed, and swap them back when writing.
const PHP_URL = /<\?php echo esc_url(?:_raw)?\( \$(\w+) \); \?>/g;
const FAKE_URL = /https:\/\/example\.com\/pattern-asset\/(\w+)/g;
const BLOCK = /(<!-- wp:\S+ [\s\S]*? -->\n)[\s\S]*?(\n<!-- \/wp:\S+ -->)/;

let failed = false;

function render( source ) {
	const markup = source
		.slice( source.indexOf( '<!-- wp:' ) )
		.replace( PHP_URL, 'https://example.com/pattern-asset/$1' );
	if ( markup.includes( '<?php' ) ) {
		throw new Error( 'markup has PHP that is not an esc_url echo' );
	}
	return markup;
}

// @wordpress/blocks logs every validation step, keep the output readable.
function quietly( callback ) {
	const { error, warn, info } = console;
	console.error = console.warn = console.info = () => {};
	try {
		return callback();
	} finally {
		Object.assign( console, { error, warn, info } );
	}
}

function parse( source ) {
	const markup = render( source );
	const slug = markup.match( /^<!-- wp:gslider-blocks\/([\w-]+)/ )?.[ 1 ];
	if ( ! slug ) {
		throw new Error( 'pattern does not start with a gslider block' );
	}
	const { blocks } = prepareBlock( slug );
	const parsed = quietly( () => blocks.parse( markup ) ).filter(
		( block ) => block.name
	);
	if ( parsed.length !== 1 || parsed[ 0 ].innerBlocks.length ) {
		throw new Error( 'expected one top-level block with no inner blocks' );
	}
	return { blocks, block: parsed[ 0 ] };
}

function regenerate( source ) {
	const { blocks, block } = parse( source );
	const html = quietly( () =>
		blocks.getSaveContent( block.name, block.attributes )
	).replace( FAKE_URL, '<?php echo esc_url( $$$1 ); ?>' );
	if ( ! BLOCK.test( source ) ) {
		throw new Error( 'could not find the block markup to replace' );
	}
	return source.replace( BLOCK, ( match, open, close ) =>
		[ open, html, close ].join( '' )
	);
}

const files = fs
	.readdirSync( patternsDir )
	.filter( ( file ) => file.endsWith( '.php' ) )
	.sort();

if ( ! files.length ) {
	console.error( `No patterns found in ${ patternsDir }` );
	process.exit( 1 );
}

for ( const file of files ) {
	const filePath = path.join( patternsDir, file );
	try {
		let source = fs.readFileSync( filePath, 'utf8' );
		if ( write ) {
			source = regenerate( source );
			fs.writeFileSync( filePath, source );
		}
		const { blocks, block } = parse( source );
		if ( ! block.isValid ) {
			const [ format = '', ...args ] =
				block.validationIssues?.[ 0 ]?.args ?? [];
			const reason = String( format ).replace( /%[so]/g, ( token ) => {
				const arg = args.shift();
				return token === '%o' ? JSON.stringify( arg ) : String( arg );
			} );
			throw new Error(
				`invalid block ${ block.name }: ${ reason.slice( 0, 300 ) }`
			);
		}
		// A deprecation can also make the block valid, so check it matches
		// the current save() too.
		const saved = quietly( () =>
			blocks.getSaveContent( block.name, block.attributes )
		);
		if ( saved !== block.originalContent ) {
			throw new Error(
				`${ block.name } markup only matches an old save()`
			);
		}
		console.log( `ok ${ file }` );
	} catch ( error ) {
		failed = true;
		console.error( `FAIL ${ file }: ${ error.message }` );
	}
}

if ( failed ) {
	console.error(
		'Run "npm --prefix packages/mcp-server run test:patterns -- --write" to regenerate the pattern markup.'
	);
	process.exit( 1 );
}
console.log( 'pattern tests passed' );
