import type { DataGroup } from '@/cora/cora-data/types.server';
import { useEffect } from 'react';
import { href, Link, useFetcher } from 'react-router';
import type { FormSchema } from '../FormGenerator/types';
import { CircularLoader } from '../Loader/CircularLoader';
import { OutputPresentation } from './OutputPresentation';
import { LinkIcon } from 'lucide-react';
import { IconButton } from '../IconButton/IconButton';
import styles from './OutputPresentation.module.css';

interface OutputRecordLinkWithPresentationProps {
  linkedRecordType: string;
  linkedRecordId: string;
  presentationRecordLinkId: string;
}

export const OutputRecordLinkWithPresentation = ({
  linkedRecordType,
  linkedRecordId,
  presentationRecordLinkId,
}: OutputRecordLinkWithPresentationProps) => {
  const { load, data, state } = useFetcher();

  useEffect(() => {
    load(
      `/linkedRecord/${linkedRecordType}/${linkedRecordId}?presentationRecordLinkId=${presentationRecordLinkId}`,
    );
  }, [load, linkedRecordType, linkedRecordId, presentationRecordLinkId]);

  if (state === 'loading') {
    return <CircularLoader />;
  }

  if (state === 'idle' && data) {
    const dataGroup = data.record.record.data as DataGroup;
    const presentation = data.presentation as FormSchema;
    return (
      <div className={styles['record-link-with-presentation']}>
        <div className={styles['linked-presentation']}>
          <OutputPresentation formSchema={presentation} data={dataGroup} />
        </div>
        <IconButton
          size='small'
          as={Link}
          tooltip={`${linkedRecordType}/${linkedRecordId}`}
          to={href('/:recordType/:recordId', {
            recordType: linkedRecordType,
            recordId: linkedRecordId,
          })}
        >
          <LinkIcon />
        </IconButton>
      </div>
    );
  }

  return null;
};
