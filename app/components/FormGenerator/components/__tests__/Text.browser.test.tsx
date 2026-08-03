import { Text } from '@/components/FormGenerator/components/Text';
import type { FormComponentText } from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const baseComponent: FormComponentText = {
  type: 'text',
  name: 'someTranslatedTextKey',
};

describe('Text', () => {
  it('renders translated text content', async () => {
    const screen = await render(<Text component={baseComponent} />);

    await expect
      .element(screen.getByText('someTranslatedTextKey'))
      .toBeVisible();
  });

  it('renders default typography as paragraph with bodyTextStyle variant', async () => {
    const { container } = await render(<Text component={baseComponent} />);

    const text = container.querySelector('p[data-variant="bodyTextStyle"]');
    expect(text).not.toBeNull();
  });

  it('renders heading tag for heading text style', async () => {
    const component: FormComponentText = {
      ...baseComponent,
      textStyle: 'h2TextStyle',
    };

    const { container } = await render(<Text component={component} />);

    const text = container.querySelector('h2[data-variant="h2TextStyle"]');
    expect(text).not.toBeNull();
  });

  it('does not set data-colspan when gridColSpan is not set', async () => {
    const { container } = await render(<Text component={baseComponent} />);

    const wrapper = container.querySelector('[data-colspan]');
    expect(wrapper).toBeNull();
  });

  it('sets data-colspan when gridColSpan is set', async () => {
    const component: FormComponentText = {
      ...baseComponent,
      gridColSpan: 6,
    };

    const { container } = await render(<Text component={component} />);

    const wrapper = container.querySelector('[data-colspan="6"]');
    expect(wrapper).not.toBeNull();
  });

  it('uses auto flexBasis when child style is compact', async () => {
    const component = {
      ...baseComponent,
      childStyle: ['compactChildStyle'],
    } as unknown as FormComponentText;

    const { container } = await render(<Text component={component} />);

    const wrapper = container.querySelector('.form-component-item') as
      | HTMLDivElement
      | undefined;

    expect(wrapper?.style.flexBasis).toBe('auto');
  });

  it('uses 2em flexBasis when child style is not compact', async () => {
    const component: FormComponentText = {
      ...baseComponent,
      childStyle: ['oneChildStyle'],
    };

    const { container } = await render(<Text component={component} />);

    const wrapper = container.querySelector('.form-component-item') as
      | HTMLDivElement
      | undefined;

    expect(wrapper?.style.flexBasis).toBe('2em');
  });
});
