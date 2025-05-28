export function getValueForRepeat(
  value: string,
  repeatMin: string,
  repeatMax: string,
) {
  if (repeatMax !== '1') {
    return `${value}[]`;
  }
  return value;
}
