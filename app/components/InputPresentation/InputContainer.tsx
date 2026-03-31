import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormComponent, FormComponentGroup } from '../FormGenerator/types';

interface InputContainerProps {
  path: string;
  component: FormComponentGroup;
  data?: DataGroup;
}

export const InputContainer = ({
  path,
  component,
  data,
}: InputContainerProps) => {
  return (
    <div
      className='form-component-container form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      data-layout={component.presentationStyle === 'inline' ? 'inline' : 'grid'}
      data-text-style={component.textStyle}
    >
      {createChildren(component.components, path, data)}
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
