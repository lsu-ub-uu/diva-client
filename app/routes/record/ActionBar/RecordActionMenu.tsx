import { Button, type ButtonProps } from '@/components/Button/Button';
import {
  ConfirmDialog,
  useConfirmDialog,
} from '@/components/ConfirmDialog/ConfirmDialog';
import { CircularLoader } from '@/components/Loader/CircularLoader';
import { Menu, useMenu } from '@/components/Menu/Menu';
import { MenuItem } from '@/components/Menu/MenuItem';
import type { UserRightActionLink } from '@/data/getUserRightsForRecordType.server';
import {
  ArchiveRestoreIcon,
  CopyPlusIcon,
  FilePenIcon,
  FileTextIcon,
  PublishIcon,
  ShredderIcon,
  Trash2Icon,
} from '@/icons/icons';
import type { BFFDataRecord } from '@/types/record';
import { useTranslation } from 'react-i18next';
import { href, Link, useFetcher } from 'react-router';
import styles from './RecordActionMenu.module.css';
import clsx from 'clsx';

interface RecordMenuActionBase {
  id: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export interface RecordMenuLinkAction extends RecordMenuActionBase {
  type: 'link';
  to: string | { pathname: string; search: string };
}

export interface RecordMenuButtonAction extends RecordMenuActionBase {
  type: 'button';
  action: string;
  redirect?: boolean;
  confirmDialog?: {
    headingText: string;
    messageText?: string;
    confirmButtonText: string;
    cancelButtonText?: string;
  };
}

export type RecordMenuAction = RecordMenuLinkAction | RecordMenuButtonAction;

interface RecordActionMenuProps {
  children: React.ReactNode;
  className?: string;
  menuButtonProps?: ButtonProps;
  record: BFFDataRecord;
  recordTypeUserRights: UserRightActionLink[];
  excludeActions?: string[];
}

const isLinkAction = (item: RecordMenuAction): item is RecordMenuLinkAction =>
  item.type === 'link';

export const RecordActionMenu = ({
  children,
  className,
  record,
  recordTypeUserRights,
  excludeActions = [],
  menuButtonProps = {},
}: RecordActionMenuProps) => {
  const { t } = useTranslation();
  const { menuProps, triggerProps } = useMenu();
  const recordUserRights = record.userRights ?? [];

  const getMenuActions = (): RecordMenuAction[] => {
    const actions: RecordMenuAction[] = [];

    if (recordUserRights.includes('update')) {
      actions.push({
        id: 'update',
        children: t('divaClient_editRecordText'),
        type: 'link',
        to: href('/:recordType/:recordId/update', {
          recordType: record.recordType,
          recordId: record.id,
        }),
        icon: <FilePenIcon />,
      });
    }

    if (recordTypeUserRights.includes('create')) {
      actions.push({
        id: 'create',
        children: t('divaClient_copyAsNewText'),
        type: 'link',
        to: {
          pathname: href('/:recordType/create', {
            recordType: record.recordType,
          }),
          search: `?${new URLSearchParams({ duplicateFrom: record.id, validationType: record.validationType })}`,
        },
        icon: <CopyPlusIcon />,
      });
    }

    if (recordUserRights.includes('delete')) {
      actions.push({
        id: 'delete',
        children: t('divaClient_deleteRecordText'),
        type: 'button',
        icon: <ShredderIcon />,
        action: `/${record.recordType}/${record.id}/delete`,
        redirect: true,
        confirmDialog: {
          headingText: t('divaClient_confirmDeleteHeadingText'),
          messageText: t('divaClient_confirmDeleteText'),
          confirmButtonText: t('divaClient_deleteRecordText'),
          cancelButtonText: t('divaClient_cancelText'),
        },
      });
    }

    if (recordUserRights.includes('trash')) {
      actions.push({
        id: 'trash',
        children: t('divaClient_trashRecordText'),
        type: 'button',
        icon: <Trash2Icon />,
        action: `/${record.recordType}/${record.id}/trash`,
        redirect: true,
        confirmDialog: {
          headingText: t('divaClient_confirmTrashHeadingText'),
          messageText: t('divaClient_confirmTrashText'),
          confirmButtonText: t('divaClient_trashRecordText'),
          cancelButtonText: t('divaClient_cancelText'),
        },
      });
    }

    if (recordUserRights.includes('untrash')) {
      actions.push({
        id: 'untrash',
        children: t('divaClient_untrashRecordText'),
        type: 'button',
        icon: <ArchiveRestoreIcon />,
        action: `/${record.recordType}/${record.id}/untrash`,
      });
    }

    if (recordUserRights.includes('publish')) {
      actions.push({
        id: 'publish',
        children: t('divaClient_publishRecordText'),
        type: 'button',
        icon: <PublishIcon />,
        action: `/${record.recordType}/${record.id}/publish`,
      });
    }
    if (recordUserRights.includes('unpublish')) {
      actions.push({
        id: 'unpublish',
        children: t('divaClient_unpublishRecordText'),
        type: 'button',
        icon: <PublishIcon />,
        action: `/${record.recordType}/${record.id}/unpublish`,
      });
    }

    if (recordUserRights.includes('viewOldRecord')) {
      actions.push({
        id: 'viewOldRecord',
        children: t('divaClient_viewOldRecordText'),
        type: 'link',
        to: href('/:recordType/:recordId', {
          recordType: 'diva-oldRecord',
          recordId: Object.values(record.data)[0].recordInfo?.oldRecord?.value,
        }),
        icon: <FileTextIcon />,
      });
    }

    return actions.filter((action) => !excludeActions.includes(action.id));
  };

  const menuActions = getMenuActions();

  if (menuActions.length === 0) {
    return null;
  }

  return (
    <>
      <Button
        variant='tertiary'
        size='small'
        className={clsx(className, styles['menu-trigger'])}
        {...menuButtonProps}
        {...triggerProps}
      >
        {children}
      </Button>
      <Menu {...menuProps}>
        {menuActions.map((action) =>
          isLinkAction(action) ? (
            <RecordActionMenuLinkItem key={action.id} action={action} />
          ) : (
            <RecordActionMenuButtonItem key={action.id} buttonAction={action} />
          ),
        )}
      </Menu>
    </>
  );
};

const RecordActionMenuLinkItem = ({
  action,
}: {
  action: RecordMenuLinkAction;
}) => {
  const { to, icon, children } = action;
  return (
    <MenuItem>
      <Link to={to} className={styles['record-action-menu-item']}>
        {icon}
        {children}
      </Link>
    </MenuItem>
  );
};

const RecordActionMenuButtonItem = ({
  buttonAction,
}: {
  buttonAction: RecordMenuButtonAction;
}) => {
  const {
    redirect = false,
    action,
    icon,
    confirmDialog,
    children,
  } = buttonAction;
  const { showConfirmDialog, confirmDialogRef } = useConfirmDialog();
  const fetcher = useFetcher();

  const onAction = () => {
    fetcher.submit(
      { redirect: redirect },
      {
        method: 'post',
        action,
      },
    );
  };

  const pending = fetcher.state !== 'idle';

  return (
    <MenuItem>
      <button
        type='button'
        disabled={pending}
        className={styles['record-action-menu-item']}
        onClick={() => {
          if (action) {
            if (confirmDialog) {
              showConfirmDialog((returnValue) => {
                if (returnValue === 'submit') {
                  onAction();
                }
              });
            } else {
              onAction();
            }
          }
        }}
      >
        {pending ? <CircularLoader /> : icon}
        {children}
      </button>

      {confirmDialog && (
        <ConfirmDialog
          ref={confirmDialogRef}
          headingText={confirmDialog.headingText}
          messageText={confirmDialog.messageText}
          actions={
            <>
              <Button variant='secondary' value='cancel' type='submit'>
                {confirmDialog.cancelButtonText}
              </Button>
              <Button variant='primary' value='submit' type='submit'>
                {confirmDialog.confirmButtonText}
                {icon}
              </Button>
            </>
          }
        />
      )}
    </MenuItem>
  );
};
