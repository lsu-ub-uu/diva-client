import { getNavigation } from '@/data/getNavigation.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { getDependencies } from 'server/dependencies/depencencies';
import { generateSitemapXml } from './generateSitemapXml.server';
import type { Route } from './+types/sitemap';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const dependencies = await getDependencies();
  const member = getMemberFromHostname(request, dependencies);
  const navigation = await getNavigation(
    dependencies,
    undefined,
    undefined,
    undefined,
  );

  const sitemap = generateSitemapXml(request.url, navigation, member);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
    },
  });
};
