import clsx from 'clsx';
import {
  use,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Input } from '../Input/Input';
import styles from './Autocomplete.module.css';
import { TextSearchIcon } from '@/icons/icons';
import { CircularLoader } from '../Loader/CircularLoader';
import { FieldContext } from '../Input/Fieldset';

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
  const fieldContext = use(FieldContext);
  const comboboxRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [autocompleteInputValue, setAutocompleteInputValue] = useState(
    displayValue ?? '',
  );
  const [prevDisplayValue, setPrevDisplayValue] = useState(displayValue);
  const [expanded, setExpanded] = useState(false);

  const id = useId();
  const ids = {
    combobox: `autocomplete-${id}`,
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

  const openListbox = useCallback(() => {
    if (options.length > 0) {
      popoverRef.current?.showPopover({ source: comboboxRef.current });
    }
  }, [options]);

  const closeListbox = useCallback(() => {
    popoverRef.current?.hidePopover();
  }, []);

  // Handle listbox toggle
  useEffect(() => {
    const listboxEl = popoverRef.current;
    const handleToggle = (e: ToggleEvent) => {
      setActiveIndex(0);
      setExpanded(e.newState === 'open');
    };
    listboxEl?.addEventListener('toggle', handleToggle);
    return () => {
      listboxEl?.removeEventListener('toggle', handleToggle);
    };
  }, [options]);

  const selectOption = (option: AutocompleteOption) => {
    onChange(option.value);
    if (option.presentation && typeof option.presentation === 'string') {
      setAutocompleteInputValue(option.presentation);
    }
    closeListbox();
  };

  // Scroll active option into view when it changes
  useEffect(() => {
    if (activeOption) {
      const optionEl = optionRefs.current.get(activeOption.value);
      optionEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeOption]);

  // Open the listbox when options change and there are options available
  useEffect(() => {
    if (options.length > 0 && comboboxRef.current === document.activeElement) {
      openListbox();
    } else {
      closeListbox();
    }
  }, [options, openListbox, closeListbox]);

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

  return (
    <>
      <div className={styles['autocomplete-input-wrapper']}>
        <Input
          id={fieldContext?.ids.input}
          ref={comboboxRef}
          role='combobox'
          aria-autocomplete='list'
          aria-haspopup='listbox'
          aria-expanded={expanded}
          aria-invalid={invalid}
          aria-describedby={
            fieldContext?.validationError ? fieldContext.ids.error : undefined
          }
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
          onClick={openListbox}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={clsx(styles['trigger'], className)}
          value={autocompleteInputValue}
          placeholder={placeholder}
          {...rest}
        />
        <div className={styles['autocomplete-input-icon-wrapper']}>
          <div className={styles['autocomplete-input-icon']}>
            {loading ? <CircularLoader /> : <TextSearchIcon />}
          </div>
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
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- keyboard interaction handled by combobox input
            <li
              key={option.value}
              role='option'
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              id={ids.option(option)}
              onClick={() => {
                if (!option.disabled) {
                  selectOption(option);
                }
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
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
