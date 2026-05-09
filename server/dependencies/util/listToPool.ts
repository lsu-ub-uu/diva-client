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

import { Lookup } from './lookup';
import type { BFFBase } from '@/cora/bffTypes.server';

export const listToPool = <T>(list: T[]): Lookup<string, T> => {
  const pool = new Lookup<string, T>();
  list.forEach((item) => {
    const obj = item as BFFBase;
    pool.set(obj.id, item);
  });
  return pool;
};
