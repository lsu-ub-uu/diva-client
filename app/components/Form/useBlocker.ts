import { useEffect } from 'react';
import type { FieldValues, FormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useBlocker } from 'react-router';

export const useFormBlocker = (formState: FormState<FieldValues>) => {
  const { t } = useTranslation();
  const shouldBlock = () => formState.isDirty && !formState.isSubmitting;
  const { state, proceed, reset } = useBlocker(shouldBlock);

  useEffect(() => {
    if (state === 'blocked') {
      const confirmed = window.confirm(
        t('divaClient_LeavePageConfirmationText'),
      );
      if (confirmed) {
        proceed();
      } else {
        reset();
      }
    }
  }, [state, proceed, reset, t]);
};
