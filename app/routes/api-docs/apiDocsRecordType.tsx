import {
  data,
  href,
  Link,
  NavLink,
  Outlet,
  redirect,
  useRouteLoaderData,
} from 'react-router';
import type { Route } from './+types/apiDocsRecordType';
import { ValidationType } from './components/MetadataDoc';
import { useTranslation } from 'react-i18next';

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

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

  return { recordType, validationTypes, breadcrumb: recordType.id };
}

export default function RecordType({ loaderData }: Route.ComponentProps) {
  return <Outlet />;
}
