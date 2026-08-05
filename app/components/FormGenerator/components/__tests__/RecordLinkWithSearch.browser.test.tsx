import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { RecordLinkWithSearch } from '@/components/FormGenerator/components/RecordLinkWithSearch';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { RemixFormProvider, useRemixFormContext } from 'remix-hook-form';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { href, useFetcher } from 'react-router';
import { useMember } from '@/utils/rootLoaderDataUtils';

const submitMock = vi.fn();
const fetcherMock = {
  data: undefined as { result: BFFDataRecord[] } | undefined,
  state: 'idle',
  submit: submitMock,
};

vi.mock('@/components/OutputPresentation/OutputPresentation', () => ({
  OutputPresentation: ({ data }: { data: { title?: string } }) => (
    <span>{data.title ?? 'record-option'}</span>
  ),
}));

vi.mock('@/cora/transform/transformToRaw', () => ({
  transformToRaw: (data: unknown) => data,
}));

vi.mock('@/utils/rootLoaderDataUtils', () => ({
  useMember: vi.fn(),
}));

vi.mock('@/utils/useDebouncedCallback', () => ({
  useDebouncedCallback: <T extends (...args: any[]) => void>(callback: T) =>
    callback,
}));

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    href: vi.fn(),
    useFetcher: vi.fn(),
  };
});

const mockedHref = vi.mocked(href);
const mockedUseFetcher = vi.mocked(useFetcher);
const mockedUseMember = vi.mocked(useMember);

const baseComponent: FormComponentRecordLink = {
  type: 'recordLink',
  name: 'record',
  label: 'recordLinkLabelTextId',
  showLabel: true,
  mode: 'input',
  recordLinkType: 'person',
  searchPresentation: {
    searchType: 'personSearch',
    autocompleteSearchTerm: {
      name: 'search.include.0.term.value',
    },
    permissionUnitLinkedRecordIdSearchTerm: {
      name: 'search.include.0.permissionUnit.value',
    },
  },
};

const makeRecord = (id: string, title: string): BFFDataRecord => ({
  id,
  recordType: 'person',
  validationType: 'personValidation',
  data: { title },
  presentation: {
    form: {
      type: 'group',
      name: 'form',
      label: 'form',
      showLabel: false,
      components: [],
    },
  },
  actionLinks: {},
});

const FormValueProbe = ({ name }: { name: string }) => {
  const { watch } = useRemixFormContext();
  const value = watch(name) as
    | { value?: string; linkedRecordType?: string }
    | undefined;

  return (
    <>
      <output data-testid='selected-value'>{value?.value ?? ''}</output>
      <output data-testid='selected-type'>
        {value?.linkedRecordType ?? ''}
      </output>
    </>
  );
};

const defaultFormValues = {
  record: { value: '', linkedRecordType: 'person' },
};

const TestWrapper = ({
  component = baseComponent,
  defaultValues = defaultFormValues,
  errorMessage,
}: {
  component?: FormComponentRecordLink;
  defaultValues?: Record<string, unknown>;
  errorMessage?: string;
}) => {
  const formErrors = useMemo(
    () =>
      errorMessage
        ? {
            record: {
              value: {
                type: 'manual',
                message: errorMessage,
              },
            },
          }
        : undefined,
    [errorMessage],
  );

  const methods = useForm({
    defaultValues,
    errors: formErrors,
  });

  return (
    <RemixFormProvider {...methods}>
      <FormGeneratorContext
        value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
      >
        <RecordLinkWithSearch component={component} path='record' />
        <FormValueProbe name='record' />
      </FormGeneratorContext>
    </RemixFormProvider>
  );
};

describe('RecordLinkWithSearch', () => {
  beforeEach(() => {
    submitMock.mockReset();
    fetcherMock.data = undefined;
    fetcherMock.state = 'idle';
    fetcherMock.submit = submitMock;

    mockedHref.mockImplementation((...args) => {
      const params = args[1] as { searchType?: string } | undefined;
      return `/autocompleteSearch/${params?.searchType ?? ''}`;
    });
    mockedUseFetcher.mockReturnValue(fetcherMock as never);
    mockedUseMember.mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders the label and defaults wrapper column span to 12', async () => {
    const { container, ...screen } = await render(<TestWrapper />);

    await expect
      .element(screen.getByRole('combobox', { name: 'recordLinkLabelTextId' }))
      .toBeVisible();

    const wrapper = container.querySelector('.form-component-item');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('data-colspan')).toBe('12');
  });

  it('uses the provided grid column span on the wrapper', async () => {
    const { container } = await render(
      <TestWrapper component={{ ...baseComponent, gridColSpan: 4 }} />,
    );

    const wrapper = container.querySelector('.form-component-item');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('data-colspan')).toBe('4');
  });

  it('submits the typed search term to the fetcher', async () => {
    const screen = await render(<TestWrapper />);

    const input = screen.getByRole('combobox', {
      name: 'recordLinkLabelTextId',
    });

    await input.click();
    await input.fill('Ada');

    expect(submitMock).toHaveBeenLastCalledWith(
      {
        'search.include.0.term.value': 'Ada',
      },
      {
        method: 'GET',
        action: '/autocompleteSearch/personSearch',
      },
    );
  });

  it('adds the permission unit search term when member data is available', async () => {
    mockedUseMember.mockReturnValue({ memberPermissionUnit: 'uu' } as never);

    const screen = await render(<TestWrapper />);

    const input = screen.getByRole('combobox', {
      name: 'recordLinkLabelTextId',
    });

    await input.fill('Ada');

    expect(submitMock).toHaveBeenLastCalledWith(
      {
        'search.include.0.term.value': 'Ada',
        'search.include.0.permissionUnit.value': 'permissionUnit_uu',
      },
      {
        method: 'GET',
        action: '/autocompleteSearch/personSearch',
      },
    );
  });

  it('does not add the permission unit search term when member data is missing', async () => {
    const screen = await render(<TestWrapper />);

    const input = screen.getByRole('combobox', {
      name: 'recordLinkLabelTextId',
    });

    await input.fill('Ada');

    expect(submitMock).toHaveBeenLastCalledWith(
      {
        'search.include.0.term.value': 'Ada',
      },
      {
        method: 'GET',
        action: '/autocompleteSearch/personSearch',
      },
    );
  });

  it('renders no options before fetcher data is available', async () => {
    const { container, ...screen } = await render(<TestWrapper />);

    await screen.getByRole('combobox').click();

    expect(container.querySelectorAll('[role="option"]')).toHaveLength(0);
  });

  it('shows a translated no-results option when the fetcher returns no results', async () => {
    fetcherMock.data = { result: [] };

    const screen = await render(<TestWrapper />);

    await screen.getByRole('combobox').click();

    await expect
      .element(
        screen.getByRole('option', {
          name: 'divaClient_recordLinkAutocompleteNoResultsText',
        }),
      )
      .toBeVisible();
  });

  it('writes the selected record id and linked record type back to the form', async () => {
    fetcherMock.data = { result: [makeRecord('record-1', 'Ada Lovelace')] };

    const screen = await render(<TestWrapper />);

    await screen.getByRole('combobox').click();
    await screen.getByRole('option', { name: 'Ada Lovelace' }).click();

    await expect
      .element(screen.getByTestId('selected-value'))
      .toHaveTextContent('record-1');
    await expect
      .element(screen.getByTestId('selected-type'))
      .toHaveTextContent('person');
  });

  it('forwards invalid and loading state to the autocomplete', async () => {
    fetcherMock.data = { result: [makeRecord('record-1', 'Ada Lovelace')] };
    fetcherMock.state = 'loading';

    const screen = await render(<TestWrapper errorMessage='Required field' />);

    const input = screen.getByRole('combobox', {
      name: 'recordLinkLabelTextId',
    });

    await expect.element(input).toHaveAttribute('aria-invalid', 'true');
    await expect.element(screen.getByText('Required field')).toBeVisible();

    await input.click();

    await expect
      .element(screen.getByRole('listbox'))
      .toHaveAttribute('aria-busy', 'true');
  });
});
