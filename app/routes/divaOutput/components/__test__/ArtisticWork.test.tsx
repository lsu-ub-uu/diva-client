import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArtisticWorkFields } from '../ArtisticWork';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

const emptyOutput = {} as DivaOutputGroup;

describe('ArtisticWorkFields', () => {
  it('renders nothing when output has no artistic work fields', () => {
    const { container } = render(
      <dl>
        <ArtisticWorkFields output={emptyOutput} />
      </dl>,
    );
    expect(container.querySelector('dt')).not.toBeInTheDocument();
  });

  it('renders typeOfResource label and value', () => {
    const output = {
      typeOfResource: {
        value: 'cartographic',
        __text: { en: 'Type of resource', sv: 'Resurstyp' },
        __valueText: { en: 'Cartographic', sv: 'Kartografiskt' },
      },
    } as DivaOutputGroup;

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Type of resource')).toBeInTheDocument();
    expect(screen.getByText('Cartographic')).toBeInTheDocument();
  });

  it('renders type list with language attributes', () => {
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

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toHaveAttribute('lang', 'en');
    expect(screen.getByText('Målning')).toHaveAttribute('lang', 'sv');
  });

  it('renders material list with language attributes', () => {
    const output = {
      material: [
        {
          value: 'Oil on canvas',
          _lang: 'eng',
          __text: { en: 'Material', sv: 'Material' },
        },
      ],
    } as DivaOutputGroup;

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Material')).toBeInTheDocument();
    expect(screen.getByText('Oil on canvas')).toHaveAttribute('lang', 'en');
  });

  it('renders technique list with language attributes', () => {
    const output = {
      technique: [
        {
          value: 'Watercolor',
          _lang: 'eng',
          __text: { en: 'Technique', sv: 'Teknik' },
        },
      ],
    } as DivaOutputGroup;

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Technique')).toBeInTheDocument();
    expect(screen.getByText('Watercolor')).toHaveAttribute('lang', 'en');
  });

  it('renders duration as a time element', () => {
    const output = {
      duration: {
        __text: { en: 'Duration', sv: 'Längd' },
        hh: { value: '1' },
        mm: { value: '30' },
        ss: { value: '15' },
      },
    } as DivaOutputGroup;

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Duration')).toBeInTheDocument();
    const time = screen.getByRole('time');
    expect(time).toHaveAttribute('datetime', '1h 30m 15s');
    expect(time).toHaveTextContent('1h 30m 15s');
  });

  it('renders physical description', () => {
    const output = {
      physicalDescription: {
        __text: { en: 'Physical description', sv: 'Fysisk beskrivning' },
        extent_unit_other: { value: '50x70 cm', _unit: 'other' },
      },
    } as DivaOutputGroup;

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Physical description')).toBeInTheDocument();
    expect(screen.getByText('50x70 cm')).toBeInTheDocument();
  });

  it('renders notes with language info', () => {
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

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText(/Context/)).toBeInTheDocument();
    expect(screen.getByText('Exhibition at Gallery X')).toBeInTheDocument();
  });

  it('renders all fields together', () => {
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

    render(
      <dl>
        <ArtisticWorkFields output={output} />
      </dl>,
    );

    expect(screen.getByText('Type of resource')).toBeInTheDocument();
    expect(screen.getByText('Cartographic')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Painting')).toBeInTheDocument();
    expect(screen.getByText('Material')).toBeInTheDocument();
    expect(screen.getByText('Oil')).toBeInTheDocument();
    expect(screen.getByText('Technique')).toBeInTheDocument();
    expect(screen.getByText('Brushwork')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('5m')).toBeInTheDocument();
    expect(screen.getByText('Physical description')).toBeInTheDocument();
    expect(screen.getByText('30x40 cm')).toBeInTheDocument();
  });
});
