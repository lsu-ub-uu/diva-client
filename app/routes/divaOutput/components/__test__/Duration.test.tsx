import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Duration } from '../Duration';
import type { DurationGroup } from '@/generatedTypes/divaTypes';

describe('Duration', () => {
  it('should render null when duration is undefined', () => {
    render(<Duration duration={undefined} />);

    expect(screen.queryByRole('time')).not.toBeInTheDocument();
  });

  it('should format duration correctly with hours, minutes, and seconds', () => {
    render(
      <Duration
        duration={
          {
            hh: { value: '1' },
            mm: { value: '2' },
            ss: { value: '3' },
          } as DurationGroup
        }
      />,
    );

    expect(screen.getByRole('time')).toHaveAttribute('datetime', 'PT1H2M3S');
    expect(screen.getByRole('time')).toHaveTextContent('1h 2m 3s');
  });

  it('should format duration correctly with only minutes and seconds', () => {
    render(
      <Duration
        duration={
          {
            mm: { value: '5' },
            ss: { value: '30' },
          } as DurationGroup
        }
      />,
    );
    expect(screen.getByRole('time')).toHaveAttribute('datetime', 'PT5M30S');
    expect(screen.getByRole('time')).toHaveTextContent('5m 30s');
  });

  it('should format duration correctly with only seconds', () => {
    render(
      <Duration
        duration={
          {
            ss: { value: '45' },
          } as DurationGroup
        }
      />,
    );
    expect(screen.getByRole('time')).toHaveAttribute('datetime', 'PT45S');
    expect(screen.getByRole('time')).toHaveTextContent('45s');
  });
});
