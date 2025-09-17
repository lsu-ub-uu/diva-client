import type {
  NamePersonalDegreeSupervisorGroup,
  NamePersonalGroup,
  NamePersonalOpponentGroup,
  NamePersonalThesisAdvisorGroup,
} from '@/generatedTypes/divaTypes';
import { Person } from '@/routes/divaOutput/components/Person';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('Person', () => {
  it('renders a NamePersonalGroup without roles', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
    } as NamePersonalGroup;

    render(<Person person={person} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders a NamePersonalGroup with single role', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      role: {
        roleTerm: [{ __valueText: { en: 'Author', sv: 'Författare' } }],
      },
    } as NamePersonalGroup;

    render(<Person person={person} />);

    expect(screen.getByText('John Doe (Author)')).toBeInTheDocument();
  });

  it('renders a NamePersonalGroup with multipleroles', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      role: {
        roleTerm: [
          { __valueText: { en: 'Author', sv: 'Författare' } },
          { __valueText: { en: 'Editor', sv: 'Redaktör' } },
        ],
      },
    } as NamePersonalGroup;

    render(<Person person={person} />);

    expect(screen.getByText('John Doe (Author, Editor)')).toBeInTheDocument();
  });

  it('renders a NamePersonalDegreeSupervisorGroup', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      role: {
        roleTerm: { __valueText: { en: 'Supervisor', sv: 'Handledare' } },
      },
    } as NamePersonalDegreeSupervisorGroup;

    render(<Person person={person} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders a NamePersonalThesisAdvisorGroup', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      role: {
        roleTerm: { __valueText: { en: 'Thesis Advisor', sv: 'Rådgivare' } },
      },
    } as NamePersonalThesisAdvisorGroup;

    render(<Person person={person} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders a NamePersonalOpponentGroup', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      role: {
        roleTerm: { __valueText: { en: 'Opponent', sv: 'Opponent' } },
      },
    } as NamePersonalOpponentGroup;

    render(<Person person={person} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders a linked record without name in publication', () => {
    const person = {
      person: {
        value: '12345',
        linkedRecord: {
          person: {
            authority: {
              name_type_personal: {
                namePart_type_family: { value: 'Linksson' },
                namePart_type_given: { value: 'Link' },
              },
            },
          },
        },
      },
    } as NamePersonalGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: () => <Person person={person} />,
      },
      {
        path: '/diva-person/:id',
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByRole('link', { name: 'Link Linksson' })).toHaveAttribute(
      'href',
      '/diva-person/12345',
    );
  });

  it('renders a linked record', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      person: {
        value: '12345',
        linkedRecord: {
          person: {
            recordInfo: { type: { value: 'diva-person' } },
          },
        },
      },
    } as NamePersonalGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        id: 'root',
        Component: () => <Person person={person} />,
      },
      {
        path: '/diva-person/:id',
      },
    ]);

    render(<RoutesStub />);

    expect(screen.getByRole('link', { name: 'John Doe' })).toHaveAttribute(
      'href',
      '/diva-person/12345',
    );
  });

  it('renders a non-linked affilation with name only when expanded', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      affiliation: [
        { name_type_corporate: { namePart: { value: 'University of Test' } } },
      ],
    } as NamePersonalGroup;

    render(<Person person={person} expanded={true} />);

    expect(screen.getByText('University of Test')).toBeInTheDocument();
  });

  it('renders a non-linked affilation with name only when expanded', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      affiliation: [
        { name_type_corporate: { namePart: { value: 'University of Test' } } },
        { name_type_corporate: { namePart: { value: 'University of Pest' } } },
      ],
    } as NamePersonalGroup;

    render(<Person person={person} expanded={true} />);

    expect(screen.getByText('University of Test')).toBeInTheDocument();
    expect(screen.getByText('University of Pest')).toBeInTheDocument();
  });

  it('renders a linked affiliation with display name in publication', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      affiliation: [
        {
          organisation: {
            displayName: 'University of Test',
            value: '1234',
            linkedRecord: {
              organisation: {
                recordInfo: { type: { value: 'diva-organisation' } },
              },
            },
          },
        },
      ],
    } as NamePersonalGroup;

    render(<Person person={person} expanded />);

    expect(screen.getByText('University of Test')).toBeInTheDocument();
  });

  it('renders affiliation name_type_corporate over linked affiliation display name', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      affiliation: [
        {
          name_type_corporate: { namePart: { value: 'University of Test' } },
          organisation: {
            displayName: 'Linked University',
            value: '1234',
            linkedRecord: {
              organisation: {
                recordInfo: { type: { value: 'diva-organisation' } },
              },
            },
          },
        },
      ],
    } as NamePersonalGroup;

    render(<Person person={person} expanded />);

    expect(screen.getByText('University of Test')).toBeInTheDocument();
    expect(screen.queryByText('Linked University')).not.toBeInTheDocument();
  });
});
