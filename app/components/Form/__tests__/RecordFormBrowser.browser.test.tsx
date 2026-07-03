import type {
  FormComponentCollVar,
  RecordFormSchema,
} from '@/components/FormGenerator/types';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { RecordFormWithRoutesStub } from './RecordFormTestHelper';

describe('RecordFormBrowser', () => {
  it('is possible to move a filterable combobox up', async () => {
    const formSchema: RecordFormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        presentationId: 'someRootNameInDataPGroup',
        showLabel: true,
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678',
        },
        components: [
          {
            type: 'collectionVariable',
            presentationId: 'someNameInDataVar',
            name: 'someNameInData',
            label: 'someLabelTextId',
            showLabel: true,
            mode: 'input',
            placeholder: 'someEmptyTextId',
            options: Array.from({ length: 30 }, (_, i) => ({
              label: `Option ${i + 1}`,
              value: `option${i + 1}`,
            })),
            repeat: {
              repeatMin: 0,
              repeatMax: 99999,
              minNumberOfRepeatingToShow: 2,
            },
          } satisfies FormComponentCollVar,
        ],
        mode: 'input',
      },
    };

    const screen = await render(
      <RecordFormWithRoutesStub formSchema={formSchema} />,
    );

    const comboboxes = screen.getByRole('combobox', {
      name: 'someLabelTextId',
    });

    await comboboxes.first().click();
    await screen
      .getByRole('option', {
        name: 'Option 1',
        exact: true,
      })
      .first()
      .click();

    await comboboxes.last().click();
    await screen
      .getByRole('option', {
        name: 'Option 2',
        exact: true,
      })
      .last()
      .click();

    await expect.element(comboboxes.first()).toHaveTextContent('Option 1');
    await expect.element(comboboxes.last()).toHaveTextContent('Option 2');

    await screen
      .getByRole('button', { name: 'divaClient_moveFieldUpText' })
      .last()
      .click();

    await expect.element(comboboxes.first()).toHaveTextContent('Option 2');
    await expect.element(comboboxes.last()).toHaveTextContent('Option 1');
  });
});
