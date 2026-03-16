import type { PresentationStyle } from '@/cora/bffTypes.server';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import { headlineLevelToTypographyVariant } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentGroup } from '../FormGenerator/types';
import { Typography } from '../Typography/Typography';
import { Attributes } from './Attributes';
import { ComponentChildren } from './ComponentChildren';

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
    <div data-text-style={component.textStyle}>
      <div>
        {component.showLabel && (
          <Typography
            as={component.headlineLevel}
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
            style={{ marginTop: '1rem' }}
          >
            {t(component.label)}
          </Typography>
        )}
        <Attributes component={component} data={data} />
      </div>
      <div
        className='form-component-container'
        data-layout={parentPresentationStyle === 'inline' ? 'inline' : 'grid'}
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
    </div>
  );
};
