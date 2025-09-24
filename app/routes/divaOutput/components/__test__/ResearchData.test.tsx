import type { RelatedItemResearchDataGroup } from '@/generatedTypes/divaTypes';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResearchData } from '../ResearchData';

describe('ReasearchData', () => {
  it('return nothing when no researchData', () => {
    render(<ResearchData researchData={undefined} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('return data for researchData', () => {
    const researchData = {
      titleInfo: {
        __text: { en: 'Title' },
        title: { value: 'Data title' },
        subtitle: { value: 'Data subtitle' },
      },
      identifier_type_doi: {
        value: '10.1234/linked.doi',
        _type: 'doi',
        __text: { en: 'DOI' },
      },
      location: [
        {
          url: { value: 'some-url.com', __text: { en: 'Url' } },
          displayLabel: { value: 'someValue', __text: { en: 'displayLabel' } },
          __text: { en: 'link' },
        },
        {
          url: { value: 'some-other-url.com', __text: { en: 'Url' } },
          displayLabel: {
            value: 'someOtherValue',
            __text: { en: 'displayLabel' },
          },
          __text: { en: 'link' },
        },
      ],
      _type: 'researchData',
      __text: { en: 'Research Data' },
    } as RelatedItemResearchDataGroup;
    render(<ResearchData researchData={researchData} />);
    expect(screen.getByRole('heading', { name: 'Research Data' }));
    expect(screen.getByText('Data title: Data subtitle')).toBeInTheDocument();
    expect(screen.getByText('DOI')).toBeInTheDocument();
    expect(screen.getByText('10.1234/linked.doi')).toBeInTheDocument();
    expect(screen.getByText('link')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'someValue' })).toHaveAttribute(
      'href',
      'https://some-url.com',
    );
    expect(
      screen.getByRole('link', { name: 'someOtherValue' }),
    ).toHaveAttribute('href', 'https://some-other-url.com');
  });
});
