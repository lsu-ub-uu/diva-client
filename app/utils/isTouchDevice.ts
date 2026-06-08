export const isTouchDevice = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.navigator.maxTouchPoints > 0;
