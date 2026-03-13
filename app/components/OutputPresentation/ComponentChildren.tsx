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
  return components?.map((childComponent, index) => {
    if (!isComponentWithData(childComponent)) {
      return (
        <div
          className='form-component-item'
          data-colspan={childComponent.gridColSpan ?? 12}
          key={`${index}`}
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
      return null;
    }

    return childData.map((data, childIndex) => (
      <div
        className='form-component-item'
        data-colspan={childComponent.gridColSpan ?? 12}
        key={`${index}-${childIndex}`}
      >
        <OutputComponent
          key={`${index}-${childIndex}`}
          component={childComponent}
          data={data}
          parentPresentationStyle={parentPresentationStyle}
        />
      </div>
    ));
  });
};
