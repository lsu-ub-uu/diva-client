import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import { SearchIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '../IconButton/IconButton';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { CircularLoader } from '../Loader/CircularLoader';
import styles from './MainSearchInput.module.css';
import { useState } from 'react';

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
  const [prevValue, setPrevValue] = useState(query);
  const [value, setValue] = useState(query);

  if (query !== prevValue) {
    setPrevValue(query);
    setValue(query);
  }

  return (
    <Fieldset label={t(mainSearchTerm.textId)} size='large'>
      <div className={styles['search-query-wrapper']}>
        <Input
          type='search'
          name='q'
          placeholder={t(mainSearchTerm.defTextId)}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
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
