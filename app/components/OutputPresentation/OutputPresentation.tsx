import type { DataGroup } from '@/cora/cora-data/types.server';
import type { FormSchema } from '../FormGenerator/types';
import { OutputComponent } from './OutputComponent';
import styles from './OutputPresentation.module.css';

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
    <div
      className={styles['output-presentation']}
      data-compact={compact === true}
    >
      <OutputComponent component={formSchema.form} data={data} />
    </div>
  );
};
