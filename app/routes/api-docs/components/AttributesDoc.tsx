import type {
  BFFAttributeReference,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
} from '@/cora/transform/bffTypes.server';
import { useRouteLoaderData } from 'react-router';
import type { loader } from '../apiDocs';
import { useState } from 'react';
import { CollectionValues } from './CollectionValues';

export function AttributesDoc({
  attributeReferences,
}: {
  attributeReferences: BFFAttributeReference[] | undefined;
}) {
  const [expanded, setExpanded] = useState(false);
  const loaderData = useRouteLoaderData<typeof loader>(
    'routes/api-docs/apiDocs',
  );

  const { metadataPool } = loaderData;

  return attributeReferences?.map((attributeRef) => {
    const attributeMetadata = metadataPool[
      attributeRef.refCollectionVarId
    ] as BFFMetadataCollectionVariable;

    const itemCollection = metadataPool[
      attributeMetadata.refCollection
    ] as BFFMetadataItemCollection;

    const collectionValues = itemCollection.collectionItemReferences.map(
      (ref) => metadataPool[ref.refCollectionItemId].nameInData,
    );

    return (
      <span key={attributeMetadata.id}>
        {' '}
        {attributeMetadata.nameInData}=
        {attributeMetadata.finalValue ? (
          <span style={{ color: 'darkorange' }}>
            "{attributeMetadata.finalValue}"
          </span>
        ) : (
          <span>
            "<CollectionValues collectionValues={collectionValues} />"
          </span>
        )}
      </span>
    );
  });
}
