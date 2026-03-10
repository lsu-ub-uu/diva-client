import type { BFFDataRecordData } from '@/types/record';
import type { FormSchema } from '../FormGenerator/types';
import { OutputGroup } from './OutputGroup';

interface OutputPresentationProps {
  formSchema: FormSchema;
  data: BFFDataRecordData;
}

export const OutputPresentation = ({
  formSchema,
  data,
}: OutputPresentationProps) => {
  return (
    <OutputGroup
      component={formSchema.form}
      data={data[formSchema.form.name]}
    />
  );
};
