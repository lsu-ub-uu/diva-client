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

import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { Snackbar } from '@/components/Snackbar/Snackbar';

interface ValidationErrorSnackbarProps {
  errors: Record<string, string[]> | undefined;
}

export const ValidationErrorSnackbar = ({
  errors,
}: ValidationErrorSnackbarProps) => {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!isEmpty(errors)) {
      setSnackbarOpen(true);
    }
  }, [errors]);

  return (
    <Snackbar
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
      severity='error'
      text={t('divaClient_formValidationErrorsText')}
    />
  );
};
