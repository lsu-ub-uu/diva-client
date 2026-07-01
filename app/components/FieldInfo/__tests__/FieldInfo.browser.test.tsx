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

import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

describe('<FieldInfo />', () => {
  it('Renders info button with popover', async () => {
    const title = 'Test Title';
    const body = 'body content';
    const screen = await render(<FieldInfo title={title} body={body} />);

    await expect.element(screen.getByText('Test Title')).not.toBeVisible();

    await screen
      .getByRole('button', {
        name: 'divaClient_fieldInfoText',
      })
      .click();

    await expect.element(screen.getByText('Test Title')).toBeVisible();
    await expect.element(screen.getByText('body content')).toBeVisible();

    await screen
      .getByRole('button', {
        name: 'divaClient_closeText',
      })
      .click();

    await expect.element(screen.getByText('Test Title')).not.toBeVisible();
  });
});
