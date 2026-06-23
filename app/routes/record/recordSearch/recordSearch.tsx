import type { Auth } from '@/auth/Auth';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { useNavigation, useSubmit } from 'react-router';
import { getDependencies } from 'server/dependencies/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordSearch';
import { SearchLayout } from './components/SearchLayout';
import css from './recordSearch.css?url';
import { loadSearchView } from './utils/loadSearchView.server';

export const loader = async ({
  request,
  context,
  params,
}: Route.LoaderArgs) => {
  try {
    const { t, language } = context.get(i18nContext);
    const dependencies = await getDependencies();
    const member = getMemberFromHostname(request, dependencies);
    const { auth } = context.get(sessionContext);
    const recordType = dependencies.recordTypePool.get(params.recordType);
    const searchParams = new URL(request.url).searchParams;

    const userRights = await getUserRightsForRecordType(
      params.recordType,
      auth,
    );

    const validationTypes = getValidationTypes(params.recordType, dependencies);

    const {
      searchFormDefinition,
      searchId,
      query,
      start,
      rows,
      activeFilters,
      apiUrl,
      validationErrors,
      searchResults,
    } = await loadSearchView({
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
      searchFormDefinition,
      searchId,
      title: t(recordType.pluralTextId),
      query,
      start,
      rows,
      searchResults,
      activeFilters,
      validationTypes,
      apiUrl,
      userRights,
      validationErrors,
    };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const {
    searchId,
    title,
    searchFormDefinition,
    query,
    searchResults,
    activeFilters,
    rows,
    start,
    recordTypeTextId,
    validationTypes,
    apiUrl,
    userRights,
    validationErrors,
  } = loaderData;
  const submit = useSubmit();
  const navigation = useNavigation();

  const searching = Boolean(
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname),
  );

  const handleQueryChange = useDebouncedCallback(
    (form: HTMLFormElement) => submit(form),
    400,
  );

  const handleRemoveFilter = (filterName: string) => {
    const formData = new FormData();
    formData.append('q', query);
    formData.append('start', start.toString());
    formData.append('rows', rows.toString());
    activeFilters.forEach((filter) => {
      if (filter.name !== filterName) {
        formData.append(filter.name, filter.value);
      }
    });
    submit(formData, { method: 'GET' });
  };

  const handleClearAllFilters = () => {
    const formData = new FormData();
    formData.append('q', query);
    formData.append('start', start.toString());
    formData.append('rows', rows.toString());
    submit(formData, { method: 'GET' });
  };

  const handleClearMainQuery = () => {
    const formData = new FormData();
    formData.append('start', start.toString());
    formData.append('rows', rows.toString());
    activeFilters.forEach((filter) => {
      formData.append(filter.name, filter.value);
    });
    submit(formData, { method: 'GET' });
  };

  return (
    <SearchLayout
      key={searchId}
      query={query}
      searchFormDefinition={searchFormDefinition}
      searching={searching}
      searchResults={searchResults}
      rows={rows}
      start={start}
      activeFilters={activeFilters}
      apiUrl={apiUrl}
      onQueryChange={handleQueryChange}
      onClearMainQuery={handleClearMainQuery}
      onRemoveFilter={handleRemoveFilter}
      onClearAllFilters={handleClearAllFilters}
      userRights={userRights}
      validationErrors={validationErrors}
    >
      <div className='main-content'>
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
    </SearchLayout>
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
