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
import { type ReactNode } from 'react';
import { Variable } from '@/components/FormGenerator/components/Variable';
import { useValueFromData } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';

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
  const value = useValueFromData(name);

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
