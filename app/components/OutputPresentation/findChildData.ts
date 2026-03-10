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

const doesDataMatchComponent = (
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
    if (attribute.finalValue) {
      return dataChildAttributes[attribute.name] === attribute.finalValue;
    }
    return attribute.name in dataChildAttributes;
  });
};
