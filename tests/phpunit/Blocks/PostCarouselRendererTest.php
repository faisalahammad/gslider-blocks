<?php
/**
 * Unit tests for GSlider\Blocks\PostCarousel\* (PostCarouselRenderer, CardMarkupBuilder, NavigationBuilder).
 *
 * Verifies that:
 * 1. PSR-4 classes exist cleanly and PostCarouselRenderer::render() returns empty string on empty queries.
 * 2. Query bounds (postsPerPage [1, 30], offset [0, 100]), sticky-post overflow slicing, and exclude/only modes work cleanly.
 * 3. Validation & security fallbacks reject unsafe HTML tags, unviewable post types, invalid orderby/order/metaCompare, and meta sorting in related mode.
 * 4. Related Posts query builds category, tag, combined OR, empty-term [0] guard, and post__not_in exclusions accurately.
 * 5. XSS payloads (`javascript:` hrefs, `<script>`/`onclick` inside Read More & custom Nav SVG) are stripped and inside/outside placement classes match.
 * 6. Card content elements, contentOrder, excerpt sources/limits, avatar lazy-loading/placeholder SVG fallback, and removal of global `$gslider_first_image_optimized` LCP state render cleanly.
 * 7. Thin `src/blocks/post-carousel/render.php` bootstrap delegates directly to `PostCarouselRenderer::render()`.
 * 8. Wave 3 unified `.gslider-post-carousel-body`, `has-equal-height`, fallback thumbnail/SVG/XSS guard, and clickable card links render with zero nested `<a>` tags.
 * 9. Wave 4 Core Layout Presets (`classic-card`, `modern-overlay`, `editorial-split`), layout mode classes, horizontal media position/no-image classes, and context clamping/sanitization.
 * 10. Wave 5a Layout Presets (`cinematic-hero`, `minimal-typo`, `spotlight-center`), spotlight Swiper settings, and scale/opacity bounds clamping.
 * 11. Wave 5b Newsroom Stage preset (`newsroom-stage`), synchronized headline queue playlist, and width/position clamping.
 *
 * @package GSlider\Tests\Blocks
 */

if ( ! function_exists( 'get_the_title' ) ) {
	/**
	 * Stub for WordPress get_the_title() supporting optional post ID or active loop post.
	 *
	 * @param int|WP_Post $post Post ID or post object.
	 * @return string Post title.
	 */
	function get_the_title( $post = 0 ) {
		if ( is_object( $post ) && isset( $post->post_title ) ) {
			return (string) $post->post_title;
		}
		$post_id = is_int( $post ) ? $post : ( is_numeric( $post ) ? (int) $post : 0 );
		if ( $post_id > 0 && ! empty( $GLOBALS['gslider_test_render_posts'] ) ) {
			foreach ( $GLOBALS['gslider_test_render_posts'] as $candidate ) {
				if ( (int) $candidate->ID === $post_id ) {
					return (string) $candidate->post_title;
				}
			}
		}
		return isset( $GLOBALS['gslider_test_current_post']->post_title )
			? (string) $GLOBALS['gslider_test_current_post']->post_title
			: '';
	}
}

if ( ! function_exists( 'esc_url' ) ) {
	/**
	 * Protocol-enforcing stub for WordPress esc_url().
	 *
	 * @param string $url URL to escape.
	 * @return string Safe URL or empty string when using a disallowed protocol.
	 */
	function esc_url( $url ) {
		$raw = trim( (string) $url );
		if ( '' === $raw ) {
			return '';
		}
		$normalized = strtolower( preg_replace( '/[\s\x00-\x1F\x7F-\x9F]+/', '', html_entity_decode( $raw, ENT_QUOTES | ENT_HTML5, 'UTF-8' ) ) );
		if ( preg_match( '/^(?:javascript|vbscript|data):/i', $normalized ) ) {
			return '';
		}
		return htmlspecialchars( $raw, ENT_QUOTES, 'UTF-8' );
	}
}

if ( ! function_exists( 'wp_kses' ) ) {
	/**
	 * Minimal DOM-based wp_kses stub for testing SVG/HTML attribute and tag allowlists.
	 *
	 * @param string $string       Content to filter through KSES.
	 * @param array  $allowed_html Allowed tags and lowercase attribute flags.
	 * @return string Filtered HTML/SVG markup.
	 */
	function wp_kses( $string, $allowed_html ) {
		if ( ! is_string( $string ) || '' === $string ) {
			return '';
		}

		$normalized_allowed = array();
		if ( is_array( $allowed_html ) ) {
			foreach ( $allowed_html as $tag => $attrs ) {
				$tag_lower                        = strtolower( (string) $tag );
				$normalized_allowed[ $tag_lower ] = array();
				if ( is_array( $attrs ) ) {
					foreach ( $attrs as $attr => $enabled ) {
						$normalized_allowed[ $tag_lower ][ strtolower( (string) $attr ) ] = (bool) $enabled;
					}
				}
			}
		}

		$previous_errors = libxml_use_internal_errors( true );
		$doc             = new DOMDocument();
		$wrapped         = '<?xml encoding="utf-8" ?><div id="__gslider_kses_root__">' . $string . '</div>';
		$loaded          = $doc->loadHTML( $wrapped, LIBXML_NONET | LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR | LIBXML_NOWARNING );
		libxml_clear_errors();
		libxml_use_internal_errors( $previous_errors );

		if ( ! $loaded ) {
			return '';
		}

		$root = null;
		foreach ( $doc->childNodes as $child ) {
			if ( $child instanceof DOMElement && '__gslider_kses_root__' === $child->getAttribute( 'id' ) ) {
				$root = $child;
				break;
			}
		}

		if ( ! $root ) {
			return '';
		}

		$filter_node = static function ( DOMNode $node ) use ( &$filter_node, $doc, $normalized_allowed ): void {
			$children = array();
			foreach ( $node->childNodes as $child ) {
				$children[] = $child;
			}
			foreach ( $children as $child ) {
				$filter_node( $child );
			}

			if ( $node instanceof DOMComment ) {
				if ( $node->parentNode ) {
					$node->parentNode->removeChild( $node );
				}
				return;
			}

			if ( ! ( $node instanceof DOMElement ) ) {
				return;
			}

			if ( '__gslider_kses_root__' === $node->getAttribute( 'id' ) ) {
				return;
			}

			$tag = strtolower( $node->nodeName );
			if ( ! isset( $normalized_allowed[ $tag ] ) ) {
				if ( $node->parentNode ) {
					while ( $node->firstChild ) {
						$node->parentNode->insertBefore( $node->firstChild, $node );
					}
					$node->parentNode->removeChild( $node );
				}
				return;
			}

			$allowed_attrs = $normalized_allowed[ $tag ];
			$clean_element = $doc->createElement( $tag );

			foreach ( $node->attributes as $attribute ) {
				$attr_lower = strtolower( $attribute->nodeName );
				if ( empty( $allowed_attrs[ $attr_lower ] ) ) {
					continue;
				}
				$clean_element->setAttribute( $attr_lower, (string) $attribute->nodeValue );
			}

			while ( $node->firstChild ) {
				$clean_element->appendChild( $node->firstChild );
			}

			if ( $node->parentNode ) {
				$node->parentNode->replaceChild( $clean_element, $node );
			}
		};

		$filter_node( $root );

		$output = '';
		foreach ( $root->childNodes as $child ) {
			$output .= $doc->saveHTML( $child );
		}

		return $output;
	}
}

require_once dirname( __DIR__ ) . '/bootstrap.php';

// Test state globals for standalone render verification.
$GLOBALS['gslider_test_render_posts']           = array();
$GLOBALS['gslider_test_current_post']           = null;
$GLOBALS['gslider_test_current_page_id']        = 500;
$GLOBALS['gslider_test_current_page_post_type'] = 'post';
$GLOBALS['gslider_test_post_categories']        = array();
$GLOBALS['gslider_test_post_tags']              = array();
$GLOBALS['gslider_test_related_cats']           = array();
$GLOBALS['gslider_test_related_tags']           = array();
$GLOBALS['gslider_test_post_thumbnails']        = array();
$GLOBALS['gslider_test_post_thumbnail_urls']    = array();
$GLOBALS['gslider_test_post_excerpts']          = array();
$GLOBALS['gslider_test_avatar_urls']            = array();
$GLOBALS['gslider_test_author_names']           = array();
$GLOBALS['gslider_test_last_query_args']        = null;
$GLOBALS['gslider_test_sticky_overflow']        = 0;

if ( ! function_exists( 'sanitize_html_class' ) ) {
	/**
	 * Stub for WordPress sanitize_html_class().
	 *
	 * @param string $classname Raw CSS class name.
	 * @param string $fallback  Fallback class name.
	 * @return string Sanitized class name.
	 */
	function sanitize_html_class( $classname, $fallback = '' ) {
		$sanitized = preg_replace( '|%[a-fA-F0-9][a-fA-F0-9]|', '', (string) $classname );
		$sanitized = preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $sanitized );
		if ( '' === $sanitized && '' !== $fallback ) {
			return sanitize_html_class( $fallback );
		}
		return (string) $sanitized;
	}
}

if ( ! function_exists( 'wp_json_encode' ) ) {
	/**
	 * Stub for WordPress wp_json_encode().
	 *
	 * @param mixed $data    Data to encode.
	 * @param int   $options JSON flags.
	 * @param int   $depth   Max depth.
	 * @return string|false Encoded JSON string.
	 */
	function wp_json_encode( $data, $options = 0, $depth = 512 ) {
		return json_encode( $data, $options, $depth );
	}
}

if ( ! function_exists( 'post_type_exists' ) ) {
	/**
	 * Stub for WordPress post_type_exists().
	 *
	 * @param string $post_type Post type slug.
	 * @return bool
	 */
	function post_type_exists( $post_type ) {
		return in_array( $post_type, array( 'post', 'page', 'portfolio', 'internal_secret' ), true );
	}
}

if ( ! function_exists( 'is_post_type_viewable' ) ) {
	/**
	 * Stub for WordPress is_post_type_viewable().
	 *
	 * @param string $post_type Post type slug.
	 * @return bool
	 */
	function is_post_type_viewable( $post_type ) {
		return in_array( $post_type, array( 'post', 'page', 'portfolio' ), true );
	}
}

if ( ! function_exists( 'get_the_ID' ) ) {
	/**
	 * Stub for WordPress get_the_ID().
	 *
	 * @return int Active loop post ID or current singular post ID.
	 */
	function get_the_ID() {
		return $GLOBALS['gslider_test_current_post']
			? (int) $GLOBALS['gslider_test_current_post']->ID
			: (int) $GLOBALS['gslider_test_current_page_id'];
	}
}

if ( ! function_exists( 'get_post_type' ) ) {
	/**
	 * Stub for WordPress get_post_type().
	 *
	 * @param mixed $post Optional post ID/object.
	 * @return string Post type slug.
	 */
	function get_post_type( $post = null ) {
		unset( $post );
		return (string) $GLOBALS['gslider_test_current_page_post_type'];
	}
}

if ( ! function_exists( 'wp_get_post_categories' ) ) {
	/**
	 * Stub for WordPress wp_get_post_categories().
	 *
	 * @param int   $post_id Post ID.
	 * @param array $args    Query args.
	 * @return int[] Category term IDs.
	 */
	function wp_get_post_categories( $post_id = 0, $args = array() ) {
		unset( $args );
		return $GLOBALS['gslider_test_related_cats'][ $post_id ] ?? array();
	}
}

if ( ! function_exists( 'wp_get_post_terms' ) ) {
	/**
	 * Stub for WordPress wp_get_post_terms().
	 *
	 * @param int    $post_id  Post ID.
	 * @param string $taxonomy Taxonomy slug.
	 * @param array  $args     Query args.
	 * @return int[] Tag term IDs.
	 */
	function wp_get_post_terms( $post_id = 0, $taxonomy = 'post_tag', $args = array() ) {
		unset( $taxonomy, $args );
		return $GLOBALS['gslider_test_related_tags'][ $post_id ] ?? array();
	}
}

if ( ! function_exists( 'is_wp_error' ) ) {
	/**
	 * Stub for WordPress is_wp_error().
	 *
	 * @param mixed $thing Candidate value.
	 * @return bool
	 */
	function is_wp_error( $thing ) {
		return $thing instanceof WP_Error;
	}
}

if ( ! function_exists( 'wp_reset_postdata' ) ) {
	/**
	 * Stub for WordPress wp_reset_postdata().
	 *
	 * @return void
	 */
	function wp_reset_postdata() {
		$GLOBALS['gslider_test_current_post'] = null;
	}
}

if ( ! function_exists( 'get_block_wrapper_attributes' ) ) {
	/**
	 * Stub for WordPress get_block_wrapper_attributes().
	 *
	 * @param array $extra_attributes Wrapper attribute map.
	 * @return string Serialized attributes string.
	 */
	function get_block_wrapper_attributes( $extra_attributes = array() ) {
		$attrs = array();
		foreach ( $extra_attributes as $k => $v ) {
			$attrs[] = $k . '="' . esc_attr( (string) $v ) . '"';
		}
		return implode( ' ', $attrs );
	}
}

if ( ! function_exists( 'esc_attr_e' ) ) {
	/**
	 * Stub for WordPress esc_attr_e().
	 *
	 * @param string $text   Text to translate and escape.
	 * @param string $domain Text domain.
	 * @return void
	 */
	function esc_attr_e( $text, $domain = 'default' ) {
		unset( $domain );
		echo esc_attr( $text );
	}
}

if ( ! function_exists( 'get_the_category' ) ) {
	/**
	 * Stub for WordPress get_the_category().
	 *
	 * @param int|false $id Post ID.
	 * @return array Category term objects.
	 */
	function get_the_category( $id = false ) {
		return $GLOBALS['gslider_test_post_categories'][ $id ] ?? array();
	}
}

if ( ! function_exists( 'get_category_link' ) ) {
	/**
	 * Stub for WordPress get_category_link().
	 *
	 * @param int $term_id Term ID.
	 * @return string Term archive URL.
	 */
	function get_category_link( $term_id ) {
		return 'https://example.org/category/cat-' . intval( $term_id ) . '/';
	}
}

if ( ! function_exists( 'get_the_tags' ) ) {
	/**
	 * Stub for WordPress get_the_tags().
	 *
	 * @param int $post_id Post ID.
	 * @return array Tag term objects.
	 */
	function get_the_tags( $post_id = 0 ) {
		return $GLOBALS['gslider_test_post_tags'][ $post_id ] ?? array();
	}
}

if ( ! function_exists( 'get_tag_link' ) ) {
	/**
	 * Stub for WordPress get_tag_link().
	 *
	 * @param int $term_id Term ID.
	 * @return string Tag archive URL.
	 */
	function get_tag_link( $term_id ) {
		return 'https://example.org/tag/tag-' . intval( $term_id ) . '/';
	}
}

if ( ! function_exists( 'has_excerpt' ) ) {
	/**
	 * Stub for WordPress has_excerpt().
	 *
	 * @param int $post Post ID.
	 * @return bool
	 */
	function has_excerpt( $post = 0 ) {
		return isset( $GLOBALS['gslider_test_post_excerpts'][ $post ] ) && '' !== $GLOBALS['gslider_test_post_excerpts'][ $post ];
	}
}

if ( ! function_exists( 'get_the_excerpt' ) ) {
	/**
	 * Stub for WordPress get_the_excerpt().
	 *
	 * @param int|null $post Post ID.
	 * @return string Excerpt or fallback post content.
	 */
	function get_the_excerpt( $post = null ) {
		$id = is_int( $post ) ? $post : get_the_ID();
		if ( isset( $GLOBALS['gslider_test_post_excerpts'][ $id ] ) && '' !== $GLOBALS['gslider_test_post_excerpts'][ $id ] ) {
			return (string) $GLOBALS['gslider_test_post_excerpts'][ $id ];
		}
		return isset( $GLOBALS['gslider_test_current_post']->post_content )
			? (string) $GLOBALS['gslider_test_current_post']->post_content
			: '';
	}
}

if ( ! function_exists( 'get_the_content' ) ) {
	/**
	 * Stub for WordPress get_the_content().
	 *
	 * @param string|null $more_link_text More text.
	 * @param bool        $strip_teaser   Strip teaser flag.
	 * @param int|null    $post           Post ID.
	 * @return string Post content.
	 */
	function get_the_content( $more_link_text = null, $strip_teaser = false, $post = null ) {
		unset( $more_link_text, $strip_teaser, $post );
		return isset( $GLOBALS['gslider_test_current_post']->post_content )
			? (string) $GLOBALS['gslider_test_current_post']->post_content
			: '';
	}
}

if ( ! function_exists( 'strip_shortcodes' ) ) {
	/**
	 * Stub for WordPress strip_shortcodes().
	 *
	 * @param string $content Content string.
	 * @return string Stripped string.
	 */
	function strip_shortcodes( $content ) {
		return (string) preg_replace( '/\[[^\]]+\]/', '', (string) $content );
	}
}

if ( ! function_exists( 'wp_trim_words' ) ) {
	/**
	 * Stub for WordPress wp_trim_words().
	 *
	 * @param string      $text      Source text.
	 * @param int         $num_words Word limit.
	 * @param string|null $more      Suffix string.
	 * @return string Trimmed text.
	 */
	function wp_trim_words( $text, $num_words = 55, $more = null ) {
		if ( null === $more ) {
			$more = '&hellip;';
		}
		$words = preg_split( '/[\n\r\t ]+/', trim( (string) $text ), $num_words + 1, PREG_SPLIT_NO_EMPTY );
		if ( count( $words ) > $num_words ) {
			array_pop( $words );
			return implode( ' ', $words ) . $more;
		}
		return implode( ' ', $words );
	}
}

if ( ! function_exists( 'has_post_thumbnail' ) ) {
	/**
	 * Stub for WordPress has_post_thumbnail().
	 *
	 * @param int|null $post Post ID.
	 * @return bool
	 */
	function has_post_thumbnail( $post = null ) {
		$id = is_int( $post ) ? $post : get_the_ID();
		return ! empty( $GLOBALS['gslider_test_post_thumbnails'][ $id ] );
	}
}

if ( ! function_exists( 'the_permalink' ) ) {
	/**
	 * Stub for WordPress the_permalink().
	 *
	 * @param int $post Post ID.
	 * @return void
	 */
	function the_permalink( $post = 0 ) {
		echo esc_url( get_permalink( $post ) );
	}
}

if ( ! function_exists( 'get_permalink' ) ) {
	/**
	 * Stub for WordPress get_permalink().
	 *
	 * @param int $post Post ID.
	 * @return string Permalink URL.
	 */
	function get_permalink( $post = 0 ) {
		$id = $post ? (int) $post : get_the_ID();
		return 'https://example.org/post-' . $id . '/';
	}
}

if ( ! function_exists( 'the_title_attribute' ) ) {
	/**
	 * Stub for WordPress the_title_attribute().
	 *
	 * @param string|array $args Title attribute args.
	 * @return string|void
	 */
	function the_title_attribute( $args = '' ) {
		$echo = true;
		$post = 0;
		if ( is_array( $args ) ) {
			$echo = isset( $args['echo'] ) ? (bool) $args['echo'] : true;
			$post = isset( $args['post'] ) ? (int) $args['post'] : 0;
		}
		$title = esc_attr( get_the_title( $post ) );
		if ( $echo ) {
			echo $title;
			return;
		}
		return $title;
	}
}

if ( ! function_exists( 'get_post_thumbnail_id' ) ) {
	/**
	 * Stub for WordPress get_post_thumbnail_id().
	 *
	 * @param int|null $post Post ID.
	 * @return int
	 */
	function get_post_thumbnail_id( $post = null ) {
		$id = is_int( $post ) ? $post : get_the_ID();
		return ! empty( $GLOBALS['gslider_test_post_thumbnails'][ $id ] ) ? (int) $id : 0;
	}
}

if ( ! function_exists( 'wp_get_attachment_image' ) ) {
	/**
	 * Stub for WordPress wp_get_attachment_image().
	 *
	 * @param int          $attachment_id Attachment ID.
	 * @param string|array $size          Size slug.
	 * @param bool         $icon          Whether icon.
	 * @param string|array $attr          Attributes.
	 * @return string
	 */
	function wp_get_attachment_image( $attachment_id, $size = 'thumbnail', $icon = false, $attr = '' ) {
		unset( $size, $icon );
		$alt     = is_array( $attr ) && isset( $attr['alt'] ) ? esc_attr( $attr['alt'] ) : '';
		$loading = is_array( $attr ) && isset( $attr['loading'] ) ? ' loading="' . esc_attr( $attr['loading'] ) . '"' : '';
		return '<img class="attachment-thumbnail size-thumbnail" src="https://example.org/thumb-' . intval( $attachment_id ) . '.jpg" alt="' . $alt . '"' . $loading . ' />';
	}
}

if ( ! function_exists( 'the_post_thumbnail' ) ) {
	/**
	 * Stub for WordPress the_post_thumbnail().
	 *
	 * @param string|int[] $size Size slug.
	 * @param array        $attr Image attributes.
	 * @return void
	 */
	function the_post_thumbnail( $size = 'post-thumbnail', $attr = array() ) {
		unset( $size );
		$id      = get_the_ID();
		$loading = isset( $attr['loading'] ) ? ' loading="' . esc_attr( $attr['loading'] ) . '"' : '';
		$fp      = isset( $attr['fetchpriority'] ) ? ' fetchpriority="' . esc_attr( $attr['fetchpriority'] ) . '"' : '';
		$alt     = isset( $attr['alt'] ) ? esc_attr( $attr['alt'] ) : '';
		echo '<img src="https://example.org/img-' . intval( $id ) . '.jpg" alt="' . $alt . '"' . $loading . $fp . ' />';
	}
}

if ( ! function_exists( 'get_the_post_thumbnail_url' ) ) {
	/**
	 * Stub for WordPress get_the_post_thumbnail_url().
	 *
	 * @param int|WP_Post|null $post Optional post ID or object.
	 * @param string           $size Image size slug.
	 * @return string|false Thumbnail URL or false when absent.
	 */
	function get_the_post_thumbnail_url( $post = null, $size = 'post-thumbnail' ) {
		unset( $size );
		$id = is_object( $post ) && isset( $post->ID )
			? (int) $post->ID
			: ( is_numeric( $post ) ? (int) $post : get_the_ID() );
		if ( array_key_exists( $id, $GLOBALS['gslider_test_post_thumbnail_urls'] ) ) {
			return $GLOBALS['gslider_test_post_thumbnail_urls'][ $id ];
		}
		return ! empty( $GLOBALS['gslider_test_post_thumbnails'][ $id ] )
			? 'https://example.org/img-' . $id . '.jpg'
			: false;
	}
}

if ( ! function_exists( 'get_the_author_meta' ) ) {
	/**
	 * Stub for WordPress get_the_author_meta().
	 *
	 * @param string    $field   Field key.
	 * @param int|false $user_id Optional user ID.
	 * @return int|string Author field value.
	 */
	function get_the_author_meta( $field = '', $user_id = false ) {
		if ( 'display_name' === $field ) {
			$uid = false !== $user_id ? (int) $user_id : 7;
			return $GLOBALS['gslider_test_author_names'][ $uid ] ?? 'Jane Author';
		}
		return 7;
	}
}

if ( ! function_exists( 'get_avatar_url' ) ) {
	/**
	 * Stub for WordPress get_avatar_url().
	 *
	 * @param int|string $id_or_email Author ID/email.
	 * @param array|null $args        Avatar options.
	 * @return string|false Avatar URL or false.
	 */
	function get_avatar_url( $id_or_email, $args = null ) {
		unset( $args );
		if ( array_key_exists( $id_or_email, $GLOBALS['gslider_test_avatar_urls'] ) ) {
			return $GLOBALS['gslider_test_avatar_urls'][ $id_or_email ];
		}
		return 'https://example.org/avatar-' . intval( $id_or_email ) . '.png';
	}
}

if ( ! function_exists( 'get_the_author' ) ) {
	/**
	 * Stub for WordPress get_the_author().
	 *
	 * @return string Author name.
	 */
	function get_the_author() {
		return 'Jane Author';
	}
}

if ( ! function_exists( 'the_author' ) ) {
	/**
	 * Stub for WordPress the_author().
	 *
	 * @return void
	 */
	function the_author() {
		echo esc_html( get_the_author() );
	}
}

if ( ! function_exists( 'get_the_date' ) ) {
	/**
	 * Stub for WordPress get_the_date().
	 *
	 * @param string   $format Date format.
	 * @param int|null $post   Post ID.
	 * @return string Formatted date.
	 */
	function get_the_date( $format = '', $post = null ) {
		if ( 'c' === $format ) {
			return '2026-11-10T12:00:00+00:00';
		}
		if ( 'Y-m-d' === $format ) {
			return '2026-11-10';
		}
		unset( $post );
		return 'November 10, 2026';
	}
}

if ( ! function_exists( 'get_the_modified_date' ) ) {
	/**
	 * Stub for WordPress get_the_modified_date().
	 *
	 * @param string   $format Date format.
	 * @param int|null $post   Post ID.
	 * @return string Formatted modified date.
	 */
	function get_the_modified_date( $format = '', $post = null ) {
		unset( $post );
		if ( 'c' === $format ) {
			return '2026-11-11T08:30:00+00:00';
		}
		return 'November 11, 2026';
	}
}

if ( ! function_exists( 'get_post_field' ) ) {
	/**
	 * Stub for WordPress get_post_field().
	 *
	 * @param string      $field Field name.
	 * @param int|WP_Post $post  Post ID or post object.
	 * @return string
	 */
	function get_post_field( $field, $post = null ) {
		$post_id = is_int( $post ) ? $post : ( is_numeric( $post ) ? (int) $post : get_the_ID() );
		if ( ! empty( $GLOBALS['gslider_test_render_posts'] ) ) {
			foreach ( $GLOBALS['gslider_test_render_posts'] as $candidate ) {
				if ( (int) $candidate->ID === $post_id ) {
					return isset( $candidate->$field ) ? (string) $candidate->$field : '';
				}
			}
		}
		if ( isset( $GLOBALS['gslider_test_current_post']->$field ) ) {
			return (string) $GLOBALS['gslider_test_current_post']->$field;
		}
		return '';
	}
}

if ( ! function_exists( 'wp_strip_all_tags' ) ) {
	/**
	 * Stub for WordPress wp_strip_all_tags().
	 *
	 * @param string $string Raw string.
	 * @return string Stripped string.
	 */
	function wp_strip_all_tags( $string ) {
		return strip_tags( (string) $string );
	}
}

if ( ! function_exists( '_n' ) ) {
	/**
	 * Stub for WordPress _n().
	 *
	 * @param string $single Single form.
	 * @param string $plural Plural form.
	 * @param int    $number Number.
	 * @param string $domain Textdomain.
	 * @return string
	 */
	function _n( $single, $plural, $number, $domain = 'default' ) {
		unset( $domain );
		return 1 === (int) $number ? $single : $plural;
	}
}

if ( ! class_exists( 'WP_Query' ) ) {
	/**
	 * Lightweight WP_Query stub capturing query args and iterating seeded WP_Post instances.
	 */
	class WP_Query {

		/**
		 * Queried posts list.
		 *
		 * @var WP_Post[]
		 */
		public $posts = array();

		/**
		 * Total post count in query.
		 *
		 * @var int
		 */
		public $post_count = 0;

		/**
		 * Current loop index.
		 *
		 * @var int
		 */
		public $current_post = -1;

		/**
		 * Initializes mock WP_Query from query args.
		 *
		 * @param array $args WP_Query args.
		 */
		public function __construct( $args = array() ) {
			$GLOBALS['gslider_test_last_query_args'] = $args;

			$pool = $GLOBALS['gslider_test_render_posts'];
			if ( ! empty( $args['post__in'] ) && array( 0 ) === $args['post__in'] ) {
				$pool = array();
			}

			$limit            = isset( $args['posts_per_page'] ) ? intval( $args['posts_per_page'] ) : 6;
			$overflow         = intval( $GLOBALS['gslider_test_sticky_overflow'] );
			$this->posts      = array_slice( $pool, 0, $limit + $overflow );
			$this->post_count = count( $this->posts );
		}

		/**
		 * Checks whether more posts remain in loop.
		 *
		 * @return bool
		 */
		public function have_posts(): bool {
			return ( $this->current_post + 1 ) < $this->post_count;
		}

		/**
		 * Advances active loop post pointer.
		 *
		 * @return void
		 */
		public function the_post(): void {
			++$this->current_post;
			$GLOBALS['gslider_test_current_post'] = $this->posts[ $this->current_post ];
		}
	}
}

set_error_handler(
	static function ( $severity, $message, $file, $line ) {
		if ( ! ( error_reporting() & $severity ) ) {
			return false;
		}
		fwrite( STDERR, "FAIL: PHP warning {$message} in {$file}:{$line}\n" );
		exit( 1 );
	}
);

require_once ABSPATH . 'includes/Interfaces/Registrable.php';
require_once ABSPATH . 'includes/Traits/SingletonTrait.php';
require_once ABSPATH . 'includes/Classes/SupportSVG.php';
require_once ABSPATH . 'includes/Utils/Helper.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/NavigationBuilder.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/CardMarkupBuilder.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/NewsroomBuilder.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/SchemaBuilder.php';
require_once ABSPATH . 'includes/Blocks/PostCarousel/PostCarouselRenderer.php';

use GSlider\Blocks\PostCarousel\CardMarkupBuilder;
use GSlider\Blocks\PostCarousel\NavigationBuilder;
use GSlider\Blocks\PostCarousel\NewsroomBuilder;
use GSlider\Blocks\PostCarousel\PostCarouselRenderer;
use GSlider\Blocks\PostCarousel\SchemaBuilder;

/**
 * Test class for GSlider\Blocks\PostCarousel\PostCarouselRenderer and companion builders.
 *
 * @package GSlider\Tests\Blocks
 */
class PostCarouselRendererTest {

	/**
	 * Helper assertion for strict boolean conditions.
	 *
	 * @param bool   $condition Evaluated boolean condition.
	 * @param string $message   Assertion message.
	 * @return void
	 */
	public function assert_true( bool $condition, string $message ): void {
		if ( true !== $condition ) {
			fwrite( STDERR, "FAIL: {$message}\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Helper assertion for strict identical comparisons.
	 *
	 * @param mixed  $expected Expected value.
	 * @param mixed  $actual   Actual value.
	 * @param string $message  Assertion message.
	 * @return void
	 */
	public function assert_same( $expected, $actual, string $message ): void {
		if ( $expected !== $actual ) {
			fwrite( STDERR, "FAIL: {$message} (Expected: " . var_export( $expected, true ) . ', Got: ' . var_export( $actual, true ) . ")\n" );
			exit( 1 );
		}
		fwrite( STDOUT, "OK: {$message}\n" );
	}

	/**
	 * Resets global test state and seeds default two mock posts before each test.
	 *
	 * @return void
	 */
	private function reset_state(): void {
		global $wp_options;
		$wp_options = array();

		$p1               = new WP_Post();
		$p1->ID           = 101;
		$p1->post_author  = 7;
		$p1->post_title   = 'First Carousel Post With A Longer Sample Title For Word Trimming';
		$p1->post_content = 'This is sample post content with enough words to test trimming and excerpt generation cleanly in PHP.';

		$p2               = new WP_Post();
		$p2->ID           = 102;
		$p2->post_author  = 8;
		$p2->post_title   = 'Second Post Title';
		$p2->post_content = 'Second post body text for character trimming validation.';

		$GLOBALS['gslider_test_render_posts']           = array( $p1, $p2 );
		$GLOBALS['gslider_test_current_post']           = null;
		$GLOBALS['gslider_test_current_page_id']        = 500;
		$GLOBALS['gslider_test_current_page_post_type'] = 'post';
		$GLOBALS['gslider_test_post_categories']        = array(
			101 => array( (object) array( 'term_id' => 10, 'name' => 'News' ) ),
			102 => array( (object) array( 'term_id' => 20, 'name' => 'Tech' ) ),
		);
		$GLOBALS['gslider_test_post_tags']              = array(
			101 => array( (object) array( 'term_id' => 30, 'name' => 'Gutenberg' ) ),
			102 => array(),
		);
		$GLOBALS['gslider_test_related_cats']           = array( 500 => array( 10, 20 ) );
		$GLOBALS['gslider_test_related_tags']           = array( 500 => array( 30 ) );
		$GLOBALS['gslider_test_post_thumbnails']        = array( 101 => true, 102 => true );
		$GLOBALS['gslider_test_post_thumbnail_urls']    = array();
		$GLOBALS['gslider_test_post_excerpts']          = array(
			101 => 'Custom explicit excerpt on post one for source tests.',
			102 => '',
		);
		$GLOBALS['gslider_test_avatar_urls']            = array();
		$GLOBALS['gslider_test_author_names']           = array(
			7 => 'Jane Author',
			8 => 'John Editor',
		);
		$GLOBALS['gslider_test_last_query_args']        = null;
		$GLOBALS['gslider_test_sticky_overflow']        = 0;
		$GLOBALS['is_admin_mock']                       = true;
		$GLOBALS['is_rest_mock']                        = false;
		$GLOBALS['is_feed_mock']                        = false;
		remove_all_filters( 'gslider_post_carousel_schema_data' );
		unset( $GLOBALS['gslider_first_image_optimized'] );
	}

	/**
	 * Executes all Post Carousel renderer unit tests.
	 *
	 * @return void
	 */
	public function run_all_tests(): void {
		echo "=== GSlider PostCarouselRenderer Unit Tests ===\n\n";

		$this->test_classes_exist_and_empty_query_returns_empty_string();
		$this->test_query_bounds_and_sticky_post_modes();
		$this->test_security_allowlists_for_tags_post_types_orderby_and_meta();
		$this->test_related_posts_query_construction_and_empty_term_guard();
		$this->test_xss_sanitization_and_navigation_pagination_placements();
		$this->test_card_elements_lcp_first_image_flag_and_avatar_fallback();
		$this->test_thin_render_php_delegates_to_post_carousel_renderer();
		$this->test_wave3_card_body_equal_height_fallback_and_clickable_card();
		$this->test_wave4_core_layout_presets_and_horizontal_overlay_modes();
		$this->test_wave5a_hero_minimal_spotlight_presets_and_swiper_settings();
		$this->test_wave5b_newsroom_stage_preset_and_queue_rendering();
		$this->test_wave5c_timeline_rail_preset_rendering();
		$this->test_wave6_editorial_meta_reading_time_relative_dates_comments_separators_and_badge_cap();
		$this->test_wave7_marquee_autoplay_progress_and_mobile_only_grid();
		$this->test_wave8_google_carousel_seo_schema();

		echo "\nAll PostCarouselRenderer unit tests passed successfully!\n";
	}

	/**
	 * Test 1: PSR-4 classes exist via ::class and render() returns '' on empty queries.
	 *
	 * @return void
	 */
	public function test_classes_exist_and_empty_query_returns_empty_string(): void {
		$this->reset_state();

		$this->assert_true( class_exists( PostCarouselRenderer::class, false ), 'PostCarouselRenderer class exists via ::class' );
		$this->assert_true( class_exists( CardMarkupBuilder::class, false ), 'CardMarkupBuilder class exists via ::class' );
		$this->assert_true( class_exists( NavigationBuilder::class, false ), 'NavigationBuilder class exists via ::class' );

		$GLOBALS['gslider_test_render_posts'] = array();
		$output                               = PostCarouselRenderer::render( array( 'blockId' => 'gslider-post-empty' ) );
		$this->assert_same( '', $output, 'render() returns empty string when WP_Query has no posts' );
		$this->assert_same( null, $GLOBALS['gslider_test_current_post'], 'wp_reset_postdata() resets global post on empty query' );
	}

	/**
	 * Test 2: Query bounds clamp postsPerPage [1, 30] & offset [0, 100], and sticky overflow/exclude/only modes work cleanly.
	 *
	 * @return void
	 */
	public function test_query_bounds_and_sticky_post_modes(): void {
		global $wp_options;
		$this->reset_state();

		// Lower bound clamp + negative offset clamp + sticky 'exclude'.
		$wp_options['sticky_posts'] = array( 88, 99 );
		PostCarouselRenderer::render(
			array(
				'blockId'      => 'gslider-bounds-low',
				'postsPerPage' => -5,
				'offset'       => -10,
				'excludePosts' => '11,12',
				'stickyPosts'  => 'exclude',
			)
		);
		$args_low = $GLOBALS['gslider_test_last_query_args'];
		$this->assert_same( 1, $args_low['posts_per_page'], 'Negative postsPerPage clamps to minimum 1' );
		$this->assert_true( ! isset( $args_low['offset'] ), 'Negative/zero offset omits offset query parameter' );
		$this->assert_same( array( 11, 12, 88, 99 ), $args_low['post__not_in'], 'Sticky exclude merges sticky_posts with excludePosts' );

		// Upper bound clamp + sticky 'only' empty fallback -> post__in=[0] + sticky overflow slice cap.
		$this->reset_state();
		$seeded = array();
		for ( $i = 1; $i <= 5; $i++ ) {
			$post               = new WP_Post();
			$post->ID           = 200 + $i;
			$post->post_title   = 'Post ' . $i;
			$post->post_content = 'Body ' . $i;
			$seeded[]           = $post;
		}
		$GLOBALS['gslider_test_render_posts']    = $seeded;
		$GLOBALS['gslider_test_sticky_overflow'] = 2;

		$html_capped = PostCarouselRenderer::render(
			array(
				'blockId'      => 'gslider-cap-2',
				'postsPerPage' => array( 'Desktop' => 2 ),
				'offset'       => array( 'Desktop' => 999 ),
			)
		);
		$this->assert_same( 100, $GLOBALS['gslider_test_last_query_args']['offset'], 'Excessive offset clamps to maximum 100' );
		$this->assert_same( 2, substr_count( $html_capped, 'class="swiper-slide"' ), 'Sticky overflow beyond posts_per_page is sliced cleanly to cap' );

		// Sticky 'only' with empty sticky option forces [0].
		$this->reset_state();
		$empty_sticky_html = PostCarouselRenderer::render(
			array(
				'blockId'      => 'gslider-sticky-only',
				'postsPerPage' => 500,
				'stickyPosts'  => 'only',
			)
		);
		$this->assert_same( 30, $GLOBALS['gslider_test_last_query_args']['posts_per_page'], 'Excessive postsPerPage clamps to maximum 30' );
		$this->assert_same( array( 0 ), $GLOBALS['gslider_test_last_query_args']['post__in'], 'Empty sticky_posts in only mode sets post__in=[0]' );
		$this->assert_same( '', $empty_sticky_html, 'Sticky only mode with empty sticky_posts renders empty string' );
	}

	/**
	 * Test 3: Allowlist fallbacks protect HTML tags, postType, orderBy, order, and metaCompare.
	 *
	 * @return void
	 */
	public function test_security_allowlists_for_tags_post_types_orderby_and_meta(): void {
		$this->reset_state();

		$html = PostCarouselRenderer::render(
			array(
				'blockId'            => 'gslider-allowlist',
				'postTitleHtmlTag'   => 'script',
				'postExcerptHtmlTag' => 'iframe',
				'postType'           => 'internal_secret',
				'orderBy'            => 'sql_injection',
				'order'              => 'INVALID_ORDER',
				'metaKey'            => 'views',
				'metaValue'          => '10',
				'metaCompare'        => 'REGEXP_DROP',
			)
		);

		$args = $GLOBALS['gslider_test_last_query_args'];
		$this->assert_same( 'post', $args['post_type'], 'Non-viewable postType falls back to post' );
		$this->assert_same( 'date', $args['orderby'], 'Disallowed orderBy falls back to date' );
		$this->assert_same( 'DESC', $args['order'], 'Disallowed order falls back to DESC' );
		$this->assert_same( '=', $args['meta_query'][0]['compare'], 'Disallowed metaCompare falls back to =' );
		$this->assert_true( false !== strpos( $html, '<h3 class="gslider-post-carousel-title' ), 'Unsafe postTitleHtmlTag falls back to h3' );
		$this->assert_true( false !== strpos( $html, '<p class="gslider-post-carousel-excerpt">' ), 'Unsafe postExcerptHtmlTag falls back to p' );

		// Valid viewable CPT + orderby 'id' -> 'ID' + uppercase order & meta_value with metaKey.
		PostCarouselRenderer::render(
			array(
				'blockId'     => 'gslider-allow-valid',
				'postType'    => 'portfolio',
				'orderBy'     => 'meta_value_num',
				'order'       => 'asc',
				'metaKey'     => 'rank',
				'metaCompare' => 'exists',
			)
		);
		$valid_args = $GLOBALS['gslider_test_last_query_args'];
		$this->assert_same( 'portfolio', $valid_args['post_type'], 'Viewable custom postType portfolio is preserved' );
		$this->assert_same( 'meta_value_num', $valid_args['orderby'], 'Valid meta_value_num orderby with non-empty metaKey is preserved' );
		$this->assert_same( 'ASC', $valid_args['order'], 'Lowercase asc normalizes to ASC' );
		$this->assert_same( 'EXISTS', $valid_args['meta_query'][0]['compare'], 'Lowercase exists normalizes to EXISTS' );
		$this->assert_same( 'rank', $valid_args['meta_key'], 'meta_key is set when sorting by meta_value_num' );
	}

	/**
	 * Test 4: Related posts query mode builds OR tax_query, guards empty taxonomy matches, and strips meta orderby.
	 *
	 * @return void
	 */
	public function test_related_posts_query_construction_and_empty_term_guard(): void {
		$this->reset_state();

		PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-rel-both',
				'useRelatedPostsQuery' => true,
				'relatedPostsTaxonomy' => 'both',
				'orderBy'              => 'meta_value',
				'metaKey'              => 'views',
				'excludePosts'         => '12, 500',
			)
		);
		$rel_args = $GLOBALS['gslider_test_last_query_args'];
		$this->assert_same( 'date', $rel_args['orderby'], 'Related posts mode forces meta_value orderby fallback to date' );
		$this->assert_same( 'OR', $rel_args['tax_query']['relation'], 'Combined category + post_tag uses OR relation' );
		$this->assert_same( array( 500, 12 ), array_values( $rel_args['post__not_in'] ), 'Related query excludes current post and deduplicates excludePosts' );

		// When current post has zero categories and tags, sets post__in => [0] so unrelated posts never leak.
		$GLOBALS['gslider_test_related_cats'] = array();
		$GLOBALS['gslider_test_related_tags'] = array();
		$empty_rel_html                      = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-rel-empty',
				'useRelatedPostsQuery' => true,
				'relatedPostsTaxonomy' => 'both',
			)
		);
		$this->assert_same( array( 0 ), $GLOBALS['gslider_test_last_query_args']['post__in'], 'Missing related taxonomy terms forces post__in=[0]' );
		$this->assert_same( '', $empty_rel_html, 'Missing related taxonomy terms produces empty output' );
	}

	/**
	 * Test 5: XSS payloads in URLs and inline SVGs are neutralized; inside/outside navigation & pagination wrappers work cleanly.
	 *
	 * @return void
	 */
	public function test_xss_sanitization_and_navigation_pagination_placements(): void {
		$this->reset_state();

		$html_inside = PostCarouselRenderer::render(
			array(
				'blockId'                           => 'gslider-xss-inside',
				'navigationArrowPositionType'       => 'inside',
				'navigationArrowPosition'           => 'bottom-center',
				'paginationPositionType'            => 'inside',
				'navigationArrowsIconSwitcher'      => true,
				'navigationArrowsIconLeftAlign'     => 'icon',
				'navigationArrowsIconLeftHtml'      => '<svg viewBox="0 0 24 24" onclick="alert(1)"><script>evil()</script><path d="M5 12h14"/></svg>',
				'navigationArrowsIconRightAlign'    => 'image',
				'navigationArrowsIconRightImageUrl' => 'https://example.org/next.png',
				'navigationArrowsIconRightImageAlt' => 'Next "Quote"',
				'readMoreButtonLinkType'            => 'custom',
				'readMoreButtonLink'                => 'javascript:alert(document.cookie)',
				'readMoreButtonNofollow'            => true,
				'readMoreButtonSponsored'           => true,
				'readMoreButtonIconSwitcher'        => true,
				'readMoreButtonIconType'            => 'icon',
				'readMoreButtonIconHtml'            => '<svg viewBox="0 0 16 16" onload="alert(2)"><path d="M1 8h14"/></svg>',
			)
		);

		$this->assert_true( false === stripos( $html_inside, 'javascript:' ), 'javascript: URI in Read More custom link is stripped by esc_url()' );
		$this->assert_true( false === stripos( $html_inside, '<script' ), 'Script tags in custom arrow SVG are stripped cleanly' );
		$this->assert_true( false === stripos( $html_inside, 'onclick' ), 'onclick handler in custom arrow SVG is stripped cleanly' );
		$this->assert_true( false === stripos( $html_inside, 'onload' ), 'onload handler in Read More SVG is stripped cleanly' );
		$this->assert_true( false !== strpos( $html_inside, 'rel="noopener noreferrer nofollow sponsored"' ), 'Read More compiles complete rel attributes cleanly' );
		$this->assert_true( false !== strpos( $html_inside, 'gslider-navigation-custom-icon-wrapper inside bottom-center' ), 'Inside custom nav wrapper has expected position classes' );
		$this->assert_true( false === strpos( $html_inside, 'swiper-pagination-gslider-xss-inside' ), 'Inside pagination omits block-id outside suffix class' );

		// Outside placement test + globalClass sanitization.
		$this->reset_state();
		$html_outside = PostCarouselRenderer::render(
			array(
				'blockId'        => 'gslider-out-cls',
				'globalClass'    => 'alpha "bad" beta',
				'showNavigation' => array( 'Desktop' => true, 'Tablet' => false, 'Mobile' => false ),
				'showPagination' => array( 'Desktop' => true, 'Tablet' => false, 'Mobile' => false ),
			)
		);
		$this->assert_true( false !== strpos( $html_outside, 'swiper-pagination-gslider-out-cls' ), 'Outside pagination includes swiper-pagination-{blockId}' );
		$this->assert_true( false !== strpos( $html_outside, 'alpha bad beta has-pagination' ), 'globalClass tokens are sanitized cleanly without quotes' );
	}

	/**
	 * Test 6: Card content order, LCP first-image optimization, taxonomy badge vs inline, excerpt modes, and avatar fallback render accurately.
	 *
	 * @return void
	 */
	public function test_card_elements_lcp_first_image_flag_and_avatar_fallback(): void {
		$this->reset_state();
		// Render once with an author avatar URL available to verify explicit lazy loading on avatars,
		// then verify missing avatar URL renders placeholder SVG and no global LCP flag is touched.
		$GLOBALS['gslider_test_avatar_urls'][7] = 'https://example.org/avatar-7.jpg';

		$html_with_avatar = PostCarouselRenderer::render(
			array(
				'blockId'        => 'gslider-avatar-lazy',
				'enableLazyLoad' => false,
			)
		);

		$this->assert_true( ! array_key_exists( 'gslider_first_image_optimized', $GLOBALS ), 'Ad-hoc global LCP flag gslider_first_image_optimized is no longer set by CardMarkupBuilder' );
		$this->assert_true( false === strpos( $html_with_avatar, 'fetchpriority=' ), 'Renderer defers fetchpriority="high" assignment exclusively to StyleGenerator::optimize_lcp_image()' );
		$this->assert_true( false !== strpos( $html_with_avatar, 'class="gslider-post-author-avatar"' ) && false !== strpos( $html_with_avatar, 'loading="lazy"' ), 'Author avatar img always renders with loading="lazy"' );
		$this->assert_true( 2 === substr_count( $html_with_avatar, 'loading="eager"' ), 'Card thumbnails respect enableLazyLoad=false with loading="eager"' );

		// Simulate missing avatar URL for author ID 7 -> triggers placeholder inline SVG and enableLazyLoad=true keeps card thumbnails lazy before StyleGenerator.
		$this->reset_state();
		$GLOBALS['gslider_test_avatar_urls'][7] = false;

		$html = PostCarouselRenderer::render(
			array(
				'blockId'                     => 'gslider-lcp-meta',
				'enableLazyLoad'              => true,
				'enableTaxonomyBadgeOverlay'  => true,
				'postTaxonomyDisplay'         => 'both',
				'postExcerptSource'           => 'content',
				'enablePostExcerptLimit'      => true,
				'postExcerptLimitType'        => 'words',
				'postExcerptLimit'            => array( 'Desktop' => 5 ),
				'postExcerptLimitSuffix'      => '...',
				'enablePostTitleLimit'        => true,
				'postTitleLimitType'          => 'characters',
				'postTitleLimit'              => array( 'Desktop' => 10 ),
				'postTitleLimitSuffix'        => '...',
				'contentOrder'                => array( 'title', 'excerpt', 'meta', 'thumbnail' ),
			)
		);

		$this->assert_true( ! array_key_exists( 'gslider_first_image_optimized', $GLOBALS ), 'enableLazyLoad=true also avoids setting global gslider_first_image_optimized' );
		$this->assert_true( false === strpos( $html, 'fetchpriority=' ), 'PostCarouselRenderer does not emit inline fetchpriority attribute directly' );
		$this->assert_true( 2 === substr_count( $html, 'loading="lazy"' ), 'Card images render loading="lazy" when enableLazyLoad is true so StyleGenerator promotes only first slide' );
		$this->assert_true( false !== strpos( $html, 'This is sample post content...' ), 'Content excerpt source trims to word limit cleanly' );
		$this->assert_true( false !== strpos( $html, 'First Caro...' ), 'Character title limit trims cleanly with multibyte safe substring' );
		$this->assert_true( false !== strpos( $html, 'gslider-post-author-avatar-placeholder' ), 'Missing avatar URL renders inline SVG avatar placeholder' );
		$this->assert_true( strpos( $html, 'gslider-post-carousel-title-wrapper' ) < strpos( $html, 'gslider-post-carousel-image' ), 'Custom contentOrder puts title before thumbnail' );
	}

	/**
	 * Test 7: Thin render.php bootstrap file delegates cleanly and renders identical output to PostCarouselRenderer::render().
	 *
	 * @return void
	 */
	public function test_thin_render_php_delegates_to_post_carousel_renderer(): void {
		$this->reset_state();

		$render_path  = ABSPATH . 'src/blocks/post-carousel/render.php';
		$line_count   = count( file( $render_path ) ?: array() );
		$this->assert_true( $line_count <= 35, "src/blocks/post-carousel/render.php is a thin bootstrap (<= 35 lines, got {$line_count})" );

		$test_attrs = array(
			'blockId'             => 'gslider-delegate-check',
			'postTaxonomyDisplay' => 'category',
		);

		$direct_html = PostCarouselRenderer::render( $test_attrs );

		$attributes = $test_attrs;
		$content    = '';
		$block      = null;
		ob_start();
		include $render_path;
		$template_html = (string) ob_get_clean();

		$this->assert_same( $direct_html, $template_html, 'Thin render.php output matches PostCarouselRenderer::render() byte-for-byte' );
	}

	/**
	 * Test 8: Unified `.gslider-post-carousel-body`, equal-height classes, fallback thumbnails, clickable card links, and zero nested anchors.
	 *
	 * @return void
	 */
	public function test_wave3_card_body_equal_height_fallback_and_clickable_card(): void {
		$this->reset_state();

		// 1. Default render: equal height enabled, clickable disabled, .gslider-post-carousel-body present.
		$default_html = PostCarouselRenderer::render(
			array(
				'blockId' => 'gslider-wave3-default',
			)
		);
		$this->assert_true( false !== strpos( $default_html, 'gslider-wave3-default' ) && false !== strpos( $default_html, 'has-equal-height' ), 'Default render adds has-equal-height on wrapper and card' );
		$this->assert_true( false === strpos( $default_html, 'is-clickable' ), 'Default render omits is-clickable class when enableCardClickableLink is false' );
		$this->assert_true( 2 === substr_count( $default_html, 'class="gslider-post-carousel-body"' ), 'All rendered cards include .gslider-post-carousel-body' );
		$this->assert_true( 2 === substr_count( $default_html, 'class="gslider-post-thumb-link"' ), 'Thumbnails use .gslider-post-thumb-link class' );
		$this->assert_true( 2 === substr_count( $default_html, 'class="gslider-post-carousel-title-link"' ), 'Linked titles use .gslider-post-carousel-title-link class' );
		$this->assert_true( 2 === substr_count( $default_html, 'class="gslider-post-title-text"' ), 'Titles wrap text inside .gslider-post-title-text span' );
		$this->assert_true( false === strpos( $default_html, 'gslider-post-carousel-card-link' ), 'Default render omits standalone .gslider-post-carousel-card-link' );

		// 2. equalHeight disabled omits has-equal-height.
		$this->reset_state();
		$unequal_html = PostCarouselRenderer::render(
			array(
				'blockId'     => 'gslider-wave3-unequal',
				'equalHeight' => false,
			)
		);
		$this->assert_true( false === strpos( $unequal_html, 'has-equal-height' ), 'equalHeight=false omits has-equal-height class from wrapper and card' );

		// 3. Missing post thumbnail with default enableFallbackThumbnail=true renders SVG placeholder and non-duplicated overlay badge.
		$this->reset_state();
		$GLOBALS['gslider_test_post_thumbnails'][101] = false;
		$svg_fallback_html                           = PostCarouselRenderer::render(
			array(
				'blockId'                    => 'gslider-wave3-svg',
				'enableTaxonomyBadgeOverlay' => true,
			)
		);
		$this->assert_true( 1 === substr_count( $svg_fallback_html, 'class="gslider-post-carousel-placeholder-svg"' ), 'Post without featured image renders inline SVG placeholder' );
		$this->assert_true( false !== strpos( $svg_fallback_html, 'aria-hidden="true" focusable="false"' ), 'SVG placeholder includes accessibility attributes' );
		$this->assert_true( 2 === substr_count( $svg_fallback_html, 'class="gslider-taxonomy-badge-overlay' ), 'Overlay taxonomy badge still renders over placeholder thumbnail' );
		$this->assert_true( 2 === substr_count( $svg_fallback_html, 'gslider-post-carousel-categories' ), 'Taxonomy badges are not duplicated inline when rendered as overlay over fallback thumbnail' );

		// 4. Custom fallbackThumbnailUrl renders custom fallback img; javascript: URI is stripped cleanly to SVG placeholder.
		$this->reset_state();
		$GLOBALS['gslider_test_post_thumbnails'][101] = false;
		$GLOBALS['gslider_test_post_thumbnails'][102] = false;
		$custom_fallback_html                        = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-wave3-fallback-img',
				'fallbackThumbnailUrl' => 'https://example.org/fallback.jpg',
			)
		);
		$this->assert_true( 2 === substr_count( $custom_fallback_html, 'class="gslider-post-carousel-fallback-img"' ), 'Valid fallbackThumbnailUrl renders custom fallback img' );
		$this->assert_true( false !== strpos( $custom_fallback_html, 'src="https://example.org/fallback.jpg"' ), 'Custom fallback img outputs escaped URL' );

		$xss_fallback_html = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-wave3-fallback-xss',
				'fallbackThumbnailUrl' => 'javascript:alert(1)',
			)
		);
		$this->assert_true( false === stripos( $xss_fallback_html, 'javascript:' ), 'javascript: URI in fallbackThumbnailUrl is stripped' );
		$this->assert_true( false === strpos( $xss_fallback_html, 'gslider-post-carousel-fallback-img' ), 'Unsafe fallbackThumbnailUrl does not emit broken img tag' );
		$this->assert_true( 2 === substr_count( $xss_fallback_html, 'class="gslider-post-carousel-placeholder-svg"' ), 'Unsafe fallbackThumbnailUrl falls back cleanly to SVG placeholder' );

		// 5. enableFallbackThumbnail=false omits thumbnail container and promotes categories inline into body.
		$no_fallback_html = PostCarouselRenderer::render(
			array(
				'blockId'                    => 'gslider-wave3-nofallback',
				'enableFallbackThumbnail'    => false,
				'enableTaxonomyBadgeOverlay' => true,
			)
		);
		$this->assert_true( false === strpos( $no_fallback_html, 'gslider-post-carousel-image' ), 'enableFallbackThumbnail=false omits .gslider-post-carousel-image when thumbnail missing' );
		$this->assert_true( 2 === substr_count( $no_fallback_html, 'gslider-post-carousel-categories' ), 'Categories render inline inside body when no thumbnail or fallback is present' );

		// 6. Clickable whole card: uses title-link when present, standalone card-link when title link absent, with zero nested <a> tags.
		$this->reset_state();
		$clickable_with_title = PostCarouselRenderer::render(
			array(
				'blockId'                 => 'gslider-wave3-click-title',
				'enableCardClickableLink' => true,
				'enablePostTitleLink'     => true,
			)
		);
		$this->assert_true( 2 === substr_count( $clickable_with_title, 'is-clickable' ), 'enableCardClickableLink=true adds is-clickable class to article' );
		$this->assert_true( false === strpos( $clickable_with_title, 'gslider-post-carousel-card-link' ), 'Standalone card-link omitted when post title link is rendered' );

		$clickable_no_title_link = PostCarouselRenderer::render(
			array(
				'blockId'                 => 'gslider-wave3-click-fallback',
				'enableCardClickableLink' => true,
				'enablePostTitleLink'     => false,
			)
		);
		$this->assert_true( 2 === substr_count( $clickable_no_title_link, 'class="gslider-post-carousel-card-link"' ), 'Standalone .gslider-post-carousel-card-link rendered when title link is disabled' );
		$this->assert_true( false === strpos( $clickable_no_title_link, 'gslider-post-carousel-title-link' ), 'Title renders without anchor when enablePostTitleLink=false' );

		$clickable_responsive_title = PostCarouselRenderer::render(
			array(
				'blockId'                 => 'gslider-wave3-click-responsive',
				'enableCardClickableLink' => true,
				'enablePostTitleLink'     => true,
				'showPostTitle'           => array( 'Desktop' => true, 'Tablet' => false, 'Mobile' => false ),
			)
		);
		$this->assert_true( 2 === substr_count( $clickable_responsive_title, 'class="gslider-post-carousel-card-link"' ), 'Standalone .gslider-post-carousel-card-link rendered when title is hidden on Tablet/Mobile' );

		foreach ( array( $clickable_with_title, $clickable_no_title_link, $clickable_responsive_title ) as $clickable_html ) {
			$depth     = 0;
			$max_depth = 0;
			preg_match_all( '#<(/?)a\b[^>]*>#i', $clickable_html, $anchor_tags, PREG_SET_ORDER );
			foreach ( $anchor_tags as $anchor_tag ) {
				$depth    += ( '' === $anchor_tag[1] ) ? 1 : -1;
				$max_depth = max( $max_depth, $depth );
			}
			$this->assert_same( 1, $max_depth, 'Rendered clickable card HTML contains zero nested <a> elements' );
		}

		// 7. Custom contentOrder with thumbnail strictly last still wraps preceding content in .gslider-post-carousel-body.
		$this->reset_state();
		$thumb_last_html = PostCarouselRenderer::render(
			array(
				'blockId'            => 'gslider-wave3-order-last',
				'showReadMoreButton' => array( 'Desktop' => false, 'Tablet' => false, 'Mobile' => false ),
				'contentOrder'       => array( 'title', 'excerpt', 'meta', 'categories', 'readmore', 'thumbnail' ),
			)
		);
		$this->assert_true( 2 === substr_count( $thumb_last_html, 'class="gslider-post-carousel-body"' ), 'Thumbnail-last contentOrder still wraps card content in .gslider-post-carousel-body' );
		$this->assert_true( strpos( $thumb_last_html, 'class="gslider-post-carousel-body"' ) < strpos( $thumb_last_html, 'class="gslider-post-carousel-image"' ), 'Thumbnail-last contentOrder keeps .gslider-post-carousel-body before .gslider-post-carousel-image' );
	}

	/**
	 * Test 9: Wave 4 Core Layout Presets, layout mode classes, horizontal media classes, and context bounds/sanitization.
	 *
	 * @return void
	 */
	public function test_wave4_core_layout_presets_and_horizontal_overlay_modes(): void {
		$this->reset_state();

		// 1. Default classic layout and classic-card preset classes.
		$classic_html = PostCarouselRenderer::render(
			array(
				'blockId' => 'gslider-wave4-classic',
			)
		);
		$this->assert_true( false !== strpos( $classic_html, 'is-layout-classic is-preset-classic-card' ), 'Default render emits is-layout-classic and is-preset-classic-card wrapper classes' );
		$this->assert_true( false === strpos( $classic_html, 'media-position-left' ) && false === strpos( $classic_html, 'media-position-right' ), 'Classic layout omits horizontal media-position classes' );

		// 2. Modern Dark Overlay preset classes + scrim sanitization and height clamping.
		$overlay_html = PostCarouselRenderer::render(
			array(
				'blockId'        => 'gslider-wave4-overlay',
				'postLayoutMode' => 'overlay',
				'presetStyle'    => 'modern-overlay',
			)
		);
		$this->assert_true( false !== strpos( $overlay_html, 'is-layout-overlay is-preset-modern-overlay' ), 'Overlay mode emits is-layout-overlay and is-preset-modern-overlay wrapper classes' );

		$overlay_ctx_low = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'       => 'overlay',
				'presetStyle'          => 'modern-overlay',
				'overlayGradientScrim' => 'linear-gradient(to top, #000, transparent);}</style><script>alert(1)</script>',
				'overlayScrimHeight'   => 10,
			)
		);
		$this->assert_same( 40, $overlay_ctx_low['overlay_scrim_height'], 'overlayScrimHeight clamps to minimum 40' );
		$this->assert_true( false === strpos( $overlay_ctx_low['overlay_gradient_scrim'], ';' ) && false === strpos( $overlay_ctx_low['overlay_gradient_scrim'], '<' ), 'overlayGradientScrim strips CSS/HTML injection delimiters' );

		$overlay_ctx_high = PostCarouselRenderer::build_render_context(
			array(
				'overlayScrimHeight' => 150,
			)
		);
		$this->assert_same( 100, $overlay_ctx_high['overlay_scrim_height'], 'overlayScrimHeight clamps to maximum 100' );

		// 3. Editorial Horizontal Split preset classes, media-position-left/right, width clamping, and has-no-image fallback.
		$horizontal_left_html = PostCarouselRenderer::render(
			array(
				'blockId'        => 'gslider-wave4-horiz-left',
				'postLayoutMode' => 'horizontal',
				'presetStyle'    => 'editorial-split',
			)
		);
		$this->assert_true( false !== strpos( $horizontal_left_html, 'is-layout-horizontal is-preset-editorial-split' ), 'Horizontal mode emits is-layout-horizontal and is-preset-editorial-split wrapper classes' );
		$this->assert_true( 2 === substr_count( $horizontal_left_html, 'class="gslider-post-carousel-card has-equal-height media-position-left"' ), 'Horizontal mode defaults to media-position-left on cards' );
		$this->assert_true( false === strpos( $horizontal_left_html, 'has-no-image' ), 'Horizontal mode omits has-no-image when thumbnails exist' );

		$GLOBALS['gslider_test_post_thumbnails'][102] = false;
		$horizontal_right_html                        = PostCarouselRenderer::render(
			array(
				'blockId'                 => 'gslider-wave4-horiz-right',
				'postLayoutMode'          => 'horizontal',
				'presetStyle'             => 'editorial-split',
				'horizontalMediaPosition' => 'right',
				'enableFallbackThumbnail' => false,
			)
		);
		$this->assert_true( 2 === substr_count( $horizontal_right_html, 'media-position-right' ), 'Horizontal mode applies media-position-right when configured' );
		$this->assert_true( 1 === substr_count( $horizontal_right_html, 'media-position-right has-no-image' ), 'Horizontal mode adds has-no-image class only on cards without image or fallback' );

		$horiz_ctx_low  = PostCarouselRenderer::build_render_context( array( 'horizontalMediaWidth' => 10 ) );
		$horiz_ctx_high = PostCarouselRenderer::build_render_context( array( 'horizontalMediaWidth' => 90 ) );
		$this->assert_same( 30, $horiz_ctx_low['horizontal_media_width'], 'horizontalMediaWidth clamps to minimum 30' );
		$this->assert_same( 60, $horiz_ctx_high['horizontal_media_width'], 'horizontalMediaWidth clamps to maximum 60' );

		// 4. Invalid or unsupported layout mode, media position, and preset style fall back safely.
		$invalid_html = PostCarouselRenderer::render(
			array(
				'blockId'                 => 'gslider-wave4-invalid',
				'postLayoutMode'          => 'malicious_mode',
				'presetStyle'             => 'bad "preset"',
				'horizontalMediaPosition' => 'top',
			)
		);
		$this->assert_true( false !== strpos( $invalid_html, 'is-layout-classic is-preset-badpreset' ), 'Invalid postLayoutMode falls back to classic and presetStyle is sanitized' );

		$future_mode_html = PostCarouselRenderer::render(
			array(
				'blockId'        => 'gslider-wave4-unreleased-mode',
				'postLayoutMode' => 'unsupported_test_mode',
			)
		);
		$this->assert_true( false !== strpos( $future_mode_html, 'is-layout-classic' ) && false === strpos( $future_mode_html, 'is-layout-unsupported_test_mode' ), 'Unsupported postLayoutMode falls back cleanly to classic' );

		// 5. Non-classic layout modes keep all text chunks inside .gslider-post-carousel-body even when contentOrder puts elements before thumbnail.
		$this->reset_state();
		$horiz_reordered_html = PostCarouselRenderer::render(
			array(
				'blockId'        => 'gslider-wave4-horiz-order',
				'postLayoutMode' => 'horizontal',
				'contentOrder'   => array( 'title', 'thumbnail', 'excerpt', 'meta', 'categories', 'readmore' ),
			)
		);
		$this->assert_true( 2 === substr_count( $horiz_reordered_html, 'class="gslider-post-carousel-body"' ), 'Horizontal layout with title-before-thumbnail still renders one .gslider-post-carousel-body per card' );
		$this->assert_true( strpos( $horiz_reordered_html, 'class="gslider-post-carousel-image"' ) < strpos( $horiz_reordered_html, 'class="gslider-post-carousel-body"' ), 'Horizontal layout renders thumbnail container before .gslider-post-carousel-body regardless of contentOrder' );
	}

	/**
	 * Test 10: Wave 5A Cinematic Hero, Minimal Typographic & Centered Spotlight presets, classes, Swiper settings, and bounds clamping.
	 *
	 * @return void
	 */
	public function test_wave5a_hero_minimal_spotlight_presets_and_swiper_settings(): void {
		$this->reset_state();

		// 1. Cinematic Hero preset emits hero layout, hero alignment, and preserves explicit alignment or falls back when invalid.
		$hero_html = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-wave5a-hero',
				'postLayoutMode'       => 'hero',
				'presetStyle'          => 'cinematic-hero',
				'heroContentAlignment' => 'center',
			)
		);
		$this->assert_true( false !== strpos( $hero_html, 'is-layout-hero is-preset-cinematic-hero' ) && false !== strpos( $hero_html, 'hero-align-center' ), 'Hero mode emits is-layout-hero, is-preset-cinematic-hero, and hero-align-center wrapper classes' );
		$this->assert_true( false === strpos( $hero_html, 'is-spotlight' ), 'Hero preset without spotlight omits is-spotlight wrapper class' );

		$invalid_hero_align_html = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-wave5a-hero-invalid-align',
				'postLayoutMode'       => 'hero',
				'heroContentAlignment' => 'top-right',
			)
		);
		$this->assert_true( false !== strpos( $invalid_hero_align_html, 'hero-align-bottom-left' ), 'Invalid heroContentAlignment falls back to bottom-left' );

		$hero_ctx_bounds_low = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'    => 'hero',
				'heroHeightDesktop' => 50,
				'heroHeightTablet'  => 100,
				'heroHeightMobile'  => -10,
			)
		);
		$this->assert_same( 200, $hero_ctx_bounds_low['hero_height_desktop'], 'heroHeightDesktop clamps to minimum 200' );
		$this->assert_same( 200, $hero_ctx_bounds_low['hero_height_tablet'], 'heroHeightTablet clamps to minimum 200' );
		$this->assert_same( 200, $hero_ctx_bounds_low['hero_height_mobile'], 'heroHeightMobile clamps to minimum 200' );

		$hero_ctx_bounds_high = PostCarouselRenderer::build_render_context(
			array(
				'heroHeightDesktop' => 5000,
				'heroHeightTablet'  => 2000,
				'heroHeightMobile'  => 1800,
			)
		);
		$this->assert_same( 1200, $hero_ctx_bounds_high['hero_height_desktop'], 'heroHeightDesktop clamps to maximum 1200' );
		$this->assert_same( 1200, $hero_ctx_bounds_high['hero_height_tablet'], 'heroHeightTablet clamps to maximum 1200' );
		$this->assert_same( 1200, $hero_ctx_bounds_high['hero_height_mobile'], 'heroHeightMobile clamps to maximum 1200' );

		// 2. Minimal Typographic mode emits minimal layout class and follows natural top-to-bottom content order before thumbnail.
		$minimal_html = PostCarouselRenderer::render(
			array(
				'blockId'                    => 'gslider-wave5a-minimal',
				'postLayoutMode'             => 'minimal',
				'presetStyle'                => 'minimal-typo',
				'enableTaxonomyBadgeOverlay' => false,
				'contentOrder'               => array( 'categories', 'title', 'thumbnail', 'excerpt', 'meta', 'readmore' ),
			)
		);
		$this->assert_true( false !== strpos( $minimal_html, 'is-layout-minimal is-preset-minimal-typo' ), 'Minimal mode emits is-layout-minimal and is-preset-minimal-typo wrapper classes' );
		$this->assert_true( strpos( $minimal_html, 'gslider-post-carousel-title-wrapper' ) < strpos( $minimal_html, 'gslider-post-carousel-image' ), 'Minimal layout preserves contentOrder flow before thumbnail like Classic layout' );

		// 3. Centered Spotlight emits is-spotlight wrapper class, centeredSlides=true, float slidesPerView, and clamps scale/opacity.
		$spotlight_html = PostCarouselRenderer::render(
			array(
				'blockId'           => 'gslider-wave5a-spotlight',
				'postLayoutMode'    => 'overlay',
				'presetStyle'       => 'spotlight-center',
				'enableSpotlight'   => true,
				'carouselPerColumn' => array(
					'Desktop' => 1.6,
					'Tablet'  => 1.3,
					'Mobile'  => 1.1,
				),
			)
		);
		$this->assert_true( false !== strpos( $spotlight_html, 'is-layout-overlay is-preset-spotlight-center' ) && false !== strpos( $spotlight_html, 'is-spotlight' ), 'Spotlight stage adds is-spotlight alongside layout and preset classes' );

		preg_match( '/data-swiper-settings="([^"]+)"/', $spotlight_html, $swiper_match );
		$this->assert_true( ! empty( $swiper_match[1] ), 'Spotlight render includes serialized data-swiper-settings JSON' );
		$decoded_swiper = json_decode( html_entity_decode( $swiper_match[1] ?? '', ENT_QUOTES, 'UTF-8' ), true );
		$this->assert_same( true, $decoded_swiper['centeredSlides'] ?? null, 'Spotlight sets centeredSlides=true in Swiper settings' );
		$this->assert_same( 1.6, $decoded_swiper['breakpoints'][1025]['slidesPerView'] ?? null, 'Spotlight preserves float Desktop slidesPerView 1.6' );
		$this->assert_same( 1.3, $decoded_swiper['breakpoints'][768]['slidesPerView'] ?? null, 'Spotlight preserves float Tablet slidesPerView 1.3' );
		$this->assert_same( 1.1, $decoded_swiper['breakpoints'][0]['slidesPerView'] ?? null, 'Spotlight preserves float Mobile slidesPerView 1.1' );

		$spotlight_ctx_low = PostCarouselRenderer::build_render_context(
			array(
				'enableSpotlight'      => true,
				'spotlightScaleSide'   => 0.2,
				'spotlightOpacitySide' => 0.05,
			)
		);
		$this->assert_same( 0.8, $spotlight_ctx_low['spotlight_scale_side'], 'spotlightScaleSide clamps to minimum 0.80' );
		$this->assert_same( 0.3, $spotlight_ctx_low['spotlight_opacity_side'], 'spotlightOpacitySide clamps to minimum 0.30' );

		$spotlight_ctx_high = PostCarouselRenderer::build_render_context(
			array(
				'enableSpotlight'      => true,
				'spotlightScaleSide'   => 1.5,
				'spotlightOpacitySide' => 2.5,
			)
		);
		$this->assert_same( 0.98, $spotlight_ctx_high['spotlight_scale_side'], 'spotlightScaleSide clamps to maximum 0.98' );
		$this->assert_same( 1.0, $spotlight_ctx_high['spotlight_opacity_side'], 'spotlightOpacitySide clamps to maximum 1.00' );
	}

	/**
	 * Test 11: Newsroom Stage preset, synchronized headline queue playlist, and width/position clamping.
	 *
	 * @return void
	 */
	public function test_wave5b_newsroom_stage_preset_and_queue_rendering(): void {
		$this->reset_state();

		$this->assert_true( class_exists( NewsroomBuilder::class, false ), 'NewsroomBuilder class exists via ::class' );

		// 1. Newsroom Stage preset emits layout mode, preset class, queue-position-right, main swiper and queue aside.
		$newsroom_html = PostCarouselRenderer::render(
			array(
				'blockId'               => 'gslider-wave5b-newsroom',
				'postLayoutMode'        => 'newsroom',
				'presetStyle'           => 'newsroom-stage',
				'newsroomQueuePosition' => 'right',
				'newsroomMainWidth'     => 65,
			)
		);

		$this->assert_true( false !== strpos( $newsroom_html, 'is-layout-newsroom is-preset-newsroom-stage' ), 'Newsroom layout emits is-layout-newsroom and is-preset-newsroom-stage wrapper classes' );
		$this->assert_true( false !== strpos( $newsroom_html, 'queue-position-right' ), 'Newsroom layout defaults to queue-position-right wrapper class' );
		$this->assert_true( false !== strpos( $newsroom_html, '<div class="gslider-newsroom-main swiper"' ), 'Newsroom layout wraps main slider in gslider-newsroom-main swiper' );
		$this->assert_true( false !== strpos( $newsroom_html, '<aside class="gslider-newsroom-queue swiper"' ), 'Newsroom layout renders aside queue playlist track' );
		$this->assert_true( false !== strpos( $newsroom_html, 'gslider-newsroom-queue-item swiper-slide-thumb-active' ), 'First queue item slide carries swiper-slide-thumb-active class' );
		$this->assert_true( false !== strpos( $newsroom_html, 'class="gslider-queue-active-indicator"' ), 'Queue item contains active bar indicator' );
		$this->assert_true( false !== strpos( $newsroom_html, 'class="gslider-queue-title"' ), 'Queue item renders headline title' );
		$this->assert_true( false !== strpos( $newsroom_html, 'class="gslider-queue-meta"' ), 'Queue item renders reading time or date meta' );
		$this->assert_true( false !== strpos( $newsroom_html, 'min read' ), 'Reading time calculation estimates words into minute reading time' );

		// Reading time with Unicode/accented words calculates cleanly without splitting accented letters.
		$GLOBALS['gslider_test_render_posts'][0]->post_content = str_repeat( 'crème ', 150 );
		$this->assert_same( '1 min read', NewsroomBuilder::get_reading_time( 101 ), 'Multibyte and accented words calculate reading time cleanly without splitting accented letters' );

		// 2. Queue position left emits queue-position-left wrapper class.
		$newsroom_left_html = PostCarouselRenderer::render(
			array(
				'blockId'               => 'gslider-wave5b-newsroom-left',
				'postLayoutMode'        => 'newsroom',
				'presetStyle'           => 'newsroom-stage',
				'newsroomQueuePosition' => 'left',
			)
		);
		$this->assert_true( false !== strpos( $newsroom_left_html, 'queue-position-left' ), 'Newsroom layout with queue position left emits queue-position-left class' );

		// 3. Fallback thumbnail in queue items when post has no featured image.
		$this->reset_state();
		$GLOBALS['gslider_test_post_thumbnails'][101] = false;
		$GLOBALS['gslider_test_post_thumbnails'][102] = false;

		$fallback_queue_html = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-wave5b-queue-fallback',
				'postLayoutMode'       => 'newsroom',
				'presetStyle'          => 'newsroom-stage',
				'fallbackThumbnailUrl' => 'https://example.org/newsroom-fallback.jpg',
			)
		);
		$this->assert_true( false !== strpos( $fallback_queue_html, 'gslider-queue-fallback-img' ), 'Queue items use fallback thumbnail img when featured image missing' );
		$this->assert_true( false !== strpos( $fallback_queue_html, 'https://example.org/newsroom-fallback.jpg' ), 'Queue fallback thumbnail emits escaped fallback URL' );

		// 4. Clamping and validation: newsroom_main_width [50, 80] and newsroom_queue_position ['right', 'left'].
		$ctx_bounds_low = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'        => 'newsroom',
				'newsroomMainWidth'     => 25,
				'newsroomQueuePosition' => 'invalid_position',
			)
		);
		$this->assert_same( 50, $ctx_bounds_low['newsroom_main_width'], 'newsroomMainWidth clamps to minimum 50%' );
		$this->assert_same( 'right', $ctx_bounds_low['newsroom_queue_position'], 'Disallowed newsroomQueuePosition falls back to right' );

		$ctx_bounds_high = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'        => 'newsroom',
				'newsroomMainWidth'     => 99,
				'newsroomQueuePosition' => 'left',
			)
		);
		$this->assert_same( 80, $ctx_bounds_high['newsroom_main_width'], 'newsroomMainWidth clamps to maximum 80%' );
		$this->assert_same( 'left', $ctx_bounds_high['newsroom_queue_position'], 'newsroomQueuePosition preserves valid left' );
	}

	/**
	 * Test 12: Chronological Timeline Rail preset (`changelog-timeline`), continuous horizontal stems, dot and date node header.
	 *
	 * @return void
	 */
	public function test_wave5c_timeline_rail_preset_rendering(): void {
		$this->reset_state();

		$timeline_html = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-timeline-test',
				'postLayoutMode'       => 'timeline',
				'presetStyle'          => 'changelog-timeline',
				'timelineDatePosition' => 'above',
			)
		);

		// 1. Wrapper classes
		$this->assert_true( false !== strpos( $timeline_html, 'is-layout-timeline is-preset-changelog-timeline' ), 'Timeline layout emits is-layout-timeline and is-preset-changelog-timeline wrapper classes' );

		// 2. Card class
		$this->assert_true( false !== strpos( $timeline_html, 'is-timeline-card' ), 'Timeline card article carries is-timeline-card class' );

		// 3. Timeline node DOM elements
		$this->assert_true( false !== strpos( $timeline_html, 'class="gslider-timeline-node date-position-above"' ), 'Timeline node contains date-position-above by default' );
		$this->assert_true( false !== strpos( $timeline_html, '<div class="gslider-timeline-stem"></div>' ), 'Timeline node renders connector stem' );
		$this->assert_true( false !== strpos( $timeline_html, '<div class="gslider-timeline-dot">' ), 'Timeline node renders milestone dot' );
		$this->assert_true( false !== strpos( $timeline_html, '<div class="gslider-timeline-dot-inner"></div>' ), 'Timeline dot contains inner element' );
		$this->assert_true( false !== strpos( $timeline_html, '<time class="gslider-timeline-date" datetime="2026-11-10">' ), 'Timeline node renders date element with ISO datetime' );

		// 4. Date position below test
		$timeline_below_html = PostCarouselRenderer::render(
			array(
				'blockId'              => 'gslider-timeline-below',
				'postLayoutMode'       => 'timeline',
				'presetStyle'          => 'changelog-timeline',
				'timelineDatePosition' => 'below',
			)
		);
		$this->assert_true( false !== strpos( $timeline_below_html, 'class="gslider-timeline-node date-position-below"' ), 'Timeline node with date position below emits date-position-below class' );

		// 5. Clamping and validation: timeline_stem_thickness [1, 10], timeline_dot_size [8, 48], timeline_date_position ['above', 'below']
		$ctx_bounds_low = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'        => 'timeline',
				'timelineStemThickness' => 0,
				'timelineDotSize'       => 4,
				'timelineDatePosition'  => 'invalid_pos',
				'timelineStemColor'     => '#abc',
				'timelineDotColor'      => 'not-a-color',
			)
		);
		$this->assert_same( 1, $ctx_bounds_low['timeline_stem_thickness'], 'timelineStemThickness clamps to minimum 1px' );
		$this->assert_same( 8, $ctx_bounds_low['timeline_dot_size'], 'timelineDotSize clamps to minimum 8px' );
		$this->assert_same( 'above', $ctx_bounds_low['timeline_date_position'], 'Disallowed timelineDatePosition falls back to above' );
		$this->assert_same( '#abc', $ctx_bounds_low['timeline_stem_color'], 'timelineStemColor preserves valid hex' );
		$this->assert_same( '#007cba', $ctx_bounds_low['timeline_dot_color'], 'Invalid timelineDotColor falls back to default #007cba' );

		$ctx_colors = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'    => 'timeline',
				'timelineStemColor' => 'rgba(255, 0, 0, 0.5)',
				'timelineDotColor'  => 'var(--wp--preset--color--primary)',
			)
		);
		$this->assert_same( 'rgba(255, 0, 0, 0.5)', $ctx_colors['timeline_stem_color'], 'timelineStemColor preserves valid rgba color' );
		$this->assert_same( 'var(--wp--preset--color--primary)', $ctx_colors['timeline_dot_color'], 'timelineDotColor preserves valid CSS variable' );

		$ctx_bounds_high = PostCarouselRenderer::build_render_context(
			array(
				'postLayoutMode'        => 'timeline',
				'timelineStemThickness' => 50,
				'timelineDotSize'       => 100,
				'timelineDatePosition'  => 'below',
			)
		);
		$this->assert_same( 10, $ctx_bounds_high['timeline_stem_thickness'], 'timelineStemThickness clamps to maximum 10px' );
		$this->assert_same( 48, $ctx_bounds_high['timeline_dot_size'], 'timelineDotSize clamps to maximum 48px' );
		$this->assert_same( 'below', $ctx_bounds_high['timeline_date_position'], 'Valid timelineDatePosition preserves below' );
	}

	/**
	 * Test 13: Wave 6 Editorial Meta (Reading Time, Comment Count, Relative Dates, Badge Cap & Meta Separators).
	 *
	 * @return void
	 */
	public function test_wave6_editorial_meta_reading_time_relative_dates_comments_separators_and_badge_cap(): void {
		$this->reset_state();

		// 1. Reading Time default (enabled) & Comments (disabled by default) & Default Separator (bullet '•').
		$default_html = PostCarouselRenderer::render(
			array(
				'blockId' => 'gslider-editorial-default',
			)
		);
		$this->assert_true( false !== strpos( $default_html, 'class="gslider-post-reading-time-wrapper"' ), 'Reading time wrapper renders when showReadingTime is default true' );
		$this->assert_true( false !== strpos( $default_html, 'min read' ), 'Reading time formatted min read string renders' );
		$this->assert_true( false === strpos( $default_html, 'class="gslider-post-comments-wrapper"' ), 'Comment count wrapper is omitted when showCommentCount is default false' );
		$this->assert_true( false !== strpos( $default_html, '<span class="gslider-meta-sep" aria-hidden="true">•</span>' ), 'Default meta separator bullet renders between meta items' );
		$this->assert_true( false !== strpos( $default_html, '<time class="gslider-post-date" datetime="2026-11-10T12:00:00+00:00">November 10, 2026</time>' ), 'Semantic <time> tag wraps standard date with ISO datetime attribute' );

		// 2. Reading Time disabled, Comment Count enabled, Relative Date, Pipe separator ('|').
		$editorial_html = PostCarouselRenderer::render(
			array(
				'blockId'          => 'gslider-editorial-custom',
				'showReadingTime'  => false,
				'showCommentCount' => true,
				'dateFormat'       => 'relative',
				'metaSeparator'    => 'pipe',
			)
		);
		$this->assert_true( false === strpos( $editorial_html, 'class="gslider-post-reading-time-wrapper"' ), 'Reading time wrapper is omitted when showReadingTime is false' );
		$this->assert_true( false !== strpos( $editorial_html, 'class="gslider-post-comments-wrapper"' ), 'Comment count wrapper renders when showCommentCount is true' );
		$this->assert_true( false !== strpos( $editorial_html, '<svg class="gslider-meta-icon" aria-hidden="true"' ), 'Comment count renders speech bubble SVG icon' );
		$this->assert_true( false !== strpos( $editorial_html, '3 comments' ), 'Comment count renders formatted comments string' );
		$this->assert_true( false !== strpos( $editorial_html, 'http://example.org/test-post/#comments' ), 'Comment count links to comments section' );
		$this->assert_true( false !== strpos( $editorial_html, '1 day ago' ), 'Relative date renders human_time_diff string wrapped in %s ago' );
		$this->assert_true( false !== strpos( $editorial_html, '<span class="gslider-meta-sep" aria-hidden="true">|</span>' ), 'Pipe meta separator renders between active meta items' );

		// 3. Separators: slash, dash, none.
		$slash_html = PostCarouselRenderer::render( array( 'blockId' => 'gslider-sep-slash', 'metaSeparator' => 'slash' ) );
		$this->assert_true( false !== strpos( $slash_html, '<span class="gslider-meta-sep" aria-hidden="true">/</span>' ), 'Slash separator renders correctly' );

		$dash_html = PostCarouselRenderer::render( array( 'blockId' => 'gslider-sep-dash', 'metaSeparator' => 'dash' ) );
		$this->assert_true( false !== strpos( $dash_html, '<span class="gslider-meta-sep" aria-hidden="true">—</span>' ), 'Dash separator renders correctly' );

		$none_html = PostCarouselRenderer::render( array( 'blockId' => 'gslider-sep-none', 'metaSeparator' => 'none' ) );
		$this->assert_true( false === strpos( $none_html, 'class="gslider-meta-sep"' ), 'Meta separator span is omitted when metaSeparator is none' );

		// 4. Taxonomy Badge Cap: taxonomyMaxCount
		$GLOBALS['gslider_test_post_categories'][101] = array(
			(object) array( 'term_id' => 10, 'name' => 'Tech' ),
			(object) array( 'term_id' => 11, 'name' => 'Design' ),
			(object) array( 'term_id' => 12, 'name' => 'News' ),
			(object) array( 'term_id' => 13, 'name' => 'Tutorials' ),
		);
		$capped_html = PostCarouselRenderer::render(
			array(
				'blockId'          => 'gslider-badge-cap',
				'taxonomyMaxCount' => 2,
			)
		);
		$this->assert_true( false !== strpos( $capped_html, 'Tech</a>' ), 'First category badge renders within cap' );
		$this->assert_true( false !== strpos( $capped_html, 'Design</a>' ), 'Second category badge renders within cap' );
		$this->assert_true( false === strpos( $capped_html, 'News</a>' ), 'Third category badge is truncated by taxonomyMaxCount' );
		$this->assert_true( false === strpos( $capped_html, 'Tutorials</a>' ), 'Fourth category badge is truncated by taxonomyMaxCount' );
		$this->assert_true( false !== strpos( $capped_html, '<span class="gslider-category-item is-more-badge"><span class="screen-reader-text">2 more categories</span><span aria-hidden="true">+2</span></span>' ), '+2 overflow badge renders with accessible screen-reader-text and aria-hidden badge' );

		// 5. Context Clamping & Validation
		$ctx_clamped = PostCarouselRenderer::build_render_context(
			array(
				'taxonomyMaxCount' => 0,
				'dateFormat'       => 'invalid_date_format',
				'metaSeparator'    => 'invalid_separator',
			)
		);
		$this->assert_same( 1, $ctx_clamped['taxonomy_max_count'], 'taxonomyMaxCount clamps 0 to minimum 1' );
		$this->assert_same( 'default', $ctx_clamped['date_format'], 'Invalid dateFormat falls back to default' );
		$this->assert_same( 'bullet', $ctx_clamped['meta_separator'], 'Invalid metaSeparator falls back to bullet' );

		$ctx_high = PostCarouselRenderer::build_render_context(
			array(
				'taxonomyMaxCount' => 99,
				'dateFormat'       => 'relative',
				'metaSeparator'    => 'dash',
			)
		);
		$this->assert_same( 5, $ctx_high['taxonomy_max_count'], 'taxonomyMaxCount clamps 99 to maximum 5' );
		$this->assert_same( 'relative', $ctx_high['date_format'], 'Valid relative dateFormat is preserved' );
		$this->assert_same( 'dash', $ctx_high['meta_separator'], 'Valid dash metaSeparator is preserved' );
	}

	/**
	 * Test 14: Wave 7 Marquee Ticker, Autoplay Progress Line, and Desktop-Grid / Mobile-Carousel Responsive Mode.
	 *
	 * @return void
	 */
	public function test_wave7_marquee_autoplay_progress_and_mobile_only_grid(): void {
		$this->reset_state();

		// 1. Marquee Ticker mode Swiper settings & HTML output
		$marquee_attrs = array(
			'blockId'              => 'gslider-test-marquee',
			'carouselMode'         => 'marquee',
			'marqueeSpeed'         => 7500,
			'marqueePauseOnHover'  => false,
			'showAutoplayProgress' => true,
		);
		$marquee_html = PostCarouselRenderer::render( $marquee_attrs );
		$this->assert_true( false !== strpos( $marquee_html, 'is-mode-marquee' ), 'Marquee mode emits is-mode-marquee wrapper class' );
		$this->assert_true( false === strpos( $marquee_html, 'has-autoplay-progress' ), 'Marquee mode omits has-autoplay-progress wrapper class' );
		$this->assert_true( false === strpos( $marquee_html, 'swiper-button-prev' ), 'Marquee mode renders zero navigation buttons' );
		$this->assert_true( false === strpos( $marquee_html, 'swiper-pagination' ), 'Marquee mode renders zero pagination' );
		$this->assert_true( false === strpos( $marquee_html, 'gslider-autoplay-progress' ), 'Marquee mode omits autoplay progress line even if showAutoplayProgress is true' );

		preg_match( '/data-swiper-settings="([^"]+)"/', $marquee_html, $marquee_match );
		$this->assert_true( ! empty( $marquee_match[1] ), 'Marquee render includes serialized data-swiper-settings' );
		$marquee_settings = json_decode( html_entity_decode( $marquee_match[1] ?? '', ENT_QUOTES, 'UTF-8' ), true );

		$this->assert_same( 'slide', $marquee_settings['effect'], 'Marquee sets slide effect' );
		$this->assert_true( ! empty( $marquee_settings['freeMode']['enabled'] ), 'Marquee enables freeMode' );
		$this->assert_same( false, $marquee_settings['freeMode']['momentum'], 'Marquee disables freeMode momentum' );
		$this->assert_same( 7500, $marquee_settings['speed'], 'Marquee sets custom speed' );
		$this->assert_same( 0, $marquee_settings['autoplay']['delay'], 'Marquee sets delay to 0 for continuous scroll' );
		$this->assert_same( false, $marquee_settings['autoplay']['pauseOnMouseEnter'], 'Marquee honors marqueePauseOnHover=false' );
		$this->assert_true( $marquee_settings['loop'], 'Marquee enables loop' );
		$this->assert_same( false, $marquee_settings['allowTouchMove'], 'Marquee disables touch move' );
		$this->assert_same( false, $marquee_settings['breakpoints'][1025]['navigation']['enabled'], 'Marquee disables breakpoint navigation' );
		$this->assert_same( false, $marquee_settings['breakpoints'][1025]['pagination']['enabled'], 'Marquee disables breakpoint pagination' );

		// 2. Desktop-Grid / Mobile-Carousel mode Swiper settings & HTML output
		$mobile_only_attrs = array(
			'blockId'      => 'gslider-test-mobile-only',
			'carouselMode' => 'mobile-only',
		);
		$mobile_only_html = PostCarouselRenderer::render( $mobile_only_attrs );
		$this->assert_true( false !== strpos( $mobile_only_html, 'is-mode-mobile-only' ), 'Mobile-only mode emits is-mode-mobile-only wrapper class' );

		preg_match( '/data-swiper-settings="([^"]+)"/', $mobile_only_html, $mobile_match );
		$this->assert_true( ! empty( $mobile_match[1] ), 'Mobile-only render includes serialized data-swiper-settings' );
		$mobile_only_settings = json_decode( html_entity_decode( $mobile_match[1] ?? '', ENT_QUOTES, 'UTF-8' ), true );

		$this->assert_same( false, $mobile_only_settings['breakpoints'][1025]['enabled'], 'Mobile-only mode disables Swiper on Desktop breakpoint (>=1025px)' );

		// 3. Autoplay Countdown Progress Line (Top & Bottom positions)
		$progress_top_html = PostCarouselRenderer::render(
			array(
				'blockId'                  => 'gslider-progress-top',
				'showAutoplayProgress'     => true,
				'autoplayProgressPosition' => 'top',
			)
		);
		$this->assert_true( false !== strpos( $progress_top_html, 'has-autoplay-progress' ), 'Autoplay progress line emits has-autoplay-progress wrapper class' );
		$this->assert_true( false !== strpos( $progress_top_html, '<div class="gslider-autoplay-progress position-top" aria-hidden="true"><span class="gslider-autoplay-progress-fill"></span></div>' ), 'Autoplay progress line renders at top position before slides' );

		$progress_bottom_html = PostCarouselRenderer::render(
			array(
				'blockId'                  => 'gslider-progress-bottom',
				'showAutoplayProgress'     => true,
				'autoplayProgressPosition' => 'bottom',
			)
		);
		$this->assert_true( false !== strpos( $progress_bottom_html, '<div class="gslider-autoplay-progress position-bottom" aria-hidden="true"><span class="gslider-autoplay-progress-fill"></span></div>' ), 'Autoplay progress line renders at bottom position after slides' );

		// 4. Clamping and bounds validation
		$ctx_clamped_low = PostCarouselRenderer::build_render_context(
			array(
				'carouselMode'             => 'invalid-mode',
				'marqueeSpeed'             => 100,
				'autoplayProgressPosition' => 'invalid-position',
				'autoplayProgressHeight'   => 0,
				'desktopGridColumns'       => 0,
				'desktopGridGap'           => -10,
			)
		);
		$this->assert_same( 'carousel', $ctx_clamped_low['carousel_mode'], 'Invalid carouselMode falls back to carousel' );
		$this->assert_same( 500, $ctx_clamped_low['marquee_speed'], 'marqueeSpeed clamps 100 to minimum 500ms' );
		$this->assert_same( 'top', $ctx_clamped_low['autoplay_progress_position'], 'Invalid autoplayProgressPosition falls back to top' );
		$this->assert_same( 1, $ctx_clamped_low['autoplay_progress_height'], 'autoplayProgressHeight clamps 0 to minimum 1px' );
		$this->assert_same( 1, $ctx_clamped_low['desktop_grid_columns'], 'desktopGridColumns clamps 0 to minimum 1' );
		$this->assert_same( 0, $ctx_clamped_low['desktop_grid_gap'], 'desktopGridGap clamps negative to minimum 0px' );

		$ctx_clamped_high = PostCarouselRenderer::build_render_context(
			array(
				'marqueeSpeed'           => 50000,
				'autoplayProgressHeight' => 100,
				'desktopGridColumns'     => 20,
				'desktopGridGap'         => 300,
			)
		);
		$this->assert_same( 30000, $ctx_clamped_high['marquee_speed'], 'marqueeSpeed clamps 50000 to maximum 30000ms' );
		$this->assert_same( 30, $ctx_clamped_high['autoplay_progress_height'], 'autoplayProgressHeight clamps 100 to maximum 30px' );
		$this->assert_same( 6, $ctx_clamped_high['desktop_grid_columns'], 'desktopGridColumns clamps 20 to maximum 6' );
		$this->assert_same( 100, $ctx_clamped_high['desktop_grid_gap'], 'desktopGridGap clamps 300 to maximum 100px' );
	}

	/**
	 * Test 15: Wave 8 Google Carousel SEO Schema (ItemList + BlogPosting JSON-LD) and frontend-only gating.
	 *
	 * @return void
	 */
	public function test_wave8_google_carousel_seo_schema(): void {
		$this->reset_state();
		$this->assert_true( class_exists( SchemaBuilder::class, false ), 'SchemaBuilder class exists via ::class' );

		// 1. Admin/editor requests must NEVER emit JSON-LD schema markup.
		$GLOBALS['is_admin_mock'] = true;
		$admin_html               = PostCarouselRenderer::render(
			array(
				'blockId'            => 'gslider-schema-admin',
				'enableSchemaMarkup' => true,
			)
		);
		$this->assert_true( false === strpos( $admin_html, 'application/ld+json' ), 'Admin/editor context omits JSON-LD schema markup' );

		// 2. REST and feed requests must suppress JSON-LD schema markup even when not in admin.
		$GLOBALS['is_admin_mock'] = false;
		$GLOBALS['is_rest_mock']  = true;
		$rest_html                = PostCarouselRenderer::render( array( 'blockId' => 'gslider-schema-rest' ) );
		$this->assert_true( false === strpos( $rest_html, 'application/ld+json' ), 'REST preview context omits JSON-LD schema markup' );

		$GLOBALS['is_rest_mock'] = false;
		$GLOBALS['is_feed_mock'] = true;
		$feed_html               = PostCarouselRenderer::render( array( 'blockId' => 'gslider-schema-feed' ) );
		$this->assert_true( false === strpos( $feed_html, 'application/ld+json' ), 'Feed context omits JSON-LD schema markup' );

		// 3. Frontend request renders JSON-LD by default when enableSchemaMarkup is omitted.
		$GLOBALS['is_feed_mock'] = false;
		$frontend_html           = PostCarouselRenderer::render( array( 'blockId' => 'gslider-schema-front' ) );
		$this->assert_true( false !== strpos( $frontend_html, '<script type="application/ld+json">' ), 'Frontend renders JSON-LD script by default when enableSchemaMarkup is omitted' );

		$matched = preg_match( '/<script type="application\/ld\+json">([^<]+)<\/script>/', $frontend_html, $schema_match );
		$this->assert_same( 1, $matched, 'Single valid application/ld+json script tag renders cleanly' );
		$decoded = json_decode( $schema_match[1] ?? '', true );
		$this->assert_true( is_array( $decoded ), 'JSON-LD payload decodes into an associative array' );
		$this->assert_same( 'https://schema.org', $decoded['@context'] ?? null, 'Schema sets https://schema.org @context' );
		$this->assert_same( 'ItemList', $decoded['@type'] ?? null, 'Schema sets ItemList @type' );
		$this->assert_same( 2, count( $decoded['itemListElement'] ?? array() ), 'ItemList includes all rendered posts' );
		$this->assert_same( 1, $decoded['itemListElement'][0]['position'] ?? null, 'First ListItem starts at 1-based position 1' );
		$this->assert_same( 2, $decoded['itemListElement'][1]['position'] ?? null, 'Second ListItem advances to position 2' );
		$this->assert_same( 'BlogPosting', $decoded['itemListElement'][0]['item']['@type'] ?? null, 'Item @type is BlogPosting' );
		$this->assert_same( 'https://example.org/post-101/#gslider-blogposting', $decoded['itemListElement'][0]['item']['@id'] ?? null, 'First item @id uses #gslider-blogposting fragment' );
		$this->assert_same( 'https://example.org/post-101/', $decoded['itemListElement'][0]['item']['url'] ?? null, 'First item url matches post permalink' );
		$this->assert_same( 'Jane Author', $decoded['itemListElement'][0]['item']['author']['name'] ?? null, 'First item author uses post author display_name' );
		$this->assert_same( 'John Editor', $decoded['itemListElement'][1]['item']['author']['name'] ?? null, 'Second item author resolves second post author' );
		$this->assert_same( 'https://example.org/img-101.jpg', $decoded['itemListElement'][0]['item']['image'] ?? null, 'First item includes featured image URL' );

		// 4. Toggling enableSchemaMarkup off completely omits JSON-LD tag.
		$disabled_html = PostCarouselRenderer::render(
			array(
				'blockId'            => 'gslider-schema-off',
				'enableSchemaMarkup' => false,
			)
		);
		$this->assert_true( false === strpos( $disabled_html, 'application/ld+json' ), 'Disabling enableSchemaMarkup removes JSON-LD script completely' );

		// 5. Filter hook gslider_post_carousel_schema_data allows suppression and modification.
		add_filter( 'gslider_post_carousel_schema_data', '__return_false' );
		$suppressed_html = PostCarouselRenderer::render( array( 'blockId' => 'gslider-schema-suppressed' ) );
		$this->assert_true( false === strpos( $suppressed_html, 'application/ld+json' ), 'Returning false from gslider_post_carousel_schema_data suppresses JSON-LD output' );
		remove_all_filters( 'gslider_post_carousel_schema_data' );

		// Reset global context flags cleanly.
		$GLOBALS['is_admin_mock'] = true;
		$GLOBALS['is_rest_mock']  = false;
		$GLOBALS['is_feed_mock']  = false;
	}
}

try {
	( new PostCarouselRendererTest() )->run_all_tests();
} finally {
	restore_error_handler();
}
