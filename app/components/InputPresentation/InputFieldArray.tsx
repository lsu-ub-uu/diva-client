import { Button } from '@/components/Button/Button';
import type { CoraData } from '@/cora/cora-data/types.server';
import { CirclePlusIcon } from 'lucide-react';
import { use, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButtonGroup } from '../FormGenerator/components/ActionButtonGroup';
import { isComponentSingularAndOptional } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentWithData } from '../FormGenerator/types';
import { InputComponent } from './InputComponent';
import { NameIndexContext } from './NameIndexContext';

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
  const nameIndices = use(NameIndexContext);
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

  const nameIndexKey = `${path}.${component.name}`;
  const [baseNameIndex] = useState(() => nameIndices.get(nameIndexKey) ?? 0);
  nameIndices.set(nameIndexKey, baseNameIndex + fields.length);

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
        const fieldPath = `${path}.${component.name}[${baseNameIndex + index}]`;
        return (
          <div
            key={field.repeatId}
            className='form-component-item'
            data-colspan={component.gridColSpan ?? 12}
          >
            {repeatMax > 1 && (
              <input
                type='hidden'
                name={`${fieldPath}._repeatId`}
                value={field.repeatId}
              />
            )}
            <InputComponent
              component={component}
              path={fieldPath}
              data={field.data}
              actionButtonGroup={
                <ActionButtonGroup
                  entityName={t(component.label)}
                  hideMoveButtons={isComponentSingularAndOptional(component)}
                  hideDeleteButton={
                    isComponentSingularAndOptional(component) &&
                    !component.showLabel
                  }
                  moveUpButtonDisabled={index === 0}
                  moveUpButtonAction={() => handleMove(index, index - 1)}
                  moveDownButtonDisabled={index === fields.length - 1}
                  moveDownButtonAction={() => handleMove(index, index + 1)}
                  deleteButtonDisabled={fields.length <= repeatMin}
                  deleteButtonAction={() => handleRemove(index)}
                />
              }
            />
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
