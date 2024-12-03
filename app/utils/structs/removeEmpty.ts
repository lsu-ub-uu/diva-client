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

export const removeEmpty = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data
      .filter((value) => value != null)
      .map((value) =>
        typeof value === 'object' ? removeEmpty(value) : value,
      ) as T;
  }
  if (typeof data === 'object' && data !== null) {
    const entries = Object.entries(data).filter(([, value]) => value != null);
    const clean = entries.map(([key, value]) => {
      const cleanedValue =
        typeof value === 'object' ? removeEmpty(value) : value;
      return [key, cleanedValue];
    });
    return Object.fromEntries(clean);
  }
  return data as T;
};
