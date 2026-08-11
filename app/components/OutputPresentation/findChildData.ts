import type { CoraData, DataGroup } from '@/cora/cora-data/types.server';
import {
  isComponentContainer,
  isComponentGroup,
  isComponentWithData,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentContainer,
} from '../FormGenerator/types';

export const findChildData = (
  component: FormComponent,
  groupData: DataGroup,
): CoraData[] => {
  if (isComponentContainer(component)) {
    return getContainerData(component, groupData);
  }

  return groupData.children.filter((childData) =>
    doesDataMatchComponent(component, childData),
  );
};

const doesDataMatchComponent = (component: FormComponent, data: CoraData) => {
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
  component: FormComponentContainer,
  groupData: DataGroup,
): CoraData[] => {
  return [
    {
      ...groupData,
      children: groupData.children.filter((childData) =>
        doesDataMatchComponentTree(component, childData),
      ),
    },
  ];
};

const doesDataMatchComponentTree = (
  component: FormComponent | undefined,
  childData: CoraData,
): boolean => {
  if (!component) {
    return false;
  }

  if (doesDataMatchComponent(component, childData)) {
    return true;
  }

  return getNestedComponents(component).some((nestedComponent) =>
    doesDataMatchComponentTree(nestedComponent, childData),
  );
};

const getNestedComponents = (component: FormComponent): FormComponent[] => {
  const nestedComponents =
    isComponentContainer(component) || isComponentGroup(component)
      ? (component.components ?? [])
      : [];

  return component.alternativePresentation
    ? [...nestedComponents, component.alternativePresentation]
    : nestedComponents;
};
