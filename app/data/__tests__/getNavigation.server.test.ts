import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { BFFDataRecord, BFFSearchResult } from '@/types/record';
import { describe, expect, it, vi } from 'vitest';
import { getNavigation } from '../getNavigation.server';
import { searchRecords } from '@/data/searchRecords.server';
import type { Auth } from '@/auth/Auth';
import type { ActionLink } from '@/cora/cora-data/types.server';

vi.mock('@/data/searchRecords.server');

describe('getNavigation', () => {
  it('makes correct search query', async () => {
    vi.mocked(searchRecords).mockResolvedValue({
      data: [] as BFFDataRecord<BFFRecordType>[],
    } as BFFSearchResult<BFFRecordType>);

    const mockDependencies = {} as Dependencies;
    const mockAuth = {} as Auth;
    await getNavigation(mockDependencies, mockAuth);

    expect(searchRecords).toHaveBeenCalledWith(
      mockDependencies,
      'recordTypeSearch',
      {
        recordTypeSearch: {
          include: {
            includePart: {
              recordTypeCategorySearchTerm: 'clientMainNavigation',
            },
          },
        },
      },
      mockAuth,
    );
  });

  it('returns main and other navigation items', async () => {
    vi.mocked(searchRecords).mockResolvedValue({
      data: [
        createMockRecordType('someMainRecordType', true),
        createMockRecordType('someOtherMainRecordType', true),
        createMockRecordType('someRecordType'),
        createMockRecordType('someOtherRecordType'),
      ],
    } as BFFSearchResult<BFFRecordType>);

    const mockDependencies = {} as Dependencies;

    const navigation = await getNavigation(mockDependencies);

    expect(navigation.mainNavigationItems).toEqual([
      { link: '/someMainRecordType', textId: 'someMainRecordTypeText' },
      {
        link: '/someOtherMainRecordType',
        textId: 'someOtherMainRecordTypeText',
      },
    ]);

    expect(navigation.otherNavigationItems).toEqual([
      { link: '/someRecordType', textId: 'someRecordTypeText' },
      { link: '/someOtherRecordType', textId: 'someOtherRecordTypeText' },
    ]);
  });

  it('sorts record types', async () => {
    vi.mocked(searchRecords).mockResolvedValue({
      data: [
        createMockRecordType('diva-funder'),
        createMockRecordType('diva-series'),
        createMockRecordType('diva-journal'),
        createMockRecordType('diva-output', true),
        createMockRecordType('diva-person', true),
        createMockRecordType('diva-localLabel'),
        createMockRecordType('diva-programme'),
        createMockRecordType('diva-publisher'),
        createMockRecordType('someUnhandledRecordType'),
        createMockRecordType('diva-organisation'),
        createMockRecordType('diva-course'),
        createMockRecordType('diva-project', true),
        createMockRecordType('diva-subject'),
      ],
    } as BFFSearchResult<BFFRecordType>);

    const mockDependencies = {} as Dependencies;

    const navigation = await getNavigation(mockDependencies);

    expect(navigation.mainNavigationItems.map((item) => item.link)).toEqual([
      '/diva-output',
      '/diva-person',
      '/diva-project',
    ]);

    expect(navigation.otherNavigationItems.map((item) => item.link)).toEqual([
      '/diva-course',
      '/diva-organisation',
      '/diva-journal',
      '/diva-subject',
      '/diva-programme',
      '/diva-series',
      '/diva-localLabel',
      '/diva-publisher',
      '/diva-funder',
      '/someUnhandledRecordType',
    ]);
  });

  it('only returns record types that the user may search for', async () => {
    vi.mocked(searchRecords).mockResolvedValue({
      data: [
        createMockRecordType('someMainRecordType', true),
        createMockRecordType('someOtherMainRecordType', true, false),
        createMockRecordType('someRecordType'),
        createMockRecordType('someOtherRecordType', false, false),
      ],
    } as BFFSearchResult<BFFRecordType>);

    const mockDependencies = {} as Dependencies;

    const navigation = await getNavigation(mockDependencies);

    expect(navigation.mainNavigationItems).toEqual([
      { link: '/someMainRecordType', textId: 'someMainRecordTypeText' },
    ]);

    expect(navigation.otherNavigationItems).toEqual([
      { link: '/someRecordType', textId: 'someRecordTypeText' },
    ]);
  });

  it('includes member settings item');

  it('includes dev items when dev cookie');
});

const createMockRecordType = (
  name: string,
  mainNavigation: boolean = false,
  searchAllowed = true,
) =>
  ({
    data: {
      id: `${name}`,
      textId: `${name}Text`,
      recordTypeCategory: mainNavigation
        ? ['clientNavigation', 'clientMainNavigation']
        : ['clientNavigation'],
    },
    actionLinks: searchAllowed ? { search: {} as ActionLink } : {},
  }) as BFFDataRecord<BFFRecordType>;
