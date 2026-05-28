import type {
  BFFMetadata,
  BFFMetadataChildReference,
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
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someTextVar',
          type: 'textVariable',
          textId: 'someTextId',
          nameInData: 'someName',
          regEx: '.+',
        } as BFFMetadataTextVariable,
      ]),
    } as Dependencies;

    const metadataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      textId: 'someTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    });
  });

  it('creates a number filter', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someNumVar',
          type: 'numberVariable',
          textId: 'someTextId',
          nameInData: 'someName',
        } as BFFMetadataNumberVariable,
      ]),
    } as Dependencies;

    const metadataRefs = [
      {
        childId: 'someNumVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someNumVar',
      type: 'number',
      name: 'someName',
      textId: 'someTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
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
        {
          id: 'someCollectionVar',
          type: 'collectionVariable',
          textId: 'someTextId',
          nameInData: 'someName',
          refCollection: 'someCollection',
        } as BFFMetadataCollectionVariable,
      ]),
    } as Dependencies;

    const metadataRefs = [
      {
        childId: 'someCollectionVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(metadataRefs, dependencies);
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
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    });
  });

  it('creates a repeating filter', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someTextVar',
          type: 'textVariable',
          textId: 'someTextId',
          nameInData: 'someName',
          regEx: '.+',
        } as BFFMetadataTextVariable,
      ]),
    } as Dependencies;

    const metadataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: 'X',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      textId: 'someTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: Number.MAX_VALUE,
      },
      regEx: '.+',
    });
  });

  it.each([
    [
      'subjectLinkedRecordIdSearchTerm',
      {
        recordType: 'diva-subject',
        searchType: 'diva-subjectMinimalSearch',
        searchTerm: 'search.include.includePart.topicSearchTerm[0].value',
        presentationPath: {
          sv: 'subject.authority_lang_swe.topic.value',
          en: 'subject.variant_lang_eng.topic.value',
        },
      },
    ],
    [
      'permissionUnitSearchTerm',
      {
        recordType: 'permissionUnit',
        searchType: 'permissionUnitSearch',
        searchTerm:
          'permissionUnitSearch.include.includePart.permissionUnitIdSearchTerm[0].value',
        presentationPath: {
          sv: 'permissionUnit.recordInfo.id.value',
          en: 'permissionUnit.recordInfo.id.value',
        },
      },
    ],
  ])(
    'creates an autocomplete filter for search term %s',
    (
      searchTermName,
      { recordType, searchType, searchTerm, presentationPath },
    ) => {
      const dependencies = {
        metadataPool: listToPool<BFFMetadata>([
          {
            id: 'someTextVar',
            type: 'textVariable',
            textId: 'someTextId',
            nameInData: searchTermName,
            regEx: '.+',
          } as BFFMetadataTextVariable,
        ]),
      } as Dependencies;

      const metadataRefs = [
        {
          childId: 'someTextVar',
          repeatMin: '0',
          repeatMax: '1',
        } as BFFMetadataChildReference,
      ];

      const filters = createFilters(metadataRefs, dependencies);
      expect(filters).toHaveLength(1);
      expect(filters[0]).toEqual({
        id: 'someTextVar',
        type: 'autocomplete',
        placeholderTextId: undefined,
        name: searchTermName,
        textId: 'someTextId',
        recordType,
        searchType,
        searchTerm,
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
        },
        presentationPath,
      });
    },
  );

  it('should hide visibilitySearchTerm', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'visibilityCollectionVar',
          type: 'collectionVariable',
          textId: 'someTextId',
          nameInData: 'visibilitySearchTerm',
          refCollection: 'visibilityCollection',
        } as BFFMetadataCollectionVariable,
        {
          id: 'visibilityCollection',
          nameInData: 'visibility',
          type: 'itemCollection',
          collectionItemReferences: [
            { refCollectionItemId: 'publishedItem' },
            { refCollectionItemId: 'unpublishedItem' },
          ],
        } as BFFMetadataItemCollection,
        {
          id: 'publishedItem',
          nameInData: 'published',
          type: 'collectionItem',
          textId: 'someCollectionItemTextId',
          defTextId: 'someCollectionItemDefTextId',
        },
        {
          id: 'unpublishedItem',
          nameInData: 'unpublished',
          type: 'collectionItem',
          textId: 'someCollectionItemTextId',
          defTextId: 'someCollectionItemDefTextId',
        },
      ]),
    } as Dependencies;

    const metadataRefs = [
      {
        childId: 'visibilityCollectionVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(metadataRefs, dependencies);
    expect(filters).toHaveLength(0);
  });
});
