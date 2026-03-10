import type { CoraData } from '@/cora/cora-data/types.server';
import type { FormComponentWithData } from '../FormGenerator/types';
import { useTranslation } from 'react-i18next';

interface AttributesProps {
  component: FormComponentWithData;
  data: CoraData;
}

export const Attributes = ({ component, data }: AttributesProps) => {
  const { t } = useTranslation();
  if (!component.attributes) {
    return null;
  }

  const attributesToShow =
    component.attributesToShow === 'none'
      ? []
      : component.attributesToShow === 'selectable'
        ? component.attributes.filter(
            (attribute) => attribute.finalValue === undefined,
          )
        : component.attributes;

  return attributesToShow.map((attribute) => (
    <div
      key={attribute.name}
      style={{ fontStyle: 'italic', fontSize: '0.9em' }}
    >
      {t(attribute.label)}:{' '}
      {t(
        attribute.options?.find(
          (opt) => opt.value === data.attributes?.[attribute.name],
        )?.label || '',
      )}
    </div>
  ));
};
