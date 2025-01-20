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

import { Alert, Box, Button, Skeleton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { SidebarLayout } from '@/components/Layout/SidebarLayout/SidebarLayout';
import { Suspense } from 'react';
import { Await, useLoaderData } from '@remix-run/react';
import { AsyncErrorBoundary } from '@/components/DefaultErrorBoundary/AsyncErrorBoundary';
import type { loader } from '@/routes/_index';
import { CreateRecordMenu } from '@/components/CreateRecordMenu/CreateRecordMenu';
import { RecordSearch } from '@/components/RecordSearch/RecordSearch';

const searchType = 'diva-outputSimpleSearch';

export const HomePage = () => {
  const { t } = useTranslation();
  const { searchForm, validationTypes, searchResults, query } =
    useLoaderData<typeof loader>();

  return (
    <SidebarLayout
      sidebarContent={
        <Alert
          icon={<PriorityHighIcon fontSize='inherit' />}
          severity='warning'
        >
          {t('divaClient_metadataWarningText')}
        </Alert>
      }
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>{t('divaClient_searchRecordText')}</h1>

          <Suspense
            fallback={
              <Skeleton>
                <Button>Skapa</Button>
              </Skeleton>
            }
          >
            <Await
              resolve={validationTypes}
              errorElement={<AsyncErrorBoundary />}
            >
              {(validationTypes) => (
                <CreateRecordMenu validationTypes={validationTypes} />
              )}
            </Await>
          </Suspense>
        </Box>

        <Suspense fallback={<Skeleton height={296} />}>
          <Await
            resolve={searchForm}
            errorElement={<AsyncErrorBoundary />}
          >
            {(searchForm) => (
              <RecordSearch
                searchForm={searchForm}
                searchType={searchType}
                query={query}
                searchResults={searchResults}
              />
            )}
          </Await>
        </Suspense>
      </Stack>
    </SidebarLayout>
  );
};
