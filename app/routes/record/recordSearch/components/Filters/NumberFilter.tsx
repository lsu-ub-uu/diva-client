import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import type { NumberFilter as NumberFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface NumberFilterProps {
  filter: NumberFilterDef;
  currentValue?: string;
  validationError?: string;
}

export const NumberFilter = ({
  filter,
  currentValue,
  validationError,
}: NumberFilterProps) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const userTypedRef = useRef(false);

  useEffect(() => {
    if (!userTypedRef.current && inputRef.current) {
      inputRef.current.value = currentValue ?? '';
    }
    userTypedRef.current = false;
  }, [currentValue]);

  return (
    <Fieldset
      label={t(filter.textId)}
      size='small'
      errorMessage={validationError && t(validationError)}
    >
      <Input
        type='number'
        name={filter.name}
        min={filter.min}
        max={filter.max}
        defaultValue={currentValue ?? ''}
        onChange={() => {
          userTypedRef.current = true;
        }}
        ref={inputRef}
      />
    </Fieldset>
  );
};
