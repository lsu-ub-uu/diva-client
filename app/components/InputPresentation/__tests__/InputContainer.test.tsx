import type {
  FormComponentContainer,
  FormComponentTextVar,
} from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InputContainer } from '../InputContainer';

describe('InputContainer', () => {
  it('renders container with default layout and colspan', () => {
    const component = {
      type: 'container',
      containerType: 'surrounding',
      name: 'containerName',
      components: [
        {
          type: 'textVariable',
          name: 'someField',
          label: 'someLabel',
          showLabel: true,
          mode: 'input',
        } as FormComponentTextVar,
      ],
    } as FormComponentContainer;

    render(
      <InputContainer path='rootPath' component={component} data={undefined} />,
    );

    const input = screen.getByLabelText('someLabel');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'rootPath.someField[0]');
    expect(input).not.toHaveAttribute(
      'name',
      'rootPath.containerName.someField[0]',
    );
  });
});
