import type { DataGroup } from '@/cora/cora-data/types.server';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponent } from '../FormGenerator/types';
import { OutputComponent } from './OutputComponent';
import { findChildData } from './findChildData';
import type { PresentationStyle } from '@/cora/bffTypes.server';

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
          <div
            className='form-component-item'
            data-colspan={childComponent.gridColSpan ?? 12}
            key={`${index}`}
            data-type={childComponent.type}
          >
            <OutputComponent
              key={index}
              component={childComponent}
              parentPresentationStyle={parentPresentationStyle}
            />
          </div>
        );
      }

      const childData =
        childComponent.type === 'container'
          ? [data]
          : findChildData(childComponent, data);

      if (!childData) {
        return `Missing data for component ${childComponent.name}`;
      }

      return childData.map((data, childIndex) => (
        <OutputComponent
          key={`${index}-${childIndex}`}
          component={childComponent}
          data={data}
          parentPresentationStyle={parentPresentationStyle}
        />
      ));
    });
};
