import type { ElementType, HTMLProps } from 'react';
import type { LinkProps } from 'react-router';
import styles from './IconButton.module.css';
import { Button } from '../Button/Button';
import { clsx } from 'clsx';
import { useTooltip } from '../Tooltip/useTooltip';
import { Tooltip } from '../Tooltip/Tooltip';

export interface IconButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, 'as' | 'size'> {
  tooltip: string;
  size?: 'small' | 'medium' | 'large';
  as?: ElementType;
  to?: LinkProps['to'];
  href?: string;
  target?: string;
  error?: boolean;
}

export const IconButton = ({
  size = 'medium',
  tooltip,
  children,
  className,
  as,
  ...rest
}: IconButtonProps) => {
  const { tooltipWrapperProps, tooltipTriggerProps, tooltipProps } =
    useTooltip();
  const Root = as || Button;
  return (
    <div
      className={clsx(styles['wrapper'], className)}
      {...tooltipWrapperProps}
    >
      <Root
        className={styles['icon-button']}
        size={size}
        aria-label={tooltip}
        {...tooltipTriggerProps}
        {...rest}
      >
        {children}
      </Root>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </div>
  );
};
