import { describe, expect, it } from 'vitest';
import { generateSEOMeta } from '../generateSEOMeta';
import type {
  DateIssuedGroup,
  DivaOutput,
  TitleInfoLangGroup,
} from '@/generatedTypes/divaTypes';
import { cloneDeep } from 'lodash-es';

const divaOutput = {
  output: {
    titleInfo: {
      title: { value: 'Quantum Entanglement in Superconducting Qubits' },
      subTitle: { value: 'A Breakthrough Study' },
    },
    originInfo: {
      dateIssued: {
        year: { value: '2024' },
        month: { value: '03' },
        day: { value: '15' },
      },
    },
    relatedItem_type_journal: {
      titleInfo: {
        title: { value: 'Journal of Quantum Physics' },
        subTitle: { value: 'Advances in Quantum Mechanics' },
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
  },
} as DivaOutput;

describe('generateSEOMeta', () => {
  it('generates citation_title', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_title',
      content:
        'Quantum Entanglement in Superconducting Qubits: A Breakthrough Study',
    });
  });

  it('generates citation_title without subtitle', () => {
    const divaOutputWithoutSubtitle = cloneDeep(divaOutput);
    divaOutputWithoutSubtitle.output.titleInfo.subTitle = {
      value: '',
    } as TitleInfoLangGroup['subTitle'];
    const result = generateSEOMeta(divaOutputWithoutSubtitle);
    expect(result).toContainEqual({
      name: 'citation_title',
      content: 'Quantum Entanglement in Superconducting Qubits',
    });
  });

  it('generates citation_author for authors only', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_author',
      content: 'Quantum, Emily',
    });
    expect(result).not.toContainEqual({
      name: 'citation_author',
      content: 'The editor, Emil',
    });
    expect(result).toContainEqual({
      name: 'citation_author',
      content: 'Planck, Max Jr.',
    });
  });

  it('generates citation_publication_date from originInfo', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_publication_date',
      content: '2024/03/15',
    });
  });

  it('generates citation_publication_date with only year', () => {
    const divaOutputWithYearOnly = cloneDeep(divaOutput);
    divaOutputWithYearOnly.output.originInfo.dateIssued = {
      year: { value: '2024' },
    } as DateIssuedGroup;

    const result = generateSEOMeta(divaOutputWithYearOnly);
    expect(result).toContainEqual({
      name: 'citation_publication_date',
      content: '2024',
    });
  });

  it('generates citation_journal_title', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_journal_title',
      content: 'Journal of Quantum Physics: Advances in Quantum Mechanics',
    });
  });

  it('generates citation_firstpage', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_firstpage',
      content: '256',
    });
  });

  it('generates citation_lastpage', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_lastpage',
      content: '289',
    });
  });

  it('generates citation_volume', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_volume',
      content: '42',
    });
  });
  it('generates citation_issue', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_issue',
      content: '3',
    });
  });
  it('generates citation_issn', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_issn',
      content: '1234-5678',
    });
  });
  it('generates doi', () => {
    const result = generateSEOMeta(divaOutput);
    expect(result).toContainEqual({
      name: 'citation_doi',
      content: '10.1234/jqp.2024.42.3.256',
    });
  });
});
