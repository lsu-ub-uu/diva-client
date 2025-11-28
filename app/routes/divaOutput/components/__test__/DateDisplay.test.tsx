import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DateDisplay } from '../DateDisplay';

describe('DateDisplay', () => {
  it('should render null when date is undefined', () => {
    render(<DateDisplay date={undefined} />);

    expect(screen.queryByRole('time')).not.toBeInTheDocument();
  });
  it('should format date correctly with year, month, and day', () => {
    render(
      <DateDisplay
        date={{
          year: { value: '2023' },
          month: { value: '10' },
          day: { value: '05' },
        }}
      />,
    );
    expect(screen.getByRole('time')).toHaveAttribute('datetime', '2023-10-05');
    expect(screen.getByRole('time')).toHaveTextContent('2023-10-05');
  });
  it('should format date correctly with year, month, day, hour, and minute', () => {
    render(
      <DateDisplay
        date={{
          year: { value: '2023' },
          month: { value: '10' },
          day: { value: '05' },
          hh: { value: '14' },
          mm: { value: '30' },
        }}
      />,
    );
    expect(screen.getByRole('time')).toHaveAttribute(
      'datetime',
      '2023-10-05T14:30',
    );
    expect(screen.getByRole('time')).toHaveTextContent('2023-10-05 14:30');
  });
  it('should handle missing month and day gracefully', () => {
    render(
      <DateDisplay
        date={{
          year: { value: '2023' },
        }}
      />,
    );
    expect(screen.getByRole('time')).toHaveAttribute('datetime', '2023');
    expect(screen.getByRole('time')).toHaveTextContent('2023');
  });

  it('should handle missing hour and minute gracefully', () => {
    render(
      <DateDisplay
        date={{
          year: { value: '2023' },
          month: { value: '10' },
          day: { value: '05' },
        }}
      />,
    );
    expect(screen.getByRole('time')).toHaveAttribute('datetime', '2023-10-05');
    expect(screen.getByRole('time')).toHaveTextContent('2023-10-05');
  });
});
