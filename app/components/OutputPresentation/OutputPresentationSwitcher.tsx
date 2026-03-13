import type {
  PresentationSize,
  PresentationStyle,
} from '@/cora/bffTypes.server';
import type { CoraData } from '@/cora/cora-data/types.server';
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Maximize2Icon,
  Minimize2Icon,
} from 'lucide-react';
import { useState } from 'react';
import type { FormComponent } from '../FormGenerator/types';
import { IconButton } from '../IconButton/IconButton';
import { OutputComponent } from './OutputComponent';
import styles from './OutputPresentationSwitcher.module.css';
import { useTranslation } from 'react-i18next';
import { Typography } from '../Typography/Typography';
import { headlineLevelToTypographyVariant } from '../FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { hasValuableData } from '@/utils/cleanFormData';

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
    <div className={styles['wrapper']}>
      {component.title && (
        <button
          className={styles['clickable-title']}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <Typography
            variant={headlineLevelToTypographyVariant(
              component.titleHeadlineLevel,
            )}
            className={styles['clickable-title-text']}
          >
            {t(component.title)}
          </Typography>
        </button>
      )}
      <div className={styles['content']}>
        {expanded ? (
          <OutputComponent
            component={{
              ...component,
              alternativePresentation: undefined,
              title: undefined,
            }}
            data={data}
            parentPresentationStyle={parentPresentationStyle}
          />
        ) : null}
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
    <div className={styles['wrapper']}>
      {component.title && (
        <button
          className={styles['clickable-title']}
          onClick={() =>
            setShowingAlternativePresentation(!showingAlternativePresentation)
          }
        >
          {showingAlternativePresentation ? (
            <ChevronUpIcon />
          ) : (
            <ChevronDownIcon />
          )}
          <Typography
            variant={headlineLevelToTypographyVariant(
              component.titleHeadlineLevel,
            )}
            className={styles['clickable-title-text']}
          >
            {t(component.title)}
          </Typography>
        </button>
      )}
      <div className={styles['content']}>
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
      {!component.title && (
        <IconButton
          tooltip={t(
            getExpandButtonText(
              component.presentationSize,
              showingAlternativePresentation,
            ),
          )}
          className={styles['presentation-switcher-button']}
          onClick={() =>
            setShowingAlternativePresentation(!showingAlternativePresentation)
          }
        >
          {getExpandIcon(
            component.presentationSize,
            showingAlternativePresentation,
          )}
        </IconButton>
      )}
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
      <Maximize2Icon />
    ) : (
      <Minimize2Icon />
    );
  }
  return showingAlternativePresentation ? <Minimize2Icon /> : <Maximize2Icon />;
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
      ? 'divaClient_showMoreText'
      : 'divaClient_showLessText';
  }
  return showingAlternativePresentation
    ? 'divaClient_showLessText'
    : 'divaClient_showMoreText';
};
