import { describe, expect, it } from 'vitest';
import { HiddenInputComponent } from '../HiddenInputComponent';
import { render } from '@testing-library/react';
import type { FormComponentHidden } from '@/components/FormGenerator/types';

describe('HiddenInputComponent', () => {
  it('render HiddenInputComponent', () => {
    const component = {
      type: 'hidden',
      name: 'someNameInData',
      inputType: 'input',
      finalValue: 'someValue',
      attributesToShow: 'none',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    } as FormComponentHidden;

    const { container } = render(
      <HiddenInputComponent path='path' component={component} />,
    );
    const input = container.querySelector('input[type="hidden"][name="path"]');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'hidden');
    expect(input).toHaveAttribute('name', 'path');
    expect(input).toHaveAttribute('value', 'someValue');
  });

  it('render HiddenInputComponent for linkedRecordType', () => {
    const component = {
      type: 'hidden',
      name: 'someNameInData',
      inputType: 'input',
      finalValue: 'someValue',
      attributesToShow: 'none',
      linkedRecordType: 'someLinkedRecordType',
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
    } as FormComponentHidden;

    const { container } = render(
      <HiddenInputComponent path='path' component={component} />,
    );
    const inputRecordType = container.querySelector(
      'input[type="hidden"][name="path.linkedRecordType"]',
    );

    expect(inputRecordType).toBeInTheDocument();
    expect(inputRecordType).toHaveAttribute('type', 'hidden');
    expect(inputRecordType).toHaveAttribute('name', 'path.linkedRecordType');
    expect(inputRecordType).toHaveAttribute('value', 'someLinkedRecordType');

    const inputRecordId = container.querySelector(
      'input[type="hidden"][name="path.linkedRecordId"]',
    );

    expect(inputRecordId).toBeInTheDocument();
    expect(inputRecordId).toHaveAttribute('type', 'hidden');
    expect(inputRecordId).toHaveAttribute('name', 'path.linkedRecordId');
    expect(inputRecordId).toHaveAttribute('value', 'someValue');
  });
});
