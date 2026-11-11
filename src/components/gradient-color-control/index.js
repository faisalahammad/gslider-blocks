import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	ToggleControl,
	TextareaControl,
	GradientPicker,
} from '@wordpress/components';

const GradientColorControl = ( {
	label = '',
	globalCustomGradientSwitcher,
	setGlobalCustomGradientSwitcher,
	globalCustomGradientInputValue,
	setGlobalCustomGradientInputValue,
	globalGradientColor = null,
	setGlobalGradientColor,
} ) => {
	return (
		<BaseControl
			label={ label }
			className="global-gradient-color-setting-wrapper"
		>
			<div className="global-gradient-custom-gradient-wrapper">
				<ToggleControl
					label={ __( 'Add Custom Gradient', 'gslider-blocks' ) }
					checked={ globalCustomGradientSwitcher }
					onChange={ setGlobalCustomGradientSwitcher }
					className="global-gradient-label"
				/>
			</div>

			{ globalCustomGradientSwitcher ? (
				<div className="global-gradient-custom-gradient-textarea-wrapper">
					<TextareaControl
						value={ globalCustomGradientInputValue }
						onChange={ setGlobalCustomGradientInputValue }
						help={ __(
							'Add your gradient color here.',
							'gslider-blocks'
						) }
						className="global-gradient-custom-gradient-textarea"
					/>
				</div>
			) : (
				<BaseControl className="global-gradient-picker-wrapper">
					<GradientPicker
						value={ globalGradientColor || null }
						onChange={ setGlobalGradientColor }
						className="global-gradient-picker"
						gradients={ [
							{
								gradient:
									'linear-gradient(135deg, rgba(6,147,227,1) 0%, rgb(155,81,224) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(122,220,180) 0%, rgb(0,208,130) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgba(252,185,0,1) 0%, rgba(255,105,0,1) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgba(255,105,0,1) 0%, rgb(207,46,46) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(238,238,238) 0%, rgb(169,184,195) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(74,234,220) 0%, rgb(151,120,209) 20%, rgb(207,42,186) 40%, rgb(238,44,130) 60%, rgb(251,105,98) 80%, rgb(254,248,76) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(255,238,88) 0%, rgb(255,140,0) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(0,176,255) 0%, rgb(75,0,130) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(255,173,173) 0%, rgb(255,61,61) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(135,131,120) 0%, rgb(41,44,47) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(240,86,199) 0%, rgb(255,72,0) 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, rgb(120,191,255) 0%, rgb(0,102,204) 100%)',
							},
							{
								gradient:
									'linear-gradient(180deg,#582DF9, #04E0FA)',
							},
							{
								gradient:
									'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
							},
							{
								gradient:
									'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
							},
							{
								gradient:
									'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
							},
							{
								gradient:
									'linear-gradient(to right, rgb(110, 231, 183), rgb(59, 130, 246), rgb(147, 51, 234))',
							},
							{
								gradient:
									'linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(245, 158, 11))',
							},
							{
								gradient:
									'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
							},
							{
								gradient:
									'linear-gradient(rgb(41, 255, 191), rgb(135, 48, 223))',
							},
							{
								gradient:
									'linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)',
							},
							{
								gradient:
									'linear-gradient(rgb(185, 70, 108), rgb(227, 181, 196))',
							},
							{
								gradient:
									'linear-gradient(rgb(255, 128, 0), rgb(255, 179, 102))',
							},
							{
								gradient:
									'linear-gradient(rgb(200, 223, 83), rgb(227, 239, 169))',
							},
							{
								gradient:
									'linear-gradient(rgb(67, 172, 32), rgb(118, 223, 83))',
							},
							{
								gradient:
									'linear-gradient(rgb(32, 172, 172), rgb(83, 223, 223))',
							},
							{
								gradient:
									'linear-gradient(rgb(83, 165, 223), rgb(169, 210, 239))',
							},
							{
								gradient:
									'linear-gradient(rgb(57, 81, 198), rgb(136, 150, 221))',
							},
							{
								gradient:
									'linear-gradient(rgb(69, 34, 119), rgb(144, 97, 209))',
							},
							{
								gradient:
									'linear-gradient(rgb(226, 29, 209), rgb(243, 165, 237))',
							},
							{
								gradient:
									'linear-gradient(rgb(232, 74, 140), rgb(243, 165, 197))',
							},
							{
								gradient:
									'linear-gradient(rgb(29, 184, 195), rgb(245, 112, 174))',
							},
							{
								gradient:
									'linear-gradient(rgb(255, 91, 87), rgb(170, 228, 215))',
							},
							{
								gradient:
									'linear-gradient(rgb(254, 190, 88), rgb(222, 43, 174))',
							},
							{
								gradient:
									'linear-gradient(rgb(79, 191, 201), rgb(224, 56, 56))',
							},
							{
								gradient:
									'linear-gradient(rgb(31, 137, 219), rgb(244, 42, 139))',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FFD439 0%, #FF7A00 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #7CF7FF 0%, #4B73FF 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FFED46 0%, #FF7EC7 100%)',
							},
							{
								gradient:
									'radial-gradient(65% 100% at 50% 0%, #00FF94 0%, rgba(0, 255, 148, 0.25) 100%)',
							},
							{
								gradient:
									'linear-gradient(230deg, #000000 25%, #170059 100%)',
							},
							{
								gradient:
									'linear-gradient(215deg, #FFEBB9 10%, #19004E 80%)',
							},
							{
								gradient:
									'radial-gradient(100% 245% at 100% 100%, #FFFFFF 0%, #000353 100%)',
							},
							{
								gradient:
									'linear-gradient(125deg, #1400FF 0%, #3A0000 100%)',
							},
							{
								gradient:
									'linear-gradient(225deg, #00F0FF 30%, #000B6F 45%, #00EBFC 45%, #001676 65%, #00E1F6 65%, #001676 85%, #00ECFD 85%, #001676 100%)',
							},
							{
								gradient:
									'linear-gradient(135deg, #00F0FF 0%, #000B6F 15%, #00EBFC 15%, #001676 35%, #00E1F6 35%, #001676 55%, #00ECFD 55%, #001676 100%)',
							},
							{
								gradient:
									'linear-gradient(115deg, #000000 0%, #00C508 55%, #000000 100%)',
							},
							{
								gradient:
									'linear-gradient(115deg, #0057FF 0%, #020077 100%)',
							},
							{
								gradient:
									'linear-gradient(120deg, #FF0000 0%, #2400FF 100%)',
							},
							{
								gradient:
									'linear-gradient(120deg, #FA00FF 0%, #208200 100%)',
							},
							{
								gradient:
									'linear-gradient(130deg, #00F0FF 0%, #000000 100%)',
							},
							{
								gradient:
									'radial-gradient(110% 140% at 15% 90%, #ffffff 0%, #1700A4 100%)',
							},
							{
								gradient:
									'radial-gradient(100% 100% at 50% 0%, #AD00FF 0%, #00FFE0 100%)',
							},
							{
								gradient:
									'radial-gradient(100% 100% at 50% 0%, #00FFE0 0%, #7300A9 80%)',
							},
							{
								gradient:
									'linear-gradient(30deg, #7ca304 0%, #2200AA 100%)',
							},
							{
								gradient:
									'linear-gradient(123deg, #FFFFFF 0%, #00B2FF 100%)',
							},
							{
								gradient:
									'linear-gradient(236deg, #BAFF99 0%, #005E64 100%)',
							},
							{
								gradient:
									'linear-gradient(225deg, #0094FF 1%, #BFF4ED 45.5%, #FF004E 60.6%, #280F34 70.3%, #B30753 81.6%, #E41655 85.1%, #B30753 100%)',
							},
							{
								gradient:
									'linear-gradient(320.54deg, #00069F 0%, #120010 72.37%)',
							},
							{
								gradient:
									'linear-gradient(58.72deg, #69D200 0%, #970091 100%)',
							},
							{
								gradient:
									'linear-gradient(121.28deg, #8CFF18 0%, #6C0075 100%)',
							},
							{
								gradient:
									'linear-gradient(121.28deg, #8000FF 0%, #000000 100%)',
							},
							{
								gradient:
									'linear-gradient(180deg, #00FF19 0%, #24FF00 0.01%, #2400FF 100%)',
							},
							{
								gradient:
									'linear-gradient(52.23deg, #0500FF 0%, #FF0000 100%)',
							},
							{
								gradient:
									'linear-gradient(121.28deg, #32003A 0%, #FF4040 100%)',
							},
							{
								gradient:
									'radial-gradient(50% 72.12% at 50% 50%, #EB00FF 0%, #110055 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FF3F3F 0%, #063CFF 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FF5EEF 0%, #456EFF 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #DEB5FF 0%, #6F00B3 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #4063BC 0%, #6B0013 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FFF500 0%, #FF00B8 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FFC328 0%, #E20000 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FFE70B 0%, #27B643 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FFADF7 0%, #B1FF96 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #B7DCFF 0%, #FFA4F6 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #5EE2FF 0%, #00576A 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #D7003A 0%, #19087E 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #FADD76 0%, #9F3311 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #00E0EE 0%, #AD00FE 100%)',
							},
							{
								gradient:
									'linear-gradient(220.55deg, #D0004B 0%, #88069D 100%)',
							},
							{
								gradient:
									'radial-gradient(circle at center bottom, #FFDB8B 0%, #EE653D 25%, #D42E81 50%, #A237B6 75%, #3E5FBC 100%)',
							},
							{
								gradient:
									'linear-gradient(180deg, #04E2F7, #1448D8)',
							},
							{
								gradient:
									'linear-gradient(180deg, #11AEEB, #C13AF1)',
							},
							{
								gradient:
									'linear-gradient(180deg, #11AEEB, #35F39D)',
							},
							{
								gradient:
									'linear-gradient(180deg, #12C0DB, #EF04F6)',
							},
							{
								gradient:
									'linear-gradient(180deg, #C542E3, #FD0300)',
							},
							{
								gradient:
									'linear-gradient(180deg, #32C7E5, #F078D5)',
							},
							{
								gradient:
									'linear-gradient(180deg, #CB5EEE, #4BE1EC)',
							},
							{
								gradient:
									'linear-gradient(180deg, #FB1834, #FB2B90)',
							},
							{
								gradient:
									'linear-gradient(180deg, #2DCDB0, #F2FD6C)',
							},
							{
								gradient:
									'linear-gradient(180deg, #E3EE4C, #18595C)',
							},
							{
								gradient:
									'linear-gradient(180deg, #DD051B, #1D00DC)',
							},
							{
								gradient:
									'radial-gradient(circle at center bottom, #FDE68A, #7C3AED, #0C4A6E)',
							},
							{
								gradient:
									'linear-gradient(151.84deg, #3BC5CE 45.85%, #FFBB0D 72.21%)',
							},
							{
								gradient:
									'linear-gradient(135deg, #0E0220 0%, #000000 6px, #E40475 24.8%, #0E0220 35%, #48E0E4 56.3%, #48E0E4 62.4%, #FF00C8 72.9%, #000000DB 78.5%, #48E0E4 100%)',
							},
							{
								gradient:
									'linear-gradient(180deg, #E02020 0%, #FA6400 17%, #F7B500 33%, #6DD400 50%, #0091FF 67%, #6236FF 83%, #B620E0 100%)',
							},
							{
								gradient:
									'linear-gradient(225deg, #32C5FF 0%, #B620E0 51%, #F7B500 100%)',
							},
							{
								gradient:
									'linear-gradient(180deg, #1C2735 0%, #04A4DE 18.52%, #3081BB 28.47%, #1681A0 39.58%, #00F5BE 51.56%, #E5FFFF 55.44%, #06EEDC 59.63%, #00A3AD 76.56%, #08C9E9 88.54%, #03B0E8 100%)',
							},
							{
								gradient:
									'linear-gradient(180deg, #CE375F 0%, #F88032 5.21%, #EEC629 15.62%, #D8BC1D 25.52%, #DB843C 36.98%, #D76258 46.35%, #D24664 55.73%, #AF15B1 66.67%, #873AC6 78.12%, #446AF1 84.9%, #373DBA 100%)',
							},
							{
								gradient:
									'radial-gradient(50% 100% at left -10% top 80%, #DB0072, transparent), radial-gradient(50% 100% at left 25% top 60%, #FFE53E, transparent), radial-gradient(50% 100% at left 55% top 40%, #00FFE4, transparent), radial-gradient(50% 100% at left 90% top 20%, #D150FF, transparent)',
							},
						] }
					/>
				</BaseControl>
			) }
		</BaseControl>
	);
};

export default GradientColorControl;
