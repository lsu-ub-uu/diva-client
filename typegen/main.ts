import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import type {
  BFFMetadata,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import { transformMetadata } from '@/cora/transform/transformMetadata.server';
import { transformCoraRecordTypes } from '@/cora/transform/transformRecordTypes.server';
import { listToPool } from '@/utils/structs/listToPool';
import 'dotenv/config';
import fs from 'fs';
import * as prettier from 'prettier';
import { generateTypesForRecordTypes } from './generateTypesForRecordTypes';

const [metadataPool, recordTypePool] = await Promise.all([
  getMetadataPool(),
  getRecordTypePool(),
]);

const RECORD_TYPES = [
  'diva-series',
  'diva-publisher',
  'diva-project',
  'diva-output',
  'diva-journal',
  'diva-organisation',
  'diva-course',
  'diva-programme',
  'diva-subject',
  'diva-localGenericMarkup',
  'diva-funder',
  'diva-person',
  'diva-member',
];

let code = `
  /**
   * Auto-generated types
   */ 
   
  import type { BFFDataRecordData } from '@/types/record';

  `;

code += generateTypesForRecordTypes(recordTypePool, metadataPool, RECORD_TYPES);

const outputPath = new URL(
  '../app/generatedTypes/divaTypes.ts',
  import.meta.url,
);

try {
  const formattedCode = await prettier.format(code, {
    parser: 'typescript',
    singleQuote: true,
  });
  fs.writeFileSync(outputPath, formattedCode, 'utf8');

  console.info('Types generated at:', outputPath.pathname);
} catch (error) {
  console.error('Error formatting code:', code, error);
  process.exit(1);
}

async function getMetadataPool() {
  const coraMetadata =
    await getRecordDataListByType<DataListWrapper>('metadata');

  const metadata = transformMetadata(coraMetadata.data);

  return listToPool<BFFMetadata>(metadata);
}

async function getRecordTypePool() {
  const coraMetadata =
    await getRecordDataListByType<DataListWrapper>('recordType');

  const recordTypes = transformCoraRecordTypes(coraMetadata.data);

  return listToPool<BFFRecordType>(recordTypes);
}
