import type { NameOrganisationPublisherGroup } from '@/generatedTypes/divaTypes';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Publisher } from '../Publisher';

describe('Publisher', () => {
  it('renders linked publisher name over uncontrolled', async () => {
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

    const screen = await render(<Publisher publisher={publisher} />);
    const content = screen.baseElement.textContent ?? '';

    await expect.element(screen.getByText('Norstedts')).toBeVisible();
    expect(content).not.toContain('Uncontrolled Publisher');
  });

  it('renders uncontrolled publisher name when no linked record', async () => {
    const publisher = {
      namePart_type_publisher: { value: 'Penguin Random House' },
    } as NameOrganisationPublisherGroup;

    const screen = await render(<Publisher publisher={publisher} />);

    await expect
      .element(screen.getByText('Penguin Random House'))
      .toBeVisible();
  });

  it('renders name with imprint in parentheses', async () => {
    const publisher = {
      namePart_type_publisher: { value: 'Penguin Random House' },
      namePart_type_imprint: { value: 'Penguin Classics' },
    } as NameOrganisationPublisherGroup;

    const screen = await render(<Publisher publisher={publisher} />);

    await expect
      .element(screen.getByText('Penguin Random House (Penguin Classics)'))
      .toBeVisible();
  });

  it('renders name with place after comma', async () => {
    const publisher = {
      namePart_type_publisher: { value: 'Norstedts' },
      place: { placeTerm: { value: 'Stockholm' } },
    } as NameOrganisationPublisherGroup;

    const screen = await render(<Publisher publisher={publisher} />);

    await expect
      .element(screen.getByText('Norstedts, Stockholm'))
      .toBeVisible();
  });

  it('renders name with imprint and place', async () => {
    const publisher = {
      namePart_type_publisher: { value: 'Penguin Random House' },
      namePart_type_imprint: { value: 'Penguin Classics' },
      place: { placeTerm: { value: 'New York' } },
    } as NameOrganisationPublisherGroup;

    const screen = await render(<Publisher publisher={publisher} />);

    await expect
      .element(
        screen.getByText('Penguin Random House (Penguin Classics), New York'),
      )
      .toBeVisible();
  });

  it('renders empty string when no name available', async () => {
    const publisher = {} as NameOrganisationPublisherGroup;

    const screen = await render(<Publisher publisher={publisher} />);

    expect(screen.baseElement.textContent?.trim()).toBe('');
  });
});
