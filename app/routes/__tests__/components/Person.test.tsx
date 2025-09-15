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

  it('renders a linked record', () => {
    const person = {
      namePart_type_given: { value: 'John' },
      namePart_type_family: { value: 'Doe' },
      person: { value: '12345' },
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

  it('renders a non-linked affilation when expanded', () => {
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
});
