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

import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { getErrorMessageForField } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { Fieldset } from '@/components/Input/Fieldset';
import { FileInput } from '@/components/Input/FileInput';
import { Progress } from '@/components/Progress/Progress';
import type { BFFDataRecord } from '@/types/record';
import { withBaseName } from '@/utils/withBasename';
import axios from 'axios';
import { type ReactNode, use, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { href } from 'react-router';
import { useRemixFormContext } from 'remix-hook-form';

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
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const value = getValues(path);

  const errorMessage = getErrorMessageForField(formState, path);
  if (component.mode === 'output' && !value) {
    return null;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);

      const currentUrl = window.location.href;

      const urlParts = currentUrl.split('/');
      const recordType = urlParts[urlParts.length - 2];
      const recordId = urlParts[urlParts.length - 1];

      const response = await axios.post(withBaseName(href('/binaryRecord')), {
        fileName: file.name,
        fileSize: String(file.size),
        hostRecordType: recordType,
        hostRecordId: recordId,
      });
      const binaryRecord: BFFDataRecord = response.data.binaryRecord;

      const formData = new FormData();
      formData.append('file', file);
      const uploadUrlParts = binaryRecord.actionLinks.upload.url.split('/');
      const name = uploadUrlParts.pop() as string;
      const id = uploadUrlParts.pop() as string;

      await axios.post(
        withBaseName(href('/binary/:id/:name', { id, name })),
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },

          onUploadProgress: (event) =>
            setProgress(
              Math.round((100 * event.loaded) / (event.total ?? 100)),
            ),
        },
      );

      setValue(path, binaryRecord.id);
    }
  };

  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo component={component} path={path} />

      {progress ? (
        <Progress
          value={progress}
          max={100}
          label={t('divaClient_uploadingFileText', { fileName, progress })}
        />
      ) : (
        <Fieldset
          className='form-component-item'
          data-colspan={component.gridColSpan ?? 12}
          label={component.showLabel ? t(component.label) : undefined}
          errorMessage={errorMessage}
          variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
          info={showTooltips ? component.tooltip : undefined}
          attributes={attributes}
          actionButtonGroup={actionButtonGroup}
        >
          <FileInput
            name={path}
            onChange={handleFileChange}
            errorMessage={errorMessage}
          />
        </Fieldset>
      )}
    </div>
  );
};
