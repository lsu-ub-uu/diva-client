import type { CoraData, DataGroup } from '@/cora/cora-data/types.server';
import {
  isComponentContainer,
  isComponentWithData,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentContainer,
} from '../FormGenerator/types';
import { OutputComponent } from './OutputComponent';
import {
  doesDataMatchComponent,
  findChildData as findChildData,
} from './findChildData';
import type { PresentationStyle } from '@/cora/bffTypes.server';
import { Fragment } from 'react/jsx-runtime';
import { OutputDevInfo } from './OutputDevInfo';
import { getAlternativeChildComponents } from './OutputContainer';

interface ComponentChildrenProps {
  components?: FormComponent[];
  alternativeComponents?: FormComponent[];
  data: DataGroup;
  parentPresentationStyle?: PresentationStyle | undefined;
}

export const ComponentChildren = ({
  components,
  alternativeComponents,
  data,
  parentPresentationStyle,
}: ComponentChildrenProps) => {
  return components
    ?.filter((component) => component.type !== 'hidden')
    .map((childComponent, index) => {
      if (!isComponentWithData(childComponent)) {
        return (
          <OutputComponent
            key={index}
            component={childComponent}
            parentPresentationStyle={parentPresentationStyle}
          />
        );
      }

      const childData =
        childComponent.type === 'container'
          ? [getContainerData(childComponent, data)]
          : findChildData(childComponent, data);
      if (!childData) {
        return null;
      }

      return childData.map((data, childIndex) => (
        <Fragment key={`${index}-${childIndex}`}>
          <OutputDevInfo
            component={childComponent}
            data={data}
            parentPresentationStyle={parentPresentationStyle}
          />

          <OutputComponent
            key={`${index}-${childIndex}`}
            component={childComponent}
            data={data}
            parentPresentationStyle={parentPresentationStyle}
          />
        </Fragment>
      ));
    });
};

/**
 * Gets a copy of the data group with only the children that match the components in the container.
 */
const getContainerData = (
  container: FormComponentContainer,
  dataGroup: DataGroup,
) => {
  const matchingChildren = dataGroup.children.filter((childData) => {
    return doesDataMatchContainer(container, childData);
  });

  return { ...dataGroup, children: matchingChildren };
};

const doesDataMatchContainer = (
  container: FormComponentContainer,
  childData: CoraData,
) => {
  return doesDataMatchAnyComponent(container.components, childData);
};

const doesDataMatchAnyComponent = (
  components: FormComponent[] | undefined,
  childData: CoraData,
) => {
  return components?.some((childComponent) => {
    if (isComponentContainer(childComponent)) {
      return childComponent.components?.some((nestedChild) =>
        doesDataMatchComponent(nestedChild, childData),
      );
    }

    return doesDataMatchComponent(childComponent, childData);
  });
};
