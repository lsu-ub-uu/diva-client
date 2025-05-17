import type {
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
} from '@/cora/transform/bffTypes.server';
import { AttributesDoc } from './AttributesDoc';
import { Element } from './Element';
import { CollectionValues } from './CollectionValues';

export function CollectionVariableDoc({
  metadata,
  childRef,
  collectionValues,
}: {
  metadata: BFFMetadataCollectionVariable;
  childRef: BFFMetadataChildReference;
  collectionValues: string[];
}) {
  return (
    <Element metadata={metadata} childRef={childRef}>
      <CollectionValues collectionValues={collectionValues} max={12} />
    </Element>
  );
}
