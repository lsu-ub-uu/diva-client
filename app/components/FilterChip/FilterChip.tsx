// FilterChip.tsx
import { Checkbox, type CheckboxProps } from '@headlessui/react';
import { forwardRef } from 'react';
import styles from './FilterChip.module.css';

interface FilterChipProps extends CheckboxProps {
  label: string;
  defaultSelected?: boolean;
}

const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ label, defaultSelected = false, className, ...props }, ref) => {
    return (
      <Checkbox
        ref={ref}
        defaultChecked={defaultSelected}
        className={`${styles.chip} ${className}`}
        {...props}
      >
        <span className={styles.checkmark} aria-hidden='true'>
          ✓
        </span>
        {label}
      </Checkbox>
    );
  },
);

FilterChip.displayName = 'FilterChip';

export default FilterChip;
