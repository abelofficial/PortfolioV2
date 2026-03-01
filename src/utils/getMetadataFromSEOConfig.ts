import { Metadata } from 'next';
import { toNextMetadata, type SeoOrFaviconTag } from 'react-datocms/seo';
import { TitleMetaLinkTag } from '@/types';

export interface SiteMetaTags {
  _site: {
    faviconMetaTags: TitleMetaLinkTag[];
  };
}

/**
 * Converts DatoCMS SEO and favicon meta tags to Next.js Metadata format
 * Uses the official react-datocms toNextMetadata helper
 *
 * @param seoMetaTags - Array of SEO meta tags from DatoCMS (_seoMetaTags field)
 * @param faviconMetaTags - Array of favicon meta tags from DatoCMS (_site.faviconMetaTags)
 * @returns Next.js Metadata object
 */
export const getMetadataFromDatoCMS = (
  seoMetaTags: TitleMetaLinkTag[],
  faviconMetaTags: TitleMetaLinkTag[] = []
): Metadata => {
  // Cast to SeoOrFaviconTag[] since our TitleMetaLinkTag matches the structure
  // but TypeScript can't infer the string literal types from GraphQL response
  const allTags = [...seoMetaTags, ...faviconMetaTags] as SeoOrFaviconTag[];
  return toNextMetadata(allTags);
};

export default getMetadataFromDatoCMS;
