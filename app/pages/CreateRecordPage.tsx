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
import type { RecordFormSchema } from '@/components/FormGenerator/types';
import { RecordForm } from '@/components/Form/RecordForm';
import { NavigationPanel } from '@/components/NavigationPanel/NavigationPanel';
import {
  linksFromFormSchema,
  useSectionScroller,
} from '@/components/NavigationPanel/utils';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';

interface CreateRecordPageProps {
  formDefinition: RecordFormSchema;
}

export default function CreateRecordPage({
  formDefinition,
}: CreateRecordPageProps) {
  const activeSection = useSectionScroller();

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
        <RecordForm formSchema={formDefinition} />
      </Stack>
    </SidebarLayout>
  );
}
