import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { ArtisticWorkFields } from '../ArtisticWork';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

const emptyOutput = {} as DivaOutputGroup;

describe('ArtisticWorkFields', () => {
  it('renders nothing when output has no artistic work fields', async () => {
    const screen = await render(
      <dl>
        <ArtisticWorkFields output={emptyOutput} />
      </dl>,
    );
    await expect(screen.baseElement.querySelector('dt')).toBeNull();
  });

  it('renders typeOfResource label and value', async () => {
    const output = {
      typeOfResource: {
        value: 'cartographic',
        __text: { en: 'Type of resource', sv: 'Resurstyp' },
        __valueText: { en: 'Cartographic', sv: 'Kartografiskt' },
      },
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText('Type of resource')).toBeVisible();
    await expect.element(screen.getByText('Cartographic')).toBeVisible();
  });

  it('renders type list with language attributes', async () => {
    const output = {
      type: [
        { value: 'Painting', _lang: 'eng', __text: { en: 'Type', sv: 'Typ' } },
        {
          value: 'Målning',
          _lang: 'swe',
          __text: { en: 'Type', sv: 'Typ' },
        },
      ],
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText(/^Type$/)).toBeVisible();
    await expect
      .element(screen.getByText('Painting'))
      .toHaveAttribute('lang', 'en');
    await expect
      .element(screen.getByText('Målning'))
      .toHaveAttribute('lang', 'sv');
  });

  it('renders material list with language attributes', async () => {
    const output = {
      material: [
        {
          value: 'Oil on canvas',
          _lang: 'eng',
          __text: { en: 'Material', sv: 'Material' },
        },
      ],
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText('Material')).toBeVisible();
    await expect
      .element(screen.getByText('Oil on canvas'))
      .toHaveAttribute('lang', 'en');
  });

  it('renders technique list with language attributes', async () => {
    const output = {
      technique: [
        {
          value: 'Watercolor',
          _lang: 'eng',
          __text: { en: 'Technique', sv: 'Teknik' },
        },
      ],
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText('Technique')).toBeVisible();
    await expect
      .element(screen.getByText('Watercolor'))
      .toHaveAttribute('lang', 'en');
  });

  it('renders duration as a time element', async () => {
    const output = {
      duration: {
        __text: { en: 'Duration', sv: 'Längd' },
        hh: { value: '1' },
        mm: { value: '30' },
        ss: { value: '15' },
      },
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText('Duration')).toBeVisible();
    const time = screen.baseElement.querySelector('time');
    await expect(time).not.toBeNull();
    await expect(time).toHaveAttribute('datetime', '1h 30m 15s');
    await expect(time).toHaveTextContent('1h 30m 15s');
  });

  it('renders physical description', async () => {
    const output = {
      physicalDescription: {
        __text: { en: 'Physical description', sv: 'Fysisk beskrivning' },
        extent_unit_other: { value: '50x70 cm', _unit: 'other' },
      },
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect
      .element(screen.getByText('Physical description'))
      .toBeVisible();
    await expect.element(screen.getByText('50x70 cm')).toBeVisible();
  });

  it('renders notes with language info', async () => {
    const output = {
      note_type_context: [
        {
          value: 'Exhibition at Gallery X',
          _type: 'context',
          _lang: 'eng',
          __text: { en: 'Context', sv: 'Kontext' },
        },
      ],
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText(/Context/)).toBeVisible();
    await expect
      .element(screen.getByText('Exhibition at Gallery X'))
      .toBeVisible();
  });

  it('renders all fields together', async () => {
    const output = {
      typeOfResource: {
        value: 'cartographic',
        __text: { en: 'Type of resource', sv: 'Resurstyp' },
        __valueText: { en: 'Cartographic', sv: 'Kartografiskt' },
      },
      type: [
        {
          value: 'Painting',
          _lang: 'eng',
          __text: { en: 'Type', sv: 'Typ' },
        },
      ],
      material: [
        {
          value: 'Oil',
          _lang: 'eng',
          __text: { en: 'Material', sv: 'Material' },
        },
      ],
      technique: [
        {
          value: 'Brushwork',
          _lang: 'eng',
          __text: { en: 'Technique', sv: 'Teknik' },
        },
      ],
      duration: {
        __text: { en: 'Duration', sv: 'Längd' },
        mm: { value: '5' },
      },
      physicalDescription: {
        __text: { en: 'Physical description', sv: 'Fysisk beskrivning' },
        extent_unit_other: { value: '30x40 cm', _unit: 'other' },
      },
    } as DivaOutputGroup;

    const screen = await render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    await expect.element(screen.getByText('Type of resource')).toBeVisible();
    await expect.element(screen.getByText('Cartographic')).toBeVisible();
    await expect.element(screen.getByText(/^Type$/)).toBeVisible();
    await expect.element(screen.getByText('Painting')).toBeVisible();
    await expect.element(screen.getByText('Material')).toBeVisible();
    await expect.element(screen.getByText('Oil')).toBeVisible();
    await expect.element(screen.getByText('Technique')).toBeVisible();
    await expect.element(screen.getByText('Brushwork')).toBeVisible();
    await expect.element(screen.getByText('Duration')).toBeVisible();
    await expect.element(screen.getByText('5m')).toBeVisible();
    await expect
      .element(screen.getByText('Physical description'))
      .toBeVisible();
    await expect.element(screen.getByText('30x40 cm')).toBeVisible();
  });
});
