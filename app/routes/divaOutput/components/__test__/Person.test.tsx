import type { NamePersonalGroup } from '@/generatedTypes/divaTypes';
import { renderWithRoutesStub } from '@/utils/testUtils';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Person } from '../Person';

describe('Person', () => {
  it('renders name when no linked record', () => {
    renderWithRoutesStub(
      <Person
        person={
          {
            namePart_type_given: { value: 'John' },
            namePart_type_family: { value: 'Doe' },
          } as NamePersonalGroup
        }
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders a link when linked person', () => {
    renderWithRoutesStub(
      <Person
        person={
          {
            person: {
              value: '123',
              linkedRecord: {
                person: {
                  authority: {
                    name_type_personal: {
                      namePart_type_given: { value: 'Jane' },
                      namePart_type_family: { value: 'Smith' },
                    },
                  },
                },
              },
            },
          } as NamePersonalGroup
        }
      />,
    );

    expect(screen.getByRole('link', { name: 'Jane Smith' })).toHaveAttribute(
      'href',
      '/diva-person/123',
    );
  });

  it('renders name from record over linked record name', () => {
    renderWithRoutesStub(
      <Person
        person={
          {
            namePart_type_given: { value: 'Alice' },
            namePart_type_family: { value: 'Johnson' },
            person: {
              value: '123',
              linkedRecord: {
                person: {
                  authority: {
                    name_type_personal: {
                      namePart_type_given: { value: 'Bob' },
                      namePart_type_family: { value: 'Brown' },
                    },
                  },
                },
              },
            },
          } as NamePersonalGroup
        }
      />,
    );

    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  });
});
