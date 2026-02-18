import { Metadata } from 'next';
import { SEOData } from '@/types';

export enum SeoType {
  ARTICLE = 'article',
  PROFILE = 'profile',
}

export const getMetadataFromSEOConfig = (
  locale: string,
  type: SeoType,
  seoData: SEOData
) =>
  ({
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: type,
      images: [
        {
          url: seoData.image?.responsiveImage.src,
          alt: seoData.image?.responsiveImage.alt,
          width: seoData.image?.responsiveImage.width,
          height: seoData.image?.responsiveImage.height,
        },
      ],
      twitter: [
        {
          card: seoData.twitterCard,
          title: seoData.title,
          description: seoData.description,
          images: seoData.image?.responsiveImage.src,
        },
      ],
      locale: locale,
    },
  }) as Metadata;

export default getMetadataFromSEOConfig;
