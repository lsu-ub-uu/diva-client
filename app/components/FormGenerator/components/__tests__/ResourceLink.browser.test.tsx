/*
 * Copyright 2025 Uppsala University Library
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

import { ResourceLink } from '@/components/FormGenerator/components/ResourceLink';
import type { FormComponentResourceLink } from '@/components/FormGenerator/types';
import type { BFFDataResourceLink } from '@/types/record';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const getValuesMock = vi.fn();

vi.mock('remix-hook-form', () => ({
  useRemixFormContext: () => ({
    getValues: getValuesMock,
  }),
}));

vi.mock('@/utils/createDownloadLinkFromResourceLink', () => ({
  createDownloadLinkFromResourceLink: (data: BFFDataResourceLink) =>
    `/binary/${data.id}/${data.name}`,
}));

const resourceLinkData: BFFDataResourceLink = {
  id: 'someResourceId',
  name: 'someResourceName',
  mimeType: 'image/png',
};

const imageComponent: FormComponentResourceLink = {
  type: 'resourceLink',
  name: 'resourceLinkNameInData',
  label: 'resourceLinkLabelTextId',
  showLabel: true,
  outputFormat: 'image',
};

const downloadComponent: FormComponentResourceLink = {
  type: 'resourceLink',
  name: 'resourceLinkNameInData',
  label: 'resourceLinkLabelTextId',
  showLabel: true,
  outputFormat: 'download',
};

describe('ResourceLink', () => {
  it('renders nothing when getValues returns undefined', async () => {
    getValuesMock.mockReturnValue(undefined);

    const { container } = await render(
      <ResourceLink component={imageComponent} path='record.resourceLink' />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls getValues with the provided path', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    await render(
      <ResourceLink component={imageComponent} path='record.resourceLink' />,
    );

    expect(getValuesMock).toHaveBeenCalledWith('record.resourceLink');
  });

  it('renders an img element with the download link as src when outputFormat is image', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const screen = await render(
      <ResourceLink component={imageComponent} path='record.resourceLink' />,
    );

    const img = screen.container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe(
      '/binary/someResourceId/someResourceName',
    );
    expect(img?.getAttribute('alt')).toBe('');
  });

  it('does not render an anchor when outputFormat is image', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const { container } = await render(
      <ResourceLink component={imageComponent} path='record.resourceLink' />,
    );

    expect(container.querySelector('a')).toBeNull();
  });

  it('renders an anchor element with the download link as href when outputFormat is download', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const screen = await render(
      <ResourceLink component={downloadComponent} path='record.resourceLink' />,
    );

    const anchor = screen.container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe(
      '/binary/someResourceId/someResourceName',
    );
  });

  it('sets type attribute on anchor to the mimeType of the resource', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const { container } = await render(
      <ResourceLink component={downloadComponent} path='record.resourceLink' />,
    );

    const anchor = container.querySelector('a');
    expect(anchor?.getAttribute('type')).toBe('image/png');
  });

  it('renders the download link text when outputFormat is download', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const screen = await render(
      <ResourceLink component={downloadComponent} path='record.resourceLink' />,
    );

    await expect
      .element(screen.getByText('resourceLinkDownloadText'))
      .toBeVisible();
  });

  it('does not render an img when outputFormat is download', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const { container } = await render(
      <ResourceLink component={downloadComponent} path='record.resourceLink' />,
    );

    expect(container.querySelector('img')).toBeNull();
  });

  it('sets data-colspan on the wrapper when gridColSpan is provided', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const { container } = await render(
      <ResourceLink
        component={{ ...imageComponent, gridColSpan: 6 }}
        path='record.resourceLink'
      />,
    );

    const wrapper = container.querySelector('.form-component-item');
    expect(wrapper?.getAttribute('data-colspan')).toBe('6');
  });

  it('does not set data-colspan when gridColSpan is not provided', async () => {
    getValuesMock.mockReturnValue(resourceLinkData);

    const { container } = await render(
      <ResourceLink component={imageComponent} path='record.resourceLink' />,
    );

    const wrapper = container.querySelector('.form-component-item');
    expect(wrapper?.getAttribute('data-colspan')).toBeNull();
  });
});
