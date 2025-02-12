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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { FieldValues, FormState, UseFormGetValues } from 'react-hook-form';
import type {
  FormComponent,
  FormComponentCollVar,
  FormComponentContainer,
  FormComponentGroup,
  FormComponentGuiElement,
  FormComponentHidden,
  FormComponentLeaf,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentText,
  FormComponentTextVar,
  FormComponentWithData,
  FormSchema,
} from '../types';
import {
  addAttributesToName,
  getChildNameInDataArray,
  getChildrenWithSameNameInData,
} from '@/components/FormGenerator/defaultValues/defaultValues';
import type { DivaTypographyVariants } from '@/components/Typography/Typography';
import { cleanFormData } from '@/utils/cleanFormData';
import { get } from 'lodash-es';

export const getGroupLevel = (pathName: string) => {
  return countStringCharOccurrences(pathName, '.');
};

export const isFirstLevelGroup = (pathName: string) => {
  return countStringCharOccurrences(pathName, '.') === 1;
};

const countStringCharOccurrences = (
  inputString: string,
  targetChar: string,
) => {
  return inputString.split('').filter((char) => char === targetChar).length;
};

export const exportForTesting = {
  countStringCharOccurrences,
};

export const isComponentHidden = (
  component: FormComponent,
): component is FormComponentHidden => component.type === 'hidden';

export const isComponentTextVariable = (
  component: FormComponent,
): component is FormComponentTextVar => component.type === 'textVariable';

export const isComponentNumVar = (
  component: FormComponent,
): component is FormComponentNumVar => component.type === 'numberVariable';

export const isComponentCollVar = (
  component: FormComponent,
): component is FormComponentCollVar => component.type === 'collectionVariable';

export const isComponentRecordLink = (
  component: FormComponent,
): component is FormComponentRecordLink => component.type === 'recordLink';

export const isComponentText = (
  component: FormComponent,
): component is FormComponentText => component.type === 'text';

export const isComponentGuiElement = (
  component: FormComponent,
): component is FormComponentGuiElement => component.type === 'guiElementLink';

export const isComponentVariable = (
  component: FormComponent,
): component is FormComponentLeaf =>
  [
    'numberVariable',
    'textVariable',
    'collectionVariable',
    'recordLink',
  ].includes(component.type);

export const isComponentWithData = (
  component: FormComponent,
): component is FormComponentWithData =>
  component.type !== 'guiElementLink' && component.type !== 'text';

export const isComponentGroup = (
  component: FormComponent,
): component is FormComponentGroup => component.type === 'group';

export const isComponentContainer = (
  component: FormComponent,
): component is FormComponentContainer => component.type === 'container';

export const isComponentSurroundingContainer = (
  component: FormComponent,
): component is FormComponentContainer => {
  return isComponentContainer(component) && 'containerType' in component
    ? component.containerType === 'surrounding'
    : false;
};

export const isComponentRepeatingContainer = (component: FormComponent) => {
  return isComponentContainer(component) && 'containerType' in component
    ? component.containerType === 'repeating'
    : false;
};

export const isComponentValidForDataCarrying = (component: FormComponent) =>
  isComponentVariable(component) ||
  isComponentGroup(component) ||
  isComponentContainer(component); // a container can have children that are data carriers

export const isComponentRepeating = (component: FormComponent) => {
  if (!isComponentWithData(component)) {
    return false;
  }
  const rMax = component.repeat?.repeatMax ?? 1;
  const rMin = component.repeat?.repeatMin ?? 1;
  return !(rMax === 1 && rMin === 1);
};

export const isComponentRequired = (component: FormComponent) => {
  if (!isComponentWithData(component)) {
    return false;
  }
  const rMin = component.repeat?.repeatMin ?? 1;
  return rMin > 0;
};

export const isComponentSingularAndOptional = (component: FormComponent) => {
  if (!isComponentWithData(component)) {
    return false;
  }

  const rMax = component.repeat?.repeatMax ?? 1;
  const rMin = component.repeat?.repeatMin ?? 1;
  return rMax === 1 && rMin === 0;
};

export const isComponentGroupAndOptional = (component: FormComponent) => {
  if (!isComponentGroup(component)) {
    return false;
  }

  const rMin = component.repeat?.repeatMin ?? 0;
  return rMin === 0;
};

export const checkIfComponentHasValue = (
  getValues: UseFormGetValues<FieldValues>,
  componentName: string,
) => {
  return (
    getValues(componentName) !== '' && getValues(componentName) !== undefined
  );
};

export const checkIfSingularComponentHasValue = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
): boolean => {
  if (isGVUndefined(getValues, componentValue)) {
    return false;
  }

  if (hasGVArrayLength(getValues, componentValue)) {
    return false;
  }

  if (isGVValueUndefined(getValues, componentValue)) {
    return false;
  }

  return isGVValueEmptyString(getValues, componentValue);
};

const isGVUndefined = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue) === undefined;
};

const hasGVArrayLength = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return (
    getValues(componentValue).length === undefined ||
    getValues(componentValue).length === 0
  );
};

const isGVValueUndefined = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue)[0].value === undefined;
};

const isGVValueEmptyString = (
  getValues: UseFormGetValues<FieldValues>,
  componentValue: string,
) => {
  return getValues(componentValue)[0].value !== '';
};

export const checkForExistingSiblings = (formValues: any) => {
  if (formValues !== undefined) {
    const valuesWithoutAttribs = Object.keys(formValues)
      .filter((objKey) => !objKey.startsWith('_'))
      .reduce<Record<string, any>>((newObj, key) => {
        newObj[key] = formValues[key];
        return newObj;
      }, {});
    const cleanedValues = cleanFormData(valuesWithoutAttribs);
    const valueLength = Object.keys(cleanedValues).length;
    return valueLength > 0;
  }
  return false;
};

export const checkIfValueExists = (value: unknown) => {
  return !(value === null || value === '' || value === undefined);
};

export function getNameInData(component: FormComponent) {
  return addAttributesToName(component, component.name);
}

export const checkIfPresentationStyleIsInline = (
  component: FormComponentWithData,
) => {
  return component.presentationStyle === 'inline';
};

export const checkIfPresentationStyleOrParentIsInline = (
  component: FormComponentWithData,
  parentPresentationStyle: string | undefined,
) => {
  return (
    component.presentationStyle === 'inline' ||
    parentPresentationStyle === 'inline'
  );
};
export const headlineLevelToTypographyVariant = (
  headlineLevel: string | undefined,
): DivaTypographyVariants['variant'] => {
  let typographyVariant: DivaTypographyVariants['variant'];
  if (headlineLevel !== undefined) {
    typographyVariant =
      `${headlineLevel}TextStyle` as DivaTypographyVariants['variant'];
  } else {
    typographyVariant = 'h2TextStyle';
  }

  return typographyVariant as DivaTypographyVariants['variant']; // check style to return as default
};
export const convertChildStyleToString = (
  childStyle: string[] | undefined,
): string | null => {
  return childStyle?.[0] === undefined ? '' : childStyle[0].toString();
};

export const getChildrenWithSameNameInDataFromSchema = (
  formSchema: FormSchema,
) => {
  return getChildrenWithSameNameInData(
    getChildNameInDataArray(formSchema?.form),
  );
};

export const getErrorMessageForField = (
  formState: FormState<FieldValues>,
  name: string,
) => {
  const error = get(formState.errors, name);
  if (error?.message) {
    return error.message as string;
  }
  return undefined;
};
