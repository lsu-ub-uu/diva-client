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

import { createContext } from 'react';
import type { BFFDataRecord } from '@/types/record';

export interface EnhancedFieldsConfig {
  type: 'hidden';
}

export interface FormGeneratorContextType {
  linkedData?: BFFDataRecord['data'];
  showDevInfo: boolean;
  boxGroups: boolean;
  showTooltips: boolean;
  enhancedFields?: Record<string, EnhancedFieldsConfig>;
}

export const FormGeneratorContext = createContext<FormGeneratorContextType>({
  linkedData: undefined,
  showDevInfo: false,
  boxGroups: false,
  showTooltips: true,
  enhancedFields: {},
});
