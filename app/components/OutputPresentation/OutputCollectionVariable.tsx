import type { DataAtomic } from '@/cora/cora-data/types.server';
import { useTranslation } from 'react-i18next';
import type {
  FormComponentCollVar,
  PresentationStyle,
} from '../FormGenerator/types';
import { Attributes } from './Attributes';
import { OutputField } from './OutputField';

interface OutputCollectionVariableProps {
  component: FormComponentCollVar;
  data: DataAtomic;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputCollectionVariable = ({
  component,
  data,
  parentPresentationStyle,
}: OutputCollectionVariableProps) => {
  const { t } = useTranslation();
  if (!data.value) {
    return null;
  }

  const optionText =
    component.options.find((option) => option.value === data.value)?.label ||
    data.value;

  return (
    <OutputField
      label={component.showLabel ? t(component.label) : undefined}
      attributes={<Attributes component={component} data={data} />}
      value={t(optionText)}
      variant={parentPresentationStyle === 'inline' ? 'inline' : 'block'}
    />
  );
};

/* 
 - Bryta ut ui komponenter och ta bort inline styling
 - Skriva intergrationstester på OutputPresentation
 - Skriv enhetstester på komponenterna
 - Komponenter ska ha fullt stöd för headlineLevel, showLabel, attributesToShow, etc...
 - Dubbla presentationer
 - case 'resourceLink': // TODO
 - case 'anyTypeRecordLink': // TODO
 - Avgränsning: Endast outputpanelen?

*/
