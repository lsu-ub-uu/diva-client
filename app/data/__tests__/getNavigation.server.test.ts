import type { Auth } from '@/auth/Auth';
import type {
  ActionLink,
  CoraRecord,
  DataGroup,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { BFFMember, BFFRecordType } from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import type { AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { getNavigation } from '../getNavigation.server';

vi.mock('@/cora/getRecordDataById.server');

describe('getNavigation', () => {
  it('returns main navigation items when not authenticated', async () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        createMockRecordType({
          id: 'someMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({
          id: 'someOtherMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({ id: 'someRecordType' }),
        createMockRecordType({ id: 'someOtherRecordType' }),
        createMockRecordType({
          id: 'someNonNavigableRecordType',
          clientNavigation: false,
        }),
      ]),
    } as Dependencies;

    const navigation = await getNavigation(
      mockDependencies,
      undefined,
      undefined,
    );

    expect(navigation.mainNavigationItems).toEqual([
      {
        id: 'someMainRecordType',
        link: '/someMainRecordType',
        textId: 'someMainRecordTypePluralText',
      },
      {
        id: 'someOtherMainRecordType',
        link: '/someOtherMainRecordType',
        textId: 'someOtherMainRecordTypePluralText',
      },
    ]);

    expect(navigation.otherNavigationItems).toEqual([]);
  });

  it('returns main navigation and other navigation items when authenticated', async () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        createMockRecordType({
          id: 'someMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({
          id: 'someOtherMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({ id: 'someRecordType' }),
        createMockRecordType({ id: 'someOtherRecordType' }),
        createMockRecordType({
          id: 'someNonNavigableRecordType',
          clientNavigation: false,
        }),
      ]),
    } as Dependencies;

    const mockAuth = {
      data: { token: '1234 ' },
    } as Auth;

    const navigation = await getNavigation(
      mockDependencies,
      undefined,
      mockAuth,
    );

    expect(navigation.mainNavigationItems).toEqual([
      {
        id: 'someMainRecordType',
        link: '/someMainRecordType',
        textId: 'someMainRecordTypePluralText',
      },
      {
        id: 'someOtherMainRecordType',
        link: '/someOtherMainRecordType',
        textId: 'someOtherMainRecordTypePluralText',
      },
    ]);

    expect(navigation.otherNavigationItems).toEqual([
      {
        id: 'someRecordType',
        link: '/someRecordType',
        textId: 'someRecordTypePluralText',
      },
      {
        id: 'someOtherRecordType',
        link: '/someOtherRecordType',
        textId: 'someOtherRecordTypePluralText',
      },
    ]);
  });

  it('sorts record types', async () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        createMockRecordType({ id: 'diva-funder' }),
        createMockRecordType({ id: 'diva-series' }),
        createMockRecordType({ id: 'diva-journal' }),
        createMockRecordType({ id: 'diva-output', publicationType: true }),
        createMockRecordType({ id: 'diva-person', publicationType: true }),
        createMockRecordType({ id: 'diva-localLabel' }),
        createMockRecordType({ id: 'diva-programme' }),
        createMockRecordType({ id: 'diva-publisher' }),
        createMockRecordType({ id: 'someUnhandledRecordType' }),
        createMockRecordType({ id: 'diva-organisation' }),
        createMockRecordType({ id: 'diva-course' }),
        createMockRecordType({ id: 'diva-project', publicationType: true }),
        createMockRecordType({ id: 'diva-subject' }),
        createMockRecordType({ id: 'metadata', clientNavigation: false }),
      ]),
    } as Dependencies;

    const mockAuth = {
      data: { token: '1234 ' },
    } as Auth;

    const navigation = await getNavigation(
      mockDependencies,
      undefined,
      mockAuth,
    );

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

  it('includes member settings item when user has update permission', async () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        createMockRecordType({
          id: 'someMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({
          id: 'someOtherMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({ id: 'someRecordType' }),
        createMockRecordType({ id: 'someOtherRecordType' }),
        createMockRecordType({
          id: 'someNonNavigableRecordType',
          clientNavigation: false,
        }),
      ]),
    } as Dependencies;

    const mockAuth = {
      data: { token: '1234' },
    } as Auth;

    const mockMember = { id: 'someMemberId' } as BFFMember;

    vi.mocked(getRecordDataById).mockResolvedValue({
      data: {
        record: {
          data: {} as DataGroup,
          actionLinks: { update: { url: 'someurl' } as ActionLink },
        } as CoraRecord,
      } as RecordWrapper,
    } as AxiosResponse<RecordWrapper>);

    const navigation = await getNavigation(
      mockDependencies,
      mockMember,
      mockAuth,
    );

    expect(getRecordDataById).toHaveBeenCalledWith(
      'diva-member',
      'someMemberId',
      '1234',
    );

    expect(navigation.otherNavigationItems).toContainEqual({
      id: 'diva-member',
      link: '/diva-member/someMemberId/update',
      textId: 'divaClient_memberSettingsText',
    });
  });

  it('does not include member settings item when user lacks update permission', async () => {
    const mockDependencies = {
      recordTypePool: listToPool<BFFRecordType>([
        createMockRecordType({
          id: 'someMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({
          id: 'someOtherMainRecordType',
          publicationType: true,
        }),
        createMockRecordType({ id: 'someRecordType' }),
        createMockRecordType({ id: 'someOtherRecordType' }),
        createMockRecordType({
          id: 'someNonNavigableRecordType',
          clientNavigation: false,
        }),
      ]),
    } as Dependencies;

    const mockAuth = {
      data: { token: '1234' },
    } as Auth;

    const mockMember = { id: 'someMemberId' } as BFFMember;

    vi.mocked(getRecordDataById).mockResolvedValue({
      data: {
        record: {
          data: {} as DataGroup,
          actionLinks: { read: { url: 'someurl' } as ActionLink },
        } as CoraRecord,
      } as RecordWrapper,
    } as AxiosResponse<RecordWrapper>);

    const navigation = await getNavigation(
      mockDependencies,
      mockMember,
      mockAuth,
    );

    expect(getRecordDataById).toHaveBeenCalledWith(
      'diva-member',
      'someMemberId',
      '1234',
    );

    expect(navigation.otherNavigationItems).not.toContainEqual({
      id: 'diva-member',
      link: '/diva-member/someMemberId/update',
      textId: 'divaClient_memberSettingsText',
    });
  });
});

const createMockRecordType = ({
  id,
  clientNavigation = true,
  publicationType: resourceType = false,
}: {
  id: string;
  clientNavigation?: boolean;
  publicationType?: boolean;
}) =>
  ({
    id: `${id}`,
    textId: `${id}Text`,
    pluralTextId: `${id}PluralText`,
    recordTypeCategory: clientNavigation ? ['clientNavigation'] : [],
    groupOfRecordType: resourceType ? ['publicationType'] : ['controlledLists'],
  }) as BFFRecordType;
