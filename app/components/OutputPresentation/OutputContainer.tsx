import type { DataGroup } from '@/cora/cora-data/types.server';
import { GuiElementLink } from '../FormGenerator/components/GuiElementLink';
import { Text } from '../FormGenerator/components/Text';
import type {
  FormComponentContainer,
  FormComponentGuiElement,
  FormComponentText,
  PresentationStyle,
} from '../FormGenerator/types';
import { findChildData } from './findChildData';
import { OutputComponent } from './OutputComponent';

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
      data-text-style={component.textStyle}
    >
      {component.components?.map((childComponent, index) => {
        if (childComponent.type === 'guiElementLink') {
          return (
            <GuiElementLink
              key={index}
              component={childComponent as FormComponentGuiElement}
            />
          );
        }

        if (childComponent.type === 'text') {
          return (
            <Text key={index} component={childComponent as FormComponentText} />
          );
        }

        const childData = findChildData(childComponent, data);
        if (!childData) {
          return null;
        }

        return childData.map((data, childIndex) => (
          <OutputComponent
            key={`${index}-${childIndex}`}
            component={childComponent}
            data={data}
            parentPresentationStyle={
              component.presentationStyle ?? parentPresentationStyle
            }
          />
        ));
      })}
    </div>
  );
};
