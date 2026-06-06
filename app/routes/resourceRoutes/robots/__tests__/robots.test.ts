import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generateRobotsTxt } from '../robots';

describe('robots.txt', () => {
  beforeEach(() => {
    vi.stubEnv('BASE_PATH', '/base');
  });

  it('should generate correct robots.txt content with basePath', () => {
    const requestUrl = 'https://example.com/base/robots.txt';
    const expectedContent = `User-agent: *
Allow: /base
Disallow: /

Sitemap: https://example.com/base/sitemap.xml`;

    const actualContent = generateRobotsTxt(requestUrl);
    expect(actualContent).toBe(expectedContent);
  });

  it('should generate correct robots.txt content with subDomain', () => {
    const requestUrl = 'https://sub.example.com/base/robots.txt';
    const expectedContent = `User-agent: *
Allow: /base
Disallow: /

Sitemap: https://sub.example.com/base/sitemap.xml`;

    const actualContent = generateRobotsTxt(requestUrl);
    expect(actualContent).toBe(expectedContent);
  });
});
