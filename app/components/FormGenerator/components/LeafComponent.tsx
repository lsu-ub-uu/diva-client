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

import type { FormComponent } from '@/components/FormGenerator/types';

import { GuiElementLink } from '@/components/FormGenerator/components/GuiElementLink';
import { RecordLink } from '@/components/FormGenerator/components/RecordLink';
import { Text } from '@/components/FormGenerator/components/Text';
import { Variable } from '@/components/FormGenerator/components/Variable';
import {
  isComponentAnyTypeRecordLink,
  isComponentCollVar,
  isComponentGuiElement,
  isComponentNumVar,
  isComponentRecordLink,
  isComponentText,
  isComponentTextVariable,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { ReactNode } from 'react';
import { AnyTypeRecordLink } from './AnyTypeRecordLink';

interface LeafComponentProps {
  component: FormComponent;
  path: string;
  parentPresentationStyle?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const LeafComponent = ({
  component,
  path,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: LeafComponentProps) => {
  if (
    isComponentTextVariable(component) ||
    isComponentNumVar(component) ||
    isComponentCollVar(component)
  ) {
    return (
      <Variable
        component={component}
        path={`${path}.value`}
        parentPresentationStyle={parentPresentationStyle}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (isComponentRecordLink(component)) {
    return (
      <RecordLink
        path={path}
        component={component}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentAnyTypeRecordLink(component)) {
    return (
      <AnyTypeRecordLink
        path={path}
        component={component}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentText(component)) {
    return <Text component={component} />;
  }

  if (isComponentGuiElement(component)) {
    return <GuiElementLink component={component} />;
  }

  return null;
};
