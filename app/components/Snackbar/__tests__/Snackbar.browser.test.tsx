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

import { Snackbar } from '@/components/Snackbar/Snackbar';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

describe('<Snackbar />', () => {
  it('renders a Snackbar when open', async () => {
    const screen = await render(
      <Snackbar
        open={true}
        onClose={vi.fn()}
        text='Snacktext'
        severity='info'
      />,
    );

    await expect.element(screen.getByRole('alert')).toBeInTheDocument();
    await expect.element(screen.getByText('Snacktext')).toBeInTheDocument();
  });

  it('does not render Snackbar when closed', async () => {
    const screen = await render(
      <Snackbar
        open={false}
        onClose={vi.fn()}
        text='Snacktext'
        severity='info'
      />,
    );

    await expect.element(screen.getByRole('alert')).not.toBeInTheDocument();
  });

  it('calls onClose after autoCloseDelay ms', async () => {
    vi.useFakeTimers();

    const onCloseSpy = vi.fn();
    await render(
      <Snackbar
        open={true}
        onClose={onCloseSpy}
        text='Snacktext'
        severity='info'
        autoCloseDelay={1000}
      />,
    );

    await vi.advanceTimersByTimeAsync(1000);
    expect(onCloseSpy).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onCloseSpy = vi.fn();
    const screen = await render(
      <Snackbar
        open={true}
        onClose={onCloseSpy}
        text='Snacktext'
        severity='info'
      />,
    );

    await screen.getByRole('button', { name: 'divaClient_closeText' }).click();
    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it('cancels the auto-close timer when unmounted', async () => {
    vi.useFakeTimers();

    const onCloseSpy = vi.fn();
    const { unmount } = await render(
      <Snackbar
        open={true}
        onClose={onCloseSpy}
        text='Snacktext'
        severity='info'
        autoCloseDelay={1000}
      />,
    );

    await unmount();
    await vi.advanceTimersByTimeAsync(2000);
    expect(onCloseSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('does not auto-close when autoCloseDelay is 0', async () => {
    vi.useFakeTimers();

    const onCloseSpy = vi.fn();
    await render(
      <Snackbar
        open={true}
        onClose={onCloseSpy}
        text='Snacktext'
        severity='info'
        autoCloseDelay={0}
      />,
    );

    await vi.advanceTimersByTimeAsync(10000);
    expect(onCloseSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('defaults aria-live to assertive', async () => {
    const screen = await render(
      <Snackbar
        open={true}
        onClose={vi.fn()}
        text='Snacktext'
        severity='info'
      />,
    );

    await expect
      .element(screen.getByRole('alert'))
      .toHaveAttribute('aria-live', 'assertive');
  });

  it.each(['assertive', 'polite', 'off'] as const)(
    'sets aria-live to %s when provided',
    async (ariaLive) => {
      const screen = await render(
        <Snackbar
          open={true}
          onClose={vi.fn()}
          text='Snacktext'
          severity='info'
          ariaLive={ariaLive}
        />,
      );

      await expect
        .element(screen.getByRole('alert'))
        .toHaveAttribute('aria-live', ariaLive);
    },
  );

  it('renders text passed as a ReactNode', async () => {
    const screen = await render(
      <Snackbar
        open={true}
        onClose={vi.fn()}
        text={<strong>Bold message</strong>}
        severity='info'
      />,
    );

    await expect.element(screen.getByText('Bold message')).toBeInTheDocument();
  });

  it.each(['error', 'warning', 'success'] as const)(
    'renders the alert with severity %s',
    async (severity) => {
      const { baseElement } = await render(
        <Snackbar
          open={true}
          onClose={vi.fn()}
          text='Snacktext'
          severity={severity}
        />,
      );

      expect(
        baseElement.querySelector(`[data-severity="${severity}"]`),
      ).not.toBeNull();
    },
  );

  it('renders content into document.body via portal', async () => {
    const { container, baseElement } = await render(
      <Snackbar
        open={true}
        onClose={vi.fn()}
        text='Snacktext'
        severity='info'
      />,
    );

    // Portal bypasses the local render container
    expect(container.querySelector('[role="alert"]')).toBeNull();
    // Content is rendered in document.body
    expect(baseElement.querySelector('[role="alert"]')).not.toBeNull();
  });
});
