import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import type {
  BFFMetadata,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { transformMetadata } from '@/cora/transform/transformMetadata.server';
import { transformCoraValidationTypes } from '@/cora/transform/transformValidationTypes.server';
import { listToPool } from '@/utils/structs/listToPool';
import 'dotenv/config';
import fs from 'fs';
import * as prettier from 'prettier';
import { generateValidationTypeInterfaces } from './generateValidationTypeInterface';

const [metadataPool, validationTypePool] = await Promise.all([
  getMetadataPool(),
  getValidationTypePool(),
]);

const VALIDATION_TYPES = [
  'diva-series',
  'diva-publisher',
  'diva-project',
  'diva-output',
  'diva-journal',
  'diva-topOrganisation',
  'diva-course',
  'diva-programme',
  'diva-partOfOrganisation',
  'diva-subject',
  'diva-localGenericMarkup',
  'diva-funder',
  'diva-person',
  'diva-theme',
];

let code = `
  /**
   * Auto-generated types
   */ 
   
  import type { BFFDataRecordData } from '@/types/record';

  `;

code += generateValidationTypeInterfaces(
  validationTypePool,
  metadataPool,
  VALIDATION_TYPES,
);

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

async function getValidationTypePool() {
  const coraMetadata =
    await getRecordDataListByType<DataListWrapper>('validationType');

  const validationTypes = transformCoraValidationTypes(coraMetadata.data);

  return listToPool<BFFValidationType>(validationTypes);
}
