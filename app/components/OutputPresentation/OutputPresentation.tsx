import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';
import { OutputGroup } from './OutputGroup';

interface OutputPresentationProps {
  formSchema: FormSchema;
  data: DataGroup;
}

export const OutputPresentation = ({
  formSchema,
  data,
}: OutputPresentationProps) => {
  return <OutputGroup component={formSchema.form} data={data} />;
};
