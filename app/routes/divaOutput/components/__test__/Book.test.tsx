import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Book } from '../Book';
import type { RelatedItemBookGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('Book', () => {
  it('shows nothing when there is no book', () => {
    render(<Book book={undefined} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('shows book information when there is a book', () => {
    const book = {
      __text: { en: 'Book', sv: 'Bok' },
      book: {
        __text: { en: 'Book', sv: 'Bok' },
        value: 'diva-output:12345',
        linkedRecord: {
          output: {
            titleInfo: {
              __text: { en: 'Title', sv: 'Titel' },
              title: {
                __text: { en: 'Main Title', sv: 'Huvudtitel' },
                value: 'LinkedBookTitle',
              },
              subtitle: {
                __text: { en: 'Subtitle', sv: 'Undertitel' },
                value: 'LinkedBookSubtitle',
              },
            },
          },
        },
      },
      titleInfo: {
        __text: { en: 'Title', sv: 'Titel' },
        title: {
          __text: { en: 'Main Title', sv: 'Huvudtitel' },
          value: 'BookTitle',
        },
        subtitle: {
          __text: { en: 'Subtitle', sv: 'Undertitel' },
          value: 'BookSubtitle',
        },
      },
      note_type_statementOfResponsibility: {
        __text: { en: 'Editor' },
        value: 'Some Editor',
      },
      identifier_type_doi: {
        __text: { en: 'DOI' },
        value: '10.1234/linked.doi',
      },
      identifier_type_isbn: [
        {
          __text: { en: 'ISBN', sv: 'ISBN' },
          _displayLabel: 'print',
          value: '978-92-893-8293-9',
        },
        {
          __text: { en: 'ISBN', sv: 'ISBN' },
          _displayLabel: 'online',
          value: '978-92-893-8294-6',
        },
      ],
      part: {
        extent: {
          start: { __text: { en: 'Start page' }, value: '12' },
          end: { __text: { en: 'End page' }, value: '34' },
        },
      },
    } as RelatedItemBookGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Book book={book} /> },
    ]);
    render(<RoutesStub />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Book' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Book' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'LinkedBookTitle: LinkedBookSubtitle' }),
    ).toBeVisible();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('BookTitle: BookSubtitle')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Some Editor')).toBeInTheDocument();
    expect(screen.getByText('ISBN (print)')).toBeInTheDocument();
    expect(screen.getByText('978-92-893-8293-9')).toBeInTheDocument();
    expect(screen.getByText('ISBN (online)')).toBeInTheDocument();
    expect(screen.getByText('978-92-893-8294-6')).toBeInTheDocument();
    expect(screen.getByText('DOI')).toBeInTheDocument();
    expect(screen.getByText('10.1234/linked.doi')).toBeInTheDocument();
    expect(screen.getByText('Start page')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('End page')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
  });

  it.todo('shows related series');
});
