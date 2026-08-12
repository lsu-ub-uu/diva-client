import type { DataResourceLink } from '@/cora/cora-data/types.server';
import type { FormComponentResourceLink } from '../FormGenerator/types';
import { withBaseName } from '@/utils/withBasename';
import { href } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DownloadIcon } from 'lucide-react';

interface OutputResourceLinkProps {
  component: FormComponentResourceLink;
  data: DataResourceLink;
}

export const OutputResourceLink = ({
  component,
  data,
}: OutputResourceLinkProps) => {
  const { t } = useTranslation();
  const linkedRecordId = data.children.find(
    (child) => child.name === 'linkedRecordId',
  )?.value;

  const mimeType = data.children.find(
    (child) => child.name === 'mimeType',
  )?.value;

  if (!linkedRecordId || !mimeType) {
    return null;
  }

  const resourceUrl = withBaseName(
    href('/binary/:id/:name', { id: linkedRecordId, name: data.name }),
  );
  return (
    <div
      className='form-component-item'
      data-colspan={component.gridColSpan ?? 12}
    >
      {component.outputFormat === 'image' && (
        <img src={resourceUrl} alt={data.name} />
      )}
      {component.outputFormat === 'download' && (
        <a href={resourceUrl} type={mimeType} className='icon-text'>
          {t('resourceLinkDownloadText')}
          <DownloadIcon />
        </a>
      )}
    </div>
  );
};
