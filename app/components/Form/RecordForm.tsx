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

import { AppBar, Box, Button, Container, Grid, Toolbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createDefaultValuesFromFormSchema,
  RecordData,
} from '../FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { FormGenerator } from '@/components';
import { RecordFormSchema } from '../FormGenerator/types';
import { BFFDataRecord } from '@/types/record';
import { RemixFormProvider, useRemixForm } from 'remix-hook-form';
import { Form, useNavigation } from '@remix-run/react';

export interface RecordFormProps {
  record?: BFFDataRecord;
  formSchema: RecordFormSchema;
}

export const RecordForm = ({ record, formSchema }: RecordFormProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const submitting = navigation.state === 'submitting';
  const defaultValues = createDefaultValuesFromFormSchema(
    formSchema,
    record?.data as RecordData,
  );
  const methods = useRemixForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues,
    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });
  const { handleSubmit, reset } = methods;

  return (
    <Box
      component={Form}
      method='POST'
      sx={{
        width: '100%',
        opacity: submitting ? 0.5 : 1,
        pointerEvents: submitting ? 'none' : 'all',
      }}
      onSubmit={handleSubmit}
    >
      <RemixFormProvider {...methods}>
        <FormGenerator formSchema={formSchema} />
      </RemixFormProvider>

      <AppBar
        position='fixed'
        style={{
          backgroundColor: '#eee',
          top: 'auto',
          bottom: 0,
          display: 'block',
        }}
      >
        <Container maxWidth='lg'>
          <Grid container>
            <Grid
              item
              xs={3}
            />
            <Grid
              item
              xs={9}
            >
              <Toolbar>
                <Box
                  component='div'
                  sx={{ mt: 1, mb: 1, width: '100%' }}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Button
                    disabled={submitting}
                    disableRipple
                    variant='contained'
                    color='secondary'
                    sx={{ height: 40 }}
                    onClick={() => reset()}
                  >
                    {t('divaClient_ResetButtonText')}
                  </Button>
                  <Button
                    disabled={submitting}
                    type='submit'
                    disableRipple
                    variant='contained'
                    color='primary'
                    sx={{ height: 40 }}
                  >
                    {t('divaClient_SubmitButtonText')}
                  </Button>
                </Box>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};