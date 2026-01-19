import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Pagination } from '@/components/Form/Pagination';
import { DivaOutputSearchResult } from '@/components/Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '@/components/Form/SearchResultForm';
import { IconButton } from '@/components/IconButton/IconButton';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { Select } from '@/components/Input/Select';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataNumberVariable,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { searchRecords } from '@/data/searchRecords.server';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { ListFilterIcon, SearchIcon, XIcon } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { data, Form, useNavigation, useSubmit } from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/recordSearch';
import css from './recordSearch.css?url';

// Debounce hook for callbacks
function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

interface ActiveFilter {
  name: string;
  value: string;
  textId: string;
  valueTextId?: string;
}

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
  const genericSearchTermValue = searchParams.get('q') ?? '';
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
          genericSearchTerm: { value: genericSearchTermValue },
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
    title: t(recordType.textId),
    query: genericSearchTermValue,
    start,
    rows,
    searchResults,
    filters,
    activeFilters,
  };
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const { title, query, searchResults, filters, activeFilters, rows, start } =
    loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  const { t } = useTranslation();

  const searching = Boolean(
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname),
  );

  // Debounced submit handler for the form
  const debouncedSubmit = useDebouncedCallback(
    (form: HTMLFormElement) => submit(form),
    400,
  );

  const handleFilterChange = (form: HTMLFormElement) => {
    console.log('filter change', form);
    const formData = new FormData(form);
    for (const [key, value] of Array.from(formData.entries())) {
      if (typeof value === 'string' && value.trim() === '') {
        formData.delete(key);
      }
    }
    submit(formData, { method: 'GET' });
  };

  const debouncedFilterChange = useDebouncedCallback(
    (form: HTMLFormElement) => handleFilterChange(form),
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

  return (
    <div>
      <div className='search-layout'>
        <div>
          <Breadcrumbs />
          <h1>{title}</h1>

          <Form method='GET' onChange={(e) => debouncedSubmit(e.currentTarget)}>
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
                    <SearchIcon />
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
            <div className='active-filters'>
              <div>Aktiva filter: </div>

              {activeFilters.map((filter) => (
                <div key={filter.name} className='active-filter'>
                  <div className='active-filter-texts'>
                    <div className='active-filter-name'>
                      {t(filter.textId)}:
                    </div>
                    <div className='active-filter-value'>
                      {filter.valueTextId
                        ? t(filter.valueTextId)
                        : filter.value}
                    </div>
                  </div>

                  <IconButton
                    tooltip='Ta bort filter'
                    size='small'
                    type='submit'
                    onClick={() => handleRemoveFilter(filter.name)}
                    className='active-filter-remove-button'
                  >
                    <XIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}

          <div className='search-result'>
            <ol className={'result-list'} aria-busy={searching}>
              {searchResults.data.map((record) => (
                <li key={record.id} className={'result-list-item'}>
                  <div className='result-list-item-content'>
                    {record.recordType &&
                    record.recordType === 'diva-output' ? (
                      <DivaOutputSearchResult searchResult={record} />
                    ) : (
                      <SearchResultForm
                        record={record}
                        formSchema={record.presentation!}
                      />
                    )}
                    <div className='record-action-buttons'>
                      <RecordActionButtons record={record} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {searchResults.totalNo > 0 && (
            <Form
              className='pagination'
              method='GET'
              onChange={(e) => debouncedSubmit(e.currentTarget)}
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
            onChange={(e) => debouncedFilterChange(e.currentTarget)}
          >
            <input type='hidden' name='q' value={query} />
            <input type='hidden' name='start' value={start} />
            <input type='hidden' name='rows' value={rows} />
            {filters.map((filter) => {
              const value = activeFilters.find(
                (f) => f.name === filter.name,
              )?.value;
              return (
                <Filter
                  filter={filter}
                  key={`${filter.id}-${value}`}
                  defaultValue={value}
                />
              );
            })}
          </Form>
        </div>
      </div>
    </div>
  );
}

const Filter = ({
  filter,
  defaultValue,
}: {
  filter: TextFilter | NumberFilter | CollectionFilter;
  defaultValue?: string;
}) => {
  const { t } = useTranslation();

  switch (filter.type) {
    case 'text':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Input name={filter.name} defaultValue={defaultValue} />
        </Fieldset>
      );
    case 'number':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Input
            type='number'
            name={filter.name}
            min={filter.min}
            max={filter.max}
            defaultValue={defaultValue}
          />
        </Fieldset>
      );
    case 'collection':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Select name={filter.name} defaultValue={defaultValue}>
            <option value=''>--</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {t(option.text)}
              </option>
            ))}
          </Select>
        </Fieldset>
      );
  }
};

interface TextFilter {
  id: string;
  type: 'text';
  name: string;
  regex: string;
  textId: string;
}

interface NumberFilter {
  id: string;
  type: 'number';
  name: string;
  min?: number;
  max?: number;
  warningMin?: number;
  warningMax?: number;
  textId: string;
}

interface CollectionFilter {
  id: string;
  type: 'collection';
  name: string;
  textId: string;
  options: { text: string; value: string }[];
}

const createFilters = (
  searchMetadata: BFFMetadataGroup,
  dependencies: Dependencies,
): (TextFilter | NumberFilter | CollectionFilter)[] => {
  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const excludedSearchTerms = ['genericSearchTerm'];
  return includePartGroup.children
    .map((c) => dependencies.metadataPool.get(c.childId))
    .filter((metadata) => !excludedSearchTerms.includes(metadata.nameInData))
    .map((metadata) => createFilter(metadata, dependencies))
    .filter(Boolean) as (TextFilter | NumberFilter | CollectionFilter)[];
};

const createFilter = (
  metadata: BFFMetadata,
  depencencies: Dependencies,
): TextFilter | NumberFilter | CollectionFilter | undefined => {
  if (metadata.type === 'textVariable') {
    const textVariable = metadata as BFFMetadataTextVariable;
    return {
      type: 'text',
      id: textVariable.id,
      name: textVariable.nameInData,
      regex: textVariable.regEx,
      textId: textVariable.textId,
    };
  }

  if (metadata.type === 'numberVariable') {
    const numberVariable = metadata as BFFMetadataNumberVariable;
    return {
      type: 'number',
      id: numberVariable.id,
      name: numberVariable.nameInData,
      textId: numberVariable.textId,
      min: Number(numberVariable.min),
      max: Number(numberVariable.max),
      warningMin: Number(numberVariable.warningMin),
      warningMax: Number(numberVariable.warningMax),
    };
  }

  if (metadata.type === 'collectionVariable') {
    const collectionVariable = metadata as BFFMetadataCollectionVariable;
    const collection = depencencies.metadataPool.get(
      collectionVariable.refCollection,
    ) as BFFMetadataItemCollection;
    const options = collection.collectionItemReferences.map((itemRef) => {
      const item = depencencies.metadataPool.get(
        itemRef.refCollectionItemId,
      ) as BFFMetadataBase;
      return { text: item.textId, value: item.nameInData };
    });
    return {
      type: 'collection',
      id: collectionVariable.id,
      name: collectionVariable.nameInData,
      textId: collectionVariable.textId,
      options,
    };
  }
  return undefined;
};
