export function getValueForRepeat(
  value: string,
  repeatMin: string,
  repeatMax: string,
) {
  if (repeatMin === '1' && repeatMax === '1') {
    return value;
  }

  if (repeatMin === '0' && repeatMax === '1') {
    return `[${value}] | undefined`;
  }

  if (repeatMin === '0' && repeatMax === 'X') {
    return `${value}[] | undefined`;
  }

  return `${value}[]`;
}
