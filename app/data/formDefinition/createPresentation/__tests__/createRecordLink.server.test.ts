import type {
  BFFMetadata,
  BFFMetadataRecordLink,
  BFFPresentationRecordLink,
} from '@/cora/transform/bffTypes.server';
import { createRecordLink } from '../createRecordLink.server';
import { Lookup } from '@/utils/structs/lookup';

describe('createRecordLink', () => {
  it.todo('transforms presentAs', () => {
    const metadataPool = new Lookup<string, BFFMetadata>();
    const metadata: BFFMetadataRecordLink = {
      id: 'permissionUnitRecordLink',
      nameInData: 'permissionUnit',
      type: 'recordLink',
      textId: '',
      defTextId: '',
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

    const actual = createRecordLink(metadataPool, metadata, presentation);

    expect(actual.presentAs).toEqual('permissionUnit');
  });
});
