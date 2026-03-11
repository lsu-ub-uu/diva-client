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

import { sessionContext } from '@/auth/sessionMiddleware.server';
import type {
  BFFMetadataGroup,
  BFFPresentationGroup,
  BFFPresentationRecordLink,
  Dependencies,
} from '@/cora/bffTypes.server';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { createLinkedRecordDefinition } from '@/data/formDefinition/createLinkedRecordDefinition.server';
import { assertDefined } from '@/utils/invariant';
import { getDependencies } from 'server/dependencies/depencencies';
import type { Route } from './+types/getRecord';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  try {
    const { auth } = context.get(sessionContext);
    const { recordType, recordId } = params;

    const url = new URL(request.url);

    const presentationRecordLinkId = url.searchParams.get(
      'presentationRecordLinkId',
    );

    assertDefined(
      presentationRecordLinkId,
      'Missing presentationRecordLinkId param',
    );

    const dependencies = await getDependencies();
    const recordResponse = await getRecordDataById<RecordWrapper>(
      recordType,
      recordId,
      auth?.data.token,
    );
    const recordWrapper = recordResponse.data;

    const { presentationGroup, metadataGroup } =
      getGroupsFromPresentationLinkId(dependencies, presentationRecordLinkId);

    const presentation = createLinkedRecordDefinition(
      dependencies,
      metadataGroup,
      presentationGroup as BFFPresentationGroup,
    );

    return { record: recordWrapper, presentation };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
};

const getGroupsFromPresentationLinkId = (
  dependencies: Dependencies,
  presentationLinkId: string,
) => {
  const presentationLink = dependencies.presentationPool.get(
    presentationLinkId,
  ) as BFFPresentationRecordLink;
  const presentationId =
    presentationLink.linkedRecordPresentations !== undefined
      ? presentationLink.linkedRecordPresentations[0].presentationId
      : presentationLink.id;
  const presentationGroup = dependencies.presentationPool.get(
    presentationId,
  ) as BFFPresentationGroup;
  const metadataGroup = dependencies.metadataPool.get(
    presentationGroup.presentationOf,
  ) as BFFMetadataGroup;
  return { presentationGroup, metadataGroup };
};
