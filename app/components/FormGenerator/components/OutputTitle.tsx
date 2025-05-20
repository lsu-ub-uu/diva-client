import { useRemixFormContext } from 'remix-hook-form';
import { addAttributesToName } from '../defaultValues/defaultValues';
import type { FormComponentGroup, FormComponentTextVar } from '../types';
import { OutputField } from './OutputField';
import { useTranslation } from 'react-i18next';
import { DevInfo } from './DevInfo';

interface OutputTitleProps {
  component: FormComponentGroup;
  path: string;
  parentPresentationStyle?: string;
}

export const OutputTitle = ({
  component,
  path,
  parentPresentationStyle,
}: OutputTitleProps) => {
  const { t } = useTranslation();
  const { getValues } = useRemixFormContext();

  const mainTitleValue = getValues(`${path}.title.value`);
  const subTitleValue = getValues(`${path}.subTitle[0].value`);

  const mergedValue = `${mainTitleValue}${subTitleValue ? `: ${subTitleValue}` : ''}`;

  const mainTitleComponent = component.components?.find(
    (comp) => comp.name === 'title',
  ) as FormComponentTextVar;

  if (!mainTitleComponent) {
    return null;
  }
  const label = component.showLabel
    ? `${t(component.label)} (Svenska)`
    : undefined;

  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo component={component} path={path} label='OutputTitle' />
      <OutputField
        className='form-component-item'
        data-colspan={component.gridColSpan ?? 12}
        label={label}
        value={mergedValue}
        textStyle={mainTitleComponent.textStyle}
        info={component.tooltip}
        variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
        path={path}
      />
    </div>
  );
};
