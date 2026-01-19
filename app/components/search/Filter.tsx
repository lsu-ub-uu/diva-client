import { useTranslation } from 'react-i18next';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import { Select } from '../Input/Select';
import type {
  CollectionFilter,
  NumberFilter,
  TextFilter,
} from '@/data/search/createFilterDefinition.server';

interface FilterProps {
  filter: TextFilter | NumberFilter | CollectionFilter;
  defaultValue?: string;
}

export const Filter = ({ filter, defaultValue }: FilterProps) => {
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
