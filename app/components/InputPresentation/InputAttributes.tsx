import { useTranslation } from 'react-i18next';
import type { FormComponentWithData } from '../FormGenerator/types';

interface AttributesProps {
  path: string;
  component: FormComponentWithData;
}

export const InputAttributes = ({ path, component }: AttributesProps) => {
  const { t } = useTranslation();
  if (!component.attributes) {
    return null;
  }

  return component.attributes
    .filter((attribute) => attribute.finalValue !== undefined)
    .map((attribute) => (
      <input
        type='hidden'
        name={`${path}._${attribute.name}`}
        value={attribute.finalValue}
        key={attribute.name}
      />
    ));
};
