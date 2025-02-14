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

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipLegacy } from '@/components/TooltipLegacy/TooltipLegacy';

describe('<TooltipLegacy />', () => {
  it('Renders tooltip when child button is clicked and can be closed', async () => {
    const user = userEvent.setup();
    const title = 'Test Title';
    const body = 'body content';
    render(
      <TooltipLegacy title={title} body={body}>
        <span>click for tooltip</span>
      </TooltipLegacy>,
    );

    const spanBtn = screen.getByText('click for tooltip');
    expect(spanBtn).toBeInTheDocument();
    await user.click(spanBtn);

    const tooltip = screen.queryByRole('tooltip');
    expect(tooltip).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
    await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
