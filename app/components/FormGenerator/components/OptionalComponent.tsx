import { Button } from '@/components/Button/Button';
import { AddCircleIcon, CloseIcon } from '@/icons';
import type { ReactNode } from 'react';
import { Controller, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  addAttributesToName,
  createDefaultValuesFromComponent,
} from '../defaultValues/defaultValues';
import type { FormComponentWithData } from '../types';

interface OptionalComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponentWithData;
  renderCallback: (actionButtonGroup: ReactNode) => ReactNode;
}

export const OptionalComponent = ({
  control,
  name,
  component,
  renderCallback,
}: OptionalComponentProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        if (field.value) {
          return (
            <>
              {renderCallback(
                component.mode === 'input' && (
                  <Button
                    size='small'
                    variant='icon'
                    aria-label={t('divaClient_deleteFieldText', {
                      fieldName: t(component.label),
                    })}
                    tooltipPosition='left'
                    onClick={() => field.onChange(null)}
                  >
                    <CloseIcon />
                  </Button>
                ),
              )}
            </>
          );
        }

        return (
          <div
            className='form-component-item'
            data-colspan={component.gridColSpan ?? 12}
            id={`anchor_${addAttributesToName(component, component.name)}`}
          >
            {component.mode === 'input' && (
              <Button
                variant='tertiary'
                onClick={() =>
                  field.onChange(createDefaultValuesFromComponent(component))
                }
                aria-label={t('divaClient_addFieldText', {
                  fieldName: t(component.label),
                })}
              >
                <AddCircleIcon /> {t(component.label)}
              </Button>
            )}
          </div>
        );
      }}
    />
  );
};
