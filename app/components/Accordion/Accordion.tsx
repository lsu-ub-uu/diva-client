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

import { createContext, type HTMLProps, type ReactNode, useId } from 'react';
import type { PresentationSize } from '@/components/FormGenerator/types';
import styles from './Accordion.module.css';
import clsx from 'clsx';

interface AccordionProps extends Omit<HTMLProps<HTMLDivElement>, 'onChange'> {
  expanded: boolean;
  onChange: (expanded: boolean) => void;
  children?: ReactNode;
  presentationSize?: PresentationSize;
  invalid?: boolean;
  hasValue?: boolean;
}

export const Accordion = ({
  expanded,
  onChange,
  presentationSize,
  children,
  className,
  ...rest
}: AccordionProps) => {
  const id = useId();

  return (
    <div
      className={clsx(styles['accordion'], className)}
      data-expanded={expanded}
      {...rest}
    >
      <AccordionContext
        value={{
          expanded,
          onChange,
          presentationSize,
          contentId: `${id}-content`,
          titleId: `${id}-title`,
        }}
      >
        {children}
      </AccordionContext>
    </div>
  );
};

interface AccordionContextType {
  expanded: boolean;
  onChange: (expanded: boolean) => void;
  presentationSize?: PresentationSize;
  contentId: string;
  titleId: string;
}

export const AccordionContext = createContext<AccordionContextType>({
  expanded: false,
  onChange: () => {},
  contentId: '',
  titleId: '',
});
