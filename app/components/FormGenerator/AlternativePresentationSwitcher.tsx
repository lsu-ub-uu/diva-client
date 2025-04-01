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

import type {
  FormComponent,
  PresentationSize,
} from '@/components/FormGenerator/types';
import { useState } from 'react';
import { Component } from '@/components/FormGenerator/Component';
import componentStyles from '@/components/FormGenerator/components/FormComponent.module.css';
import { useTranslation } from 'react-i18next';
import { Accordion } from '@/components/Accordion/Accordion';
import { AccordionContent } from '@/components/Accordion/AccordionContent';
import { AccordionTitle } from '@/components/Accordion/AccordionTitle';
import { AccordionExpandButton } from '@/components/Accordion/AccordionExpandButton';

interface ComponentPresentationSwitcherProps {
  component: FormComponent;
  idx: number;
  path: string;
  parentPresentationStyle?: string;
}

export const AlternativePresentationSwitcher = (
  props: ComponentPresentationSwitcherProps,
) => {
  const { t } = useTranslation();
  const [currentPresentation, setCurrentPresentation] = useState<
    'default' | 'alternative'
  >('default');

  const switchPresentation = () =>
    setCurrentPresentation(
      currentPresentation === 'alternative' ? 'default' : 'alternative',
    );

  const { component } = props;
  const presentationSize =
    'presentationSize' in component ? component.presentationSize : undefined;
  const title = 'title' in component ? component.title : undefined;
  const titleHeadlineLevel =
    'titleHeadlineLevel' in component
      ? component.titleHeadlineLevel
      : undefined;

  const defaultPresentation = {
    ...component,
    alternativePresentation: undefined,
    title: undefined,
  };

  const alternativePresentation = component.alternativePresentation && {
    ...component.alternativePresentation,
    title: undefined,
  };

  if (!alternativePresentation) {
    if (!title) {
      return <Component {...props} />;
    }

    const expanded = isSinglePresentationAccordionExpanded(
      currentPresentation,
      presentationSize,
    );

    return (
      <Accordion
        expanded={expanded}
        onChange={switchPresentation}
        className={componentStyles['component']}
        data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
        presentationSize={presentationSize}
      >
        <AccordionTitle headlineLevel={titleHeadlineLevel}>
          {t(title)}
        </AccordionTitle>
        {expanded && (
          <AccordionContent className={componentStyles['container']}>
            <Component
              {...props}
              component={{ ...component, title: undefined }}
            />
          </AccordionContent>
        )}
      </Accordion>
    );
  }

  const expanded = isDualPresentationAccordionExpanded(
    currentPresentation,
    presentationSize,
  );

  return (
    <Accordion
      expanded={expanded}
      onChange={switchPresentation}
      className={componentStyles['component']}
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
      presentationSize={presentationSize}
    >
      {title && (
        <AccordionTitle headlineLevel={titleHeadlineLevel}>
          {t(title)}
        </AccordionTitle>
      )}
      <AccordionContent className={componentStyles['container']}>
        <Component
          {...props}
          component={
            currentPresentation === 'alternative'
              ? alternativePresentation
              : defaultPresentation
          }
        />
      </AccordionContent>
      {!title && <AccordionExpandButton />}
    </Accordion>
  );
};

export const isSinglePresentationAccordionExpanded = (
  currentPresentation: 'default' | 'alternative',
  presentationSize?: PresentationSize,
) => {
  if (presentationSize === 'singleInitiallyVisible') {
    return currentPresentation === 'default';
  }
  return currentPresentation === 'alternative';
};

export const isDualPresentationAccordionExpanded = (
  currentPresentation: 'default' | 'alternative',
  presentationSize?: PresentationSize,
) => {
  if (presentationSize === 'firstLarger') {
    return currentPresentation === 'default';
  }

  return currentPresentation === 'alternative';
};
