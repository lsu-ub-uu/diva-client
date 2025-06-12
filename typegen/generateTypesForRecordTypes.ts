import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';
import type { Lookup } from '@/utils/structs/lookup';
import { generateInterfaceName as generateTypeName } from './utils/generateInterfaceName';
import { getValueForRepeat } from './utils/getValueForRepeat';

const metadataTypes = new Map<string, string>();

export function generateTypesForRecordTypes(
  recordTypePool: Lookup<string, BFFRecordType>,
  metadataPool: Lookup<string, BFFMetadata>,
  recordTypeIds: string[],
): string {
  let outputString = '';

  try {
    recordTypeIds.forEach((recordTypeId) => {
      const recordType = recordTypePool.get(recordTypeId);
      const interfaceName = generateTypeName(recordTypeId);

      outputString += `
        export interface ${interfaceName} extends BFFDataRecordData {
            ${createChildRef(metadataPool, recordTypePool, { childId: recordType.metadataId, repeatMin: '1', repeatMax: '1' })}
        }\n\n`;
    });

    metadataTypes.values().forEach((type) => {
      outputString += `${type}\n\n`;
    });

    return outputString;
  } catch (error) {
    console.error(`Failed to generate types`, error);
    return '';
  }
}

function createChildRef(
  metadataPool: Lookup<string, BFFMetadata>,
  recordTypePool: Lookup<string, BFFRecordType>,
  childRef: BFFMetadataChildReference,
): string {
  const childMetadata = metadataPool.get(childRef.childId);

  const { repeatMin, repeatMax } = childRef;
  const attributes = createAttributes(metadataPool, childMetadata);

  const value =
    childMetadata.type === 'group'
      ? createGroupType(
          metadataPool,
          recordTypePool,
          childMetadata as BFFMetadataGroup,
          attributes,
        )
      : childMetadata.type === 'recordLink'
        ? createRecordLinkType(
            metadataPool,
            recordTypePool,
            childMetadata as BFFMetadataRecordLink,
            attributes,
          )
        : `{ value: ${createValue(metadataPool, childMetadata)}; ${attributes} }`;

  return ` ${getNameFromMetadata(metadataPool, childMetadata)}${repeatMin === '0' ? '?' : ''}:${getValueForRepeat(value, repeatMin, repeatMax)}`;
}
/* 
interface RecordLink<T> {
  linkedRecordType: { value: string };
  linkedRecordId: { value: string };
  linkedRecord: T;
} */

function createRecordLinkType(
  metadataPool: Lookup<string, BFFMetadata>,
  recordTypePool: Lookup<string, BFFRecordType>,
  childMetadata: BFFMetadataRecordLink,
  attributes: string,
): string {
  console.log(
    'recordLink',
    childMetadata.nameInData,
    childMetadata.linkedRecordType,
  );

  const linkedRecordType = recordTypePool.get(childMetadata.linkedRecordType);

  return `{ value: ${createValue(metadataPool, childMetadata)}; ${attributes} }`;
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

function createTextTypes(value: boolean = false) {
  if (value) {
    return '__text: { sv: string; en: string; }; __valueText: { sv: string; en: string; }';
  }
  return '__text: { sv: string; en: string; }';
}

function createAttributes(
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadata,
): string {
  const attributeTypes = createAttributeTypes(metadataPool, metadata);

  const textTypes = createTextTypes(metadata.type === 'collectionVariable');

  return `${attributeTypes} ${textTypes}`;
}

const createAttributeTypes = (
  metadataPool: Lookup<string, BFFMetadata>,
  metadata: BFFMetadata,
) => {
  if (!('attributeReferences' in metadata)) {
    return '';
  }

  if (!metadata.attributeReferences) {
    return '';
  }

  return metadata.attributeReferences
    .map((attrRef) => {
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
    })
    .join('');
};

const createCollectionVariableItems = (
  metadataPool: Lookup<string, BFFMetadata>,
  collectionVariable: BFFMetadataCollectionVariable,
) => {
  const typeName = generateTypeName(collectionVariable.refCollection);

  if (!metadataTypes.has(collectionVariable.refCollection)) {
    const itemCollection = metadataPool.get(
      collectionVariable.refCollection,
    ) as BFFMetadataItemCollection;

    const collectionItems = itemCollection.collectionItemReferences.map(
      (itemRef) => metadataPool.get(itemRef.refCollectionItemId),
    ) as BFFMetadataBase[];

    const items = collectionItems
      .map((item) => `'${item.nameInData}'`)
      .join('|');

    metadataTypes.set(
      collectionVariable.refCollection,
      `export type ${typeName} = ${items}`,
    );
  }

  return typeName;
};

function createGroupType(
  metadataPool: Lookup<string, BFFMetadata>,
  recordTypePool: Lookup<string, BFFRecordType>,
  group: BFFMetadataGroup,
  attributes: string,
): string {
  const typeName = generateTypeName(group.id);

  if (!metadataTypes.has(group.id)) {
    const children = group.children.map((childRef) => {
      return `${createChildRef(metadataPool, recordTypePool, childRef)}`;
    });

    metadataTypes.set(
      group.id,
      `export interface ${typeName} { ${children.join(';')}; ${attributes} }`,
    );
  }

  return typeName;
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
