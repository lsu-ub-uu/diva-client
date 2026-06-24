/*
 * Copyright 2025 Uppsala University Library
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

export const parseFormDataFromSearchParams = (
  urlSearchParams: URLSearchParams,
) => {
  const result: Record<string, any> = {};

  urlSearchParams.forEach((value, key) => {
    const keyParts = key.split('.');

    let parent: Record<string, any> = result;

    keyParts.forEach((keyPart, depth) => {
      const isLeaf = depth === keyParts.length - 1;
      const isNumeric = /^\d+$/.test(keyPart);

      if (isNumeric) {
        if (isLeaf) {
          parent[keyPart] = value;
        } else {
          parent[keyPart] ??= {};
          parent = parent[keyPart];
        }
      } else {
        if (isLeaf) {
          parent[keyPart] ??= value;
        } else {
          // Look ahead to see if next part is numeric (array index)
          const nextPart = keyParts[depth + 1];
          const nextIsNumeric = /^\d+$/.test(nextPart);

          if (nextIsNumeric) {
            parent[keyPart] ??= [];
          } else {
            parent[keyPart] ??= {};
          }
          parent = parent[keyPart];
        }
      }
    });
  });

  return result;
};
