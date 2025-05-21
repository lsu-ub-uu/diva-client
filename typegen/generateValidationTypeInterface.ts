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
import { generateInterfaceName } from './utils/generateInterfaceName';
import { getValueForRepeat } from './utils/getValueForRepeat';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';

export function generateValidationTypeInterface(
  validationTypePool: Lookup<string, BFFValidationType>,
  metadataPool: Lookup<string, BFFMetadata>,
  validationTypeId: string,
): string {
  try {
    const validationType = validationTypePool.get(validationTypeId);
    const interfaceName = generateInterfaceName(validationTypeId);
    const groupInterface = `
        export interface ${interfaceName} extends BFFDataRecordData {
            ${createChildRef(metadataPool, { childId: validationType.metadataGroupId, repeatMin: '1', repeatMax: '1' })}
        }`;
    return groupInterface;
  } catch {
    console.error(
      `Failed to generate types for validation type ${validationTypeId}`,
    );
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
      : `{ value: string; ${attributes} }`;

  return ` ${getNameFromMetadata(metadataPool, childMetadata)}${repeatMin === '0' ? '?' : ''}:${getValueForRepeat(value, repeatMin, repeatMax)}`;
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

    const itemCollection = metadataPool.get(
      attributeCollectionVariable.refCollection,
    ) as BFFMetadataItemCollection;

    const collectionItems = itemCollection.collectionItemReferences.map(
      (itemRef) => metadataPool.get(itemRef.refCollectionItemId),
    ) as BFFMetadataBase[];

    return `'_${attributeCollectionVariable.nameInData}': ${collectionItems.map((item) => `'${item.nameInData}'`).join('|')};`;
  });

  return attributes?.join('') ?? '';
}

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
