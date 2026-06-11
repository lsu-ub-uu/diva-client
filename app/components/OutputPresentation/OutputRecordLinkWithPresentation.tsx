import type { DataGroup } from '@/cora/cora-data/types.server';
import type { loader as getLinkedRecordLoader } from '@/routes/resourceRoutes/getLinkedRecord';
import { withBaseName } from '@/utils/withBasename';
import { LinkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { href, Link } from 'react-router';
import type { FormSchema } from '../FormGenerator/types';
import { IconButton } from '../IconButton/IconButton';
import { CircularLoader } from '../Loader/CircularLoader';
import { OutputPresentation } from './OutputPresentation';
import styles from './OutputPresentation.module.css';

type LinkedRecordLoaderData = Awaited<ReturnType<typeof getLinkedRecordLoader>>;

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
  const [data, setData] = useState<LinkedRecordLoaderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(null);
    setLoading(true);

    fetch(
      withBaseName(
        `/linkedRecord/${linkedRecordType}/${linkedRecordId}?presentationRecordLinkId=${presentationRecordLinkId}`,
      ),
      { signal: controller.signal },
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        if (
          !controller.signal.aborted &&
          !(err instanceof DOMException && err.name === 'AbortError')
        ) {
          setData(null);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [linkedRecordType, linkedRecordId, presentationRecordLinkId]);

  if (loading) {
    return <CircularLoader />;
  }

  const dataGroup = data?.record?.record?.data as DataGroup;
  const presentation = data?.presentation as FormSchema;
  if (!dataGroup || !presentation) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: linkedRecordType,
          recordId: linkedRecordId,
        })}
      >
        {linkedRecordType}/{linkedRecordId}
      </Link>
    );
  }

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
};
