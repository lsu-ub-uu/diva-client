import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormComponentGroup } from '../FormGenerator/types';
import { InputComponentChildren } from './InputComponentChildren';
import type { PresentationStyle } from '@/cora/bffTypes.server';

interface InputContainerProps {
  path: string;
  component: FormComponentGroup;
  data?: DataGroup;
  parentPresentationStyle?: PresentationStyle;
}

export const InputContainer = ({
  path,
  component,
  data,
  parentPresentationStyle,
}: InputContainerProps) => {
  return (
    <div
      className='form-component-item form-component-container'
      data-colspan={component.gridColSpan ?? 12}
      data-layout={component.presentationStyle === 'inline' ? 'inline' : 'grid'}
      data-text-style={component.textStyle}
    >
      <InputComponentChildren
        components={component.components}
        path={path}
        data={data}
        parentPresentationStyle={
          component.presentationStyle ?? parentPresentationStyle
        }
      />
    </div>
  );
};
