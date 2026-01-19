import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { useRef, useCallback } from 'react';
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
import css from './recordSearch.css?url';
import type { Route } from './+types/recordSearch';
import { i18nContext } from 'server/i18n';
import { dependenciesContext } from 'server/depencencies';
import { data, Form, useNavigation, useSubmit } from 'react-router';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { ListFilterIcon, SearchIcon } from 'lucide-react';
import { IconButton } from '@/components/IconButton/IconButton';
import { getMemberFromHostname } from '@/utils/getMemberFromHostname';
import { searchRecords } from '@/data/searchRecords.server';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import { DivaOutputSearchResult } from '@/components/Form/SearchResult/DivaOutputSearchResult';
import { SearchResultForm } from '@/components/Form/SearchResultForm';
import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import type {
  BFFMetadata,
  BFFMetadataGroup,
} from '@/cora/transform/bffTypes.server';
import { useTranslation } from 'react-i18next';
import { Select } from '@/components/Input/Select';
import { Pagination } from '@/components/Form/Pagination';

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

  const searchParams = new URL(request.url).searchParams;
  const genericSearchTermValue = searchParams.get('q') ?? '';
  const start = Number(searchParams.get('start')) || 1;
  const rows = Number(searchParams.get('rows')) || 10;

  const searchId = recordType.searchId;
  if (!searchId) {
    throw data('Record type has no search', { status: 404 });
  }
  const search = dependencies.searchPool.get(searchId);
  const searchMetadata = dependencies.metadataPool.get(
    search.metadataId,
  ) as BFFMetadataGroup;

  const includeGroup = dependencies.metadataPool.get(
    searchMetadata.children[0].childId,
  ) as BFFMetadataGroup;
  const includePartGroup = dependencies.metadataPool.get(
    includeGroup.children[0].childId,
  ) as BFFMetadataGroup;

  const excludedSearchTerms = ['genericSearchTerm'];
  const searchTerms = includePartGroup.children
    .map((c) => dependencies.metadataPool.get(c.childId))
    .filter((metadata) => !excludedSearchTerms.includes(metadata.nameInData));

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
    searchTerms,
  };
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function RecordSearch({ loaderData }: Route.ComponentProps) {
  const { title, query, searchResults, searchTerms, rows } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = Boolean(
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname),
  );

  // Debounced submit handler for the form
  const debouncedSubmit = useDebouncedCallback(
    (form: HTMLFormElement) => submit(form),
    400,
  );

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
            <Pagination rowsPerPage={rows} searchResults={searchResults} />
          </Form>

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

          <Form method='GET' onChange={(e) => debouncedSubmit(e.currentTarget)}>
            <Pagination rowsPerPage={rows} searchResults={searchResults} />
          </Form>
        </div>
        <div className='filters'>
          <h2>
            <ListFilterIcon /> Filter
          </h2>
          <Form method='GET' onChange={(e) => debouncedSubmit(e.currentTarget)}>
            <input type='hidden' name='q' value={query} />
            {searchTerms.map((searchTerm) => (
              <SearchTerm term={searchTerm} key={searchTerm.id} />
            ))}
          </Form>
        </div>
      </div>
    </div>
  );
}

const SearchTerm = ({ term }: { term: BFFMetadata }) => {
  const { t } = useTranslation();
  if (term.type === 'textVariable') {
    return (
      <Fieldset label={t(term.textId)} size='small'>
        <Input name={term.nameInData} />
      </Fieldset>
    );
  }

  if (term.type === 'collectionVariable') {
    return (
      <Fieldset label={t(term.textId)} size='small'>
        <Select name={term.nameInData} />
      </Fieldset>
    );
  }
  return <div>{term.nameInData}</div>;
};
