/**
 * Query Attributes
 *
 * Reusable attribute definitions for post query settings.
 * Spread these into any block's attributes to get full query support.
 *
 * Usage:
 *   import { queryAttributes } from '@Components/query-settings-panel/query-attributes';
 *   const attributes = { ...otherAttributes, ...queryAttributes };
 */

export const queryAttributes = {
    postType: {
        type: "string",
        default: "post",
    },
    postsPerPage: {
        type: "object",
        default: {
            Desktop: 6,
            Tablet: 6,
            Mobile: 6,
        },
    },
    categories: {
        type: "array",
        default: [],
    },
    categoryFilterType: {
        type: "string",
        default: "include",
    },
    tags: {
        type: "array",
        default: [],
    },
    tagFilterType: {
        type: "string",
        default: "include",
    },
    authors: {
        type: "array",
        default: [],
    },
    authorFilterType: {
        type: "string",
        default: "include",
    },
    excludePosts: {
        type: "string",
        default: "",
    },
    offset: {
        type: "object",
        default: {
            Desktop: 0,
            Tablet: 0,
            Mobile: 0,
        },
    },
    orderBy: {
        type: "string",
        default: "date",
    },
    order: {
        type: "string",
        default: "desc",
    },
    searchQuery: {
        type: "string",
        default: "",
    },
    stickyPosts: {
        type: "string",
        default: "include",
    },
    taxonomyQuery: {
        type: "object",
        default: {},
    },
    taxonomyFilterTypes: {
        type: "object",
        default: {},
    },
    metaKey: {
        type: "string",
        default: "",
    },
    metaValue: {
        type: "string",
        default: "",
    },
    metaCompare: {
        type: "string",
        default: "=",
    },
    dateRange: {
        type: "string",
        default: "any",
    },
    excludeCurrentPost: {
        type: "boolean",
        default: false,
    },
};

export default queryAttributes;
