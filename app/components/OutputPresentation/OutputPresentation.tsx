import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';
import { OutputGroup } from './OutputGroup';

interface OutputPresentationProps {
  formSchema: FormSchema;
  data: DataGroup;
  compact?: boolean;
}

export const OutputPresentation = ({
  formSchema,
  data,
  compact,
}: OutputPresentationProps) => {
  return (
    <OutputGroup component={formSchema.form} data={data} compact={compact} />
  );
};
