/*
 * Copyright 2025 Uppsala University Library
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

import type { FormComponent } from '@/components/FormGenerator/types';
import { useLayoutEffect, useRef, useState } from 'react';
import { Component } from '@/components/FormGenerator/Component';
import { Button } from '@/components/Button/Button';
import { CollapseContentIcon, ExpandContentIcon } from '@/icons';
import componentStyles from '@/components/FormGenerator/components/FormComponent.module.css';
import styles from './ComponentPresentationSwitcher.module.css';
import clsx from 'clsx';

interface ComponentPresentationSwitcherProps {
  component: FormComponent;
  idx: number;
  path: string;
  parentPresentationStyle?: string;
}

export const ComponentPresentationSwitcher = (
  props: ComponentPresentationSwitcherProps,
) => {
  const { component } = props;
  const [presentation, setPresentation] = useState<'default' | 'alternative'>(
    'default',
  );

  const defaultPresentation = {
    ...component,
    alternativePresentation: undefined,
  };

  const alternativePresentation = component.alternativePresentation;

  if (!alternativePresentation) {
    return <Component {...props} />;
  }

  return (
    <div
      className={clsx(
        componentStyles['component'],
        styles['component-presentation-switcher'],
      )}
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
    >
      <div
        className={clsx(styles['presentation'], componentStyles['container'])}
      >
        <Component
          {...props}
          component={
            presentation === 'alternative'
              ? alternativePresentation
              : defaultPresentation
          }
        />
      </div>
      <Button
        className={styles['switch-button']}
        variant='icon'
        onClick={() => {
          setPresentation(
            presentation === 'default' ? 'alternative' : 'default',
          );
        }}
      >
        {presentation === 'default' ? (
          <ExpandContentIcon />
        ) : (
          <CollapseContentIcon />
        )}
      </Button>
    </div>
  );
};
