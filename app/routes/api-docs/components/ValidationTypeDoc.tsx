import type {
  BFFMetadataGroup,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { useRouteLoaderData } from 'react-router';
import { loader } from '../apiDocs';
import { GroupDoc } from './GroupDoc';
import { useTranslation } from 'react-i18next';

export function ValidationType({
  validationType,
}: {
  validationType: BFFValidationType;
}) {
  const { t } = useTranslation();
  const loaderData = useRouteLoaderData<typeof loader>(
    'routes/api-docs/apiDocs',
  );
  if (!loaderData) {
    return;
  }

  const { metadataPool } = loaderData;
  const newMetadataGroup = metadataPool[
    validationType.newMetadataGroupId
  ] as BFFMetadataGroup;

  return (
    <div>
      <h2>{t(validationType.nameTextId)}</h2>
      <div
        style={{
          padding: '1rem',
          paddingLeft: '2rem',
          fontFamily: 'monospace',
          color: '#fefefe',
          backgroundColor: '#333',
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
