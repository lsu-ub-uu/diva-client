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

import { Accordion } from '@/components/Accordion/Accordion';
import { AccordionContent } from '@/components/Accordion/AccordionContent';
import { AccordionExpandButton } from '@/components/Accordion/AccordionExpandButton';
import { AccordionTitle } from '@/components/Accordion/AccordionTitle';
import { Component } from '@/components/FormGenerator/Component';
import componentStyles from '@/components/FormGenerator/components/FormComponent.module.css';
import type {
  FormComponent,
  PresentationSize,
} from '@/components/FormGenerator/types';
import { get, isEmpty } from 'lodash-es';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';

interface ComponentPresentationSwitcherProps {
  component: FormComponent;
  idx: number;
  path: string;
  currentComponentNamePath: string;
  parentPresentationStyle?: string;
}

type PresentationState = 'default' | 'alternative';

export const AlternativePresentationSwitcher = (
  props: ComponentPresentationSwitcherProps,
) => {
  const { component, currentComponentNamePath } = props;

  const { t } = useTranslation();

  const [currentPresentation, setCurrentPresentation] =
    useState<PresentationState>('default');

  const {
    presentationSize,
    title,
    titleHeadlineLevel,
    defaultPresentation,
    alternativePresentation,
    expanded,
  } = getAccordionConfiguration(component, currentPresentation);

  const [prevValidationErrors, setPrevValidationErrors] = useState(false);
  const {
    formState: { errors },
  } = useRemixFormContext();
  const containsValidationError = !isEmpty(
    get(errors, currentComponentNamePath),
  );

  // For accordion with single presentation, expand it when validation errors appear
  if (
    !alternativePresentation &&
    containsValidationError &&
    !prevValidationErrors
  ) {
    setPrevValidationErrors(true);
    setCurrentPresentation('alternative');
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={() =>
        setCurrentPresentation(
          currentPresentation === 'alternative' ? 'default' : 'alternative',
        )
      }
      className={componentStyles['component']}
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
      presentationSize={presentationSize}
    >
      {title && (
        <AccordionTitle headlineLevel={titleHeadlineLevel}>
          {t(title)}
        </AccordionTitle>
      )}
      {alternativePresentation !== undefined ? ( // Switch between two presentations
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
      ) : (
        // Switch between no content and single presentation
        <AccordionContent
          className={componentStyles['container']}
          hidden={!expanded}
        >
          <Component
            {...props}
            component={{ ...component, title: undefined } as FormComponent}
          />
        </AccordionContent>
      )}
      {!title && <AccordionExpandButton />}
    </Accordion>
  );
};

const getAccordionConfiguration = (
  component: FormComponent,
  currentPresentation: PresentationState,
) => {
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

  const expanded = isExpanded(
    currentPresentation,
    presentationSize,
    alternativePresentation,
  );

  return {
    presentationSize,
    title,
    titleHeadlineLevel,
    defaultPresentation,
    alternativePresentation,
    expanded,
  };
};

const isExpanded = (
  currentPresentation: PresentationState,
  presentationSize: PresentationSize | undefined,
  alternativePresentation: FormComponent | undefined,
) => {
  if (alternativePresentation !== undefined) {
    return isDualPresentationAccordionExpanded(
      currentPresentation,
      presentationSize,
    );
  }

  return isSinglePresentationAccordionExpanded(
    currentPresentation,
    presentationSize,
  );
};

export const isSinglePresentationAccordionExpanded = (
  currentPresentation: PresentationState,
  presentationSize?: PresentationSize,
) => {
  if (presentationSize === 'singleInitiallyVisible') {
    return currentPresentation === 'default';
  }
  return currentPresentation === 'alternative';
};

export const isDualPresentationAccordionExpanded = (
  currentPresentation: PresentationState,
  presentationSize?: PresentationSize,
) => {
  if (presentationSize === 'firstLarger') {
    return currentPresentation === 'default';
  }

  return currentPresentation === 'alternative';
};
