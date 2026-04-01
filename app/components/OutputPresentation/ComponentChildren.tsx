import type { PresentationStyle } from '@/cora/bffTypes.server';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { Fragment } from 'react/jsx-runtime';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponent } from '../FormGenerator/types';
import { OutputComponent } from './OutputComponent';
import { OutputDevInfo } from './OutputDevInfo';
import { findChildData } from './findChildData';

interface ComponentChildrenProps {
  components?: FormComponent[];
  data: DataGroup;
  parentPresentationStyle?: PresentationStyle | undefined;
}

export const ComponentChildren = ({
  components,
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

      const childData = findChildData(childComponent, data);
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
