/**
 * Post Carousel Block Icon component.
 *
 * @since 1.2.3
 *
 * @param {Object} props Component properties.
 * @return {JSX.Element} SVG element.
 */
const PostCarouselIcon = ( props ) => {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{ ...props }
		>
			<rect
				x="3"
				y="3.5"
				width="14"
				height="11"
				rx="2"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<path
				d="M6.5 7.5H13.5M6.5 10.5H11"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<circle cx="7" cy="17" r="0.9" fill="currentColor" />
			<circle cx="10" cy="17" r="0.9" fill="currentColor" />
			<circle cx="13" cy="17" r="0.9" fill="currentColor" />
		</svg>
	);
};

export default PostCarouselIcon;
