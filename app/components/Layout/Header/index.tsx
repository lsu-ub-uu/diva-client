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

import { Box, Container } from '@mui/material';
import { Form, Link, useLocation } from 'react-router';
import divaLogo from '../../../assets/divaLogo.svg';
import Login from '@/components/Layout/Header/Login/Login';
import { LanguageSwitcher } from '@/components/Layout/Header/LanguageSwitcher';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { CachedIcon } from '@/icons';
import { Button } from '@/components/Button/Button';

export const Header = () => {
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);
  const devMode = useIsDevMode();
  return (
    <Box sx={{ py: 2, borderBottom: '1px solid #eee' }}>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',

            gap: 2,
          }}
        >
          <Box sx={{ mr: 'auto' }}>
            <Link to='/'>
              <img
                src={divaLogo}
                className='logo'
                alt='logo'
                style={{ width: 160 }}
              />
            </Link>
          </Box>
          {devMode && <Link to='/design-system'>Design system</Link>}
          {devMode && (
            <Form action='/refreshDefinitions' method='POST'>
              <input type='hidden' name='returnTo' value={returnTo} />
              <Button variant='tertiary'>
                Refresh Def <CachedIcon />
              </Button>
            </Form>
          )}

          <LanguageSwitcher />

          <Login />
        </Box>
      </Container>
    </Box>
  );
};
