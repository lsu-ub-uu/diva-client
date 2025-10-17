import { Button } from '@/components/Button/Button';
import { AddCircleIcon, CloseIcon } from '@/icons';
import { use, type ReactNode } from 'react';
import { Controller, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createDefaultValuesFromComponent } from '../defaultValues/defaultValues';
import { FormGeneratorContext } from '../FormGeneratorContext';
import type { FormComponentWithData } from '../types';

interface OptionalComponentProps {
  anchorId?: string;
  control?: Control<any>;
  name: string;
  component: FormComponentWithData;
  renderCallback: (actionButtonGroup: ReactNode) => ReactNode;
}

export const OptionalComponent = ({
  anchorId,
  control,
  name,
  component,
  renderCallback,
}: OptionalComponentProps) => {
  const { t } = useTranslation();
  const { enhancedFields } = use(FormGeneratorContext);

  const notRemovableEnhancement =
    enhancedFields?.[name]?.type === 'notRemovable';

  const showDeleteButton =
    component.mode === 'input' && !notRemovableEnhancement;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        if (field.value) {
          return (
            <>
              {renderCallback(
                showDeleteButton && (
                  <Button
                    size='small'
                    variant='icon'
                    aria-label={t('divaClient_deleteFieldText', {
                      fieldName: t(component.label),
                    })}
                    tooltipPosition='left'
                    onClick={() => field.onChange(null)}
                    data-action-button='delete'
                  >
                    <CloseIcon />
                  </Button>
                ),
              )}
            </>
          );
        }

        if (component.mode === 'output') {
          return <></>;
        }

        return (
          <div
            className='form-component-item'
            data-colspan={component.gridColSpan ?? 12}
          >
            <Button
              id={field.value ? undefined : anchorId}
              variant='tertiary'
              onClick={() =>
                field.onChange(
                  createDefaultValuesFromComponent(component, true),
                )
              }
              aria-label={
                component.addText
                  ? t(component.addText)
                  : t('divaClient_addFieldText', {
                      fieldName: t(component.label),
                    })
              }
              tooltipPosition='top'
            >
              <AddCircleIcon /> {t(component.addText ?? component.label)}
            </Button>
          </div>
        );
      }}
    />
  );
};
