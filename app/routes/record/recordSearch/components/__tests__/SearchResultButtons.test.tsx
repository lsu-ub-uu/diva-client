import { describe, expect, it, vi } from 'vitest';
import { SearchResultButtons } from '../SearchResultButtons';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { BFFDataRecord, BFFSearchResult } from '@/types/record';

describe('SearchResultButton', () => {
  it('renders active clear all filters button', async () => {
    const user = userEvent.setup();
    const clearAllFiltersSpy = vi.fn();
    render(
      <SearchResultButtons
        searchResults={{ data: [] as BFFDataRecord[] } as BFFSearchResult}
        activeFilters={[
          { name: 'filter1', textId: 'Filter1Text', value: 'filter1' },
          {
            name: 'filter2',
            textId: 'Filter2Text',
            value: 'filter2',
            valueTextId: 'Value2Text',
          },
        ]}
        onClearAllFilters={clearAllFiltersSpy}
        apiUrl='http://api.example.com'
        showFilterDialog={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole('button', { name: 'divaClient_clearAllFiltersText' }),
    );
    expect(clearAllFiltersSpy).toHaveBeenCalled();
  });

  it('does not render clear all filters button when no active filters', () => {
    render(
      <SearchResultButtons
        searchResults={{ data: [] as BFFDataRecord[] } as BFFSearchResult}
        activeFilters={[]}
        onClearAllFilters={vi.fn()}
        apiUrl='http://api.example.com'
        showFilterDialog={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'divaClient_clearAllFiltersText' }),
    ).not.toBeInTheDocument();
  });

  it('does not render view in api button when no search results', () => {
    render(
      <SearchResultButtons
        searchResults={{ data: [] as BFFDataRecord[] } as BFFSearchResult}
        activeFilters={[]}
        onClearAllFilters={vi.fn()}
        showFilterDialog={vi.fn()}
        apiUrl='http://api.example.com'
      />,
    );

    expect(
      screen.queryByRole('button', { name: 'divaClient_viewInApiText' }),
    ).not.toBeInTheDocument();
  });

  it('renders view in api button when there are search results', () => {
    render(
      <SearchResultButtons
        searchResults={
          { data: [{ id: '1' }] as BFFDataRecord[] } as BFFSearchResult
        }
        activeFilters={[]}
        onClearAllFilters={vi.fn()}
        apiUrl='http://api.example.com'
        showFilterDialog={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('link', { name: 'divaClient_viewInApiText' }),
    ).toHaveAttribute('href', 'http://api.example.com');
  });

  it('renders show filter dialog button with correct filter count', async () => {
    const showFilterDialogSpy = vi.fn();
    render(
      <SearchResultButtons
        searchResults={{ data: [] as BFFDataRecord[] } as BFFSearchResult}
        activeFilters={[
          { name: 'filter1', textId: 'Filter1Text', value: 'filter1' },
          {
            name: 'filter2',
            textId: 'Filter2Text',
            value: 'filter2',
            valueTextId: 'Value2Text',
          },
        ]}
        onClearAllFilters={vi.fn()}
        apiUrl='http://api.example.com'
        showFilterDialog={showFilterDialogSpy}
      />,
    );

    const filterButton = screen.getByRole('button', {
      name: /^divaClient_showFiltersText/,
    });
    expect(filterButton).toHaveTextContent('2');

    const user = userEvent.setup();
    await user.click(filterButton);

    expect(showFilterDialogSpy).toHaveBeenCalled();
  });
});
