import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Date } from '../Date';

describe('Date', () => {
  it('should render null when date is undefined', () => {
    render(<Date date={undefined} />);

    expect(screen.queryByRole('time')).not.toBeInTheDocument();
  });
  it('should format date correctly with year, month, and day', () => {
    render(
      <Date
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
      <Date
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
      <Date
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
      <Date
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
