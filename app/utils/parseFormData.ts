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
const ARRAY_KEY_REGEX = /\[(\d*)\]$/;

export const parseFormData = (formData: FormData) => {
  const result: Record<string, any> = {};

  formData.entries().forEach((entry) => {
    const key = entry[0];
    const value = entry[1] as string;
    const keyParts = key.split('.');

    let parent: Record<string, any> = result;

    keyParts.forEach((keyPart, depth) => {
      const isLeaf = depth === keyParts.length - 1;
      const isArray = ARRAY_KEY_REGEX.test(keyPart);

      if (isArray) {
        const arrayIndex = keyPart.match(ARRAY_KEY_REGEX)![1];
        const strippedKey = keyPart.replace(ARRAY_KEY_REGEX, '');

        if (!parent[strippedKey]) {
          parent[strippedKey] = [];
        }

        if (isLeaf) {
          parent[strippedKey][arrayIndex] = value;
        } else {
          parent[strippedKey][arrayIndex] = {};
          parent = parent[strippedKey][arrayIndex];
        }
      } else {
        if (isLeaf) {
          parent[keyPart] ??= value;
        } else {
          parent[keyPart] ??= {};
          parent = parent[keyPart];
        }
      }
    });
  });

  return result;
};
