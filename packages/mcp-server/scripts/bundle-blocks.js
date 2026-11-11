/* eslint-disable no-console */
/**
 * Bundles each block's attributes, save, deprecated, and styling into
 * dist/blocks/<slug>.cjs so the MCP server can run the real block code
 * without the plugin source at runtime.
 *
 * The bundles externalize @wordpress/* and react, which the server loads
 * after the jsdom window is in place.
 */
import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const packageDir = path.resolve( __dirname, '..' );
const rootDir = path.resolve( packageDir, '../..' );

// Flexi Content is out of scope for the generator, so it is not bundled.
export const BLOCK_SLUGS = [
	'base',
	'testimonial',
	'image-slider',
	'logo-carousel',
	'post-carousel',
	'flexi-content',
	'flexi-content-item',
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

export async function bundleBlock( slug ) {
	const dir = path.join( rootDir, 'src/blocks', slug );
	if ( ! fs.existsSync( path.join( dir, 'attributes.js' ) ) ) {
		throw new Error( `No attributes.js for block: ${ slug }` );
	}
	const hasDeprecated = fs.existsSync( path.join( dir, 'deprecated.js' ) );
	const hasStyling = fs.existsSync( path.join( dir, 'styling.js' ) );
	const entry = `
    export { default as meta } from './block.json';
    export { default as attributes } from './attributes.js';
    export { default as save } from './save.js';
    ${
		hasStyling
			? "export { default as styling } from './styling.js';"
			: 'export const styling = () => "";'
	}
    ${
		hasDeprecated
			? "export { default as deprecated } from './deprecated.js';"
			: 'export const deprecated = [];'
	}
  `;

	const result = await esbuild.build( {
		stdin: {
			contents: entry,
			resolveDir: dir,
			sourcefile: `${ slug }-entry.js`,
			loader: 'js',
		},
		bundle: true,
		write: false,
		format: 'cjs',
		platform: 'node',
		loader: { '.js': 'jsx' },
		jsx: 'automatic',
		jsxImportSource: 'react',
		alias: aliases,
		external: [ '@wordpress/*', 'react', 'react/*' ],
		logLevel: 'silent',
	} );

	return result.outputFiles[ 0 ].text;
}

async function main() {
	const outDir = path.join( packageDir, 'dist/blocks' );
	fs.mkdirSync( outDir, { recursive: true } );
	for ( const slug of BLOCK_SLUGS ) {
		const code = await bundleBlock( slug );
		fs.writeFileSync( path.join( outDir, `${ slug }.cjs` ), code );
		console.error( `bundled ${ slug }: ${ code.length } bytes` );
	}
}

if (
	process.argv[ 1 ] &&
	path.resolve( process.argv[ 1 ] ) === fileURLToPath( import.meta.url )
) {
	main().catch( ( error ) => {
		console.error( error );
		process.exit( 1 );
	} );
}
