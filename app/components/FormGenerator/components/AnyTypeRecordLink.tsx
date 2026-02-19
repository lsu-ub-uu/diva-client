import { Fieldset } from '@/components/Input/Fieldset';
import { Input } from '@/components/Input/Input';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import type {
  FormComponentAnyTypeRecordLink,
  FormComponentRecordLink,
} from '../types';
import styles from './AnyTypeRecordLink.module.css';
import { DevInfo } from './DevInfo';
import { OutputRecordLink } from './OutputRecordLink';
import { FieldInfo } from '@/components/FieldInfo/FieldInfo';
import { Card } from '@/components/Card/Card';
import { CardHeader } from '@/components/Card/CardHeader';
import { CardTitle } from '@/components/Card/CardTitle';
import { CardContent } from '@/components/Card/CardContent';

interface AnyTypeRecordLinkProps {
  component: FormComponentAnyTypeRecordLink;
  path: string;
  attributes?: ReactNode;
  actionButtonGroup?: ReactNode;
  parentPresentationStyle?: string;
}

export const AnyTypeRecordLink = ({
  path,
  component,
  attributes,
  actionButtonGroup,
  parentPresentationStyle,
}: AnyTypeRecordLinkProps) => {
  const { t } = useTranslation();

  const { register } = useRemixFormContext();
  const label = component.showLabel ? t(component.label) : undefined;

  if (component.mode === 'input') {
    return (
      <div
        className='form-component-item'
        data-colspan={component.gridColSpan ?? 12}
      >
        <DevInfo
          label='PermissionUnitRecordLink'
          component={component}
          path={path}
        />
        <Card boxed>
          <CardHeader
            attributes={attributes}
            actionButtonGroup={actionButtonGroup}
          >
            <CardTitle
              level={component.titleHeadlineLevel}
              info={component.tooltip && <FieldInfo {...component.tooltip} />}
            >
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.fieldset}>
              <Fieldset label={t('linkedRecordTypeTextVarText')}>
                <Input {...register(`${path}.linkedRecordType`)} />
              </Fieldset>
              <Fieldset label={t('linkedRecordIdTextVarText')}>
                <Input {...register(`${path}.value`)} />
              </Fieldset>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <OutputRecordLink
      path={path}
      component={component as FormComponentRecordLink}
      attributes={attributes}
      actionButtonGroup={actionButtonGroup}
      parentPresentationStyle={parentPresentationStyle}
    />
  );
};
