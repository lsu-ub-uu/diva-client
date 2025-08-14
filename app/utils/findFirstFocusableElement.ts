export const findFocusableElements = (
  container: HTMLElement,
): HTMLElement[] => {
  return Array.from(
    container.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])',
    ),
  );
};
