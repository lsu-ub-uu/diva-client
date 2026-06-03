import coraDivaClientContent from '@/__mocks__/bff/coraDivaClientContent.json';
import emptyTestData from '@/__mocks__/bff/emptyDataList.json';
import { describe, expect, it } from 'vitest';
import { transformClientContent } from '../transformClientContent.server';
import type { BFFClientContent } from '@/cora/bffTypes.server';

describe('transformClientContent', () => {
  it('transforms the first record in the list', () => {});

  it('Empty list should return empty', () => {
    const metadataList = transformClientContent(emptyTestData);
    expect(metadataList).toStrictEqual([]);
  });

  it('Returns one clientContent entry', () => {
    const result = transformClientContent(coraDivaClientContent);
    expect(result).toStrictEqual([
      {
        id: 'diva-clientContent',
        globalAlert: {
          severity: 'warning',
          text: {
            cimode: 'textText',
            sv: 'Det här är en förhandsvisning av nya DiVA, med tillfälliga testdata. Miljön är inte färdig och kommer att ändras.',
            en: 'This is a preview of the new DiVA web page, with temporary test data. This pre-production environment is not ready and will change.',
          },
        },
      } satisfies BFFClientContent,
    ]);
  });
});
