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

import type { FormSchema } from './types';
import { Component } from '@/components/FormGenerator/Component';
import {
  type EnhancedFieldsConfig,
  FormGeneratorContext,
} from '@/components/FormGenerator/FormGeneratorContext';
import { useMemo, useState } from 'react';
import { DevInfoButton } from './components/DevInfo';
import type { BFFDataRecord } from '@/types/record';
import styles from './FormGenerator.module.css';

interface FormGeneratorProps {
  formSchema: FormSchema;
  linkedData?: BFFDataRecord['data'];
  boxGroups?: boolean;
  showTooltips?: boolean;
  enhancedFields?: Record<string, EnhancedFieldsConfig>;
}

export const FormGenerator = ({
  linkedData,
  boxGroups = false,
  showTooltips = true,
  enhancedFields,
  ...props
}: FormGeneratorProps) => {
  const [showDevInfo, setShowDevInfo] = useState(false);

  const formContextValues = useMemo(
    () => ({
      linkedData,
      boxGroups,
      showDevInfo,
      showTooltips,
      enhancedFields,
    }),
    [linkedData, boxGroups, showDevInfo, showTooltips, enhancedFields],
  );

  return (
    <div className={styles['wrapper']}>
      <DevInfoButton onClick={() => setShowDevInfo(!showDevInfo)} />
      <FormGeneratorContext value={formContextValues}>
        <Component component={props.formSchema.form} idx={0} path={''} />
      </FormGeneratorContext>
    </div>
  );
};
