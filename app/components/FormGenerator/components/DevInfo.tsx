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

import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import type { FormComponent } from '@/components/FormGenerator/types';
import { DataObjectIcon } from '@/icons';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { use, useState } from 'react';
import { useRemixFormContext } from 'remix-hook-form';
import styles from './DevInfo.module.css';

interface DevInfoProps {
  label?: string;
  component: FormComponent;
  path?: string;
}

interface ToggleDevInfoButtonProps {
  onClick: () => void;
}

export const DevInfo = ({ label, component, path }: DevInfoProps) => {
  const { showDevInfo } = use(FormGeneratorContext);
  const [expanded, setExpanded] = useState(false);
  const { getValues } = useRemixFormContext();
  const data = path && getValues(path);
  if (!showDevInfo) {
    return null;
  }
  return (
    <div className={styles['dev-info']}>
      <button type='button' onClick={() => setExpanded(!expanded)}>
        {label ? `${label} | ` : ''}
        {component.type} | {addAttributesToName(component, component.name)}
      </button>

      {expanded && (
        <div className={styles['expand-info']}>
          <pre className={styles['path']}>{path}</pre>
          <pre>
            <strong>FORM DEF</strong>
            {JSON.stringify(component, null, 2)}
          </pre>
          {data && (
            <pre>
              <strong>DATA ({path})</strong>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export const DevInfoButton = ({ onClick }: ToggleDevInfoButtonProps) => {
  const devMode = useIsDevMode();

  if (!devMode) {
    return null;
  }

  return (
    <button
      type='button'
      className={styles['dev-info-button']}
      onClick={onClick}
    >
      <DataObjectIcon />
    </button>
  );
};
