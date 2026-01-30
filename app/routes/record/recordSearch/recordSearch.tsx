import type { Auth } from '@/auth/Auth';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Button } from '@/components/Button/Button';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { externalCoraApiUrl } from '@/cora/helper.server';
import type { BFFMetadataGroup } from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { getValidationTypes } from '@/data/getValidationTypes.server';
import {
  createFilters,
  type AutocompleteFilter,
  type FilterDefinition,
} from '@/data/search/createFilterDefinition.server';
import {
  createCoraSearchQuery,
  searchRecords,
} from '@/data/searchRecords.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { get } from 'lodash-es';
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
  const { t, language } = context.get(i18nContext);
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

  const activeFilters = await Promise.all(
    filters.map((filter) =>
      createActiveFilter(
        filter,
        searchParams,
        dependencies,
        auth,
        language as 'sv' | 'en',
      ),
    ),
  ).then((results) => results.filter(Boolean) as ActiveFilter[]);

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

  const apiUrl =
    searchQuery &&
    encodeURI(
      externalCoraApiUrl(
        `/record/searchResult/${recordType.searchId}?searchData=${JSON.stringify(createCoraSearchQuery(dependencies, dependencies.searchPool.get(searchId), searchQuery))}`,
      ),
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
    apiUrl,
  };
};

const createActiveFilter = async (
  filter: FilterDefinition,
  searchParams: URLSearchParams,
  dependencies: Dependencies,
  auth: Auth | undefined,
  language: 'sv' | 'en',
): Promise<ActiveFilter | undefined> => {
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
        : filter.type === 'autocomplete'
          ? await getValueTextForAutocompleteFilter(
              value,
              filter,
              auth,
              dependencies,
              language,
            )
          : value,
  };
};

const getValueTextForAutocompleteFilter = async (
  value: string,
  filter: AutocompleteFilter,
  auth: Auth | undefined,
  dependencies: Dependencies,
  language: 'sv' | 'en',
) => {
  const [recordType, recordId] = value.split('_');
  if (!recordType || !recordId) {
    return value;
  }
  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType,
      mode: 'view',
      authToken: auth?.data.token,
      recordId,
    });

    return get(record.data, filter.presentationPath[language]);
  } catch {
    return value;
  }
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
    apiUrl,
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
      apiUrl={apiUrl}
      onQueryChange={handleQueryChange}
      onClearMainQuery={handleClearMainQuery}
      onRemoveFilter={handleRemoveFilter}
      onClearAllFilters={handleClearAllFilters}
    >
      <>
        <Breadcrumbs />
        <div className='title-wrapper'>
          <h1>{title}</h1>

          <Suspense
            fallback={
              <Button
                as={Link}
                variant='secondary'
                to={href('/:recordType/create', {
                  recordType: recordTypeId,
                })}
                size='large'
              >
                <CirclePlusIcon />
                {t('divaClient_createText', {
                  type: t(recordTypeTextId).toLowerCase(),
                })}
              </Button>
            }
          >
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
      </>
    </SearchLayout>
  );
}
