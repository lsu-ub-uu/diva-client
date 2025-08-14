import { isEmpty, omitBy } from 'lodash-es';

export const cleanFormData = (obj: Record<string, any>): any => {
  if (typeof obj !== 'object') {
    return obj;
  }
  return Object.keys(obj).reduce((acc: any, key: string) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      const newArray = value
        .map(cleanFormData)
        .filter((o) => !hasOnlyAttributes(o))
        .filter((o: any) => Object.keys(o).length > 0);
      if (!isEmpty(newArray)) {
        acc[key] = newArray;
      }
    } else if (isObjectAndHasLength(value)) {
      const newObj = cleanFormData(value);
      if (!hasOnlyAttributes(newObj)) {
        acc[key] = newObj;
      }
    } else {
      if (!hasOnlyAttributes(value)) {
        acc[key] = value;
      }
    }

    return acc;
  }, {});
};

export const hasOnlyAttributes = (obj: any) => {
  return isEmpty(
    omitBy(obj, (_, key) => isAttribute(key) || key === 'repeatId'),
  );
};

const isAttribute = (key: string) => {
  return key.startsWith('_');
};

const isObjectAndHasLength = (value: any): boolean => {
  return typeof value === 'object' && !isEmpty(value);
};
