import type { NamePersonalGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Persons } from '../Persons';
import userEvent from '@testing-library/user-event';

describe('Persons', () => {
  it('shows 3 persons without affiliations', () => {
    const persons = [
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Personson' },
        namePart_type_given: { value: 'Anna' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Testsson' },
        namePart_type_given: { value: 'Johan' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Mocksson' },
        namePart_type_given: { value: 'Stina' },
      },
    ] as NamePersonalGroup[];

    render(<Persons persons={persons} />);

    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Anna Personson')).toBeInTheDocument();
    expect(screen.getByText('Johan Testsson')).toBeInTheDocument();
    expect(screen.getByText('Stina Mocksson')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'divaClient_showMoreText' }),
    ).not.toBeInTheDocument();
  });
  it('shows nothingh whith no persons', () => {
    const persons = [] as NamePersonalGroup[];

    render(<Persons persons={persons} />);
    expect(screen.queryByText('Authors')).not.toBeInTheDocument();
  });

  it('shows expandable view for 3 persons when at least one has affiliation', async () => {
    const persons = [
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Personson' },
        namePart_type_given: { value: 'Anna' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Testsson' },
        namePart_type_given: { value: 'Johan' },
        affiliation: [
          {
            name_type_corporate: { namePart: { value: 'Uppsala University' } },
          },
        ],
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Mocksson' },
        namePart_type_given: { value: 'Stina' },
      },
    ] as NamePersonalGroup[];

    render(<Persons persons={persons} />);

    expect(screen.getByText('Anna Personson')).toBeInTheDocument();
    expect(screen.getByText('Johan Testsson')).toBeInTheDocument();
    expect(screen.getByText('Stina Mocksson')).toBeInTheDocument();
    expect(screen.queryByText('Uppsala University')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );

    expect(
      screen.getByRole('button', { name: 'divaClient_showLessText' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Uppsala University')).toBeInTheDocument();
  });

  it('shows expandable view with et al. for more than 3 persons wihtout affiliations', async () => {
    const persons = [
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Personson' },
        namePart_type_given: { value: 'Anna' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Testsson' },
        namePart_type_given: { value: 'Johan' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Mocksson' },
        namePart_type_given: { value: 'Stina' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Bocksson' },
        namePart_type_given: { value: 'Bertil' },
      },
    ] as NamePersonalGroup[];

    render(<Persons persons={persons} />);

    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Anna Personson')).toBeInTheDocument();
    expect(screen.getByText('Johan Testsson')).toBeInTheDocument();
    expect(screen.getByText('Stina Mocksson')).toBeInTheDocument();
    expect(screen.queryByText('Bertil Bocksson')).not.toBeInTheDocument();
    expect(screen.queryByText('et al.')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );
    expect(screen.getByText('Bertil Bocksson')).toBeInTheDocument();
    expect(screen.queryByText('et al.')).not.toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showLessText' }),
    );
    expect(screen.queryByText('Bertil Bocksson')).not.toBeInTheDocument();
    expect(screen.queryByText('et al.')).toBeInTheDocument();
  });

  it('shows expandable view for more than 3 persons with affiliations', async () => {
    const persons = [
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Personson' },
        namePart_type_given: { value: 'Anna' },
        affiliation: [
          {
            name_type_corporate: { namePart: { value: 'Uppsala University' } },
          },
        ],
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Testsson' },
        namePart_type_given: { value: 'Johan' },
        affiliation: [
          {
            organisation: { displayName: 'Buppsala University' },
          },
        ],
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Mocksson' },
        namePart_type_given: { value: 'Stina' },
        affiliation: [
          {
            name_type_corporate: { namePart: { value: 'Kuppsala University' } },
          },
        ],
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Bocksson' },
        namePart_type_given: { value: 'Bertil' },
        affiliation: [
          {
            name_type_corporate: {
              namePart: { value: 'Gruppsala University' },
            },
          },
        ],
      },
    ] as NamePersonalGroup[];

    render(<Persons persons={persons} />);

    expect(screen.queryByText('Uppsala University')).not.toBeInTheDocument();
    expect(screen.queryByText('Buppsala University')).not.toBeInTheDocument();
    expect(screen.queryByText('Kuppsala University')).not.toBeInTheDocument();
    expect(screen.queryByText('Gruppsala University')).not.toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );

    expect(screen.getByText('Uppsala University')).toBeInTheDocument();
    expect(screen.getByText('Buppsala University')).toBeInTheDocument();
    expect(screen.getByText('Kuppsala University')).toBeInTheDocument();
    expect(screen.getByText('Gruppsala University')).toBeInTheDocument();
  });

  it('has correct aria attributes', async () => {
    const persons = [
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Personson' },
        namePart_type_given: { value: 'Anna' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Testsson' },
        namePart_type_given: { value: 'Johan' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Mocksson' },
        namePart_type_given: { value: 'Stina' },
      },
      {
        __text: { en: 'Authors', sv: 'Författare' },
        namePart_type_family: { value: 'Bocksson' },
        namePart_type_given: { value: 'Bertil' },
      },
    ] as NamePersonalGroup[];

    render(<Persons persons={persons} />);

    const anna = screen.getByText('Anna Personson').closest('dd');
    const johan = screen.getByText('Johan Testsson').closest('dd');
    const stina = screen.getByText('Stina Mocksson').closest('dd');

    const expandButton = screen.getByRole('button', {
      name: 'divaClient_showMoreText',
    });
    expect(expandButton).toHaveAttribute('aria-expanded', 'false');
    expect(expandButton).toHaveAttribute(
      'aria-controls',
      `${anna!.id} ${johan!.id} ${stina!.id}`,
    );

    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );
    const bertil = screen.getByText('Bertil Bocksson').closest('dd');
    expect(expandButton).toHaveAttribute('aria-expanded', 'true');
    expect(expandButton).toHaveAttribute(
      'aria-controls',
      `${anna!.id} ${johan!.id} ${stina!.id} ${bertil!.id}`,
    );
  });
});
