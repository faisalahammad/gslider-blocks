/**
 * Shared Animation Attributes
 *
 * This file defines all animation-related block attributes.
 * Spread this into any block's attributes.js to enable animation support:
 *
 * @example
 * import { animationAttributes } from '@Components/animation-control/animation-attributes';
 * const attributes = { ...blockSpecificAttributes, ...animationAttributes };
 *
 * NOTE: All responsive range values use string defaults because
 * ResponsiveRangeControl stores and compares values as strings.
 *
 * @package GSlider\Blocks
 */

export const animationAttributes = {

    /** Entrance Animation */
    cardEntranceAnimation: {
        type: 'string',
        default: 'none',
    },
    cardEntranceAnimationDuration: {
        type: 'object',
        default: {
            Desktop: '600',
            Tablet: '600',
            Mobile: '600',
        },
    },
    cardEntranceAnimationDelay: {
        type: 'object',
        default: {
            Desktop: '0',
            Tablet: '0',
            Mobile: '0',
        },
    },
    cardEntranceAnimationOffset: {
        type: 'object',
        default: {
            Desktop: '15',
            Tablet: '15',
            Mobile: '15',
        },
    },
    cardEntranceAnimationEasing: {
        type: 'string',
        default: 'ease-out',
    },

    /** Stagger Animation */
    enableStaggerAnimation: {
        type: 'boolean',
        default: false,
    },
    cardStaggerDelay: {
        type: 'object',
        default: {
            Desktop: '100',
            Tablet: '100',
            Mobile: '100',
        },
    },

    /** Card Hover Animation */
    cardHoverAnimation: {
        type: 'string',
        default: 'none',
    },
    cardHoverAnimationDuration: {
        type: 'object',
        default: {
            Desktop: '300',
            Tablet: '300',
            Mobile: '300',
        },
    },
    cardHoverLift: {
        type: 'object',
        default: {
            Desktop: '8',
            Tablet: '8',
            Mobile: '8',
        },
    },
    cardHoverScale: {
        type: 'object',
        default: {
            Desktop: '1.03',
            Tablet: '1.03',
            Mobile: '1.03',
        },
    },
    cardHoverPopScale: {
        type: 'object',
        default: {
            Desktop: '1.06',
            Tablet: '1.06',
            Mobile: '1.06',
        },
    },
    cardHoverShadowColor: {
        type: 'string',
        default: 'rgba(0, 0, 0, 0.25)',
    },
    cardHoverGlowColor: {
        type: 'string',
        default: 'rgba(0, 122, 255, 0.5)',
    },
    cardHoverGlowSize: {
        type: 'object',
        default: {
            Desktop: '15',
            Tablet: '15',
            Mobile: '15',
        },
    },

    /** 3D Tilt Effect */
    enableCardTilt: {
        type: 'boolean',
        default: false,
    },
    cardTiltMaxAngle: {
        type: 'object',
        default: {
            Desktop: '12',
            Tablet: '12',
            Mobile: '12',
        },
    },
    cardTiltPerspective: {
        type: 'object',
        default: {
            Desktop: '800',
            Tablet: '800',
            Mobile: '800',
        },
    },
    cardTiltHoverScale: {
        type: 'object',
        default: {
            Desktop: '1.02',
            Tablet: '1.02',
            Mobile: '1.02',
        },
    },
    cardTiltTransitionSpeed: {
        type: 'object',
        default: {
            Desktop: '400',
            Tablet: '400',
            Mobile: '400',
        },
    },
};
