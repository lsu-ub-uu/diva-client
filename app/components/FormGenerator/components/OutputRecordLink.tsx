import type { ReactNode } from 'react';
import type {
  FormComponentAnyTypeRecordLink,
  FormComponentRecordLink,
} from '../types';
import { DevInfo } from './DevInfo';
import styles from './OutputField.module.css';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/Typography/Typography';
import clsx from 'clsx';
import { href, Link } from 'react-router';
import { useRemixFormContext } from 'remix-hook-form';
import { isComponentRecordLink } from '../formGeneratorUtils/formGeneratorUtils';

interface OutputRecordLinkProps {
  component: FormComponentRecordLink | FormComponentAnyTypeRecordLink;
  path: string;
  parentPresentationStyle: string | undefined;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
}

export const OutputRecordLink = ({
  path,
  parentPresentationStyle,
  component,
  attributes,
  actionButtonGroup,
}: OutputRecordLinkProps) => {
  const { t } = useTranslation();
  const { getValues } = useRemixFormContext();
  const variant = parentPresentationStyle === 'inline' ? 'inline' : 'block';
  const label = component.showLabel ? t(component.label) : undefined;
  const value = getValues(`${path}`);
  const linkedRecordType = isComponentRecordLink(component)
    ? component.recordLinkType
    : value?.linkedRecordType;
  const linkedRecordId = component.finalValue ?? value?.value;
  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      <DevInfo component={component} path={path} />
      <div
        className={clsx(styles['output-field'])}
        data-variant={variant}
        data-has-label={label ? 'true' : 'false'}
      >
        <div className={styles['label-wrapper']}>
          {label && (
            <Typography
              as='div'
              className={styles['label']}
              variant={component.textStyle ?? 'bodyTextStyle'}
              id={`${path}-label`}
            >
              {t(label)}
            </Typography>
          )}

          {attributes}
          {actionButtonGroup}
        </div>
        <Link
          to={href('/:recordType/:recordId', {
            recordType: linkedRecordType,
            recordId: linkedRecordId,
          })}
        >
          {t(value?.linkedRecordTypeTextId)} / {linkedRecordId}
        </Link>
      </div>
    </div>
  );
};
