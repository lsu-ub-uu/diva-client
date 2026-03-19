import type { DataGroup } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import { headlineLevelToTypographyVariant } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponent, FormComponentGroup } from '../FormGenerator/types';
import { Typography } from '../Typography/Typography';
import { InputAttributes } from './InputAttributes';
import { InputComponent } from './InputComponent';

interface InputGroupProps {
  path: string;
  component: FormComponentGroup;
  data?: DataGroup;
}

export const InputGroup = ({ path, component }: InputGroupProps) => {
  const { t } = useTranslation();
  return (
    <div
      className='form-component-group form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      data-layout={component.presentationStyle === 'inline' ? 'inline' : 'grid'}
      data-text-style={component.textStyle}
    >
      {component.showLabel && (
        <Typography
          as={component.headlineLevel}
          variant={headlineLevelToTypographyVariant(component.headlineLevel)}
        >
          {t(component.label)}
        </Typography>
      )}
      <InputAttributes path={path} component={component} />

      <div
        className='form-component-container'
        data-layout={
          component.presentationStyle === 'inline' ? 'inline' : 'grid'
        }
        data-text-style={component.textStyle}
      >
        {createChildren(component.components, path)}
      </div>
    </div>
  );
};

const createChildren = (components: FormComponent[], path: string) => {
  const nameIndices = new Map<string, number>();

  return components?.map((childComponent) => {
    const nameIndex = nameIndices.get(childComponent.name) || 0;
    nameIndices.set(childComponent.name, nameIndex + 1);

    const childPath = `${path}.${childComponent.name}[${nameIndex}]`;
    return (
      <InputComponent
        key={childPath}
        component={childComponent}
        path={childPath}
      />
    );
  });
};
