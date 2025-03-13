/*
 * Copyright 2024 Uppsala University Library
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
 */

import type { FormComponentContainer } from '@/components/FormGenerator/types';
import React from 'react';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { checkIfPresentationStyleIsInline } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { ComponentList } from '@/components/FormGenerator/ComponentList';

import styles from './FormComponent.module.css';

interface SurroundingContainerProps {
  reactKey: string;
  component: FormComponentContainer;
  currentComponentNamePath: string;
  parentPresentationStyle: string | undefined;
}

export const SurroundingContainer = ({
  reactKey,
  component,
  currentComponentNamePath,
  parentPresentationStyle,
}: SurroundingContainerProps) => {
  const inline = checkIfPresentationStyleIsInline(component);

  return (
    <React.Fragment key={reactKey}>
      <div
        id={`anchor_${addAttributesToName(component, component.name)}`}
        key={reactKey}
        className={`${styles['component']} ${styles['container']} anchorLink`}
        data-colspan={component.gridColSpan ?? 12}
        data-layout={inline ? 'inline' : 'grid'}
      >
        {component.components && (
          <ComponentList
            components={component.components}
            parentPresentationStyle={
              component.presentationStyle ?? parentPresentationStyle
            }
            path={currentComponentNamePath}
          />
        )}
      </div>
    </React.Fragment>
  );
};
