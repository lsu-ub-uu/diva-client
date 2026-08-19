import { getNavigation } from '@/data/getNavigation.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { getDependencies } from 'server/dependencies/depencencies';
import { generateSitemapXml } from './generateSitemapXml.server';
import type { Route } from './+types/sitemap';
import { log } from '@/logging/logger.server';

export const loader = async ({ request, url }: Route.LoaderArgs) => {
  const dependencies = await getDependencies();

  log.info('request.url: ' + request.url);
  log.info('url.href: ' + url.href);
  log.info('url: ' + url);

  const member = getMemberFromHostname(request, dependencies);
  const navigation = await getNavigation(
    dependencies,
    undefined,
    undefined,
    undefined,
  );

  const sitemap = generateSitemapXml(url.href, navigation, member);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml;charset=UTF-8',
    },
  });
};
