import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataGroup,
  BFFPresentation,
  BFFPresentationChildReference,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '../../formDefinitionsDep.server';
import { createGroup } from '../createGroup.server';
import { listToPool } from '@/utils/structs/listToPool';
import type { FormComponent } from '@/components/FormGenerator/types';

describe('createGroup', () => {
  it('transforms group', () => {
    const dependencies = {
      presentationPool: listToPool<BFFPresentation>([]),
      metadataPool: listToPool<BFFMetadata>([]),
    } as Dependencies;

    const metadata: BFFMetadataGroup = {
      type: 'group',
      id: 'testGroup',
      nameInData: 'testGroup',
      textId: 'testGroupText',
      defTextId: 'testGroupDefText',
      children: [],
    };
    const presentation: BFFPresentationGroup = {
      type: 'pGroup',
      id: 'testPGroup',
      presentationOf: 'testGroup',
      children: [],
      mode: 'input',
      presentAs: 'map',
    };

    const metadataChildReference: BFFMetadataChildReference = {
      childId: 'testChildId',
      repeatMin: '1',
      repeatMax: '1',
    };

    const presentationChildReference: BFFPresentationChildReference = {
      refGroups: [{ type: 'presentation', childId: 'testPGroup' }],
    };

    const alternativePresentation: FormComponent | undefined = undefined;

    const actual = createGroup(
      dependencies,
      metadata,
      presentation,
      metadataChildReference,
      presentationChildReference,
      alternativePresentation,
    );

    expect(actual).toStrictEqual({
      type: 'group',
      name: 'testGroup',
      mode: 'input',
      tooltip: { title: 'testGroupText', body: 'testGroupDefText' },
      label: 'testGroupText',
      showLabel: true,
      components: [],
      repeat: { repeatMin: 1, repeatMax: 1 },
      gridColSpan: 12,
      presentAs: 'map',
    });
  });

  it('transforms group', () => {
    const dependencies = {
      presentationPool: listToPool<BFFPresentation>([]),
      metadataPool: listToPool<BFFMetadata>([]),
    } as Dependencies;

    const metadata: BFFMetadataGroup = {
      type: 'group',
      id: 'testGroup',
      nameInData: 'testGroup',
      textId: 'testGroupText',
      defTextId: 'testGroupDefText',
      children: [],
    };
    const presentation: BFFPresentationGroup = {
      type: 'pGroup',
      id: 'testPGroup',
      presentationOf: 'testGroup',
      children: [],
      mode: 'input',
      presentAs: 'map',
    };

    const metadataChildReference: BFFMetadataChildReference = {
      childId: 'testChildId',
      repeatMin: '1',
      repeatMax: '1',
    };

    const presentationChildReference: BFFPresentationChildReference = {
      refGroups: [{ type: 'presentation', childId: 'testPGroup' }],
    };

    const alternativePresentation: FormComponent | undefined = undefined;

    const actual = createGroup(
      dependencies,
      metadata,
      presentation,
      metadataChildReference,
      presentationChildReference,
      alternativePresentation,
    );

    expect(actual.presentAs).toEqual('map');
  });
});
