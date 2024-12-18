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

import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import React, { type ReactNode } from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import { ControlledLinkedRecord } from '@/components/Controlled';
import { useRemixFormContext } from 'remix-hook-form';

interface RecordLinkWithLinkedPresentationProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponentRecordLink;
  name: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const RecordLinkWithLinkedPresentation = ({
  reactKey,
  renderElementGridWrapper,
  component,
  name,
  attributes,
  actionButtonGroup,
}: RecordLinkWithLinkedPresentationProps) => {
  const { getValues, control } = useRemixFormContext();
  const hasValue = checkIfComponentHasValue(getValues, name);
  return (
    <React.Fragment key={`${reactKey}_${name}`}>
      {hasValue ? (
        <Grid
          key={reactKey}
          size={{
            xs: 12,
            sm: renderElementGridWrapper ? component.gridColSpan : 12,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {attributes} {actionButtonGroup}
          </Box>
          <ControlledLinkedRecord
            control={control}
            name={name}
            recordType={component.recordLinkType ?? ''}
            presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
          />
        </Grid>
      ) : null}
    </React.Fragment>
  );
};
