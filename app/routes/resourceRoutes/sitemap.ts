import type { BFFMember } from '@/cora/bffTypes.server';
import { getNavigation, type Navigation } from '@/data/getNavigation.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { getDependencies } from 'server/dependencies/depencencies';
import { getEntries } from 'server/sitemapCache';
import type { Route } from '../resourceRoutes/+types/sitemap';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const dependencies = await getDependencies();
  const member = getMemberFromHostname(request, dependencies);
  const navigation = await getNavigation(dependencies, undefined, undefined);
  const origin = new URL(request.url).origin;

  const sitemap = await generateSitemapXml(origin, navigation, member);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
    },
  });
};

export const generateSitemapXml = async (
  origin: string,
  navigation: Navigation,
  member: BFFMember | undefined,
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

  const recordEntries = getEntries(
    0,
    10000,
    member ? member.memberPermissionUnit : undefined,
  );

  recordEntries.forEach((entry) => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${origin}/diva-output/${entry.id}</loc>\n`;
    sitemap += `    <lastmod>${entry.tsUpdated}</lastmod>\n`;
    sitemap += `    <changefreq>yearly</changefreq>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += `</urlset>`;
  return sitemap;
};

//sök
