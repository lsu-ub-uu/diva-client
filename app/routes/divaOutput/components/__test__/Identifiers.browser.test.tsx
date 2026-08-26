import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Identifiers } from '../Identifiers';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

describe('Identifiers', () => {
  it('should render with minimal data', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect
      .element(
        screen.getByRole('heading', { name: 'divaClient_identifierText' }),
      )
      .toBeVisible();
    await expect(content).toContain('divaClient_divaIdText');
    await expect(content).toContain('1234');
  });

  it('should render urn', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
        urn: {
          __text: { en: 'URN' },
          value: 'urn:nbn:se:uu:diva-1234',
        },
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('URN');

    const urnLink = screen.getByRole('link', {
      name: 'urn:nbn:se:uu:diva-1234',
    });
    await expect(urnLink).toHaveAttribute(
      'href',
      'https://urn.kb.se/resolve?urn=urn:nbn:se:uu:diva-1234',
    );
    await expect(urnLink).toHaveAttribute('target', '_blank');
    await expect(urnLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render isbn', async () => {
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

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('ISBN (print)');
    await expect(content).toContain('978-3-16-148410-0');
    await expect(content).toContain('ISBN (online)');
    await expect(content).toContain('978-3-16-148410-1');
    await expect(content).toContain('ISBN (unknown)');
    await expect(content).toContain('978-3-16-148410-2');
  });

  it('should render isrn', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_isrn: {
        __text: { en: 'ISRN' },
        value: 'ISRN 1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('ISRN');
    await expect(content).toContain('ISRN 1234');
  });

  it('should render ismn', async () => {
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

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('ISMN (print)');
    await expect(content).toContain('ISMN 1234');
  });

  it('should render Patent number', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_patentNumber: {
        __text: { en: 'Patent number' },
        value: 'patent1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('Patent number');
    await expect(content).toContain('patent1234');
  });

  it('should render Doi', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_doi: {
        __text: { en: 'DOI number' },
        value: 'doi1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('DOI number');
    await expect(content).toContain('doi1234');
  });

  it('should render Pmid', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_pmid: {
        __text: { en: 'PMID' },
        value: 'somepmid1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('PMID');
    await expect(content).toContain('somepmid1234');
  });

  it('should render Wos', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_wos: {
        __text: { en: 'WOS' },
        value: 'somewos1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('WOS');
    await expect(content).toContain('somewos1234');
  });

  it('should render Scopus', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_scopus: {
        __text: { en: 'Scopus' },
        value: 'somescopus1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('Scopus');
    await expect(content).toContain('somescopus1234');
  });

  it('should render OpenAlex', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_openAlex: {
        __text: { en: 'OpenAlex' },
        value: 'someAlex1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('OpenAlex');
    await expect(content).toContain('someAlex1234');
  });

  it('should render libris ids', async () => {
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

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('Libris ID');
    await expect(content).toContain('libris1234');
    await expect(content).toContain('libris5678');
  });

  it('should render Archive Number', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_archiveNumber: {
        __text: { en: 'ArchiveNumber' },
        value: 'someArchiveNumber1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('ArchiveNumber');
    await expect(content).toContain('someArchiveNumber1234');
  });

  it('should render Local ID', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_localId: {
        __text: { en: 'Local ID' },
        value: 'localid1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('Local ID');
    await expect(content).toContain('localid1234');
  });

  it('should render patent number', async () => {
    const output = {
      recordInfo: {
        id: { value: '1234' },
      },
      identifier_type_patentNumber: {
        __text: { en: 'Patent Number' },
        value: 'patent1234',
      },
    } as DivaOutputGroup;

    const screen = await render(<Identifiers output={output} />);
    const content = screen.baseElement.textContent ?? '';

    await expect(content).toContain('Patent Number');
    await expect(content).toContain('patent1234');
  });
});
