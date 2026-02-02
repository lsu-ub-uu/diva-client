import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Button } from '@/components/Button/Button';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import type { BFFMetadataGroup } from '@/cora/transform/bffTypes.server';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import { createFilters } from '@/data/search/createFilterDefinition.server';
import { searchRecords } from '@/data/searchRecords.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { CirclePlusIcon } from 'lucide-react';
import { Fragment, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Await,
  data,
  href,
  Link,
  useNavigation,
  useSubmit,
} from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordSearch';
import type { ActiveFilter } from './components/ActiveFilters';
import { SearchLayout } from './components/SearchLayout';
import css from './recordSearch.css?url';

export const loader = async ({
  request,
  context,
  params,
}: Route.LoaderArgs) => {
  const { t } = context.get(i18nContext);
  const { dependencies } = context.get(dependenciesContext);
  const member = getMemberFromHostname(request, dependencies);
  const recordType = dependencies.recordTypePool.get(params.recordType);
  const { auth } = context.get(sessionContext);

  const searchId = recordType.searchId;
  if (!searchId) {
    throw data('Record type has no search', { status: 404 });
  }
  const search = dependencies.searchPool.get(searchId);
  const searchMetadata = dependencies.metadataPool.get(
    search.metadataId,
  ) as BFFMetadataGroup;

  const filters = createFilters(searchMetadata, dependencies);
  const searchParams = new URL(request.url).searchParams;
  const q = searchParams.get('q') ?? '';
  const start = Number(searchParams.get('start')) || 1;
  const rows = Number(searchParams.get('rows')) || 20;

  const activeFilters = filters
    .map((filter) => {
      const value = searchParams.get(filter.name);
      if (!value || value.trim() === '') {
        return undefined;
      }

      return {
        name: filter.name,
        value: value,
        textId: filter.textId,
        valueTextId:
          filter.type === 'collection'
            ? filter.options.find((o) => o.value === value)?.text
            : value,
      };
    })
    .filter(Boolean) as ActiveFilter[];

  const searchRootName = searchMetadata.nameInData;

  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;
  const mainSearchTerm = dependencies.metadataPool.get(
    includePartGroup.children[0].childId,
  );

  const searchQuery = {
    [searchRootName]: {
      include: {
        includePart: {
          recordIdSearchTerm: { value: '**' },
          trashBinSearchTerm: { value: 'false' },
          permissionUnitSearchTerm: {
            value: member?.memberPermissionUnit
              ? `permissionUnit_${member?.memberPermissionUnit}`
              : '',
          },
          [mainSearchTerm.nameInData]: { value: q || '**' },
          ...activeFilters.reduce((acc, filter) => {
            return { ...acc, [filter.name]: { value: filter.value } };
          }, {}),
        },
      },
      start: { value: start.toString() },
      rows: { value: rows.toString() },
    },
  };

  const decorated = recordType.id === 'diva-output';

  const searchResults = await searchRecords(
    dependencies,
    searchId,
    searchQuery,
    auth,
    decorated,
  );

  const validationTypes = getValidationTypes(
    params.recordType,
    auth?.data.token,
  );

  return {
    recordTypeId: recordType.id,
    recordTypeTextId: recordType.textId,
    mainSearchTerm,
    searchId,
    title: t(recordType.textId),
    query: q,
    start,
    rows,
    searchResults,
    filters,
    activeFilters,
    validationTypes,
  };
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const {
    searchId,
    title,
    mainSearchTerm,
    query,
    searchResults,
    filters,
    activeFilters,
    rows,
    start,
    recordTypeId,
    recordTypeTextId,
    validationTypes,
  } = loaderData;
  const submit = useSubmit();
  const navigation = useNavigation();
  const { t } = useTranslation();

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
      mainSearchTerm={mainSearchTerm}
      searching={searching}
      searchResults={searchResults}
      rows={rows}
      start={start}
      filters={filters}
      activeFilters={activeFilters}
      onQueryChange={handleQueryChange}
      onClearMainQuery={handleClearMainQuery}
      onRemoveFilter={handleRemoveFilter}
      onClearAllFilters={handleClearAllFilters}
    >
      <div className='main-content'>
        <Breadcrumbs />
        <div className='title-wrapper'>
          <h1>{title}</h1>

          <Suspense>
            <Await resolve={validationTypes} errorElement={<Fragment />}>
              {(validationTypes) => (
                <CreateRecordMenu
                  validationTypes={validationTypes}
                  recordTypeTextId={recordTypeTextId}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </SearchLayout>
  );
}
