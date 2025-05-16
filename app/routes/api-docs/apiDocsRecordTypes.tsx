import { Link, Outlet } from 'react-router';
import type { Route } from './+types/apiDocsRecordTypes';

export async function loader({ context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const recordTypes = Array.from(dependencies.recordTypePool.values()).filter(
    (recordType) => recordType.id.indexOf('diva-') >= 0,
  );
  return { recordTypes };
}

export default function ApiDocs({ loaderData }: Route.ComponentProps) {
  const { recordTypes } = loaderData;
  return (
    <div>
      <h1>API Documentation</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ul>
          {recordTypes.map((recordType) => (
            <li key={recordType.id}>
              <Link to={`/api-docs/${recordType.id}`}>{recordType.id}</Link>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
