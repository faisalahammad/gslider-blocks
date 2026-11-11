import { __ } from '@wordpress/i18n';
import CardStylePanel from './CardStylePanel';
import ImageStylePanel from './ImageStylePanel';
import TaxonomyStylePanel from './TaxonomyStylePanel';
import TitleStylePanel from './TitleStylePanel';
import ExcerptStylePanel from './ExcerptStylePanel';
import AuthorImageStylePanel from './AuthorImageStylePanel';
import AuthorNameStylePanel from './AuthorNameStylePanel';
import PostDateStylePanel from './PostDateStylePanel';
import ReadMoreStylePanel from './ReadMoreStylePanel';
import NavStylePanel from './NavStylePanel';
import PaginationStylePanel from './PaginationStylePanel';

/**
 * Renders the Styles inspector tab with all modular card, typography, and carousel chrome panels.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {string}   props.openPanel     Currently expanded style panel key.
 * @param {Function} props.onTogglePanel Accordion toggle callback for panel key.
 * @return {Element} Styles inspector tab content.
 */
const StylesTab = ( {
	attributes,
	setAttributes,
	deviceType,
	openPanel,
	onTogglePanel,
} ) => {
	const {
		showFeaturedImage,
		showTaxonomy,
		postTaxonomyDisplay,
		showPostTitle,
		showExcerpt,
		showMeta,
		showReadMoreButton,
		showNavigation,
		showPagination,
	} = attributes;

	return (
		<>
			<CardStylePanel
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				isOpen={ openPanel === 'post-card' }
				onToggle={ () => onTogglePanel( 'post-card' ) }
			/>

			{ showFeaturedImage?.[ deviceType ] && (
				<ImageStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'image' }
					onToggle={ () => onTogglePanel( 'image' ) }
				/>
			) }

			{ showTaxonomy?.[ deviceType ] &&
				( postTaxonomyDisplay === 'category' ||
					postTaxonomyDisplay === 'both' ) && (
					<TaxonomyStylePanel
						title={ __( 'Categories', 'gslider-blocks' ) }
						prefix="postCategory"
						attributes={ attributes }
						setAttributes={ setAttributes }
						deviceType={ deviceType }
						isOpen={ openPanel === 'post-categories' }
						onToggle={ () => onTogglePanel( 'post-categories' ) }
					/>
				) }

			{ showTaxonomy?.[ deviceType ] &&
				( postTaxonomyDisplay === 'tag' ||
					postTaxonomyDisplay === 'both' ) && (
					<TaxonomyStylePanel
						title={ __( 'Tags', 'gslider-blocks' ) }
						prefix="postTag"
						attributes={ attributes }
						setAttributes={ setAttributes }
						deviceType={ deviceType }
						isOpen={ openPanel === 'post-tags' }
						onToggle={ () => onTogglePanel( 'post-tags' ) }
					/>
				) }

			{ showPostTitle?.[ deviceType ] && (
				<TitleStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'post-title' }
					onToggle={ () => onTogglePanel( 'post-title' ) }
				/>
			) }

			{ showExcerpt?.[ deviceType ] && (
				<ExcerptStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'post-excerpt' }
					onToggle={ () => onTogglePanel( 'post-excerpt' ) }
				/>
			) }

			{ showMeta?.[ deviceType ] && (
				<AuthorImageStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'authorImage' }
					onToggle={ () => onTogglePanel( 'authorImage' ) }
				/>
			) }

			{ showMeta?.[ deviceType ] && (
				<AuthorNameStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'authorName' }
					onToggle={ () => onTogglePanel( 'authorName' ) }
				/>
			) }

			{ showMeta?.[ deviceType ] && (
				<PostDateStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'postDate' }
					onToggle={ () => onTogglePanel( 'postDate' ) }
				/>
			) }

			{ showReadMoreButton?.[ deviceType ] && (
				<ReadMoreStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					openPanel={ openPanel }
					onTogglePanel={ onTogglePanel }
				/>
			) }

			{ showNavigation?.[ deviceType ] && (
				<NavStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'navigation' }
					onToggle={ () => onTogglePanel( 'navigation' ) }
				/>
			) }

			{ showPagination?.[ deviceType ] && (
				<PaginationStylePanel
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ deviceType }
					isOpen={ openPanel === 'pagination' }
					onToggle={ () => onTogglePanel( 'pagination' ) }
				/>
			) }
		</>
	);
};

export default StylesTab;
