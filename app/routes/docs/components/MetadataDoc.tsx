import type { BFFMetadataGroup } from '@/cora/transform/bffTypes.server';
import { useRouteLoaderData } from 'react-router';
import { loader } from '../apiDocs';
import { GroupDoc } from './GroupDoc';

export function ValidationType({
  metadataGroupId,
}: {
  metadataGroupId: string;
}) {
  const loaderData = useRouteLoaderData<typeof loader>('routes/docs/apiDocs');
  if (!loaderData) {
    return;
  }

  const { metadataPool } = loaderData;
  const newMetadataGroup = metadataPool[metadataGroupId] as BFFMetadataGroup;

  return (
    <div>
      <div className='code-block'>
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
