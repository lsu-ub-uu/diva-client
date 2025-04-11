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

import { convertChildStylesToGridColSpan } from '../CoraDataUtilsPresentations.server';

describe('converting childStyles to gridColspan', () => {
  it.each([
    [['threeChildStyle'], 3],
    [['twelveChildStyle'], 12],
    [[], 12],
    [['inline', 'frame'], 12],
    [['inline', 'frame', 'fiveChildStyle'], 5],
    [['inline', 'twoChildStyle', 'frame', 'fiveChildStyle'], 2],
  ])(
    'should be able to convert childStyle "%s" to grid col span to be %d',
    (args1, args2) => {
      const styles: string[] = args1;
      const gridColSpan = convertChildStylesToGridColSpan(styles);
      expect(gridColSpan).toStrictEqual(args2);
    },
  );
});
