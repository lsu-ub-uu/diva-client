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
import { type RefObject, useMemo, useState } from 'react';
import { DevInfoButton } from './components/DevInfo';
import type { BFFDataRecord, BFFDataRecordData } from '@/types/record';
import styles from './FormGenerator.module.css';
import type { ObjectSchema } from 'yup';

interface FormGeneratorProps {
  formSchema: FormSchema;
  data?: BFFDataRecordData;
  errors?: Record<string, string>;
  boxGroups?: boolean;
  showTooltips?: boolean;
  enhancedFields?: Record<string, EnhancedFieldsConfig>;
  onFormChange?: () => void;
  yupSchema?: ObjectSchema<Record<string, any>>;
}

export const FormGenerator = ({
  data,
  errors = {},
  boxGroups = false,
  showTooltips = true,
  enhancedFields,
  onFormChange,
  yupSchema,
  ...props
}: FormGeneratorProps) => {
  const [showDevInfo, setShowDevInfo] = useState(false);

  const formContextValues = useMemo(
    () => ({
      data,
      errors,
      boxGroups,
      showDevInfo,
      showTooltips,
      enhancedFields,
      onFormChange,
      yupSchema,
    }),
    [
      data,
      errors,
      boxGroups,
      showDevInfo,
      showTooltips,
      enhancedFields,
      onFormChange,
      yupSchema,
    ],
  );

  return (
    <div className={styles['wrapper']}>
      <DevInfoButton onClick={() => setShowDevInfo(!showDevInfo)} />
      <FormGeneratorContext value={formContextValues}>
        <Component component={props.formSchema.form} path={''} />
      </FormGeneratorContext>
    </div>
  );
};
