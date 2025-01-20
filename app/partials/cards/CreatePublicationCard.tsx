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

import { useTranslation } from 'react-i18next';
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  NativeSelect,
  OutlinedInput,
} from '@mui/material';
import { Await, Form, useLoaderData, useNavigation } from '@remix-run/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { loader } from '@/routes/home';
import { Suspense } from 'react';
import { AsyncErrorBoundary } from '@/components/DefaultErrorBoundary/AsyncErrorBoundary';
import { LegacyCard } from '@/components/LegacyCard/LegacyCard';

const formAction = '/create';

export const CreatePublicationCard = () => {
  const { validationTypes } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const loading = navigation.formAction === formAction;

  return (
    <LegacyCard
      title={t('divaClient_createPublicationTypeText')}
      variant='variant1'
      tooltipTitle={
        t('divaClient_createPublicationTypeTooltipTitleText') as string
      }
      tooltipBody={
        t('divaClient_createPublicationTypeTooltipBodyText') as string
      }
    >
      <Suspense fallback={<CircularProgress />}>
        <Await
          resolve={validationTypes}
          errorElement={<AsyncErrorBoundary />}
        >
          {(validationTypes) => (
            <Form action={formAction}>
              <Grid
                container
                spacing={2}
                justifyContent='space-between'
                alignItems='flex-start'
              >
                <Grid size={{ xs: 12, sm: 6 }}>
                  <NativeSelect
                    defaultValue=''
                    name='validationType'
                    input={<OutlinedInput />}
                    size='small'
                    fullWidth
                    required
                  >
                    <option
                      value=''
                      disabled
                    >
                      {t('divaClient_selectPublicationTypeText')}
                    </option>
                    {(validationTypes ?? []).map((validationType) => (
                      <option
                        key={validationType.value}
                        value={validationType.value}
                      >
                        {t(validationType.label)}
                      </option>
                    ))}
                  </NativeSelect>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    disabled={loading}
                    type='submit'
                    disableRipple
                    variant='contained'
                    endIcon={
                      loading ? (
                        <CircularProgress size='1em' />
                      ) : (
                        <ArrowForwardIcon />
                      )
                    }
                  >
                    {t('divaClient_continueText')}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Await>
      </Suspense>
    </LegacyCard>
  );
};
