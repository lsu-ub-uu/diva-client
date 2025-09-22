import type {
  NameOrganisationDegreeGrantingInstitutionGroup,
  NameOrganisationGroup,
} from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Organisation } from '../Organisation';

describe('Organisation', () => {
  it('renders a NameOrganisationGroup with name only when not expanded', () => {
    const organisation = {
      namePart: { value: 'Test Organisation' },
      role: {
        roleTerm: [
          { __valueText: { en: 'Publisher', sv: 'Utgivare' } },
          { __valueText: { en: 'Sponsor', sv: 'Sponsor' } },
        ],
      },
    } as NameOrganisationGroup;

    render(<Organisation organisation={organisation} />);

    expect(screen.getByText('Test Organisation')).toBeInTheDocument();
    expect(screen.queryByText('(Publisher, Sponsor)')).not.toBeInTheDocument();
  });

  it('renders a NameOrganisationDegreeGrantingInstitutionGroup with name only when not expanded', () => {
    const organisation = {
      namePart: { value: 'Test Organisation' },
    } as NameOrganisationDegreeGrantingInstitutionGroup;

    render(<Organisation organisation={organisation} />);

    expect(screen.getByText('Test Organisation')).toBeInTheDocument();
  });

  it('renders organisation roles when expanded', () => {
    const organisation = {
      namePart: { value: 'Test Organisation' },
      role: {
        roleTerm: [
          { __valueText: { en: 'Publisher', sv: 'Utgivare' } },
          { __valueText: { en: 'Sponsor', sv: 'Sponsor' } },
        ],
      },
    } as NameOrganisationGroup;

    render(<Organisation organisation={organisation} expanded />);

    expect(screen.getByText('(Publisher, Sponsor)')).toBeInTheDocument();
  });

  it('renders ROR and description for unlinked organisation when expanded', () => {
    const organisation = {
      namePart: { value: 'Independent Org' },
      identifier_type_ror: {
        __text: { en: 'ROR' },
        value: '123456789',
      },

      description: {
        __text: {
          en: 'Description',
        },
        value: 'A standalone organisation',
      },
    } as NameOrganisationGroup;

    render(<Organisation organisation={organisation} expanded />);

    expect(screen.getByText('Independent Org')).toBeInTheDocument();
    const ror = screen.getByRole('link', { name: '123456789' });
    expect(ror).toHaveAttribute('href', 'https://ror.org/123456789');
    expect(ror).toHaveAttribute('target', '_blank');
    expect(ror).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('A standalone organisation')).toBeInTheDocument();
  });
});
