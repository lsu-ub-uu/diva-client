import { useTranslation } from 'react-i18next';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { Select } from '../Input/Select';
import type {
  CollectionFilter,
  NumberFilter,
  TextFilter,
} from '@/data/search/createFilterDefinition.server';
import { useState } from 'react';

interface FilterProps {
  filter: TextFilter | NumberFilter | CollectionFilter;
  currentValue?: string;
}

export const Filter = ({ filter, currentValue }: FilterProps) => {
  const { t } = useTranslation();
  const [prevValue, setPrevValue] = useState(currentValue);
  const [value, setValue] = useState(currentValue ?? '');
  const [focused, setFocused] = useState(false);

  if (currentValue !== prevValue) {
    setPrevValue(currentValue);
    if (!focused) {
      setValue(currentValue ?? '');
    }
  }

  switch (filter.type) {
    case 'text':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Input
            name={filter.name}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
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
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </Fieldset>
      );
    case 'collection':
      return (
        <Fieldset label={t(filter.textId)} size='small'>
          <Select
            name={filter.name}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          >
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
