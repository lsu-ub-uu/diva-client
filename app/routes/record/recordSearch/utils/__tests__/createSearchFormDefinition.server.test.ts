import { describe, expect, it } from 'vitest';
import {
  createSearchFormDefinition,
  type SearchFormDefinition,
} from '../createSearchFormDefinition.server';
import type {
  BFFMetadata,
  BFFSearch,
  BFFMetadataTextVariable,
  Dependencies,
  BFFMetadataGroup,
} from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import type { Lookup } from 'server/dependencies/util/lookup';

describe('createSearchFormDefinition', () => {
  it('creates a search form definition', () => {
    const mockDependencies = {
      searchPool: listToPool([
        {
          id: 'testSearch',
          metadataId: 'testSearchGroup',
        },
      ]) as Lookup<string, BFFSearch>,
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'testSearchGroup',
          type: 'group',
          nameInData: 'testSearch',
          children: [
            {
              childId: 'testSearchIncludeGroup',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'testSearchIncludeGroup',
          type: 'group',
          nameInData: 'include',
          children: [
            {
              childId: 'testSearchIncludePartGroup',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'testSearchIncludePartGroup',
          type: 'group',
          nameInData: 'includePart',
          children: [
            {
              childId: 'mainSearchVar',
              repeatMin: '0',
              repeatMax: '1',
            },
            {
              childId: 'anotherSearchVar',
              repeatMin: '0',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'mainSearchVar',
          type: 'textVariable',
          textId: 'someTextId',
          defTextId: 'someTextId1',
          nameInData: 'mainSearchVar',
          regEx: '.+',
        } as BFFMetadataTextVariable,
        {
          id: 'anotherSearchVar',
          type: 'textVariable',
          textId: 'someTextId',
          defTextId: 'someTextId2',
          nameInData: 'anotherSearchVar',
          regEx: '.+',
        } as BFFMetadataTextVariable,
      ]),
    } as Dependencies;

    const definition = createSearchFormDefinition(
      'testSearch',
      mockDependencies,
    );

    expect(definition).toEqual({
      searchRootName: 'testSearch',
      mainSearchTerm: {
        id: 'mainSearchVar',
        type: 'textVariable',
        textId: 'someTextId',
        defTextId: 'someTextId1',
        nameInData: 'mainSearchVar',
        regEx: '.+',
      },
      filters: [
        {
          type: 'text',
          id: 'anotherSearchVar',
          name: 'anotherSearchVar',
          textId: 'someTextId',
          placeholderTextId: 'someTextId2',
          repeat: {
            repeatMin: 0,
            repeatMax: 1,
          },
          regEx: '.+',
        },
      ],
    } satisfies SearchFormDefinition);
  });
});
