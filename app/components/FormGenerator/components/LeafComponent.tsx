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
import { HiddenInput } from '@/components/FormGenerator/components/HiddenInput';
import { Variable } from '@/components/FormGenerator/components/Variable';

interface LeafComponentProps {
  component: FormComponent;
  reactKey: string;
  name: string;
  parentPresentationStyle?: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const LeafComponent = ({
  component,
  reactKey,
  name,
  parentPresentationStyle,
  attributes,
  actionButtonGroup,
}: LeafComponentProps) => {
  if (isComponentHidden(component)) {
    return <HiddenInput component={component} name={name} />;
  }

  if (
    isComponentTextVariable(component) ||
    isComponentNumVar(component) ||
    isComponentCollVar(component)
  ) {
    return (
      <Variable
        reactKey={reactKey}
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
        reactKey={reactKey}
        attributes={attributes}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (isComponentText(component)) {
    return <Text reactKey={reactKey} component={component} />;
  }

  if (isComponentGuiElement(component)) {
    return <GuiElementLink reactKey={reactKey} component={component} />;
  }

  return null;
};
