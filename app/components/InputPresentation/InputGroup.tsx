import type { DataGroup } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import {
  headlineLevelToTypographyVariant,
  isComponentWithData,
} from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentGroup,
  FormComponentWithData,
} from '../FormGenerator/types';
import { findChildData } from '../OutputPresentation/findChildData';
import { Typography } from '../Typography/Typography';
import { InputAttributes } from './InputAttributes';
import { InputComponent } from './InputComponent';
import { InputFieldArray } from './InputFieldArray';
import { OutputComponent } from '../OutputPresentation/OutputComponent';

interface InputGroupProps {
  path: string;
  component: FormComponentGroup;
  data?: DataGroup;
}

export const InputGroup = ({ path, component, data }: InputGroupProps) => {
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
        {createChildren(component.components, path, data)}
      </div>
    </div>
  );
};

const createChildren = (
  components: FormComponent[] | undefined,
  path: string,
  data?: DataGroup,
) => {
  const nameIndices = new Map<string, number>();

  return components?.map((childComponent, index) => {
    const componentKey =
      childComponent.presentationId ?? `${childComponent.name}-${index}`;

    if (!isComponentWithData(childComponent)) {
      return <OutputComponent component={childComponent} key={componentKey} />;
    }

    if (childComponent.mode === 'output') {
      const nameIndex = nameIndices.get(childComponent.name) || 0;
      nameIndices.set(childComponent.name, nameIndex + 1);
      const childData = data
        ? findChildData(childComponent, data)[nameIndex]
        : undefined;
      return (
        <OutputComponent
          component={childComponent}
          key={componentKey}
          data={childData}
        />
      );
    }

    const isRepeating =
      childComponent.repeat && childComponent.repeat.repeatMax > 1;

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

    const childPath = `${path}.${childComponent.name}[${nameIndex}]`;

    return (
      <InputComponent
        key={componentKey}
        component={childComponent}
        path={childPath}
        data={childData}
      />
    );
  });
};
