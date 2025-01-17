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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Stack } from '@mui/material';

import { RecordForm } from '@/components/Form/RecordForm';
import type { BFFDataRecord } from '@/types/record';
import type { RecordFormSchema } from '@/components/FormGenerator/types';
import {
  linksFromFormSchema,
  useSectionScroller,
} from '@/components/NavigationPanel/utils';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';

interface UpdateRecordPageProps {
  record: BFFDataRecord;
  formDefinition: RecordFormSchema;
}

export const UpdateRecordPage = ({
  record,
  formDefinition,
}: UpdateRecordPageProps) => {
  const activeSection = useSectionScroller();
  const lastUpdate =
    record?.updated && record.updated[record.updated?.length - 1].updateAt;

  return (
    <SidebarLayout
      sidebarContent={
        <NavigationPanel
          links={
            formDefinition ? linksFromFormSchema(formDefinition) || [] : []
          }
          activeLinkName={activeSection}
        />
      }
    >
      <Stack spacing={2}>
        <RecordForm
          key={lastUpdate}
          record={record}
          formSchema={formDefinition}
        />
      </Stack>
    </SidebarLayout>
  );
};
