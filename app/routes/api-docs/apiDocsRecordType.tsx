import { data, href, Link, Outlet } from 'react-router';
import type { Route } from './+types/apiDocsRecordType';

export async function loader({ params, context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const recordType = dependencies.recordTypePool.get(params.recordType);
  const validationTypes = Array.from(
    dependencies.validationTypePool.values(),
  ).filter(
    (validationType) =>
      validationType.validatesRecordTypeId === params.recordType,
  );

  if (!recordType) {
    throw data('Record type not found', { status: 404 });
  }
  return { recordType, validationTypes };
}

export default function RecordType({ loaderData }: Route.ComponentProps) {
  const { recordType, validationTypes } = loaderData;
  return (
    <div>
      <h2>{recordType.id} validation types</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ul>
          {validationTypes?.map((type) => (
            <li key={type.id}>
              <Link
                to={href('/api-docs/:recordType/:validationType', {
                  recordType: recordType.id,
                  validationType: type.id,
                })}
              >
                {type.id}
              </Link>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
