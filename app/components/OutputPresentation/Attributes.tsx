import type { CoraData } from '@/cora/cora-data/types.server';
import type { FormComponentWithData } from '../FormGenerator/types';
import { useTranslation } from 'react-i18next';
import styles from './OutputPresentation.module.css';
interface AttributesProps {
  component: FormComponentWithData;
  data: CoraData;
}

export const Attributes = ({ component, data }: AttributesProps) => {
  const { t } = useTranslation();
  if (!component.attributes) {
    return null;
  }

  if (component.attributesToShow === 'none') {
    return null;
  }

  const attributesToShow =
    component.attributesToShow === 'selectable'
      ? component.attributes.filter(
          (attribute) => attribute.finalValue === undefined,
        )
      : component.attributes;

  if (attributesToShow.length === 0) {
    return null;
  }
  return (
    <div className={styles['attributes']}>
      {attributesToShow.map((attribute) => (
        <div key={attribute.name}>
          {t(attribute.label)}:{' '}
          {t(
            attribute.options?.find(
              (opt) => opt.value === data.attributes?.[attribute.name],
            )?.label || '',
          )}
        </div>
      ))}
    </div>
  );
};
