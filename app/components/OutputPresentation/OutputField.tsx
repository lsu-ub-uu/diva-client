import type { ReactNode } from 'react';
import styles from './OutputField.module.css';
import type { TextStyle } from '@/cora/bffTypes.server';

interface OutputFieldProps {
  label?: string;
  attributes?: ReactNode;
  value?: ReactNode;
  variant?: 'inline' | 'block';
  textStyle?: TextStyle;
}

export const OutputField = ({
  label,
  attributes,
  value,
  variant = 'block',
  textStyle,
}: OutputFieldProps) => {
  return (
    <div
      className={styles['output-field']}
      data-variant={variant}
      data-text-style={textStyle}
    >
      <div>
        {label && <div className={styles['label']}>{label}</div>}
        {attributes}
      </div>
      <div className={styles['value']}>{value}</div>
    </div>
  );
};
