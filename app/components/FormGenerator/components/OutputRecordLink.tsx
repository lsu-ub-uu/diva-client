import { OutputRecordLinkWithoutPresentation } from '@/components/OutputPresentation/OutputRecordLinkWithoutPresentation';
import { Typography } from '@/components/Typography/Typography';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { isComponentRecordLink } from '../formGeneratorUtils/formGeneratorUtils';
import type {
  FormComponentAnyTypeRecordLink,
  FormComponentRecordLink,
} from '../types';
import { DevInfo } from './DevInfo';
import styles from './OutputField.module.css';

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
  const linkedRecordType = isComponentRecordLink(component)
    ? component.recordLinkType
    : getValues(`${path}.linkedRecordType`);
  const linkedRecordId = component.finalValue ?? getValues(`${path}.value`);
  const userRights = getValues(`${path}.userRights`);

  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
      {...(linkedRecordId && { 'data-has-value': '' })}
    >
      <DevInfo component={component} path={path} />
      <div
        className={clsx(styles['output-field'])}
        data-variant={variant}
        data-has-label={label ? 'true' : 'false'}
        data-has-value={true}
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
        <OutputRecordLinkWithoutPresentation
          linkedRecordType={linkedRecordType}
          linkedRecordId={linkedRecordId}
          hasReadAccess={userRights?.includes('read')}
        />
      </div>
    </div>
  );
};
