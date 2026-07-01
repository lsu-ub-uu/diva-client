import type { Route } from './+types/robots';
import robotsTxtTemplate from './robots.template.txt?raw';

export const loader = async ({ url }: Route.LoaderArgs) => {
  return new Response(generateRobotsTxt(url.href), {
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  });
};

export const generateRobotsTxt = (requestUrl: string): string => {
  const BASE_PATH = process.env.BASE_PATH ?? '';
  const sitemapURL = requestUrl.replace('robots.txt', 'sitemap.xml');

  return robotsTxtTemplate
    .replace(/\{BASE_PATH}/g, BASE_PATH)
    .replace(/\{SITEMAP_URL}/g, sitemapURL);
};
