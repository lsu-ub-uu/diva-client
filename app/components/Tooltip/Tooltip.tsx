import type { HTMLProps } from 'react';
import styles from './Tooltip.module.css';
import clsx from 'clsx';

export const Tooltip = ({
  className,
  children,
  ref,
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div ref={ref} popover='hint' className={clsx(styles.tooltip, className)}>
      {children}
    </div>
  );
};
