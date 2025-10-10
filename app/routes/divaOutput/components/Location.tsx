import type { LocationGroup } from '@/generatedTypes/divaTypes';
import type { ReactNode } from 'react';

interface LocationProps {
  location: LocationGroup;
  icon?: ReactNode;
}

export const Location = ({ location, icon }: LocationProps) => {
  const href = !/^https?:\/\//i.test(location.url.value)
    ? `https://${location.url.value}`
    : location.url.value;

  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {location.displayLabel?.value ?? location.url.value}
      {icon}
    </a>
  );
};
