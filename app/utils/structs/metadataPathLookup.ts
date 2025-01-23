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
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import type {
  DataAtomic,
  DataGroup,
  RecordLink,
} from '@/cora/cora-data/CoraData.server';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';

export const createFormMetaDataPathLookup = (
  metaDataGroup: FormMetaData,
  path: string = '',
  lookup: Record<string, FormMetaData> = {},
) => {
  path = createPath(path, metaDataGroup);

  metaDataGroup.children?.forEach((metaData) => {
    createFormMetaDataPathLookup(metaData, path, lookup);
  });
  lookup[path] = removeEmpty({ ...metaDataGroup, children: undefined });
  return lookup;
};

export const createPath = (path: string, metaDataGroup: FormMetaData) => {
  const hasPath = path.length > 0 || path !== undefined;
  if (hasPath) {
    return path
      ? `${path}.${addAttributesToNameServer(metaDataGroup)}`
      : addAttributesToNameServer(metaDataGroup);
  }
  return path ? `${path}.${metaDataGroup.name}` : metaDataGroup.name;
};
export const addAttributesToNameServer = (
  metaDataGroup: FormMetaData | (DataGroup | DataAtomic | RecordLink),
) => {
  if (metaDataGroup.attributes === undefined) {
    return metaDataGroup.name;
  }

  const attributes = Object.entries(metaDataGroup.attributes).map(
    ([name, value]) => ({ name, value }),
  );

  return createFieldNameWithAttributes(metaDataGroup.name, attributes);
};

export const addNamesToArray = (metaDataGroup: FormMetaData) => {
  const tempArray: string[] = [];
  (metaDataGroup.children ?? []).forEach((child: FormMetaData) => {
    tempArray.push(child.name);
  });
  const duplicates = tempArray.filter(
    (item, index) => tempArray.indexOf(item) !== index,
  );
  return Array.from(new Set(duplicates));
};
