import type {
  NamePersonalGroup,
  NamePersonGroup,
} from '@/generatedTypes/divaTypes';
import { describe, expect, it } from 'vitest';
import { formatPersonName } from '../formatPersonName';

describe('formatPersonName', () => {
  it('formats an uncontrolled name with firstname and given name', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
    } as NamePersonalGroup;

    const formattedName = formatPersonName(person);
    expect(formattedName).toBe('John Doe');
  });

  it('formats an uncontrolled name with only family name', () => {
    const person = {
      namePart_type_family: { value: 'Doe' },
    } as NamePersonalGroup;

    const formattedName = formatPersonName(person);
    expect(formattedName).toBe('Doe');
  });

  it('formats an uncontrolled name with only given name', () => {
    const person = {
      namePart_type_given: { value: 'John' },
    } as NamePersonalGroup;

    const formattedName = formatPersonName(person);
    expect(formattedName).toBe('John');
  });

  it('returns person name when there is both person name and linked person', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      person: {
        linkedRecord: {
          person: {
            authority: {
              name_type_personal: {
                namePart_type_family: { value: 'ShouldNotBeUsedson' },
                namePart_type_given: { value: 'ShouldNotBeUsed' },
              },
            },
          },
        },
      },
    } as NamePersonalGroup;

    const formattedName = formatPersonName(person);
    expect(formattedName).toBe('John Doe');
  });

  it('shows linked person name when there is no person name', () => {
    const person = {
      person: {
        linkedRecord: {
          person: {
            authority: {
              name_type_personal: {
                namePart_type_family: { value: 'Linkedson' },
                namePart_type_given: { value: 'Link' },
              },
            },
          },
        },
      },
    } as NamePersonalGroup;

    const formattedName = formatPersonName(person);
    expect(formattedName).toBe('Link Linkedson');
  });

  it('returns empty string when there is no name information', () => {
    const person = {} as NamePersonGroup;

    const formattedName = formatPersonName(person);
    expect(formattedName).toBe('');
  });
});
