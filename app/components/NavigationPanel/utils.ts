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

import type { NavigationPanelLink } from '@/components/NavigationPanel/NavigationPanel';
import type { BFFDataRecord } from '@/types/record';
import { useEffect, useState } from 'react';
import { addAttributesToName } from '../FormGenerator/defaultValues/defaultValues';
import {
  isComponentGroup,
  isComponentText,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponent, RecordFormSchema } from '../FormGenerator/types';

export const linksFromFormSchema = (
  formSchema: RecordFormSchema,
): NavigationPanelLink[] => {
  return (formSchema.form.components ?? [])
    .map((component) => {
      return createNavigationPanelLink(component);
    })
    .filter((link) => link !== undefined);
};

const createNavigationPanelLink = (
  component: FormComponent,
): NavigationPanelLink | undefined => {
  if (isComponentText(component) && component.textStyle === 'h2TextStyle') {
    return {
      label: component.name,
      name: component.name,
    };
  }

  if ('title' in component && component.title !== undefined) {
    return {
      label: component.title,
      name: addAttributesToName(component, component.name),
    };
  }

  if (
    isComponentGroup(component) &&
    component.label &&
    component.showLabel !== false
  ) {
    return {
      label: component.label,
      name: addAttributesToName(component, component.name),
    };
  }

  return undefined;
};

export const flattenObject = (obj: any, prefix = '') => {
  return Object.keys(obj).reduce((acc: any, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
};
