import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';
import * as prettier from 'prettier';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { get } from 'http';
import { transformMetadata } from '@/cora/transform/transformMetadata.server';
import { listToPool } from '@/utils/structs/listToPool';
import { transformCoraValidationTypes } from '@/cora/transform/transformValidationTypes.server';

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

const [metadataPool, validationTypePool] = await Promise.all([
  getMetadataPool(),
  getValidationTypePool(),
]);

let code = `
  /**
   * Auto-generated types
   * Date: ${new Date().toISOString()}
   */ 
   
  `;

VALIDATION_TYPES.forEach((validationType) =>
  generateValidationTypeInterface(validationType),
);

const outputPath = new URL(
  '../app/generatedTypes/divaTypes.ts',
  import.meta.url,
);

const formattedCode = await prettier.format(code, {
  parser: 'typescript',
  singleQuote: true,
});
// Write types to file
fs.writeFileSync(outputPath, formattedCode, 'utf8');

console.log('Types generated at:', outputPath.pathname);

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

function generateValidationTypeInterface(validationTypeId: string) {
  try {
    const validationType = validationTypePool.get(validationTypeId);
    const metadataGroup = metadataPool.get(validationType.metadataGroupId);
    const interfaceName = generateInterfaceName(validationTypeId);
    const groupInterface = `
      export interface ${interfaceName} {
          ${createGroupType(metadataGroup as BFFMetadataGroup)}
      }
      `;
    code += groupInterface;
  } catch (error) {
    console.error(
      `Failed to generate types for validation type ${validationTypeId}`,
    );
  }
}

function createChildType(childRef: BFFMetadataChildReference): string {
  const childMetadata = metadataPool.get(childRef.childId);

  if (childMetadata.type === 'group') {
    return createGroupType(childMetadata as BFFMetadataGroup);
  }
  return ` ${getNameFromMetadata(childMetadata)}:{ value: string; }`;
}

function createGroupType(group: BFFMetadataGroup): string {
  const children = group.children.map((childRef) => {
    return `${createChildType(childRef)}`;
  });

  return `${getNameFromMetadata(group)}: { ${children.join(';')}}`;
}

function getNameFromMetadata(metadata: BFFMetadata): string {
  if (!('attributeReferences' in metadata)) {
    return `'${metadata.nameInData}'`;
  }

  const attributes =
    metadata.attributeReferences
      ?.map(
        (attrRef) =>
          metadataPool.get(
            attrRef.refCollectionVarId,
          ) as BFFMetadataCollectionVariable,
      )
      .map((attribute) => ({
        name: attribute.nameInData,
        value: attribute.finalValue,
      })) ?? [];

  return `'${createFieldNameWithAttributes(metadata.nameInData, attributes)}'`;
}

function generateInterfaceName(validationTypeId: string): string {
  return validationTypeId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
