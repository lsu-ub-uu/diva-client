import { useRef } from 'react';

export const useTooltip = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipDelayTimeout = useRef<number>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function handleMouseEnter() {
    if (tooltipDelayTimeout.current != null) {
      window.clearTimeout(tooltipDelayTimeout.current);
    }
    tooltipDelayTimeout.current = window.setTimeout(() => {
      tooltipRef.current?.showPopover({ source: triggerRef.current });
    }, 500);
  }

  function handleFocus() {
    tooltipRef.current?.showPopover({ source: triggerRef.current });
  }

  function handleMouseLeave() {
    if (tooltipDelayTimeout.current != null) {
      window.clearTimeout(tooltipDelayTimeout.current);
      tooltipDelayTimeout.current = null;
    }
    tooltipRef.current?.hidePopover();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      tooltipRef.current?.hidePopover();
    }
  }

  const triggerProps = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onFocus: handleFocus,
    onBlur: handleMouseLeave,
    onKeyDown: handleKeyDown,
  };

  const wrapperProps = {
    onMouseLeave: handleMouseLeave,
  };

  const tooltipProps = {
    ref: tooltipRef,
  };

  return {
    tooltipProps,
    triggerProps,
    wrapperProps,
  };
};
