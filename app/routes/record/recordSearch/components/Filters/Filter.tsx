import type { FilterDefinition } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useHydrated } from '@/utils/useHydrated';
import { AutocompleteFilter } from './AutocompleteFilter';
import { CollectionComboboxFilter } from './CollectionComboboxFilter';
import { CollectionSelectFilter } from './CollectionSelectFilter';
import { NumberFilter } from './NumberFilter';
import { TextFilter } from './TextFilter';

interface FilterProps {
  filter: FilterDefinition;
  currentValue?: string;
  forceSubmit: () => void;
  currentValueText?: string;
  validationError?: string;
}

export const Filter = ({
  filter,
  currentValue,
  forceSubmit,
  currentValueText,
  validationError,
}: FilterProps) => {
  const hydrated = useHydrated();

  switch (filter.type) {
    case 'text':
      return (
        <TextFilter
          filter={filter}
          currentValue={currentValue}
          validationError={validationError}
        />
      );
    case 'number':
      return (
        <NumberFilter
          filter={filter}
          currentValue={currentValue}
          validationError={validationError}
        />
      );
    case 'collection':
      if (hydrated && filter.options.length > 20) {
        return (
          <CollectionComboboxFilter
            filter={filter}
            currentValue={currentValue}
            validationError={validationError}
            forceSubmit={forceSubmit}
          />
        );
      }
      return (
        <CollectionSelectFilter
          filter={filter}
          currentValue={currentValue}
          validationError={validationError}
        />
      );
    case 'autocomplete':
      return (
        <AutocompleteFilter
          filter={filter}
          currentValue={currentValue}
          forceSubmit={forceSubmit}
          currentValueText={currentValueText}
          validationError={validationError}
        />
      );
  }
};
