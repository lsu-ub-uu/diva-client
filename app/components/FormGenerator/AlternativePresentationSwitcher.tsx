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
  FormComponentMetadata,
} from '@/components/FormGenerator/types';
import { useState } from 'react';
import { Component } from '@/components/FormGenerator/Component';
import { Button } from '@/components/Button/Button';
import { CollapseContentIcon, ExpandContentIcon, SwapIcon } from '@/icons';
import componentStyles from '@/components/FormGenerator/components/FormComponent.module.css';
import styles from './AlternativePresentationSwitcher.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography/Typography';
import { headlineLevelToTypographyVariant } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';

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
  const [presentation, setPresentation] = useState<'default' | 'alternative'>(
    'default',
  );

  const { component } = props;

  const defaultPresentation = {
    ...component,
    alternativePresentation: undefined,
  };

  const alternativePresentation = component.alternativePresentation;

  if (!alternativePresentation) {
    return <Component {...props} />;
  }

  const presentationSize =
    'presentationSize' in component ? component.presentationSize : undefined;
  const title = 'title' in component ? component.title : undefined;
  const titleHeadlineLevel =
    'titleHeadlineLevel' in component
      ? component.titleHeadlineLevel
      : undefined;

  const switchButtonProps = getSwitchButtonProps(
    presentation,
    presentationSize,
  );

  if (title) {
    return (
      <div
        className={clsx(
          componentStyles['component'],
          styles['alternative-presentation-accordion'],
        )}
        data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
      >
        <div className={styles['accordion-header']}>
          <Button
            variant='tertiary'
            size='large'
            className={styles['alternative-presentation-title-button']}
            type='button'
            onClick={() => {
              setPresentation(
                presentation === 'default' ? 'alternative' : 'default',
              );
            }}
            aria-label={switchButtonProps.label}
            tooltipPosition='right'
          >
            <Typography
              text={title}
              variant={headlineLevelToTypographyVariant(titleHeadlineLevel)}
            />
            {switchButtonProps.icon}
          </Button>
        </div>
        <div
          className={clsx(styles['presentation'], componentStyles['container'])}
        >
          <Component
            {...props}
            component={
              presentation === 'alternative'
                ? alternativePresentation
                : defaultPresentation
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        componentStyles['component'],
        styles['alternative-presentation-headless-switcher'],
      )}
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
    >
      <DevInfo component={defaultPresentation} path={props.path} />
      <DevInfo component={alternativePresentation} path={props.path} />
      <div
        className={clsx(styles['presentation'], componentStyles['container'])}
      >
        <Component
          {...props}
          component={
            presentation === 'alternative'
              ? alternativePresentation
              : defaultPresentation
          }
        />
      </div>
      <Button
        className={styles['switch-button']}
        variant='icon'
        onClick={() => {
          setPresentation(
            presentation === 'default' ? 'alternative' : 'default',
          );
        }}
        aria-label={switchButtonProps.label}
      >
        {switchButtonProps.icon}
      </Button>
    </div>
  );
};

const getSwitchButtonProps = (
  presentation: 'default' | 'alternative',
  presentationSize: FormComponentMetadata['presentationSize'],
) => {
  if (presentationSize === 'bothEqual') {
    return { label: 'Byt visningläge', icon: <SwapIcon /> };
  }

  if (presentationSize === 'firstLarger') {
    return presentation === 'default'
      ? { label: 'Visa mindre', icon: <CollapseContentIcon /> }
      : { label: 'Visa mer', icon: <ExpandContentIcon /> };
  }

  // Default is 'firstSmaller'
  return presentation === 'default'
    ? { label: 'Visa mer', icon: <ExpandContentIcon /> }
    : { label: 'Visa mindre', icon: <CollapseContentIcon /> };
};
