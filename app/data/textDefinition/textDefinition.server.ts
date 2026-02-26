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

import type { Dependencies } from '@/cora/bffTypes.server';
import type { BFFText } from '@/cora/bffTypes.server';

export const createTextDefinition = (
  dependencies: Dependencies,
  lang: string,
) => {
  const { textPool } = dependencies;
  const textItemDefinitions: { [x: string]: string }[] = [];

  const entries = Array.from(textPool.entries());

  entries.forEach(([key, text]) => {
    const value = text[lang as keyof BFFText];
    if (value !== undefined) {
      const obj = { [key]: value };
      textItemDefinitions.push(obj);
    }
  });

  return textItemDefinitions.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [Object.keys(item)[0]]: Object.values(item)[0],
      }),
    {},
  );
};
