export function generateInterfaceName(validationTypeId: string): string {
  return validationTypeId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}
