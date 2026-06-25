/*
 * Copyright 2026 Uppsala University Library
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
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useHotkey } from '@/utils/useHotkey';

describe('useHotkey', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls callback when correct modifier and key are pressed', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('ctrl', 'KeyS', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyS',
        ctrlKey: true,
        altKey: false,
        metaKey: false,
        shiftKey: false,
      }),
    );

    expect(callback).toHaveBeenCalledOnce();
  });

  it('does not call callback when wrong modifier is pressed', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('ctrl', 'KeyS', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyS',
        ctrlKey: false,
        altKey: true,
        metaKey: false,
        shiftKey: false,
      }),
    );

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call callback when wrong key is pressed', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('ctrl', 'KeyS', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyA',
        ctrlKey: true,
        altKey: false,
        metaKey: false,
        shiftKey: false,
      }),
    );

    expect(callback).not.toHaveBeenCalled();
  });

  it('works with alt modifier', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('alt', 'KeyN', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyN',
        altKey: true,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
      }),
    );

    expect(callback).toHaveBeenCalledOnce();
  });

  it('works with meta modifier', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('meta', 'KeyK', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyK',
        metaKey: true,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
      }),
    );

    expect(callback).toHaveBeenCalledOnce();
  });

  it('works with shift modifier', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('shift', 'KeyP', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyP',
        shiftKey: true,
        ctrlKey: false,
        altKey: false,
        metaKey: false,
      }),
    );

    expect(callback).toHaveBeenCalledOnce();
  });

  it('does not call callback when multiple modifiers are pressed but only one expected', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('ctrl', 'KeyS', callback));

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyS',
        ctrlKey: true,
        shiftKey: true,
        altKey: false,
        metaKey: false,
      }),
    );

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not throw when callback is undefined', () => {
    renderHook(() => useHotkey('ctrl', 'KeyS', undefined));

    expect(() =>
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'KeyS',
          ctrlKey: true,
          altKey: false,
          metaKey: false,
          shiftKey: false,
        }),
      ),
    ).not.toThrow();
  });

  it('calls preventDefault when hotkey matches', () => {
    const callback = vi.fn();
    renderHook(() => useHotkey('ctrl', 'KeyS', callback));

    const event = new KeyboardEvent('keydown', {
      code: 'KeyS',
      ctrlKey: true,
      altKey: false,
      metaKey: false,
      shiftKey: false,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalledOnce();
  });

  it('removes event listener on unmount', () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useHotkey('ctrl', 'KeyS', callback));

    unmount();

    document.dispatchEvent(
      new KeyboardEvent('keydown', {
        code: 'KeyS',
        ctrlKey: true,
        altKey: false,
        metaKey: false,
        shiftKey: false,
      }),
    );

    expect(callback).not.toHaveBeenCalled();
  });
});
