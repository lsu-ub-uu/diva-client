import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormComponentContainer } from '../FormGenerator/types';
import { ComponentChildren } from './ComponentChildren';
import type { PresentationStyle } from '@/cora/bffTypes.server';

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
      className='form-component-container'
      data-layout={component.presentationStyle === 'inline' ? 'inline' : 'grid'}
      data-text-style={component.textStyle}
    >
      <ComponentChildren
        components={component.components}
        data={data}
        parentPresentationStyle={
          component.presentationStyle ?? parentPresentationStyle
        }
      />
    </div>
  );
};
