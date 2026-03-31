import type { DataGroup } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card/Card';
import { CardContent } from '../Card/CardContent';
import { CardHeader } from '../Card/CardHeader';
import { CardTitle } from '../Card/CardTitle';
import { FieldInfo } from '../FieldInfo/FieldInfo';
import { isComponentWithData } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponent,
  FormComponentGroup,
  FormComponentWithData,
} from '../FormGenerator/types';
import { findChildData } from '../OutputPresentation/findChildData';
import { OutputComponent } from '../OutputPresentation/OutputComponent';
import { InputAttributes } from './InputAttributes';
import { InputComponent } from './InputComponent';
import { InputFieldArray } from './InputFieldArray';

interface InputGroupProps {
  path: string;
  component: FormComponentGroup;
  data?: DataGroup;
}

export const InputGroup = ({ path, component, data }: InputGroupProps) => {
  const { t } = useTranslation();
  const groupLevel = path.split('.').length;
  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      data-layout={component.presentationStyle === 'inline' ? 'inline' : 'grid'}
      data-text-style={component.textStyle}
    >
      <Card boxed={groupLevel !== 1 && component.showLabel}>
        <CardHeader
          attributes={
            <InputAttributes path={path} component={component} data={data} />
          }
        >
          {component.showLabel && (
            <CardTitle
              level={component.headlineLevel}
              info={
                component.tooltip &&
                component.showLabel && <FieldInfo {...component.tooltip} />
              }
            >
              {t(component.label)}
            </CardTitle>
          )}
        </CardHeader>

        <CardContent>
          <div
            className='form-component-container'
            data-layout={
              component.presentationStyle === 'inline' ? 'inline' : 'grid'
            }
            data-text-style={component.textStyle}
          >
            {createChildren(component.components, path, data)}
          </div>
        </CardContent>
      </Card>
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
      if (!data) {
        return null;
      }
      const childData = findChildData(childComponent, data);
      return childData.map((data, childIndex) => (
        <OutputComponent
          key={`${index}-${childIndex}`}
          component={childComponent}
          data={data}
        />
      ));
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
      />
    );
  });
};
