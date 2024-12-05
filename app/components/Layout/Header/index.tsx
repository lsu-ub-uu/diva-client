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

import { Box, Button, Container, Grid, Link } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { Form, Link as RouterLink, useLocation } from 'react-router';
import divaLogo from '../../../assets/divaLogo.svg';
import Login from '@/components/Layout/Header/Login/Login';
import { LanguageSwitcher } from '@/components/Layout/Header/LanguageSwitcher';

export const Header = () => {
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  return (
    <Box
      sx={{ py: 2, borderBottom: '1px solid #eee', backgroundColor: '#fff' }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={2}
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid item>
            <Link
              component={RouterLink}
              to='/'
            >
              <img
                src={divaLogo}
                className='logo'
                alt='logo'
                style={{ width: 160 }}
              />
            </Link>
          </Grid>
          <Grid
            item
            xs
          />
          <Grid item>
            <Form
              action='/refreshDefinitions'
              method='POST'
            >
              <input
                type='hidden'
                name='returnTo'
                value={returnTo}
              />
              <Button type='submit'>
                Refresh Def <CachedIcon />
              </Button>
            </Form>
          </Grid>
          <Grid item>
            <LanguageSwitcher />
          </Grid>
          <Grid item>
            <Login />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
