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
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';

interface LinkButtonProps {
  text: string;
  href: string;
}

export const LinkButton = (props: LinkButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      component='a'
      href={props.href}
      target='_blank'
      rel='noopener noreferrer'
      endIcon={<LaunchIcon />}
      color='primary'
    >
      {t(props.text)}
    </Button>
  );
};
