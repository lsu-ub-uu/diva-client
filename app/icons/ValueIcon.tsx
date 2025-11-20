import clsx from 'clsx';
import type { HTMLProps } from 'react';

export const ValueIcon = ({ className, ...rest }: HTMLProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={clsx(
      'lucide lucide-circle-small-icon lucide-circle-small',
      className,
    )}
    {...rest}
  >
    <circle cx='12' cy='12' r='6' />
  </svg>
);
