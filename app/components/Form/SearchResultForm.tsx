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

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RecordData } from '../FormGenerator/defaultValues/defaultValues';
import { createDefaultValuesFromFormSchema } from '../FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import type { FormSchema } from '../FormGenerator/types';
import type { BFFDataRecord } from '@/types/record';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';

interface SearchResultFormProps {
  record?: BFFDataRecord;
  formSchema: FormSchema;
}

export const SearchResultForm = ({ ...props }: SearchResultFormProps) => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      props.formSchema,
      props.record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(props.formSchema)),
  });

  return (
    <FormProvider {...methods}>
      <FormGenerator
        formSchema={props.formSchema}
        boxGroups={false}
        showTooltips={false}
        enhancedFields={{
          'output.titleInfo.title.value': {
            type: 'link',
            to: `/${props.record?.recordType}/${props.record?.id}`,
          },
        }}
      />
    </FormProvider>
  );
};
