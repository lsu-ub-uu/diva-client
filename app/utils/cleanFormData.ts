import type { ValuableDataWrapper } from '@/cora/transform/transformToCora.server';
import { isEmpty, omitBy, pickBy } from 'lodash-es';

export const cleanFormDataOld = (obj: Record<string, any>): any => {
  if (typeof obj !== 'object') {
    return obj;
  }
  return Object.keys(obj).reduce((acc: any, key: string) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      const newArray = value
        .map(cleanFormDataOld)
        .filter((o) => hasOnlyAttributes(o))
        .filter((o: any) => Object.keys(o).length > 0);
      if (!isEmpty(newArray)) {
        acc[key] = newArray;
      }
    } else if (isObjectAndHasLength(value)) {
      const newObj = cleanFormDataOld(value);
      if (hasOnlyAttributes(newObj)) {
        acc[key] = newObj;
      }
    } else {
      if (hasOnlyAttributes(value)) {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};

export const hasOnlyAttributes = (obj: any) => {
  return isEmpty(
    omitBy(
      obj,
      (_, key) => isAttribute(key) || key === 'repeatId' || key === 'final',
    ),
  );
};

const isAttribute = (key: string) => {
  return key.startsWith('_');
};

const isObjectAndHasLength = (value: any): boolean => {
  return typeof value === 'object' && !isEmpty(value);
};

const isFinalValue = (obj: any): boolean => {
  return obj?.final === true;
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
    const cleanedArray = obj
      .map(cleanFormDataRecursively)
      .filter(({ hasValuableData }) => hasValuableData)
      .map(({ data }) => data);
    return { data: cleanedArray, hasValuableData: cleanedArray.length > 0 };
  }

  if (typeof obj === 'object' && !isEmpty(obj)) {
    if (Object.hasOwn(obj, 'value')) {
      if (isEmpty(obj.value)) {
        return { data: {}, hasValuableData: false };
      }

      return {
        data: pickBy(obj, (_, key) => key === 'value' || isAttribute(key)),
        hasValuableData: !isEmpty(obj.value) && !obj.final,
      };
    } else {
      let valuableDataFoundInGroup = false;
      const cleanedObj: Record<string, any> = {};

      Object.entries(obj).forEach(([key, value]) => {
        if (isAttribute(key) && !isEmpty(value)) {
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
    }
  }

  // Is primitive
  return { data: {}, hasValuableData: false };
};
