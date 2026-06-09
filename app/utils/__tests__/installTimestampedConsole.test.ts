import { describe, expect, it, vi } from 'vitest';
import { installTimestampedConsole } from '../installTimestampedConsole';

describe('installTimestampedConsole', () => {
  it('prefixes console output with an ISO timestamp and log level', () => {
    const error = vi.fn();
    const warn = vi.fn();
    const info = vi.fn();
    const debug = vi.fn();
    const trace = vi.fn();
    const log = vi.fn();
    const fakeConsole = { error, warn, info, debug, trace, log };

    installTimestampedConsole(fakeConsole, () => '2026-06-09T12:34:56.789Z');

    const failure = new Error('boom');
    fakeConsole.error('Failed to save record', failure);

    expect(error).toHaveBeenCalledWith(
      '[2026-06-09T12:34:56.789Z]',
      '[ERROR]',
      'Failed to save record',
      failure,
    );

    fakeConsole.debug('Extra details');

    expect(debug).toHaveBeenCalledWith(
      '[2026-06-09T12:34:56.789Z]',
      '[DEBUG]',
      'Extra details',
    );
  });

  it('does not wrap the same console twice', () => {
    const info = vi.fn();
    const fakeConsole = {
      error: vi.fn(),
      warn: vi.fn(),
      info,
      debug: vi.fn(),
      trace: vi.fn(),
      log: vi.fn(),
    };

    installTimestampedConsole(fakeConsole, () => 'first');
    installTimestampedConsole(fakeConsole, () => 'second');

    fakeConsole.info('Server started');

    expect(info).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith('[first]', '[INFO]', 'Server started');
  });
});
