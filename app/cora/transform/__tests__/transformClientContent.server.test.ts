import { coraDivaClientContent } from '@/__mocks__/bff/coraDivaClientContent';
import coraDivaClientContentEmpty from '@/__mocks__/bff/coraDivaClientContentEmpty.json';
import emptyTestData from '@/__mocks__/bff/emptyDataList.json';
import { describe, expect, it } from 'vitest';
import { transformClientContent } from '../transformClientContent.server';
import type { BFFClientContent, BFFSeverity } from '@/cora/bffTypes.server';

describe('transformClientContent', () => {
  it('Empty list should return empty', () => {
    const metadataList = transformClientContent(emptyTestData);
    expect(metadataList).toStrictEqual([]);
  });

  it.each(['success', 'info', 'warning', 'error', 'neutral'] as BFFSeverity[])(
    'Returns one clientContent entry for severity %s',
    (severity) => {
      const result = transformClientContent(coraDivaClientContent(severity));
      expect(result).toStrictEqual([
        {
          id: 'diva-clientContent',
          globalAlert: {
            severity,
            text: {
              cimode: 'textText',
              sv: 'Det här är en förhandsvisning av nya DiVA, med tillfälliga testdata. Miljön är inte färdig och kommer att ändras.',
              en: 'This is a preview of the new DiVA web page, with temporary test data. This pre-production environment is not ready and will change.',
            },
          },
        } satisfies BFFClientContent,
      ]);
    },
  );

  it('transforms a clientContent without content', () => {
    const result = transformClientContent(coraDivaClientContentEmpty);
    expect(result).toStrictEqual([
      {
        id: 'diva-clientContent',
      } satisfies BFFClientContent,
    ]);
  });
});
