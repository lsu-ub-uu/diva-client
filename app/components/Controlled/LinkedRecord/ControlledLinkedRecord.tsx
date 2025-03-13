/*
 * Copyright 2023 Uppsala University Library
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
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { LinkedRecord } from '../../LinkedRecord/LinkedPresentationRecord';
interface ControlledLinkedRecordProps {
  recordType: string;
  name: string;
  presentationRecordLinkId: string;
  control?: Control<any>;
}
export const ControlledLinkedRecord = (props: ControlledLinkedRecordProps) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => {
        return (
          <span id='controled-linked-record'>
            {field.value && (
              <LinkedRecord
                recordType={props.recordType}
                id={field.value}
                presentationRecordLinkId={props.presentationRecordLinkId}
              />
            )}
          </span>
        );
      }}
    />
  );
};
