import type { DataGroup } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type {
  FormComponentContainer,
  FormComponentGroup,
  FormComponentGuiElement,
  FormComponentText,
  PresentationStyle,
} from '../FormGenerator/types';
import { Attributes } from './Attributes';
import { OutputComponent } from './OutputComponent';
import { findChildData } from './findChildData';
import { OutputContainer } from './OutputContainer';
import { GuiElementLink } from '../FormGenerator/components/GuiElementLink';
import { Text } from '../FormGenerator/components/Text';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';

interface OutputGroupProps {
  component: FormComponentGroup;
  data: DataGroup;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputGroup = ({
  component,
  data,
  parentPresentationStyle,
}: OutputGroupProps) => {
  const { t } = useTranslation();

  return (
    <div
      className='form-component-container'
      data-text-style={component.textStyle}
    >
      <div>
        {component.showLabel && (
          <h3 style={{ marginTop: '1rem' }}>{t(component.label)}</h3>
        )}
        <Attributes component={component} data={data} />
      </div>
      {component.components?.map((childComponent, index) => {
        if (!isComponentWithData(childComponent)) {
          return (
            <OutputComponent
              key={index}
              component={childComponent}
              parentPresentationStyle={
                component.presentationStyle ?? parentPresentationStyle
              }
            />
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
