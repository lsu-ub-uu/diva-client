import { describe, expect, it } from 'vitest';
import { generateSitemapXml } from '../sitemap';
import expectedSitemap from './expectedSitemap.xml?raw';

describe('generateSitemapXml', () => {
  it('generates correct sitemap xml', async () => {
    const sitemap = await generateSitemapXml('http://example.com', {
      mainNavigationItems: [
        {
          id: 'recordType1',
          link: '/recordType1',
          textId: 'recordType1PluralText',
        },
        {
          id: 'recordType2',
          link: '/recordType2',
          textId: 'recordType2PluralText',
        },
      ],
      otherNavigationItems: [],
    });
    expect(sitemap).toBe(expectedSitemap);
  });

  it('generates correct sitemap xml when no record types', async () => {
    const sitemap = await generateSitemapXml('http://example.com', {
      mainNavigationItems: [],
      otherNavigationItems: [],
    });
    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
</urlset>`);
  });
});
