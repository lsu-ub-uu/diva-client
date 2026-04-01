import type { DataGroup } from '@/cora/cora-data/types.server';
import type {
  FormComponent,
  FormComponentWithData,
} from '../FormGenerator/types';
import {
  isComponentOptional,
  isComponentRepeating,
  isComponentWithData,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { OutputComponent } from '../OutputPresentation/OutputComponent';
import { findChildData } from '../OutputPresentation/findChildData';
import { InputFieldArray } from './InputFieldArray';
import { InputComponent } from './InputComponent';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface InputComponentChildrenProps {
  components?: FormComponent[];
  path: string;
  data?: DataGroup;
  parentPresentationStyle?: PresentationStyle;
}

export const InputComponentChildren = ({
  components,
  path,
  data,
  parentPresentationStyle,
}: InputComponentChildrenProps) => {
  const nameIndices = new Map<string, number>();

  return components?.map((childComponent, index) => {
    const componentKey =
      childComponent.presentationId ?? `${childComponent.name}-${index}`;

    if (!isComponentWithData(childComponent)) {
      return (
        <OutputComponent
          component={childComponent}
          key={componentKey}
          parentPresentationStyle={parentPresentationStyle}
        />
      );
    }

    if (childComponent.mode === 'output') {
      if (!data) {
        return null;
      }
      const childData = findChildData(childComponent, data);
      return childData.map((data, childIndex) => (
        <OutputComponent
          key={`${index}-${childIndex}`}
          component={childComponent}
          data={data}
          parentPresentationStyle={parentPresentationStyle}
        />
      ));
    }

    const isRepeating =
      isComponentRepeating(childComponent) ||
      isComponentOptional(childComponent);

    if (isRepeating) {
      const allChildData = data ? findChildData(childComponent, data) : [];
      return (
        <InputFieldArray
          key={componentKey}
          path={path}
          component={childComponent as FormComponentWithData}
          initialData={allChildData}
        />
      );
    }

    const nameIndex = nameIndices.get(childComponent.name) || 0;
    nameIndices.set(childComponent.name, nameIndex + 1);

    const childData = data
      ? findChildData(childComponent, data)[nameIndex]
      : undefined;

    const childPath =
      childComponent.type === 'container'
        ? path
        : `${path}.${childComponent.name}[${nameIndex}]`;

    return (
      <InputComponent
        key={componentKey}
        component={childComponent}
        path={childPath}
        data={childData}
        parentPresentationStyle={parentPresentationStyle}
      />
    );
  });
};
