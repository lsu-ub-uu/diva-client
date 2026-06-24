import type {
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFSearch,
  Dependencies,
} from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { describe, expect, it } from 'vitest';
import {
  createSearchFormDefinition,
  type SearchFormDefinition,
} from '../createSearchFormDefinition.server';

describe('createSearchFormDefinition', () => {
  it('creates a search form definition', () => {
    const mockDependencies = {
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

    const search = {
      id: 'testSearch',
      metadataId: 'testSearchGroup',
    } as BFFSearch;

    const definition = createSearchFormDefinition(search, mockDependencies);

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
