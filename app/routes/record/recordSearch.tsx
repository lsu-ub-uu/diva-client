import { sessionContext } from '@/auth/sessionMiddleware.server';
import { IconButton } from '@/components/IconButton/IconButton';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import {
  ActiveFilters,
  type ActiveFilter,
} from '@/components/search/ActiveFilters';
import { Filter } from '@/components/search/Filter';
import { Pagination } from '@/components/search/Pagination';
import { SearchResults } from '@/components/search/SearchResults';
import type { BFFMetadataGroup } from '@/cora/transform/bffTypes.server';
import { createFilters } from '@/data/search/createFilterDefinition.server';
import { searchRecords } from '@/data/searchRecords.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { ListFilterIcon, SearchIcon, SearchSlashIcon } from 'lucide-react';
import { data, Form, useNavigation, useSubmit } from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordSearch';
import css from './recordSearch.css?url';
import { useDebouncedCallback } from '@/utils/useDebouncedCallback';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { useTranslation } from 'react-i18next';

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
  const rows = Number(searchParams.get('rows')) || 10;

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

  const searchQuery = {
    [searchRootName]: {
      include: {
        includePart: {
          genericSearchTerm: { value: q },
          recordIdSearchTerm: { value: '**' },
          trashBinSearchTerm: { value: 'false' },
          permissionUnitSearchTerm: {
            value: member?.memberPermissionUnit
              ? `permissionUnit_${member?.memberPermissionUnit}`
              : '',
          },
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

  return {
    searchId,
    title: t(recordType.textId),
    query: q,
    start,
    rows,
    searchResults,
    filters,
    activeFilters,
  };
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const {
    searchId,
    title,
    query,
    searchResults,
    filters,
    activeFilters,
    rows,
    start,
  } = loaderData;
  const submit = useSubmit();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const userHasSearched = query || activeFilters.length > 0;

  const searching = Boolean(
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname),
  );

  const handleQueryChange = useDebouncedCallback(
    (form: HTMLFormElement) => submit(form),
    400,
  );

  const handleFilterChange = useDebouncedCallback((form: HTMLFormElement) => {
    const formData = new FormData(form);
    for (const [key, value] of Array.from(formData.entries())) {
      if (typeof value === 'string' && value.trim() === '') {
        formData.delete(key);
      }
    }
    submit(formData, { method: 'GET' });
  }, 400);

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

  return (
    <div className='search-layout' key={searchId}>
      <div className='search-main'>
        <Breadcrumbs />
        <h1>{title}</h1>

        <Form
          method='GET'
          onChange={(e) => handleQueryChange(e.currentTarget)}
          className='main-query-form'
        >
          <Fieldset label='Sök efter publikationer' size='large'>
            <div className='search-query-wrapper'>
              <Input
                name='q'
                className='search-query-input'
                placeholder='Sök på titel, abstract, författare, nyckelord, organisation, utviningsår, förlag, ISBN, DOI med mera.'
                defaultValue={query}
              />
              <div className='search-button'>
                <IconButton type='submit' tooltip='Sök'>
                  {searching ? <CircularLoader /> : <SearchIcon />}
                </IconButton>
              </div>
            </div>
          </Fieldset>
          {searchResults.totalNo > 0 && (
            <div className='pagination'>
              <Pagination rowsPerPage={rows} searchResults={searchResults} />
            </div>
          )}
          {activeFilters.map((filter) => (
            <input
              key={filter.name}
              type='hidden'
              name={filter.name}
              value={filter.value}
            />
          ))}
        </Form>

        {activeFilters.length > 0 && (
          <ActiveFilters
            activeFilters={activeFilters}
            handleRemoveFilter={handleRemoveFilter}
          />
        )}

        {userHasSearched && searchResults.totalNo === 0 && (
          <Alert severity='info' icon={<SearchSlashIcon />}>
            <AlertTitle>{t('divaClient_noSearchResultsTitleText')}</AlertTitle>
            {t('divaClient_noSearchResultsBodyText')}
          </Alert>
        )}

        <SearchResults
          searchResults={searchResults}
          start={start}
          searching={searching}
        />

        {searchResults.totalNo > 0 && (
          <Form
            className='pagination'
            method='GET'
            onChange={(e) => handleQueryChange(e.currentTarget)}
          >
            <input type='hidden' name='q' value={query} />
            {activeFilters.map((filter) => (
              <input
                key={filter.name}
                type='hidden'
                name={filter.name}
                value={filter.value}
              />
            ))}
            <Pagination rowsPerPage={rows} searchResults={searchResults} />
          </Form>
        )}
      </div>
      <div className='filters'>
        <h2>
          <ListFilterIcon /> Filter
        </h2>
        <Form
          method='GET'
          onChange={(e) => handleFilterChange(e.currentTarget)}
        >
          <input type='hidden' name='q' value={query} />
          <input type='hidden' name='start' value={start} />
          <input type='hidden' name='rows' value={rows} />
          {filters.map((filter) => {
            const value = activeFilters.find(
              (f) => f.name === filter.name,
            )?.value;
            return (
              <Filter filter={filter} key={filter.id} currentValue={value} />
            );
          })}
        </Form>
      </div>
    </div>
  );
}
