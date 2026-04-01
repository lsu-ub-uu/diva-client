import type { PresentationStyle } from '@/cora/bffTypes.server';
import type { DataGroup } from '@/cora/cora-data/types.server';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card/Card';
import { CardContent } from '../Card/CardContent';
import { CardHeader } from '../Card/CardHeader';
import { CardTitle } from '../Card/CardTitle';
import { FieldInfo } from '../FieldInfo/FieldInfo';
import type { FormComponentGroup } from '../FormGenerator/types';
import { InputAttributes } from './InputAttributes';
import { InputComponentChildren } from './InputComponentChildren';

interface InputGroupProps {
  path: string;
  component: FormComponentGroup;
  data?: DataGroup;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputGroup = ({
  path,
  component,
  data,
  actionButtonGroup,
  parentPresentationStyle,
}: InputGroupProps) => {
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
          actionButtonGroup={actionButtonGroup}
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
            <InputComponentChildren
              components={component.components}
              path={path}
              data={data}
              parentPresentationStyle={
                component.presentationStyle ?? parentPresentationStyle
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
