import { getNavigation, type Navigation } from '@/data/getNavigation.server';
import type { Route } from '../resourceRoutes/+types/sitemap';
import { getDependencies } from 'server/dependencies/depencencies';
import type {
  BFFDataRecord,
  BFFDataRecordData,
  BFFSearchResult,
} from '@/types/record';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const dependencies = await getDependencies();
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

//sök
