import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DateDisplay } from '../DateDisplay';

describe('DateDisplay', () => {
  it('should render null when date is undefined', async () => {
    const screen = await render(<DateDisplay date={undefined} />);

    await expect(screen.baseElement.querySelector('time')).toBeNull();
  });
  it('should format date correctly with year, month, and day', async () => {
    const screen = await render(
      <DateDisplay
        date={{
          year: { value: '2023' },
          month: { value: '10' },
          day: { value: '05' },
        }}
      />,
    );
    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', '2023-10-05');
    await expect(time).toHaveTextContent('2023-10-05');
  });
  it('should format date correctly with year, month, day, hour, and minute', async () => {
    const screen = await render(
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
    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', '2023-10-05T14:30');
    await expect(time).toHaveTextContent('2023-10-05 14:30');
  });
  it('should handle missing month and day gracefully', async () => {
    const screen = await render(
      <DateDisplay
        date={{
          year: { value: '2023' },
        }}
      />,
    );
    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', '2023');
    await expect(time).toHaveTextContent('2023');
  });

  it('should handle missing hour and minute gracefully', async () => {
    const screen = await render(
      <DateDisplay
        date={{
          year: { value: '2023' },
          month: { value: '10' },
          day: { value: '05' },
        }}
      />,
    );
    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', '2023-10-05');
    await expect(time).toHaveTextContent('2023-10-05');
  });
});
