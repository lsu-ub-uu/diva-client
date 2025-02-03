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

import { Box } from '@mui/material';
import type { RecordFormSchema } from '../FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';

export interface RecordFormProps {
  record?: BFFDataRecord;
  formSchema: RecordFormSchema;
}

export const ReadOnlyForm = ({ record, formSchema }: RecordFormProps) => {
  const methods = useRemixForm({
    defaultValues: record?.data,
  });

  return (
    <Box
      sx={{
        width: '100%',
        pb: 4,
      }}
    >
      <RemixFormProvider {...methods}>
        <FormGenerator
          formSchema={formSchema}
          boxGroups
        />
      </RemixFormProvider>
    </Box>
  );
};
