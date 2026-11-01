/**
 * Accessible iOS-Style Toggle Switch component for GSlider Blocks Admin Dashboard.
 *
 * Implements ARIA switch semantics with keyboard navigation support (Space / Enter).
 *
 * @since 1.2.0
 */

/**
 * ToggleSwitch Component.
 *
 * @param {Object}   props             Component properties.
 * @param {string}   [props.id]        Unique element id.
 * @param {boolean}  props.checked     Current switch status (true = on, false = off).
 * @param {Function} props.onChange    Callback triggered when toggled.
 * @param {boolean}  [props.disabled]  Whether the switch is disabled.
 * @param {string}   [props.ariaLabel] Accessible label describing the toggle action.
 * @return {JSX.Element} The rendered switch button.
 */
const ToggleSwitch = ( {
	id,
	checked,
	onChange,
	disabled = false,
	ariaLabel,
} ) => {
	const handleClick = () => {
		if ( ! disabled && typeof onChange === 'function' ) {
			onChange( ! checked );
		}
	};

	return (
		<button
			type="button"
			role="switch"
			id={ id }
			aria-checked={ checked }
			aria-label={ ariaLabel }
			disabled={ disabled }
			className={ `gslider-toggle-switch ${
				checked ? 'is-checked' : ''
			}` }
			onClick={ handleClick }
		>
			<span className="gslider-toggle-track">
				<span className="gslider-toggle-thumb" />
			</span>
		</button>
	);
};

export default ToggleSwitch;
