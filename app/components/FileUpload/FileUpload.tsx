/*
 * Copyright 2023 Uppsala University Library
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

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Alert } from '@/components/Alert/Alert';

/*
const StyledLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#eee',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}));*/

interface UploadProgressProps {
  currentProgress: number;
}

const axiosInstance = axios.create({
  baseURL: `TODO`,
});

const UploadProgress = (props: UploadProgressProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(props.currentProgress);
  }, [props.currentProgress]);

  /*Check if styling is correct*/
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', marginRight: '1rem' }}>
        {/* <StyledLinearProgress
          variant='determinate'
          color='primary'
          value={progress}
        />*/}
      </div>
      <div style={{ minWidth: '2em' }}>
        <div>{`${Math.round(progress)}%`}</div>
      </div>
    </div>
  );
};

enum UploadStatus {
  PENDING,
  UPLOADING,
  SUCCESS,
  FAILED,
}

export interface FileUploadProps {
  accept: string[];
}

export const FileUpload = (props: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.PENDING,
  );
  const [filename, setFilename] = useState<string>('');

  const handleSubmit = async (files: FileList) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    setFilename(files[0].name);
    setProgress(0);
    try {
      setUploadStatus(UploadStatus.UPLOADING);
      await axiosInstance.post('/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / (data.total ?? 100)));
        },
      });
      setProgress(100);
      setUploadStatus(UploadStatus.SUCCESS);
    } catch {
      setUploadStatus(UploadStatus.FAILED);
    }
  };

  /*Check if styling is correct*/
  return (
    <div style={{ marginBottom: '10em' }}>
      <div>
        <input
          type='file'
          ref={inputRef}
          accept={props.accept.join(', ')}
          onChange={async (event) => {
            const files = event.currentTarget?.files;
            if (files !== null && files.length > 0) {
              await handleSubmit(files);
            }
          }}
          multiple={false}
          style={{ display: 'none' }}
        />
        <button
          disabled={progress > 0 && progress < 100}
          onClick={() => {
            setUploadStatus(UploadStatus.PENDING);
            setProgress(0);
            inputRef.current?.click();
          }}
        >
          Choose file to upload
        </button>
        {uploadStatus === UploadStatus.FAILED && (
          <Alert severity='error'>
            File <i>{filename}</i> failed to upload
          </Alert>
        )}
        {uploadStatus === UploadStatus.SUCCESS && (
          <Alert severity='info'>
            File <i>{filename}</i> was successfully uploaded
          </Alert>
        )}

        {uploadStatus === UploadStatus.UPLOADING && (
          <UploadProgress currentProgress={progress} />
        )}
      </div>
    </div>
  );
};
