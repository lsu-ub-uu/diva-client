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

import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { RecordWrapper } from '@/cora/cora-data/types.server';
import { transformRecord } from '@/cora/transform/transformRecord.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type * as TYPES from '@/cora/transform/bffTypes.server';
import type { BFFPresentationGroup } from '@/cora/transform/bffTypes.server';
import { createLinkedRecordDefinition } from '@/data/formDefinition/createLinkedRecordDefinition.server';

interface GetRecordByRecordTypeAndRecordIdArgs {
  dependencies: Dependencies;
  recordType: string;
  recordId: string;
  authToken?: string;
  presentationRecordLinkId?: string;
  decorated?: boolean;
}

export const getRecordByRecordTypeAndRecordId = async ({
  dependencies,
  recordType,
  recordId,
  authToken,
  presentationRecordLinkId,
  decorated = false,
}: GetRecordByRecordTypeAndRecordIdArgs) => {
  const response = await getRecordDataById<RecordWrapper>(
    recordType,
    recordId,
    authToken,
    decorated,
  );
  const recordWrapper = response.data;
  const record = transformRecord(dependencies, recordWrapper);

  if (presentationRecordLinkId !== undefined) {
    const { presentationGroup, metadataGroup } =
      getGroupsFromPresentationLinkId(dependencies, presentationRecordLinkId);

    record.presentation = createLinkedRecordDefinition(
      dependencies,
      metadataGroup,
      presentationGroup as BFFPresentationGroup,
    );
    const listPresentationGroup = dependencies.presentationPool.get(
      dependencies.recordTypePool.get(recordType).listPresentationViewId,
    ) as BFFPresentationGroup;
    try {
      record.listPresentation = createLinkedRecordDefinition(
        dependencies,
        metadataGroup,
        listPresentationGroup as BFFPresentationGroup,
      );
    } catch (error) {
      console.error(
        `Failed to create list presentation for presentationRecordLinkId ${presentationRecordLinkId}`,
        error,
      );
    }
  }

  return record;
};

const getGroupsFromPresentationLinkId = (
  dependencies: Dependencies,
  presentationLinkId: string,
) => {
  const presentationLink = dependencies.presentationPool.get(
    presentationLinkId,
  ) as TYPES.BFFPresentationRecordLink;
  const presentationId =
    presentationLink.linkedRecordPresentations !== undefined
      ? presentationLink.linkedRecordPresentations[0].presentationId
      : presentationLink.id;
  const presentationGroup = dependencies.presentationPool.get(
    presentationId,
  ) as BFFPresentationGroup;
  const metadataGroup = dependencies.metadataPool.get(
    presentationGroup.presentationOf,
  ) as TYPES.BFFMetadataGroup;
  return { presentationGroup, metadataGroup };
};
