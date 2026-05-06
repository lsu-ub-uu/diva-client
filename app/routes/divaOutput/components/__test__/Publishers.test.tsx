import type { NameOrganisationPublisherGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Publishers } from '../Publishers';

describe('Publishers', () => {
  it('renders nothing when no publishers', () => {
    render(<Publishers publishers={undefined} />);

    expect(screen.queryByRole('term')).not.toBeInTheDocument();
  });

  it('renders nothing when empty array', () => {
    render(<Publishers publishers={[]} />);

    expect(screen.queryByRole('term')).not.toBeInTheDocument();
  });

  it('renders label and all publisher names', () => {
    const publishers = [
      {
        __text: { en: 'Publisher', sv: 'Förlag' },
        namePart_type_publisher: { value: 'Norstedts' },
      },
      {
        __text: { en: 'Publisher', sv: 'Förlag' },
        namePart_type_publisher: { value: 'Penguin Random House' },
      },
    ] as NameOrganisationPublisherGroup[];

    render(<Publishers publishers={publishers} />);

    expect(screen.getByText('Publisher')).toBeInTheDocument();
    expect(screen.getByText('Norstedts')).toBeInTheDocument();
    expect(screen.getByText('Penguin Random House')).toBeInTheDocument();
  });

  it('renders publishers with imprint and place inline', () => {
    const publishers = [
      {
        __text: { en: 'Publisher', sv: 'Förlag' },
        namePart_type_publisher: { value: 'Penguin Random House' },
        namePart_type_imprint: { value: 'Penguin Classics' },
        place: { placeTerm: { value: 'New York' } },
      },
      {
        __text: { en: 'Publisher', sv: 'Förlag' },
        namePart_type_publisher: { value: 'Norstedts' },
        place: { placeTerm: { value: 'Stockholm' } },
      },
    ] as NameOrganisationPublisherGroup[];

    render(<Publishers publishers={publishers} />);

    expect(
      screen.getByText('Penguin Random House (Penguin Classics), New York'),
    ).toBeInTheDocument();
    expect(screen.getByText('Norstedts, Stockholm')).toBeInTheDocument();
  });
});
