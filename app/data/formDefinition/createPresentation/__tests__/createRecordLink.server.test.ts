import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataRecordLink,
  BFFPresentationChildReference,
  BFFPresentationRecordLink,
} from '@/cora/transform/bffTypes.server';
import { createRecordLink } from '../createRecordLink.server';
import { Lookup } from '@/utils/structs/lookup';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';

describe('createRecordLink', () => {
  it('transforms recordLink', () => {
    const metadataPool = new Lookup<string, BFFMetadata>();
    const metadata: BFFMetadataRecordLink = {
      id: 'permissionUnitRecordLink',
      nameInData: 'permissionUnit',
      type: 'recordLink',
      textId: 'recordLinkText',
      defTextId: 'recordLinkDefText',
      linkedRecordType: 'permissionUnit',
    };

    const presentation: BFFPresentationRecordLink = {
      id: 'permissionUnitPLink',
      type: 'pRecordLink',
      presentationOf: 'permissionUnitRecordLink',
      mode: 'input',
      linkedRecordPresentations: [
        {
          presentedRecordType: 'permissionUnit',
          presentationId: 'permissionUnitWhenLinkedPGroup',
        },
      ],
    };

    const metadataChildReference: BFFMetadataChildReference = {
      childId: 'permissionUnitChildId',
      repeatMin: '1',
      repeatMax: '1',
    };

    const presentationChildReference: BFFPresentationChildReference = {
      refGroups: [{ type: 'presentation', childId: 'permissionUnitPLink' }],
    };

    const alternativePresentation = undefined;

    const actual = createRecordLink(
      metadataPool,
      metadata,
      presentation,
      metadataChildReference,
      presentationChildReference,
      alternativePresentation,
    );

    const expected: FormComponentRecordLink = {
      type: 'recordLink',
      name: 'permissionUnit',
      mode: 'input',
      recordLinkType: 'permissionUnit',
      label: 'recordLinkText',
      presentationRecordLinkId: 'permissionUnitPLink',
      showLabel: true,
      gridColSpan: 12,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      linkedRecordPresentation: {
        presentationId: 'permissionUnitWhenLinkedPGroup',
        presentedRecordType: 'permissionUnit',
      },
      tooltip: {
        title: 'recordLinkText',
        body: 'recordLinkDefText',
      },
    };

    expect(actual).toStrictEqual(expected);
  });

  it('transforms presentAs', () => {
    const metadataPool = new Lookup<string, BFFMetadata>();
    const metadata: BFFMetadataRecordLink = {
      id: 'permissionUnitRecordLink',
      nameInData: 'permissionUnit',
      type: 'recordLink',
      textId: 'recordLinkText',
      defTextId: 'recordLinkDefText',
      linkedRecordType: 'permissionUnit',
    };

    const presentation: BFFPresentationRecordLink = {
      id: 'permissionUnitPLink',
      type: 'pRecordLink',
      presentationOf: 'permissionUnitRecordLink',
      mode: 'input',
      presentAs: 'permissionUnit',
      linkedRecordPresentations: [
        {
          presentedRecordType: 'permissionUnit',
          presentationId: 'permissionUnitWhenLinkedPGroup',
        },
      ],
    };

    const metadataChildReference: BFFMetadataChildReference = {
      childId: 'permissionUnitChildId',
      repeatMin: '1',
      repeatMax: '1',
    };

    const presentationChildReference: BFFPresentationChildReference = {
      refGroups: [{ type: 'presentation', childId: 'permissionUnitPLink' }],
    };

    const alternativePresentation = undefined;

    const actual = createRecordLink(
      metadataPool,
      metadata,
      presentation,
      metadataChildReference,
      presentationChildReference,
      alternativePresentation,
    );

    expect(actual.presentAs).toEqual('permissionUnit');
  });
});
