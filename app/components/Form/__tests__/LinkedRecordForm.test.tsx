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
 */

import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkedRecordForm } from '@/components/Form/LinkedRecordForm';
import { formDefWithTextVar } from '@/__mocks__/data/form/formDef';
import type { FormSchema } from '@/components/FormGenerator/types';

describe('<LinkedRecordForm />', () => {
  it('renders a form with linked data from a given definition', () => {
    render(
      <LinkedRecordForm
        record={{
          id: 'id',
          validationType: 'validationType',
          recordType: 'linkedRecordType',
          data: {},
          presentation: formDefWithTextVar as FormSchema,
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        }}
      />,
    );
    const inputElement = screen.getByPlaceholderText('someEmptyTextId');
    expect(inputElement).toBeInTheDocument();

    const inputNumberElement = screen.getByPlaceholderText(
      'someNumberPlaceholderTextId',
    );
    expect(inputNumberElement).toBeInTheDocument();

    const submitButton = screen.queryByRole('button', {
      name: 'divaClient_SubmitButtonText',
    });
    expect(submitButton).not.toBeInTheDocument();
  });
});
