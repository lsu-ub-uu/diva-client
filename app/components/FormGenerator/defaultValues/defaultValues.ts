/*
 * Copyright 2023 Uppsala University Library
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

import type { User } from '@/auth/createUser';
import {
  isComponentContainer,
  isComponentHidden,
  isComponentRecordLink,
  isComponentRepeating,
  isComponentRequired,
  isComponentValidForDataCarrying,
  isComponentVariable,
  isComponentWithData,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { BFFMember } from '@/cora/transform/bffTypes.server';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';
import { getAutoPermissionUnit } from '@/utils/getAutoPermissionUnit';
import type {
  FormAttributeCollection,
  FormComponent,
  FormComponentContainer,
  FormComponentGroup,
  FormComponentWithData,
  FormSchema,
} from '../types';
import { generateRepeatId } from './generateRepeatId';

export interface RecordData {
  [key: string]: any;
}

export const createDefaultValuesFromFormSchema = (
  formSchema: FormSchema,
  existingRecordData: RecordData | undefined = undefined,
  member?: BFFMember,
  user?: User,
) => {
  const formSchemaDefaultValues = createDefaultValuesFromComponent(
    formSchema.form,
    false,
    member,
    user,
  );

  if (existingRecordData !== undefined) {
    const mergedDefaultValues = mergeObjects(
      formSchemaDefaultValues,
      existingRecordData,
    );

    return mergedDefaultValues;
  }

  return formSchemaDefaultValues;
};

export const createDefaultValuesFromComponent = (
  component: FormComponentWithData | FormComponentContainer,
  forceDefaultValuesForAppend = false,
  member?: BFFMember,
  user?: User,
) => {
  let defaultValues: {
    [x: string]:
      | string
      | number
      | (Record<string, never> | undefined)[]
      | undefined
      | unknown[];
  } = {};

  const formDefaultObject = createFormDefaultObject(component, member, user);

  if (forceDefaultValuesForAppend) {
    defaultValues = { ...formDefaultObject, repeatId: generateRepeatId() };
  } else {
    if (isComponentHidden(component)) {
      defaultValues[addAttributesToName(component, component.name)] =
        formDefaultObject;
    } else if (
      component.repeat?.repeatMin === 0 &&
      component.repeat?.repeatMax === 1
    ) {
      createDefaultObjectForOptional(
        component,
        defaultValues,
        formDefaultObject,
      );
    } else if (isComponentRepeating(component)) {
      createDefaultObjectForRepeating(
        component,
        defaultValues,
        formDefaultObject,
      );
    } else {
      createDefaultValueForNonRepeating(
        defaultValues,
        component,
        formDefaultObject,
      );
    }
  }

  // remove surrounding container in or data structure
  if (isComponentContainer(component)) {
    defaultValues = removeRootObject(defaultValues);
  }

  // Merge alternative presentation default values into component default values
  if (
    'alternativePresentation' in component &&
    component.alternativePresentation !== undefined
  ) {
    const alternativePresentationDefaultValues =
      createDefaultValuesFromComponent({
        ...component.alternativePresentation,
        alternativePresentation: undefined,
      } as FormComponentWithData);

    defaultValues = mergeObjects(
      defaultValues,
      alternativePresentationDefaultValues,
    );
  }

  return defaultValues;
};

export const removeRootObject = (obj: Record<string, any>) => {
  const childKeys = Object.keys(obj);
  return obj[childKeys[0]];
};

export const createDefaultValueFromFinalValue = (
  component: FormComponentWithData | FormAttributeCollection,
) => (component.finalValue ? component.finalValue : '');

export const generateComponentAttributes = (
  component: FormComponentWithData | FormComponentContainer,
) => {
  if (!isComponentWithData(component)) {
    return {};
  }

  const attributeValues =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]:
          createDefaultValueFromFinalValue(attributeCollection),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValues),
  };
};

export const generateRepeatingObject = (
  size: number,
  obj: object,
): unknown[] => {
  return Array.from({ length: size }, () => ({
    ...obj,
    repeatId: generateRepeatId(),
  }));
};

export const getMinNumberOfRepeatingToShow = (
  component: FormComponentWithData | FormComponentContainer,
) =>
  component.repeat?.minNumberOfRepeatingToShow ??
  component.repeat?.repeatMin ??
  0;

function createDefaultObjectForOptional(
  component: FormComponentWithData | FormComponentContainer,
  defaultValues: any,
  formDefaultObject:
    | { [p: string]: string; value: string }
    | { [p: string]: string },
) {
  const addedByDefault = getMinNumberOfRepeatingToShow(component) > 0;

  if (addedByDefault) {
    defaultValues[addAttributesToName(component, component.name)] =
      formDefaultObject;
  }
}

function createDefaultObjectForRepeating(
  component: FormComponentWithData | FormComponentContainer,
  defaultValues: {
    [p: string]:
      | string
      | number
      | (Record<string, never> | undefined)[]
      | unknown[]
      | undefined;
  },
  formDefaultObject:
    | { [p: string]: string; value: string }
    | { [p: string]: string },
) {
  const numberToShowFromStart = getMinNumberOfRepeatingToShow(component);

  defaultValues[addAttributesToName(component, component.name)] =
    generateRepeatingObject(numberToShowFromStart, formDefaultObject);
}

function createDefaultValueForNonRepeating(
  defaultValues: any,
  component: FormComponentWithData | FormComponentContainer,
  formDefaultObject:
    | { [p: string]: string; value: string }
    | { [p: string]: string },
) {
  defaultValues[addAttributesToName(component, component.name)] =
    formDefaultObject;
}

function createFormDefaultObject(
  component: FormComponent,
  member?: BFFMember,
  user?: User,
) {
  if (isAutoPermissionUnitRecordLink(component)) {
    return { value: getAutoPermissionUnit(member, user) ?? '' };
  }

  if (isComponentHidden(component)) {
    return {
      value: component.finalValue,
      final: true,
      ...generateComponentAttributes(component),
    };
  }
  if (isComponentVariable(component)) {
    return createDefaultValuesForVariable(component);
  }

  return createDefaultValuesForGroup(component, member, user);
}

function createDefaultValuesForVariable(component: FormComponentWithData) {
  return {
    value: createDefaultValueFromFinalValue(component),
    ...(component.finalValue ? { final: true } : {}),
    ...generateComponentAttributes(component),
  };
}

function createDefaultValuesForGroup(
  component: FormComponentGroup | FormComponentContainer,
  member?: BFFMember,
  user?: User,
) {
  return {
    ...createDefaultValuesFromComponents(component.components, member, user),
    ...generateComponentAttributes(component),
    ...(isComponentRequired(component) ? { required: true } : {}),
  };
}

export const createDefaultValuesFromComponents = (
  components: FormComponent[] | undefined,
  member?: BFFMember,
  user?: User,
): { [p: string]: any } => {
  const formDefaultValuesArray = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) =>
      createDefaultValuesFromComponent(formComponent, false, member, user),
    );

  return formDefaultValuesArray.reduce(
    (accumulator, childDefaultValues) =>
      mergeObjects(accumulator, childDefaultValues),
    {},
  );
};

export const mergeObjects = (
  target: RecordData,
  overlay: RecordData,
): RecordData => {
  Object.entries(overlay).forEach(([key]) => {
    if (Object.hasOwn(overlay, key)) {
      if (
        typeof overlay[key] === 'object' &&
        overlay[key] !== null &&
        !Array.isArray(overlay[key])
      ) {
        assignNestedObjectValues(target, key, overlay);
      } else if (Array.isArray(overlay[key])) {
        assignArrayValues(target, key, overlay);
      } else {
        assignNonObjectValues(target, key, overlay);
      }
    }
  });
  return target;
};

const assignArrayValues = (
  target: RecordData,
  key: string,
  overlay: RecordData,
) => {
  target[key] = mergeArrays(target[key] || [], overlay[key]);
};

const assignNestedObjectValues = (
  target: RecordData,
  key: string,
  overlay: RecordData,
) => {
  target[key] = mergeObjects(target[key] || {}, overlay[key]);
};

const assignNonObjectValues = (
  target: RecordData,
  key: string,
  overlay: RecordData,
) => {
  target[key] = overlay[key];
};

export const mergeArrays = (target: any[], overlay: any[]): any[] => {
  const result = Array.isArray(target) ? [...target] : [target];

  overlay.forEach((item, index) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      result[index] = mergeObjects(target[index] || {}, item);
    }
  });

  return result;
};

export const addAttributesToName = (component: FormComponent, name: string) => {
  if (!isComponentWithData(component)) {
    return name;
  }

  const attributes = (component.attributes ?? []).map((attribute) => ({
    name: attribute.name,
    value: attribute.finalValue,
  }));

  return createFieldNameWithAttributes(name, attributes);
};

const isAutoPermissionUnitRecordLink = (
  component: FormComponentWithData | FormComponentContainer,
) => {
  if (!isComponentRecordLink(component)) {
    return false;
  }
  return component.presentAs === 'permissionUnit' && component.mode === 'input';
};
