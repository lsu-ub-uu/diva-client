import { MockFormProvider } from '@/utils/testUtils';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AttributeSelect } from '../AttributeSelect';
import { useWatch } from 'react-hook-form';

vi.mock('react-hook-form');

describe('AttributeSelect', () => {
  it('renders nothing when output mode and no value', () => {
    mockAttributeValue(undefined);

    render(
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

    expect(document.body.innerHTML).toBe('<div></div>');
  });

  it('render in output mode when attributesToShow none', () => {
    mockAttributeValue('option1');

    render(
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
    expect(document.body.innerHTML).toBe('<div></div>');
  });

  it('renders in output mode when value and attributesToShow all', () => {
    mockAttributeValue('option1');

    render(
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
    expect(screen.getByText('Some label')).toBeInTheDocument();
    expect(screen.getByText('Option1')).toBeInTheDocument();
  });

  it('renders nothing when attributesToShow selectable with value in output mode', () => {
    mockAttributeValue('option1');

    render(
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
    expect(document.body.innerHTML).toBe('<div></div>');
  });

  it('renders nothing when input mode and attributesToShow none', () => {
    mockAttributeValue('option1');

    render(
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
    expect(document.body.innerHTML).toBe('<div></div>');
  });

  it('renders combobox when in input mode and attributesToShow selectable', () => {
    mockAttributeValue(undefined);

    render(
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
    expect(
      screen.getByRole('combobox', { name: 'Some label' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option2' })).toBeInTheDocument();
  });

  it('renders combobox when in input mode and attributesToShow all', () => {
    mockAttributeValue(undefined);

    render(
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
    expect(
      screen.getByRole('combobox', { name: 'Some label' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option2' })).toBeInTheDocument();
  });

  it('renders selectable with value in input mode', () => {
    mockAttributeValue('option1');

    render(
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
    expect(screen.getByRole('combobox', { name: 'Some label' })).toHaveValue(
      'option1',
    );
    expect(screen.getByRole('option', { name: 'Option1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option2' })).toBeInTheDocument();
  });

  it('renders searchable combobox when more than 20 options', () => {
    mockAttributeValue('option1');

    const manyOptions = Array.from({ length: 21 }, (_, i) => ({
      label: `Option${i + 1}`,
      value: `option${i + 1}`,
    }));

    render(
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
    expect(
      screen.getByRole('group', { name: 'Some label' }),
    ).toBeInTheDocument();
  });
});

const mockAttributeValue = (value: string | undefined) => {
  // @ts-expect-error TS doesn't understand mocked return values
  vi.mocked(useWatch).mockReturnValue(value);
};
