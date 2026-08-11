import type { PresentationStyle } from '@/cora/bffTypes.server';
import type { DataGroup } from '@/cora/cora-data/types.server';
import type {
  FormComponent,
  FormComponentContainer,
} from '../FormGenerator/types';
import { ComponentChildren } from './ComponentChildren';
import {
  isComponentContainer,
  isComponentGroup,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';

interface OutputContainerProps {
  component: FormComponentContainer;
  data: DataGroup;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputContainer = ({
  component,
  data,
  parentPresentationStyle,
}: OutputContainerProps) => {
  return (
    <div
      className='form-component-container form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      data-layout={component.presentationStyle === 'inline' ? 'inline' : 'grid'}
      data-text-style={component.textStyle}
    >
      <ComponentChildren
        components={component.components}
        alternativeComponents={getAlternativeChildComponents(component)}
        data={data}
        parentPresentationStyle={
          component.presentationStyle ?? parentPresentationStyle
        }
      />
    </div>
  );
};

export const getAlternativeChildComponents = (component: FormComponent) => {
  if (!component.alternativePresentation) {
    return undefined;
  }

  if (
    isComponentContainer(component.alternativePresentation) ||
    isComponentGroup(component.alternativePresentation)
  ) {
    return component.alternativePresentation.components;
  }
};
