import type { NameOrganisationPublisherGroup } from '@/generatedTypes/divaTypes';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Publishers } from '../Publishers';

describe('Publishers', () => {
  it('renders nothing when no publishers', async () => {
    const screen = await render(<Publishers publishers={undefined} />);

    expect(screen.baseElement.querySelector('dt')).toBeNull();
  });

  it('renders nothing when empty array', async () => {
    const screen = await render(<Publishers publishers={[]} />);

    expect(screen.baseElement.querySelector('dt')).toBeNull();
  });

  it('renders label and all publisher names', async () => {
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

    const screen = await render(<Publishers publishers={publishers} />);

    await expect.element(screen.getByText('Publisher')).toBeVisible();
    await expect.element(screen.getByText('Norstedts')).toBeVisible();
    await expect
      .element(screen.getByText('Penguin Random House'))
      .toBeVisible();
  });

  it('renders publishers with imprint and place inline', async () => {
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

    const screen = await render(<Publishers publishers={publishers} />);

    await expect
      .element(
        screen.getByText('Penguin Random House (Penguin Classics), New York'),
      )
      .toBeVisible();
    await expect
      .element(screen.getByText('Norstedts, Stockholm'))
      .toBeVisible();
  });
});
