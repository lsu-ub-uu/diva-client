import { sessionContext } from '@/auth/sessionMiddleware.server';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import { getNavigation } from '@/data/getNavigation';
import { dependenciesContext } from 'server/depencencies';
import type { Route } from '../resourceRoutes/+types/sitemap';

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);

  const recordTypes = await getNavigation(dependencies, auth);
  const origin = new URL(request.url).origin;

  const sitemap = await generateSitemapXml(origin, recordTypes);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
    },
  });
};

export const generateSitemapXml = async (
  origin: string,
  recordTypes: BFFRecordType[],
): Promise<string> => {
  const recordTypeUrls = recordTypes.map((recordType) => `/${recordType.id}`);
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
