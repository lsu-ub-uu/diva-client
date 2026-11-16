import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { IconButton } from '@/components/IconButton/IconButton';
import { EditIcon, NoResultsIcon } from '@/icons/icons';
import { useTranslation } from 'react-i18next';
import { href, Link, useRouteLoaderData } from 'react-router';
import { RecordActionMenu } from '../../ActionBar/RecordActionMenu';
import type { loader as recordTypeLoader } from '../../recordType';
import type { PerformSearchResult } from '../utils/performSearch.server';
import { SearchResultItem } from './SearchResultItem';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  searchResults: PerformSearchResult;
  searching?: boolean;
  start: number;
  userHasSearched: boolean;
  validationErrors: Map<string, string>;
}

export const SearchResults = ({
  searchResults,
  searching,
  start,
  userHasSearched,
  validationErrors,
}: SearchResultsProps) => {
  const { t } = useTranslation();
  const recordTypeLoaderData = useRouteLoaderData<typeof recordTypeLoader>(
    'routes/record/recordType',
  );
  const recordTypeUserRights = recordTypeLoaderData?.recordTypeUserRights ?? [];

  if (validationErrors.size > 0) {
    return (
      <Alert severity='warning'>
        {t('divaClient_searchResultValidationErrorText')}
      </Alert>
    );
  }

  if (searchResults.alert) {
    return (
      <Alert severity={searchResults.alert.severity}>
        <AlertTitle>{t(searchResults.alert.summary)}</AlertTitle>
        {searchResults.alert.details}
      </Alert>
    );
  }

  return (
    <div className={styles['search-result']}>
      {!userHasSearched && searchResults.totalNo === 0 && (
        <Alert severity='info' icon={<NoResultsIcon />}>
          <AlertTitle>{t('divaClient_noPostResultsTitleText')}</AlertTitle>
          {t('divaClient_noPostResultsBodyText')}
        </Alert>
      )}

      {userHasSearched && searchResults.data.length === 0 && (
        <Alert severity='info' icon={<NoResultsIcon />}>
          <AlertTitle>{t('divaClient_noSearchResultsTitleText')}</AlertTitle>
          {t('divaClient_noSearchResultsBodyText')}
        </Alert>
      )}

      <ol
        className={styles['result-list']}
        aria-busy={searching}
        start={start}
        style={{ counterReset: `result ${start - 1}` }}
      >
        {searchResults.data.map((record) => (
          <li key={record.id} className={styles['result-list-item']}>
            <div className={styles['result-list-item-content']}>
              <SearchResultItem record={record} />
              <div className={styles['record-action-buttons']}>
                {record.userRights && record.userRights.includes('update') && (
                  <IconButton
                    as={Link}
                    to={href('/:recordType/:recordId/update', {
                      recordType: record.recordType,
                      recordId: record.id,
                    })}
                    size='small'
                    tooltip={t('divaClient_editRecordText')}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <RecordActionMenu
                  record={record}
                  recordTypeUserRights={recordTypeUserRights}
                  variant='resultList'
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
