/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Form, useLocation, useNavigation } from 'react-router';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import type { RecordFormSchema } from '../FormGenerator/types';
import { ValidationErrorSnackbar } from './ValidationErrorSnackbar';

import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import type { BFFDataRecordData } from '@/types/record';
import { SaveIcon } from 'lucide-react';
import { type KeyboardEvent, useEffect } from 'react';
import { CircularLoader } from '../Loader/CircularLoader';
import styles from './Form.module.css';
import { FormNavigationBlocker } from './FormNavigationBlocker';

export interface RecordFormProps {
  formSchema: RecordFormSchema;
  defaultValues: Record<string, any>;
  onChange?: (data: BFFDataRecordData) => void;
}

interface FormHotkey {
  matches: (event: KeyboardEvent<HTMLFormElement>) => boolean;
  run: (event: KeyboardEvent<HTMLFormElement>) => void;
}

const triggerFormSubmit = (formElement: HTMLFormElement) => {
  if (typeof formElement.requestSubmit === 'function') {
    formElement.requestSubmit();
    return;
  }

  const submitElement = formElement.querySelector<
    HTMLButtonElement | HTMLInputElement
  >('button[type="submit"], input[type="submit"]');

  if (submitElement) {
    submitElement.click();
  }
};

export const RecordForm = ({
  defaultValues,
  formSchema,
  onChange,
}: RecordFormProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const location = useLocation();
  const submitting =
    navigation.state !== 'idle' &&
    navigation.formAction?.includes(location.pathname);

  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues,

    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });
  const {
    handleSubmit,
    subscribe,
    formState: { dirtyFields },
  } = methods;

  const isTextareaTarget = (event: KeyboardEvent<HTMLFormElement>) => {
    const target = event.target as HTMLElement | null;

    return target?.tagName === 'TEXTAREA';
  };

  const submitOnAltS = (event: KeyboardEvent<HTMLFormElement>) => {
    if (submitting) {
      return;
    }

    event.preventDefault();
    const formElement = event.currentTarget;
    queueMicrotask(() => {
      triggerFormSubmit(formElement);
    });
  };

  const formHotkeys: FormHotkey[] = [
    {
      matches: (event) => event.key === 'Enter' && !isTextareaTarget(event),
      run: (event) => {
        event.preventDefault();
      },
    },
    {
      matches: (event) => {
        return (
          event.code === 'KeyS' &&
          event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey
        );
      },
      run: submitOnAltS,
    },
  ];

  const handleFormHotkeys = (event: KeyboardEvent<HTMLFormElement>) => {
    const matchedHotkey = formHotkeys.find((hotkey) => hotkey.matches(event));

    if (!matchedHotkey) {
      return;
    }

    matchedHotkey.run(event);
  };

  useEffect(() => {
    const unsubscribe = subscribe({
      formState: {
        values: true,
      },

      callback: (data: any) => {
        if (onChange) {
          onChange(data.values as BFFDataRecordData);
        }
      },
    });

    return unsubscribe;
  }, [subscribe, onChange]);

  return (
    <>
      <FormNavigationBlocker isDirty={Object.keys(dirtyFields).length > 0} />

      <Form
        method='POST'
        className={styles['form']}
        onSubmit={handleSubmit}
        onKeyDown={handleFormHotkeys}
      >
        <RemixFormProvider {...methods}>
          <ValidationErrorSnackbar />
          <FormGenerator formSchema={formSchema} boxGroups />
        </RemixFormProvider>

        <FloatingActionButtonContainer>
          <FloatingActionButton
            variant='primary'
            type='submit'
            aria-busy={submitting}
            icon={submitting ? <CircularLoader /> : <SaveIcon />}
            text={
              submitting
                ? t('divaClient_SubmittingButtonText')
                : t('divaClient_SubmitButtonText')
            }
            disabled={submitting}
          />
        </FloatingActionButtonContainer>
      </Form>
    </>
  );
};
