import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Event } from '../Event';
import type { PresentationDivaGroup } from '@/generatedTypes/divaTypes';

describe('Event', () => {
  it('should render null when event is undefined', () => {
    render(<Event event={undefined} />);
    expect(screen.queryByRole('definition')).not.toBeInTheDocument();
  });

  it('should render event with date, location, address, and language', () => {
    const event = {
      __text: { en: 'Defence', sv: 'Försvar' },
      dateOther_type_presentation: {
        year: { value: '2023' },
        month: { value: '10' },
        day: { value: '05' },
        hh: { value: '14' },
        mm: { value: '30' },
      },

      address: {
        location: { value: 'Conference Room A' },
        street: { value: '123 Main St' },
        city: { value: 'Stockholm' },
      },
      language: {
        'languageTerm_authority_iso639-2b_type_code': { value: 'eng' },
      },
    } as PresentationDivaGroup;

    render(<Event event={event} />);

    expect(screen.getByRole('definition')).toBeInTheDocument();

    expect(
      screen.getByText('Conference Room A, 123 Main St, Stockholm'),
    ).toBeInTheDocument();

    expect(screen.getByRole('time')).toHaveAttribute(
      'datetime',
      '2023-10-05T14:30',
    );
    expect(screen.getByRole('time')).toHaveTextContent('2023-10-05 14:30');
    expect(screen.getByText(/.*engLangItemText.*/)).toBeInTheDocument();
  });
});
