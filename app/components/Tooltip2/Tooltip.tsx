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

import {
  Description as HuiDescription,
  Dialog as HuiDialog,
  DialogPanel as HuiDialogPanel,
  DialogTitle as HuiDialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import { Button } from '@/components/Button/Button';
import { InfoIcon } from '@/icons';
import styles from './Tooltip.module.css'

interface TooltipProps {
  title: string;
  body: string;
}

export const Tooltip = ({ title, body }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{paddingBottom: '1em'}}>
      <Button variant='icon' onClick={() => setIsOpen(true)}>
        <InfoIcon />
      </Button>
      <HuiDialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.tooltip} id='aaaaaaaaa'>
        <HuiDialogPanel className=''>
          <HuiDialogTitle className=''>{title}</HuiDialogTitle>
          <HuiDescription>{body}</HuiDescription>
          <div className=''>
            <Button variant='tertiary' onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </HuiDialogPanel>
      </HuiDialog>
    </div>
  );
};
