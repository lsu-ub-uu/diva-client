import type { CoraData, DataGroup } from '@/cora/cora-data/types.server';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentWithData,
} from '../FormGenerator/types';

export const findChildData = (
  component: FormComponent,
  group: DataGroup,
): CoraData[] => {
  if (!isComponentWithData(component)) {
    return [];
  }

  return group.children.filter((child) =>
    doesDataMatchComponent(component, child),
  );
};

export const doesDataMatchComponent = (
  component: FormComponentWithData,
  data: CoraData,
) => {
  if (data.name !== component.name) {
    return false;
  }

  const componentAttributes = component.attributes || [];
  const dataChildAttributes = data.attributes || {};

  if (Object.keys(dataChildAttributes).length !== componentAttributes.length) {
    return false;
  }

  return componentAttributes.every((attribute) => {
    const dataAttributeValue = dataChildAttributes[attribute.name];
    if (dataAttributeValue) {
      if (attribute.finalValue) {
        return dataAttributeValue === attribute.finalValue;
      }

      return attribute.options.some(
        (option) => option.value === dataAttributeValue,
      );
    }

    return attribute.name in dataChildAttributes;
  });
};
