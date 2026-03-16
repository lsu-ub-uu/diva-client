import type { ReactNode } from 'react';
import type { TextStyle } from '@/cora/bffTypes.server';
import styles from './OutputPresentation.module.css';
import clsx from 'clsx';

interface OutputFieldProps {
  label?: string;
  attributes?: ReactNode;
  value?: ReactNode;
  variant?: 'inline' | 'block';
  textStyle?: TextStyle;
  colspan?: number;
}

export const OutputField = ({
  label,
  attributes,
  value,
  variant = 'block',
  textStyle,
  colspan,
}: OutputFieldProps) => {
  return (
    <div
      className={clsx(styles['output-field'], 'form-component-item')}
      data-colspan={colspan ?? 12}
      data-variant={variant}
      data-text-style={textStyle}
    >
      {label && <div className={styles['label']}>{label}</div>}
      {attributes}
      <div className={styles['value']}>{value}</div>
    </div>
  );
};
