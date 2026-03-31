import { useTranslation } from 'react-i18next';
import type { FormComponentWithData } from '../FormGenerator/types';
import { Fieldset } from '../Input/Fieldset';
import { Select } from '../Input/Select';
import type { CoraData } from '@/cora/cora-data/types.server';

interface AttributesProps {
  path: string;
  component: FormComponentWithData;
  data: CoraData | undefined;
}

export const InputAttributes = ({ path, component, data }: AttributesProps) => {
  const { t } = useTranslation();
  if (!component.attributes) {
    return null;
  }

  return component.attributes.map((attribute) => {
    if (attribute.finalValue !== undefined) {
      return (
        <>
          {component.attributesToShow === 'all' && (
            <div key={attribute.name}>
              {t(attribute.label)}:{' '}
              {t(
                attribute.options?.find(
                  (opt) => opt.value === component.finalValue,
                )?.label || '',
              )}
            </div>
          )}
          <input
            type='hidden'
            name={`${path}._${attribute.name}`}
            value={attribute.finalValue}
            key={attribute.name}
          />
        </>
      );
    }

    return (
      <Fieldset label={t(attribute.label)} key={attribute.name} size='small'>
        <Select
          name={`${path}._${attribute.name}`}
          placeholder={attribute.placeholder}
          defaultValue={data?.attributes && data.attributes[attribute.name]}
        >
          {attribute.options.map((option) => (
            <option key={option.value} value={option.value}>
              {t(option.label)}
            </option>
          ))}
        </Select>
      </Fieldset>
    );
  });
};
