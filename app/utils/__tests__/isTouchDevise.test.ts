import { describe, expect, it, vi } from 'vitest';
import { isTouchDevice } from '../isTouchDevice';

describe('isTouchDevice', () => {
  it('returns true when pointer is coarse', () => {
    mockPointerMediaQuery('coarse');

    expect(isTouchDevice()).toBe(true);
  });

  it('returns false when pointer is fine', () => {
    mockPointerMediaQuery('fine');
    expect(isTouchDevice()).toBe(false);
  });

  it('returns true poiner is not coarse and when maxTouchPoints is greater than zero', () => {
    mockPointerMediaQuery('fine');
    vi.stubGlobal('navigator', {
      maxTouchPoints: 2,
    });

    expect(isTouchDevice()).toBe(true);
  });

  it('returns false when pointer is not coarse and maxTouchPoints is zero', () => {
    mockPointerMediaQuery('fine');
    vi.stubGlobal('navigator', {
      maxTouchPoints: 0,
    });

    expect(isTouchDevice()).toBe(false);
  });
});

const mockPointerMediaQuery = (pointer: 'coarse' | 'fine') => {
  vi.stubGlobal('matchMedia', (mediaQuery: string) => {
    if (mediaQuery === `(pointer: ${pointer})`) {
      return { matches: true };
    }
    return { matches: false };
  });
};
