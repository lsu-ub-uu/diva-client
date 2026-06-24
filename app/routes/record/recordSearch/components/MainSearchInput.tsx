import type { BFFMetadata } from '@/cora/bffTypes.server';
import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './MainSearchInput.module.css';
import { useEffect, useRef } from 'react';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { IconButton } from '@/components/IconButton/IconButton';
import { CircularLoader } from '@/components/Loader/CircularLoader';

interface MainSearchInputProps {
  query: string;
  mainSearchTerm: BFFMetadata;
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
      label={t(mainSearchTerm.textId)}
      size='large'
      errorMessage={validationError && t(validationError)}
    >
      <div className={styles['search-query-wrapper']}>
        <Input
          type='search'
          name='q'
          placeholder={t(mainSearchTerm.defTextId)}
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
              tooltip={`Rensa ${t(mainSearchTerm.textId)}`}
              name='q'
              type='button'
              onClick={onClearMainQuery}
            >
              <XIcon />
            </IconButton>
          )}
          <IconButton
            type='submit'
            tooltip={t('divaClient_SearchButtonText')}
            className={styles['search-button']}
          >
            {searching ? <CircularLoader /> : <SearchIcon />}
          </IconButton>
        </div>
      </div>
    </Fieldset>
  );
};
