import type { HeadlineLevel, PresentationStyle } from '@/cora/bffTypes.server';
import type { CoraData } from '@/cora/cora-data/types.server';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../Card/Card';
import { CardContent } from '../Card/CardContent';
import { CardExpandButton } from '../Card/CardExpandButton';
import { CardHeader } from '../Card/CardHeader';
import { CardTitle } from '../Card/CardTitle';
import type { FormComponent } from '../FormGenerator/types';
import {
  getExpandButtonText,
  getExpandIcon,
} from '../OutputPresentation/OutputPresentationSwitcher';
import { InputComponent } from './InputComponent';

export type FormComponentWithTitle = FormComponent & {
  title: string;
  titleHeadlineLevel?: HeadlineLevel;
};

interface InputPresentationSwitcherProps {
  path: string;
  component: FormComponentWithTitle;
  data?: CoraData;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputSinglePresentationSwitcher = (
  props: InputPresentationSwitcherProps,
) => {
  const { component } = props;
  const initiallyVisible =
    component.presentationSize === 'singleInitiallyVisible';
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(initiallyVisible);

  return (
    <div
      className='form-component-item'
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
    >
      <Card boxed expanded={expanded}>
        <CardHeader>
          <CardTitle level={component.titleHeadlineLevel ?? 'h2'}>
            <CardExpandButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {t(component.title)}
            </CardExpandButton>
          </CardTitle>
        </CardHeader>
        <CardContent hidden={!expanded}>
          <InputComponent
            {...props}
            component={{ ...component, title: undefined } as FormComponent}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export type FormComponentWithAlternativePresentation = FormComponent & {
  alternativePresentation: FormComponent;
  title?: string;
  titleHeadlineLevel?: HeadlineLevel;
};

interface InputAlternativePresentationSwitcherProps {
  path: string;
  component: FormComponentWithAlternativePresentation;
  data?: CoraData;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: PresentationStyle;
}

export const InputAlternativePresentationSwitcher = (
  props: InputAlternativePresentationSwitcherProps,
) => {
  const { t } = useTranslation();
  const [showingAlternativePresentation, setShowingAlternativePresentation] =
    useState(false);
  const { component } = props;
  return (
    <div
      className='form-component-item'
      data-colspan={'gridColSpan' in component ? component.gridColSpan : 12}
    >
      <Card boxed expanded={showingAlternativePresentation}>
        <CardHeader>
          <CardTitle level={component.titleHeadlineLevel ?? 'h2'}>
            <CardExpandButton
              icon={getExpandIcon(
                component.presentationSize,
                showingAlternativePresentation,
              )}
              expanded={showingAlternativePresentation}
              onClick={() =>
                setShowingAlternativePresentation(
                  !showingAlternativePresentation,
                )
              }
            >
              {component.title
                ? t(component.title)
                : t(
                    getExpandButtonText(
                      component.presentationSize,
                      showingAlternativePresentation,
                    ),
                  )}
            </CardExpandButton>
          </CardTitle>
        </CardHeader>
        <CardContent hidden={!showingAlternativePresentation}>
          <InputComponent
            {...props}
            component={component.alternativePresentation}
          />
        </CardContent>
        <CardContent hidden={showingAlternativePresentation}>
          <InputComponent
            {...props}
            component={{
              ...component,
              alternativePresentation: undefined,
              title: undefined,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
