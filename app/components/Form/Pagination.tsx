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

interface PaginationProps {
  totalHits: number;
  rowsPerPage: number;
}

export const Pagination = ({ totalHits, rowsPerPage }: PaginationProps) => {
  // 1000 träffar
  // 100 träffar per sida
  // 10 sidor
  const numberOfPages = totalHits / rowsPerPage;
  console.log({ totalHits, rowsPerPage, numberOfPages });
  const buttons = [];
  for (let i = 0; i < numberOfPages; i++) {
    buttons.push(<button key={i}>{i + 1}</button>);
  }

  return <div style={{ display: 'flex' }}>{buttons}</div>;
};
