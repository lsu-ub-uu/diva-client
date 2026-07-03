import { Fieldset } from '@/components/Input/Fieldset';
import { Select } from '@/components/Input/Select';
import type { CollectionFilter } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface CollectionSelectFilterProps {
  filter: CollectionFilter;
  currentValue?: string;
  validationError?: string;
}

export const CollectionSelectFilter = ({
  filter,
  currentValue,
  validationError,
}: CollectionSelectFilterProps) => {
  const { t } = useTranslation();
  const selectRef = useRef<HTMLSelectElement>(null);
  const userChangedRef = useRef(false);

  useEffect(() => {
    if (!userChangedRef.current && selectRef.current) {
      selectRef.current.value = currentValue ?? '';
    }
    userChangedRef.current = false;
  }, [currentValue]);

  return (
    <Fieldset
      label={t(filter.textId)}
      size='small'
      errorMessage={validationError && t(validationError)}
    >
      <Select
        name={filter.name}
        defaultValue={currentValue ?? ''}
        onChange={() => {
          userChangedRef.current = true;
        }}
        onBlur={() => {
          userChangedRef.current = false;
        }}
        ref={selectRef}
      >
        {filter.options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.text)}
          </option>
        ))}
      </Select>
    </Fieldset>
  );
};
