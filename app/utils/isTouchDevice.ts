export const isTouchDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.navigator.maxTouchPoints > 0
  );
};
