import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import { CollectionVariableDoc } from './CollectionVariableDoc';
import { Element } from './Element';
import { RecordLinkDoc } from './RecordLinkDoc';
import { TextVariableDoc } from './TextVariableDoc';

export function GroupDoc({
  group,
  metadataPool,
  childRef,
}: {
  group: BFFMetadataGroup;
  metadataPool: Record<string, BFFMetadata>;
  childRef: BFFMetadataChildReference;
}) {
  return (
    <Element metadata={group} childRef={childRef}>
      {group.children.map((child) => (
        <ChildDoc
          key={child.childId}
          childRef={child}
          metadataPool={metadataPool}
        />
      ))}
    </Element>
  );
}

function ChildDoc({
  childRef: childRef,
  metadataPool,
}: {
  childRef: BFFMetadataChildReference;
  metadataPool: Record<string, BFFMetadata>;
}) {
  const childMetadata = metadataPool[childRef.childId];
  if (childMetadata) {
    if (childMetadata.type === 'textVariable') {
      return (
        <TextVariableDoc
          metadata={childMetadata as BFFMetadataTextVariable}
          childRef={childRef}
        />
      );
    }

    if (childMetadata.type === 'collectionVariable') {
      const itemCollection = metadataPool[
        (childMetadata as BFFMetadataCollectionVariable).refCollection
      ] as BFFMetadataItemCollection;

      const collectionItems = itemCollection.collectionItemReferences.map(
        (ref) => metadataPool[ref.refCollectionItemId],
      );

      return (
        <CollectionVariableDoc
          metadata={childMetadata as BFFMetadataCollectionVariable}
          collectionItems={collectionItems}
          childRef={childRef}
        />
      );
    }

    if (childMetadata.type === 'recordLink') {
      return (
        <RecordLinkDoc
          metadata={childMetadata as BFFMetadataRecordLink}
          childRef={childRef}
        />
      );
    }

    if (childMetadata.type === 'group') {
      return (
        <GroupDoc
          group={childMetadata as BFFMetadataGroup}
          metadataPool={metadataPool}
          childRef={childRef}
        />
      );
    }

    return <div>{childMetadata.nameInData}</div>;
  }
  return <div>{childRef.childId}</div>;
}
