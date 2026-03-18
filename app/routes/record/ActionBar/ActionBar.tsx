import clsx from 'clsx';
import type { HTMLProps } from 'react';
import styles from './ActionBar.module.css';

export const ActionBar = ({
  className,
  children,
  ...rest
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={clsx(styles['action-bar'], className)} {...rest}>
      {children}
    </div>
  );
};
