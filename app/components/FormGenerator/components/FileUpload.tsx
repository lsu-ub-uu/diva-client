/*
 * Copyright 2025 Uppsala University Library
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
 */

import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { Field } from '@/components/Input/Field';
import styles from './FormComponent.module.css';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';
import { useEffect } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import { CircularLoader } from '@/components/Loader/CircularLoader';

interface FileUploadProps {
  component: FormComponentRecordLink;
  path: string;
}

export const FileUpload = ({ component, path }: FileUploadProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { setValue } = useRemixFormContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      fetcher.submit(formData, {
        action: '/fileUpload',
        method: 'POST',
        encType: 'multipart/form-data',
      });
    }
  };
  useEffect(() => {
    if (fetcher.data) {
      setValue(path, fetcher.data.binaryRecordId);
    }
  }, [setValue, path, fetcher.data]);

  return (
    <Field
      className={styles['component']}
      data-colspan={component.gridColSpan ?? 12}
      label={component.showLabel && t(component.label)}
      /* errorMessage={errorMessage}
      variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
      info={showTooltips ? component.tooltip : undefined}*/
    >
      <input
        type='file'
        name={path}
        onChange={handleFileChange}
        disabled={fetcher.state !== 'idle'}
      />
      {fetcher.state === 'submitting' && (
        <>
          {t('divaClient_uploadingText')}
          <CircularLoader />
        </>
      )}
    </Field>
  );
};
