import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getEntries,
  type GetEntriesParams,
  type SitemapEntry,
} from 'server/sitemapCache.server';
import type { BFFMember } from '@/cora/bffTypes.server';
import type { Navigation } from '@/data/getNavigation.server';
import { generateSitemapXml } from '../generateSitemapXml.server';

vi.mock('@/cora/getSearchResultDataListBySearchType.server');
vi.mock('server/sitemapCache.server');

describe('generateSitemapXml', () => {
  beforeEach(() => {
    vi.mocked(getEntries).mockImplementation(mockedGetEntries);
  });

  it('generates sitemap from navigation xml', () => {
    const mockNavigation: Navigation = {
      mainNavigationItems: [
        {
          id: 'recordType1',
          link: '/recordType1',
          textId: 'recordType1PluralText',
        },
        {
          id: 'recordType2',
          link: '/recordType2',
          textId: 'recordType2PluralText',
        },
      ],
      otherNavigationItems: [],
    };

    const mockMember = {
      id: 'member1',
      memberPermissionUnit: 'somePermissionUnitWithoutRecords',
    } as BFFMember;

    const sitemap = generateSitemapXml(
      'http://example.com',
      mockNavigation,
      mockMember,
    );

    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
  <url>
    <loc>http://example.com/recordType1</loc>
  </url>
  <url>
    <loc>http://example.com/recordType2</loc>
  </url>
</urlset>`);
  });

  it('generates correct sitemap xml when no record types', () => {
    const mockNavigation: Navigation = {
      mainNavigationItems: [],
      otherNavigationItems: [],
    };

    const mockMember = {
      id: 'member1',
      memberPermissionUnit: 'somePermissionUnitWithoutRecords',
    } as BFFMember;

    const sitemap = generateSitemapXml(
      'http://example.com',
      mockNavigation,
      mockMember,
    );

    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
</urlset>`);
  });

  it('generates sitemap entries from member records when member has memberPermission unit', () => {
    const mockNavigation: Navigation = {
      mainNavigationItems: [],
      otherNavigationItems: [],
    };

    const mockMember = {
      id: 'member1',
      memberPermissionUnit: 'somePermissionUnitWithRecords',
    } as BFFMember;

    const sitemap = generateSitemapXml(
      'http://example.com',
      mockNavigation,
      mockMember,
    );

    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
  <url>
    <loc>http://example.com/diva-output/1</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>http://example.com/diva-output/2</loc>
    <lastmod>2024-01-02</lastmod>
    <changefreq>yearly</changefreq>
  </url>
</urlset>`);
  });

  it('generates sitemap entries from all records when member has no memberPermission unit', () => {
    const mockNavigation: Navigation = {
      mainNavigationItems: [],
      otherNavigationItems: [],
    };

    const mockMember = {
      id: 'portalMember',
      memberPermissionUnit: undefined,
    } as BFFMember;

    const sitemap = generateSitemapXml(
      'http://example.com',
      mockNavigation,
      mockMember,
    );

    expect(sitemap).toBe(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://example.com</loc>
  </url>
  <url>
    <loc>http://example.com/diva-output/1</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>http://example.com/diva-output/2</loc>
    <lastmod>2024-01-02</lastmod>
    <changefreq>yearly</changefreq>
  </url>
  <url>
    <loc>http://example.com/diva-output/3</loc>
    <lastmod>2024-01-03</lastmod>
    <changefreq>yearly</changefreq>
  </url>
</urlset>`);
  });
});

const mockedGetEntries = ({
  permissionUnit,
}: GetEntriesParams = {}): SitemapEntry[] => {
  if (permissionUnit === 'somePermissionUnitWithRecords') {
    return [
      {
        id: '1',
        tsUpdated: '2024-01-01',
        permissionUnit: 'somePermissionUnitWithRecords',
      },
      {
        id: '2',
        tsUpdated: '2024-01-02',
        permissionUnit: 'somePermissionUnitWithRecords',
      },
    ];
  }

  if (permissionUnit === 'somePermissionUnitWithoutRecords') {
    return [];
  }

  if (permissionUnit === undefined) {
    return [
      {
        id: '1',
        tsUpdated: '2024-01-01',
        permissionUnit: 'somePermissionUnitWithRecords',
      },
      {
        id: '2',
        tsUpdated: '2024-01-02',
        permissionUnit: 'somePermissionUnitWithRecords',
      },
      {
        id: '3',
        tsUpdated: '2024-01-03',
        permissionUnit: 'anotherPermissionUnit',
      },
    ];
  }
  return [];
};
