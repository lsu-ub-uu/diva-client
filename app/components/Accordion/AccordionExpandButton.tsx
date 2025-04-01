/*
 * Copyright 2025 Uppsala University Library
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

import { use } from 'react';
import { Button, type ButtonProps } from '@/components/Button/Button';
import { AccordionContext } from '@/components/Accordion/Accordion';
import { getSwitchButtonProps } from '@/components/Accordion/AccordionTitle';
import styles from './Accordion.module.css';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export const AccordionExpandButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const { expanded, contentId, onChange, presentationSize } =
    use(AccordionContext);
  const { label, icon } = getSwitchButtonProps(expanded, presentationSize);

  return (
    <Button
      type='button'
      className={clsx(styles['expand-button'], props.className)}
      variant='icon'
      aria-label={t(label)}
      aria-controls={contentId}
      aria-expanded={expanded}
      onClick={() => onChange(!expanded)}
      {...props}
    >
      {icon}
    </Button>
  );
};
