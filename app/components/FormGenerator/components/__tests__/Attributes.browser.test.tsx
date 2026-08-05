import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import type {
  FormAttributeCollection,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const attributeSelectSpy = vi.fn();

vi.mock('@/components/FormGenerator/components/AttributeSelect', () => ({
  AttributeSelect: (props: unknown) => {
    attributeSelectSpy(props);
    return <div data-testid='attribute-select' />;
  },
}));

const firstAttribute: FormAttributeCollection = {
  type: 'collectionVariable',
  name: 'lang',
  label: 'languageLabelTextId',
  showLabel: true,
  mode: 'input',
  placeholder: 'languagePlaceholderTextId',
  finalValue: 'sv',
  options: [{ value: 'sv', label: 'swedishOptionTextId' }],
  tooltip: { title: 'languageTooltipTitleTextId', body: 'tooltipBodyTextId' },
};

const secondAttribute: FormAttributeCollection = {
  type: 'collectionVariable',
  name: 'status',
  label: 'statusLabelTextId',
  showLabel: false,
  mode: 'output',
  options: [{ value: 'active', label: 'activeOptionTextId' }],
};

const componentWithAttributes: FormComponentTextVar = {
  type: 'textVariable',
  name: 'title',
  label: 'titleLabelTextId',
  showLabel: true,
  inputType: 'input',
  attributesToShow: 'selectable',
  attributes: [firstAttribute, secondAttribute],
};

describe('Attributes', () => {
  it('renders one AttributeSelect per attribute', async () => {
    const { container } = await render(
      <Attributes component={componentWithAttributes} path='metadata.title' />,
    );

    expect(
      container.querySelectorAll('[data-testid="attribute-select"]'),
    ).toHaveLength(2);
    expect(attributeSelectSpy).toHaveBeenCalledTimes(2);
  });

  it('passes mapped props to AttributeSelect including path and prepended placeholder option', async () => {
    await render(
      <Attributes component={componentWithAttributes} path='metadata.title' />,
    );

    expect(attributeSelectSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'metadata.title._lang',
        label: 'languageLabelTextId',
        showLabel: true,
        placeholder: 'languagePlaceholderTextId',
        finalValue: 'sv',
        displayMode: 'input',
        attributesToShow: 'selectable',
        options: [
          { value: '', label: 'languagePlaceholderTextId' },
          { value: 'sv', label: 'swedishOptionTextId' },
        ],
      }),
    );
  });

  it('uses initialEmptyValueText when placeholder is missing', async () => {
    await render(
      <Attributes component={componentWithAttributes} path='metadata.title' />,
    );

    expect(attributeSelectSpy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        options: [
          { value: '', label: 'initialEmptyValueText' },
          { value: 'active', label: 'activeOptionTextId' },
        ],
      }),
    );
  });

  it('passes tooltip when showTooltips is true', async () => {
    await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
      >
        <Attributes component={componentWithAttributes} path='metadata.title' />
      </FormGeneratorContext>,
    );

    expect(attributeSelectSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        tooltip: {
          title: 'languageTooltipTitleTextId',
          body: 'tooltipBodyTextId',
        },
      }),
    );
  });

  it('does not pass tooltip when showTooltips is false', async () => {
    await render(
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: false }}
      >
        <Attributes component={componentWithAttributes} path='metadata.title' />
      </FormGeneratorContext>,
    );

    expect(attributeSelectSpy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ tooltip: undefined }),
    );
  });

  it('uses empty string as label when attribute label is missing', async () => {
    const componentWithNoLabel: FormComponentTextVar = {
      ...componentWithAttributes,
      attributes: [
        {
          ...firstAttribute,
          label: undefined,
        } as unknown as FormAttributeCollection,
      ],
    };

    await render(
      <Attributes component={componentWithNoLabel} path='metadata.title' />,
    );

    expect(attributeSelectSpy).toHaveBeenCalledWith(
      expect.objectContaining({ label: '' }),
    );
  });

  it('renders nothing when component has no attributes', async () => {
    const componentWithoutAttributes: FormComponentTextVar = {
      ...componentWithAttributes,
      attributes: undefined,
    };

    const { container } = await render(
      <Attributes
        component={componentWithoutAttributes}
        path='metadata.title'
      />,
    );

    expect(container.innerHTML).toBe('');
    expect(attributeSelectSpy).not.toHaveBeenCalled();
  });
});
