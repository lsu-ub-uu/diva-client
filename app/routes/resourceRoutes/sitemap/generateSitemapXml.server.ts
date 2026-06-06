import type { BFFMember } from '@/cora/bffTypes.server';
import type { Navigation } from '@/data/getNavigation.server';
import { getEntries } from 'server/sitemapCache.server';

export const generateSitemapXml = (
  requestUrl: string,
  navigation: Navigation,
  member: BFFMember,
): string => {
  const baseUrl = requestUrl.replace(/\/sitemap\.xml$/, '');
  const recordTypeUrls = navigation.mainNavigationItems.map(
    (recordType) => `/${recordType.id}`,
  );
  const urls = [''].concat(recordTypeUrls);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((path) => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}${path}</loc>\n`;
    sitemap += `  </url>\n`;
  });

  const recordEntries = getEntries({
    permissionUnit: member.memberPermissionUnit,
  });

  recordEntries.forEach((entry) => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${baseUrl}/diva-output/${entry.id}</loc>\n`;
    sitemap += `    <lastmod>${entry.tsUpdated}</lastmod>\n`;
    sitemap += `    <changefreq>yearly</changefreq>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;
  return sitemap;
};
