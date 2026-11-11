import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    ToggleControl,
} from '@wordpress/components';
import Select2Control from '@Components/select2-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ColorControl from '@Components/color-control';

/**
 * Animation entrance options grouped by category.
 * Uses Animate.css class names — keyframes are in style.scss.
 */
const ENTRANCE_ANIMATION_OPTIONS = [
    { label: __( 'None', 'gslider-blocks' ),            value: 'none' },

    { label: __( '── Fade ──', 'gslider-blocks' ),     value: '', disabled: true },
    { label: __( 'Fade In', 'gslider-blocks' ),         value: 'fadeIn' },
    { label: __( 'Fade Up', 'gslider-blocks' ),         value: 'fadeInUp' },
    { label: __( 'Fade Down', 'gslider-blocks' ),       value: 'fadeInDown' },
    { label: __( 'Fade Left', 'gslider-blocks' ),       value: 'fadeInLeft' },
    { label: __( 'Fade Right', 'gslider-blocks' ),      value: 'fadeInRight' },
    { label: __( 'Fade Top Left', 'gslider-blocks' ),   value: 'fadeInTopLeft' },
    { label: __( 'Fade Top Right', 'gslider-blocks' ),  value: 'fadeInTopRight' },

    { label: __( '── Zoom ──', 'gslider-blocks' ),     value: '', disabled: true },
    { label: __( 'Zoom In', 'gslider-blocks' ),         value: 'zoomIn' },
    { label: __( 'Zoom In Up', 'gslider-blocks' ),      value: 'zoomInUp' },
    { label: __( 'Zoom In Down', 'gslider-blocks' ),    value: 'zoomInDown' },
    { label: __( 'Zoom In Left', 'gslider-blocks' ),    value: 'zoomInLeft' },
    { label: __( 'Zoom In Right', 'gslider-blocks' ),   value: 'zoomInRight' },

    { label: __( '── Bounce ──', 'gslider-blocks' ),   value: '', disabled: true },
    { label: __( 'Bounce In', 'gslider-blocks' ),       value: 'bounceIn' },
    { label: __( 'Bounce In Up', 'gslider-blocks' ),    value: 'bounceInUp' },
    { label: __( 'Bounce In Down', 'gslider-blocks' ),  value: 'bounceInDown' },
    { label: __( 'Bounce In Left', 'gslider-blocks' ),  value: 'bounceInLeft' },
    { label: __( 'Bounce In Right', 'gslider-blocks' ), value: 'bounceInRight' },

    { label: __( '── Flip (3D) ──', 'gslider-blocks' ), value: '', disabled: true },
    { label: __( 'Flip In X', 'gslider-blocks' ),       value: 'flipInX' },
    { label: __( 'Flip In Y', 'gslider-blocks' ),       value: 'flipInY' },

    { label: __( '── Rotate ──', 'gslider-blocks' ),   value: '', disabled: true },
    { label: __( 'Rotate In', 'gslider-blocks' ),       value: 'rotateIn' },
    { label: __( 'Rotate In Down Left', 'gslider-blocks' ),  value: 'rotateInDownLeft' },
    { label: __( 'Rotate In Down Right', 'gslider-blocks' ), value: 'rotateInDownRight' },

    { label: __( '── Slide ──', 'gslider-blocks' ),    value: '', disabled: true },
    { label: __( 'Slide In Up', 'gslider-blocks' ),     value: 'slideInUp' },
    { label: __( 'Slide In Down', 'gslider-blocks' ),   value: 'slideInDown' },
    { label: __( 'Slide In Left', 'gslider-blocks' ),   value: 'slideInLeft' },
    { label: __( 'Slide In Right', 'gslider-blocks' ),  value: 'slideInRight' },

    { label: __( '── Special ──', 'gslider-blocks' ),  value: '', disabled: true },
    { label: __( 'Back In Down', 'gslider-blocks' ),    value: 'backInDown' },
    { label: __( 'Back In Left', 'gslider-blocks' ),    value: 'backInLeft' },
    { label: __( 'Back In Right', 'gslider-blocks' ),   value: 'backInRight' },
    { label: __( 'Back In Up', 'gslider-blocks' ),      value: 'backInUp' },
    { label: __( 'Light Speed Right', 'gslider-blocks' ), value: 'lightSpeedInRight' },
    { label: __( 'Light Speed Left', 'gslider-blocks' ),  value: 'lightSpeedInLeft' },
    { label: __( 'Jack In The Box', 'gslider-blocks' ), value: 'jackInTheBox' },
    { label: __( 'Roll In', 'gslider-blocks' ),         value: 'rollIn' },
];

const EASING_OPTIONS = [
    { label: __( 'Ease Out (Recommended)', 'gslider-blocks' ), value: 'ease-out' },
    { label: __( 'Ease', 'gslider-blocks' ),                    value: 'ease' },
    { label: __( 'Ease In', 'gslider-blocks' ),                 value: 'ease-in' },
    { label: __( 'Ease In Out', 'gslider-blocks' ),             value: 'ease-in-out' },
    { label: __( 'Linear', 'gslider-blocks' ),                  value: 'linear' },
];

const HOVER_ANIMATION_OPTIONS = [
    { label: __( 'None', 'gslider-blocks' ),         value: 'none' },
    { label: __( 'Lift Up', 'gslider-blocks' ),      value: 'lift' },
    { label: __( 'Zoom Scale', 'gslider-blocks' ),   value: 'zoom' },
    { label: __( 'Lift + Zoom', 'gslider-blocks' ),  value: 'lift-zoom' },
    { label: __( 'Pop', 'gslider-blocks' ),          value: 'pop' },
    { label: __( 'Shadow Depth', 'gslider-blocks' ), value: 'shadow-depth' },
    { label: __( 'Border Glow', 'gslider-blocks' ),  value: 'border-glow' },
];

/**
 * AnimationControl Component
 *
 * Reusable Gutenberg Inspector panel for animation settings.
 * Renders a PanelBody with all animation controls.
 *
 * @param {object}   props
 * @param {object}   props.attributes       Block attributes object.
 * @param {Function} props.setAttributes    Block setAttributes function.
 * @param {boolean}  props.opened          Whether this panel is open.
 * @param {Function} props.onToggle        Toggle handler for the panel.
 */
export default function AnimationControl( { 
    attributes, 
    setAttributes, 
    opened, 
    onToggle,
    deviceType = 'Desktop',
    showEntrance = true,
    showStagger = true,
    showHover = true,
    showTilt = true,
} ) {
    const {
        cardEntranceAnimation,
        cardEntranceAnimationDuration,
        cardEntranceAnimationDelay,
        cardEntranceAnimationOffset,
        cardEntranceAnimationEasing,
        enableStaggerAnimation,
        cardStaggerDelay,
        cardHoverAnimation,
        cardHoverAnimationDuration,
        enableCardTilt,
        cardTiltMaxAngle,
        cardTiltPerspective,
        cardTiltHoverScale,
        cardTiltTransitionSpeed,

        // Custom Card Hover settings
        cardHoverLift,
        cardHoverScale,
        cardHoverPopScale,
        cardHoverShadowColor,
        cardHoverGlowColor,
        cardHoverGlowSize,
    } = attributes;

    const hasEntranceAnimation = cardEntranceAnimation && cardEntranceAnimation !== 'none';

    return (
        <PanelBody
            title={ __( 'Animation Settings', 'gslider-blocks' ) }
            opened={ opened }
            onToggle={ onToggle }
            className="gslider-animation-panel"
        >

            { /* ── Entrance Animation ── */ }
            { showEntrance && (
                <>
                    <p className="gslider-panel-section-label">
                        { __( 'Entrance Animation', 'gslider-blocks' ) }
                    </p>

                    <Select2Control
                        label={ __( 'Animation Type', 'gslider-blocks' ) }
                        value={ cardEntranceAnimation }
                        options={ ENTRANCE_ANIMATION_OPTIONS }
                        onChange={ ( value ) => setAttributes( { cardEntranceAnimation: value } ) }
                    />

                    { hasEntranceAnimation && (
                        <>
                            <ResponsiveRangeControl
                                label={ __( 'Duration (ms)', 'gslider-blocks' ) }
                                rangeValue={ cardEntranceAnimationDuration }
                                onChangeValue={ ( value ) => setAttributes( { cardEntranceAnimationDuration: value } ) }
                                deviceType={ deviceType }
                                min={ 100 }
                                max={ 5000 }
                                step={ 50 }
                                resetFallbackValue={ "600" }
                                isRangeUnit={ false }
                            />

                            <ResponsiveRangeControl
                                label={ __( 'Delay (ms)', 'gslider-blocks' ) }
                                rangeValue={ cardEntranceAnimationDelay }
                                onChangeValue={ ( value ) => setAttributes( { cardEntranceAnimationDelay: value } ) }
                                deviceType={ deviceType }
                                min={ 0 }
                                max={ 5000 }
                                step={ 50 }
                                resetFallbackValue={ "0" }
                                isRangeUnit={ false }
                            />

                            <ResponsiveRangeControl
                                label={ __( 'Viewport Offset (%)', 'gslider-blocks' ) }
                                rangeValue={ cardEntranceAnimationOffset }
                                onChangeValue={ ( value ) => setAttributes( { cardEntranceAnimationOffset: value } ) }
                                deviceType={ deviceType }
                                min={ 0 }
                                max={ 50 }
                                step={ 5 }
                                resetFallbackValue={ "15" }
                                isRangeUnit={ false }
                            />

                            <Select2Control
                                label={ __( 'Easing', 'gslider-blocks' ) }
                                value={ cardEntranceAnimationEasing }
                                options={ EASING_OPTIONS }
                                onChange={ ( value ) => setAttributes( { cardEntranceAnimationEasing: value } ) }
                            />
                        </>
                    ) }
                </>
            ) }

            { /* ── Stagger Animation ── */ }
            { showStagger && (
                <>
                    { showEntrance && <div className="gslider-panel-section-divider" /> }
                    <p className="gslider-panel-section-label">
                        { __( 'Stagger Animation', 'gslider-blocks' ) }
                    </p>

                    <ToggleControl
                        label={ __( 'Enable Stagger', 'gslider-blocks' ) }
                        help={ __( 'Cards animate one after another with a delay', 'gslider-blocks' ) }
                        checked={ enableStaggerAnimation }
                        onChange={ ( value ) => setAttributes( { enableStaggerAnimation: value } ) }
                    />

                    { enableStaggerAnimation && hasEntranceAnimation && (
                        <ResponsiveRangeControl
                            label={ __( 'Stagger Delay (ms)', 'gslider-blocks' ) }
                            rangeValue={ cardStaggerDelay }
                            onChangeValue={ ( value ) => setAttributes( { cardStaggerDelay: value } ) }
                            deviceType={ deviceType }
                            min={ 50 }
                            max={ 500 }
                            step={ 10 }
                            resetFallbackValue={ "100" }
                            isRangeUnit={ false }
                        />
                    ) }

                    { enableStaggerAnimation && ! hasEntranceAnimation && (
                        <p className="gslider-panel-notice">
                            { __( '⚠ Please select an Entrance Animation first.', 'gslider-blocks' ) }
                        </p>
                    ) }
                </>
            ) }

            { /* ── Card Hover Effect ── */ }
            { showHover && (
                <>
                    { ( showEntrance || showStagger ) && <div className="gslider-panel-section-divider" /> }
                    <p className="gslider-panel-section-label">
                        { __( 'Card Hover Effect', 'gslider-blocks' ) }
                    </p>

                    <Select2Control
                        label={ __( 'Hover Animation', 'gslider-blocks' ) }
                        value={ cardHoverAnimation }
                        options={ HOVER_ANIMATION_OPTIONS }
                        onChange={ ( value ) => setAttributes( { cardHoverAnimation: value } ) }
                    />

                    { cardHoverAnimation !== 'none' && (
                        <ResponsiveRangeControl
                            label={ __( 'Hover Duration (ms)', 'gslider-blocks' ) }
                            rangeValue={ cardHoverAnimationDuration }
                            onChangeValue={ ( value ) => setAttributes( { cardHoverAnimationDuration: value } ) }
                            deviceType={ deviceType }
                            min={ 100 }
                            max={ 1000 }
                            step={ 50 }
                            resetFallbackValue={ "300" }
                            isRangeUnit={ false }
                        />
                    ) }

                    { ( cardHoverAnimation === 'lift' || cardHoverAnimation === 'lift-zoom' ) && (
                        <ResponsiveRangeControl
                            label={ __( 'Hover Lift (px)', 'gslider-blocks' ) }
                            rangeValue={ cardHoverLift }
                            onChangeValue={ ( value ) => setAttributes( { cardHoverLift: value } ) }
                            deviceType={ deviceType }
                            min={ 0 }
                            max={ 50 }
                            step={ 1 }
                            resetFallbackValue={ "8" }
                            isRangeUnit={ false }
                        />
                    ) }

                    { ( cardHoverAnimation === 'zoom' || cardHoverAnimation === 'lift-zoom' ) && (
                        <ResponsiveRangeControl
                            label={ __( 'Hover Scale', 'gslider-blocks' ) }
                            rangeValue={ cardHoverScale }
                            onChangeValue={ ( value ) => setAttributes( { cardHoverScale: value } ) }
                            deviceType={ deviceType }
                            min={ 1.00 }
                            max={ 1.20 }
                            step={ 0.01 }
                            resetFallbackValue={ "1.03" }
                            isRangeUnit={ false }
                        />
                    ) }

                    { cardHoverAnimation === 'pop' && (
                        <ResponsiveRangeControl
                            label={ __( 'Pop Scale', 'gslider-blocks' ) }
                            rangeValue={ cardHoverPopScale }
                            onChangeValue={ ( value ) => setAttributes( { cardHoverPopScale: value } ) }
                            deviceType={ deviceType }
                            min={ 1.00 }
                            max={ 1.20 }
                            step={ 0.01 }
                            resetFallbackValue={ "1.06" }
                            isRangeUnit={ false }
                        />
                    ) }

                    { cardHoverAnimation === 'shadow-depth' && (
                        <ColorControl
                            label={ __( 'Shadow Color', 'gslider-blocks' ) }
                            color={ cardHoverShadowColor }
                            onChangeColor={ ( value ) => setAttributes( { cardHoverShadowColor: value } ) }
                        />
                    ) }

                    { cardHoverAnimation === 'border-glow' && (
                        <>
                            <ColorControl
                                label={ __( 'Glow Color', 'gslider-blocks' ) }
                                color={ cardHoverGlowColor }
                                onChangeColor={ ( value ) => setAttributes( { cardHoverGlowColor: value } ) }
                            />
                            <ResponsiveRangeControl
                                label={ __( 'Glow Size (px)', 'gslider-blocks' ) }
                                rangeValue={ cardHoverGlowSize }
                                onChangeValue={ ( value ) => setAttributes( { cardHoverGlowSize: value } ) }
                                deviceType={ deviceType }
                                min={ 5 }
                                max={ 50 }
                                step={ 1 }
                                resetFallbackValue={ "15" }
                                isRangeUnit={ false }
                            />
                        </>
                    ) }
                </>
            ) }

            { /* ── 3D Tilt Effect ── */ }
            { showTilt && (
                <>
                    { ( showEntrance || showStagger || showHover ) && <div className="gslider-panel-section-divider" /> }
                    <p className="gslider-panel-section-label">
                        { __( '3D Tilt Effect', 'gslider-blocks' ) }
                    </p>

                    <ToggleControl
                        label={ __( 'Enable 3D Tilt', 'gslider-blocks' ) }
                        help={ __( 'Cards tilt in 3D on mouse hover', 'gslider-blocks' ) }
                        checked={ enableCardTilt }
                        onChange={ ( value ) => setAttributes( { enableCardTilt: value } ) }
                    />

                     { enableCardTilt && (
                        <>
                            <ResponsiveRangeControl
                                label={ __( 'Max Tilt Angle (°)', 'gslider-blocks' ) }
                                rangeValue={ cardTiltMaxAngle }
                                onChangeValue={ ( value ) => setAttributes( { cardTiltMaxAngle: value } ) }
                                deviceType={ deviceType }
                                min={ 5 }
                                max={ 25 }
                                step={ 1 }
                                resetFallbackValue={ "12" }
                                isRangeUnit={ false }
                            />

                            <ResponsiveRangeControl
                                label={ __( 'Tilt Perspective (px)', 'gslider-blocks' ) }
                                rangeValue={ cardTiltPerspective }
                                onChangeValue={ ( value ) => setAttributes( { cardTiltPerspective: value } ) }
                                deviceType={ deviceType }
                                min={ 200 }
                                max={ 2000 }
                                step={ 50 }
                                resetFallbackValue={ "800" }
                                isRangeUnit={ false }
                            />

                            <ResponsiveRangeControl
                                label={ __( 'Hover Zoom Scale', 'gslider-blocks' ) }
                                rangeValue={ cardTiltHoverScale }
                                onChangeValue={ ( value ) => setAttributes( { cardTiltHoverScale: value } ) }
                                deviceType={ deviceType }
                                min={ 1.00 }
                                max={ 1.20 }
                                step={ 0.01 }
                                resetFallbackValue={ "1.02" }
                                isRangeUnit={ false }
                            />

                            <ResponsiveRangeControl
                                label={ __( 'Tilt Transition Speed (ms)', 'gslider-blocks' ) }
                                rangeValue={ cardTiltTransitionSpeed }
                                onChangeValue={ ( value ) => setAttributes( { cardTiltTransitionSpeed: value } ) }
                                deviceType={ deviceType }
                                min={ 100 }
                                max={ 2000 }
                                step={ 50 }
                                resetFallbackValue={ "400" }
                                isRangeUnit={ false }
                            />
                        </>
                    ) }
                </>
            ) }

        </PanelBody>
    );
}
