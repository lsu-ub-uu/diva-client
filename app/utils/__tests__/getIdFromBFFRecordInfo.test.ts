/*
 * Copyright 2024 Uppsala University Library
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

import { describe, expect } from 'vitest';
import { getIdFromBFFRecordInfo } from '@/utils/getIdFromBFFRecordInfo';

describe('getIdFromBFFRecordInfo', () => {
  it('returns the correct id for BFF RecordInfo', () => {
    const dataRecord = {
      report: {
        recordInfo: {
          id: {
            value: '12345',
          },

          validationType: {
            value: 'record',
          },
          dataDivider: {
            value: 'divaData',
          },
          type: {
            value: 'record',
          },
          createdBy: {
            value: '161616',
          },
          tsCreated: {
            value: '2024-10-16T12:36:04.249992Z',
          },

          updated: [
            {
              tsUpdated: {
                value: '2024-10-16T12:36:04.249992Z',
              },
              updatedBy: {
                value: '161616',
              },
            },
          ],
        },
      },
    };
    const actual = getIdFromBFFRecordInfo(dataRecord);
    expect(actual).toEqual('12345');
  });

  it('returns undefined for undefined', () => {
    const dataRecord = {};
    const actual = getIdFromBFFRecordInfo(dataRecord);
    expect(actual).toEqual(undefined);
  });
});
