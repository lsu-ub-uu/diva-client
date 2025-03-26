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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useTranslation } from 'react-i18next';
import styles from './ActionButtonGroup.module.css';
import { Button } from '@/components/Button/Button';
import { ArrowDownwardIcon, ArrowUpwardIcon, CloseIcon } from '@/icons';

interface ActionButtonGroupProps {
  entityName?: string;
  hideMoveButtons: boolean;
  moveUpButtonDisabled: boolean;
  moveUpButtonAction: () => void;
  moveDownButtonDisabled: boolean;
  moveDownButtonAction: () => void;
  deleteButtonDisabled: boolean;
  deleteButtonAction: () => void;
  entityType: string;
}

export const ActionButtonGroup = (props: ActionButtonGroupProps) => {
  const { t } = useTranslation();

  return (
    <div role='group' className={styles['action-button-group']}>
      {!props.hideMoveButtons && (
        <Button
          size='small'
          variant='icon'
          aria-label={t('divaClient_moveFieldUpText', {
            fieldName: props.entityName,
          })}
          disabled={props.moveUpButtonDisabled}
          onClick={props.moveUpButtonAction}
        >
          <ArrowUpwardIcon />
        </Button>
      )}
      <Button
        size='small'
        variant='icon'
        aria-label={t('divaClient_deleteFieldText', {
          fieldName: props.entityName,
        })}
        disabled={props.deleteButtonDisabled}
        onClick={props.deleteButtonAction}
      >
        <CloseIcon />
      </Button>
      {!props.hideMoveButtons && (
        <Button
          size='small'
          variant='icon'
          aria-label={t('divaClient_moveFieldDownText', {
            fieldName: props.entityName,
          })}
          disabled={props.moveDownButtonDisabled}
          onClick={props.moveDownButtonAction}
        >
          <ArrowDownwardIcon />
        </Button>
      )}
    </div>
  );
};

export const isComponentGroupAndSingularForStyling = (
  entityType: string,
  hideMoveButtons: boolean,
) => {
  return entityType === 'group' && hideMoveButtons;
};
