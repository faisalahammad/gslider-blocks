<?php
/**
 * Global Query and Helper utilities for GSlider Blocks.
 *
 * Provides static helper methods to compile WP_Query parameters and
 * execute queries for different dynamic blocks.
 *
 * @package GSlider\Utils
 * @since   1.2.0
 */

namespace GSlider\Utils;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( Helper::class, false ) ) {

    /**
     * Provides helper services for query compilation and utility helpers.
     *
     * @since 1.2.0
     */
    class Helper {

        /**
         * Compiles taxonomy query parameters into WP_Query tax_query array.
         *
         * @since 1.2.0
         *
         * @param array $categories Standard categories list.
         * @param array $tags       Standard tags list.
         * @param array $taxonomies Custom taxonomy slug => term IDs array.
         * @return array Compiled tax_query array.
         */
        public static function build_tax_query( array $categories = [], $category_filter_type = 'include', array $tags = [], $tag_filter_type = 'include', array $taxonomies = [], array $taxonomy_filter_types = [] ) {
            // Backward compatibility checks
            if ( is_array( $category_filter_type ) ) {
                $taxonomies            = $tags;
                $tags                  = $category_filter_type;
                $category_filter_type  = 'include';
                $tag_filter_type       = 'include';
                $taxonomy_filter_types = [];
            }

            $tax_query = array();

            if ( ! empty( $categories ) ) {
                $operator    = ( 'exclude' === $category_filter_type ) ? 'NOT IN' : 'IN';
                $tax_query[] = array(
                    'taxonomy' => 'category',
                    'field'    => 'term_id',
                    'terms'    => array_map( 'intval', $categories ),
                    'operator' => $operator,
                );
            }

            if ( ! empty( $tags ) ) {
                $operator    = ( 'exclude' === $tag_filter_type ) ? 'NOT IN' : 'IN';
                $tax_query[] = array(
                    'taxonomy' => 'post_tag',
                    'field'    => 'term_id',
                    'terms'    => array_map( 'intval', $tags ),
                    'operator' => $operator,
                );
            }

            if ( ! empty( $taxonomies ) && is_array( $taxonomies ) ) {
                foreach ( $taxonomies as $tax_slug => $term_ids ) {
                    if ( ! empty( $term_ids ) ) {
                        $tax_filter_type = isset( $taxonomy_filter_types[ $tax_slug ] ) ? $taxonomy_filter_types[ $tax_slug ] : 'include';
                        $operator        = ( 'exclude' === $tax_filter_type ) ? 'NOT IN' : 'IN';
                        $tax_query[]     = array(
                            'taxonomy' => sanitize_text_field( $tax_slug ),
                            'field'    => 'term_id',
                            'terms'    => array_map( 'intval', (array) $term_ids ),
                            'operator' => $operator,
                        );
                    }
                }
            }

            if ( ! empty( $tax_query ) ) {
                if ( count( $tax_query ) > 1 ) {
                    $tax_query['relation'] = 'AND';
                }
            }

            return $tax_query;
        }

        /**
         * Compiles author query parameters into WP_Query author parameters.
         *
         * @since 1.2.0
         *
         * @param array  $authors            Author IDs array.
         * @param string $author_filter_type Include or exclude switcher.
         * @return array Compiled author query parameters.
         */
        public static function build_author_query( array $authors = [], string $author_filter_type = 'include' ) {
            $author_query = array();
            if ( empty( $authors ) ) {
                return $author_query;
            }

            if ( 'exclude' === $author_filter_type ) {
                $author_query['author__not_in'] = array_map( 'intval', $authors );
            } else {
                $author_query['author__in'] = array_map( 'intval', $authors );
            }

            return $author_query;
        }

        /**
         * Generates standard WP_Query date_query parameters based on relative date ranges.
         *
         * @since 1.2.0
         *
         * @param string $date_range Relative range identifier.
         * @return array Compiled date_query parameters.
         */
        public static function build_date_query( string $date_range ) {
            if ( empty( $date_range ) || 'any' === $date_range ) {
                return array();
            }

            $date_query = array();
            switch ( $date_range ) {
                case 'last_24_hours':
                    $date_query[] = array( 'after' => '24 hours ago' );
                    break;
                case 'last_7_days':
                    $date_query[] = array( 'after' => '7 days ago' );
                    break;
                case 'last_30_days':
                    $date_query[] = array( 'after' => '30 days ago' );
                    break;
                case 'last_365_days':
                    $date_query[] = array( 'after' => '1 year ago' );
                    break;
                case 'current_month':
                    $date_query[] = array(
                        'year'  => (int) wp_date( 'Y' ),
                        'month' => (int) wp_date( 'm' ),
                    );
                    break;
                case 'current_year':
                    $date_query[] = array(
                        'year' => (int) wp_date( 'Y' ),
                    );
                    break;
            }

            return $date_query;
        }

        /**
         * Compiles a single custom field metadata comparison array.
         *
         * @since 1.2.0
         *
         * @param string $meta_key     The custom field key.
         * @param string $meta_value   The custom field value.
         * @param string $meta_compare The comparison operator.
         * @return array Compiled meta_query subarray.
         */
        public static function build_meta_query( string $meta_key, string $meta_value = '', string $meta_compare = '=' ) {
            $meta_key = sanitize_text_field( $meta_key );
            if ( '' === $meta_key ) {
                return array();
            }

            $allowed_compares = array( '=', '!=', '>', '>=', '<', '<=', 'LIKE', 'NOT LIKE', 'EXISTS', 'NOT EXISTS' );
            $meta_compare     = strtoupper( sanitize_text_field( $meta_compare ) );
            if ( ! in_array( $meta_compare, $allowed_compares, true ) ) {
                $meta_compare = '=';
            }

            $meta_query = array(
                'key'     => $meta_key,
                'compare' => $meta_compare,
            );

            if ( '' !== $meta_value && ! in_array( $meta_compare, array( 'EXISTS', 'NOT EXISTS' ), true ) ) {
                $meta_query['value'] = sanitize_text_field( $meta_value );
            }

            return array( $meta_query );
        }

        /**
         * Compiles excluded post IDs list.
         *
         * @since 1.2.0
         *
         * @param string $exclude_posts_string Comma-separated post IDs.
         * @param bool   $exclude_current      Option to exclude the current active post.
         * @return array Flat array of excluded post ID integers.
         */
        public static function build_excluded_posts( string $exclude_posts_string = '', bool $exclude_current = false ) {
            $excluded_ids = array();

            if ( ! empty( $exclude_posts_string ) ) {
                $excluded_ids = array_map( 'intval', explode( ',', $exclude_posts_string ) );
            }

            if ( $exclude_current ) {
                $current_id = get_the_ID();
                if ( $current_id ) {
                    $excluded_ids[] = $current_id;
                }
            }

            return array_unique( $excluded_ids );
        }

        /**
         * Calculates multilingual estimated reading time in minutes.
         *
         * Strips shortcodes and tags, and applies multi-byte character counting
         * at 500 chars/min for CJK scripts (Chinese Hanzi/Kanji, Japanese Kana, Korean Hangul),
         * and 200 words/min for Latin and other space-delimited scripts.
         *
         * @since 1.2.3
         *
         * @param mixed $content          Post content string.
         * @param int   $words_per_minute Reading speed in words per minute (default 200).
         * @return int Estimated reading time in minutes (minimum 1).
         */
        public static function calculate_reading_time( $content, int $words_per_minute = 200 ): int {
            if ( empty( $content ) || ! is_string( $content ) ) {
                return 1;
            }

            $clean_content = strip_shortcodes( wp_strip_all_tags( $content ) );
            $clean_content = trim( $clean_content );
            if ( '' === $clean_content ) {
                return 1;
            }

            // Pattern covering CJK Ideographs (Hanzi/Kanji), Hiragana, Katakana, and Hangul Syllables/Jamo.
            $cjk_pattern = '/[\x{4e00}-\x{9fa5}\x{3040}-\x{309f}\x{30a0}-\x{30ff}\x{ac00}-\x{d7af}\x{1100}-\x{11ff}\x{3130}-\x{318f}]/u';

            // Match all CJK characters.
            preg_match_all( $cjk_pattern, $clean_content, $cjk_matches );
            $cjk_char_count = ! empty( $cjk_matches[0] ) ? count( $cjk_matches[0] ) : 0;

            // Strip CJK characters and count remaining space-separated words.
            $non_cjk_content = preg_replace( $cjk_pattern, ' ', $clean_content );
            $words           = preg_split( '/\s+/u', (string) $non_cjk_content, -1, PREG_SPLIT_NO_EMPTY );
            $word_count      = is_array( $words ) ? count( $words ) : 0;

            // CJK characters at 500 chars/min; Latin/other words at $words_per_minute (default 200).
            $cjk_wpm    = 500;
            $cjk_time   = $cjk_char_count / $cjk_wpm;
            $latin_time = $word_count / max( 1, $words_per_minute );
            $total_time = $cjk_time + $latin_time;

            return max( 1, (int) ceil( $total_time ) );
        }
    }
}
