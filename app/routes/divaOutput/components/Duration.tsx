import type { DurationGroup } from '@/generatedTypes/divaTypes';

interface DurationProps {
  duration?: DurationGroup;
}

export const Duration = ({ duration }: DurationProps) => {
  if (!duration) {
    return null;
  }
  const hours = duration.hh?.value;
  const minutes = duration.mm?.value;
  const seconds = duration.ss?.value;

  const formattedDuration = [
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter(Boolean)
    .join(' ');

  const iso8601Duration = [
    'PT',
    hours && `${hours}H`,
    minutes && `${minutes}M`,
    seconds && `${seconds}S`,
  ]
    .filter(Boolean)
    .join('');

  return <time dateTime={iso8601Duration}>{formattedDuration}</time>;
};
