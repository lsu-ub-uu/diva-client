/*
 * Copyright 2024 Uppsala University Library
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

import { RecordLinkWithSearch } from '@/components/FormGenerator/components/RecordLinkWithSearch';
import { RecordLinkWithLinkedPresentation } from '@/components/FormGenerator/components/RecordLinkWithLinkedPresentation';
import { type FormComponentRecordLink } from '@/components/FormGenerator/types';
import { type ChangeEvent, type ReactNode, useState } from 'react';
import { Variable } from '@/components/FormGenerator/components/Variable';
import { useValueFromData } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Button } from '@/components/Button/Button';
import { useFetcher, useSubmit } from 'react-router';

interface RecordLinkProps {
  component: FormComponentRecordLink;
  name: string;
  parentPresentationStyle?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLink = ({
  name,
  component,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: RecordLinkProps) => {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  // const fetcher = useFetcher();
  const submit = useSubmit();

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileUrl(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('file', file);
      submit(formData, {
        action: '/fileUpload',
        method: 'post',
        encType: 'multipart/form-data',
        navigate: false,
      });
    }
  };

  const value = useValueFromData(name);

  if (component.recordLinkType === 'binary') {
    /*
     * Modal öppnar komponenten?
     * Skapa medan man skriver? spara posten?
     *
     */
    return (
      <div>
        <input type='file' name={name} onChange={onFileUpload} />
        {uploadedFileUrl && <img alt='' src={uploadedFileUrl} />}
      </div>
    );
  }

  if (
    checkIfComponentContainsSearchId(component) &&
    component.mode === 'input' &&
    !value
  ) {
    return (
      <RecordLinkWithSearch
        component={component}
        path={name}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (
    'linkedRecordPresentation' in component &&
    component.linkedRecordPresentation !== undefined
  ) {
    return (
      <RecordLinkWithLinkedPresentation
        component={component}
        name={name}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  return (
    <Variable
      component={component}
      path={name}
      parentPresentationStyle={parentPresentationStyle}
      attributes={attributes}
      actionButtonGroup={actionButtonGroup}
    />
  );
};

const checkIfComponentContainsSearchId = (
  component: FormComponentRecordLink,
) => {
  return 'search' in component ? component.search !== undefined : undefined;
};
