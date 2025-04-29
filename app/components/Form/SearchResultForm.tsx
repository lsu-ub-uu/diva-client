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

import { FormGenerator } from '@/components/FormGenerator/FormGenerator';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { BFFDataRecord } from '@/types/record';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import type { FormSchema } from '../FormGenerator/types';

interface SearchResultFormProps {
  record?: BFFDataRecord;
  formSchema: FormSchema;
}

export const SearchResultForm = ({
  record,
  formSchema,
}: SearchResultFormProps) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: record?.data,
    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });

  return (
    <FormProvider {...methods}>
      <FormGenerator
        formSchema={formSchema}
        boxGroups={false}
        showTooltips={false}
        enhancedFields={{
          'output.titleInfo.title.value': {
            type: 'link',
            to: `/${record?.recordType}/${record?.id}`,
          },
        }}
      />
    </FormProvider>
  );
};
