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
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import { Group } from '@/components/FormGenerator/components/Group';
import { LeafComponent } from '@/components/FormGenerator/components/LeafComponent';
import { ResourceLink } from '@/components/FormGenerator/components/ResourceLink';
import { SurroundingContainer } from '@/components/FormGenerator/components/SurroundingContainer';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import {
  isComponentContainer,
  isComponentGroup,
  isComponentResourceLink,
  isComponentSurroundingContainer,
  isComponentWithData,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentGroup,
} from '@/components/FormGenerator/types';
import { use } from 'react';
import { AlternativePresentationSwitcher } from './AlternativePresentationSwitcher';
import { DevInfo } from './components/DevInfo';

interface ComponentProps {
  component: FormComponent;
  parentPath: string;
  currentComponentNamePath: string;
  parentPresentationStyle?: string;
  anchorId?: string;
  actionButtonGroup?: React.ReactNode;
}

export const Component = ({
  component,
  parentPath,
  currentComponentNamePath,
  parentPresentationStyle,
  anchorId,
  actionButtonGroup,
}: ComponentProps) => {
  const { enhancedFields } = use(FormGeneratorContext);

  if (hasClickableTitle(component) || hasAlternativePresentation(component)) {
    return (
      <AlternativePresentationSwitcher
        component={component}
        anchorId={anchorId}
        parentPath={parentPath}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  if (enhancedFields?.[currentComponentNamePath]?.type === 'hidden') {
    return (
      <DevInfo
        component={component}
        path={currentComponentNamePath}
        label='Hidden by enhancement'
      />
    );
  }
  if (isComponentSurroundingContainer(component)) {
    return (
      <SurroundingContainer
        component={component}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentGroup(component)) {
    return (
      <Group
        currentComponentNamePath={currentComponentNamePath}
        component={component as FormComponentGroup}
        parentPresentationStyle={parentPresentationStyle}
        anchorId={anchorId}
        actionButtonGroup={actionButtonGroup}
      />
    );
  }

  /** TODO: move into LeafComponent */
  if (isComponentResourceLink(component)) {
    return (
      <ResourceLink component={component} path={currentComponentNamePath} />
    );
  }

  return (
    <LeafComponent
      component={component}
      name={`${currentComponentNamePath}.value`}
      parentPresentationStyle={parentPresentationStyle}
      attributes={
        isComponentWithData(component) && (
          <Attributes component={component} path={currentComponentNamePath} />
        )
      }
      actionButtonGroup={actionButtonGroup}
    />
  );
};

export const getCurrentComponentNamePath = (
  component: FormComponent,
  path: string,
) => {
  if (!isComponentWithData(component)) {
    return '';
  }

  const addAttributesForMatchingNameInDataWithoutPath = `${addAttributesToName(component, component.name)}`;

  const addAttributesForMatchingNameInDataWithPath = `${path}.${addAttributesToName(component, component.name)}`;

  if (isComponentContainer(component)) {
    return path;
  } else {
    return !path
      ? addAttributesForMatchingNameInDataWithoutPath
      : addAttributesForMatchingNameInDataWithPath;
  }
};

const hasClickableTitle = (component: FormComponent) => {
  return 'title' in component && component.title;
};

const hasAlternativePresentation = (component: FormComponent) => {
  return component.alternativePresentation !== undefined;
};
