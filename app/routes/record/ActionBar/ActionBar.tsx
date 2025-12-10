import { Button } from '@/components/Button/Button';
import type { BFFDataRecord } from '@/types/record';
import { CodeIcon, ShredderIcon, Trash2Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router';

interface ActionBarProps {
  record: BFFDataRecord;
}
export const ActionBar = ({ record }: ActionBarProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      {record.userRights?.includes('delete') && (
        <fetcher.Form
          key={`${record.id}_ab_delete`}
          method='POST'
          action={`/${record.recordType}/${record.id}/delete`}
          onSubmit={(e: any) => {
            if (!window.confirm(t('divaClient_confirmDeleteText'))) {
              e.preventDefault();
            }
          }}
        >
          <Button type='submit' className='api-button' variant='tertiary'>
            <ShredderIcon />
            {t('divaClient_deleteRecordText')}
          </Button>
        </fetcher.Form>
      )}
      {record.userRights?.includes('trash') && (
        <fetcher.Form
          key={`${record.id}_ab_trash`}
          method='POST'
          action={`/${record.recordType}/${record.id}/trash`}
          onSubmit={(e: any) => {
            if (!window.confirm(t('divaClient_confirmTrashText'))) {
              e.preventDefault();
            }
          }}
        >
          <Button
            type='submit'
            className='api-button'
            variant='tertiary'
            target='_blank'
          >
            <Trash2Icon />
            {t('divaClient_trashRecordText')}
          </Button>
        </fetcher.Form>
      )}
      <Button className='api-button' variant='tertiary'>
        <CodeIcon />
        {t('divaClient_viewInApiText')}
      </Button>
    </div>
  );
};
