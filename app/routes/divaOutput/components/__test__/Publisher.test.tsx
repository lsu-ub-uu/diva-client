import type { NameOrganisationPublisherGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Publisher } from '../Publisher';

describe('Publisher', () => {
  it('renders linked publisher name over uncontrolled', () => {
    const publisher = {
      publisher: {
        value: 'publisher1',
        linkedRecord: {
          publisher: {
            name_type_corporate: {
              namePart: { value: 'Norstedts' },
            },
          },
        },
      },
      namePart_type_publisher: { value: 'Uncontrolled Publisher' },
    } as NameOrganisationPublisherGroup;

    render(<Publisher publisher={publisher} />);

    expect(screen.getByText('Norstedts')).toBeInTheDocument();
    expect(
      screen.queryByText('Uncontrolled Publisher'),
    ).not.toBeInTheDocument();
  });

  it('renders uncontrolled publisher name when no linked record', () => {
    const publisher = {
      namePart_type_publisher: { value: 'Penguin Random House' },
    } as NameOrganisationPublisherGroup;

    render(<Publisher publisher={publisher} />);

    expect(screen.getByText('Penguin Random House')).toBeInTheDocument();
  });

  it('renders name with imprint in parentheses', () => {
    const publisher = {
      namePart_type_publisher: { value: 'Penguin Random House' },
      namePart_type_imprint: { value: 'Penguin Classics' },
    } as NameOrganisationPublisherGroup;

    render(<Publisher publisher={publisher} />);

    expect(
      screen.getByText('Penguin Random House (Penguin Classics)'),
    ).toBeInTheDocument();
  });

  it('renders name with place after comma', () => {
    const publisher = {
      namePart_type_publisher: { value: 'Norstedts' },
      place: { placeTerm: { value: 'Stockholm' } },
    } as NameOrganisationPublisherGroup;

    render(<Publisher publisher={publisher} />);

    expect(screen.getByText('Norstedts, Stockholm')).toBeInTheDocument();
  });

  it('renders name with imprint and place', () => {
    const publisher = {
      namePart_type_publisher: { value: 'Penguin Random House' },
      namePart_type_imprint: { value: 'Penguin Classics' },
      place: { placeTerm: { value: 'New York' } },
    } as NameOrganisationPublisherGroup;

    render(<Publisher publisher={publisher} />);

    expect(
      screen.getByText('Penguin Random House (Penguin Classics), New York'),
    ).toBeInTheDocument();
  });

  it('renders empty string when no name available', () => {
    const publisher = {} as NameOrganisationPublisherGroup;

    const { container } = render(<Publisher publisher={publisher} />);

    expect(container.textContent).toBe('');
  });
});
