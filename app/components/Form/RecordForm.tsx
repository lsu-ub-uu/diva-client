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
import type { RecordFormSchema } from '../FormGenerator/types';
import type { BFFDataRecord, BFFDataRecordData } from '@/types/record';
import { Form, useNavigation } from 'react-router';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { ValidationErrorSnackbar } from './ValidationErrorSnackbar';

import styles from './Form.module.css';
import { UpgradeIcon } from '@/icons';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { type FormEvent, memo, useCallback, useRef, useState } from 'react';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { merge } from 'lodash-es';
import { parseAndValidateFormData } from '@/utils/parseAndValidateFormData';
import { scrollIntoView } from '@/utils/scrollIntoView';

export interface RecordFormProps {
  record?: BFFDataRecord;
  formSchema: RecordFormSchema;
  onChange?: (formData: FormData) => void;
  errors?: Record<string, string[]>;
  defaultValues?: BFFDataRecordData;
}

const RecordForm = ({
  record,
  formSchema,
  onChange,
  errors,
  defaultValues,
}: RecordFormProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const formRef = useRef<HTMLFormElement>(null);
  const [clientErrors, setClientErrors] = useState<
    Record<string, string[]> | undefined
  >();

  const yupSchema = generateYupSchemaFromFormSchema(formSchema);

  const onFormChange = useCallback(() => {
    if (formRef.current && onChange) {
      onChange?.(new FormData(formRef.current));
    }
  }, [formRef, onChange]);

  const data = defaultValues
    ? merge(record?.data ?? {}, defaultValues)
    : record?.data;

  const validationErrors = clientErrors || errors;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { errors } = parseAndValidateFormData(
      formSchema,
      new FormData(event.currentTarget),
    );

    if (errors) {
      event.preventDefault();

      const firstErrorElement = document.querySelector(
        `[name="${Object.keys(errors)[0]}"]`,
      );
      scrollIntoView(firstErrorElement);
      setClientErrors(errors);
    } else {
      setClientErrors(undefined);
    }
  };

  return (
    <Form
      method='POST'
      className={styles['form']}
      {...(submitting && { 'data-submitting': '' })}
      onChange={onFormChange}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <ValidationErrorSnackbar errors={validationErrors} />
      <FormGenerator
        formSchema={formSchema}
        data={data}
        boxGroups
        enhancedFields={{
          'output.admin': { type: 'group', alert: true },
          'output.admin.reviewed.value': { type: 'checkbox' },
        }}
        onFormChange={onFormChange}
        errors={validationErrors}
        yupSchema={yupSchema}
      />

      <FloatingActionButtonContainer>
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

const MemoizedForm = memo(RecordForm);
export { MemoizedForm as RecordForm };
