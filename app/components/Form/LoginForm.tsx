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

import { Button } from '@mui/material';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RecordData } from '../FormGenerator/defaultValues/defaultValues';
import { createDefaultValuesFromFormSchema } from '../FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { RecordFormSchema } from '../FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { Form } from 'react-router';
import styles from './LoginForm.module.css';

interface RecordFormProps {
  record?: BFFDataRecord;
  formSchema: RecordFormSchema;
  onSubmit: (formValues: FieldValues) => void;
  onInvalid?: (fieldErrors: FieldErrors) => void;
  linkedData?: boolean;
}

export const LoginForm = ({ ...props }: RecordFormProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      props.formSchema,
      props.record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(props.formSchema)),
  });
  const { handleSubmit } = methods;

  return (
    <Form
      className={styles.wrapper}
      onSubmit={handleSubmit(
        (values) => props.onSubmit(values),
        (errors) => props.onInvalid && props.onInvalid(errors),
      )}
    >
      <FormProvider {...methods}>
        <FormGenerator formSchema={props.formSchema} />
      </FormProvider>

      <Button
        type='submit'
        disableRipple
        variant='contained'
        color='secondary'
        sx={{ height: 40 }}
      >
        {t('divaClient_LoginButtonText')}
      </Button>
    </Form>
  );
};
