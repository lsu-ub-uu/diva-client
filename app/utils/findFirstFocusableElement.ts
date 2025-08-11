export const findFirstFocusableElement = (
  container: HTMLElement,
): HTMLElement | null => {
  return container.querySelector(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])',
  );
};
