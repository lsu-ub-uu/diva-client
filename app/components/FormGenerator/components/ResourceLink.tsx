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

import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import styles from '@/components/FormGenerator/components/FormComponent.module.css';
import type { FormComponentResourceLink } from '@/components/FormGenerator/types';
import type { ResourceLink as ResourceLinkType } from '@/cora/cora-data/types.server';
import { DownloadIcon } from '@/icons';
import { useAuth } from '@/utils/rootLoaderDataUtils';
import { useTranslation } from 'react-i18next';
import { useRemixFormContext } from 'remix-hook-form';
import resourceLinkStyles from './ResourceLink.module.css';

interface ResourceLinkProps {
  component: FormComponentResourceLink;
  path: string;
}

export const ResourceLink = ({ component, path }: ResourceLinkProps) => {
  const { getValues } = useRemixFormContext();
  const { t } = useTranslation();
  const auth = useAuth();

  const data: ResourceLinkType = getValues(path);
  const authToken = auth?.data.token;

  const resourceUrl = `${data.actionLinks.read.url}${authToken ? `?authToken=${authToken}` : ''}`;
  return (
    <div className={styles['component']} data-colspan={component.gridColSpan}>
      <DevInfo component={component} path={path} />
      {component.outputFormat === 'image' && <img src={resourceUrl} alt='' />}
      {component.outputFormat === 'download' && (
        <a
          href={resourceUrl}
          className={resourceLinkStyles['download-link']}
          type={data.mimeType}
        >
          {t('resourceLinkDownloadText')}
          <DownloadIcon />
        </a>
      )}
    </div>
  );
};
