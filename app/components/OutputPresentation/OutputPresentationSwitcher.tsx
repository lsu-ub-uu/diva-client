import type {
  PresentationSize,
  PresentationStyle,
} from '@/cora/bffTypes.server';
import type { CoraData } from '@/cora/cora-data/types.server';
import { hasValuableData } from '@/utils/cleanFormData';
import clsx from 'clsx';
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Maximize2Icon,
  Minimize2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { headlineLevelToTypographyVariant } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import type { FormComponent } from '../FormGenerator/types';
import { Typography } from '../Typography/Typography';
import { OutputComponent } from './OutputComponent';
import styles from './OutputPresentationSwitcher.module.css';

interface OutputPresentationSwitcherProps {
  component: FormComponent;
  data?: CoraData;
  parentPresentationStyle?: PresentationStyle;
}

export const OutputSinglePresentationSwitcher = ({
  component,
  data,
  parentPresentationStyle,
}: OutputPresentationSwitcherProps) => {
  const initiallyVisible =
    component.presentationSize === 'singleInitiallyVisible';
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(initiallyVisible);
  if (component.type === 'hidden') {
    return null;
  }

  if (!data || !hasValuableData(data)) {
    return null;
  }

  return (
    <div
      className={clsx(styles['accordion'], 'form-component-item')}
      data-colspan={component.gridColSpan ?? 12}
    >
      <button
        className={styles['accordion-header']}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        {component.title && (
          <Typography
            variant={headlineLevelToTypographyVariant(
              component.titleHeadlineLevel,
            )}
            className={styles['accordion-title']}
          >
            {t(component.title)}
          </Typography>
        )}
      </button>
      <div
        className={styles['accordion-content']}
        style={{ display: expanded ? 'block' : 'none' }}
      >
        <OutputComponent
          component={{
            ...component,
            alternativePresentation: undefined,
            title: undefined,
          }}
          data={data}
          parentPresentationStyle={parentPresentationStyle}
        />
      </div>
    </div>
  );
};

export const OutputPresentationSwitcher = ({
  component,
  data,
  parentPresentationStyle,
}: OutputPresentationSwitcherProps) => {
  const { t } = useTranslation();
  const [showingAlternativePresentation, setShowingAlternativePresentation] =
    useState(false);
  if (component.type === 'hidden') {
    return null;
  }

  return (
    <div
      className={clsx(styles['accordion'], 'form-component-item')}
      data-colspan={component.gridColSpan ?? 12}
    >
      <button
        className={styles['accordion-header']}
        onClick={() =>
          setShowingAlternativePresentation(!showingAlternativePresentation)
        }
        aria-expanded={showingAlternativePresentation}
        aria-label={
          component.title === undefined
            ? t(
                getExpandButtonText(
                  component.presentationSize,
                  showingAlternativePresentation,
                ),
              )
            : undefined
        }
      >
        {!component.title && (
          <span className={styles['expand-buttom-text']}>
            {t(
              getExpandButtonText(
                component.presentationSize,
                showingAlternativePresentation,
              ),
            )}
          </span>
        )}
        {getExpandIcon(
          component.presentationSize,
          showingAlternativePresentation,
        )}
        {component.title && (
          <Typography
            variant={headlineLevelToTypographyVariant(
              component.titleHeadlineLevel,
            )}
            className={styles['accordion-title']}
          >
            {t(component.title)}
          </Typography>
        )}
      </button>
      <div className={styles['accordion-content']}>
        {showingAlternativePresentation ? (
          component.alternativePresentation ? (
            <OutputComponent
              component={component.alternativePresentation!}
              data={data}
              parentPresentationStyle={parentPresentationStyle}
            />
          ) : null
        ) : (
          <OutputComponent
            component={{
              ...component,
              alternativePresentation: undefined,
              title: undefined,
            }}
            data={data}
            parentPresentationStyle={parentPresentationStyle}
          />
        )}
      </div>
    </div>
  );
};

const getExpandIcon = (
  presentationSize: PresentationSize = 'firstSmaller',
  showingAlternativePresentation: boolean,
) => {
  if (presentationSize === 'bothEqual') {
    return <ArrowLeftRightIcon />;
  }
  if (presentationSize === 'firstSmaller') {
    return showingAlternativePresentation ? (
      <Minimize2Icon />
    ) : (
      <Maximize2Icon />
    );
  }
  return showingAlternativePresentation ? <Maximize2Icon /> : <Minimize2Icon />;
};

const getExpandButtonText = (
  presentationSize: PresentationSize = 'firstSmaller',
  showingAlternativePresentation: boolean,
) => {
  if (presentationSize === 'bothEqual') {
    return 'divaClient_swapPresentationText';
  }
  if (presentationSize === 'firstSmaller') {
    return showingAlternativePresentation
      ? 'divaClient_showLessText'
      : 'divaClient_showMoreText';
  }
  return showingAlternativePresentation
    ? 'divaClient_showMoreText'
    : 'divaClient_showLessText';
};
