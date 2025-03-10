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
import { LinkedRecord } from '../../LinkedRecord/LinkedPresentationRecord';
import { use } from 'react';
import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { get } from 'lodash-es';
import { useValueFromData } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
interface ControlledLinkedRecordProps {
  recordType: string;
  name: string;
  presentationRecordLinkId: string;
}
export const ControlledLinkedRecord = (props: ControlledLinkedRecordProps) => {
  const defaultValue = useValueFromData(props.name);

  if (!defaultValue) {
    return null;
  }

  return (
    <>
      <input type='hidden' value={defaultValue} name={props.name} />
      <LinkedRecord
        recordType={props.recordType}
        id={defaultValue}
        presentationRecordLinkId={props.presentationRecordLinkId}
      />
    </>
  );
};
