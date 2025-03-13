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
 */

import { FormProvider, useForm } from 'react-hook-form';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { BFFDataRecord } from '@/types/record';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';

interface LinkedRecordFormProps {
  record: BFFDataRecord;
}

export const LinkedRecordForm = ({ record }: LinkedRecordFormProps) => {
  const formSchema = record.presentation!;

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(formSchema, record.data),
    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });

  return (
    formSchema?.form && (
      <FormProvider {...methods}>
        <FormGenerator
          formSchema={formSchema}
          linkedData={record.data}
        />
      </FormProvider>
    )
  );
};
