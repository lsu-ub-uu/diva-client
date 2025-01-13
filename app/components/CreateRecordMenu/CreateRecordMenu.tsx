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

import { Button, Menu, MenuItem } from '@mui/material';
import type { Option } from '@/components';
import AddIcon from '@mui/icons-material/Add';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';

interface CreateRecordMenuProps {
  validationTypes: Option[] | null;
}

export const CreateRecordMenu = ({
  validationTypes,
}: CreateRecordMenuProps) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const addButtonRef = useRef(null);
  if (validationTypes === null || validationTypes.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant='outlined'
        color='primary'
        startIcon={<AddIcon />}
        ref={addButtonRef}
        onClick={() => setMenuOpen(true)}
      >
        {t('divaClient_createRecordText')}
      </Button>

      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorEl={addButtonRef.current}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {validationTypes.map((option) => (
          <MenuItem
            key={option.value}
            component={Link}
            to={`/create?validationType=${option.value}`}
          >
            {t(option.label)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
