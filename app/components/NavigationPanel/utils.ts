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

import { useEffect, useState } from 'react';
import { FormSchema, RecordFormSchema } from '../FormGenerator/types';
import { NavigationPanelLink } from '../index';
import { BFFDataRecord } from '@/types/record';
import {
  addAttributesToName,
  hasCurrentComponentSameNameInData,
} from '../FormGenerator/defaultValues/defaultValues';

import { getChildrenWithSameNameInDataFromSchema } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';

export const linksFromFormSchema = (
  formSchema: RecordFormSchema,
): NavigationPanelLink[] | undefined => {
  const childrenWithSameNameInData =
    getChildrenWithSameNameInDataFromSchema(formSchema);

  return formSchema?.form.components
    ?.filter((c) => !['text', 'container'].includes(c.type))
    .map((c) => {
      const currentComponentSameNameInData = hasCurrentComponentSameNameInData(
        childrenWithSameNameInData,
        c.name,
      );
      if (currentComponentSameNameInData) {
        return {
          name: `${addAttributesToName(c, c.name)}`,
          label: c.label,
        } as NavigationPanelLink;
      }
      return { name: `${c.name}`, label: c.label } as NavigationPanelLink;
    });
};

export const removeComponentsWithoutValuesFromSchema = (
  formSchema: FormSchema,
  record: BFFDataRecord,
): FormSchema => {
  const schema = formSchema;
  let componentsFromSchema = formSchema.form.components;

  const flattenedRecord = flattenObject(record.data);
  const keysAsString = toShortString(flattenedRecord);
  const lastKeyFromString = getLastKeyFromString(keysAsString);

  componentsFromSchema = componentsFromSchema?.filter((component) => {
    return [...lastKeyFromString].includes(component.name);
  });
  schema.form.components = componentsFromSchema;
  return schema;
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

export const toShortString = (objects: any) => {
  const shortStrings = Object.entries(objects).map((object) => {
    return `${object[0].split('.')[0]}.${object[0].split('.')[1]}`;
  });
  return [...new Set(shortStrings)];
};

export const getLastKeyFromString = (keys: string[]) => {
  return keys.map((key: string) => {
    const stringArray = key.split('.');
    return stringArray[stringArray.length - 1];
  });
};

export const useSectionScroller = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const debounce = (func: (...args: any[]) => void, wait: number) => {
      let timeoutId: number;

      return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections =
        document.querySelectorAll<HTMLSpanElement>('span.anchorLink');

      sections.forEach((section) => {
        const sectionBottom = section.offsetHeight + section.offsetTop;
        if (
          scrollPosition >= section.offsetTop - 5 &&
          scrollPosition <= sectionBottom + 5
        ) {
          setActiveSection(section.id.replace('anchor_', ''));
        }
      });
    };

    window.addEventListener('scroll', debounce(handleScroll, 10));
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeSection;
};
