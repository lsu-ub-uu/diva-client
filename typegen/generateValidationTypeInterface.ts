import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
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
    const metadataGroup = metadataPool.get(validationType.metadataGroupId);
    const interfaceName = generateInterfaceName(validationTypeId);
    const groupInterface = `
        export interface ${interfaceName} 
            ${createGroupType(metadataPool, metadataGroup as BFFMetadataGroup)}
        `;
    return groupInterface;
  } catch (error) {
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

  const value =
    childMetadata.type === 'group'
      ? createGroupType(metadataPool, childMetadata as BFFMetadataGroup)
      : '{ value: string; }';

  return ` ${getNameFromMetadata(metadataPool, childMetadata)}:${getValueForRepeat(value, repeatMin, repeatMax)}`;
}

function createGroupType(
  metadataPool: Lookup<string, BFFMetadata>,
  group: BFFMetadataGroup,
): string {
  const children = group.children.map((childRef) => {
    return `${createChildRef(metadataPool, childRef)}`;
  });

  return `{ ${children.join(';')} }`;
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
