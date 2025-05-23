import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import type { Lookup } from '@/utils/structs/lookup';
import { generateInterfaceName as generateTypeName } from './utils/generateInterfaceName';
import { getValueForRepeat } from './utils/getValueForRepeat';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';

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

const collectionVariableTypes = new Map<string, string>();

export function generateValidationTypeInterface(
  validationTypePool: Lookup<string, BFFValidationType>,
  metadataPool: Lookup<string, BFFMetadata>,
): string {
  let outputString = '';

  try {
    VALIDATION_TYPES.forEach((validationTypeId) => {
      const validationType = validationTypePool.get(validationTypeId);
      const interfaceName = generateTypeName(validationTypeId);

      outputString += `
        export interface ${interfaceName} extends BFFDataRecordData {
            ${createChildRef(metadataPool, { childId: validationType.metadataGroupId, repeatMin: '1', repeatMax: '1' })}
        }\n\n`;
    });

    collectionVariableTypes.values().forEach((type) => {
      outputString += `${type}\n\n`;
    });

    return outputString;
  } catch {
    console.error(`Failed to generate types`);
    return '';
  }
}

function createChildRef(
  metadataPool: Lookup<string, BFFMetadata>,
  childRef: BFFMetadataChildReference,
): string {
  const childMetadata = metadataPool.get(childRef.childId);

  const { repeatMin, repeatMax } = childRef;
  const attributes = createAttributes(metadataPool, childMetadata);

  const value =
    childMetadata.type === 'group'
      ? `{ ${createGroupType(metadataPool, childMetadata as BFFMetadataGroup)}; ${attributes} }`
      : `{ value: ${createValue(metadataPool, childMetadata)}; ${attributes} }`;

  return ` ${getNameFromMetadata(metadataPool, childMetadata)}${repeatMin === '0' ? '?' : ''}:${getValueForRepeat(value, repeatMin, repeatMax)}`;
}

function createValue(
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadata,
): string {
  if ('finalValue' in metadata && metadata.finalValue) {
    return `'${metadata.finalValue}'`;
  }
  if (metadata.type === 'collectionVariable') {
    return createCollectionVariableItems(
      metadataPool,
      metadata as BFFMetadataCollectionVariable,
    );
  }

  return 'string';
}

function createAttributes(
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadata,
): string {
  if (!('attributeReferences' in metadata)) {
    return '';
  }

  const attributes = metadata.attributeReferences?.map((attrRef) => {
    const attributeCollectionVariable = metadataPool.get(
      attrRef.refCollectionVarId,
    ) as BFFMetadataCollectionVariable;

    if (attributeCollectionVariable.finalValue) {
      return `_${attributeCollectionVariable.nameInData}: '${attributeCollectionVariable.finalValue}';`;
    }

    const collectionItems = createCollectionVariableItems(
      metadataPool,
      attributeCollectionVariable,
    );

    return `'_${attributeCollectionVariable.nameInData}': ${collectionItems};`;
  });

  return attributes?.join('') ?? '';
}

const createCollectionVariableItems = (
  metadataPool: Lookup<string, BFFMetadata>,
  collectionVariable: BFFMetadataCollectionVariable,
) => {
  const typeName = generateTypeName(collectionVariable.refCollection);

  if (!collectionVariableTypes.has(collectionVariable.refCollection)) {
    const itemCollection = metadataPool.get(
      collectionVariable.refCollection,
    ) as BFFMetadataItemCollection;

    const collectionItems = itemCollection.collectionItemReferences.map(
      (itemRef) => metadataPool.get(itemRef.refCollectionItemId),
    ) as BFFMetadataBase[];

    const items = collectionItems
      .map((item) => `'${item.nameInData}'`)
      .join('|');

    collectionVariableTypes.set(
      collectionVariable.refCollection,
      `export type ${typeName} = ${items}`,
    );
  }

  return typeName;
};

function createGroupType(
  metadataPool: Lookup<string, BFFMetadata>,
  group: BFFMetadataGroup,
): string {
  const children = group.children.map((childRef) => {
    return `${createChildRef(metadataPool, childRef)}`;
  });

  return children.join(';');
}

export function getNameFromMetadata(
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadata,
): string {
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
