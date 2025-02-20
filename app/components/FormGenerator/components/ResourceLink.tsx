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

import type { FormComponentResourceLink } from '@/components/FormGenerator/types';
import { DevInfo } from '@/components/FormGenerator/components/DevInfo';
import styles from '@/components/FormGenerator/components/FormComponent.module.css';
import resourceLinkStyles from './ResourceLink.module.css';
import { useRemixFormContext } from 'remix-hook-form';
import type { ResourceLink as ResourceLinkType } from '@/cora/cora-data/types.server';
import { useRouteLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DownloadIcon } from '@/icons';
import type { loader } from '@/root';

interface ResourceLinkProps {
  component: FormComponentResourceLink;
  path: string;
}

export const ResourceLink = ({ component, path }: ResourceLinkProps) => {
  const { getValues } = useRemixFormContext();
  const { t } = useTranslation();
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  const data: ResourceLinkType = getValues(path);

  const authToken = rootLoaderData?.auth?.data.token;

  const resourceUrl = `${data.actionLinks.read.url}${authToken ? `?authToken=${authToken}` : ''}`;

  return (
    <div className={styles['component']} data-colspan={component.gridColSpan}>
      <DevInfo component={component} path={path} />
      {component.outputFormat === 'image' && <img src={resourceUrl} alt='' />}
      {component.outputFormat === 'download' && (
        <a href={resourceUrl} className={resourceLinkStyles['downloadLink']}>
          {t('divaClient_downloadFileText')}
          <DownloadIcon />
        </a>
      )}
    </div>
  );
};
