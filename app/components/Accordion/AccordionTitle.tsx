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

import { type HTMLProps, use } from 'react';
import type { FormComponentMetadata } from '@/components/FormGenerator/types';
import {
  CircleFilledIcon,
  CollapseContentIcon,
  ExpandContentIcon,
  SwapIcon,
  WarningIcon,
} from '@/icons';
import { AccordionContext } from '@/components/Accordion/Accordion';
import styles from './Accordion.module.css';
import clsx from 'clsx';

interface AccordionTitleProps extends HTMLProps<HTMLHeadingElement> {
  headlineLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const AccordionTitle = ({
  headlineLevel,
  children,
  className,
  ...rest
}: AccordionTitleProps) => {
  const { expanded, contentId, titleId, onChange, presentationSize } =
    use(AccordionContext);
  const { icon } = getSwitchButtonProps(expanded, presentationSize);
  const HeadingElement = headlineLevel ?? 'h2';
  return (
    <HeadingElement className={clsx(styles['title'], className)} {...rest}>
      <button
        type='button'
        aria-expanded={expanded}
        id={titleId}
        aria-controls={contentId}
        onClick={() => onChange(!expanded)}
      >
        {children}
        <span className={styles['title-icon-wrapper']}>
          <CircleFilledIcon
            className={styles['value-icon']}
            aria-hidden='true'
          />
          <WarningIcon className={styles['error-icon']} aria-hidden='true' />
          {icon}
        </span>
      </button>
    </HeadingElement>
  );
};

export const getSwitchButtonProps = (
  expanded: boolean,
  presentationSize: FormComponentMetadata['presentationSize'],
) => {
  if (presentationSize === 'bothEqual') {
    return { label: 'divaClient_swapPresentationText', icon: <SwapIcon /> };
  }
  return expanded
    ? { label: 'divaClient_showLessText', icon: <CollapseContentIcon /> }
    : { label: 'divaClient_showMoreText', icon: <ExpandContentIcon /> };
};
