import type { CoraData } from '@/cora/cora-data/types.server';
import { Button } from '@/components/Button/Button';
import { IconButton } from '@/components/IconButton/IconButton';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CirclePlusIcon,
  XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FormComponentWithData } from '../FormGenerator/types';
import { InputComponent } from './InputComponent';

interface InputFieldArrayProps {
  path: string;
  component: FormComponentWithData;
  initialData: CoraData[];
}

export const InputFieldArray = ({
  path,
  component,
  initialData: data,
}: InputFieldArrayProps) => {
  const { t } = useTranslation();
  const repeatMin = component.repeat?.repeatMin ?? 1;
  const repeatMax = component.repeat?.repeatMax ?? 1;
  const minToShow = component.repeat?.minNumberOfRepeatingToShow ?? 1;

  const [fields, setFields] = useState(() => {
    const dataFields = data.map((d) => ({
      data: d,
      repeatId: d.repeatId ?? crypto.randomUUID(),
    }));

    const emptyCount = Math.max(0, minToShow - dataFields.length);
    const emptyFields = Array.from({ length: emptyCount }, () => ({
      data: undefined as CoraData | undefined,
      repeatId: crypto.randomUUID(),
    }));

    return [...dataFields, ...emptyFields];
  });

  const handleAppend = () => {
    setFields((prev) => [
      ...prev,
      {
        data: undefined,
        repeatId: crypto.randomUUID(),
      },
    ]);
  };

  const handleRemove = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMove = (from: number, to: number) => {
    setFields((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return (
    <>
      {fields.map((field, index) => {
        const fieldPath = `${path}.${component.name}[${index}]`;
        return (
          <div
            key={field.repeatId}
            className='form-component-item'
            data-colspan={component.gridColSpan ?? 12}
            style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}
          >
            <input
              type='hidden'
              name={`${fieldPath}._repeatId`}
              value={field.repeatId}
            />
            <div style={{ flex: 1 }}>
              <InputComponent
                component={component}
                path={fieldPath}
                data={field.data}
              />
            </div>
            {fields.length > 1 && (
              <div
                role='group'
                aria-label={t('divaClient_actionsForFieldText')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <IconButton
                  size='small'
                  tooltip={t('divaClient_moveFieldUpText', {
                    fieldName: t(component.label ?? ''),
                  })}
                  disabled={index === 0}
                  onClick={() => handleMove(index, index - 1)}
                >
                  <ArrowUpIcon />
                </IconButton>
                <IconButton
                  size='small'
                  tooltip={t('divaClient_moveFieldDownText', {
                    fieldName: t(component.label ?? ''),
                  })}
                  disabled={index === fields.length - 1}
                  onClick={() => handleMove(index, index + 1)}
                >
                  <ArrowDownIcon />
                </IconButton>
                {fields.length > repeatMin && (
                  <IconButton
                    size='small'
                    tooltip={t('divaClient_deleteFieldText', {
                      fieldName: t(component.label ?? ''),
                    })}
                    onClick={() => handleRemove(index)}
                  >
                    <XIcon />
                  </IconButton>
                )}
              </div>
            )}
          </div>
        );
      })}

      {fields.length < repeatMax && (
        <div
          className='form-component-item'
          data-colspan={component.gridColSpan ?? 12}
        >
          <Button
            variant='tertiary'
            onClick={handleAppend}
            aria-label={
              component.addText
                ? t(component.addText)
                : t('divaClient_addFieldText', {
                    fieldName: t(component.label ?? ''),
                  })
            }
          >
            <CirclePlusIcon /> {t(component.addText ?? component.label ?? '')}
          </Button>
        </div>
      )}
    </>
  );
};
