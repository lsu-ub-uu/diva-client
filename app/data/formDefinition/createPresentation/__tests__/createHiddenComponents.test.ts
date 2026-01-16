import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationGroup,
  BFFPresentationTextVar,
} from '@/cora/transform/bffTypes.server';
import { listToPool } from '@/utils/structs/listToPool';
import { describe, expect, it } from 'vitest';
import type { Dependencies } from '../../formDefinitionsDep.server';
import { createHiddenComponents } from '../createHiddenComponents.server';

describe('createHiddenComponents', () => {
  it('does not create hidden component for final value variable that has a presentation', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          type: 'textVariable',
        } as BFFMetadataTextVariable,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someChildId',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      { childId: 'someChildId' },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [
      {
        refGroups: [
          {
            type: 'presentation',
            childId: 'somePresentationChildId',
          },
        ],
      },
    ] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([]);
  });

  it('does create hidden component for final value variable that does not have a presentation', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          attributeReferences: [{ refCollectionVarId: 'someCollectionVarId' }],
          type: 'textVariable',
        } as BFFMetadataTextVariable,
        {
          id: 'someCollectionVarId',
          nameInData: 'someCollectionNameInData',
          type: 'collectionVariable',
          finalValue: 'someCollectionFinalValue',
          refCollection: 'someCollection',
        } as BFFMetadataCollectionVariable,
        {
          id: 'someCollection',
          nameInData: 'someCollectionNameInData',
          collectionItemReferences: [
            { refCollectionItemId: 'someCollectionItemId' },
          ],
          type: 'itemCollection',
        } as BFFMetadataItemCollection,
        {
          id: 'someCollectionItemId',
          nameInData: 'someCollectionItem',
          type: 'collectionItem',
        } as BFFMetadataBase,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someOtherChildId',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      { childId: 'someChildId', repeatMin: '1', repeatMax: '1' },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([
      {
        attributesToShow: 'none',
        finalValue: 'someFinalValue',
        name: 'someNameInData',
        type: 'hidden',
        repeat: { repeatMin: 1, repeatMax: 1 },
        attributes: [
          {
            attributesToShow: undefined,
            finalValue: 'someCollectionFinalValue',
            headlineLevel: undefined,
            label: undefined,
            mode: 'input',
            name: 'someCollectionNameInData',
            options: [
              {
                label: undefined,
                value: 'someCollectionItem',
              },
            ],
            placeholder: 'initialEmptyValueText',
            showLabel: true,
            tooltip: {},
            type: 'collectionVariable',
          },
        ],
      },
    ]);
  });

  it('creates hidden component within a group', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someGroupId',
          nameInData: 'someGroupNameInData',
          type: 'group',
          children: [
            {
              childId: 'someChildId',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          type: 'textVariable',
        } as BFFMetadataTextVariable,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someOtherChildId',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      { childId: 'someGroupId', repeatMin: '1', repeatMax: '1' },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([
      {
        type: 'group',
        name: 'someGroupNameInData',
        mode: 'input',
        repeat: { repeatMin: 1, repeatMax: 1 },
        hidden: true,
        components: [
          {
            attributesToShow: 'none',
            finalValue: 'someFinalValue',
            name: 'someNameInData',
            type: 'hidden',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      },
    ]);
  });

  it('creates hidden component within a group with attributes', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someGroupId',
          nameInData: 'someGroupNameInData',
          type: 'group',
          attributeReferences: [{ refCollectionVarId: 'someCollectionVarId' }],
          children: [
            {
              childId: 'someChildId',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          type: 'textVariable',
        } as BFFMetadataTextVariable,
        {
          id: 'someCollectionVarId',
          nameInData: 'someCollectionNameInData',
          type: 'collectionVariable',
          finalValue: 'someCollectionFinalValue',
          refCollection: 'someCollection',
        } as BFFMetadataCollectionVariable,
        {
          id: 'someCollection',
          nameInData: 'someCollectionNameInData',
          collectionItemReferences: [
            { refCollectionItemId: 'someCollectionItemId' },
          ],
          type: 'itemCollection',
        } as BFFMetadataItemCollection,
        {
          id: 'someCollectionItemId',
          nameInData: 'someCollectionItem',
          type: 'collectionItem',
        } as BFFMetadataBase,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someOtherChildId',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      { childId: 'someGroupId', repeatMin: '1', repeatMax: '1' },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([
      {
        type: 'group',
        name: 'someGroupNameInData',
        mode: 'input',
        repeat: { repeatMin: 1, repeatMax: 1 },
        hidden: true,
        components: [
          {
            attributesToShow: 'none',
            finalValue: 'someFinalValue',
            name: 'someNameInData',
            type: 'hidden',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
        attributes: [
          {
            attributesToShow: undefined,
            finalValue: 'someCollectionFinalValue',
            headlineLevel: undefined,
            label: undefined,
            mode: 'input',
            name: 'someCollectionNameInData',
            options: [
              {
                label: undefined,
                value: 'someCollectionItem',
              },
            ],
            placeholder: 'initialEmptyValueText',
            showLabel: true,
            tooltip: {},
            type: 'collectionVariable',
          },
        ],
      },
    ]);
  });

  it('returns empty list for hidden component with presentation within a group', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someGroupId',
          nameInData: 'someGroupNameInData',
          type: 'group',
          children: [
            {
              childId: 'someChildId',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          type: 'textVariable',
        } as BFFMetadataTextVariable,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someOtherChildId',
        } as BFFPresentationTextVar,
        {
          id: 'somePGroupId',
          type: 'pGroup',
          presentationOf: 'someGroupId',
          children: [
            {
              refGroups: [
                {
                  type: 'presentation',
                  childId: 'somePresentationChildId',
                },
              ],
            },
          ],
        } as BFFPresentationGroup,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      { childId: 'someGroupId' },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [
      {
        refGroups: [
          {
            type: 'presentation',
            childId: 'somePGroupId',
          },
        ],
      },
    ] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([]);
  });

  it('creates hidden components for repeating variable with finalValue', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          type: 'textVariable',
        } as BFFMetadataTextVariable,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someOtherChildId',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      {
        childId: 'someChildId',
        repeatMin: '0',
        repeatMax: 'X',
      },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([
      {
        attributesToShow: 'none',
        finalValue: 'someFinalValue',
        name: 'someNameInData',
        type: 'hidden',
        repeat: {
          repeatMin: 0,
          repeatMax: Number.MAX_VALUE,
        },
      },
    ]);
  });

  it('creates hidden component for variable without final value within repeating group', () => {
    const dependencies = {
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someGroupId',
          nameInData: 'someGroupNameInData',
          type: 'group',
          children: [
            {
              childId: 'someChildId',
              repeatMin: '1',
              repeatMax: '1',
            },
          ],
        } as BFFMetadataGroup,
        {
          id: 'someChildId',
          nameInData: 'someNameInData',
          finalValue: 'someFinalValue',
          type: 'textVariable',
        } as BFFMetadataTextVariable,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'somePresentationChildId',
          type: 'pVar',
          presentationOf: 'someOtherChildId',
        } as BFFPresentationTextVar,
      ]),
    } as Dependencies;

    const metadataChildReferences = [
      { childId: 'someGroupId', repeatMin: '1', repeatMax: 'X' },
    ] as BFFMetadataChildReference[];

    const presentationChildReferences = [] as BFFPresentationChildReference[];

    const hiddenComponents = createHiddenComponents(
      dependencies,
      metadataChildReferences,
      presentationChildReferences,
    );

    expect(hiddenComponents).toEqual([
      {
        type: 'group',
        name: 'someGroupNameInData',
        mode: 'input',
        repeat: { repeatMin: 1, repeatMax: Number.MAX_VALUE },
        hidden: true,
        components: [
          {
            attributesToShow: 'none',
            finalValue: 'someFinalValue',
            name: 'someNameInData',
            type: 'hidden',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      },
    ]);
  });
});
