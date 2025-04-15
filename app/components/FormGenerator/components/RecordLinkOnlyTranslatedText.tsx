import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import { addAttributesToName } from '../defaultValues/defaultValues';
import type { FormComponentRecordLink } from '../types';
import { DevInfo } from './DevInfo';
import styles from './FormComponent.module.css';

interface RecordLinkOnlyTranslatedTextProps {
  component: FormComponentRecordLink;
  path: string;
}

export const RecordLinkOnlyTranslatedText = ({
  component,
  path,
}: RecordLinkOnlyTranslatedTextProps) => {
  const { getValues } = useRemixFormContext();

  const value = getValues(path);
  const { t } = useTranslation();
  return (
    <div
      className={styles['component']}
      data-colspan={component.gridColSpan ?? 12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <DevInfo
        component={component}
        path={path}
        label='RecordLinkOnlyTranslatedText'
      />
      {t(value)}
    </div>
  );
};
