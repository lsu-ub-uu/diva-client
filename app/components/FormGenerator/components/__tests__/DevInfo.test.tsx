/*
 * Copyright 2024 Uppsala University Library
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

import { DevInfoButton } from '@/components/FormGenerator/components/DevInfo';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('DevInfo', () => {
  it('does not render DevInfoButton when local storage does not contain diva-dev', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
    });

    render(<DevInfoButton onClick={vi.fn()} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does render DevInfoButton when local storage does not contain diva-dev', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi
        .fn()
        .mockImplementation((key: string) =>
          key === 'diva-dev' ? true : null,
        ),
    });

    render(<DevInfoButton onClick={vi.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
