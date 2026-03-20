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
  initialData,
}: InputFieldArrayProps) => {
  const { t } = useTranslation();
  const repeatMin = component.repeat?.repeatMin ?? 1;
  const repeatMax = component.repeat?.repeatMax ?? 1;

  const initialFields = initialData.map((data, index) => ({
    key: crypto.randomUUID(),
    data,
    repeatId: data.repeatId ?? String(index),
  }));

  const emptyFieldCount = Math.max(0, repeatMin - initialFields.length);
  const emptyFields = Array.from({ length: emptyFieldCount }, (_, i) => ({
    key: crypto.randomUUID(),
    data: undefined,
    repeatId: String(initialFields.length + i),
  }));

  const [fields, setFields] = useState([...initialFields, ...emptyFields]);

  const handleAppend = () => {
    setFields((prev) => [
      ...prev,
      {
        key: crypto.randomUUID(),
        data: undefined,
        repeatId: String(Date.now()),
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
            key={field.key}
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
                style={{ display: 'flex', gap: '0.25rem' }}
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
