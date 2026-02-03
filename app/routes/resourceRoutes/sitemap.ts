import { getNavigation, type Navigation } from '@/data/getNavigation.server';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from '../resourceRoutes/+types/sitemap';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { dependencies } = context.get(dependenciesContext);

  const navigation = await getNavigation(dependencies, undefined, undefined);
  const origin = new URL(request.url).origin;

  const sitemap = await generateSitemapXml(origin, navigation);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
    },
  });
};

export const generateSitemapXml = async (
  origin: string,
  navigation: Navigation,
): Promise<string> => {
  const recordTypeUrls = navigation.mainNavigationItems.map(
    (recordType) => `/${recordType.id}`,
  );
  const urls = [''].concat(recordTypeUrls);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach((path) => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${origin}${path}</loc>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};
