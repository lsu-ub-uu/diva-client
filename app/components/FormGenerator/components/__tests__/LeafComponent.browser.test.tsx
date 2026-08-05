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

import { LeafComponent } from '@/components/FormGenerator/components/LeafComponent';
import type {
  FormComponent,
  FormComponentAnyTypeRecordLink,
  FormComponentCollVar,
  FormComponentGuiElement,
  FormComponentNumVar,
  FormComponentRecordLink,
  FormComponentText,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { MockFormProvider } from '@/utils/testUtils';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const path = 'someGroup';

describe('LeafComponent', () => {
  it('renders Variable for textVariable', async () => {
    const component: FormComponentTextVar = {
      type: 'textVariable',
      name: 'someNameInData',
      label: 'someLabelTextId',
      showLabel: true,
      inputType: 'input',
      mode: 'input',
    };

    const screen = await render(
      <MockFormProvider>
        <LeafComponent component={component} path={path} />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someLabelTextId' }))
      .toBeVisible();
  });

  it('renders Variable for numberVariable', async () => {
    const component: FormComponentNumVar = {
      type: 'numberVariable',
      name: 'someNameInData',
      label: 'someLabelTextId',
      showLabel: true,
      mode: 'input',
    };

    const screen = await render(
      <MockFormProvider>
        <LeafComponent component={component} path={path} />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someLabelTextId' }))
      .toBeVisible();
  });

  it('renders Variable for collectionVariable', async () => {
    const component: FormComponentCollVar = {
      type: 'collectionVariable',
      name: 'someNameInData',
      label: 'someLabelTextId',
      showLabel: true,
      mode: 'input',
      options: [{ value: 'option1', label: 'Option One' }],
    };

    const { container } = await render(
      <MockFormProvider>
        <LeafComponent component={component} path={path} />
      </MockFormProvider>,
    );

    expect(container.querySelector('select')).toBeVisible();
  });

  it('renders RecordLink for recordLink', async () => {
    const component: FormComponentRecordLink = {
      type: 'recordLink',
      name: 'someNameInData',
      label: 'someLabelTextId',
      showLabel: true,
      mode: 'input',
    };

    const screen = await render(
      <MockFormProvider>
        <LeafComponent component={component} path={path} />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('textbox', { name: 'someLabelTextId' }))
      .toBeVisible();
  });

  it('renders AnyTypeRecordLink for anyTypeRecordLink', async () => {
    const component: FormComponentAnyTypeRecordLink = {
      type: 'anyTypeRecordLink',
      name: 'someNameInData',
      label: 'someLabelTextId',
      showLabel: true,
      mode: 'input',
    };

    const screen = await render(
      <MockFormProvider>
        <LeafComponent component={component} path={path} />
      </MockFormProvider>,
    );

    await expect.element(screen.getByText('someLabelTextId')).toBeVisible();
  });

  it('renders Text for text type', async () => {
    const component: FormComponentText = {
      type: 'text',
      name: 'someTranslatedTextKey',
    };

    const screen = await render(
      <LeafComponent component={component} path={path} />,
    );

    await expect
      .element(screen.getByText('someTranslatedTextKey'))
      .toBeVisible();
  });

  it('renders GuiElementLink for guiElementLink type', async () => {
    const component: FormComponentGuiElement = {
      type: 'guiElementLink',
      name: 'someGuiElement',
      url: 'https://example.com',
      elementText: 'someElementTextId',
      presentAs: 'link',
    };

    const screen = await render(
      <LeafComponent component={component} path={path} />,
    );

    await expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('renders nothing for an unhandled component type', async () => {
    const component = {
      type: 'group',
      name: 'someGroup',
      label: 'someLabel',
      showLabel: true,
    } as unknown as FormComponent;

    const { container } = await render(
      <LeafComponent component={component} path={path} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
