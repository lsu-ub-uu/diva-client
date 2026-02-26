import type { BFFMetadata } from '@/cora/bffTypes.server';
import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './MainSearchInput.module.css';
import { useEffect, useRef, useState } from 'react';
import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import { IconButton } from '@/components/IconButton/IconButton';
import { CircularLoader } from '@/components/Loader/CircularLoader';

interface MainSearchInputProps {
  query: string;
  mainSearchTerm: BFFMetadata;
  searching: boolean;
  onClearMainQuery: () => void;
}

export const MainSearchInput = ({
  query,
  mainSearchTerm,
  searching,
  onClearMainQuery,
}: MainSearchInputProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchField = inputRef.current;
    if (searchField !== null && searchField !== document.activeElement) {
      searchField.value = query || '';
    }
  }, [query]);

  return (
    <Fieldset label={t(mainSearchTerm.textId)} size='large'>
      <div className={styles['search-query-wrapper']}>
        <Input
          type='search'
          name='q'
          placeholder={t(mainSearchTerm.defTextId)}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          ref={inputRef}
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
