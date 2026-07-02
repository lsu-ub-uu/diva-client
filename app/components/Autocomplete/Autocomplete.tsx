import clsx from 'clsx';
import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Input } from '../Input/Input';
import styles from './Autocomplete.module.css';
import { TextSearchIcon } from 'lucide-react';
import { CircularLoader } from '../Loader/CircularLoader';

interface AutocompleteOption {
  value: string;
  presentation: ReactNode;
  disabled?: boolean;
}

interface AutocompleteProps extends Omit<
  HTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  onAutocompleteInputChange: (value: string) => void;
  displayValue?: string;
  options: AutocompleteOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  placeholder?: string;
}

export const Autocomplete = ({
  onAutocompleteInputChange,
  options,
  value,
  onChange,
  loading = false,
  disabled = false,
  invalid = false,
  displayValue,
  className,
  placeholder,
  ...rest
}: AutocompleteProps) => {
  const id = useId();
  const comboboxRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [autocompleteInputValue, setAutocompleteInputValue] = useState(
    displayValue ?? '',
  );
  const [prevDisplayValue, setPrevDisplayValue] = useState(displayValue);
  const [expanded, setExpanded] = useState(false);
  const ids = {
    combobox: `autocomplete-${id}`,
    input: `autocomplete-input-${id}`,
    popover: `autocomplete-popover-${id}`,
    listbox: `autocomplete-listbox-${id}`,
    option: (option: AutocompleteOption) =>
      `autocomplete-option-${id}-${option.value}`,
  };

  if (displayValue !== prevDisplayValue) {
    setPrevDisplayValue(displayValue);
    if (displayValue !== undefined) {
      setAutocompleteInputValue(displayValue);
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const activeOption = options[activeIndex];

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
        setActiveIndex(options.findIndex((option) => option.value === value));
        setExpanded(true);
      } else {
        setActiveIndex(0);
        setExpanded(false);
      }
      setExpanded(e.newState === 'open');
    };
    listboxEl?.addEventListener('toggle', handleToggle);
    return () => {
      listboxEl?.removeEventListener('toggle', handleToggle);
    };
  }, [options, value]);

  const selectOption = (option: AutocompleteOption) => {
    onChange(option.value);
    if (option.presentation && typeof option.presentation === 'string') {
      setAutocompleteInputValue(option.presentation);
    }
    closeListbox();
  };

  useEffect(() => {
    if (activeOption) {
      const optionEl = optionRefs.current.get(activeOption.value);
      optionEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeOption]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = (activeIndex + 1) % options.length;
        setActiveIndex(nextIndex);

        if (!expanded) {
          openListbox();
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = (activeIndex - 1 + options.length) % options.length;
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

  useEffect(() => {
    if (options.length > 0) {
      openListbox();
    } else {
      closeListbox();
    }
  }, [options]);

  return (
    <>
      <div className={styles['autocomplete-input-wrapper']}>
        <Input
          ref={comboboxRef}
          role='combobox'
          aria-autocomplete='list'
          aria-haspopup='listbox'
          aria-expanded={expanded}
          aria-invalid={invalid}
          aria-controls={ids.listbox}
          aria-activedescendant={
            activeOption ? ids.option(activeOption) : undefined
          }
          onChange={(e) => {
            e.stopPropagation();
            setAutocompleteInputValue(e.target.value);
            onAutocompleteInputChange(e.target.value);
            setActiveIndex(0);
          }}
          onFocus={() => comboboxRef.current?.select()}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={clsx(styles['trigger'], className)}
          value={autocompleteInputValue}
          placeholder={placeholder}
          {...rest}
        />
        <div className={styles['autocomplete-input-icon']}>
          {loading ? <CircularLoader /> : <TextSearchIcon />}
        </div>
      </div>

      <div
        popover='auto'
        className={styles.options}
        ref={popoverRef}
        data-open={expanded}
        id={ids.popover}
      >
        <ul role='listbox' id={ids.listbox} aria-busy={loading}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                disabled={option.disabled}
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
                {option.presentation}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
