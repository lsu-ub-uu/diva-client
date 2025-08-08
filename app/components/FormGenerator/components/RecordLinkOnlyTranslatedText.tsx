import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import type { FormComponentRecordLink } from '../types';
import { DevInfo } from './DevInfo';

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
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
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
