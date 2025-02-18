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

import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RecordData } from '../FormGenerator/defaultValues/defaultValues';
import { createDefaultValuesFromFormSchema } from '../FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { RecordFormSchema } from '../FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { Form, useNavigation } from 'react-router';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { ValidationErrorSnackbar } from './ValidationErrorSnackbar';

import styles from './Form.module.css';
import { RestartAltIcon, UpgradeIcon } from '@/icons';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';

export interface RecordFormProps {
  record?: BFFDataRecord;
  formSchema: RecordFormSchema;
}

export const RecordForm = ({ record, formSchema }: RecordFormProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const defaultValues = createDefaultValuesFromFormSchema(
    formSchema,
    record?.data as RecordData,
  );

  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues,
    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });

  const { handleSubmit, reset } = methods;

  return (
    <Form
      method='POST'
      className={styles['form']}
      {...(submitting && { 'data-submitting': '' })}
      onSubmit={handleSubmit}
    >
      <RemixFormProvider {...methods}>
        <ValidationErrorSnackbar />
        <FormGenerator formSchema={formSchema} boxGroups />
      </RemixFormProvider>

      <FloatingActionButtonContainer>
        <FloatingActionButton
          type='button'
          onClick={() => reset(undefined, { keepDefaultValues: true })}
          icon={<RestartAltIcon />}
          text={t('divaClient_ResetButtonText')}
        />

        <FloatingActionButton
          variant='primary'
          type='submit'
          icon={<UpgradeIcon />}
          text={t('divaClient_SubmitButtonText')}
        />
      </FloatingActionButtonContainer>
    </Form>
  );
};
