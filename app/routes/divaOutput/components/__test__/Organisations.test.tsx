import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Organisations } from '../Organisations';
import type { NameOrganisationGroup } from '@/generatedTypes/divaTypes';
import userEvent from '@testing-library/user-event';

describe('Organisations', () => {
  it('renders nothing when no organisations', () => {
    render(<Organisations organisations={undefined} />);

    expect(
      screen.queryByText(
        'Organisation som författare, redaktör eller annan roll',
      ),
    ).not.toBeInTheDocument();
  });

  it('renders non expandable view when three organisations with name only', () => {
    const organisations = [
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 1' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 2' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 3' },
      },
    ] as NameOrganisationGroup[];

    render(<Organisations organisations={organisations} />);

    expect(
      screen.getByText('Organisation as author, editor or other role'),
    ).toBeInTheDocument();
    expect(screen.getByText('Organisation 1')).toBeInTheDocument();
    expect(screen.getByText('Organisation 2')).toBeInTheDocument();
    expect(screen.getByText('Organisation 3')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'divaClient_showMoreText' }),
    ).not.toBeInTheDocument();
  });

  it('renders expandable view when one organisation with role', async () => {
    const organisations = [
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 1' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 2' },
        role: {
          roleTerm: [
            {
              value: 'pbl',
              __valueText: { en: 'Publisher', sv: 'Förläggare' },
            },
            {
              value: 'aut',
              __valueText: { en: 'Author', sv: 'Författare' },
            },
          ],
        },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 3' },
      },
    ] as NameOrganisationGroup[];

    render(<Organisations organisations={organisations} />);

    expect(screen.getByText('Organisation 1')).toBeInTheDocument();
    expect(screen.getByText('Organisation 2')).toBeInTheDocument();
    expect(screen.getByText('Organisation 3')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );
    expect(screen.getByText('(Publisher, Author)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'divaClient_showLessText' }),
    ).toBeInTheDocument();
  });

  it('renders expandable view when one organisation with ROR', async () => {
    const organisations = [
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 1' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 2' },
        identifier_type_ror: { __text: { en: 'ROR', sv: 'ROR' }, value: '123' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 3' },
      },
    ] as NameOrganisationGroup[];

    render(<Organisations organisations={organisations} />);

    expect(screen.getByText('Organisation 1')).toBeInTheDocument();
    expect(screen.getByText('Organisation 2')).toBeInTheDocument();
    expect(screen.getByText('Organisation 3')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );
    expect(screen.getByText('ROR')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'divaClient_showLessText' }),
    ).toBeInTheDocument();
  });

  it('renders expandable view when one organisation with description', async () => {
    const organisations = [
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 1' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 2' },
        description: {
          __text: { en: 'Description', sv: 'Beskrivning' },
          value: 'Lorem ipsum',
        },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 3' },
      },
    ] as NameOrganisationGroup[];

    render(<Organisations organisations={organisations} />);

    expect(screen.getByText('Organisation 1')).toBeInTheDocument();
    expect(screen.getByText('Organisation 2')).toBeInTheDocument();
    expect(screen.getByText('Organisation 3')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'divaClient_showLessText' }),
    ).toBeInTheDocument();
  });

  it('renders expandable view when more than three organisations with name only', async () => {
    const organisations = [
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 1' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 2' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 3' },
      },
      {
        __text: {
          en: 'Organisation as author, editor or other role',
          sv: 'Organisation som författare, redaktör eller annan roll',
        },
        namePart: { value: 'Organisation 4' },
      },
    ] as NameOrganisationGroup[];

    render(<Organisations organisations={organisations} />);

    expect(screen.getByText('Organisation 1')).toBeInTheDocument();
    expect(screen.getByText('Organisation 2')).toBeInTheDocument();
    expect(screen.getByText('Organisation 3')).toBeInTheDocument();
    expect(screen.queryByText('Organisation 4')).not.toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'divaClient_showMoreText' }),
    );
    expect(screen.getByText('Organisation 4')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'divaClient_showLessText' }),
    ).toBeInTheDocument();
  });
});
