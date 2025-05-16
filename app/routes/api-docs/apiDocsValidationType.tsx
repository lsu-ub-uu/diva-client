import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import type { Route } from './+types/apiDocsValidationType';

export async function loader({ params, context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const validationType = dependencies.validationTypePool.get(
    params.validationType,
  );

  const newMetadataGroupId = validationType.newMetadataGroupId;
  const newMetadataGroup = dependencies.metadataPool.get(
    newMetadataGroupId,
  ) as BFFMetadataGroup;

  return {
    validationType,
    newMetadataGroup,
    metadataPool: Object.fromEntries(dependencies.metadataPool.entries()),
  };
}

export default function ValidationType({ loaderData }: Route.ComponentProps) {
  const { validationType, newMetadataGroup, metadataPool } = loaderData;
  return (
    <div>
      <h3>{validationType.id}</h3>
      <h4>Create</h4>
      <div
        style={{
          fontFamily: 'monospace',
          color: '#fefefe',
          backgroundColor: '#333',
          padding: '1rem',
          borderRadius: '0.5rem',
          maxWidth: '1200px',
          overflowX: 'auto',
        }}
      >
        <GroupDoc
          group={newMetadataGroup}
          metadataPool={metadataPool}
          childRef={{
            repeatMin: '1',
            repeatMax: '1',
            childId: newMetadataGroup.id,
          }}
        />
      </div>
    </div>
  );
}

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
    <div>
      <div>
        &lt;{group.nameInData}&gt;
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
      </div>
      <div style={{ paddingLeft: '1rem' }}>
        {group.children.map((child) => (
          <ChildDoc
            key={child.childId}
            childRef={child}
            metadataPool={metadataPool}
          />
        ))}
      </div>
      <div>&lt;/{group.nameInData}&gt;</div>
    </div>
  );
}

export function TextVariableDoc({
  metadata,
  childRef,
}: {
  metadata: BFFMetadataTextVariable;
  childRef: BFFMetadataChildReference;
}) {
  if (metadata.finalValue) {
    return (
      <div>
        &lt;{metadata.nameInData}&gt;
        <span style={{ color: 'lightsalmon' }}>{metadata.finalValue}</span>&lt;/
        {metadata.nameInData}&gt;
      </div>
    );
  }

  return (
    <div>
      <div>
        &lt;{metadata.nameInData}&gt;
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
        <span style={{ color: 'lightblue' }}>{`[${metadata.regEx}]`}</span>
      </div>
    </div>
  );
}

export function CollectionVariableDoc({
  metadata,
  childRef,
  collectionValues,
}: {
  metadata: BFFMetadataCollectionVariable;
  childRef: BFFMetadataChildReference;
  collectionValues: string[];
}) {
  if (metadata.finalValue) {
    return (
      <div>
        &lt;{metadata.nameInData}&gt;
        <span style={{ color: 'darkorange' }}>{metadata.finalValue}</span>&lt;/
        {metadata.nameInData}&gt;
      </div>
    );
  }

  return (
    <div>
      <div>
        &lt;{metadata.nameInData}&gt;
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
        <span
          style={{ color: 'lightblue', whiteSpace: 'nowrap' }}
        >{`[${collectionValues.join(' | ')}]`}</span>
      </div>
    </div>
  );
}

export function RecordLinkDoc({
  metadata,
  childRef,
}: {
  metadata: BFFMetadataRecordLink;
  childRef: BFFMetadataChildReference;
}) {
  return (
    <div>
      &lt;{metadata.nameInData}&gt;{' '}
      <span style={{ color: 'hotpink' }}>
        ({childRef.repeatMin} - {childRef.repeatMax})
      </span>
      <div style={{ paddingLeft: '1rem' }}>
        <div>
          &lt;linkedRecordType&gt;{metadata.linkedRecordType}
          &lt;/linkedRecordType&gt;
        </div>
        <div>
          &lt;linkedRecordId&gt;
          <span style={{ color: 'darkorange' }}>
            {metadata.finalValue ?? ''}
          </span>
          &lt;/linkedRecordId&gt;
        </div>
      </div>
      &lt;/{metadata.nameInData}&gt;
    </div>
  );
}

export function ChildDoc({
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

      const collectionValues = itemCollection.collectionItemReferences.map(
        (ref) => metadataPool[ref.refCollectionItemId].nameInData,
      );

      return (
        <CollectionVariableDoc
          metadata={childMetadata as BFFMetadataCollectionVariable}
          collectionValues={collectionValues}
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
