import { describe, expect, it } from 'vitest';
import { generateCitationMeta } from '../generateCitationMeta';
import type {
  DateIssuedGroup,
  DateOtherOnlineGroup,
  DivaOutput,
  TitleInfoLangGroup,
} from '@/generatedTypes/divaTypes';

const divaOutput = {
  output: {
    titleInfo: {
      title: { value: 'Quantum Entanglement in Superconducting Qubits' },
      subtitle: { value: 'A Breakthrough Study' },
    },

    originInfo: {
      dateIssued: {
        year: { value: '2024' },
        month: { value: '03' },
        day: { value: '15' },
      },
      dateOther_type_online: {
        year: { value: '2024' },
        month: { value: '03' },
        day: { value: '20' },
      },
    },
    identifier_type_isbn: [
      { value: '978-3-16-148410-0', _displayLabel: 'online' },
      { value: '978-1-23-456789-7', _displayLabel: 'print' },
      { value: '(╯°□°)╯︵ ┻━┻', _displayLabel: 'invalid' },
    ],
    relatedItem_type_journal: {
      titleInfo: {
        title: { value: 'Journal of Quantum Physics' },
        subtitle: { value: 'Advances in Quantum Mechanics' },
      },
      identifier_displayLabel_eissn_type_issn: {
        value: '2345-6789',
      },
      identifier_displayLabel_pissn_type_issn: {
        value: '1234-5678',
      },
      part: {
        detail_type_volume: { number: { value: '42' } },
        detail_type_issue: { number: { value: '3' } },
        extent: {
          start: { value: '256' },
          end: { value: '289' },
        },
      },
    },
    identifier_type_doi: {
      value: '10.1234/jqp.2024.42.3.256',
    },
    name_type_personal: [
      {
        namePart_type_family: { value: 'Quantum' },
        namePart_type_given: { value: 'Emily' },
        role: { roleTerm: [{ value: 'aut' }] },
      },
      {
        namePart_type_family: { value: 'The editor' },
        namePart_type_given: { value: 'Emil' },
        role: { roleTerm: [{ value: 'edt' }] },
      },
      {
        namePart_type_family: { value: 'Planck' },
        namePart_type_given: { value: 'Max Jr.' },
        role: { roleTerm: [{ value: 'edt' }, { value: 'aut' }] },
      },
    ],
    attachment: [
      {
        label: { value: 'movie' },
        file: {
          linkedRecord: {
            binary: {
              recordInfo: { visibility: { value: 'published' } },
              master: {
                master: {
                  mimeType: 'video/mp4',
                  id: 'binary:iamavideo',
                  name: 'master',
                },
              },
            },
          },
        },
      },
      {
        label: { value: 'fullText' },
        file: {
          linkedRecord: {
            binary: {
              recordInfo: { visibility: { value: 'published' } },
              master: {
                master: {
                  mimeType: 'application/pdf',
                  id: 'binary:iamafulltext',
                  name: 'master',
                },
              },
            },
          },
        },
      },
      {
        label: { value: 'fullText' },
        file: {
          linkedRecord: {
            binary: {
              recordInfo: { visibility: { value: 'published' } },
              master: {
                master: {
                  mimeType: 'application/pdf',
                  id: 'binary:iamafulltext',
                  name: 'master',
                },
              },
            },
          },
        },
      },
      {
        label: { value: 'fullText' },
        file: {
          linkedRecord: {
            binary: {
              recordInfo: { visibility: { value: 'hidden' } },
              master: {
                master: {
                  mimeType: 'application/pdf',
                  id: 'binary:iamafulltext',
                  name: 'master',
                },
              },
            },
          },
        },
      },
    ],
  },
} as DivaOutput;

const externalSystemUrl = 'https://example.com';

describe('generateCitationMeta', () => {
  it('handles minimal divaOutput', () => {
    const divaOutputMinimal = { output: {} } as DivaOutput;

    expect(generateCitationMeta(divaOutputMinimal, '/')).toEqual([]);
  });

  it('generates citation_title', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_title',
      content:
        'Quantum Entanglement in Superconducting Qubits: A Breakthrough Study',
    });
  });

  it('generates citation_title without subtitle', () => {
    const divaOutputWithoutSubtitle = structuredClone(divaOutput);
    divaOutputWithoutSubtitle.output.titleInfo!.subtitle = {
      value: '',
    } as TitleInfoLangGroup['subtitle'];
    const result = generateCitationMeta(
      divaOutputWithoutSubtitle,
      externalSystemUrl,
    );
    expect(result).toContainEqual({
      name: 'citation_title',
      content: 'Quantum Entanglement in Superconducting Qubits',
    });
  });

  it('generates citation_author for authors only', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_author',
      content: 'Emily Quantum',
    });
    expect(result).not.toContainEqual({
      name: 'citation_author',
      content: 'Emil The editor',
    });
    expect(result).toContainEqual({
      name: 'citation_author',
      content: 'Max Jr. Planck',
    });
  });

  it('generates citation_publication_date from originInfo', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_publication_date',
      content: '2024/03/15',
    });
  });

  it('generates citation_publication_date with only year', () => {
    const divaOutputWithYearOnly = structuredClone(divaOutput);
    divaOutputWithYearOnly.output.originInfo!.dateIssued = {
      year: { value: '2024' },
    } as DateIssuedGroup;

    const result = generateCitationMeta(
      divaOutputWithYearOnly,
      externalSystemUrl,
    );
    expect(result).toContainEqual({
      name: 'citation_publication_date',
      content: '2024',
    });
  });

  it('generates citation_online_date', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_online_date',
      content: '2024/03/20',
    });
  });

  it('generates citation_online_date with only year', () => {
    const divaOutputWithYearOnly = structuredClone(divaOutput);
    divaOutputWithYearOnly.output.originInfo!.dateOther_type_online = {
      year: { value: '2024' },
    } as DateOtherOnlineGroup;

    const result = generateCitationMeta(
      divaOutputWithYearOnly,
      externalSystemUrl,
    );
    expect(result).toContainEqual({
      name: 'citation_online_date',
      content: '2024',
    });
  });

  it('generates citation_journal_title', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_journal_title',
      content: 'Journal of Quantum Physics: Advances in Quantum Mechanics',
    });
  });

  it('generates citation_firstpage', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_firstpage',
      content: '256',
    });
  });

  it('generates citation_lastpage', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_lastpage',
      content: '289',
    });
  });

  it('generates citation_volume', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_volume',
      content: '42',
    });
  });
  it('generates citation_issue', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_issue',
      content: '3',
    });
  });
  it('generates citation_issn', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_issn',
      content: '1234-5678',
    });
    expect(result).toContainEqual({
      name: 'citation_issn',
      content: '2345-6789',
    });
  });
  it('generates citation_doi', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_doi',
      content: '10.1234/jqp.2024.42.3.256',
    });
  });
  it('generates citation_isbn', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_isbn',
      content: '978-3-16-148410-0',
    });
    expect(result).toContainEqual({
      name: 'citation_isbn',
      content: '978-1-23-456789-7',
    });
    expect(result).toContainEqual({
      name: 'citation_isbn',
      content: '(╯°□°)╯︵ ┻━┻',
    });
  });

  it('generates citation_pdf_url for fulltext attachments', () => {
    const result = generateCitationMeta(divaOutput, externalSystemUrl);
    expect(result).toContainEqual({
      name: 'citation_pdf_url',
      content:
        'https://example.com/rest/record/binary/binary:iamafulltext/master',
    });
    expect(result).not.toContainEqual({
      name: 'citation_pdf_url',
      content: 'https://example.com/rest/record/binary/binary:iamavideo/master',
    });
  });
});
