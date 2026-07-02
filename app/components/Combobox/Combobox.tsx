import { isTouchDevice } from '@/utils/isTouchDevice';
import clsx from 'clsx';
import { ChevronDownIcon, FilterIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState, type HTMLAttributes } from 'react';
import { Fieldset } from '../Input/Fieldset';
import { Input } from '../Input/Input';
import inputStyles from '../Input/Input.module.css';
import styles from './Combobox.module.css';

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  'onChange'
> {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  defaultValue?: string;
  name: string;
}

export const Combobox = ({
  options,
  value,
  onChange,
  disabled = false,
  invalid = false,
  className,
  ...rest
}: ComboboxProps) => {
  const id = useId();
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const filterInputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState('');
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase()),
  );

  const ids = {
    combobox: `combobox-${id}`,
    input: `combobox-input-${id}`,
    popover: `combobox-popover-${id}`,
    listbox: `combobox-listbox-${id}`,
    option: (option: ComboboxOption) => `combobox-option-${id}-${option.value}`,
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const activeOption = filteredOptions[activeIndex];

  const openListbox = () => {
    popoverRef.current?.showPopover({ source: comboboxRef.current });
  };

  const closeListbox = () => {
    popoverRef.current?.hidePopover();
  };

  useEffect(() => {
    const listboxEl = popoverRef.current;
    const handleToggle = (e: ToggleEvent) => {
      if (e.newState === 'open') {
        setActiveIndex(
          filteredOptions.findIndex((option) => option.value === value),
        );
        setExpanded(true);

        if (!isTouchDevice()) {
          filterInputRef.current?.focus();
        }
      } else {
        setActiveIndex(0);
        setExpanded(false);
        comboboxRef.current?.focus();
        setFilter('');
      }
      setExpanded(e.newState === 'open');
    };
    listboxEl?.addEventListener('toggle', handleToggle);
    return () => {
      listboxEl?.removeEventListener('toggle', handleToggle);
    };
  }, [filteredOptions, value]);

  const selectOption = (option: ComboboxOption) => {
    onChange(option.value);
    closeListbox();
  };

  useEffect(() => {
    if (activeOption) {
      const optionEl = optionRefs.current.get(activeOption.value);
      optionEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeOption]);

  const currentValue = options.find((option) => option.value === value);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (activeIndex + 1) % filteredOptions.length;
        setActiveIndex(nextIndex);

        if (!expanded) {
          openListbox();
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex =
          (activeIndex - 1 + filteredOptions.length) % filteredOptions.length;
        setActiveIndex(prevIndex);
        if (!expanded) {
          openListbox();
        }
        break;
      }
      case 'Enter': {
        if (!expanded) {
          return;
        }
        event.preventDefault();
        if (activeOption) {
          selectOption(activeOption);
        }
        break;
      }
    }
  };

  return (
    <>
      <button
        className={clsx(
          inputStyles['combobox-input'],
          styles['trigger'],
          className,
        )}
        type='button'
        role='combobox'
        aria-haspopup='listbox'
        aria-expanded={expanded}
        aria-invalid={invalid}
        aria-controls={ids.listbox}
        aria-activedescendant={
          activeOption ? ids.option(activeOption) : undefined
        }
        popoverTarget={ids.popover}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        ref={comboboxRef}
        {...rest}
      >
        <span className={styles['combobox-value']}>{currentValue?.label}</span>
        <ChevronDownIcon className={styles['combobox-input-icon']} />
      </button>
      <div
        popover='auto'
        className={styles.options}
        ref={popoverRef}
        data-open={expanded}
        id={ids.popover}
      >
        <Fieldset size='small' className={styles['listbox-filter']}>
          <Input
            aria-label='Filtrera alternativ'
            placeholder='Filtrera alternativ'
            ref={filterInputRef}
            aria-controls={ids.listbox}
            aria-activedescendant={
              activeOption ? ids.option(activeOption) : undefined
            }
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <FilterIcon className={styles['listbox-filter-icon']} />
        </Fieldset>
        <ul role='listbox' id={ids.listbox}>
          {filteredOptions.map((option) => (
            <li key={option.value}>
              <button
                id={ids.option(option)}
                type='button'
                role='option'
                aria-selected={option.value === value}
                onClick={() => {
                  selectOption(option);
                }}
                className={styles.option}
                data-active={activeOption?.value === option.value}
                ref={(el) => {
                  if (el) {
                    optionRefs.current.set(option.value, el);
                  } else {
                    optionRefs.current.delete(option.value);
                  }
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
