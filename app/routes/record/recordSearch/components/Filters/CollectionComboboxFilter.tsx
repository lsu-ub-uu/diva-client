import { ComboboxSelect } from '@/components/FormGenerator/components/ComboboxSelect';
import { Fieldset } from '@/components/Input/Fieldset';
import type { CollectionFilter } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CollectionComboboxFilterProps {
  filter: CollectionFilter;
  currentValue?: string;
  forceSubmit: () => void;
  validationError?: string;
}

export const CollectionComboboxFilter = ({
  filter,
  currentValue,
  forceSubmit,
  validationError,
}: CollectionComboboxFilterProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(currentValue ?? '');
  const [prevCurrentValue, setPrevCurrentValue] = useState(currentValue);
  const [pendingSync, setPendingSync] = useState(false);

  if (prevCurrentValue !== currentValue) {
    setPrevCurrentValue(currentValue);
    if (!pendingSync) {
      setValue(currentValue ?? '');
    } else {
      setPendingSync(false);
    }
  }

  return (
    <Fieldset
      label={t(filter.textId)}
      size='small'
      errorMessage={validationError && t(validationError)}
    >
      <ComboboxSelect
        name={filter.name}
        value={value}
        onChange={(newValue) => {
          setValue(newValue as string);
          setPendingSync(true);
          forceSubmit();
        }}
        options={filter.options.map((option) => ({
          value: option.value,
          label: option.text,
        }))}
      />
    </Fieldset>
  );
};
