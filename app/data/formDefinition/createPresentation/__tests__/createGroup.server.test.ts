import type {
  BFFMetadata,
  BFFMetadataGroup,
  BFFPresentation,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '../../formDefinitionsDep.server';
import { createGroup } from '../createGroup.server';
import { listToPool } from '@/utils/structs/listToPool';

describe('createGroup', () => {
  it.todo('transforms presentAs', () => {
    const presentation: BFFPresentationGroup = {};
    const metadata: BFFMetadataGroup = {};

    const dependencies = {
      presentationPool: listToPool<BFFPresentation>([]),
      metadataPool: listToPool<BFFMetadata>([]),
    } as Dependencies;

    const actual = createGroup(dependencies, metadata, presentation);

    expect(actual.presentAs).toEqual('map');
  });
});
