/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { isDevMode } from '@/utils/useIsDevMode';

describe('useIsDevMode', () => {
  it('should return false when localStorage does not have diva-dev item', () => {
    vi.stubGlobal('localStorage', { getItem: vi.fn().mockReturnValue(null) });
    const { result } = renderHook(() => isDevMode());
    expect(result.current).toBe(false);
  });

  it('should return true when localStorage has diva-dev item', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockImplementation((key) => {
        if (key === 'diva-dev') {
          return 'true';
        }
      }),
    });

    const { result } = renderHook(() => isDevMode());
    expect(result.current).toBe(true);
  });
});
