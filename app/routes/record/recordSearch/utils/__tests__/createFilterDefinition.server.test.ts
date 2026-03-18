import type {
  BFFMetadata,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
} from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { describe, expect, it } from 'vitest';
import { createFilters } from '../createFilterDefinition.server';

describe('createFilters', () => {
  it('creates a text filter', () => {
    const dependencies = {} as Dependencies;

    const metadatas = [
      {
        id: 'someTextVar',
        type: 'textVariable',
        textId: 'someTextId',

        nameInData: 'someName',
        regEx: '.+',
      } as BFFMetadataTextVariable,
    ];
    const filters = createFilters(metadatas, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      textId: 'someTextId',
    });
  });

  it('creates a number filter', () => {
    const dependencies = {} as Dependencies;
    const metadatas = [
      {
        id: 'someTextVar',
        type: 'numberVariable',
        textId: 'someTextId',
        nameInData: 'someName',
      } as BFFMetadataNumberVariable,
    ];
    const filters = createFilters(metadatas, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'number',
      name: 'someName',
      textId: 'someTextId',
    });
  });

  it('creates a collection filter', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someCollection',
          nameInData: 'someCollection',
          type: 'itemCollection',
          collectionItemReferences: [{ refCollectionItemId: 'someItemId' }],
        } as BFFMetadataItemCollection,
        {
          id: 'someItemId',
          nameInData: 'someItem',
          type: 'collectionItem',
          textId: 'someCollectionItemTextId',
          defTextId: 'someCollectionItemDefTextId',
        },
      ]),
    } as Dependencies;
    const metadatas = [
      {
        id: 'someCollectionVar',
        type: 'collectionVariable',
        textId: 'someTextId',
        nameInData: 'someName',
        refCollection: 'someCollection',
      } as BFFMetadataCollectionVariable,
    ];
    const filters = createFilters(metadatas, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someCollectionVar',
      type: 'collection',
      name: 'someName',
      textId: 'someTextId',
      options: [
        {
          text: 'someCollectionItemTextId',
          value: 'someItem',
        },
      ],
    });
  });
});
