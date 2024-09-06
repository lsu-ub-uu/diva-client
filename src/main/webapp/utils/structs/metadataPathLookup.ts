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

import { removeEmpty } from './removeEmpty';
import { FormMetaData } from '../../formDefinition/formDefinition';

export const createFormMetaDataPathLookup = (
  metaDataGroup: FormMetaData,
  path: string = '',
  lookup: Record<string, FormMetaData> = {},
  childWithSameNameInData: string[] = []
) => {
  let childrenWithSameNameInData: string[] = [];

  path = createPath(path, metaDataGroup, childWithSameNameInData);
  if (metaDataGroup.type === 'group') {
    childrenWithSameNameInData = addNamesToArray(metaDataGroup);
  }

  metaDataGroup.children?.forEach((metaData) => {
    createFormMetaDataPathLookup(metaData, path, lookup, childrenWithSameNameInData);
  });
  lookup[path] = removeEmpty({ ...metaDataGroup, children: undefined });
  return lookup;
};

export const createPath = (path: string, metaDataGroup: FormMetaData, childArray: string[]) => {
  const hasMetaDataSameNameInData = childArray.includes(metaDataGroup.name);
  const hasPath = path.length > 0 || path !== undefined;
  if (hasMetaDataSameNameInData && hasPath) {
    return path
      ? `${path}.${addAttributesToName(metaDataGroup)}`
      : addAttributesToName(metaDataGroup);
  }
  return path ? `${path}.${metaDataGroup.name}` : metaDataGroup.name;
};

export const addAttributesToName = (metaDataGroup: FormMetaData) => {
  if (metaDataGroup.attributes === undefined) {
    return metaDataGroup.name;
  }
  const nameArray: any[] = [];
  Object.entries(metaDataGroup.attributes).forEach(([key, value]) => {
    nameArray.push(`${key}_${value}`);
  });
  return `${metaDataGroup.name}_${nameArray.join('_')}`;
};

export const addNamesToArray = (metaDataGroup: FormMetaData) => {
  const tempArray: string[] = [];
  (metaDataGroup.children ?? []).forEach((child: FormMetaData) => {
    tempArray.push(child.name);
  });
  const duplicates = tempArray.filter((item, index) => tempArray.indexOf(item) !== index);
  return Array.from(new Set(duplicates));
};
