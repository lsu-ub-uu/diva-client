import type { CoraData, DataGroup } from '@/cora/cora-data/types.server';
import {
  isComponentContainer,
  isComponentWithData,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentContainer,
} from '../FormGenerator/types';

export const findChildData = (
  component: FormComponent,
  group: DataGroup,
): CoraData[] => {
  if (component.type === 'container') {
    return [getContainerData(component, group)];
  }

  return group.children.filter((child) =>
    doesDataMatchComponent(component, child),
  );
};

export const doesDataMatchComponent = (
  component: FormComponent,
  data: CoraData,
) => {
  if (!isComponentWithData(component)) {
    return false;
  }

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

const getContainerData = (
  container: FormComponentContainer,
  dataGroup: DataGroup,
) => {
  const matchingChildren = dataGroup.children.filter((childData) => {
    return container.components?.some((childComponent) => {
      if (isComponentContainer(childComponent)) {
        return childComponent.components?.some((nestedChild) =>
          doesDataMatchComponent(nestedChild, childData),
        );
      }

      return doesDataMatchComponent(childComponent, childData);
    });
  });

  return { ...dataGroup, children: matchingChildren };
};
