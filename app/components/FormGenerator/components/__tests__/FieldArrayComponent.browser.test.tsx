import type { EnhancedFieldsConfig } from '@/components/FormGenerator/FormGeneratorContext';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { FieldArrayComponent } from '@/components/FormGenerator/components/FieldArrayComponent';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useForm } from 'react-hook-form';

const component: FormComponentWithData = {
  type: 'textVariable',
  name: 'item',
  showLabel: true,
  label: 'itemLabelTextId',
  inputType: 'input',
  mode: 'input',
  repeat: {
    repeatMin: 1,
    repeatMax: 3,
  },
};

const renderWithContext = async (
  ui: ReactNode,
  enhancedFields: Record<string, EnhancedFieldsConfig> = {},
) =>
  render(
    <FormGeneratorContext.Provider
      value={{
        ...{
          linkedData: undefined,
          showDevInfo: false,
          boxGroups: false,
          showTooltips: true,
          enhancedFields: {},
        },
        enhancedFields,
      }}
    >
      {ui}
    </FormGeneratorContext.Provider>,
  );

const FieldArrayHarness = ({
  initialFields,
  component,
  renderCallback,
  anchorId,
}: {
  initialFields: Array<{ id: string; repeatId?: string }>;
  component: FormComponentWithData;
  renderCallback: (
    path: string,
    actionButtonGroup: ReactNode,
    index: number,
    isAppended: boolean,
  ) => ReactNode;
  anchorId?: string;
}) => {
  const { control } = useForm<any>({
    defaultValues: {
      root: {
        items: initialFields,
      },
    },
  });

  return (
    <>
      <FieldArrayComponent
        control={control}
        name='root.items'
        component={component}
        anchorId={anchorId}
        renderCallback={renderCallback}
      />
    </>
  );
};

describe('FieldArrayComponent', () => {
  it('calls renderCallback with path and index for each field', async () => {
    const renderCallback = vi.fn(
      (path, actionButtonGroup, index, isAppended) => (
        <div data-testid={`row-${index}`}>
          <span>{path}</span>
          <span>{String(isAppended)}</span>
          {actionButtonGroup}
        </div>
      ),
    );

    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[
          { id: '1', repeatId: 'r1' },
          { id: '2', repeatId: 'r2' },
        ]}
        component={component}
        renderCallback={renderCallback}
      />,
    );

    expect(renderCallback).toHaveBeenCalledWith(
      'root.items.0',
      expect.anything(),
      0,
      false,
    );
    expect(renderCallback).toHaveBeenCalledWith(
      'root.items.1',
      expect.anything(),
      1,
      false,
    );

    await expect.element(screen.getByTestId('row-0')).toBeVisible();
    await expect.element(screen.getByTestId('row-1')).toBeVisible();
  });

  it('shows add button only in input mode with label and below repeatMax', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={component}
        renderCallback={(path) => <div>{path}</div>}
      />,
    );

    await expect
      .element(screen.getByRole('button', { name: 'divaClient_addFieldText' }))
      .toBeVisible();
  });

  it('hides add button when mode is output', async () => {
    const outputComponent = {
      ...component,
      mode: 'output',
    } as FormComponentWithData;

    const { container } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={outputComponent}
        renderCallback={(path) => <div>{path}</div>}
      />,
    );

    expect(
      container.querySelector('[aria-label="divaClient_addFieldText"]'),
    ).toBeNull();
    expect(container.querySelector('[data-action-button]')).toBeNull();
  });

  it('hides add button when label is missing', async () => {
    const noLabelComponent = {
      ...component,
      label: undefined,
    } as unknown as FormComponentWithData;

    const { container: noLabelContainer } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={noLabelComponent}
        renderCallback={(path) => <div>{path}</div>}
      />,
    );
    expect(
      noLabelContainer.querySelector('[data-variant="tertiary"]'),
    ).toBeNull();
  });

  it('hides add button when repeatMax is reached', async () => {
    const { container: atMaxContainer } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[
          { id: '1', repeatId: 'r1' },
          { id: '2', repeatId: 'r2' },
          { id: '3', repeatId: 'r3' },
        ]}
        component={component}
        renderCallback={(path) => <div>{path}</div>}
      />,
    );
    expect(
      atMaxContainer.querySelector('[data-variant="tertiary"]'),
    ).toBeNull();
  });

  it('sets button id to anchorId only when there are no fields', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[]}
        component={{ ...component, addText: 'addItemTextId' }}
        anchorId='my-anchor-id'
        renderCallback={(path) => <div>{path}</div>}
      />,
    );

    const addButton = screen.getByRole('button', { name: 'addItemTextId' });
    expect(addButton.element().getAttribute('id')).toBe('my-anchor-id');
    await addButton.click();
    expect(addButton.element().getAttribute('id')).toBeNull();
  });

  it('marks only newly appended row as isAppended', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={component}
        renderCallback={(path, _buttons, _index, isAppended) => (
          <div>{`${path}|${String(isAppended)}`}</div>
        )}
      />,
    );

    await expect.element(screen.getByText('root.items.0|false')).toBeVisible();

    await screen
      .getByRole('button', { name: 'divaClient_addFieldText' })
      .click();

    await expect.element(screen.getByText('root.items.1|true')).toBeVisible();
  });

  it('hides action buttons for notRemovable enhancement', async () => {
    const { container } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={component}
        renderCallback={(path, actionButtonGroup) => (
          <div>
            {path}
            {actionButtonGroup}
          </div>
        )}
      />,
      {
        'root.items': { type: 'notRemovable' },
      },
    );

    expect(container.querySelector('[data-action-button]')).toBeNull();
  });

  it('hides move and delete buttons for singular optional when showLabel is false', async () => {
    const singularOptionalComponent = {
      ...component,
      showLabel: false,
      repeat: {
        repeatMin: 0,
        repeatMax: 1,
      },
    } as FormComponentWithData;

    const { container } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={singularOptionalComponent}
        renderCallback={(path, actionButtonGroup) => (
          <div>
            {path}
            {actionButtonGroup}
          </div>
        )}
      />,
    );

    expect(container.querySelector('[data-action-button]')).toBeNull();
  });

  it('disables move-up button for the first item', async () => {
    const { container } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[
          { id: '1', repeatId: 'r1' },
          { id: '2', repeatId: 'r2' },
          { id: '3', repeatId: 'r3' },
        ]}
        component={component}
        renderCallback={(path, actionButtonGroup) => (
          <div>
            {path}
            {actionButtonGroup}
          </div>
        )}
      />,
    );

    const moveUpButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        '[data-action-button="move-up"]',
      ),
    );

    expect(moveUpButtons[0]?.disabled).toBe(true);
    expect(moveUpButtons[1]?.disabled).toBe(false);
    expect(moveUpButtons[2]?.disabled).toBe(false);
  });

  it('disables move-down button for the last item and executes move-down', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[
          { id: '1', repeatId: 'r1' },
          { id: '2', repeatId: 'r2' },
          { id: '3', repeatId: 'r3' },
        ]}
        component={component}
        renderCallback={(path, actionButtonGroup) => (
          <div>
            {path}
            {actionButtonGroup}
          </div>
        )}
      />,
    );
    const { container } = screen;

    const moveDownButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        '[data-action-button="move-down"]',
      ),
    );

    expect(moveDownButtons[0]?.disabled).toBe(false);
    expect(moveDownButtons[2]?.disabled).toBe(true);

    moveDownButtons[0]?.click();
    // after moving item 0 down, the item now at index 2 should have move-down disabled
    await expect
      .poll(
        () =>
          Array.from(
            container.querySelectorAll<HTMLButtonElement>(
              '[data-action-button="move-down"]',
            ),
          )[2]?.disabled,
      )
      .toBe(true);
  });

  it('executes delete action and removes the item', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[
          { id: '1', repeatId: 'r1' },
          { id: '2', repeatId: 'r2' },
          { id: '3', repeatId: 'r3' },
        ]}
        component={component}
        renderCallback={(path, actionButtonGroup) => (
          <div>
            {path}
            {actionButtonGroup}
          </div>
        )}
      />,
    );
    const { container } = screen;

    const deleteButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        '[data-action-button="delete"]',
      ),
    );

    expect(deleteButtons[0]?.disabled).toBe(false);

    deleteButtons[1]?.click();
    await expect
      .poll(
        () =>
          container.querySelectorAll('[data-action-button="delete"]').length,
      )
      .toBe(2);
  });

  it('disables delete when fields length is at repeatMin boundary', async () => {
    const { container } = await renderWithContext(
      <FieldArrayHarness
        initialFields={[{ id: '1', repeatId: 'r1' }]}
        component={{
          ...component,
          repeat: {
            repeatMin: 1,
            repeatMax: 3,
          },
        }}
        renderCallback={(path, actionButtonGroup) => (
          <div>
            {path}
            {actionButtonGroup}
          </div>
        )}
      />,
    );

    const deleteButton = container.querySelector(
      '[data-action-button="delete"]',
    ) as HTMLButtonElement | null;
    expect(deleteButton?.disabled).toBe(true);
  });

  it('uses addText and applies gridColSpan on add row container', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[]}
        component={{
          ...component,
          addText: 'customAddTextId',
          gridColSpan: 7,
        }}
        renderCallback={(path) => <div>{path}</div>}
      />,
    );

    await expect
      .element(screen.getByRole('button', { name: 'customAddTextId' }))
      .toBeVisible();

    const addButtonContainer = screen
      .getByRole('button', { name: 'customAddTextId' })
      .element().parentElement;
    expect(addButtonContainer?.getAttribute('data-colspan')).toBe('7');
  });

  it('defaults gridColSpan to 12 when not provided', async () => {
    const screen = await renderWithContext(
      <FieldArrayHarness
        initialFields={[]}
        component={{ ...component, addText: 'customAddTextId' }}
        renderCallback={(path) => <div>{path}</div>}
      />,
    );

    const addButtonContainer = screen
      .getByRole('button', { name: 'customAddTextId' })
      .element().parentElement;
    expect(addButtonContainer?.getAttribute('data-colspan')).toBe('12');
  });
});
