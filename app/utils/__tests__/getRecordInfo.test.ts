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

import type { BFFDataRecord } from '@/types/record';
import { describe, expect, it } from 'vitest';
import { getRecordInfo, getValueFromRecordInfo } from '../getRecordInfo';

describe('recordInfoHelpers', () => {
  describe('getRecordInfo', () => {
    it('return a RecordInfo', () => {
      const response: BFFDataRecord = {
        id: 'id',
        validationType: 'validationType',
        recordType: 'recordType',
        data: {
          output: {
            titleInfo: {
              title: {
                value: 'asdasd',
              },
              _lang: 'alt',
            },
            recordInfo: {
              validationType: {
                value: 'divaOutputSwepub',
              },
              dataDivider: {
                value: 'divaData',
              },
              id: {
                value: 'divaOutputSwepub:4930578532044260',
              },
              type: {
                value: 'divaOutputSwepub',
              },
              createdBy: {
                value: '161616',
              },
              tsCreated: {
                value: '2024-10-16T09:36:03.023342Z',
              },
              updated: [
                {
                  tsUpdated: {
                    value: '2024-10-16T09:36:03.023342Z',
                  },
                  updatedBy: {
                    value: '161616',
                  },
                },
              ],
            },
          },
        },
        actionLinks: {
          read: {
            url: '',
            rel: 'read',
            requestMethod: 'GET',
          },
        },
      };
      const actual = getRecordInfo(response);
      expect(actual).toStrictEqual({
        createdBy: {
          value: '161616',
        },
        dataDivider: {
          value: 'divaData',
        },
        id: {
          value: 'divaOutputSwepub:4930578532044260',
        },
        tsCreated: {
          value: '2024-10-16T09:36:03.023342Z',
        },
        type: {
          value: 'divaOutputSwepub',
        },
        updated: [
          {
            tsUpdated: {
              value: '2024-10-16T09:36:03.023342Z',
            },
            updatedBy: {
              value: '161616',
            },
          },
        ],
        validationType: {
          value: 'divaOutputSwepub',
        },
      });
    });
  });
  describe('getValueFromRecordInfo', () => {
    it('return a value from recordInfo as an array', () => {
      const actual = getValueFromRecordInfo(
        {
          createdBy: {
            value: '161616',
          },
          dataDivider: {
            value: 'divaData',
          },
          id: {
            value: 'divaOutputSwepub:4930578532044260',
          },
          tsCreated: {
            value: '2024-10-16T09:36:03.023342Z',
          },
          type: {
            value: 'divaOutputSwepub',
          },
          updated: [
            {
              tsUpdated: {
                value: '2024-10-16T09:36:03.023342Z',
              },
              updatedBy: {
                value: '161616',
              },
            },
          ],
          validationType: {
            value: 'divaOutputSwepub',
          },
        },
        'id',
      );
      expect(actual).toEqual({
        value: 'divaOutputSwepub:4930578532044260',
      });
    });

    it('return a value from recordInfo as an array with attribute', () => {
      const actual = getValueFromRecordInfo(
        {
          createdBy: {
            value: '161616',
          },
          dataDivider: {
            value: 'divaData',
          },
          id: {
            value: 'divaOutputSwepub:4930578532044260',
          },
          tsCreated: {
            value: '2024-10-16T09:36:03.023342Z',
          },
          type: {
            value: 'divaOutputSwepub',
          },
          updated: [
            {
              tsUpdated: {
                value: '2024-10-16T09:36:03.023342Z',
              },
              updatedBy: {
                value: '161616',
              },
            },
          ],
          validationType: {
            value: 'divaOutputSwepub',
          },
          oai: [
            {
              value: 'oai:digitalcommons.odu.edu:oaweek-1012',
              _type: 'oai',
            },
          ],
        },
        'oai',
      );
      expect(actual).toEqual([
        {
          _type: 'oai',
          value: 'oai:digitalcommons.odu.edu:oaweek-1012',
        },
      ]);
    });

    it('return a value from recordInfo a object', () => {
      const actual = getValueFromRecordInfo(
        {
          createdBy: {
            value: '161616',
          },
          dataDivider: {
            value: 'divaData',
          },
          id: {
            value: 'divaOutputSwepub:4930578532044260',
          },
          tsCreated: {
            value: '2024-10-16T09:36:03.023342Z',
          },
          type: {
            value: 'divaOutputSwepub',
          },
          updated: [
            {
              tsUpdated: {
                value: '2024-10-16T09:36:03.023342Z',
              },
              updatedBy: {
                value: '161616',
              },
            },
          ],
          validationType: {
            value: 'divaOutputSwepub',
          },
        },
        'dataDivider',
      );
      expect(actual).toEqual({
        value: 'divaData',
      });
    });

    it('return a value from recordInfo a object with attribute', () => {
      const actual = getValueFromRecordInfo(
        {
          createdBy: {
            value: '161616',
          },
          dataDivider: {
            value: 'divaData',
            _attri: 'someAttribute',
          },
          id: {
            value: 'divaOutputSwepub:4930578532044260',
          },
          tsCreated: {
            value: '2024-10-16T09:36:03.023342Z',
          },
          type: {
            value: 'divaOutputSwepub',
          },
          updated: [
            {
              tsUpdated: {
                value: '2024-10-16T09:36:03.023342Z',
              },
              updatedBy: {
                value: '161616',
              },
            },
          ],
          validationType: {
            value: 'divaOutputSwepub',
          },
        },
        'dataDivider',
      );
      expect(actual).toEqual({
        value: 'divaData',
        _attri: 'someAttribute',
      });
    });
  });
});
