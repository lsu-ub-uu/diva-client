import type { Auth } from '@/auth/Auth';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Alert } from '@/components/Alert/Alert';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { getDependencies } from 'server/dependencies/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordSearch';
import { RecordSearchView } from './components/RecordSearchView';
import css from './recordSearch.css?url';
import { loadSearchView } from './utils/loadSearchView.server';
import { useTranslation } from 'react-i18next';

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

    const userRights = await getUserRightsForRecordType(
      params.recordType,
      auth,
    );

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
      userRights,
      searchView,
    };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();
  const { title, recordTypeTextId, validationTypes, userRights, searchView } =
    loaderData;

  return (
    <div className='grid main-content'>
      <div className='grid-col-12'>
        <div className='top-bar'>
          <Breadcrumbs />
          {userRights.includes('create') && (
            <CreateRecordMenu
              validationTypes={validationTypes}
              recordTypeTextId={recordTypeTextId}
            />
          )}
        </div>
        <h1>{title}</h1>
      </div>
      {searchView && userRights.includes('search') ? (
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

const getUserRightsForRecordType = async (
  recordTypeId: string,
  auth?: Auth,
) => {
  const response = await getRecordDataById<RecordWrapper>(
    'recordType',
    recordTypeId,
    auth?.data?.token,
  );

  return response.data.record.actionLinks
    ? Object.keys(response.data.record.actionLinks)
    : [];
};
