import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { Duration } from '../Duration';
import type { DurationGroup } from '@/generatedTypes/divaTypes';

describe('Duration', () => {
  it('should render null when duration is undefined', async () => {
    const screen = await render(<Duration duration={undefined} />);

    await expect(screen.baseElement.querySelector('time')).toBeNull();
  });

  it('should format duration correctly with hours, minutes, and seconds', async () => {
    const screen = await render(
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

    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', 'PT1H2M3S');
    await expect(time).toHaveTextContent('1h 2m 3s');
  });

  it('should format duration correctly with only minutes and seconds', async () => {
    const screen = await render(
      <Duration
        duration={
          {
            mm: { value: '5' },
            ss: { value: '30' },
          } as DurationGroup
        }
      />,
    );
    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', 'PT5M30S');
    await expect(time).toHaveTextContent('5m 30s');
  });

  it('should format duration correctly with only seconds', async () => {
    const screen = await render(
      <Duration
        duration={
          {
            ss: { value: '45' },
          } as DurationGroup
        }
      />,
    );
    const time = screen.getByRole('time').element() as HTMLElement;
    await expect(time).toHaveAttribute('datetime', 'PT45S');
    await expect(time).toHaveTextContent('45s');
  });
});
