import { MockFormProvider } from '@/utils/testUtils';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';
import { AttributeSelect } from '../AttributeSelect';
import { useWatch } from 'react-hook-form';

vi.mock('react-hook-form');

describe('AttributeSelect', () => {
  it('renders nothing when output mode and no value', async () => {
    mockAttributeValue(undefined);

    const { container } = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='output'
          finalValue={undefined}
          attributesToShow='all'
        />
      </MockFormProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('render in output mode when attributesToShow none', async () => {
    mockAttributeValue('option1');

    const { container } = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='output'
          finalValue={undefined}
          attributesToShow='none'
        />
      </MockFormProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders in output mode when value and attributesToShow all', async () => {
    mockAttributeValue('option1');

    const screen = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='output'
          finalValue={undefined}
          attributesToShow='all'
        />
      </MockFormProvider>,
    );

    await expect.element(screen.getByText('Some label')).toBeVisible();
    await expect.element(screen.getByText('Option1')).toBeVisible();
  });

  it('renders nothing when attributesToShow selectable with value in output mode', async () => {
    mockAttributeValue('option1');

    const { container } = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='output'
          finalValue={undefined}
          attributesToShow='selectable'
        />
      </MockFormProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when input mode and attributesToShow none', async () => {
    mockAttributeValue('option1');

    const { container } = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='input'
          finalValue={undefined}
          attributesToShow='none'
        />
      </MockFormProvider>,
    );

    expect(container.innerHTML).toBe('');
  });

  it('renders combobox when in input mode and attributesToShow selectable', async () => {
    mockAttributeValue(undefined);

    const screen = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='input'
          finalValue={undefined}
          attributesToShow='selectable'
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('combobox', { name: 'Some label' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('option', { name: 'Option1' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('option', { name: 'Option2' }))
      .toBeInTheDocument();
  });

  it('renders combobox when in input mode and attributesToShow all', async () => {
    mockAttributeValue(undefined);

    const screen = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='input'
          finalValue={undefined}
          attributesToShow='all'
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('combobox', { name: 'Some label' }))
      .toBeVisible();
    await expect
      .element(screen.getByRole('option', { name: 'Option1' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('option', { name: 'Option2' }))
      .toBeInTheDocument();
  });

  it('renders selectable with value in input mode', async () => {
    mockAttributeValue('option1');

    const screen = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={[
            { label: 'Option1', value: 'option1' },
            { label: 'Option2', value: 'option2' },
          ]}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='input'
          finalValue={undefined}
          attributesToShow='all'
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('combobox', { name: 'Some label' }))
      .toHaveValue('option1');
    await expect
      .element(screen.getByRole('option', { name: 'Option1' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('option', { name: 'Option2' }))
      .toBeInTheDocument();
  });

  it('renders searchable combobox when more than 20 options', async () => {
    mockAttributeValue('option1');

    const manyOptions = Array.from({ length: 21 }, (_, i) => ({
      label: `Option${i + 1}`,
      value: `option${i + 1}`,
    }));

    const screen = await render(
      <MockFormProvider>
        <AttributeSelect
          name='some.name'
          label='Some label'
          options={manyOptions}
          showLabel={true}
          placeholder={undefined}
          tooltip={undefined}
          displayMode='input'
          finalValue={undefined}
          attributesToShow='all'
        />
      </MockFormProvider>,
    );

    await expect
      .element(screen.getByRole('group', { name: 'Some label' }))
      .toBeVisible();
  });
});

const mockAttributeValue = (value: string | undefined) => {
  // @ts-expect-error TS doesn't understand mocked return values
  vi.mocked(useWatch).mockReturnValue(value);
};
