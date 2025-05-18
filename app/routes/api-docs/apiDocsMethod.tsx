import { useTranslation } from 'react-i18next';
import type { Route } from './+types/apiDocsMethod';
import { ValidationType } from './components/MetadataDoc';
import {
  coraApiUrl,
  createHeaders,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const validationType = dependencies.validationTypePool.get(
    params.validationType,
  );
  const { method } = params;
  const url = new URL(request.url);
  const format = url.searchParams.get('format') ?? 'xml';

  return {
    request: {
      method: method === 'read' ? 'GET' : 'POST',
      url: coraApiUrl(
        `/record/${validationType.validatesRecordTypeId}${method !== 'create' ? '/{recordId}' : ''}`,
      ),
      headers: {
        Accept: RECORD_CONTENT_TYPE.replace('json', format),
        ...(method !== 'read' && {
          'Content-Type': RECORD_GROUP_CONTENT_TYPE.replace('json', format),
        }),
        AuthToken: 'xxxx-xxxx-xxxx-xxxx',
      },
    },
    method,
    validationType,
    breadcrumb: params.method,
    format,
  };
}

export default function ValidationTypeRoute({
  loaderData,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const { validationType, request, method } = loaderData;
  return (
    <div>
      <div className='code-block'>
        <strong>{request.method}</strong> {request.url}
        <br />
        <br />
        {Object.entries(request.headers).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: {value}
          </div>
        ))}
      </div>
      <h3>Data format</h3>
      <ValidationType
        metadataGroupId={
          method === 'create'
            ? validationType.newMetadataGroupId
            : validationType.metadataGroupId
        }
      />
    </div>
  );
}
