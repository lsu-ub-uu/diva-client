import { describe, expect, it } from 'vitest';
import { generateSitemapXml } from '../sitemap';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import expectedSitemap from './expectedSitemap.xml?raw';

describe('generateSitemapXml', () => {
  it('generates correct sitemap xml', async () => {
    const sitemap = await generateSitemapXml('http://example.com', [
      {
        id: 'recordType1',
      } as BFFRecordType,
      {
        id: 'recordType2',
      } as BFFRecordType,
    ]);
    expect(sitemap).toBe(expectedSitemap);
  });

  it('generates correct sitemap xml when no record types', async () => {
    const sitemap = await generateSitemapXml('http://example.com', []);
    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
</urlset>`);
  });
});
