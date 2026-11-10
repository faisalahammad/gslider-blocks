<?php
/**
 * Post Carousel Block - Server-Side Render
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block default content.
 * @var WP_Block $block      Block instance.
 *
 * @package GSlider\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Helper: extract responsive int value for all breakpoints
if ( ! function_exists( 'gslider_get_responsive_int' ) ) {
    function gslider_get_responsive_int( $attr, $defaults ) {
        if ( ! isset( $attr ) ) {
            return $defaults;
        }
        if ( is_array( $attr ) ) {
            return array(
                'Desktop' => intval( $attr['Desktop'] ?? $defaults['Desktop'] ),
                'Tablet'  => intval( $attr['Tablet']  ?? $defaults['Tablet'] ),
                'Mobile'  => intval( $attr['Mobile']  ?? $defaults['Mobile'] ),
            );
        }
        $val = intval( $attr );
        return array( 'Desktop' => $val, 'Tablet' => $val, 'Mobile' => $val );
    }
}
if ( ! function_exists( 'gslider_get_responsive_float' ) ) {
    function gslider_get_responsive_float( $attr, $defaults ) {
        if ( ! isset( $attr ) ) {
            return $defaults;
        }
        if ( is_array( $attr ) ) {
            return array(
                'Desktop' => floatval( $attr['Desktop'] ?? $defaults['Desktop'] ),
                'Tablet'  => floatval( $attr['Tablet']  ?? $defaults['Tablet'] ),
                'Mobile'  => floatval( $attr['Mobile']  ?? $defaults['Mobile'] ),
            );
        }
        $val = floatval( $attr );
        return array( 'Desktop' => $val, 'Tablet' => $val, 'Mobile' => $val );
    }
}

// Extract attributes with defaults
$block_id            = isset( $attributes['blockId'] ) ? sanitize_html_class( $attributes['blockId'] ) : '';
$global_id           = isset( $attributes['globalID'] ) ? sanitize_html_class( $attributes['globalID'] ) : '';
$global_class        = isset( $attributes['globalClass'] ) ? sanitize_html_class( $attributes['globalClass'] ) : '';
$enable_lazy_load    = ! empty( $attributes['enableLazyLoad'] );
$post_title_html_tag = isset( $attributes['postTitleHtmlTag'] ) ? sanitize_key( $attributes['postTitleHtmlTag'] ) : 'h3';
$post_excerpt_html_tag = isset( $attributes['postExcerptHtmlTag'] ) ? sanitize_key( $attributes['postExcerptHtmlTag'] ) : 'p';

// Excerpt Settings
$enable_post_excerpt_limit = ! empty( $attributes['enablePostExcerptLimit'] );
$post_excerpt_limit_type   = isset( $attributes['postExcerptLimitType'] ) ? sanitize_text_field( $attributes['postExcerptLimitType'] ) : 'words';
$post_excerpt_limit_raw    = isset( $attributes['postExcerptLimit'] ) ? $attributes['postExcerptLimit'] : null;
$post_excerpt_limit        = gslider_get_responsive_int( $post_excerpt_limit_raw, array( 'Desktop' => 20, 'Tablet' => 20, 'Mobile' => 20 ) );
$post_excerpt_limit_suffix = isset( $attributes['postExcerptLimitSuffix'] ) ? sanitize_text_field( $attributes['postExcerptLimitSuffix'] ) : '...';
$post_excerpt_source       = isset( $attributes['postExcerptSource'] ) ? sanitize_text_field( $attributes['postExcerptSource'] ) : 'auto';

// Title Settings
$enable_post_title_limit          = ! empty( $attributes['enablePostTitleLimit'] );
$post_title_limit_type           = isset( $attributes['postTitleLimitType'] ) ? sanitize_text_field( $attributes['postTitleLimitType'] ) : 'words';
$post_title_limit_raw            = isset( $attributes['postTitleLimit'] ) ? $attributes['postTitleLimit'] : null;
$post_title_limit                = gslider_get_responsive_int( $post_title_limit_raw, array( 'Desktop' => 10, 'Tablet' => 10, 'Mobile' => 10 ) );
$post_title_limit_suffix         = isset( $attributes['postTitleLimitSuffix'] ) ? sanitize_text_field( $attributes['postTitleLimitSuffix'] ) : '...';

$enable_post_title_link           = isset( $attributes['enablePostTitleLink'] ) ? (bool) $attributes['enablePostTitleLink'] : true;
$post_title_link_target           = ! empty( $attributes['postTitleLinkTarget'] );
$post_title_link_nofollow         = ! empty( $attributes['postTitleLinkNofollow'] );
$post_title_link_sponsored        = ! empty( $attributes['postTitleLinkSponsored'] );
$enable_post_title_hover_underline_anim = ! empty( $attributes['enablePostTitleHoverUnderlineAnim'] );

$show_post_title_divider         = ! empty( $attributes['showPostTitleDivider'] );
$post_title_divider_style        = isset( $attributes['postTitleDividerStyle'] ) ? sanitize_text_field( $attributes['postTitleDividerStyle'] ) : 'solid';
$post_title_divider_color        = isset( $attributes['postTitleDividerColor'] ) ? sanitize_text_field( $attributes['postTitleDividerColor'] ) : '#333333';
$post_title_divider_hover_color  = isset( $attributes['postTitleDividerHoverColor'] ) ? sanitize_text_field( $attributes['postTitleDividerHoverColor'] ) : '';
$post_title_divider_width_raw    = isset( $attributes['postTitleDividerWidth'] ) ? $attributes['postTitleDividerWidth'] : null;
$post_title_divider_width        = gslider_get_responsive_int( $post_title_divider_width_raw, array( 'Desktop' => 50, 'Tablet' => 50, 'Mobile' => 50 ) );
$post_title_divider_height_raw   = isset( $attributes['postTitleDividerHeight'] ) ? $attributes['postTitleDividerHeight'] : null;
$post_title_divider_height       = gslider_get_responsive_int( $post_title_divider_height_raw, array( 'Desktop' => 2, 'Tablet' => 2, 'Mobile' => 2 ) );
$enable_post_title_divider_hover_expand = ! empty( $attributes['enablePostTitleDividerHoverExpand'] );

// Animation settings
$card_entrance_animation  = isset( $attributes['cardEntranceAnimation'] ) ? sanitize_html_class( $attributes['cardEntranceAnimation'] ) : 'none';
$animation_duration_raw   = isset( $attributes['cardEntranceAnimationDuration'] ) ? $attributes['cardEntranceAnimationDuration'] : null;
$animation_delay_raw      = isset( $attributes['cardEntranceAnimationDelay'] )    ? $attributes['cardEntranceAnimationDelay']    : null;
$animation_offset_raw     = isset( $attributes['cardEntranceAnimationOffset'] )   ? $attributes['cardEntranceAnimationOffset']   : null;
$animation_duration       = gslider_get_responsive_int( $animation_duration_raw, array( 'Desktop' => 600, 'Tablet' => 600, 'Mobile' => 600 ) );
$animation_delay          = gslider_get_responsive_int( $animation_delay_raw,    array( 'Desktop' => 0,   'Tablet' => 0,   'Mobile' => 0   ) );
$animation_offset         = gslider_get_responsive_int( $animation_offset_raw,   array( 'Desktop' => 15,  'Tablet' => 15,  'Mobile' => 15  ) );
$animation_easing         = isset( $attributes['cardEntranceAnimationEasing'] ) ? sanitize_text_field( $attributes['cardEntranceAnimationEasing'] ) : 'ease-out';
$enable_stagger           = ! empty( $attributes['enableStaggerAnimation'] );
$stagger_delay_raw        = isset( $attributes['cardStaggerDelay'] ) ? $attributes['cardStaggerDelay'] : null;
$stagger_delay            = gslider_get_responsive_int( $stagger_delay_raw, array( 'Desktop' => 100, 'Tablet' => 100, 'Mobile' => 100 ) );
$card_hover_animation     = isset( $attributes['cardHoverAnimation'] ) ? sanitize_html_class( $attributes['cardHoverAnimation'] ) : 'none';
$enable_tilt              = ! empty( $attributes['enableCardTilt'] );
$tilt_max_angle_raw       = isset( $attributes['cardTiltMaxAngle'] )       ? $attributes['cardTiltMaxAngle']       : null;
$tilt_perspective_raw     = isset( $attributes['cardTiltPerspective'] )    ? $attributes['cardTiltPerspective']    : null;
$tilt_scale_raw           = isset( $attributes['cardTiltHoverScale'] )     ? $attributes['cardTiltHoverScale']     : null;
$tilt_speed_raw           = isset( $attributes['cardTiltTransitionSpeed'] )? $attributes['cardTiltTransitionSpeed']: null;
$tilt_max_angle           = gslider_get_responsive_int(   $tilt_max_angle_raw,   array( 'Desktop' => 12,   'Tablet' => 12,   'Mobile' => 12   ) );
$tilt_perspective         = gslider_get_responsive_int(   $tilt_perspective_raw, array( 'Desktop' => 800,  'Tablet' => 800,  'Mobile' => 800  ) );
$tilt_scale               = gslider_get_responsive_float( $tilt_scale_raw,       array( 'Desktop' => 1.02, 'Tablet' => 1.02, 'Mobile' => 1.02 ) );
$tilt_speed               = gslider_get_responsive_int(   $tilt_speed_raw,       array( 'Desktop' => 400,  'Tablet' => 400,  'Mobile' => 400  ) );

$has_entrance_animation = 'none' !== $card_entrance_animation;


// Carousel settings
$carousel_per_column     = isset( $attributes['carouselPerColumn'] ) ? $attributes['carouselPerColumn'] : array( 'Desktop' => 3, 'Tablet' => 2, 'Mobile' => 1 );
$carousel_per_column_gap = isset( $attributes['carouselPerColumnGap'] ) ? $attributes['carouselPerColumnGap'] : array( 'Desktop' => 10, 'Tablet' => 10, 'Mobile' => 10 );
$speed                   = isset( $attributes['speed'] ) ? $attributes['speed'] : array( 'Desktop' => 800, 'Tablet' => 800, 'Mobile' => 800 );
$autoplay                = ! empty( $attributes['autoplay'] );
$autoplay_delay          = isset( $attributes['autoplayDelay'] ) ? $attributes['autoplayDelay'] : array( 'Desktop' => 1000, 'Tablet' => 1000, 'Mobile' => 1000 );
$infinite_loop           = isset( $attributes['infiniteLoop'] ) ? (bool) $attributes['infiniteLoop'] : true;
$allow_touch_move        = isset( $attributes['allowTouchMove'] ) ? (bool) $attributes['allowTouchMove'] : true;
$pause_on_hover          = ! empty( $attributes['pauseOnHover'] );
$stop_on_last_slide      = ! empty( $attributes['stopOnLastSlide'] );
$reverse_direction       = ! empty( $attributes['reverseDirection'] );
$carousel_effect         = isset( $attributes['carouselEffect'] ) ? sanitize_text_field( $attributes['carouselEffect'] ) : 'slide';
$mousewheel_control      = ! empty( $attributes['mousewheelControl'] );
$keyboard_navigation     = ! empty( $attributes['keyboardNavigation'] );
$pagination_type         = isset( $attributes['paginationType'] ) ? sanitize_text_field( $attributes['paginationType'] ) : 'bullets';
$dynamic_bullets         = ! empty( $attributes['dynamicBullets'] );

// Read More Button settings
$read_more_button_text        = ! empty( $attributes['readMoreButtonText'] ) ? sanitize_text_field( $attributes['readMoreButtonText'] ) : 'Read More';
$read_more_button_link_type   = isset( $attributes['readMoreButtonLinkType'] ) ? sanitize_text_field( $attributes['readMoreButtonLinkType'] ) : 'post';
$read_more_button_link        = isset( $attributes['readMoreButtonLink'] ) ? $attributes['readMoreButtonLink'] : '#';
$read_more_button_target_link = isset( $attributes['readMoreButtonTargetLink'] ) ? (bool) $attributes['readMoreButtonTargetLink'] : true;
$read_more_button_nofollow    = ! empty( $attributes['readMoreButtonNofollow'] );
$read_more_button_sponsored   = ! empty( $attributes['readMoreButtonSponsored'] );
$show_read_more_button        = isset( $attributes['showReadMoreButton'] ) ? $attributes['showReadMoreButton'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$read_more_button_icon_switcher = isset( $attributes['readMoreButtonIconSwitcher'] ) ? (bool) $attributes['readMoreButtonIconSwitcher'] : true;
$read_more_button_icon_type     = isset( $attributes['readMoreButtonIconType'] ) ? sanitize_text_field( $attributes['readMoreButtonIconType'] ) : 'icon';
$read_more_button_icon_position = isset( $attributes['readMoreButtonIconPosition'] ) ? sanitize_text_field( $attributes['readMoreButtonIconPosition'] ) : 'right';
$read_more_button_icon_html     = isset( $attributes['readMoreButtonIconHtml'] ) ? $attributes['readMoreButtonIconHtml'] : '';
$read_more_button_icon_img_url  = isset( $attributes['readMoreButtonIconImageUrl'] ) ? esc_url_raw( $attributes['readMoreButtonIconImageUrl'] ) : '';
$read_more_button_icon_img_alt  = isset( $attributes['readMoreButtonIconImageAlt'] ) ? sanitize_text_field( $attributes['readMoreButtonIconImageAlt'] ) : 'Right Arrow';

// Show/Hide Elements
$show_navigation     = isset( $attributes['showNavigation'] ) ? $attributes['showNavigation'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_pagination     = isset( $attributes['showPagination'] ) ? $attributes['showPagination'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_featured_image = isset( $attributes['showFeaturedImage'] ) ? $attributes['showFeaturedImage'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_post_title     = isset( $attributes['showPostTitle'] )     ? $attributes['showPostTitle']     : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_excerpt        = isset( $attributes['showExcerpt'] )        ? $attributes['showExcerpt']        : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_meta           = isset( $attributes['showMeta'] )           ? $attributes['showMeta']           : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_meta_author_raw = isset( $attributes['showMetaAuthor'] ) ? $attributes['showMetaAuthor'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_meta_avatar_raw = isset( $attributes['showMetaAvatar'] ) ? $attributes['showMetaAvatar'] : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_meta_date_raw   = isset( $attributes['showMetaDate'] )   ? $attributes['showMetaDate']   : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );
$show_taxonomy       = isset( $attributes['showTaxonomy'] )       ? $attributes['showTaxonomy']       : array( 'Desktop' => true, 'Tablet' => true, 'Mobile' => true );

$enable_taxonomy_badge_overlay     = ! empty( $attributes['enableTaxonomyBadgeOverlay'] );
$taxonomy_badge_overlay_position   = isset( $attributes['taxonomyBadgeOverlayPosition'] ) ? sanitize_text_field( $attributes['taxonomyBadgeOverlayPosition'] ) : 'top-left';
$taxonomy_badge_overlay_visibility = isset( $attributes['taxonomyBadgeOverlayVisibility'] ) ? sanitize_text_field( $attributes['taxonomyBadgeOverlayVisibility'] ) : 'always';

$any_image_enabled    = ! empty( $show_featured_image['Desktop'] ) || ! empty( $show_featured_image['Tablet'] ) || ! empty( $show_featured_image['Mobile'] );
$any_title_enabled    = ! empty( $show_post_title['Desktop'] )     || ! empty( $show_post_title['Tablet'] )     || ! empty( $show_post_title['Mobile'] );
$any_excerpt_enabled  = ! empty( $show_excerpt['Desktop'] )        || ! empty( $show_excerpt['Tablet'] )        || ! empty( $show_excerpt['Mobile'] );
$any_meta_enabled     = ! empty( $show_meta['Desktop'] )           || ! empty( $show_meta['Tablet'] )           || ! empty( $show_meta['Mobile'] );
$any_author_enabled   = ! empty( $show_meta_author_raw['Desktop'] ) || ! empty( $show_meta_author_raw['Tablet'] ) || ! empty( $show_meta_author_raw['Mobile'] );
$any_avatar_enabled   = ! empty( $show_meta_avatar_raw['Desktop'] ) || ! empty( $show_meta_avatar_raw['Tablet'] ) || ! empty( $show_meta_avatar_raw['Mobile'] );
$any_date_enabled     = ! empty( $show_meta_date_raw['Desktop'] )   || ! empty( $show_meta_date_raw['Tablet'] )   || ! empty( $show_meta_date_raw['Mobile'] );
$any_taxonomy_enabled = ! empty( $show_taxonomy['Desktop'] )       || ! empty( $show_taxonomy['Tablet'] )       || ! empty( $show_taxonomy['Mobile'] );

// Navigation settings
$pagination_position_type     = isset( $attributes['paginationPositionType'] ) ? sanitize_text_field( $attributes['paginationPositionType'] ) : 'outside';
$navigation_arrow_position_type = isset( $attributes['navigationArrowPositionType'] ) ? sanitize_text_field( $attributes['navigationArrowPositionType'] ) : 'outside';
$navigation_arrow_position      = isset( $attributes['navigationArrowPosition'] ) ? sanitize_text_field( $attributes['navigationArrowPosition'] ) : 'center';

// Navigation Custom Icon settings
$navigation_arrows_icon_switcher      = isset( $attributes['navigationArrowsIconSwitcher'] ) ? (bool) $attributes['navigationArrowsIconSwitcher'] : false;

$navigation_arrows_icon_left_align    = isset( $attributes['navigationArrowsIconLeftAlign'] ) ? sanitize_text_field( $attributes['navigationArrowsIconLeftAlign'] ) : 'icon';
$navigation_arrows_icon_left_html     = isset( $attributes['navigationArrowsIconLeftHtml'] ) ? $attributes['navigationArrowsIconLeftHtml'] : '';
$navigation_arrows_icon_left_img_url  = isset( $attributes['navigationArrowsIconLeftImageUrl'] ) ? esc_url_raw( $attributes['navigationArrowsIconLeftImageUrl'] ) : '';
$navigation_arrows_icon_left_img_alt  = isset( $attributes['navigationArrowsIconLeftImageAlt'] ) ? sanitize_text_field( $attributes['navigationArrowsIconLeftImageAlt'] ) : 'Left Arrow';

$navigation_arrows_icon_right_align   = isset( $attributes['navigationArrowsIconRightAlign'] ) ? sanitize_text_field( $attributes['navigationArrowsIconRightAlign'] ) : 'icon';
$navigation_arrows_icon_right_html    = isset( $attributes['navigationArrowsIconRightHtml'] ) ? $attributes['navigationArrowsIconRightHtml'] : '';
$navigation_arrows_icon_right_img_url = isset( $attributes['navigationArrowsIconRightImageUrl'] ) ? esc_url_raw( $attributes['navigationArrowsIconRightImageUrl'] ) : '';
$navigation_arrows_icon_right_img_alt = isset( $attributes['navigationArrowsIconRightImageAlt'] ) ? sanitize_text_field( $attributes['navigationArrowsIconRightImageAlt'] ) : 'Right Arrow';

// Compile left/right arrow inner markup and container class
$left_arrow_inner = '';
$right_arrow_inner = '';
$nav_container_class = 'gslider-navigation-default-icon-wrapper';

if ( $navigation_arrows_icon_switcher ) {
    $nav_container_class = 'gslider-navigation-custom-icon-wrapper';

    if ( 'icon' === $navigation_arrows_icon_left_align && ! empty( $navigation_arrows_icon_left_html ) ) {
        $left_arrow_inner = $navigation_arrows_icon_left_html;
    } elseif ( 'image' === $navigation_arrows_icon_left_align && ! empty( $navigation_arrows_icon_left_img_url ) ) {
        $left_arrow_inner = '<img src="' . esc_url( $navigation_arrows_icon_left_img_url ) . '" alt="' . esc_attr( $navigation_arrows_icon_left_img_alt ) . '" />';
    }

    if ( 'icon' === $navigation_arrows_icon_right_align && ! empty( $navigation_arrows_icon_right_html ) ) {
        $right_arrow_inner = $navigation_arrows_icon_right_html;
    } elseif ( 'image' === $navigation_arrows_icon_right_align && ! empty( $navigation_arrows_icon_right_img_url ) ) {
        $right_arrow_inner = '<img src="' . esc_url( $navigation_arrows_icon_right_img_url ) . '" alt="' . esc_attr( $navigation_arrows_icon_right_img_alt ) . '" />';
    }
}

// Check if elements enabled
$any_navigation_enabled       = ! empty( $show_navigation['Desktop'] ) || ! empty( $show_navigation['Tablet'] ) || ! empty( $show_navigation['Mobile'] );
$any_pagination_enabled       = ! empty( $show_pagination['Desktop'] ) || ! empty( $show_pagination['Tablet'] ) || ! empty( $show_pagination['Mobile'] );
$any_read_more_button_enabled = ! empty( $show_read_more_button['Desktop'] ) || ! empty( $show_read_more_button['Tablet'] ) || ! empty( $show_read_more_button['Mobile'] );

// Content Order Normalization
$default_content_order = array( 'thumbnail', 'categories', 'title', 'excerpt', 'meta', 'readmore' );
$content_order         = isset( $attributes['contentOrder'] ) && is_array( $attributes['contentOrder'] ) ? $attributes['contentOrder'] : $default_content_order;
$content_order         = array_values( array_unique( array_intersect( $content_order, $default_content_order ) ) );
foreach ( $default_content_order as $key ) {
    if ( ! in_array( $key, $content_order, true ) ) {
        $content_order[] = $key;
    }
}

// Parse query attributes with defaults (Block-specific)
$post_type             = isset( $attributes['postType'] ) ? sanitize_text_field( $attributes['postType'] ) : 'post';
$posts_per_page        = 6;
if ( isset( $attributes['postsPerPage'] ) ) {
    if ( is_array( $attributes['postsPerPage'] ) ) {
        $posts_per_page = isset( $attributes['postsPerPage']['Desktop'] ) ? intval( $attributes['postsPerPage']['Desktop'] ) : 6;
    } else {
        $posts_per_page = intval( $attributes['postsPerPage'] );
    }
}
// Cap the count so a value like -1 cannot load every post.
$posts_per_page        = max( 1, min( 30, $posts_per_page ) );
$categories            = isset( $attributes['categories'] ) ? array_map( 'intval', (array) $attributes['categories'] ) : array();
$category_filter_type  = isset( $attributes['categoryFilterType'] ) ? sanitize_text_field( $attributes['categoryFilterType'] ) : 'include';
$tags                  = isset( $attributes['tags'] ) ? array_map( 'intval', (array) $attributes['tags'] ) : array();
$tag_filter_type       = isset( $attributes['tagFilterType'] ) ? sanitize_text_field( $attributes['tagFilterType'] ) : 'include';
$authors               = isset( $attributes['authors'] ) ? array_map( 'intval', (array) $attributes['authors'] ) : array();
$author_filter_type    = isset( $attributes['authorFilterType'] ) ? sanitize_text_field( $attributes['authorFilterType'] ) : 'include';
$exclude_posts         = isset( $attributes['excludePosts'] ) ? sanitize_text_field( $attributes['excludePosts'] ) : '';
$offset                = 0;
if ( isset( $attributes['offset'] ) ) {
    if ( is_array( $attributes['offset'] ) ) {
        $offset = isset( $attributes['offset']['Desktop'] ) ? intval( $attributes['offset']['Desktop'] ) : 0;
    } else {
        $offset = intval( $attributes['offset'] );
    }
}
$orderby               = isset( $attributes['orderBy'] ) ? sanitize_text_field( $attributes['orderBy'] ) : 'date';
$order                 = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'desc';
$search_query          = isset( $attributes['searchQuery'] ) ? sanitize_text_field( $attributes['searchQuery'] ) : '';
$sticky_posts          = isset( $attributes['stickyPosts'] ) ? sanitize_text_field( $attributes['stickyPosts'] ) : 'include';
$taxonomy_query        = isset( $attributes['taxonomyQuery'] ) ? $attributes['taxonomyQuery'] : array();
$taxonomy_filter_types = isset( $attributes['taxonomyFilterTypes'] ) ? $attributes['taxonomyFilterTypes'] : array();
$meta_key              = isset( $attributes['metaKey'] ) ? sanitize_text_field( $attributes['metaKey'] ) : '';
$meta_value            = isset( $attributes['metaValue'] ) ? sanitize_text_field( $attributes['metaValue'] ) : '';
$meta_compare          = isset( $attributes['metaCompare'] ) ? sanitize_text_field( $attributes['metaCompare'] ) : '=';
$date_range            = isset( $attributes['dateRange'] ) ? sanitize_text_field( $attributes['dateRange'] ) : 'any';
$exclude_current_post  = ! empty( $attributes['excludeCurrentPost'] );

$use_related_posts_query = ! empty( $attributes['useRelatedPostsQuery'] );
$related_posts_taxonomy  = isset( $attributes['relatedPostsTaxonomy'] ) ? sanitize_text_field( $attributes['relatedPostsTaxonomy'] ) : 'category';

if ( $use_related_posts_query ) {
    $current_post_id = get_the_ID();
    $resolved_post_type = $current_post_id ? get_post_type( $current_post_id ) : $post_type;

    $query_args = array(
        'post_type'      => $resolved_post_type,
        'posts_per_page' => $posts_per_page,
        'post_status'    => 'publish',
        'orderby'        => $orderby,
        'order'          => $order,
    );

    // Build tax query matching the current post's categories/tags
    $tax_query = array();
    if ( $current_post_id ) {
        if ( 'category' === $related_posts_taxonomy || 'both' === $related_posts_taxonomy ) {
            $current_cats = wp_get_post_categories( $current_post_id );
            if ( ! empty( $current_cats ) ) {
                $tax_query[] = array(
                    'taxonomy' => 'category',
                    'field'    => 'term_id',
                    'terms'    => $current_cats,
                    'operator' => 'IN',
                );
            }
        }

        if ( 'post_tag' === $related_posts_taxonomy || 'both' === $related_posts_taxonomy ) {
            $current_tags = wp_get_post_terms( $current_post_id, 'post_tag', array( 'fields' => 'ids' ) );
            if ( ! empty( $current_tags ) && ! is_wp_error( $current_tags ) ) {
                $tax_query[] = array(
                    'taxonomy' => 'post_tag',
                    'field'    => 'term_id',
                    'terms'    => $current_tags,
                    'operator' => 'IN',
                );
            }
        }

        if ( ! empty( $tax_query ) ) {
            if ( count( $tax_query ) > 1 ) {
                $tax_query['relation'] = 'OR';
            }
            $query_args['tax_query'] = $tax_query;
        } else {
            // Force return empty query if no tax matches exist (avoid showing all posts)
            $query_args['post__in'] = array( 0 );
        }
    }

    // Force exclude current post
    $excluded_ids = array();
    if ( $current_post_id ) {
        $excluded_ids[] = $current_post_id;
    }
    if ( ! empty( $exclude_posts ) ) {
        $additional_excludes = array_map( 'intval', explode( ',', $exclude_posts ) );
        $excluded_ids = array_merge( $excluded_ids, $additional_excludes );
    }
    $query_args['post__not_in'] = array_unique( $excluded_ids );

    if ( $offset > 0 ) {
        $query_args['offset'] = $offset;
    }
} else {
    // Construct query arguments for WP_Query
    $query_args = array(
        'post_type'      => $post_type,
        'posts_per_page' => $posts_per_page,
        'post_status'    => 'publish',
        'orderby'        => $orderby,
        'order'          => $order,
    );

    // Call Helper methods to compile dynamic options
    $tax_query = \GSlider\Utils\Helper::build_tax_query( $categories, $category_filter_type, $tags, $tag_filter_type, $taxonomy_query, $taxonomy_filter_types );
    if ( ! empty( $tax_query ) ) {
        $query_args['tax_query'] = $tax_query;
    }

    $author_query = \GSlider\Utils\Helper::build_author_query( $authors, $author_filter_type );
    if ( ! empty( $author_query ) ) {
        $query_args = array_merge( $query_args, $author_query );
    }

    if ( $offset > 0 ) {
        $query_args['offset'] = $offset;
    }

    $excluded_ids = \GSlider\Utils\Helper::build_excluded_posts( $exclude_posts, $exclude_current_post );
    if ( ! empty( $excluded_ids ) ) {
        $query_args['post__not_in'] = $excluded_ids;
    }

    if ( ! empty( $search_query ) ) {
        $query_args['s'] = $search_query;
    }

    $date_query = \GSlider\Utils\Helper::build_date_query( $date_range );
    if ( ! empty( $date_query ) ) {
        $query_args['date_query'] = $date_query;
    }

    $meta_query = \GSlider\Utils\Helper::build_meta_query( $meta_key, $meta_value, $meta_compare );
    if ( ! empty( $meta_query ) ) {
        $query_args['meta_query'] = $meta_query;
        if ( in_array( $orderby, array( 'meta_value', 'meta_value_num' ), true ) ) {
            $query_args['meta_key'] = $meta_key;
        }
    }

    // Construct Sticky Posts rules
    if ( 'exclude' === $sticky_posts ) {
        $sticky_ids = get_option( 'sticky_posts' );
        if ( ! empty( $sticky_ids ) ) {
            $query_args['post__not_in'] = isset( $query_args['post__not_in'] )
                ? array_merge( $query_args['post__not_in'], $sticky_ids )
                : $sticky_ids;
        }
    } elseif ( 'only' === $sticky_posts ) {
        $sticky_ids = get_option( 'sticky_posts' );
        $query_args['post__in'] = ! empty( $sticky_ids ) ? $sticky_ids : array( 0 );
    }
}

$posts_query = new WP_Query( $query_args );

// Enforce the 1–30 cap even when WP_Query prepends sticky posts beyond posts_per_page.
if ( is_array( $posts_query->posts ) && count( $posts_query->posts ) > $posts_per_page ) {
    $posts_query->posts      = array_slice( $posts_query->posts, 0, $posts_per_page );
    $posts_query->post_count = count( $posts_query->posts );
}

if ( ! $posts_query->have_posts() ) {
    wp_reset_postdata();
    return;
}

// Build Swiper settings for frontend
$navigation_enabled_data = array(
    'Mobile'  => ! empty( $show_navigation['Mobile'] ),
    'Tablet'  => ! empty( $show_navigation['Tablet'] ),
    'Desktop' => ! empty( $show_navigation['Desktop'] ),
);

$pagination_enabled_data = array(
    'Mobile'  => ! empty( $show_pagination['Mobile'] ),
    'Tablet'  => ! empty( $show_pagination['Tablet'] ),
    'Desktop' => ! empty( $show_pagination['Desktop'] ),
);

$swiper_settings = array(
    'effect' => $carousel_effect,

    'breakpoints' => array(
        0    => array(
            'slidesPerView' => isset( $carousel_per_column['Mobile'] ) ? (int) $carousel_per_column['Mobile'] : 1,
            'spaceBetween'  => isset( $carousel_per_column_gap['Mobile'] ) ? (int) $carousel_per_column_gap['Mobile'] : 0,
            'speed'         => isset( $speed['Mobile'] ) ? (int) $speed['Mobile'] : 800,
            'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Mobile'] ) ? (int) $autoplay_delay['Mobile'] : 1000 ) : false,
            'navigation'    => array( 'enabled' => $navigation_enabled_data['Mobile'] ),
            'pagination'    => array( 'enabled' => $pagination_enabled_data['Mobile'] ),
        ),
        768  => array(
            'slidesPerView' => isset( $carousel_per_column['Tablet'] ) ? (int) $carousel_per_column['Tablet'] : 2,
            'spaceBetween'  => isset( $carousel_per_column_gap['Tablet'] ) ? (int) $carousel_per_column_gap['Tablet'] : 20,
            'speed'         => isset( $speed['Tablet'] ) ? (int) $speed['Tablet'] : 800,
            'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Tablet'] ) ? (int) $autoplay_delay['Tablet'] : 1000 ) : false,
            'navigation'    => array( 'enabled' => $navigation_enabled_data['Tablet'] ),
            'pagination'    => array( 'enabled' => $pagination_enabled_data['Tablet'] ),
        ),
        1025 => array(
            'slidesPerView' => isset( $carousel_per_column['Desktop'] ) ? (int) $carousel_per_column['Desktop'] : 3,
            'spaceBetween'  => isset( $carousel_per_column_gap['Desktop'] ) ? (int) $carousel_per_column_gap['Desktop'] : 20,
            'speed'         => isset( $speed['Desktop'] ) ? (int) $speed['Desktop'] : 800,
            'autoplay'      => $autoplay ? array( 'delay' => isset( $autoplay_delay['Desktop'] ) ? (int) $autoplay_delay['Desktop'] : 1000 ) : false,
            'navigation'    => array( 'enabled' => $navigation_enabled_data['Desktop'] ),
            'pagination'    => array( 'enabled' => $pagination_enabled_data['Desktop'] ),
        ),
    ),

    'loop'           => $infinite_loop,
    'autoplay'       => $autoplay ? array(
        'pauseOnMouseEnter'    => $pause_on_hover || $enable_tilt || 'none' !== $card_hover_animation,
        'disableOnInteraction' => false,
        'stopOnLastSlide'      => $stop_on_last_slide,
        'reverseDirection'     => $reverse_direction,
    ) : false,
    'allowTouchMove'  => $allow_touch_move,
    'mousewheel'      => $mousewheel_control,
    'keyboard'        => $keyboard_navigation ? array(
        'enabled'        => true,
        'onlyInViewport' => true,
        'pageUpDown'     => false,
    ) : false,

    'navigation' => array(
        'enabled' => $any_navigation_enabled,
        'nextEl'  => '.' . $block_id . ' .swiper-button-next',
        'prevEl'  => '.' . $block_id . ' .swiper-button-prev',
    ),

    'pagination' => array(
        'enabled'        => $any_pagination_enabled,
        'el'             => '.' . $block_id . ' .swiper-pagination-post-carousel',
        'type'           => $pagination_type,
        'dynamicBullets' => 'bullets' === $pagination_type ? $dynamic_bullets : false,
        'clickable'      => true,
    ),
);

$swiper_settings_json = wp_json_encode( $swiper_settings );

// Animation data attributes for wrapper
$animation_settings_json = wp_json_encode( array(
    'duration' => $animation_duration,
    'delay'    => $animation_delay,
    'offset'   => $animation_offset,
    'easing'   => $animation_easing,
) );

// Wrapper classes
$wrapper_classes = array(
    'gslider-post-carousel-wrapper',
    $block_id,
    $navigation_arrow_position_type,
    $navigation_arrow_position,
);

if ( 'none' !== $card_hover_animation ) {
    $wrapper_classes[] = 'gslider-card-hover-' . $card_hover_animation;
}

if ( $any_pagination_enabled ) {
    $wrapper_classes[] = 'has-pagination';
}

$wrapper_data = array(
    'class'                => implode( ' ', array_filter( $wrapper_classes ) ),
    'data-swiper-settings' => $swiper_settings_json,
);

if ( $has_entrance_animation ) {
    $wrapper_data['data-animation-settings'] = $animation_settings_json;
}
if ( $enable_stagger && $has_entrance_animation ) {
    $wrapper_data['data-stagger-enabled'] = '1';
    $wrapper_data['data-stagger-delay']   = wp_json_encode( $stagger_delay );
}
if ( $enable_tilt ) {
    $wrapper_data['data-tilt-max']         = wp_json_encode( $tilt_max_angle );
    $wrapper_data['data-tilt-perspective'] = wp_json_encode( $tilt_perspective );
    $wrapper_data['data-tilt-scale']       = wp_json_encode( $tilt_scale );
    $wrapper_data['data-tilt-speed']       = wp_json_encode( $tilt_speed );
}

$wrapper_attributes = get_block_wrapper_attributes( $wrapper_data );

?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="swiper" role="region" aria-label="<?php esc_attr_e( 'Post Carousel', 'gslider-blocks' ); ?>">
        <div class="swiper-wrapper">
            <?php
            while ( $posts_query->have_posts() ) :
                $posts_query->the_post();
                $post_id    = get_the_ID();
                $categories = get_the_category( $post_id );

                // Build taxonomy HTML markup for reuse
                $taxonomy_markup = '';
                if ( $any_taxonomy_enabled ) {
                    $post_taxonomy_display = isset( $attributes['postTaxonomyDisplay'] ) ? $attributes['postTaxonomyDisplay'] : 'category';
                    $show_cat = ( 'category' === $post_taxonomy_display || 'both' === $post_taxonomy_display );
                    $show_tag = ( 'tag' === $post_taxonomy_display || 'both' === $post_taxonomy_display );

                    ob_start();
                    if ( $show_cat && ! empty( $categories ) ) {
                        ?>
                        <div class="gslider-post-carousel-categories">
                            <?php foreach ( $categories as $cat ) : ?>
                                <span class="gslider-category-item"><a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>"><?php echo esc_html( $cat->name ); ?></a></span>
                            <?php endforeach; ?>
                        </div>
                        <?php
                    }

                    if ( $show_tag ) {
                        $post_tags = get_the_tags( $post_id );
                        if ( ! empty( $post_tags ) ) {
                            ?>
                            <div class="gslider-post-carousel-tags">
                                <?php foreach ( $post_tags as $tag ) : ?>
                                    <span class="gslider-tag-item"><a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"><?php echo esc_html( $tag->name ); ?></a></span>
                                <?php endforeach; ?>
                            </div>
                            <?php
                        }
                    }
                    $taxonomy_markup = ob_get_clean();
                }

                // Smart Excerpt fallback and limit rendering
                $raw_excerpt = '';
                if ( 'excerpt' === $post_excerpt_source ) {
                    if ( has_excerpt( $post_id ) ) {
                        $raw_excerpt = get_the_excerpt( $post_id );
                    }
                } elseif ( 'content' === $post_excerpt_source ) {
                    $raw_excerpt = get_the_content( null, false, $post_id );
                } else {
                    $raw_excerpt = get_the_excerpt( $post_id );
                }

                $clean_excerpt = strip_shortcodes( $raw_excerpt );
                $clean_excerpt = wp_strip_all_tags( $clean_excerpt );
                $clean_excerpt = trim( $clean_excerpt );

                if ( ! $enable_post_excerpt_limit ) {
                    $excerpt = $clean_excerpt;
                } else {
                    $limit_val = isset( $post_excerpt_limit['Desktop'] ) ? intval( $post_excerpt_limit['Desktop'] ) : 20;
                    if ( $limit_val <= 0 ) {
                        $limit_val = 20;
                    }

                    if ( 'characters' === $post_excerpt_limit_type ) {
                        if ( mb_strlen( $clean_excerpt ) > $limit_val ) {
                            $excerpt = mb_substr( $clean_excerpt, 0, $limit_val ) . $post_excerpt_limit_suffix;
                        } else {
                            $excerpt = $clean_excerpt;
                        }
                    } else {
                        $excerpt = wp_trim_words( $clean_excerpt, $limit_val, $post_excerpt_limit_suffix );
                    }
                }
                ?>
                <div class="swiper-slide">
                    <div class="gslider-post-carousel-content-wrapper <?php echo esc_attr( $global_class ); ?>"<?php echo $global_id ? ' id="' . esc_attr( $global_id ) . '"' : ''; ?>>
                <article class="gslider-post-carousel-card<?php
                    if ( $has_entrance_animation ) {
                        echo ' animated ' . esc_attr( $card_entrance_animation ) . ' gslider-has-entrance-anim';
                    }
                    if ( $enable_tilt ) {
                        echo ' gslider-has-tilt';
                    }
                ?>">
                            <?php
                            foreach ( $content_order as $element ) {
                                switch ( $element ) {
                                    case 'thumbnail':
                                        if ( $any_image_enabled && has_post_thumbnail( $post_id ) ) :
                                            ?>
                                            <div class="gslider-post-carousel-image">
                                                <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                                                     <?php
                                                     global $gslider_first_image_optimized;
                                                     $img_attributes = array(
                                                         'loading' => ( ! isset( $gslider_first_image_optimized ) || ! $gslider_first_image_optimized ) ? 'eager' : ( $enable_lazy_load ? 'lazy' : 'eager' ),
                                                         'alt'     => get_the_title(),
                                                     );
                                                     if ( ! isset( $gslider_first_image_optimized ) || ! $gslider_first_image_optimized ) {
                                                         $img_attributes['fetchpriority'] = 'high';
                                                         $gslider_first_image_optimized = true;
                                                     }
                                                     the_post_thumbnail( 'medium_large', $img_attributes );
                                                     ?>
                                                </a>
                                                <?php if ( $enable_taxonomy_badge_overlay && ! empty( $taxonomy_markup ) ) : ?>
                                                    <div class="gslider-taxonomy-badge-overlay gslider-badge-visibility-<?php echo esc_attr( $taxonomy_badge_overlay_visibility ); ?> gslider-badge-position-<?php echo esc_attr( $taxonomy_badge_overlay_position ); ?>">
                                                        <?php echo $taxonomy_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                                                    </div>
                                                <?php endif; ?>
                                            </div>
                                            <?php
                                        endif;
                                        break;
 
                                    case 'categories':
                                        $has_image = $any_image_enabled && has_post_thumbnail( $post_id );
                                        if ( ! $enable_taxonomy_badge_overlay || ! $has_image ) {
                                            echo $taxonomy_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                        }
                                        break;
 
                                    case 'title':
                                        if ( $any_title_enabled ) {
                                            $raw_title = get_the_title();
                                            $rendered_title = $raw_title;
                                            if ( $enable_post_title_limit ) {
                                                $limit_val = isset( $post_title_limit['Desktop'] ) ? intval( $post_title_limit['Desktop'] ) : ( 'words' === $post_title_limit_type ? 10 : 50 );
                                                if ( 'words' === $post_title_limit_type ) {
                                                    $rendered_title = wp_trim_words( $raw_title, $limit_val, $post_title_limit_suffix );
                                                } else {
                                                    if ( mb_strlen( $raw_title ) > $limit_val ) {
                                                        $rendered_title = mb_substr( $raw_title, 0, $limit_val ) . $post_title_limit_suffix;
                                                    }
                                                }
                                            }
 
                                            $title_wrapper_class = 'gslider-post-carousel-title-wrapper' . ( $show_post_title_divider ? ' has-divider' : '' );
                                            $title_class = 'gslider-post-carousel-title' . ( $enable_post_title_hover_underline_anim ? ' hover-underline-anim' : '' );
 
                                            $title_link_html = '';
                                            if ( $enable_post_title_link ) {
                                                $target_attr = $post_title_link_target ? ' target="_blank"' : '';
                                                $rel_items = array();
                                                if ( $post_title_link_target ) {
                                                    $rel_items[] = 'noopener';
                                                    $rel_items[] = 'noreferrer';
                                                }
                                                if ( $post_title_link_nofollow ) {
                                                    $rel_items[] = 'nofollow';
                                                }
                                                if ( $post_title_link_sponsored ) {
                                                    $rel_items[] = 'sponsored';
                                                }
                                                $rel_attr = ! empty( $rel_items ) ? ' rel="' . esc_attr( implode( ' ', $rel_items ) ) . '"' : '';
                                                
                                                $title_inner = '<a href="' . esc_url( get_permalink() ) . '"' . $target_attr . $rel_attr . '>' . esc_html( $rendered_title ) . '</a>';
                                            } else {
                                                $title_inner = esc_html( $rendered_title );
                                            }
                                            ?>
                                            <div class="<?php echo esc_attr( $title_wrapper_class ); ?>">
                                                <<?php echo esc_attr( $post_title_html_tag ); ?> class="<?php echo esc_attr( $title_class ); ?>">
                                                    <?php echo $title_inner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                                                </<?php echo esc_attr( $post_title_html_tag ); ?>>
                                            </div>
                                            <?php
                                        }
                                        break;
 
                                    case 'excerpt':
                                        if ( $any_excerpt_enabled && $excerpt ) :
                                            ?>
                                            <div class="gslider-post-carousel-excerpt-wrapper">
                                                <<?php echo esc_attr( $post_excerpt_html_tag ); ?> class="gslider-post-carousel-excerpt"><?php echo esc_html( $excerpt ); ?></<?php echo esc_attr( $post_excerpt_html_tag ); ?>>
                                            </div>
                                            <?php
                                        endif;
                                        break;
 
                                    case 'meta':
                                        if ( $any_meta_enabled && ( $any_author_enabled || $any_date_enabled ) ) :
                                            ?>
                                            <div class="gslider-post-carousel-meta">
                                                <?php if ( $any_author_enabled ) : ?>
                                                <div class="gslider-post-author-wrapper">
                                                    <?php if ( $any_avatar_enabled ) : ?>
                                                    <div class="gslider-post-author-avatar-wrapper">
                                                        <?php
                                                        $author_id  = get_the_author_meta( 'ID' );
                                                        $avatar_url = get_avatar_url( $author_id, array( 'size' => 96 ) );
                                                        if ( $avatar_url ) :
                                                        ?>
                                                            <img class="gslider-post-author-avatar" src="<?php echo esc_url( $avatar_url ); ?>" alt="<?php echo esc_attr( get_the_author() ); ?>" width="28" height="28" />
                                                        <?php else : ?>
                                                            <svg class="gslider-post-author-avatar-placeholder" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                                        <?php endif; ?>
                                                    </div>
                                                    <?php endif; ?>
                                                    <div class="gslider-post-author"><?php the_author(); ?></div>
                                                </div>
                                                <?php endif; ?>
                                                <?php if ( $any_date_enabled ) : ?>
                                                <div class="gslider-post-date-wrapper">
                                                    <div class="gslider-post-date"><?php echo get_the_date(); ?></div>
                                                </div>
                                                <?php endif; ?>
                                            </div>

                                            <?php
                                        endif;
                                        break;

                                    case 'readmore':
                                        if ( ! $any_read_more_button_enabled ) {
                                            break;
                                        }
                                        $read_more_url = ( 'custom' === $read_more_button_link_type ) ? $read_more_button_link : get_permalink( $post_id );
                                        $rel_items = array();
                                        if ( $read_more_button_target_link ) {
                                            $rel_items[] = 'noopener';
                                            $rel_items[] = 'noreferrer';
                                        }
                                        if ( $read_more_button_nofollow ) {
                                            $rel_items[] = 'nofollow';
                                        }
                                        if ( $read_more_button_sponsored ) {
                                            $rel_items[] = 'sponsored';
                                        }
                                        $rel_attr = ! empty( $rel_items ) ? ' rel="' . esc_attr( implode( ' ', $rel_items ) ) . '"' : '';
                                        $target_attr = $read_more_button_target_link ? ' target="_blank"' : '';

                                        // Build icon HTML markup
                                        $icon_markup = '';
                                        if ( $read_more_button_icon_switcher ) {
                                            if ( 'icon' === $read_more_button_icon_type && ! empty( $read_more_button_icon_html ) ) {
                                                // SVG icon saved as HTML
                                                $icon_markup = '<span class="gslider-readmore-icon-wrap">' . $read_more_button_icon_html . '</span>';
                                            } elseif ( 'image' === $read_more_button_icon_type && ! empty( $read_more_button_icon_img_url ) ) {
                                                // Custom Image icon
                                                $icon_markup = '<span class="gslider-readmore-icon-wrap"><img src="' . esc_url( $read_more_button_icon_img_url ) . '" alt="' . esc_attr( $read_more_button_icon_img_alt ) . '" /></span>';
                                            }
                                        }
                                        ?>
                                        <div class="gslider-post-carousel-readmore">
                                            <a class="gslider-post-carousel-readmore-btn" href="<?php echo esc_url( $read_more_url ); ?>"<?php echo $target_attr; ?><?php echo $rel_attr; ?>>
                                                <?php if ( $read_more_button_icon_switcher && 'left' === $read_more_button_icon_position ) {
                                                    echo $icon_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                                } ?>
                                                <span class="gslider-readmore-text"><?php echo esc_html( $read_more_button_text ); ?></span>
                                                <?php if ( $read_more_button_icon_switcher && 'right' === $read_more_button_icon_position ) {
                                                    echo $icon_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                                } ?>
                                            </a>
                                        </div>
                                        <?php
                                        break;
                                }
                            }
                            ?>
                        </article>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <?php if ( $any_navigation_enabled && 'inside' === $navigation_arrow_position_type ) : ?>
            <div class="<?php echo esc_attr( $nav_container_class . ' ' . $navigation_arrow_position_type . ' ' . $navigation_arrow_position ); ?>">
                <div class="swiper-button-prev" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Previous slide', 'gslider-blocks' ); ?>">
                    <?php if ( $navigation_arrows_icon_switcher ) {
                        echo $left_arrow_inner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    } ?>
                </div>
                <div class="swiper-button-next" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Next slide', 'gslider-blocks' ); ?>">
                    <?php if ( $navigation_arrows_icon_switcher ) {
                        echo $right_arrow_inner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    } ?>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( $any_pagination_enabled && 'inside' === $pagination_position_type ) : ?>
            <div class="swiper-pagination swiper-pagination-post-carousel" aria-label="<?php esc_attr_e( 'Carousel pagination', 'gslider-blocks' ); ?>"></div>
        <?php endif; ?>
    </div>

    <?php if ( $any_navigation_enabled && 'outside' === $navigation_arrow_position_type ) : ?>
        <div class="<?php echo esc_attr( $nav_container_class . ' ' . $navigation_arrow_position_type . ' ' . $navigation_arrow_position ); ?>">
            <div class="swiper-button-prev" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Previous slide', 'gslider-blocks' ); ?>">
                <?php if ( $navigation_arrows_icon_switcher ) {
                    echo $left_arrow_inner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                } ?>
            </div>
            <div class="swiper-button-next" role="button" tabindex="0" aria-label="<?php esc_attr_e( 'Next slide', 'gslider-blocks' ); ?>">
                <?php if ( $navigation_arrows_icon_switcher ) {
                    echo $right_arrow_inner; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                } ?>
            </div>
        </div>
    <?php endif; ?>

    <?php if ( $any_pagination_enabled && 'outside' === $pagination_position_type ) : ?>
        <div class="swiper-pagination swiper-pagination-post-carousel swiper-pagination-<?php echo esc_attr( $block_id ); ?>" aria-label="<?php esc_attr_e( 'Carousel pagination', 'gslider-blocks' ); ?>"></div>
    <?php endif; ?>
</div>
<?php
wp_reset_postdata();
