import type { ValuableDataWrapper } from '@/cora/transform/transformToCora.server';
import { isEmpty, omitBy, pickBy } from 'lodash-es';

export const hasOnlyAttributes = (obj: any) => {
  return isEmpty(
    omitBy(
      obj,
      (_, key) => isAttributeKey(key) || key === 'repeatId' || key === 'final',
    ),
  );
};

export const cleanFormData = (
  obj: Record<string, any>,
): Record<string, any> => {
  return cleanFormDataRecursively(obj).data;
};

const cleanFormDataRecursively = (
  obj: Record<string, any>,
): ValuableDataWrapper<Record<string, any>> => {
  if (Array.isArray(obj)) {
    return cleanArray(obj);
  }
  if (isObject(obj)) {
    if (isLeaf(obj)) {
      return cleanLeaf(obj);
    } else {
      return cleanGroup(obj);
    }
  }

  return { data: {}, hasValuableData: false };
};
const isObject = (obj: any) => {
  return typeof obj === 'object' && !isEmpty(obj);
};

const isLeaf = (obj: any) => {
  return (
    typeof obj === 'object' && !isEmpty(obj) && Object.hasOwn(obj, 'value')
  );
};

const isGroup = (obj: any) => {
  return (
    typeof obj === 'object' && !isEmpty(obj) && !Object.hasOwn(obj, 'value')
  );
};

const cleanArray = (arr: any[]): ValuableDataWrapper<any[]> => {
  const cleanedArray = arr
    .map(cleanFormDataRecursively)
    .filter(({ hasValuableData }) => hasValuableData)
    .map(({ data }) => data);
  return { data: cleanedArray, hasValuableData: cleanedArray.length > 0 };
};

const cleanLeaf = (obj: Record<string, any>): ValuableDataWrapper<any> => {
  if (isEmpty(obj.value)) {
    return { data: {}, hasValuableData: false };
  }

  return {
    data: pickBy(obj, (_, key) => key === 'value' || isAttributeKey(key)),
    hasValuableData: !isEmpty(obj.value) && !obj.final,
  };
};

const cleanGroup = (obj: Record<string, any>): ValuableDataWrapper<any> => {
  let valuableDataFoundInGroup = false;
  const cleanedObj: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (isAttributeKey(key) && !isEmpty(value)) {
      cleanedObj[key] = value;
      return;
    }

    const cleaned = cleanFormDataRecursively(value);
    if (cleaned.hasValuableData) {
      valuableDataFoundInGroup = true;
    }

    if (!isEmpty(cleaned.data)) {
      cleanedObj[key] = cleaned.data;
    }
  });

  return {
    data: valuableDataFoundInGroup ? cleanedObj : {},
    hasValuableData: valuableDataFoundInGroup,
  };
};

const isAttributeKey = (key: string) => {
  return key.startsWith('_');
};
