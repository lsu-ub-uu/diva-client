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

import type { RecordFormSchema } from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { linksFromFormSchema } from '../linksFromFormSchema';

describe('linksFromFormSchema', () => {
  it('returns an empty array for an empty form schema', () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        showLabel: true,
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([]);
  });

  it('returns links to top level groups and not variables or containers without title', () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        showLabel: true,
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            type: 'textVariable',
            name: 'someTextVar',
            label: 'Some Text Variable',
          },
          {
            type: 'group',
            name: 'someGroup',
            label: 'Some Group',
            components: [
              {
                type: 'textVariable',
                name: 'someNestedTextVar',
                label: 'Some Nested Text Variable',
              },
            ],
          },
          {
            type: 'group',
            name: 'someGroupWithoutLabel',
            showLabel: false,
            components: [
              {
                type: 'textVariable',
                name: 'someNestedTextVar',
                label: 'Some Nested Text Variable',
              },
            ],
          },
          {
            type: 'container',
            name: 'someContainer',
            label: 'Some Container',
            components: [
              {
                type: 'textVariable',
                name: 'someContainerTextVar',
              },
            ],
          },
          {
            type: 'container',
            name: 'someContainerWithoutLabel',
            showLabel: false,
            components: [
              {
                type: 'textVariable',
                name: 'someContainerTextVar',
              },
            ],
          },
        ],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([
      {
        label: 'Some Group',
        name: 'someGroup',
      },
    ]);
  });

  it('adds attributes to the name', () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        showLabel: true,
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            type: 'group',
            name: 'someGroup',
            label: 'Some Group With Attributes',
            attributes: [
              {
                name: 'someAttribute',
                finalValue: 'someFinalValue',
                label: 'Some Attribute',
                showLabel: true,
                type: 'collectionVariable',
                options: [
                  { label: 'Some final value', value: 'someFinalValue' },
                ],
              },
            ],
          },
        ],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([
      {
        label: 'Some Group With Attributes',
        name: 'someGroup_someAttribute_someFinalValue',
      },
    ]);
  });

  it('creates entries for components with title but no label', () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        showLabel: true,
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            type: 'container',
            name: 'someContainerWithTitle',
            showLabel: false,
            title: 'Some container title',
            components: [
              {
                type: 'textVariable',
                name: 'someTextVar',
                label: 'Some Text Variable',
              },
            ],
          },
        ],
        mode: 'output',
      },
    };

    const links = linksFromFormSchema(formSchema);

    expect(links).toEqual([
      {
        label: 'Some container title',
        name: 'someContainerWithTitle',
      },
    ]);
  });

  it('create entries from groups inside first level container without title', () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        showLabel: true,
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            type: 'container',
            name: 'someContainer',
            components: [
              {
                type: 'group',
                name: 'someGroup',
                label: 'Some Group Inside Container',
              },
            ],
          },
        ],
        mode: 'output',
      },
    };
    const links = linksFromFormSchema(formSchema);
    expect(links).toEqual([
      {
        label: 'Some Group Inside Container',
        name: 'someGroup',
      },
    ]);
  });
});
