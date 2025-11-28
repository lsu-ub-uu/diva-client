import { supportsAnchorPositioning } from '@/utils/supportsAnchorPositioning';
import { useRef } from 'react';

export const useTooltip = () => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipDelayTimeout = useRef<number>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function showPopover() {
    tooltipRef.current?.showPopover({ source: triggerRef.current });

    if (!supportsAnchorPositioning()) {
      // Remove this workaround when support for CSS anchor positioning is widespread. (https://caniuse.com/css-anchor-positioning)
      positionTooltipManually(triggerRef.current, tooltipRef.current);
    }
  }

  function handleMouseEnter() {
    if (tooltipDelayTimeout.current != null) {
      window.clearTimeout(tooltipDelayTimeout.current);
    }
    tooltipDelayTimeout.current = window.setTimeout(() => {
      showPopover();
    }, 500);
  }

  function handleFocus() {
    showPopover();
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

  const tooltipTriggerProps = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onFocus: handleFocus,
    onBlur: handleMouseLeave,
    onKeyDown: handleKeyDown,
  };

  const tooltipWrapperProps = {
    onMouseLeave: handleMouseLeave,
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

const positionTooltipManually = (
  trigger: HTMLButtonElement | null,
  tooltip: HTMLDivElement | null,
) => {
  if (!trigger || !tooltip) {
    return;
  }
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  tooltip.style.top = `${triggerRect.bottom + window.scrollY}px`;
  tooltip.style.left = `${triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipRect.width / 2}px`;
};
