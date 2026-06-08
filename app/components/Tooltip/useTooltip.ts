import { isTouchDevice } from '@/utils/isTouchDevice';
import { useRef } from 'react';

export const useTooltip = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipDelayTimeout = useRef<number>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function showTooltip() {
    if (isTouchDevice()) {
      return;
    }

    tooltipRef.current?.showPopover({ source: triggerRef.current });
  }

  function handleMouseEnter() {
    if (tooltipDelayTimeout.current != null) {
      window.clearTimeout(tooltipDelayTimeout.current);
    }
    tooltipDelayTimeout.current = window.setTimeout(() => {
      showTooltip();
    }, 500);
  }

  function hideTooltip() {
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

  const tooltipTriggerProps = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    onKeyDown: handleKeyDown,
  };

  const tooltipWrapperProps = {
    onMouseLeave: hideTooltip,
  };

  const tooltipProps = {
    ref: tooltipRef,
  };

  return {
    tooltipProps,
    tooltipTriggerProps,
    tooltipWrapperProps,
  };
};
