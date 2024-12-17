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

import type { FormComponent } from '@/components/FormGenerator/types';
import styles from './DevInfo.module.css';
import { useContext, useEffect, useState } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';

interface DevInfoProps {
  label: string;
  component: FormComponent;
}

interface ToggleDevInfoButtonProps {
  onClick: () => void;
}

export const DevInfo = ({ component }: DevInfoProps) => {
  const { showDevInfo } = useContext(FormGeneratorContext);
  const [expanded, setExpanded] = useState(false);
  if (!showDevInfo) {
    return null;
  }
  return (
    <div className={styles.devInfo}>
      <button
        type='button'
        onClick={() => setExpanded(!expanded)}
      >
        {component.type} | {component.name}
      </button>
      {expanded && <pre>{JSON.stringify(component, null, 2)}</pre>}
    </div>
  );
};

export const DevInfoButton = ({ onClick }: ToggleDevInfoButtonProps) => {
  const [dev, setDev] = useState(false);

  useEffect(() => {
    const isDev = window.localStorage.getItem('diva-dev');
    setDev(isDev !== null);
  }, []);

  if (!dev) {
    return null;
  }

  return (
    <button
      type='button'
      className={styles.devInfoButton}
      onClick={onClick}
    >
      &lt;/&gt;
    </button>
  );
};
