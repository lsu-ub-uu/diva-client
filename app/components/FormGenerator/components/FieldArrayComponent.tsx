/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Button } from '@/components/Button/Button';
import { isComponentSingularAndOptional } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponentWithData } from '@/components/FormGenerator/types';
import { AddCircleIcon } from '@/icons';
import { forwardRef, Fragment, use, useState, type ReactNode } from 'react';
import type { Control } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createDefaultValuesFromComponent } from '../defaultValues/defaultValues';
import { FormGeneratorContext } from '../FormGeneratorContext';
import { ActionButtonGroup } from './ActionButtonGroup';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { posix } from 'path';
interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponentWithData;
  renderCallback: (
    path: string,
    actionButtonGroup: ReactNode,
    index: number,
    isAppended: boolean,
  ) => ReactNode;
  anchorId?: string;
}

type RepeatingField = {
  repeatId: string;
  id: string;
};

export const FieldArrayComponent = ({
  control,
  name,
  component,
  renderCallback,
  anchorId,
}: FieldArrayComponentProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [overId, setOverId] = useState(null); // Used to conditionally render the dropLine
  const [dropLinePosition, setDropLinePosition] = useState(''); // To set the preview line where the dragged item will be dropped (top/bottom)
  const { t } = useTranslation();
  const { enhancedFields } = use(FormGeneratorContext);
  const notRemovableEnhancement =
    enhancedFields?.[name]?.type === 'notRemovable';
  const [appended, setAppended] = useState<string | null>(null);

  const { fields, append, move, remove } = useFieldArray({
    control: control,
    name: name,
  });

  console.log({ fields });

  const handleAppend = async () => {
    const newComponent = createDefaultValuesFromComponent(component, true);
    setAppended((newComponent as RepeatingField).repeatId ?? null);
    append(newComponent);
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    console.log('drag start', event.active.id);
    setActiveId(active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log('drag end', event.active.id, event.over?.id);
    setOverId(null);
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex(
        (field) => field.repeatId === active.id,
      );
      const newIndex = fields.findIndex((field) => field.repeatId === over.id);

      move(oldIndex, newIndex);
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (over) {
      setOverId(over.id);

      const activeIndex = fields.findIndex(
        (field) => field.repeatId === active.id,
      );
      const overIndex = fields.findIndex((field) => field.repeatId === over.id);

      if (activeIndex > overIndex) setDropLinePosition('top');
      else setDropLinePosition('bottom');
    }
  }

  const activeIndex = fields.findIndex((field) => field.repeatId === activeId);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => {
            const actionButtonGroup = component.mode === 'input' &&
              !notRemovableEnhancement && (
                <ActionButtonGroup
                  entityName={`${t(component.label ?? '')}`}
                  hideMoveButtons={isComponentSingularAndOptional(component)}
                  hideDeleteButton={
                    isComponentSingularAndOptional(component) &&
                    !component.showLabel
                  }
                  moveUpButtonDisabled={index === 0}
                  moveUpButtonAction={() => handleMove(index, index - 1)}
                  moveDownButtonDisabled={index === fields.length - 1}
                  moveDownButtonAction={() => handleMove(index, index + 1)}
                  deleteButtonDisabled={
                    fields.length <= (component.repeat?.repeatMin ?? 1)
                  }
                  deleteButtonAction={() => handleRemove(index)}
                  entityType={component.type}
                />
              );

            const repeatId = (field as RepeatingField).repeatId;

            return (
              <SortableItem
                key={repeatId}
                id={repeatId}
                previewLine={overId === repeatId ? dropLinePosition : null}
                showDragHandle={component.mode === 'input' && fields.length > 1}
              >
                {renderCallback(
                  `${name}[${index}]` as const,
                  actionButtonGroup,
                  index,
                  appended === repeatId,
                )}
              </SortableItem>
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div
              id={activeId}
              className='form-component-item'
              data-colspan={12}
              style={{
                backgroundColor: 'rgb(255 255 255 /0.5)',
                transform: 'rotate(2deg)',
                maxHeight: '300px',
                overflow: 'hidden',
              }}
            >
              {renderCallback(
                `${name}[${activeIndex}]` as const,
                null,
                activeIndex,
                false,
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {component.mode === 'input' &&
        component.label &&
        fields.length < (component.repeat?.repeatMax ?? 1) && (
          <div
            className='form-component-item'
            data-colspan={component.gridColSpan ?? 12}
          >
            <Button
              id={fields.length === 0 ? anchorId : undefined}
              variant='tertiary'
              disabled={fields.length >= (component.repeat?.repeatMax ?? 1)}
              onClick={handleAppend}
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
        )}
    </>
  );
};

const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      {id}
    </div>
  );
});
const SortableItem = ({
  id,
  children,
  showDragHandle = false,
  previewLine,
}: {
  id: string;
  previewLine?: 'top' | 'bottom' | null;
  children: ReactNode;
  showDragHandle?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    display: 'flex',
    gridTemplateColumns: 'auto 1fr',
    transition,
    gap: 'var(--gap-s)',
    ...(previewLine === 'top'
      ? {
          borderTop: '2px dashed var(--color-link-selected)',
          paddingTop: '1rem',
        }
      : {}),
    ...(previewLine === 'bottom'
      ? {
          borderBottom: '2px dashed var(--color-link-selected)',
          paddingBottom: '1rem',
        }
      : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='form-component-item'
      data-colspan={12}
    >
      <div style={{ flexGrow: 1 }}>{children}</div>
      {showDragHandle && (
        <button
          className='drag-handle'
          style={{
            width: '1rem',
            borderRadius: 'var(--border-radius-s)',
            border: '1px solid var(--color-thin-border)',
            background: 'var(--color-background)',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...listeners}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1rem'
            height='1rem'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <circle cx='9' cy='12' r='1' />
            <circle cx='9' cy='5' r='1' />
            <circle cx='9' cy='19' r='1' />
            <circle cx='15' cy='12' r='1' />
            <circle cx='15' cy='5' r='1' />
            <circle cx='15' cy='19' r='1' />
          </svg>
        </button>
      )}
    </div>
  );
};
