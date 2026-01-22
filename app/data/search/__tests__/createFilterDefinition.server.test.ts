import type {
  BFFMetadata,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import { describe, expect, it } from 'vitest';
import { createFilters } from '../createFilterDefinition.server';

describe('createFilters', () => {
  it('creates a text filter', () => {
    const searchMetadata = {
      children: [{ childId: 'includeGroupId' }],
    } as BFFMetadataGroup;

    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'includeGroupId',
          children: [{ childId: 'includePartGroupId' }],
        } as BFFMetadataGroup,
        {
          id: 'includePartGroupId',
          children: [
            { childId: 'genericSearchTermId' },
            { childId: 'someTextVar' },
          ],
        } as BFFMetadataGroup,
        {
          id: 'genericSearchTermId',
          type: 'textVariable',
          nameInData: 'genericSearchTerm',
          regEx: '.+',
        } as BFFMetadataTextVariable,
        {
          id: 'someTextVar',
          type: 'textVariable',
          textId: 'someTextId',

          nameInData: 'someName',
          regEx: '.+',
        } as BFFMetadataTextVariable,
      ]),
    } as Dependencies;
    const filters = createFilters(searchMetadata, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      textId: 'someTextId',
    });
  });

  it('creates a number filter', () => {
    const searchMetadata = {
      children: [{ childId: 'includeGroupId' }],
    } as BFFMetadataGroup;

    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'includeGroupId',
          children: [{ childId: 'includePartGroupId' }],
        } as BFFMetadataGroup,
        {
          id: 'includePartGroupId',
          children: [
            { childId: 'genericSearchTermId' },
            { childId: 'someTextVar' },
          ],
        } as BFFMetadataGroup,
        {
          id: 'genericSearchTermId',
          type: 'textVariable',
          nameInData: 'genericSearchTerm',
          regEx: '.+',
        } as BFFMetadataTextVariable,
        {
          id: 'someTextVar',
          type: 'numberVariable',
          textId: 'someTextId',
          nameInData: 'someName',
        } as BFFMetadataNumberVariable,
      ]),
    } as Dependencies;
    const filters = createFilters(searchMetadata, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'number',
      name: 'someName',
      textId: 'someTextId',
    });
  });

  it('creates a collection filter', () => {
    const searchMetadata = {
      children: [{ childId: 'includeGroupId' }],
    } as BFFMetadataGroup;

    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'includeGroupId',
          children: [{ childId: 'includePartGroupId' }],
        } as BFFMetadataGroup,
        {
          id: 'includePartGroupId',
          children: [
            { childId: 'genericSearchTermId' },
            { childId: 'someCollectionVar' },
          ],
        } as BFFMetadataGroup,
        {
          id: 'genericSearchTermId',
          type: 'textVariable',
          nameInData: 'genericSearchTerm',
          regEx: '.+',
        } as BFFMetadataTextVariable,
        {
          id: 'someCollectionVar',
          type: 'collectionVariable',
          textId: 'someTextId',
          nameInData: 'someName',
          refCollection: 'someCollection',
        } as BFFMetadataCollectionVariable,
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
    const filters = createFilters(searchMetadata, dependencies);
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
