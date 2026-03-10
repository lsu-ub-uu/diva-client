import type { DataGroup } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type { FormComponentGroup } from '../FormGenerator/types';
import { Attributes } from './Attributes';
import { OutputComponent } from './OutputComponent';
import { findChildData } from './findChildData';

interface OutputGroupProps {
  component: FormComponentGroup;
  data: DataGroup;
}

export const OutputGroup = ({ component, data }: OutputGroupProps) => {
  const { t } = useTranslation();

  return (
    <div
      className='form-component-container'
      data-text-style={component.textStyle}
    >
      <div style={{ marginBottom: '.5rem' }}>
        <h3 style={{ marginTop: '1rem' }}>
          {component.showLabel && t(component.label)}
        </h3>
        <Attributes component={component} data={data} />
      </div>
      {component.components?.map((childComponent, index) => {
        const childData = findChildData(childComponent, data);
        if (!childData) {
          return null;
        }

        return childData.map((data, childIndex) => (
          <OutputComponent
            key={`${index}-${childIndex}`}
            component={childComponent}
            data={data}
          />
        ));
      })}
    </div>
  );
};
