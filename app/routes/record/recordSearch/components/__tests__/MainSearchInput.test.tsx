import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainSearchInput } from '../MainSearchInput';
import type { BFFMetadata } from '@/cora/bffTypes.server';

const mainSearchTerm = {
  textId: 'mainSearchText',
  defTextId: 'mainSearchPlaceholder',
};

describe('MainSearchInput', () => {
  it('renders with initial query', () => {
    render(
      <MainSearchInput
        query='test query'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={vi.fn()}
      />,
    );
    expect(screen.getByRole('searchbox')).toHaveValue('test query');
  });

  it('shows placeholder from mainSearchTerm', () => {
    render(
      <MainSearchInput
        query=''
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={vi.fn()}
      />,
    );
    expect(
      screen.getByPlaceholderText('mainSearchPlaceholder'),
    ).toBeInTheDocument();
  });

  it('calls onClearMainQuery when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(
      <MainSearchInput
        query='something'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={onClear}
      />,
    );
    const clearBtn = screen.getByRole('button', { name: /rensa/i });
    await user.click(clearBtn);
    expect(onClear).toHaveBeenCalled();
  });

  it('updates input value when query prop changes', () => {
    const { rerender } = render(
      <MainSearchInput
        query='first'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={vi.fn()}
      />,
    );
    expect(screen.getByRole('searchbox')).toHaveValue('first');
    rerender(
      <MainSearchInput
        query='second'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={vi.fn()}
      />,
    );
    expect(screen.getByRole('searchbox')).toHaveValue('second');
  });

  it('allows typing in the input', async () => {
    const user = userEvent.setup();
    render(
      <MainSearchInput
        query=''
        mainSearchTerm={mainSearchTerm as any}
        searching={false}
        onClearMainQuery={vi.fn()}
      />,
    );
    const input = screen.getByRole('searchbox');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('shows search icon when not searching and no validation error', () => {
    render(
      <MainSearchInput
        query='test'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={vi.fn()}
      />,
    );
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'aria-invalid',
      'false',
    );
  });

  it('shows loader icon when searching', () => {
    render(
      <MainSearchInput
        query='test'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={true}
        onClearMainQuery={vi.fn()}
      />,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows alert icon when there is a validation error', () => {
    render(
      <MainSearchInput
        query='test'
        mainSearchTerm={mainSearchTerm as BFFMetadata}
        searching={false}
        onClearMainQuery={vi.fn()}
        validationError='search.error'
      />,
    );
    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});
