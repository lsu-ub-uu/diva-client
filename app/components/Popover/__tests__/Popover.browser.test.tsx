import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Popover } from '../Popover';
import { userEvent } from 'vitest/browser';

describe('Popover', async () => {
  it('renders a popover when the trigger button is clicked', async () => {
    const screen = await render(
      <div>
        <button type='button' popoverTarget='my-popover'>
          Trigger
        </button>
        <Popover id='my-popover'>PopoverContent</Popover>
      </div>,
    );

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    await triggerButton.click();

    const popover = screen.getByText('PopoverContent');
    await expect.element(popover).toBeVisible();
  });

  it('renders a popover with a title', async () => {
    const screen = await render(
      <div>
        <button type='button' popoverTarget='my-popover'>
          Trigger
        </button>
        <Popover id='my-popover' title='My Popover Title'>
          PopoverContent
        </Popover>
      </div>,
    );

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    await triggerButton.click();

    const popoverTitle = screen.getByRole('heading', {
      name: 'My Popover Title',
    });
    await expect.element(popoverTitle).toBeVisible();
  });

  it('closes the popover when the close button is clicked', async () => {
    const screen = await render(
      <div>
        <button type='button' popoverTarget='my-popover'>
          Trigger
        </button>
        <Popover id='my-popover'>PopoverContent</Popover>
      </div>,
    );

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    await triggerButton.click();

    const popover = screen.getByText('PopoverContent');
    await expect.element(popover).toBeVisible();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await closeButton.click();

    await expect.element(popover).not.toBeVisible();
  });

  it('closes the popover on pressing the Escape key', async () => {
    const screen = await render(
      <div>
        <button type='button' popoverTarget='my-popover'>
          Trigger
        </button>
        <Popover id='my-popover'>PopoverContent</Popover>
      </div>,
    );

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    await triggerButton.click();

    const popover = screen.getByText('PopoverContent');
    await expect.element(popover).toBeVisible();

    await userEvent.keyboard('{Escape}');

    await expect.element(popover).not.toBeVisible();
  });

  it('renders a popover without a close button when closeButton is set to false', async () => {
    const screen = await render(
      <div>
        <button type='button' popoverTarget='my-popover'>
          Trigger
        </button>
        <Popover id='my-popover' closeButton={false}>
          PopoverContent
        </Popover>
      </div>,
    );

    const triggerButton = screen.getByRole('button', { name: 'Trigger' });
    await triggerButton.click();

    const closeButton = screen.getByRole('button', {
      name: 'Close',
    });
    await expect(closeButton).not.toBeInTheDocument();
  });
});
