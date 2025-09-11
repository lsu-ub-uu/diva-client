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

import { Component } from '@/components/FormGenerator/Component';
import type {
  FormComponent,
  FormComponentGroup,
  PresentationSize,
} from '@/components/FormGenerator/types';
import { get, isEmpty } from 'lodash-es';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { Card } from '../Card/Card';
import { CardContent } from '../Card/CardContent';
import { CardExpandButton } from '../Card/CardExpandButton';
import { CardHeader } from '../Card/CardHeader';
import { CardTitle } from '../Card/CardTitle';
import { Group } from './components/Group';
import { isComponentGroup } from './formGeneratorUtils/formGeneratorUtils';

interface ComponentPresentationSwitcherProps {
  component: FormComponent;
  anchorId: string | undefined;
  parentPath: string;
  currentComponentNamePath: string;
  actionButtonGroup?: React.ReactNode;
  parentPresentationStyle?: string;
  isAppended?: boolean;
}

type PresentationState = 'default' | 'alternative';

export const AlternativePresentationSwitcher = (
  props: ComponentPresentationSwitcherProps,
) => {
  const { component, currentComponentNamePath } = props;

  const { t } = useTranslation();

  const [currentPresentation, setCurrentPresentation] =
    useState<PresentationState>(
      getInitialPresentation(component, props.isAppended ?? false),
    );

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
    setCurrentPresentation(
      presentationSize === 'singleInitiallyVisible' ? 'default' : 'alternative',
    );
  }

  if (isComponentGroup(component) && title) {
    return (
      <Group
        expanded={presentationSize === 'bothEqual' ? 'bothEqual' : expanded}
        onExpandButtonClick={() =>
          setCurrentPresentation(
            currentPresentation === 'alternative' ? 'default' : 'alternative',
          )
        }
        component={
          alternativePresentation === undefined
            ? component
            : currentPresentation === 'alternative'
              ? (component.alternativePresentation as FormComponentGroup)
              : component
        }
        actionButtonGroup={props.actionButtonGroup}
        currentComponentNamePath={currentComponentNamePath}
        anchorId={props.anchorId}
        childrenHidden={alternativePresentation === undefined && !expanded}
      />
    );
  }

  return (
    <div
      id={props.anchorId}
      className='form-component-item'
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
    >
      <Card boxed={title !== undefined} expanded={expanded}>
        <CardHeader>
          {title && (
            <CardTitle level={titleHeadlineLevel}>
              <CardExpandButton
                expanded={
                  presentationSize === 'bothEqual' ? 'bothEqual' : expanded
                }
                onClick={() =>
                  setCurrentPresentation(
                    currentPresentation === 'alternative'
                      ? 'default'
                      : 'alternative',
                  )
                }
              >
                {t(title)}
              </CardExpandButton>
            </CardTitle>
          )}
        </CardHeader>
        {alternativePresentation !== undefined ? ( // Switch between two presentations
          <CardContent className='form-component-container'>
            <Component
              {...props}
              component={
                currentPresentation === 'alternative'
                  ? alternativePresentation
                  : defaultPresentation
              }
            />
          </CardContent>
        ) : (
          // Switch between no content and single presentation
          <CardContent className='form-component-container' hidden={!expanded}>
            <Component
              {...props}
              component={{ ...component, title: undefined } as FormComponent}
            />
          </CardContent>
        )}
        {!title && (
          <CardExpandButton
            expanded={presentationSize === 'bothEqual' ? 'bothEqual' : expanded}
            onClick={() => {
              setCurrentPresentation(
                currentPresentation === 'alternative'
                  ? 'default'
                  : 'alternative',
              );
            }}
          >
            {presentationSize === 'bothEqual'
              ? t('divaClient_swapPresentationText')
              : expanded
                ? t('divaClient_showLessText')
                : t('divaClient_showMoreText')}
          </CardExpandButton>
        )}
      </Card>
    </div>
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

const getInitialPresentation = (
  component: FormComponent,
  isAppended: boolean,
) => {
  const presentationSize =
    'presentationSize' in component ? component.presentationSize : undefined;
  const alternativePresentation = component.alternativePresentation;

  if (
    presentationSize !== 'singleInitiallyVisible' &&
    !alternativePresentation &&
    isAppended
  ) {
    return 'alternative';
  }

  return 'default';
};
