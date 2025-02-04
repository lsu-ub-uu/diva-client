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

import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/Form/Pagination';

describe('<Pagination />', () => {
  it.each([
    [10, 1000, 100], // Evenly divisible
    [11, 1001, 100], // One hit overlowing to next page
    [20, 100, 5], // 5 rows per page
    [0, 10, 10], // Single page
    [7, 67, 10], // Odd number of rows
    [50, 50, 1], // One item per page
    [0, 3, 10], // Less hits than rowsPerPage
    [0, 0, 10], // No hits
  ])(
    'renders %d pages for %d hits with %d rows per page',
    (expectedNumberOfPages, totalHits, rowsPerPage) => {
      render(
        <Pagination
          rowsPerPage={rowsPerPage}
          totalHits={totalHits}
        />,
      );

      expect(screen.getAllByRole('button')).toHaveLength(expectedNumberOfPages);
    },
  );

  it.todo('has a maximum number of pages');
});
