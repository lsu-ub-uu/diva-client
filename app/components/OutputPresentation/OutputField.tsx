import { useId, type ReactNode } from 'react';
import type { TextStyle } from '@/cora/bffTypes.server';
import styles from './OutputPresentation.module.css';
import clsx from 'clsx';
import { useTooltip } from '../Tooltip/useTooltip';
import { Tooltip } from '../Tooltip/Tooltip';
import type { FormComponentTooltip } from '../FormGenerator/types';
import { useTranslation } from 'react-i18next';
import { Popover } from '../Popover/Popover';

interface OutputFieldProps {
  label?: string;
  attributes?: ReactNode;
  value?: ReactNode;
  variant?: 'inline' | 'block';
  textStyle?: TextStyle;
  colspan?: number;
  tooltip?: FormComponentTooltip;
}

export const OutputField = ({
  label,
  attributes,
  value,
  variant = 'block',
  textStyle,
  colspan,
  tooltip,
}: OutputFieldProps) => {
  const { t } = useTranslation();
  const popoverId = useId();
  return (
    <div
      className={clsx(styles['output-field'], 'form-component-item')}
      data-colspan={colspan ?? 12}
      data-variant={variant}
      data-text-style={textStyle}
    >
      {label && (

        { tooltip ? (
           <>
          <button
            className={styles['label']}
            popoverTarget={tooltip ? popoverId : undefined}
          >
            {label}
          </button>
          {tooltip && (
            <Popover id={popoverId} title={t(tooltip?.title)}>
              {tooltip?.body && <p>{t(tooltip.body)}</p>}
            </Popover>
          )}
        </> : <div>{label}</div>
        )}
        <>
          <button
            className={styles['label']}
            popoverTarget={tooltip ? popoverId : undefined}
          >
            {label}
          </button>
          {tooltip && (
            <Popover id={popoverId} title={t(tooltip?.title)}>
              {tooltip?.body && <p>{t(tooltip.body)}</p>}
            </Popover>
          )}
        </>
      )}
      {attributes}
      <div className={styles['value']}>{value}</div>
    </div>
  );
};
