/* eslint-disable import/no-unresolved */
import { queryAttributes } from '@Components/query-settings-panel/query-attributes';
import { animationAttributes } from '@Components/animation-control/animation-attributes';
import layoutAttributes from './attributes/layoutAttributes';
import carouselAttributes from './attributes/carouselAttributes';
import elementAttributes from './attributes/elementAttributes';
import globalAttributes from './attributes/globalAttributes';

const attributes = {
	...layoutAttributes,
	...carouselAttributes,
	...elementAttributes,
	...globalAttributes,
	...queryAttributes,
	...animationAttributes,
};

export default attributes;
