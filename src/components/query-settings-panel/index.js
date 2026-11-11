import { __ } from '@wordpress/i18n';
import {
    useMemo,
    useCallback,
    useState,
    useEffect,
    useRef,
} from '@wordpress/element';
import {
    PanelBody,
    BaseControl,
    ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import Select from 'react-select';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import InputControls from '@Components/input-control';
import {
    ORDER_BY_OPTIONS,
    SORT_ORDER_OPTIONS,
    STICKY_POSTS_OPTIONS,
    DATE_RANGE_OPTIONS,
    META_COMPARE_OPTIONS,
    INCLUDE_EXCLUDE_OPTIONS,
} from '@Constants/query-constants';

import './editor.scss';

/**
 * Resolve the WordPress REST API endpoint base for a taxonomy object.
 *
 * @param {Object} tax Taxonomy descriptor returned by core-data `getTaxonomies()`.
 * @return {string} REST base slug (e.g. 'categories', 'tags', or custom rest_base).
 */
const getTaxonomyRestBase = (tax) => {
    if (!tax) {
        return '';
    }
    if (tax.rest_base) {
        return tax.rest_base;
    }
    if (tax.slug === 'category') {
        return 'categories';
    }
    if (tax.slug === 'post_tag') {
        return 'tags';
    }
    return tax.slug;
};

/**
 * QuerySettingsPanel — Reusable query settings component
 *
 * Uses react-select for all dropdowns, SwitcherControl for Include/Exclude toggles.
 * Dynamically fetches post types, taxonomies, terms, and authors via WordPress REST API.
 *
 * Usage:
 *   import QuerySettingsPanel from '@Components/query-settings-panel';
 *   <QuerySettingsPanel attributes={attributes} setAttributes={setAttributes} />
 */
const QuerySettingsPanel = ({
    attributes,
    setAttributes,
    showMetaQuery = true,
    showDateRange = true,
    showStickyPosts = true,
    showSearchQuery = true,
    showExcludePosts = true,
    showExcludeCurrentPost = true,
    showOffset = true,
    maxPosts = 100,
    panelTitle = __('Query', 'gslider-blocks'),
    initialOpen = false,
    opened,
    onToggle,
    deviceType = 'Desktop',
    showRelatedPostsQuery = false,
}) => {
    const {
        postType,
        postsPerPage,
        categories,
        categoryFilterType,
        tags,
        tagFilterType,
        authors,
        authorFilterType,
        excludePosts,
        offset,
        orderBy,
        order,
        searchQuery,
        stickyPosts,
        taxonomyQuery,
        taxonomyFilterTypes,
        metaKey,
        metaValue,
        metaCompare,
        dateRange,
        excludeCurrentPost,
        useRelatedPostsQuery = false,
        relatedPostsTaxonomy = 'category',
    } = attributes;

    const isMountedRef = useRef(true);
    const searchTimersRef = useRef({});
    const searchRequestSeqRef = useRef({});
    const hydratedTermKeysRef = useRef(new Set());
    const hydratedAuthorIdsRef = useRef(new Set());

    const [isMetaEnabled, setIsMetaEnabled] = useState(!!metaKey);
    const [extraTermsByTax, setExtraTermsByTax] = useState({});
    const [searchTermsByTax, setSearchTermsByTax] = useState({});
    const [extraAuthors, setExtraAuthors] = useState({});
    const [searchAuthors, setSearchAuthors] = useState(null);
    const [loadingSearches, setLoadingSearches] = useState({});

    useEffect(() => {
        isMountedRef.current = true;
        const timers = searchTimersRef.current;

        return () => {
            isMountedRef.current = false;
            Object.keys(timers).forEach((key) => {
                clearTimeout(timers[key]);
                delete timers[key];
            });
        };
    }, []);

    useEffect(() => {
        if (metaKey) {
            setIsMetaEnabled(true);
        }
    }, [metaKey]);

    /**
     * Fetch registered post types, taxonomies, terms, and authors from
     * the WordPress REST API dynamically when the selected post type changes.
     */
    const {
        postTypes,
        taxonomies,
        termsData,
        termsLoaded,
        allAuthors,
        authorsLoaded,
    } = useSelect(
        (select) => {
            const {
                getPostTypes,
                getTaxonomies,
                getEntityRecords,
                hasFinishedResolution,
            } = select('core');

            const activePostTypes = getPostTypes() || [];
            const allTax = getTaxonomies() || [];

            // Filter taxonomies belonging to the selected postType
            const postTax = allTax.filter(
                (tax) => tax.types && tax.types.includes(postType)
            );

            // Fetch terms for each taxonomy
            const termsMap = {};
            const termsLoadedMap = {};
            postTax.forEach((tax) => {
                const termQueryArgs = {
                    per_page: 100,
                    _fields: 'id,name',
                    context: 'view',
                };
                const records = getEntityRecords(
                    'taxonomy',
                    tax.slug,
                    termQueryArgs
                );
                const finished =
                    typeof hasFinishedResolution === 'function'
                        ? hasFinishedResolution('getEntityRecords', [
                              'taxonomy',
                              tax.slug,
                              termQueryArgs,
                          ])
                        : true;
                termsMap[tax.slug] = records || [];
                termsLoadedMap[tax.slug] = Array.isArray(records) || finished;
            });

            const authorQueryArgs = {
                per_page: 100,
                _fields: 'id,name',
                context: 'view',
            };
            const authorRecords = getEntityRecords(
                'root',
                'user',
                authorQueryArgs
            );
            const authorFinished =
                typeof hasFinishedResolution === 'function'
                    ? hasFinishedResolution('getEntityRecords', [
                          'root',
                          'user',
                          authorQueryArgs,
                      ])
                    : true;

            return {
                postTypes: activePostTypes,
                taxonomies: postTax,
                termsData: termsMap,
                termsLoaded: termsLoadedMap,
                allAuthors: authorRecords || [],
                authorsLoaded: Array.isArray(authorRecords) || authorFinished,
            };
        },
        [postType]
    );

    /**
     * Hydrate any selected taxonomy term IDs that fall outside the initial 100-term page.
     */
    useEffect(() => {
        if (useRelatedPostsQuery || !taxonomies || !taxonomies.length) {
            return;
        }

        const requests = [];

        taxonomies.forEach((tax) => {
            if (!termsLoaded[tax.slug]) {
                return;
            }

            let selectedIds = [];
            if (tax.slug === 'category') {
                selectedIds = categories || [];
            } else if (tax.slug === 'post_tag') {
                selectedIds = tags || [];
            } else {
                selectedIds = (taxonomyQuery && taxonomyQuery[tax.slug]) || [];
            }

            if (!selectedIds.length) {
                return;
            }

            const existingIds = new Set(
                (termsData[tax.slug] || []).map((term) => term.id)
            );
            const cachedMap = extraTermsByTax[tax.slug] || {};

            const missingIds = selectedIds.filter((rawId) => {
                const id = Number(rawId);
                if (!Number.isInteger(id) || id <= 0) {
                    return false;
                }
                if (existingIds.has(id) || cachedMap[id]) {
                    return false;
                }
                const cacheKey = `${tax.slug}:${id}`;
                if (hydratedTermKeysRef.current.has(cacheKey)) {
                    return false;
                }
                return true;
            });

            if (!missingIds.length) {
                return;
            }

            const restBase = getTaxonomyRestBase(tax);
            if (!restBase) {
                return;
            }
            const restNamespace = tax.rest_namespace || 'wp/v2';

            const numericIds = missingIds.map((rawId) => Number(rawId));
            numericIds.forEach((id) => {
                hydratedTermKeysRef.current.add(`${tax.slug}:${id}`);
            });

            requests.push({
                taxSlug: tax.slug,
                restNamespace,
                restBase,
                ids: numericIds,
            });
        });

        if (!requests.length) {
            return;
        }

        requests.forEach(({ taxSlug, restNamespace, restBase, ids }) => {
            for (let i = 0; i < ids.length; i += 100) {
                const chunk = ids.slice(i, i + 100);
                apiFetch({
                    path: `/${restNamespace}/${restBase}?include=${chunk.join(
                        ','
                    )}&per_page=100&_fields=id,name`,
                })
                    .then((fetchedTerms) => {
                        if (
                            !isMountedRef.current ||
                            !Array.isArray(fetchedTerms) ||
                            !fetchedTerms.length
                        ) {
                            return;
                        }
                        setExtraTermsByTax((prev) => {
                            const prevTaxMap = prev[taxSlug] || {};
                            const nextTaxMap = { ...prevTaxMap };
                            fetchedTerms.forEach((term) => {
                                if (term && term.id !== undefined) {
                                    nextTaxMap[term.id] = {
                                        id: term.id,
                                        name: term.name,
                                    };
                                }
                            });
                            return {
                                ...prev,
                                [taxSlug]: nextTaxMap,
                            };
                        });
                    })
                    .catch(() => {
                        chunk.forEach((id) => {
                            hydratedTermKeysRef.current.delete(`${taxSlug}:${id}`);
                        });
                    });
            }
        });
    }, [
        useRelatedPostsQuery,
        taxonomies,
        termsLoaded,
        termsData,
        categories,
        tags,
        taxonomyQuery,
        extraTermsByTax,
    ]);

    /**
     * Hydrate any selected author IDs that fall outside the initial 100-user page.
     */
    useEffect(() => {
        if (
            useRelatedPostsQuery ||
            !authorsLoaded ||
            !Array.isArray(authors) ||
            !authors.length
        ) {
            return;
        }

        const existingIds = new Set(allAuthors.map((user) => user.id));
        const missingIds = authors.filter((rawId) => {
            const id = Number(rawId);
            if (!Number.isInteger(id) || id <= 0) {
                return false;
            }
            if (existingIds.has(id) || extraAuthors[id]) {
                return false;
            }
            if (hydratedAuthorIdsRef.current.has(id)) {
                return false;
            }
            return true;
        });

        if (!missingIds.length) {
            return;
        }

        const numericIds = missingIds.map((rawId) => Number(rawId));
        numericIds.forEach((id) => {
            hydratedAuthorIdsRef.current.add(id);
        });

        for (let i = 0; i < numericIds.length; i += 100) {
            const chunk = numericIds.slice(i, i + 100);
            apiFetch({
                path: `/wp/v2/users?include=${chunk.join(
                    ','
                )}&per_page=100&_fields=id,name`,
            })
                .then((fetchedUsers) => {
                    if (
                        !isMountedRef.current ||
                        !Array.isArray(fetchedUsers) ||
                        !fetchedUsers.length
                    ) {
                        return;
                    }
                    setExtraAuthors((prev) => {
                        const next = { ...prev };
                        fetchedUsers.forEach((user) => {
                            if (user && user.id !== undefined) {
                                next[user.id] = {
                                    id: user.id,
                                    name: user.name,
                                };
                            }
                        });
                        return next;
                    });
                })
                .catch(() => {
                    chunk.forEach((id) => {
                        hydratedAuthorIdsRef.current.delete(id);
                    });
                });
        }
    }, [useRelatedPostsQuery, authorsLoaded, allAuthors, authors, extraAuthors]);

    /**
     * Format the fetched post types into select option objects for the dropdown,
     * filtering out non-viewable types and the 'attachment' (media) type.
     */
    const postTypeOptions = useMemo(() => {
        if (!postTypes) return [];
        return postTypes
            .filter((type) => type.viewable && type.slug !== 'attachment')
            .map((type) => ({ value: type.slug, label: type.name }));
    }, [postTypes]);

    /**
     * Match and return the selected post type option object to populate the current dropdown value.
     */
    const selectedPostType = useMemo(
        () => postTypeOptions.find((opt) => opt.value === postType) || null,
        [postTypeOptions, postType]
    );

    /**
     * Handle post type changes by saving the new type and clearing out terms and
     * taxonomies selected for the previous post type.
     */
    const handlePostTypeChange = useCallback(
        (option) => {
            if (option) {
                Object.keys(searchTimersRef.current).forEach((timerKey) => {
                    if (timerKey.startsWith('tax:')) {
                        clearTimeout(searchTimersRef.current[timerKey]);
                        delete searchTimersRef.current[timerKey];
                    }
                });
                setSearchTermsByTax({});
                setAttributes({
                    postType: option.value,
                    categories: [],
                    tags: [],
                    taxonomyQuery: {},
                    taxonomyFilterTypes: {},
                });
            }
        },
        [setAttributes]
    );

    /**
     * Retrieve terms list, active selected items, and filter mode (include/exclude)
     * for a specific taxonomy (category, tag, or custom taxonomies).
     */
    const getTaxonomyData = useCallback(
        (taxSlug) => {
            const initialTerms = termsData[taxSlug] || [];
            const cachedMap = extraTermsByTax[taxSlug] || {};
            const searchResults =
                (searchTermsByTax[taxSlug] && searchTermsByTax[taxSlug].items) ||
                [];

            let selectedIds = [];
            let filterType = 'include';

            if (taxSlug === 'category') {
                selectedIds = categories || [];
                filterType = categoryFilterType || 'include';
            } else if (taxSlug === 'post_tag') {
                selectedIds = tags || [];
                filterType = tagFilterType || 'include';
            } else {
                selectedIds = (taxonomyQuery && taxonomyQuery[taxSlug]) || [];
                filterType =
                    (taxonomyFilterTypes && taxonomyFilterTypes[taxSlug]) ||
                    'include';
            }

            const optionMap = new Map();
            initialTerms.forEach((term) => {
                if (term && term.id !== undefined) {
                    optionMap.set(term.id, {
                        value: term.id,
                        label: term.name,
                    });
                }
            });
            Object.values(cachedMap).forEach((term) => {
                if (term && term.id !== undefined) {
                    optionMap.set(term.id, {
                        value: term.id,
                        label: term.name,
                    });
                }
            });
            searchResults.forEach((term) => {
                if (term && term.id !== undefined) {
                    optionMap.set(term.id, {
                        value: term.id,
                        label: term.name,
                    });
                }
            });

            const selectedOptions = selectedIds
                .map((id) => {
                    const found =
                        optionMap.get(id) || optionMap.get(Number(id));
                    return found || { value: id, label: String(id) };
                })
                .filter(Boolean);

            const optionsMap = new Map();
            searchResults.forEach((term) => {
                if (term && term.id !== undefined) {
                    optionsMap.set(term.id, {
                        value: term.id,
                        label: term.name,
                    });
                }
            });
            initialTerms.forEach((term) => {
                if (
                    term &&
                    term.id !== undefined &&
                    !optionsMap.has(term.id)
                ) {
                    optionsMap.set(term.id, {
                        value: term.id,
                        label: term.name,
                    });
                }
            });
            selectedOptions.forEach((opt) => {
                if (!optionsMap.has(opt.value)) {
                    optionsMap.set(opt.value, opt);
                }
            });

            const options = Array.from(optionsMap.values());

            return { options, selectedOptions, filterType };
        },
        [
            termsData,
            extraTermsByTax,
            searchTermsByTax,
            categories,
            categoryFilterType,
            tags,
            tagFilterType,
            taxonomyQuery,
            taxonomyFilterTypes,
        ]
    );

    /**
     * Debounced async search handler for taxonomy term dropdowns.
     */
    const handleTaxonomyInputChange = useCallback(
        (tax, inputValue, actionMeta) => {
            const action = actionMeta && actionMeta.action;
            const key = `tax:${tax.slug}`;

            if (action === 'menu-close') {
                if (searchTimersRef.current[key]) {
                    clearTimeout(searchTimersRef.current[key]);
                    delete searchTimersRef.current[key];
                }
                searchRequestSeqRef.current[key] =
                    (searchRequestSeqRef.current[key] || 0) + 1;
                setSearchTermsByTax((prev) => {
                    if (!prev[tax.slug]) {
                        return prev;
                    }
                    const next = { ...prev };
                    delete next[tax.slug];
                    return next;
                });
                setLoadingSearches((prev) =>
                    prev[key] ? { ...prev, [key]: false } : prev
                );
                return;
            }

            if (action !== 'input-change') {
                return;
            }

            if (searchTimersRef.current[key]) {
                clearTimeout(searchTimersRef.current[key]);
                delete searchTimersRef.current[key];
            }

            const trimmed = (inputValue || '').trim();
            if (!trimmed) {
                searchRequestSeqRef.current[key] =
                    (searchRequestSeqRef.current[key] || 0) + 1;
                setSearchTermsByTax((prev) => {
                    if (!prev[tax.slug]) {
                        return prev;
                    }
                    const next = { ...prev };
                    delete next[tax.slug];
                    return next;
                });
                setLoadingSearches((prev) =>
                    prev[key] ? { ...prev, [key]: false } : prev
                );
                return;
            }

            const restBase = getTaxonomyRestBase(tax);
            if (!restBase) {
                return;
            }
            const restNamespace = tax.rest_namespace || 'wp/v2';

            const nextSeq = (searchRequestSeqRef.current[key] || 0) + 1;
            searchRequestSeqRef.current[key] = nextSeq;

            searchTimersRef.current[key] = setTimeout(() => {
                delete searchTimersRef.current[key];
                if (!isMountedRef.current) {
                    return;
                }

                setLoadingSearches((prev) => ({ ...prev, [key]: true }));

                apiFetch({
                    path: `/${restNamespace}/${restBase}?search=${encodeURIComponent(
                        trimmed
                    )}&per_page=20&_fields=id,name`,
                })
                    .then((fetchedTerms) => {
                        if (
                            !isMountedRef.current ||
                            searchRequestSeqRef.current[key] !== nextSeq
                        ) {
                            return;
                        }

                        const normalized = Array.isArray(fetchedTerms)
                            ? fetchedTerms.filter(
                                  (term) => term && term.id !== undefined
                              )
                            : [];

                        setSearchTermsByTax((prev) => ({
                            ...prev,
                            [tax.slug]: {
                                query: trimmed,
                                items: normalized,
                            },
                        }));

                        if (normalized.length) {
                            setExtraTermsByTax((prev) => {
                                const prevTaxMap = prev[tax.slug] || {};
                                const nextTaxMap = { ...prevTaxMap };
                                normalized.forEach((term) => {
                                    nextTaxMap[term.id] = {
                                        id: term.id,
                                        name: term.name,
                                    };
                                });
                                return {
                                    ...prev,
                                    [tax.slug]: nextTaxMap,
                                };
                            });
                        }
                    })
                    .catch(() => {
                        // Ignore REST search failures gracefully.
                    })
                    .finally(() => {
                        if (
                            isMountedRef.current &&
                            searchRequestSeqRef.current[key] === nextSeq
                        ) {
                            setLoadingSearches((prev) => ({
                                ...prev,
                                [key]: false,
                            }));
                        }
                    });
            }, 250);
        },
        []
    );

    /**
     * Keep matching remote taxonomy search results visible even if WP matched by slug or diacritics.
     */
    const filterTaxonomyOption = useCallback(
        (taxSlug, option, rawInput) => {
            const trimmed = (rawInput || '').trim().toLowerCase();
            if (!trimmed) {
                return true;
            }
            const label = String(option.label || '').toLowerCase();
            if (label.includes(trimmed)) {
                return true;
            }
            const optionId =
                option && option.data && option.data.value !== undefined
                    ? option.data.value
                    : option.value;
            const searchEntry = searchTermsByTax[taxSlug];
            if (
                searchEntry &&
                searchEntry.query.toLowerCase() === trimmed &&
                searchEntry.items.some(
                    (item) => Number(item.id) === Number(optionId)
                )
            ) {
                return true;
            }
            return false;
        },
        [searchTermsByTax]
    );

    /**
     * Save the newly selected term IDs to block attributes for category, tag, or custom taxonomies.
     */
    const handleTaxonomyChange = useCallback(
        (taxSlug, selectedOptions) => {
            const newIds = selectedOptions
                ? selectedOptions.map((opt) => opt.value)
                : [];

            if (taxSlug === 'category') {
                setAttributes({ categories: newIds });
            } else if (taxSlug === 'post_tag') {
                setAttributes({ tags: newIds });
            } else {
                setAttributes({
                    taxonomyQuery: {
                        ...taxonomyQuery,
                        [taxSlug]: newIds,
                    },
                });
            }
        },
        [setAttributes, taxonomyQuery]
    );

    /**
     * Toggle the filter mode (include/exclude) for categories, tags, or custom taxonomies.
     */
    const handleTaxonomyFilterTypeChange = useCallback(
        (taxSlug, value) => {
            if (taxSlug === 'category') {
                setAttributes({ categoryFilterType: value });
            } else if (taxSlug === 'post_tag') {
                setAttributes({ tagFilterType: value });
            } else {
                setAttributes({
                    taxonomyFilterTypes: {
                        ...taxonomyFilterTypes,
                        [taxSlug]: value,
                    },
                });
            }
        },
        [setAttributes, taxonomyFilterTypes]
    );

    /**
     * Build lookup map across initial, cached, and searched authors.
     */
    const authorOptionMap = useMemo(() => {
        const map = new Map();
        allAuthors.forEach((user) => {
            if (user && user.id !== undefined) {
                map.set(user.id, { value: user.id, label: user.name });
            }
        });
        Object.values(extraAuthors).forEach((user) => {
            if (user && user.id !== undefined) {
                map.set(user.id, { value: user.id, label: user.name });
            }
        });
        if (searchAuthors && Array.isArray(searchAuthors.items)) {
            searchAuthors.items.forEach((user) => {
                if (user && user.id !== undefined) {
                    map.set(user.id, { value: user.id, label: user.name });
                }
            });
        }
        return map;
    }, [allAuthors, extraAuthors, searchAuthors]);

    /**
     * Match and return the selected author option objects to populate the dropdown state.
     */
    const selectedAuthorOptions = useMemo(() => {
        if (!Array.isArray(authors) || !authors.length) {
            return [];
        }
        return authors
            .map((id) => {
                const found =
                    authorOptionMap.get(id) || authorOptionMap.get(Number(id));
                return found || { value: id, label: String(id) };
            })
            .filter(Boolean);
    }, [authors, authorOptionMap]);

    /**
     * Transform WordPress users/authors list into dropdown select options,
     * merging active search results and preserving selected authors.
     */
    const authorOptions = useMemo(() => {
        const optionsMap = new Map();
        const searchItems =
            (searchAuthors && Array.isArray(searchAuthors.items)
                ? searchAuthors.items
                : []) || [];

        searchItems.forEach((user) => {
            if (user && user.id !== undefined) {
                optionsMap.set(user.id, { value: user.id, label: user.name });
            }
        });
        allAuthors.forEach((user) => {
            if (user && user.id !== undefined && !optionsMap.has(user.id)) {
                optionsMap.set(user.id, { value: user.id, label: user.name });
            }
        });
        selectedAuthorOptions.forEach((opt) => {
            if (!optionsMap.has(opt.value)) {
                optionsMap.set(opt.value, opt);
            }
        });

        return Array.from(optionsMap.values());
    }, [searchAuthors, allAuthors, selectedAuthorOptions]);

    /**
     * Debounced async search handler for authors dropdown.
     */
    const handleAuthorInputChange = useCallback((inputValue, actionMeta) => {
        const action = actionMeta && actionMeta.action;
        const key = 'authors';

        if (action === 'menu-close') {
            if (searchTimersRef.current[key]) {
                clearTimeout(searchTimersRef.current[key]);
                delete searchTimersRef.current[key];
            }
            searchRequestSeqRef.current[key] =
                (searchRequestSeqRef.current[key] || 0) + 1;
            setSearchAuthors(null);
            setLoadingSearches((prev) =>
                prev[key] ? { ...prev, [key]: false } : prev
            );
            return;
        }

        if (action !== 'input-change') {
            return;
        }

        if (searchTimersRef.current[key]) {
            clearTimeout(searchTimersRef.current[key]);
            delete searchTimersRef.current[key];
        }

        const trimmed = (inputValue || '').trim();
        if (!trimmed) {
            searchRequestSeqRef.current[key] =
                (searchRequestSeqRef.current[key] || 0) + 1;
            setSearchAuthors(null);
            setLoadingSearches((prev) =>
                prev[key] ? { ...prev, [key]: false } : prev
            );
            return;
        }

        const nextSeq = (searchRequestSeqRef.current[key] || 0) + 1;
        searchRequestSeqRef.current[key] = nextSeq;

        searchTimersRef.current[key] = setTimeout(() => {
            delete searchTimersRef.current[key];
            if (!isMountedRef.current) {
                return;
            }

            setLoadingSearches((prev) => ({ ...prev, [key]: true }));

            apiFetch({
                path: `/wp/v2/users?search=${encodeURIComponent(
                    trimmed
                )}&per_page=20&_fields=id,name`,
            })
                .then((fetchedUsers) => {
                    if (
                        !isMountedRef.current ||
                        searchRequestSeqRef.current[key] !== nextSeq
                    ) {
                        return;
                    }

                    const normalized = Array.isArray(fetchedUsers)
                        ? fetchedUsers.filter(
                              (user) => user && user.id !== undefined
                          )
                        : [];

                    setSearchAuthors({
                        query: trimmed,
                        items: normalized,
                    });

                    if (normalized.length) {
                        setExtraAuthors((prev) => {
                            const next = { ...prev };
                            normalized.forEach((user) => {
                                next[user.id] = {
                                    id: user.id,
                                    name: user.name,
                                };
                            });
                            return next;
                        });
                    }
                })
                .catch(() => {
                    // Ignore REST search failures gracefully.
                })
                .finally(() => {
                    if (
                        isMountedRef.current &&
                        searchRequestSeqRef.current[key] === nextSeq
                    ) {
                        setLoadingSearches((prev) => ({
                            ...prev,
                            [key]: false,
                        }));
                    }
                });
        }, 250);
    }, []);

    /**
     * Keep matching remote author search results visible.
     */
    const filterAuthorOption = useCallback(
        (option, rawInput) => {
            const trimmed = (rawInput || '').trim().toLowerCase();
            if (!trimmed) {
                return true;
            }
            const label = String(option.label || '').toLowerCase();
            if (label.includes(trimmed)) {
                return true;
            }
            const optionId =
                option && option.data && option.data.value !== undefined
                    ? option.data.value
                    : option.value;
            if (
                searchAuthors &&
                searchAuthors.query.toLowerCase() === trimmed &&
                searchAuthors.items.some(
                    (item) => Number(item.id) === Number(optionId)
                )
            ) {
                return true;
            }
            return false;
        },
        [searchAuthors]
    );

    /**
     * Save the chosen author IDs into block attributes.
     */
    const handleAuthorsChange = useCallback(
        (selectedOptions) => {
            const newIds = selectedOptions
                ? selectedOptions.map((opt) => opt.value)
                : [];
            setAttributes({ authors: newIds });
        },
        [setAttributes]
    );

    /**
     * Get the active orderby option object (e.g. date, title, ID) to select it in the dropdown.
     */
    const selectedOrderBy = useMemo(
        () => ORDER_BY_OPTIONS.find((opt) => opt.value === orderBy) || ORDER_BY_OPTIONS[0],
        [orderBy]
    );

    /**
     * Get the active sort order option object (ASC/DESC) to select it in the dropdown.
     */
    const selectedSortOrder = useMemo(
        () => SORT_ORDER_OPTIONS.find((opt) => opt.value === order) || SORT_ORDER_OPTIONS[0],
        [order]
    );

    /**
     * Get the active sticky posts behavior option object (include/exclude/ignore) to select it in the dropdown.
     */
    const selectedStickyPosts = useMemo(
        () => STICKY_POSTS_OPTIONS.find((opt) => opt.value === stickyPosts) || STICKY_POSTS_OPTIONS[0],
        [stickyPosts]
    );

    /**
     * Get the active date range limit option object to select it in the dropdown.
     */
    const selectedDateRange = useMemo(
        () => DATE_RANGE_OPTIONS.find((opt) => opt.value === dateRange) || DATE_RANGE_OPTIONS[0],
        [dateRange]
    );

    /**
     * Get the active comparison operator option object for Custom Field filtering to select it in the dropdown.
     */
    const selectedMetaCompare = useMemo(
        () => META_COMPARE_OPTIONS.find((opt) => opt.value === metaCompare) || META_COMPARE_OPTIONS[0],
        [metaCompare]
    );

    /**
     * Generate a localized label for the terms dropdown depending on inclusion/exclusion setting.
     * 
     * @param {string} filterType   Filter behavior ('include' or 'exclude').
     * @param {string} taxonomyName The human-readable name of the taxonomy (e.g. Category).
     * @returns {string} The formatted localized label.
     */
    const getTaxLabel = (filterType, taxonomyName) => {
        if (filterType === 'exclude') {
            return __('Exclude', 'gslider-blocks') + ' ' + taxonomyName;
        }
        return __('Include', 'gslider-blocks') + ' ' + taxonomyName;
    };

    /**
     * Setup panel toggle states dynamically, supporting either Gutenberg-controlled
     * state management or local state management.
     */
    const panelProps = {};
    if (typeof opened !== 'undefined') {
        panelProps.opened = opened;
    }
    if (typeof onToggle === 'function') {
        panelProps.onToggle = onToggle;
    }
    if (typeof opened === 'undefined') {
        panelProps.initialOpen = initialOpen;
    }

    /**
     * Render the Query Settings panel including all sub-panels and custom controls.
     */
    return (
        <PanelBody
            title={panelTitle}
            {...panelProps}
        >
            <div className="gslider-query-settings-panel">

                {/* Related Posts Mode */}
                {showRelatedPostsQuery && (
                    <div className="gslider-query-related-posts-section" style={{ marginBottom: '15px', borderBottom: '1px solid #e0e0e0', paddingBottom: '15px' }}>
                        <ToggleControl
                            label={__('Related Posts Mode', 'gslider-blocks')}
                            checked={!!useRelatedPostsQuery}
                            onChange={(value) => setAttributes({ useRelatedPostsQuery: value })}
                            help={__('Automatically fetch posts related to the current post by category or tag.', 'gslider-blocks')}
                        />
                        {!!useRelatedPostsQuery && (
                            <BaseControl
                                label={__('Match Taxonomy By', 'gslider-blocks')}
                                className="gslider-query-related-taxonomy"
                            >
                                <Select
                                    options={[
                                        { label: __('Categories', 'gslider-blocks'), value: 'category' },
                                        { label: __('Tags', 'gslider-blocks'), value: 'post_tag' },
                                        { label: __('Categories & Tags', 'gslider-blocks'), value: 'both' },
                                    ]}
                                    value={[
                                        { label: __('Categories', 'gslider-blocks'), value: 'category' },
                                        { label: __('Tags', 'gslider-blocks'), value: 'post_tag' },
                                        { label: __('Categories & Tags', 'gslider-blocks'), value: 'both' },
                                    ].find(opt => opt.value === relatedPostsTaxonomy) || { label: __('Categories', 'gslider-blocks'), value: 'category' }}
                                    onChange={(option) => setAttributes({ relatedPostsTaxonomy: option.value })}
                                    className="gslider-query-select2-control"
                                    classNamePrefix="gslider-select2"
                                />
                            </BaseControl>
                        )}
                    </div>
                )}

                {/* Post Type (Hide if related query active) */}
                {!useRelatedPostsQuery && (
                    <BaseControl
                        label={__('Post Type', 'gslider-blocks')}
                        className="gslider-query-post-type"
                    >
                        <Select
                            options={postTypeOptions}
                            value={selectedPostType}
                            onChange={handlePostTypeChange}
                            className="gslider-query-select2-control"
                            classNamePrefix="gslider-select2"
                        />
                    </BaseControl>
                )}

                {/* Dynamic Taxonomies (Category, Tag, Custom Taxonomies) (Hide if related query active) */}
                {!useRelatedPostsQuery && taxonomies && taxonomies.map((taxonomy) => {
                    const { options, selectedOptions, filterType } = getTaxonomyData(taxonomy.slug);

                    return (
                        <div key={taxonomy.slug} className="gslider-query-taxonomy-section">
                            <SwitcherControl
                                label={taxonomy.name}
                                options={INCLUDE_EXCLUDE_OPTIONS}
                                value={filterType}
                                onChange={(value) =>
                                    handleTaxonomyFilterTypeChange(taxonomy.slug, value)
                                }
                            />

                            <BaseControl
                                label={getTaxLabel(filterType, taxonomy.name)}
                                className="gslider-query-taxonomy-select"
                            >
                                <Select
                                    options={options}
                                    value={selectedOptions}
                                    onChange={(selected) =>
                                        handleTaxonomyChange(taxonomy.slug, selected)
                                    }
                                    onInputChange={(inputValue, actionMeta) =>
                                        handleTaxonomyInputChange(taxonomy, inputValue, actionMeta)
                                    }
                                    filterOption={(option, rawInput) =>
                                        filterTaxonomyOption(taxonomy.slug, option, rawInput)
                                    }
                                    isLoading={!!loadingSearches[`tax:${taxonomy.slug}`]}
                                    isMulti
                                    isClearable
                                    placeholder={__('Select...', 'gslider-blocks')}
                                    className="gslider-query-select2-control"
                                    classNamePrefix="gslider-select2"
                                />
                            </BaseControl>
                        </div>
                    );
                })}

                {/* Authors (Hide if related query active) */}
                {!useRelatedPostsQuery && (
                    <div className="gslider-query-taxonomy-section">
                        <SwitcherControl
                            label={__('Author', 'gslider-blocks')}
                            options={INCLUDE_EXCLUDE_OPTIONS}
                            value={authorFilterType || 'include'}
                            onChange={(value) =>
                                setAttributes({ authorFilterType: value })
                            }
                        />

                        <BaseControl
                            label={
                                (authorFilterType || 'include') === 'exclude'
                                    ? __('Exclude Authors', 'gslider-blocks')
                                    : __('Include Authors', 'gslider-blocks')
                            }
                            className="gslider-query-author-select"
                        >
                            <Select
                                options={authorOptions}
                                value={selectedAuthorOptions}
                                onChange={handleAuthorsChange}
                                onInputChange={handleAuthorInputChange}
                                filterOption={filterAuthorOption}
                                isLoading={!!loadingSearches.authors}
                                isMulti
                                isClearable
                                placeholder={__('Select...', 'gslider-blocks')}
                                className="gslider-query-select2-control"
                                classNamePrefix="gslider-select2"
                            />
                        </BaseControl>
                    </div>
                )}

                {/* Order By */}
                <BaseControl
                    label={__('Order By', 'gslider-blocks')}
                    className="gslider-query-order-by"
                >
                    <Select
                        options={ORDER_BY_OPTIONS}
                        value={selectedOrderBy}
                        onChange={(option) =>
                            setAttributes({ orderBy: option.value })
                        }
                        className="gslider-query-select2-control"
                        classNamePrefix="gslider-select2"
                    />
                </BaseControl>

                {/* Sort Order */}
                <BaseControl
                    label={__('Sort Order', 'gslider-blocks')}
                    className="gslider-query-sort-order"
                >
                    <Select
                        options={SORT_ORDER_OPTIONS}
                        value={selectedSortOrder}
                        onChange={(option) =>
                            setAttributes({ order: option.value })
                        }
                        className="gslider-query-select2-control"
                        classNamePrefix="gslider-select2"
                    />
                </BaseControl>

                {/* Posts Per Page */}
                <ResponsiveRangeControl
                    label={panelTitle === __('Query Settings', 'gslider-blocks') ? __('Posts Count', 'gslider-blocks') : __('Post Per Page', 'gslider-blocks')}
                    rangeValue={postsPerPage}
                    onChangeValue={(value) => setAttributes({ postsPerPage: value })}
                    deviceType={deviceType}
                    min={1}
                    max={maxPosts}
                    step={1}
                    resetFallbackValue="6"
                    isRangeUnit={false}
                />

                {/* Offset */}
                {showOffset && (
                    <ResponsiveRangeControl
                        label={__('Offset', 'gslider-blocks')}
                        rangeValue={offset}
                        onChangeValue={(value) => setAttributes({ offset: value })}
                        deviceType={deviceType}
                        min={0}
                        max={100}
                        step={1}
                        resetFallbackValue="0"
                        isRangeUnit={false}
                    />
                )}

                {/* Sticky Posts (Hide if related query active) */}
                {!useRelatedPostsQuery && showStickyPosts && (
                    <BaseControl
                        label={__('Sticky Posts', 'gslider-blocks')}
                        className="gslider-query-sticky-posts"
                    >
                        <Select
                            options={STICKY_POSTS_OPTIONS}
                            value={selectedStickyPosts}
                            onChange={(option) =>
                                setAttributes({ stickyPosts: option.value })
                            }
                            className="gslider-query-select2-control"
                            classNamePrefix="gslider-select2"
                        />
                    </BaseControl>
                )}

                {/* Date Range (Hide if related query active) */}
                {!useRelatedPostsQuery && showDateRange && (
                    <BaseControl
                        label={__('Date Range', 'gslider-blocks')}
                        className="gslider-query-date-range"
                    >
                        <Select
                            options={DATE_RANGE_OPTIONS}
                            value={selectedDateRange}
                            onChange={(option) =>
                                setAttributes({ dateRange: option.value })
                            }
                            className="gslider-query-select2-control"
                            classNamePrefix="gslider-select2"
                        />
                    </BaseControl>
                )}

                {/* Meta Query (Hide if related query active) */}
                {!useRelatedPostsQuery && showMetaQuery && (
                    <>
                        <ToggleControl
                            label={__('Filter by Custom Field (Meta)', 'gslider-blocks')}
                            checked={isMetaEnabled}
                            onChange={(isChecked) => {
                                if (!isChecked) {
                                    setIsMetaEnabled(false);
                                    setAttributes({
                                        metaKey: '',
                                        metaValue: '',
                                        metaCompare: '=',
                                    });
                                } else {
                                    setIsMetaEnabled(true);
                                }
                            }}
                        />

                        {isMetaEnabled && (
                            <div className="gslider-meta-query-settings">
                                <InputControls
                                    label={__('Meta Key', 'gslider-blocks')}
                                    value={metaKey || ''}
                                    onChangeValue={(nextVal) =>
                                        setAttributes({ metaKey: nextVal || '' })
                                    }
                                    helpText={__('Enter the custom field name/key.', 'gslider-blocks')}
                                />

                                <BaseControl
                                    label={__('Comparison Operator', 'gslider-blocks')}
                                    className="gslider-query-meta-compare"
                                >
                                    <Select
                                        options={META_COMPARE_OPTIONS}
                                        value={selectedMetaCompare}
                                        onChange={(option) =>
                                            setAttributes({ metaCompare: option.value })
                                        }
                                        className="gslider-query-select2-control"
                                        classNamePrefix="gslider-select2"
                                    />
                                </BaseControl>

                                {!['EXISTS', 'NOT EXISTS'].includes(metaCompare) && (
                                    <InputControls
                                        label={__('Meta Value', 'gslider-blocks')}
                                        value={metaValue || ''}
                                        onChangeValue={(nextVal) =>
                                            setAttributes({ metaValue: nextVal || '' })
                                        }
                                        helpText={__('Enter the custom field value to compare.', 'gslider-blocks')}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Search Keyword (Hide if related query active) */}
                {!useRelatedPostsQuery && showSearchQuery && (
                    <InputControls
                        label={__('Search Keyword', 'gslider-blocks')}
                        value={searchQuery || ''}
                        onChangeValue={(nextVal) =>
                            setAttributes({ searchQuery: nextVal || '' })
                        }
                        helpText={__('Filter posts by search terms.', 'gslider-blocks')}
                    />
                )}

                {/* Exclude Post IDs (Hide if related query active) */}
                {!useRelatedPostsQuery && showExcludePosts && (
                    <InputControls
                        label={__('Exclude Post IDs', 'gslider-blocks')}
                        value={excludePosts || ''}
                        onChangeValue={(nextVal) =>
                            setAttributes({ excludePosts: nextVal || '' })
                        }
                        helpText={__('Comma-separated list of post IDs to exclude.', 'gslider-blocks')}
                    />
                )}

                {/* Exclude Current Post (Hide if related query active - automatically excluded) */}
                {!useRelatedPostsQuery && showExcludeCurrentPost && (
                    <ToggleControl
                        label={__('Exclude Current Post', 'gslider-blocks')}
                        checked={excludeCurrentPost}
                        onChange={(value) =>
                            setAttributes({ excludeCurrentPost: value })
                        }
                        help={__('Prevent the current post from showing up.', 'gslider-blocks')}
                    />
                )}
            </div>
        </PanelBody>
    );
};

export default QuerySettingsPanel;
