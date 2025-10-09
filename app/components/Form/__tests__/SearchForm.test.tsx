import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchForm } from '../SearchForm';
import {
  searchFormWithoutPermissionUnit,
  searchFormWithPermissionUnit,
} from '@/__mocks__/data/form/searchForm';
import { createRoutesStub } from 'react-router';
import type { BFFDataRecord } from '@/types/record';
import { mock } from 'vitest-mock-extended';
import { useMember } from '@/utils/rootLoaderDataUtils';
import type { BFFMember } from '@/cora/transform/bffTypes.server';

vi.mock('@/utils/rootLoaderDataUtils', () => ({
  useMember: vi.fn(),
}));

describe('SearchForm', () => {
  it('renders a hidden input for search.rows and search.start when no search results', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchForm formSchema={searchFormWithoutPermissionUnit} />
        ),
      },
    ]);

    render(<RoutesStub />);

    const hiddenInput = screen.getByTestId('rowsHiddenSearchTerm');
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput).toHaveAttribute('name', 'search.rows.value');
    expect(hiddenInput).toHaveValue('10');

    expect(
      screen.queryByRole('textbox', { name: 'searchStartNumberVarText' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('textbox', { name: 'searchRowsNumberVarText' }),
    ).not.toBeInTheDocument();
  });

  it('does not renders a hidden input for search.rows when search results', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchForm
            formSchema={searchFormWithoutPermissionUnit}
            searchResults={{
              containDataOfType: 'diva-member',
              fromNo: 1,
              toNo: 10,
              totalNo: 100,
              data: [mock<BFFDataRecord>()],
            }}
          />
        ),
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.queryByTestId('rowsHiddenSearchTerm'),
    ).not.toBeInTheDocument();
  });

  it('renders a hidden permissionUnit input when member has memberPermissionUnit and formDef has permissionUnit', () => {
    vi.mocked(useMember).mockReturnValue(
      mock<BFFMember>({
        memberPermissionUnit: 'testPermissionUnit',
      }),
    );

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchForm
            formSchema={searchFormWithPermissionUnit}
            searchResults={{
              containDataOfType: 'diva-member',
              fromNo: 1,
              toNo: 10,
              totalNo: 100,
              data: [mock<BFFDataRecord>()],
            }}
          />
        ),
      },
    ]);

    render(<RoutesStub />);

    const hiddenInput = screen.getByTestId('permissionUnitHiddenSearchTerm');
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput).toHaveAttribute(
      'name',
      'search.include.includePart.permissionUnitSearchTerm.value',
    );
    expect(hiddenInput).toHaveValue('permissionUnit_testPermissionUnit');
  });

  it('renders a visible permissionUnit input when member does not have memberPermissionUnit but formDef does have permissionUnit', () => {
    vi.mocked(useMember).mockReturnValue(
      mock<BFFMember>({
        memberPermissionUnit: undefined,
      }),
    );

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchForm
            formSchema={searchFormWithPermissionUnit}
            searchResults={{
              containDataOfType: 'diva-member',
              fromNo: 1,
              toNo: 10,
              totalNo: 100,
              data: [mock<BFFDataRecord>()],
            }}
          />
        ),
      },
    ]);

    render(<RoutesStub />);

    expect(
      screen.queryByTestId('permissionUnitHiddenSearchTerm'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'permissionUnitSearchTextVarText' }),
    ).toBeInTheDocument();
  });

  it('does not render hidden or visible permissionUnit input when formDef does not have permissionUnit', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchForm
            formSchema={searchFormWithoutPermissionUnit}
            searchResults={{
              containDataOfType: 'diva-member',
              fromNo: 1,
              toNo: 10,
              totalNo: 100,
              data: [mock<BFFDataRecord>()],
            }}
          />
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(
      screen.queryByTestId('permissionUnitHiddenSearchTerm'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId('permissionUnitSearchTextVarText'),
    ).not.toBeInTheDocument();
  });

  it('does not render hidden or visible permissionUnit input when formDef does not have permissionUnit but member does', () => {
    vi.mocked(useMember).mockReturnValue(
      mock<BFFMember>({
        memberPermissionUnit: 'testPermissionUnit',
      }),
    );

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <SearchForm
            formSchema={searchFormWithoutPermissionUnit}
            searchResults={{
              containDataOfType: 'diva-member',
              fromNo: 1,
              toNo: 10,
              totalNo: 100,
              data: [mock<BFFDataRecord>()],
            }}
          />
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(
      screen.queryByTestId('permissionUnitHiddenSearchTerm'),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByTestId('permissionUnitSearchTextVarText'),
    ).not.toBeInTheDocument();
  });
});
