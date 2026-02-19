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

import { RecordLinkWithLinkedPresentation } from '@/components/FormGenerator/components/RecordLinkWithLinkedPresentation';
import { RecordLinkWithSearch } from '@/components/FormGenerator/components/RecordLinkWithSearch';
import { Variable } from '@/components/FormGenerator/components/Variable';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { type FormComponentRecordLink } from '@/components/FormGenerator/types';
import { type ReactNode, use } from 'react';
import { useWatch } from 'react-hook-form';
import { FileUpload } from './FileUpload';
import { RecordLinkOnlyTranslatedText } from './RecordLinkOnlyTranslatedText';
import { OutputRecordLink } from './OutputRecordLink';

interface RecordLinkProps {
  component: FormComponentRecordLink;
  path: string;
  parentPresentationStyle?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLink = ({
  path,
  component,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: RecordLinkProps) => {
  const name = `${path}.value`;
  const value = useWatch({ name });

  const { linkedData } = use(FormGeneratorContext);

  if (component.recordLinkType === 'binary' && !value) {
    return (
      <FileUpload
        component={component}
        path={name}
        parentPresentationStyle={parentPresentationStyle}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (
    component.searchPresentation &&
    component.mode === 'input' &&
    !value &&
    !linkedData
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

  if (component.presentAs === 'onlyTranslatedText') {
    return <RecordLinkOnlyTranslatedText component={component} path={name} />;
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

  if (component.mode === 'output' && value) {
    return (
      <OutputRecordLink
        component={component}
        path={path}
        parentPresentationStyle={parentPresentationStyle}
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
