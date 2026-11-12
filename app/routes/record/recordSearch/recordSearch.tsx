import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Alert } from '@/components/Alert/Alert';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router';
import { getDependencies } from 'server/dependencies/depencencies';
import { i18nContext } from 'server/i18n';
import { type loader as recordTypeLoader } from '../recordType';
import type { Route } from './+types/recordSearch';
import { RecordSearchView } from './components/RecordSearchView';
import css from './recordSearch.css?url';
import { loadSearchView } from './utils/loadSearchView.server';

export const loader = async ({
  request,
  url,
  context,
  params,
}: Route.LoaderArgs) => {
  try {
    const { t, language } = context.get(i18nContext);
    const dependencies = await getDependencies();
    const member = getMemberFromHostname(request, dependencies);
    const { auth } = context.get(sessionContext);
    const recordType = dependencies.recordTypePool.get(params.recordType);
    const searchParams = url.searchParams;

    const validationTypes = getValidationTypes(params.recordType, dependencies);

    const searchView = await loadSearchView({
      dependencies,
      recordType,
      searchParams,
      auth,
      language,
      member,
      t,
    });

    return {
      recordTypeId: recordType.id,
      recordTypeTextId: recordType.textId,
      title: t(recordType.pluralTextId),
      validationTypes,
      searchView,
    };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { title, recordTypeTextId, validationTypes, searchView } = loaderData;
  const recordTypeLoaderData = useRouteLoaderData<typeof recordTypeLoader>(
    'routes/record/recordType',
  );
  const recordTypeUserRights = recordTypeLoaderData?.recordTypeUserRights ?? [];
  return (
    <div className='grid main-content'>
      <div className='grid-col-12'>
        <div className='top-bar'>
          <Breadcrumbs />
          {recordTypeUserRights.includes('create') && (
            <CreateRecordMenu
              validationTypes={validationTypes}
              recordTypeTextId={recordTypeTextId}
            />
          )}
        </div>
        <h1>{title}</h1>
      </div>
      {searchView && recordTypeUserRights.includes('search') ? (
        <RecordSearchView searchView={searchView} />
      ) : (
        <div className='grid-col-6 grid-col-l-12'>
          <Alert severity='info'>
            {t('divaClient_searchNotAvailableForRecordTypeText')}
          </Alert>
        </div>
      )}
    </div>
  );
}
