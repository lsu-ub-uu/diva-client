import { useTranslation } from 'react-i18next';
import type { Route } from './+types/apiDocsValidationType';
import { ValidationType } from './components/MetadataDoc';
import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';

export async function loader({ params, context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const validationType = dependencies.validationTypePool.get(
    params.validationType,
  );

  return {
    create: {
      method: 'POST',
      url: coraApiUrl(`/record/${validationType.validatesRecordTypeId}`),
      headers: {
        Accept: RECORD_CONTENT_TYPE.replace('json', 'xml'),
        'Content-Type': RECORD_GROUP_CONTENT_TYPE.replace('json', 'xml'),
        AuthToken: 'xxxx-xxxx-xxxx-xxxx',
      },
    },
    validationType,
    breadcrumb: validationType.id,
  };
}

export default function ValidationTypeRoute({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const { validationType, create } = loaderData;
  return (
    <div>
      <h2>{t(validationType.nameTextId)}</h2>
      <h3>Create</h3>
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
          marginBottom: '1rem',
        }}
      >
        <strong>{create.method}</strong> {create.url}
        <br />
        <br />
        {Object.entries(create.headers).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: {value}
          </div>
        ))}
      </div>
      <ValidationType metadataGroupId={validationType.newMetadataGroupId} />
    </div>
  );
}
