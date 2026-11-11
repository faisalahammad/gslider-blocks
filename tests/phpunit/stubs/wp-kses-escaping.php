<?php
/**
 * Shared lightweight WordPress escaping and KSES stubs for standalone CLI unit tests.
 *
 * Loaded before tests/phpunit/bootstrap.php by tests that need strict HTML/URL
 * escaping, plural _n() localization, or DOMDocument-backed wp_kses() filtering
 * in place of pass-through defaults.
 *
 * Excluded from automatic test discovery via the `* /stubs/*` exclusion rule.
 *
 * @package GSlider\Tests\Stubs
 */

if ( ! function_exists( 'esc_html' ) ) {
	/**
	 * Stub for WordPress esc_html() escaping HTML special characters.
	 *
	 * @param string $text Raw text.
	 * @return string Escaped HTML text.
	 */
	function esc_html( $text ) {
		return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
	}
}

if ( ! function_exists( 'esc_url' ) ) {
	/**
	 * Stub for WordPress esc_url() rejecting unsafe protocols.
	 *
	 * @param string $url Raw URL.
	 * @return string Sanitized URL or empty string for dangerous protocols.
	 */
	function esc_url( $url ) {
		$url = trim( (string) $url );
		if ( '' === $url ) {
			return '';
		}
		if ( preg_match( '/^\s*(javascript|vbscript|data):/i', $url ) ) {
			return '';
		}
		return htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );
	}
}

if ( ! function_exists( '_n' ) ) {
	/**
	 * Stub for WordPress plural localization _n().
	 *
	 * @param string $single Singular text.
	 * @param string $plural Plural text.
	 * @param int    $number Quantity.
	 * @param string $domain Text domain.
	 * @return string Singular or plural string.
	 */
	function _n( $single, $plural, $number, $domain = 'default' ) {
		unset( $domain );
		return 1 === (int) $number ? $single : $plural;
	}
}

if ( ! function_exists( 'wp_kses' ) ) {
	/**
	 * Lightweight DOMDocument-backed wp_kses() stub modeling tag/attribute allowlist filtering.
	 *
	 * Note: Exercises tag and attribute allowlisting cleanly in CLI runs, though
	 * full WordPress Core KSES protocol/CSS attribute parsing only runs in WordPress Core.
	 *
	 * @param string $string       Content to filter through KSES.
	 * @param array  $allowed_html Allowed tags and lowercase attribute flags.
	 * @return string Filtered HTML/SVG markup.
	 */
	function wp_kses( $string, $allowed_html ) {
		if ( ! is_string( $string ) || '' === $string ) {
			return '';
		}

		$normalized_allowed = [];
		if ( is_array( $allowed_html ) ) {
			foreach ( $allowed_html as $tag => $attrs ) {
				$tag_lower                        = strtolower( (string) $tag );
				$normalized_allowed[ $tag_lower ] = [];
				if ( is_array( $attrs ) ) {
					foreach ( $attrs as $attr => $enabled ) {
						$normalized_allowed[ $tag_lower ][ strtolower( (string) $attr ) ] = (bool) $enabled;
					}
				}
			}
		}

		$previous_errors = libxml_use_internal_errors( true );
		$doc             = new DOMDocument();
		$wrapped         = '<?xml encoding="utf-8" ?><div id="__gslider_stub_kses_root__">' . $string . '</div>';
		$loaded          = $doc->loadHTML( $wrapped, LIBXML_NONET | LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR | LIBXML_NOWARNING );
		libxml_clear_errors();
		libxml_use_internal_errors( $previous_errors );

		if ( ! $loaded ) {
			return '';
		}

		$root = null;
		foreach ( $doc->childNodes as $child ) {
			if ( $child instanceof DOMElement && '__gslider_stub_kses_root__' === $child->getAttribute( 'id' ) ) {
				$root = $child;
				break;
			}
		}

		if ( ! $root ) {
			return '';
		}

		$filter_node = static function ( DOMNode $node ) use ( &$filter_node, $doc, $normalized_allowed ): void {
			$children = [];
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

			if ( '__gslider_stub_kses_root__' === $node->getAttribute( 'id' ) ) {
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
