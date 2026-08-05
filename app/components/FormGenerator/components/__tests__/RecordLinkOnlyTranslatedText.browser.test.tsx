import { RecordLinkOnlyTranslatedText } from '@/components/FormGenerator/components/RecordLinkOnlyTranslatedText';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const getValuesMock = vi.fn();

vi.mock('remix-hook-form', () => ({
  useRemixFormContext: () => ({
    getValues: getValuesMock,
  }),
}));

const baseComponent: FormComponentRecordLink = {
  type: 'recordLink',
  name: 'recordLinkNameInData',
  label: 'recordLinkLabelTextId',
  showLabel: true,
};

describe('RecordLinkOnlyTranslatedText', () => {
  it('renders translated form value and calls getValues with provided path', async () => {
    getValuesMock.mockReturnValue('divaClient_translatedKey');

    const screen = await render(
      <RecordLinkOnlyTranslatedText
        component={baseComponent}
        path='record.path.to.value'
      />,
    );

    await expect
      .element(screen.getByText('divaClient_translatedKey'))
      .toBeVisible();
    expect(getValuesMock).toHaveBeenCalledWith('record.path.to.value');
  });

  it('uses provided grid column span on wrapper', async () => {
    getValuesMock.mockReturnValue('divaClient_translatedKey');

    const { container } = await render(
      <RecordLinkOnlyTranslatedText
        component={{ ...baseComponent, gridColSpan: 4 }}
        path='record.path.to.value'
      />,
    );

    const wrapper = container.querySelector('.form-component-item');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('data-colspan')).toBe('4');
    expect(wrapper?.getAttribute('data-has-value')).toBe('true');
  });

  it('defaults wrapper column span to 12 when gridColSpan is undefined', async () => {
    getValuesMock.mockReturnValue('divaClient_translatedKey');

    const { container } = await render(
      <RecordLinkOnlyTranslatedText
        component={baseComponent}
        path='record.path.to.value'
      />,
    );

    const wrapper = container.querySelector('.form-component-item');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('data-colspan')).toBe('12');
  });
});
