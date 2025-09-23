import type { RelatedItemJournalGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Journal } from '../Journal';

describe('Journal', () => {
  it('shows nothing when there is no journal', () => {
    render(<Journal journal={undefined} />);

    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });

  it('shows journal heading when there is a journal', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Journal' }),
    ).toBeInTheDocument();
  });

  it('shows uncontrolled journal information', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
      titleInfo: {
        __text: { en: 'Title', sv: 'Titel' },
        title: {
          __text: { en: 'Main Title', sv: 'Huvudtitel' },
          value: 'Nature',
        },
        subtitle: {
          __text: { en: 'Subtitle', sv: 'Undertitel' },
          value: "It's about nature and stuff",
        },
      },
      identifier_displayLabel_pissn_type_issn: {
        __text: { en: 'Print ISSN', sv: 'Tryckt ISSN' },
        value: '1845-9323',
      },
      identifier_displayLabel_eissn_type_issn: {
        __text: { en: 'Electronic ISSN', sv: 'Elektroniskt ISSN' },
        value: '3791-2443',
      },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(
      screen.getByText("Nature: It's about nature and stuff"),
    ).toBeInTheDocument();

    expect(screen.getByText('Print ISSN')).toBeInTheDocument();
    expect(screen.getByText('1845-9323')).toBeInTheDocument();

    expect(screen.getByText('Electronic ISSN')).toBeInTheDocument();
    expect(screen.getByText('3791-2443')).toBeInTheDocument();
  });

  it('shows uncontrolled journal title without subtitle', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
      titleInfo: {
        __text: { en: 'Title', sv: 'Titel' },
        title: {
          __text: { en: 'Main Title', sv: 'Huvudtitel' },
          value: 'Nature',
        },
      },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
  });

  it('shows controlled journal info', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
      journal: {
        value: 'journal:12345',
        linkedRecord: {
          journal: {
            titleInfo: {
              __text: { en: 'Title', sv: 'Titel' },
              title: {
                __text: { en: 'Main Title', sv: 'Huvudtitel' },
                value: 'Nature',
              },
              subtitle: {
                __text: { en: 'Subtitle', sv: 'Undertitel' },
                value: "It's about nature and stuff",
              },
            },
            identifier_displayLabel_pissn_type_issn: {
              __text: { en: 'Print ISSN', sv: 'Tryckt ISSN' },
              value: '1845-9323',
            },
            identifier_displayLabel_eissn_type_issn: {
              __text: { en: 'Electronic ISSN', sv: 'Elektroniskt ISSN' },
              value: '3791-2443',
            },
          },
        },
      },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(
      screen.getByText("Nature: It's about nature and stuff"),
    ).toBeInTheDocument();

    expect(screen.getByText('Print ISSN')).toBeInTheDocument();
    expect(screen.getByText('1845-9323')).toBeInTheDocument();

    expect(screen.getByText('Electronic ISSN')).toBeInTheDocument();
    expect(screen.getByText('3791-2443')).toBeInTheDocument();
  });

  it('shows issns from linked record and title from uncontrolled journal', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
      titleInfo: {
        __text: { en: 'Title', sv: 'Titel' },
        title: {
          __text: { en: 'Main Title', sv: 'Huvudtitel' },
          value: 'Uncontrolled title',
        },
        subtitle: {
          __text: { en: 'Subtitle', sv: 'Undertitel' },
          value: 'Uncontrolled subtitle',
        },
      },
      journal: {
        value: 'journal:12345',
        linkedRecord: {
          journal: {
            titleInfo: {
              __text: { en: 'Title', sv: 'Titel' },
              title: {
                __text: { en: 'Main Title', sv: 'Huvudtitel' },
                value: 'Nature',
              },
              subtitle: {
                __text: { en: 'Subtitle', sv: 'Undertitel' },
                value: "It's about nature and stuff",
              },
            },
            identifier_displayLabel_pissn_type_issn: {
              __text: { en: 'Print ISSN', sv: 'Tryckt ISSN' },
              value: '1845-9323',
            },
            identifier_displayLabel_eissn_type_issn: {
              __text: { en: 'Electronic ISSN', sv: 'Elektroniskt ISSN' },
              value: '3791-2443',
            },
          },
        },
      },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(
      screen.getByText('Uncontrolled title: Uncontrolled subtitle'),
    ).toBeInTheDocument();

    expect(screen.getByText('Print ISSN')).toBeInTheDocument();
    expect(screen.getByText('1845-9323')).toBeInTheDocument();

    expect(screen.getByText('Electronic ISSN')).toBeInTheDocument();
    expect(screen.getByText('3791-2443')).toBeInTheDocument();
  });

  it('shows titleInfo from linked record and issns from uncontrolled journal', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
      identifier_displayLabel_pissn_type_issn: {
        __text: { en: 'Print ISSN', sv: 'Tryckt ISSN' },
        value: '1845-9325',
      },
      identifier_displayLabel_eissn_type_issn: {
        __text: { en: 'Electronic ISSN', sv: 'Elektroniskt ISSN' },
        value: '3791-2445',
      },
      journal: {
        value: 'journal:12345',
        linkedRecord: {
          journal: {
            titleInfo: {
              __text: { en: 'Title', sv: 'Titel' },
              title: {
                __text: { en: 'Main Title', sv: 'Huvudtitel' },
                value: 'Nature',
              },
              subtitle: {
                __text: { en: 'Subtitle', sv: 'Undertitel' },
                value: "It's about nature and stuff",
              },
            },
            identifier_displayLabel_pissn_type_issn: {
              __text: { en: 'Print ISSN', sv: 'Tryckt ISSN' },
              value: '1845-9323',
            },
            identifier_displayLabel_eissn_type_issn: {
              __text: { en: 'Electronic ISSN', sv: 'Elektroniskt ISSN' },
              value: '3791-2443',
            },
          },
        },
      },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(
      screen.getByText("Nature: It's about nature and stuff"),
    ).toBeInTheDocument();

    expect(screen.getByText('Print ISSN')).toBeInTheDocument();
    expect(screen.getByText('1845-9325')).toBeInTheDocument();

    expect(screen.getByText('Electronic ISSN')).toBeInTheDocument();
    expect(screen.getByText('3791-2445')).toBeInTheDocument();
  });

  it('shows part of journal information', () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
      part: {
        detail_type_volume: {
          __text: { en: 'Volume', sv: 'Volym' },
          number: { value: '12' },
        },
        detail_type_issue: {
          __text: { en: 'Issue', sv: 'Nummer' },
          number: { value: '3' },
        },
        detail_type_artNo: {
          __text: { en: 'Article Number', sv: 'Artikelnummer' },
          number: { value: '456' },
        },
        extent: {
          start: {
            __text: { en: 'Start Page', sv: 'Första sidan' },
            value: '1',
          },
          end: {
            __text: { en: 'End Page', sv: 'Sista sidan' },
            value: '10',
          },
        },
      },
    } as RelatedItemJournalGroup;

    render(<Journal journal={journal} />);

    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();

    expect(screen.getByText('Issue')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('Article Number')).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();

    expect(screen.getByText('Start Page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByText('End Page')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
