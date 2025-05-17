import type {
  BFFAttributeReference,
  BFFMetadataCollectionVariable,
  BFFMetadataItemCollection,
} from '@/cora/transform/bffTypes.server';
import { useRouteLoaderData } from 'react-router';
import type { loader } from '../apiDocs';
import { useState } from 'react';
import { CollectionValues } from './CollectionValues';
import { NameInData } from './ NameInData';

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

    const collectionItems = itemCollection.collectionItemReferences.map(
      (ref) => metadataPool[ref.refCollectionItemId],
    );

    return (
      <span key={attributeMetadata.id}>
        {' '}
        <NameInData metadata={attributeMetadata} />=
        {attributeMetadata.finalValue ? (
          <span style={{ color: 'darkorange' }}>
            "{attributeMetadata.finalValue}"
          </span>
        ) : (
          <span>
            "<CollectionValues collectionItems={collectionItems} />"
          </span>
        )}
      </span>
    );
  });
}
