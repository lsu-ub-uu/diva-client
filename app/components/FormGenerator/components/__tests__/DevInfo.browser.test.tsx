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
 */

import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import {
  DevInfo,
  DevInfoButton,
} from '@/components/FormGenerator/components/DevInfo';
import type { FormComponentTextVar } from '@/components/FormGenerator/types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const getValuesMock = vi.fn();

vi.mock('remix-hook-form', () => ({
  useRemixFormContext: () => ({
    getValues: getValuesMock,
  }),
}));

const component: FormComponentTextVar = {
  type: 'textVariable',
  name: 'title',
  label: 'titleLabelTextId',
  showLabel: true,
  inputType: 'input',
};

afterEach(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  getValuesMock.mockReset();
});

describe('DevInfo', () => {
  it('does not render when showDevInfo is false', async () => {
    const { container } = await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
      >
        <DevInfo component={component} path='metadata.title' />
      </FormGeneratorContext>,
    );

    expect(container.querySelector('button')).toBeNull();
  });

  it('renders component details and form data when expanded', async () => {
    getValuesMock.mockReturnValue({ value: 'A title' });

    const { container, ...screen } = await render(
      <FormGeneratorContext
        value={{ showDevInfo: true, boxGroups: false, showTooltips: true }}
      >
        <DevInfo component={component} path='metadata.title' label='Heading' />
      </FormGeneratorContext>,
    );

    await screen
      .getByRole('button', { name: /heading \| textvariable/i })
      .click();

    expect(container.textContent).toContain('metadata.title');
    await expect.element(screen.getByText(/FORM DEF/)).toBeVisible();
    await expect
      .element(screen.getByText(/DATA \(metadata.title\)/))
      .toBeVisible();
    expect(getValuesMock).toHaveBeenCalledWith('metadata.title');
    await expect.element(screen.getByText(/"name": "title"/)).toBeVisible();
    await expect.element(screen.getByText(/"value": "A title"/)).toBeVisible();
  });

  it('does not render a data section when getValues returns nothing', async () => {
    getValuesMock.mockReturnValue(undefined);

    const { container, ...screen } = await render(
      <FormGeneratorContext
        value={{ showDevInfo: true, boxGroups: false, showTooltips: true }}
      >
        <DevInfo component={component} path='metadata.title' />
      </FormGeneratorContext>,
    );

    await screen.getByRole('button', { name: /textvariable/i }).click();

    await expect.element(screen.getByText(/FORM DEF/)).toBeVisible();
    expect(container.textContent).not.toContain('DATA (metadata.title)');
  });

  it('does not render DevInfoButton when local storage does not contain diva-dev', async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
    });

    const { container } = await render(<DevInfoButton onClick={vi.fn()} />);

    expect(container.querySelector('button')).toBeNull();
  });

  it('does render DevInfoButton when local storage contains diva-dev', async () => {
    vi.stubGlobal('localStorage', {
      getItem: vi
        .fn()
        .mockImplementation((key: string) =>
          key === 'diva-dev' ? true : null,
        ),
    });

    const screen = await render(<DevInfoButton onClick={vi.fn()} />);

    await expect.element(screen.getByRole('button')).toBeVisible();
  });
});
