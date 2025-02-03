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

export interface Attribute {
  name: string;
  value?: string;
}

export const createFieldNameWithAttributes = (
  fieldName: string,
  attributes: Attribute[],
) => {
  return attributes
    .filter(hasValue)
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((previousValue, attribute) => {
      const escapedValue = attribute.value.replaceAll('.', '-');
      return `${previousValue}_${attribute.name}_${escapedValue}`;
    }, fieldName);
};

const hasValue = (
  attribute: Attribute,
): attribute is { name: string; value: string } => {
  return attribute.value !== undefined;
};
