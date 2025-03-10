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
import type { BFFDataRecord } from '@/types/record';
import { Form, useActionData, useNavigation } from 'react-router';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { ValidationErrorSnackbar } from './ValidationErrorSnackbar';

import styles from './Form.module.css';
import { UpgradeIcon } from '@/icons';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { Alert } from '@/components/Alert/Alert';
import { memo, useCallback, useRef } from 'react';

export interface RecordFormProps {
  record?: BFFDataRecord;
  formSchema: RecordFormSchema;
  onChange?: (formData: FormData) => void;
}

const RecordForm = ({ record, formSchema, onChange }: RecordFormProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const actionData = useActionData();
  const formRef = useRef<HTMLFormElement>(null);

  const onFormChange = useCallback(() => {
    onChange?.(new FormData(formRef.current!));
  }, [formRef, onChange]);

  return (
    <Form
      method='POST'
      className={styles['form']}
      {...(submitting && { 'data-submitting': '' })}
      onChange={onFormChange}
      ref={formRef}
    >
      {actionData?.errors && (
        <Alert severity={'error'}>{JSON.stringify(actionData?.errors)}</Alert>
      )}
      <ValidationErrorSnackbar />
      <FormGenerator
        formSchema={formSchema}
        data={record?.data}
        boxGroups
        enhancedFields={{
          'output.admin': { type: 'group', alert: true },
          'output.admin.reviewed.value': { type: 'checkbox' },
        }}
        onFormChange={onFormChange}
        errors={actionData?.errors}
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
