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

import { describe, expect, it } from 'vitest';
import { transformToRaw } from '../transformToRaw';

describe('transformToRaw', () => {
  it('transforms a simple group with one atomic child', () => {
    const data = {
      someGroup: {
        someVar: { value: 'someValue' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [{ name: 'someVar', value: 'someValue' }],
    });
  });

  it('omits children with empty values', () => {
    const data = {
      someGroup: {
        someVar: { value: '' },
        otherVar: { value: 'nonEmpty' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [{ name: 'otherVar', value: 'nonEmpty' }],
    });
  });

  it('omits entry with undefined value', () => {
    const data = {
      someGroup: {
        someVar: undefined,
        otherVar: { value: 'nonEmpty' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [{ name: 'otherVar', value: 'nonEmpty' }],
    });
  });

  it('omits entry with undefined value', () => {
    const data = {
      someGroup: {
        someVar: 'someValue',
        otherVar: { value: 'nonEmpty' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [{ name: 'otherVar', value: 'nonEmpty' }],
    });
  });

  it('transforms repeating children into multiple Cora elements', () => {
    const data = {
      someGroup: {
        someVar: [{ value: 'first' }, { value: 'second' }],
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [
        { name: 'someVar', value: 'first' },
        { name: 'someVar', value: 'second' },
      ],
    });
  });

  it('transforms a nested group', () => {
    const data = {
      outerGroup: {
        innerGroup: {
          someVar: { value: 'someValue' },
        },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'outerGroup',
      children: [
        {
          name: 'innerGroup',
          children: [{ name: 'someVar', value: 'someValue' }],
        },
      ],
    });
  });

  it('transforms a leaf with an attribute', () => {
    const data = {
      someGroup: {
        someVar: { value: 'someValue', _language: 'swe' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [
        {
          name: 'someVar',
          value: 'someValue',
          attributes: { language: 'swe' },
        },
      ],
    });
  });

  it('transforms a record link child without read rights', () => {
    const data = {
      someGroup: {
        someLink: { linkedRecordType: 'person', value: 'person:123' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [
        {
          name: 'someLink',
          children: [
            { name: 'linkedRecordType', value: 'person' },
            { name: 'linkedRecordId', value: 'person:123' },
          ],
          actionLinks: undefined,
        },
      ],
    });
  });

  it('transforms a record link child with read rights', () => {
    const data = {
      someGroup: {
        someLink: {
          linkedRecordType: 'person',
          value: 'person:123',
          userRights: ['read'],
        },
      },
    };
    const result = transformToRaw(data);
    const link = result.children[0] as any;
    expect(link.actionLinks).toStrictEqual({
      read: { requestMethod: 'GET', url: '', rel: 'record' },
    });
  });

  it('transforms a record link with attributes', () => {
    const data = {
      someGroup: {
        someLink: {
          linkedRecordType: 'person',
          value: 'person:123',
          _someAttr: 'attrValue',
        },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [
        {
          name: 'someLink',
          attributes: { someAttr: 'attrValue' },
          children: [
            { name: 'linkedRecordType', value: 'person' },
            { name: 'linkedRecordId', value: 'person:123' },
          ],
          actionLinks: undefined,
        },
      ],
    });
  });

  it('transforms a resource link child', () => {
    const data = {
      someGroup: {
        someFile: { id: 'binary:1', mimeType: 'application/pdf' },
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      children: [
        {
          name: 'someFile',
          children: [
            { name: 'linkedRecordType', value: 'binary' },
            { name: 'linkedRecordId', value: 'binary:1' },
            { name: 'mimeType', value: 'application/pdf' },
          ],
        },
      ],
    });
  });

  it('promotes underscore-prefixed sibling keys to group attributes', () => {
    const data = {
      someGroup: {
        someVar: { value: 'someValue' },
        _someAttr: 'attrValue',
      },
    };
    expect(transformToRaw(data)).toStrictEqual({
      name: 'someGroup',
      attributes: { someAttr: 'attrValue' },
      children: [{ name: 'someVar', value: 'someValue' }],
    });
  });

  it('strips the attribute discriminator suffix from a child name', () => {
    const data = {
      someGroup: {
        author_language_swe: { value: 'Sven', _language: 'swe' },
      },
    };
    const result = transformToRaw(data);
    expect((result.children[0] as any).name).toBe('author');
  });
});
