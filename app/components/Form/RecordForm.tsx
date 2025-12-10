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
import {
  BookCheckIcon,
  CodeIcon,
  MehIcon,
  SaveIcon,
  Trash2Icon,
} from 'lucide-react';
import { useEffect } from 'react';
import { CircularLoader } from '../Loader/CircularLoader';
import styles from './Form.module.css';
import { Button } from '../Button/Button';

export interface RecordFormProps {
  formSchema: RecordFormSchema;
  defaultValues: Record<string, any>;
  onChange?: (data: BFFDataRecordData) => void;
}

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
  const { handleSubmit, subscribe } = methods;

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
      <div style={{ gridColumn: '1 / 3' }}>
        <div
          style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
        >
          <Button className='api-button' variant='tertiary'>
            <MehIcon />
            Fourth button
          </Button>
          <Button className='api-button' variant='tertiary'>
            <BookCheckIcon />
            Validate
          </Button>
          <Button className='api-button' variant='tertiary' target='_blank'>
            <Trash2Icon />
            {t('divaClient_trashRecordText')}
          </Button>
          <Button className='api-button' variant='tertiary'>
            <CodeIcon />
            {t('divaClient_viewInApiText')}
          </Button>
        </div>
      </div>
      <Form method='POST' className={styles['form']} onSubmit={handleSubmit}>
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
