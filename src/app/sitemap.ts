import type { MetadataRoute } from 'next';
import { datoCMS } from '@services/datoCMS';
import languages from '@/utils/languages';

const BASE_URL = 'https://abelsintaro.com';

interface SitemapItem {
  slugId: string;
  _updatedAt?: string;
}

interface BookSummaryItem extends SitemapItem {
  chapters?: { slugId: string; _updatedAt?: string }[];
}

const sitemapQuery = `
  query Sitemap($locale: SiteLocale) {
    allBookSummaries(locale: $locale) {
      slugId
      _updatedAt
      chapters {
        slugId
        _updatedAt
      }
    }
    allTechnicalLedgers(locale: $locale) {
      slugId
      _updatedAt
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages for each locale
  const staticPages: MetadataRoute.Sitemap = languages.flatMap((lang) => [
    {
      url: `${BASE_URL}/${lang.language}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/${lang.language}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${lang.language}/book-summaries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/${lang.language}/technical-ledgers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]);

  // Dynamic pages from CMS
  const dynamicPages: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    const data: {
      allBookSummaries: BookSummaryItem[];
      allTechnicalLedgers: SitemapItem[];
    } = await datoCMS({
      query: sitemapQuery,
      variables: { locale: lang.code },
    });

    // Book summaries
    for (const book of data.allBookSummaries) {
      dynamicPages.push({
        url: `${BASE_URL}/${lang.language}/book-summaries/${book.slugId}`,
        lastModified: book._updatedAt ? new Date(book._updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });

      // Book chapters
      if (book.chapters) {
        for (const chapter of book.chapters) {
          dynamicPages.push({
            url: `${BASE_URL}/${lang.language}/book-summaries/${book.slugId}/chapter/${chapter.slugId}`,
            lastModified: chapter._updatedAt
              ? new Date(chapter._updatedAt)
              : new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    }

    // Technical ledgers
    for (const ledger of data.allTechnicalLedgers) {
      dynamicPages.push({
        url: `${BASE_URL}/${lang.language}/technical-ledgers/${ledger.slugId}`,
        lastModified: ledger._updatedAt
          ? new Date(ledger._updatedAt)
          : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Add root page redirect
  const rootPage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  return [...rootPage, ...staticPages, ...dynamicPages];
}
