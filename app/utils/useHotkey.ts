import { useEffect } from 'react';

type Modifier = 'alt' | 'ctrl' | 'meta' | 'shift';

export const useHotkey = (
  modifier: Modifier,
  key: string,
  callback: (() => void) | undefined,
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifierMatch =
        event.altKey === (modifier === 'alt') &&
        event.ctrlKey === (modifier === 'ctrl') &&
        event.metaKey === (modifier === 'meta') &&
        event.shiftKey === (modifier === 'shift');

      if (event.code === key && modifierMatch) {
        event.preventDefault();
        callback?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modifier, key, callback]);
};
