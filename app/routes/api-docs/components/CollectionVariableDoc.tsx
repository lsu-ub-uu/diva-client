import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
} from '@/cora/transform/bffTypes.server';
import { CollectionValues } from './CollectionValues';
import { Element } from './Element';

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
