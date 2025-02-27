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

import { Outlet } from 'react-router';
import { type Route } from '.react-router/types/app/routes/+types/recordType';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const dependencies = await context.dependencies;
  const recordType = dependencies.recordTypePool.get(params.recordType);
  const recordTypeMetadata = dependencies.metadataPool.get(
    recordType.metadataId,
  );

  return { breadcrumb: context.i18n.t(recordTypeMetadata.textId) };
};

export default function RecordTypeRoute() {
  return <Outlet />;
}
