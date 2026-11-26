import type { FilterDefinition } from '../utils/createFilterDefinition.server';
import { SearchIcon, WarningIcon, CloseIcon } from '@/icons/icons';
import { useTranslation } from 'react-i18next';
import styles from './MainSearchInput.module.css';
import { useEffect, useRef } from 'react';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { IconButton } from '@/components/IconButton/IconButton';
import { CircularLoader } from '@/components/Loader/CircularLoader';

interface MainSearchInputProps {
  query: string;
  mainSearchTerm: FilterDefinition;
  searching: boolean;
  onClearMainQuery: () => void;
  validationError?: string;
}

export const MainSearchInput = ({
  query,
  mainSearchTerm,
  searching,
  onClearMainQuery,
  validationError,
}: MainSearchInputProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const userTypedRef = useRef(false);

  useEffect(() => {
    if (!userTypedRef.current && inputRef.current) {
      inputRef.current.value = query || '';
    }
    userTypedRef.current = false;
  }, [query]);

  return (
    <Fieldset
      label={
        mainSearchTerm.labelTextId ? t(mainSearchTerm.labelTextId) : undefined
      }
      size='large'
      errorMessage={validationError && t(validationError)}
      hideErrorIcon
    >
      <div className={styles['search-query-wrapper']}>
        <Input
          type='search'
          name='q'
          placeholder={
            mainSearchTerm.placeholderTextId
              ? t(mainSearchTerm.placeholderTextId)
              : undefined
          }
          defaultValue={query}
          onChange={() => {
            userTypedRef.current = true;
          }}
          onBlur={() => {
            userTypedRef.current = false;
          }}
          ref={inputRef}
          aria-invalid={validationError ? 'true' : 'false'}
        />
        <div className={styles['search-buttons']}>
          {query.length > 0 && (
            <IconButton
              tooltip={t('divaClient_clearFilterText', {
                filterName: t(
                  mainSearchTerm.labelTextId ?? mainSearchTerm.name,
                ),
              })}
              name='q'
              type='button'
              onClick={onClearMainQuery}
            >
              <CloseIcon />
            </IconButton>
          )}
          <IconButton
            type='submit'
            tooltip={t('divaClient_SearchButtonText')}
            className={styles['search-button']}
          >
            {searchIcon(searching, validationError)}
          </IconButton>
        </div>
      </div>
    </Fieldset>
  );
};

const searchIcon = (searching: boolean, validationError?: string) => {
  if (validationError) {
    return <WarningIcon />;
  } else {
    return searching ? <CircularLoader /> : <SearchIcon />;
  }
};
