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

import { use, useCallback, useState } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { reach, ValidationError } from 'yup';

export const useFieldValidationError = (path: string) => {
  const { errors, yupSchema } = use(FormGeneratorContext);

  const contextError = errors[path];
  const [localError, setLocalError] = useState<string | undefined | null>();

  const errorMessage =
    localError !== undefined ? localError : contextError?.[0];
  const validationRule = yupSchema && reach(yupSchema, path);

  const onRevalidate = useCallback(
    async (value: string) => {
      if (validationRule && 'validate' in validationRule) {
        try {
          await validationRule.validate(value);
          setLocalError(null);
        } catch (e) {
          if (e instanceof ValidationError) {
            setLocalError(e.message);
          }
        }
      }
    },
    [validationRule],
  );

  return { errorMessage, onRevalidate };
};
