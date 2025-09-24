import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ConferencePublication } from '../ConferencePublication';
import { createRoutesStub } from 'react-router';
import type { RelatedItemConferencePublicationGroup } from '@/generatedTypes/divaTypes';

describe('ConferencePublication', () => {
  it('render nothing when no publication', () => {
    render(<ConferencePublication conferencePublication={undefined} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('render a ConferencePublication', () => {
    const conferencePublication = {
      __text: { en: 'Conference Paper' },
      proceeding: {
        __text: { en: 'Proceeding' },
        value: 'paper:123',
        linkedRecord: {
          output: {
            titleInfo: {
              title: {
                value: 'Proceedingstitel',
              },
              subtitle: {
                value: 'Undertitel',
              },
            },
          },
        },
      },
      titleInfo: {
        __text: { en: 'Title' },
        title: {
          value: 'Bidgragstitel',
        },
        subtitle: {
          value: 'Undertitel',
        },
      },
      note_type_statementOfResponsibility: {
        __text: { en: 'Note' },
        value: 'some note of responsability',
      },
      identifier_type_isbn: [
        {
          __text: { en: 'ISBN' },
          _displayLabel: 'print',
          value: '978-92-893-8293-9',
        },
      ],
      identifier_type_doi: {
        __text: { en: 'DOI' },
        value: '10.1234/linked.doi',
      },
      part: {
        extent: {
          start: { __text: { en: 'Start page' }, value: '12' },
          end: { __text: { en: 'End page' }, value: '34' },
        },
      },
      relatedItem_type_series: [
        {
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
            __text: { en: 'Series' },
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
        },
      ],
    } as RelatedItemConferencePublicationGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <ConferencePublication
            conferencePublication={conferencePublication}
          />
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Conference Paper' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Proceedingstitel: Undertitel' }),
    ).toBeVisible();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Bidgragstitel: Undertitel')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('some note of responsability')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('ISBN (print)')).toBeInTheDocument();
    expect(screen.getByText('978-92-893-8293-9')).toBeInTheDocument();
    expect(screen.getByText('DOI')).toBeInTheDocument();
    expect(screen.getByText('10.1234/linked.doi')).toBeInTheDocument();
    expect(screen.getByText('Start page')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('End page')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Series' }),
    ).toBeInTheDocument();
  });
});
