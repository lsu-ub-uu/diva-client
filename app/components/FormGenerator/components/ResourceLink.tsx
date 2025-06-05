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
import type { FormComponentResourceLink } from '@/components/FormGenerator/types';
import { DownloadIcon } from '@/icons';
import { withBaseName } from '@/utils/withBasename';
import { useTranslation } from 'react-i18next';
import { href } from 'react-router';
import { useRemixFormContext } from 'remix-hook-form';
import resourceLinkStyles from './ResourceLink.module.css';

interface ResourceLinkProps {
  component: FormComponentResourceLink;
  path: string;
}

export const ResourceLink = ({ component, path }: ResourceLinkProps) => {
  const { getValues } = useRemixFormContext();
  const { t } = useTranslation();

  const data = getValues(path);

  const downloadLink = withBaseName(
    href('/binary/:id/:name', { id: data.id, name: data.name }),
  );

  return (
    <div className='form-component-item' data-colspan={component.gridColSpan}>
      <DevInfo component={component} path={path} />
      {component.outputFormat === 'image' && <img src={downloadLink} alt='' />}
      {component.outputFormat === 'download' && (
        <a
          href={downloadLink}
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
