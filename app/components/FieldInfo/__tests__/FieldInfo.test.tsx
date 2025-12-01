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
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

describe('<FieldInfo />', () => {
  it('Renders info button with popover', async () => {
    const user = userEvent.setup();
    const title = 'Test Title';
    const body = 'body content';
    render(<FieldInfo title={title} body={body} />);
    
    await user.click(
      screen.getByRole('button', { name: 'divaClient_fieldInfoText' }),
    );


    screen.getByText('Test Title');
    screen.getByText('body content');

    await user.click(
      screen.getByRole('button', {
        name: 'divaClient_closeText',
      }),
    );
  });
});
