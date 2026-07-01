import { describe, expect, it, vi } from 'vitest';
import { generateRobotsTxt } from '../robots.server';

describe('robots.txt', () => {
  it('should generate correct robots.txt content with basePath', () => {
    vi.stubEnv('BASE_PATH', '/base');
    const requestUrl = 'https://example.com/base/robots.txt';
    const expectedContent = `User-agent: *
Allow: /
Disallow: /base/metrics
Disallow: /login
Disallow: /Shibboleth.sso
Disallow: /idplogin
Disallow: /playwright
Disallow: /fitnesse

Sitemap: https://example.com/base/sitemap.xml`;

    const actualContent = generateRobotsTxt(requestUrl);
    expect(actualContent).toBe(expectedContent);
  });

  it('should generate correct robots.txt content with subDomain', () => {
    vi.stubEnv('BASE_PATH', '/base');
    const requestUrl = 'https://sub.example.com/base/robots.txt';
    const expectedContent = `User-agent: *
Allow: /
Disallow: /base/metrics
Disallow: /login
Disallow: /Shibboleth.sso
Disallow: /idplogin
Disallow: /playwright
Disallow: /fitnesse

Sitemap: https://sub.example.com/base/sitemap.xml`;

    const actualContent = generateRobotsTxt(requestUrl);
    expect(actualContent).toBe(expectedContent);
  });

  it('should generate correct robots.txt content without basePath', () => {
    const requestUrl = 'https://example.com/robots.txt';
    const expectedContent = `User-agent: *
Allow: /
Disallow: /metrics
Disallow: /login
Disallow: /Shibboleth.sso
Disallow: /idplogin
Disallow: /playwright
Disallow: /fitnesse

Sitemap: https://example.com/sitemap.xml`;

    const actualContent = generateRobotsTxt(requestUrl);
    expect(actualContent).toBe(expectedContent);
  });
});
