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

import { AccordionContext } from '@/components/Accordion/Accordion';
import { Button, type ButtonProps } from '@/components/Button/Button';
import { ChevronDownIcon } from '@/icons';
import clsx from 'clsx';
import { use } from 'react';

export const AccordionExpandLink = (props: ButtonProps) => {
  const { expanded, contentId, onChange } = use(AccordionContext);

  return (
    <Button
      type='button'
      className={clsx(props.className)}
      variant='tertiary'
      aria-controls={contentId}
      aria-expanded={expanded}
      onClick={() => onChange(!expanded)}
      {...props}
    >
      {props.children} <ChevronDownIcon />
    </Button>
  );
};
