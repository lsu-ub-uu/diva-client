import type { RelatedItemJournalGroup } from '@/generatedTypes/divaTypes';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Journal } from '../Journal';

describe('Journal', () => {
  it('shows nothing when there is no journal', async () => {
    const screen = await render(<Journal journal={undefined} />);

    expect(screen.baseElement.querySelector('h2')).toBeNull();
  });

  it('shows journal heading when there is a journal', async () => {
    const journal = {
      __text: { en: 'Journal', sv: 'Tidskrift' },
    } as RelatedItemJournalGroup;

    const screen = await render(<Journal journal={journal} />);

    await expect
      .element(screen.getByRole('heading', { level: 2, name: 'Journal' }))
      .toBeVisible();
  });

  it('shows uncontrolled journal information', async () => {
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

    const screen = await render(<Journal journal={journal} />);

    await expect.element(screen.getByText('Title')).toBeVisible();
    await expect
      .element(screen.getByText("Nature: It's about nature and stuff"))
      .toBeVisible();

    await expect.element(screen.getByText('Print ISSN')).toBeVisible();
    await expect.element(screen.getByText('1845-9323')).toBeVisible();

    await expect.element(screen.getByText('Electronic ISSN')).toBeVisible();
    await expect.element(screen.getByText('3791-2443')).toBeVisible();
  });

  it('shows uncontrolled journal title without subtitle', async () => {
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

    const screen = await render(<Journal journal={journal} />);

    await expect.element(screen.getByText('Title')).toBeVisible();
    await expect.element(screen.getByText('Nature')).toBeVisible();
  });

  it('shows controlled journal info', async () => {
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

    const screen = await render(<Journal journal={journal} />);

    await expect.element(screen.getByText('Title')).toBeVisible();
    await expect
      .element(screen.getByText("Nature: It's about nature and stuff"))
      .toBeVisible();

    await expect.element(screen.getByText('Print ISSN')).toBeVisible();
    await expect.element(screen.getByText('1845-9323')).toBeVisible();

    await expect.element(screen.getByText('Electronic ISSN')).toBeVisible();
    await expect.element(screen.getByText('3791-2443')).toBeVisible();
  });

  it('shows controlled information over uncontrolled', async () => {
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

    const screen = await render(<Journal journal={journal} />);

    await expect.element(screen.getByText('Title')).toBeVisible();
    await expect
      .element(screen.getByText("Nature: It's about nature and stuff"))
      .toBeVisible();

    await expect.element(screen.getByText('Print ISSN')).toBeVisible();
    await expect.element(screen.getByText('1845-9323')).toBeVisible();

    await expect.element(screen.getByText('Electronic ISSN')).toBeVisible();
    await expect.element(screen.getByText('3791-2443')).toBeVisible();
  });

  it('shows part of journal information', async () => {
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

    const screen = await render(<Journal journal={journal} />);

    await expect.element(screen.getByText('Volume')).toBeVisible();
    await expect.element(screen.getByText('12')).toBeVisible();

    await expect.element(screen.getByText('Issue')).toBeVisible();
    await expect.element(screen.getByText('3')).toBeVisible();

    await expect.element(screen.getByText('Article Number')).toBeVisible();
    await expect.element(screen.getByText('456')).toBeVisible();

    await expect.element(screen.getByText('Start Page')).toBeVisible();
    await expect.element(screen.getByText(/^1$/)).toBeVisible();

    await expect.element(screen.getByText('End Page')).toBeVisible();
    await expect.element(screen.getByText('10')).toBeVisible();
  });
});
