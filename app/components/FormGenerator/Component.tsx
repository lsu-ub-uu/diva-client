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
import { RepeatingGroup } from '@/components/FormGenerator/components/RepeatingGroup';
import { RepeatingVariable } from '@/components/FormGenerator/components/RepeatingVariable';
import { ResourceLink } from '@/components/FormGenerator/components/ResourceLink';
import { SurroundingContainer } from '@/components/FormGenerator/components/SurroundingContainer';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import {
  isComponentContainer,
  isComponentGroup,
  isComponentOptional,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentResourceLink,
  isComponentSingularAndOptional,
  isComponentSurroundingContainer,
  isComponentVariable,
  isComponentWithData,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentContainer,
  FormComponentGroup,
  FormComponentLeaf,
} from '@/components/FormGenerator/types';
import { use } from 'react';
import { AlternativePresentationSwitcher } from './AlternativePresentationSwitcher';
import { DevInfo } from './components/DevInfo';
import { OptionalGroup } from './components/OptionalGroup';

interface FormComponentGeneratorProps {
  component: FormComponent;
  idx: number;
  path: string;
  parentPresentationStyle?: string;
}

export const Component = ({
  component,
  idx,
  path,
  parentPresentationStyle,
}: FormComponentGeneratorProps) => {
  const { enhancedFields } = use(FormGeneratorContext);
  const currentComponentNamePath = getCurrentComponentNamePath(component, path);

  if (hasClickableTitle(component) || hasAlternativePresentation(component)) {
    return (
      <AlternativePresentationSwitcher
        component={component}
        idx={idx}
        path={path}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (enhancedFields?.[currentComponentNamePath]?.type === 'hidden') {
    return (
      <DevInfo
        component={component}
        path={path}
        label='Hidden by enhancement'
      />
    );
  }
  if (isComponentSurroundingContainerAndNOTRepeating(component)) {
    return (
      <SurroundingContainer
        component={component}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (
    isComponentGroup(component) &&
    isComponentSingularAndOptional(component)
  ) {
    return (
      <OptionalGroup
        currentComponentNamePath={currentComponentNamePath}
        component={component as FormComponentGroup}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentGroupAndRepeating(component)) {
    return (
      <RepeatingGroup
        currentComponentNamePath={currentComponentNamePath}
        component={component}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentGroupOrRepeatingContainerAndNOTRepeating(component)) {
    return (
      <Group
        currentComponentNamePath={currentComponentNamePath}
        component={component as FormComponentGroup}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

  if (isComponentVariableAndRepeating(component)) {
    return (
      <RepeatingVariable
        component={component}
        currentComponentNamePath={currentComponentNamePath}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  }

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

const isComponentSurroundingContainerAndNOTRepeating = (
  component: FormComponent,
): component is FormComponentContainer => {
  return (
    isComponentSurroundingContainer(component) &&
    !isComponentRepeating(component)
  );
};

const isComponentGroupOrRepeatingContainerAndNOTRepeating = (
  component: FormComponent,
): component is FormComponentGroup | FormComponentContainer => {
  return (
    (isComponentGroup(component) || isComponentRepeatingContainer(component)) &&
    !isComponentRepeating(component)
  );
};

const isComponentGroupAndRepeating = (
  component: FormComponent,
): component is FormComponentGroup => {
  return (
    isComponentGroup(component) &&
    (isComponentRepeating(component) || isComponentOptional(component))
  );
};

const isComponentVariableAndRepeating = (
  component: FormComponent,
): component is FormComponentLeaf => {
  return (
    isComponentVariable(component) &&
    (isComponentRepeating(component) || isComponentOptional(component))
  );
};
