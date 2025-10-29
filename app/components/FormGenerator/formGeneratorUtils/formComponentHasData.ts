import type { FieldValues, UseFormGetValues } from 'react-hook-form';
import type { FormComponent } from '../types';
import { isComponentContainer } from './formGeneratorUtils';
import { getCurrentComponentNamePath } from '../Component';
import { hasValuableData } from '@/utils/cleanFormData';

export const formComponentHasData = (
  parentPath: string,
  component: FormComponent,
  getValues: UseFormGetValues<FieldValues>,
) => {
  if (isComponentContainer(component)) {
    return component.components?.some((child) => {
      const childPath = getCurrentComponentNamePath(child, parentPath);
      const childValues = getValues(childPath);
      return hasValuableData(childValues);
    });
  }

  return hasValuableData(
    getValues(getCurrentComponentNamePath(component, parentPath)),
  );
};
