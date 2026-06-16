import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import type { TextFilter as TextFilterDef } from '@/routes/record/recordSearch/utils/createFilterDefinition.server';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TextFilterProps {
  filter: TextFilterDef;
  currentValue?: string;
  validationError?: string;
}

export const TextFilter = ({
  filter,
  currentValue,
  validationError,
}: TextFilterProps) => {
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
        name={filter.name}
        defaultValue={currentValue ?? ''}
        onChange={() => {
          userTypedRef.current = true;
        }}
        ref={inputRef}
      />
    </Fieldset>
  );
};
