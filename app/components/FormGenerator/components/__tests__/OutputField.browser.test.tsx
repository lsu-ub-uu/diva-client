import {
  FormGeneratorContext,
  type EnhancedFieldsConfig,
} from '@/components/FormGenerator/FormGeneratorContext';
import { OutputField } from '@/components/FormGenerator/components/OutputField';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';

interface RenderOutputFieldOptions {
  enhancedFields?: Record<string, EnhancedFieldsConfig>;
}

const renderOutputField = async (
  ui: React.ReactElement,
  { enhancedFields = {} }: RenderOutputFieldOptions = {},
) => {
  const RoutesStub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <FormGeneratorContext
          value={{
            showDevInfo: false,
            boxGroups: false,
            showTooltips: true,
            enhancedFields,
          }}
        >
          {ui}
        </FormGeneratorContext>
      ),
    },
    {
      path: '/target',
      Component: () => <div>target</div>,
    },
    {
      path: '/wild-target',
      Component: () => <div>wild target</div>,
    },
  ]);

  return render(<RoutesStub />);
};

describe('OutputField', () => {
  it('renders short value as typography and label with inline variant', async () => {
    const screen = await renderOutputField(
      <OutputField
        path='record.field'
        className='custom-class'
        label='fieldLabelTextId'
        value='fieldValueTextId'
        variant='inline'
      />,
    );

    await expect.element(screen.getByText('fieldLabelTextId')).toBeVisible();
    await expect.element(screen.getByText('fieldValueTextId')).toBeVisible();

    const root = screen.container.querySelector('[data-variant="inline"]');
    expect(root).not.toBeNull();
    expect(root?.classList.contains('custom-class')).toBe(true);
    expect(root?.getAttribute('data-has-label')).toBe('true');
    expect(root?.getAttribute('data-has-value')).toBe('true');

    const value = screen.getByText('fieldValueTextId');
    await expect
      .element(value)
      .toHaveAttribute('aria-labelledby', 'record.field-label');
  });

  it('sets data-has-label to false when label is not provided', async () => {
    const screen = await renderOutputField(
      <OutputField path='record.field' value='fieldValueTextId' />,
    );

    await expect.element(screen.getByText('fieldValueTextId')).toBeVisible();

    const root = screen.container.querySelector('[data-variant="block"]');
    expect(root).not.toBeNull();
    expect(root?.getAttribute('data-has-label')).toBe('false');
  });

  it('does not render value element when value is undefined', async () => {
    const screen = await renderOutputField(
      <OutputField path='record.field' label='fieldLabelTextId' />,
    );

    await expect.element(screen.getByText('fieldLabelTextId')).toBeVisible();

    const value = screen.container.querySelector(
      '[aria-labelledby="record.field-label"]',
    );
    expect(value).toBeNull();
  });

  it('renders long value using CollapsableText and expands on click', async () => {
    const longValue = 'a'.repeat(301);
    const truncatedValue = `${longValue.slice(0, 300)}...`;

    const screen = await renderOutputField(
      <OutputField
        path='record.field'
        label='fieldLabelTextId'
        value={longValue}
      />,
    );

    await expect.element(screen.getByText(truncatedValue)).toBeVisible();

    const button = screen.getByRole('button', {
      name: 'divaClient_showMoreText',
    });

    await expect.element(button).toHaveAttribute('aria-expanded', 'false');

    await button.click();

    await expect.element(screen.getByText(longValue)).toBeVisible();
    await expect
      .element(screen.getByRole('button', { name: 'divaClient_showLessText' }))
      .toHaveAttribute('aria-expanded', 'true');
  });

  it('wraps output in a link when enhancement type is link', async () => {
    const screen = await renderOutputField(
      <OutputField path='record.field' value='fieldValueTextId' />,
      {
        enhancedFields: {
          'record.field': { type: 'link', to: '/target' },
        },
      },
    );

    const link = screen.getByRole('link', { name: 'fieldValueTextId' });
    await expect.element(link).toHaveAttribute('href', '/target');
  });

  it('wraps output in a link when enhancement path uses wildcard matching', async () => {
    const screen = await renderOutputField(
      <OutputField path='record.0.title' value='fieldValueTextId' />,
      {
        enhancedFields: {
          'record.*.title': { type: 'link', to: '/wild-target' },
        },
      },
    );

    const link = screen.getByRole('link', { name: 'fieldValueTextId' });
    await expect.element(link).toHaveAttribute('href', '/wild-target');
  });

  it('does not render a link wrapper for non-link enhancement', async () => {
    const screen = await renderOutputField(
      <OutputField path='record.field' value='fieldValueTextId' />,
      {
        enhancedFields: {
          'record.field': { type: 'group', alert: true },
        },
      },
    );

    await expect.element(screen.getByText('fieldValueTextId')).toBeVisible();

    const link = screen.container.querySelector('a[href="/target"]');
    expect(link).toBeNull();
  });

  it('renders attributes and action button group content', async () => {
    const screen = await renderOutputField(
      <OutputField
        path='record.field'
        label='fieldLabelTextId'
        value='fieldValueTextId'
        attributes={<span>attributes content</span>}
        actionButtonGroup={<button type='button'>action content</button>}
      />,
    );

    await expect.element(screen.getByText('attributes content')).toBeVisible();
    await expect
      .element(screen.getByRole('button', { name: 'action content' }))
      .toBeVisible();
  });
});
