import { GuiElementLink } from '@/components/FormGenerator/components/GuiElementLink';
import type { FormComponentGuiElement } from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const component: FormComponentGuiElement = {
  name: 'someGuiElement',
  type: 'guiElementLink',
  url: 'https://example.com',
  elementText: 'someElementTextId',
  presentAs: 'link',
  gridColSpan: 6,
};

describe('GuiElementLink', () => {
  it('renders a link with the correct href', async () => {
    const screen = await render(<GuiElementLink component={component} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders the element text', async () => {
    const screen = await render(<GuiElementLink component={component} />);
    await expect.element(screen.getByText('someElementTextId')).toBeVisible();
  });

  it('opens in a new tab', async () => {
    const screen = await render(<GuiElementLink component={component} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
