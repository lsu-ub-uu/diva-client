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

import type { BFFDataRecord } from '@/types/record';

export const getRecordTitle = (record: BFFDataRecord): string | undefined => {
  const data = record.data;
  const root = data.output;

  if (record.recordType === 'diva-output') {
    return root?.titleInfo?.title?.value;
  }

  if (record.recordType === 'diva-person') {
    const familyName =
      root?.authority.name_type_personal.namePart_type_family[0]?.value;
    const givenName =
      root?.authority.name_type_personal.namePart_type_given[0]?.value;

    if (!familyName && !givenName) {
      return undefined;
    }
    return `${familyName ?? ''} ${givenName ?? ''}`;
  }

  if (record.recordType === 'diva-project') {
    return root.titleInfo.title.value;
  }
};
