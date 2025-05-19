import type {
  BFFAttributeReference,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
} from '@/cora/transform/bffTypes.server';
import { useRouteLoaderData } from 'react-router';
import { loader } from '../apiDocs';
import { NameInData } from './ NameInData';
import { CollectionValues } from './CollectionValues';

export function AttributesDoc({
  attributeReferences,
}: {
  attributeReferences: BFFAttributeReference[] | undefined;
}) {
  const loaderData = useRouteLoaderData<typeof loader>(
    'routes/api-docs/apiDocs',
  );

  if (!loaderData) {
    return null;
  }

  const { metadataPool } = loaderData;

  return attributeReferences?.map((attributeRef) => {
    const attributeMetadata = metadataPool[
      attributeRef.refCollectionVarId
    ] as BFFMetadataCollectionVariable;

    const itemCollection = metadataPool[
      attributeMetadata.refCollection
    ] as BFFMetadataItemCollection;

    const collectionItems = itemCollection.collectionItemReferences.map(
      (ref) => metadataPool[ref.refCollectionItemId],
    );

    return (
      <span key={attributeMetadata.id}>
        {' '}
        <NameInData metadata={attributeMetadata} />=
        {attributeMetadata.finalValue ? (
          <span style={{ color: 'darkorange' }}>
            &quot;{attributeMetadata.finalValue}&quot;
          </span>
        ) : (
          <span>
            &quot;
            <CollectionValues collectionItems={collectionItems} />
            &quot;
          </span>
        )}
      </span>
    );
  });
}
