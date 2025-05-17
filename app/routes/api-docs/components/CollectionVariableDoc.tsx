import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
} from '@/cora/transform/bffTypes.server';
import { AttributesDoc } from './AttributesDoc';
import { Element } from './Element';
import { CollectionValues } from './CollectionValues';

export function CollectionVariableDoc({
  metadata,
  childRef,
  collectionItems,
}: {
  metadata: BFFMetadataCollectionVariable;
  childRef: BFFMetadataChildReference;
  collectionItems: BFFMetadata[];
}) {
  return (
    <Element metadata={metadata} childRef={childRef}>
      <CollectionValues collectionItems={collectionItems} max={12} />
    </Element>
  );
}
