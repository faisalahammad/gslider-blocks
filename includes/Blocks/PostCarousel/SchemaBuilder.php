<?php
/**
 * Post Carousel Google Carousel SEO Schema Builder.
 *
 * Generates Schema.org ItemList + BlogPosting JSON-LD structured data for
 * frontend Post Carousel blocks with conflict safety and filter extensibility.
 *
 * @package GSlider\Blocks\PostCarousel
 * @since   1.2.3
 */

namespace GSlider\Blocks\PostCarousel;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( SchemaBuilder::class, false ) ) {

	/**
	 * Builds ItemList + BlogPosting JSON-LD markup for Post Carousel queries.
	 *
	 * @since 1.2.3
	 */
	class SchemaBuilder {

		/**
		 * Determines whether schema markup output is enabled for the block.
		 *
		 * Defaults to `true` when `enableSchemaMarkup` is omitted or null so
		 * standard Gutenberg blocks emit structured data automatically unless
		 * explicitly disabled by the author.
		 *
		 * @since 1.2.3
		 *
		 * @param array $attributes Block attributes array.
		 * @return bool True when schema markup should be built.
		 */
		public static function is_schema_enabled( array $attributes ): bool {
			if ( ! array_key_exists( 'enableSchemaMarkup', $attributes ) || null === $attributes['enableSchemaMarkup'] ) {
				return true;
			}

			$raw = $attributes['enableSchemaMarkup'];
			if ( is_string( $raw ) ) {
				return ! in_array( strtolower( trim( $raw ) ), array( '', '0', 'false', 'no', 'off' ), true );
			}

			return (bool) $raw;
		}

		/**
		 * Builds the JSON-LD ItemList `<script type="application/ld+json">` tag.
		 *
		 * @since 1.2.3
		 *
		 * @param array      $posts      List of rendered WP_Post instances or post IDs.
		 * @param array      $attributes Raw block attributes.
		 * @param mixed|null $query      Executed WP_Query instance or null.
		 * @return string Valid `<script type="application/ld+json">` markup or empty string.
		 */
		public static function build( array $posts, array $attributes, $query = null ): string {
			if ( empty( $posts ) || ! self::is_schema_enabled( $attributes ) ) {
				return '';
			}

			$items    = array();
			$position = 1;

			foreach ( $posts as $post ) {
				$resolved = self::resolve_post_context( $post );
				if ( null === $resolved ) {
					continue;
				}

				$post_id   = $resolved['id'];
				$author_id = $resolved['author_id'];

				$permalink = get_permalink( $post_id );
				$url       = is_string( $permalink ) ? self::sanitize_schema_url( $permalink ) : '';
				if ( '' === $url ) {
					continue;
				}

				$headline       = self::sanitize_schema_text( (string) get_the_title( $post_id ) );
				$date_published = (string) get_the_date( 'c', $post_id );
				$raw_modified   = get_the_modified_date( 'c', $post_id );
				$date_modified  = is_string( $raw_modified ) && '' !== $raw_modified ? $raw_modified : $date_published;
				$author_name    = $author_id > 0
					? self::sanitize_schema_text( (string) get_the_author_meta( 'display_name', $author_id ) )
					: '';
				$raw_thumbnail  = get_the_post_thumbnail_url( $post_id, 'full' );
				$thumbnail_url  = is_string( $raw_thumbnail ) ? self::sanitize_schema_url( $raw_thumbnail ) : '';

				$item = array(
					'@type' => 'BlogPosting',
					'@id'   => self::build_schema_id( $url ),
					'url'   => $url,
				);

				if ( '' !== $headline ) {
					$item['headline'] = $headline;
				}

				if ( '' !== $date_published ) {
					$item['datePublished'] = $date_published;
				}

				if ( '' !== $date_modified ) {
					$item['dateModified'] = $date_modified;
				}

				if ( '' !== $author_name ) {
					$item['author'] = array(
						'@type' => 'Person',
						'name'  => $author_name,
					);
				}

				if ( '' !== $thumbnail_url ) {
					$item['image'] = $thumbnail_url;
				}

				$items[] = array(
					'@type'    => 'ListItem',
					'position' => $position++,
					'item'     => $item,
				);
			}

			if ( empty( $items ) ) {
				return '';
			}

			$schema_data = array(
				'@context'        => 'https://schema.org',
				'@type'           => 'ItemList',
				'itemListElement' => $items,
			);

			/**
			 * Filters the JSON-LD ItemList schema payload for the Post Carousel block.
			 *
			 * Returning `false`, an empty value, or a non-array suppresses schema
			 * output so SEO integrations or themes can customize or disable markup
			 * without modifying plugin code.
			 *
			 * @since 1.2.3
			 *
			 * @param array      $schema_data Schema.org ItemList payload.
			 * @param array      $attributes  Raw block attributes.
			 * @param mixed|null $query       Executed WP_Query instance or null.
			 */
			$schema_data = apply_filters( 'gslider_post_carousel_schema_data', $schema_data, $attributes, $query );

			if ( empty( $schema_data ) || ! is_array( $schema_data ) ) {
				return '';
			}

			$json = wp_json_encode( $schema_data, JSON_HEX_TAG | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
			if ( ! is_string( $json ) || '' === $json ) {
				return '';
			}

			return sprintf(
				'<script type="application/ld+json">%s</script>',
				$json
			);
		}

		/**
		 * Resolves post ID and author ID from a WP_Post instance or numeric ID.
		 *
		 * @since 1.2.3
		 *
		 * @param mixed $post Candidate post object or post ID.
		 * @return array{id: int, author_id: int}|null Resolved IDs or null if invalid.
		 */
		private static function resolve_post_context( $post ): ?array {
			$post_id   = 0;
			$author_id = 0;

			if ( is_object( $post ) && isset( $post->ID ) ) {
				$post_id   = (int) $post->ID;
				$author_id = isset( $post->post_author ) ? (int) $post->post_author : 0;
			} elseif ( is_numeric( $post ) ) {
				$numeric_id = (int) $post;
				if ( $numeric_id > 0 ) {
					$post_obj  = function_exists( 'get_post' ) ? get_post( $numeric_id ) : null;
					$post_id   = is_object( $post_obj ) && isset( $post_obj->ID ) ? (int) $post_obj->ID : $numeric_id;
					$author_id = is_object( $post_obj ) && isset( $post_obj->post_author ) ? (int) $post_obj->post_author : 0;
				}
			}

			if ( $post_id <= 0 ) {
				return null;
			}

			return array(
				'id'        => $post_id,
				'author_id' => max( 0, $author_id ),
			);
		}

		/**
		 * Sanitizes plain text values for JSON-LD output without HTML entity artifacts.
		 *
		 * @since 1.2.3
		 *
		 * @param string $text Raw post title or author name.
		 * @return string Clean plain-text value ready for JSON encoding.
		 */
		private static function sanitize_schema_text( string $text ): string {
			$stripped = wp_strip_all_tags( $text );
			$decoded  = html_entity_decode( $stripped, ENT_QUOTES | ENT_HTML5, 'UTF-8' );
			return trim( wp_strip_all_tags( $decoded ) );
		}

		/**
		 * Validates HTTP(S) URLs for JSON-LD fields without HTML entity encoding.
		 *
		 * @since 1.2.3
		 *
		 * @param string $url Raw URL candidate.
		 * @return string Sanitized absolute HTTP(S) URL or empty string.
		 */
		private static function sanitize_schema_url( string $url ): string {
			$trimmed = trim( $url );
			if ( '' === $trimmed ) {
				return '';
			}

			$clean  = esc_url_raw( $trimmed, array( 'http', 'https' ) );
			$scheme = wp_parse_url( $clean, PHP_URL_SCHEME );
			if ( ! is_string( $scheme ) || ! in_array( strtolower( $scheme ), array( 'http', 'https' ), true ) ) {
				return '';
			}

			return $clean;
		}

		/**
		 * Appends a deterministic node fragment so BlogPosting @id never collides with WebPage @id.
		 *
		 * @since 1.2.3
		 *
		 * @param string $url Sanitized canonical post permalink.
		 * @return string Fragment-scoped BlogPosting JSON-LD `@id`.
		 */
		private static function build_schema_id( string $url ): string {
			$base = preg_replace( '/#.*$/', '', $url );
			return ( is_string( $base ) && '' !== $base ? $base : $url ) . '#gslider-blogposting';
		}
	}
}
