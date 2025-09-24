import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Series } from '../Series';
import type { RelatedItemSeriesGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('Series', () => {
  it('renders nothing when no series', () => {
    render(<Series series={undefined} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('shows series information', () => {
    const series = {
      __text: {
        en: 'Series',
      },
      series: {
        value: '123',
        __text: { en: 'Series' },
        linkedRecord: {
          series: {
            recordInfo: { type: { value: 'diva-series' } },
            titleInfo: { title: { value: 'Linked series title' } },
          },
        },
      },
      titleInfo: {
        __text: { en: 'Title' },
        title: { value: 'Series title' },
        subtitle: { value: 'Series subtitle' },
      },
      identifier_displayLabel_eissn_type_issn: {
        __text: { en: 'EISSN' },
        value: '1234-5678',
      },
      identifier_displayLabel_pissn_type_issn: {
        __text: { en: 'PISSN' },
        value: '1234-5679',
      },
      partNumber: { __text: { en: 'Part number' }, value: '1' },
    } as RelatedItemSeriesGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Series series={series} /> },
    ]);
    render(<RoutesStub />);

    expect(screen.getByRole('heading')).toHaveTextContent('Series');
    expect(
      screen.getByRole('link', { name: 'Linked series title' }),
    ).toHaveAttribute('href', '/diva-series/123');
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(
      screen.getByText('Series title: Series subtitle'),
    ).toBeInTheDocument();
    expect(screen.getByText('EISSN')).toBeInTheDocument();
    expect(screen.getByText('1234-5678')).toBeInTheDocument();
    expect(screen.getByText('PISSN')).toBeInTheDocument();
    expect(screen.getByText('1234-5679')).toBeInTheDocument();
    expect(screen.getByText('Part number')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
