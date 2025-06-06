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

import {
  isComponentCollVar,
  isComponentGuiElement,
  isComponentHidden,
  isComponentNumVar,
  isComponentRecordLink,
  isComponentText,
  isComponentTextVariable,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Text } from '@/components/FormGenerator/components/Text';
import { GuiElementLink } from '@/components/FormGenerator/components/GuiElementLink';
import { RecordLink } from '@/components/FormGenerator/components/RecordLink';
import type { ReactNode } from 'react';
import { HiddenComponent } from '@/components/FormGenerator/components/HiddenComponent';
import { Variable } from '@/components/FormGenerator/components/Variable';

interface LeafComponentProps {
  component: FormComponent;
  name: string;
  parentPresentationStyle?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const LeafComponent = ({
  component,
  name,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: LeafComponentProps) => {
  if (isComponentHidden(component)) {
    return (
      <HiddenComponent
        component={component}
        name={name}
        attributes={attributes}
      />
    );
  }

  if (
    isComponentTextVariable(component) ||
    isComponentNumVar(component) ||
    isComponentCollVar(component)
  ) {
    return (
      <Variable
        component={component}
        path={name}
        parentPresentationStyle={parentPresentationStyle}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (isComponentRecordLink(component)) {
    return (
      <RecordLink
        name={name}
        component={component}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
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
