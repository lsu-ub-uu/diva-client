import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Identifiers } from '../Identifiers';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

describe('Identifiers', () => {
  it('should render with minimal data', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(
      screen.getByRole('heading', { name: 'divaClient_identifierText' }),
    ).toBeInTheDocument();
    expect(screen.getByText('divaClient_divaIdText')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('should render urn', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
        urn: {
          __text: { en: 'URN' },
          value: 'urn:nbn:se:uu:diva-1234',
        },
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('URN')).toBeInTheDocument();
    expect(screen.getByText('urn:nbn:se:uu:diva-1234')).toBeInTheDocument();
  });

  it('should render isbn', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_isbn: [
        {
          value: '978-3-16-148410-0',
          _displayLabel: 'print',
          __text: { en: 'ISBN' },
        },
        {
          value: '978-3-16-148410-1',
          _displayLabel: 'online',
          __text: { en: 'ISBN' },
        },
        {
          value: '978-3-16-148410-2',
          _displayLabel: 'unknown',
          __text: { en: 'ISBN' },
        },
      ],
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('ISBN (print)')).toBeInTheDocument();
    expect(screen.getByText('978-3-16-148410-0')).toBeInTheDocument();
    expect(screen.getByText('ISBN (online)')).toBeInTheDocument();
    expect(screen.getByText('978-3-16-148410-1')).toBeInTheDocument();
    expect(screen.getByText('ISBN (unknown)')).toBeInTheDocument();
    expect(screen.getByText('978-3-16-148410-2')).toBeInTheDocument();
  });

  it('should render isrn', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_isrn: {
        __text: { en: 'ISRN' },
        value: 'ISRN 1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('ISRN')).toBeInTheDocument();
    expect(screen.getByText('ISRN 1234')).toBeInTheDocument();
  });

  it('should render ismn', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_ismn: [
        {
          __text: { en: 'ISMN' },
          _displayLabel: 'print',
          value: 'ISMN 1234',
        },
      ],
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('ISMN (print)')).toBeInTheDocument();
    expect(screen.getByText('ISMN 1234')).toBeInTheDocument();
  });

  it('should render Patent number', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_patentNumber: {
        __text: { en: 'Patent number' },
        value: 'patent1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('Patent number')).toBeInTheDocument();
    expect(screen.getByText('patent1234')).toBeInTheDocument();
  });

  it('should render Doi', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_doi: {
        __text: { en: 'DOI number' },
        value: 'doi1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('DOI number')).toBeInTheDocument();
    expect(screen.getByText('doi1234')).toBeInTheDocument();
  });

  it('should render Pmid', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_pmid: {
        __text: { en: 'PMID' },
        value: 'somepmid1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('PMID')).toBeInTheDocument();
    expect(screen.getByText('somepmid1234')).toBeInTheDocument();
  });

  it('should render Wos', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_wos: {
        __text: { en: 'WOS' },
        value: 'somewos1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('WOS')).toBeInTheDocument();
    expect(screen.getByText('somewos1234')).toBeInTheDocument();
  });

  it('should render Scopus', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_scopus: {
        __text: { en: 'Scopus' },
        value: 'somescopus1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('Scopus')).toBeInTheDocument();
    expect(screen.getByText('somescopus1234')).toBeInTheDocument();
  });

  it('should render OpenAlex', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_openAlex: {
        __text: { en: 'OpenAlex' },
        value: 'someAlex1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('OpenAlex')).toBeInTheDocument();
    expect(screen.getByText('someAlex1234')).toBeInTheDocument();
  });

  it('should render libris ids', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      'identifier_type_se-libr': [
        {
          __text: { en: 'Libris ID' },
          value: 'libris1234',
        },
        {
          __text: { en: 'Libris ID' },
          value: 'libris5678',
        },
      ],
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('Libris ID')).toBeInTheDocument();
    expect(screen.getByText('libris1234')).toBeInTheDocument();
    expect(screen.getByText('libris5678')).toBeInTheDocument();
  });

  it('should render Archive Number', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_archiveNumber: {
        __text: { en: 'ArchiveNumber' },
        value: 'someArchiveNumber1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('ArchiveNumber')).toBeInTheDocument();
    expect(screen.getByText('someArchiveNumber1234')).toBeInTheDocument();
  });

  it('should render Local IDs', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_localId: [
        {
          __text: { en: 'Local ID' },
          value: 'localid1234',
        },
        {
          __text: { en: 'Local ID' },
          value: 'localid5678',
        },
      ],
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('Local ID')).toBeInTheDocument();
    expect(screen.getByText('localid1234')).toBeInTheDocument();
    expect(screen.getByText('localid5678')).toBeInTheDocument();
  });

  it('should render patent number', () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_patentNumber: {
        __text: { en: 'Patent Number' },
        value: 'patent1234',
      },
    } as DivaOutputGroup;

    render(<Identifiers output={output} />);

    expect(screen.getByText('Patent Number')).toBeInTheDocument();
    expect(screen.getByText('patent1234')).toBeInTheDocument();
  });
});
