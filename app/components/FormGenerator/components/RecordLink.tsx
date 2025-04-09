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
import { type ReactNode, use } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { useWatch } from 'react-hook-form';
import { Variable } from '@/components/FormGenerator/components/Variable';
import { FileUpload } from './FileUpload';
import { PermissionUnitRecordLink } from '@/components/FormGenerator/components/PermissionUnitRecordLink';

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

  // TODO check for presentAs instead of name
  if (component.name === 'permissionUnit' && component.mode === 'input') {
    return <PermissionUnitRecordLink component={component} path={name} />;
  }

  if (
    checkIfComponentContainsSearchId(component) &&
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
