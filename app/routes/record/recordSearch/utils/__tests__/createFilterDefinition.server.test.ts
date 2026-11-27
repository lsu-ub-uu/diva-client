import type {
  BFFGuiElement,
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationCollVar,
  BFFPresentationGroup,
  BFFPresentationNumVar,
  BFFPresentationSurroundingContainer,
  BFFPresentationTextVar,
  Dependencies
} from '@/cora/bffTypes.server';
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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'someTextPVar',
          type: 'pVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someTextVar'

        } as BFFPresentationTextVar
      ])
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'someTextPVar' }] } as BFFPresentationChildReference
    ]

    const filterMedataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, filterMedataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      labelTextId: 'someTextId',
      placeholderTextId: 'somePlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    });
  });

  it('creates a text filter with hidden label', () => {
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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'someTextPVar',
          type: 'pVar',
          presentationOf: 'someTextVar'

        } as BFFPresentationTextVar
      ])
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'someTextPVar' }] } as BFFPresentationChildReference
    ]

    const filterMedataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, filterMedataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      labelTextId: 'someTextId',
      placeholderTextId: undefined,
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
      regEx: '.+',
    });
  });

  it.todo('creates a text filter with specified label from presentation')

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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePNumVar',
          type: 'pNumVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someNumVar'
        } as BFFPresentationNumVar
      ]),
    } as Dependencies;


    const filterPresentationRefs = [
      { refGroups: [{ childId: 'somePNumVar' }] } as BFFPresentationChildReference
    ]

    const metadataRefs = [
      {
        childId: 'someNumVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someNumVar',
      type: 'number',
      name: 'someName',
      labelTextId: "someTextId",
      placeholderTextId: "somePlaceholderTextId",
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    });
  });

  it('creates a number filter with hidden label', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someNumVar',
          type: 'numberVariable',
          textId: 'someTextId',
          nameInData: 'someName',
        } as BFFMetadataNumberVariable,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePNumVar',
          type: 'pNumVar',
          presentationOf: 'someNumVar'
        } as BFFPresentationNumVar
      ]),
    } as Dependencies;


    const filterPresentationRefs = [
      { refGroups: [{ childId: 'somePNumVar' }] } as BFFPresentationChildReference
    ]

    const metadataRefs = [
      {
        childId: 'someNumVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someNumVar',
      type: 'number',
      name: 'someName',
      labelTextId: "someTextId",
      placeholderTextId: undefined,
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    });
  })

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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePCollVar',
          type: 'pCollVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someCollectionVar'
        } as BFFPresentationCollVar
      ]),
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'somePCollVar' }] } as BFFPresentationChildReference
    ]

    const metadataRefs = [
      {
        childId: 'someCollectionVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someCollectionVar',
      type: 'collection',
      name: 'someName',
      options: [
        {
          text: '--',
          value: '',
        },
        {
          text: 'someCollectionItemTextId',
          value: 'someItem',
        },
      ],
      labelTextId: "someTextId",
      placeholderTextId: 'somePlaceholderTextId',

      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    });
  });

  it('creates a collection filter with hidden label', () => {
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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePCollVar',
          type: 'pCollVar',
          presentationOf: 'someCollectionVar'
        } as BFFPresentationCollVar
      ]),
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'somePCollVar' }] } as BFFPresentationChildReference
    ]

    const metadataRefs = [
      {
        childId: 'someCollectionVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someCollectionVar',
      type: 'collection',
      name: 'someName',
      options: [
        {
          text: '--',
          value: '',
        },
        {
          text: 'someCollectionItemTextId',
          value: 'someItem',
        },
      ],
      labelTextId: 'someTextId',
      placeholderTextId: undefined,

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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePTextVar',
          type: 'pVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someTextVar'
        } as BFFPresentationTextVar
      ])
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'somePTextVar' }] } as BFFPresentationChildReference
    ]


    const metadataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: 'X',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, metadataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      labelTextId: "someTextId",
      name: "someName",
      placeholderTextId: "somePlaceholderTextId",
      repeat: {
        repeatMin: 0,
        repeatMax: Number.MAX_VALUE,
      },
      regEx: '.+',
    });
  });

  it('returns no filter when metadata but no presentation', () => {
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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'someTextPVar',
          type: 'pVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someTextVar'

        } as BFFPresentationTextVar,
        {
          id: 'someOtherTextPVar',
          type: 'pVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someOtherTextVar'

        } as BFFPresentationTextVar
      ])
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'someOtherTextPVar' }] } as BFFPresentationChildReference
    ]

    const filterMedataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, filterMedataRefs, dependencies);
    expect(filters).toHaveLength(0);
    expect(filters[0]).toEqual(undefined);
  });


  it('ignores presentations that are not input fields', () => {
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
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'someTextPVar',
          type: 'pVar',
          emptyTextId: 'somePlaceholderTextId',
          presentationOf: 'someTextVar'

        } as BFFPresentationTextVar,
        {
          id: 'somePGroup',
          type: 'pGroup',
          presentationOf: 'someTextVar',
          mode: 'input',
          children: [],
        } as BFFPresentationGroup,
        {
          id: 'someGuiElement',
          type: 'guiElementLink',
          url: 'someUrl',
          elementText: 'someText',
          presentAs: 'link',
        } as BFFGuiElement,
        {
          id: 'someContainer',
          type: 'container',
          mode: 'input',
          repeat: 'children',
          children: [],
          presentationsOf: ['someTextVar'],
        } as BFFPresentationSurroundingContainer,
      ])
    } as Dependencies;

    const filterPresentationRefs = [
      { refGroups: [{ childId: 'someGuiElement' }] } as BFFPresentationChildReference,
      { refGroups: [{ childId: 'someContainer' }] } as BFFPresentationChildReference,
      { refGroups: [{ childId: 'someTextPVar' }] } as BFFPresentationChildReference,
      { refGroups: [{ childId: 'somePGroup' }] } as BFFPresentationChildReference,
    ]

    const filterMedataRefs = [
      {
        childId: 'someTextVar',
        repeatMin: '0',
        repeatMax: '1',
      } as BFFMetadataChildReference,
    ];

    const filters = createFilters(filterPresentationRefs, filterMedataRefs, dependencies);
    expect(filters).toHaveLength(1);
    expect(filters[0]).toEqual({
      id: 'someTextVar',
      type: 'text',
      name: 'someName',
      labelTextId: 'someTextId',
      placeholderTextId: 'somePlaceholderTextId',
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
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
        searchTerm: 'search.include.includePart.topicSearchTerm.0.value',
      },
    ],
  ])(
    'creates an autocomplete filter for search term %s',
    (searchTermName, { recordType, searchType, searchTerm }) => {
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
        presentationPool: listToPool<BFFPresentation>([
          {
            id: 'someTextPVar',
            type: 'pVar',
            emptyTextId: 'somePlaceholderTextId',
            presentationOf: 'someTextVar'

          } as BFFPresentationTextVar
        ])
      } as Dependencies;

      const filterPresentationRefs = [
        { refGroups: [{ childId: 'someTextPVar' }] } as BFFPresentationChildReference
      ]


      const metadataRefs = [
        {
          childId: 'someTextVar',
          repeatMin: '0',
          repeatMax: '1',
        } as BFFMetadataChildReference,
      ];

      const filters = createFilters(filterPresentationRefs, metadataRefs, dependencies);
      expect(filters).toHaveLength(1);
      expect(filters[0]).toEqual({
        id: 'someTextVar',
        type: 'autocomplete',
        labelTextId: "someTextId",
        placeholderTextId: "somePlaceholderTextId",
        name: searchTermName,
        recordType,
        searchType,
        searchTerm,
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
        },
      });
    },
  );
});
