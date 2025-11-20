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

import { type ChangeEvent, use, useState } from 'react';
import styles from './FileInput.module.css';
import { useTranslation } from 'react-i18next';
import { FieldContext } from './Fieldset';
import { UploadIcon } from 'lucide-react';

interface FileInputProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string | undefined;
}

export const FileInput = ({ name, onChange, errorMessage }: FileInputProps) => {
  const { ids } = use(FieldContext);

  const { t } = useTranslation();
  const [dragging, setDragging] = useState(false);

  return (
    <div className={styles['wrapper']} data-dragging={dragging}>
      <UploadIcon /> {t('divaClient_fileInputText')}
      <input
        id={ids.input}
        className={styles['file-input']}
        aria-invalid={errorMessage !== undefined}
        type='file'
        name={name}
        onChange={onChange}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
      />
    </div>
  );
};
