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
import { useRouteLoaderData } from 'react-router';
import { type ReactNode, use, useState } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import type { loader } from '@/root';
import axios from 'axios';
import { Progress } from '@/components/Progress/Progress';
import { FileInput } from '@/components/Input/FileInput';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';

interface RecordLinkBinaryProps {
  component: FormComponentRecordLink;
  path: string;
  parentPresentationStyle: string | undefined;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const FileUpload = ({
  component,
  path,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: RecordLinkBinaryProps) => {
  const { t } = useTranslation();
  const { getValues, setValue, formState } = useRemixFormContext();
  const { showTooltips } = use(FormGeneratorContext);
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  const [progress, setProgress] = useState<number>(0);
  const value = getValues(path);
  const authToken = rootLoaderData?.auth?.data.token;

  const errorMessage = getErrorMessageForField(formState, path);
  if (component.mode === 'output' && !value) {
    return null;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const response = await axios.post(
        `${import.meta.env.BASE_URL}fileUpload`,
        {
          fileName: file.name,
          fileSize: String(file.size),
        },
      );
      const binaryRecord = response.data.binaryRecord;

      const formData = new FormData();
      formData.append('file', file);

      await axios.post(binaryRecord.actionLinks.upload.url, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authtoken: authToken,
        },

        onUploadProgress: (event) =>
          setProgress(Math.round((100 * event.loaded) / (event.total ?? 100))),
      });

      setValue(path, binaryRecord.id);
    }
  };

  return (
    <div
      className={styles['component']}
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo component={component} path={path} />

      {progress ? (
        <Progress
          value={progress}
          max={100}
          label={`Laddar upp. ${progress}`}
        />
      ) : (
        <Field
          className={styles['component']}
          data-colspan={component.gridColSpan ?? 12}
          label={component.showLabel && t(component.label)}
          errorMessage={errorMessage}
          variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
          info={showTooltips ? component.tooltip : undefined}
        >
          <FileInput
            name={path}
            onChange={handleFileChange}
            errorMessage={errorMessage}
            adornment={
              <>
                {attributes}
                {actionButtonGroup}
              </>
            }
          />
        </Field>
      )}
    </div>
  );
};
