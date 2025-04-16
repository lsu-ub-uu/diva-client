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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { describe, expect, it } from 'vitest';
import { isComponentGroupAndSingularForStyling } from '../ActionButtonGroup';

describe('ActionButtonGroup', () => {
  it('isComponentGroupAndSingular returns true for group true and hideMoveButtons true', () => {
    const actual = isComponentGroupAndSingularForStyling('group', true);
    expect(actual).toBe(true);
  });
  it('isComponentGroupAndSingular returns false for group true and hideMoveButtons false', () => {
    const actual = isComponentGroupAndSingularForStyling('group', false);
    expect(actual).toBe(false);
  });
  it('isComponentGroupAndSingular returns false for group false and hideMoveButtons false', () => {
    const actual = isComponentGroupAndSingularForStyling('textVariable', false);
    expect(actual).toBe(false);
  });
  it('isComponentGroupAndSingular returns false for group false and hideMoveButtons true', () => {
    const actual = isComponentGroupAndSingularForStyling('textVariable', true);
    expect(actual).toBe(false);
  });
});
