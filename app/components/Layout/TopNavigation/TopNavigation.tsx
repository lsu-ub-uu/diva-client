import styles from './TopNavigation.module.css';
import {
  AttachMoneyIcon,
  ContractIcon,
  CorporateFareIcon,
  EditNoteIcon,
  FullCoverageIcon,
  HistoryEduIcon,
  NewspaperIcon,
  NewsstandIcon,
  PersonsIcon,
  SchemaIcon,
  SchoolIcon,
  ScienceIcon,
} from '@/icons';
import type { ReactNode } from 'react';
import { NavigationLink } from '@/components/Layout/NavigationLink/NavigationLink';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import { useTranslation } from 'react-i18next';
import { href } from 'react-router';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  recordTypes: BFFRecordType[];
  onNavigationClick?: () => void;
}

const icons: Record<string, ReactNode> = {
  'diva-output': <ContractIcon />,
  'diva-person': <PersonsIcon />,
  'diva-project': <SchemaIcon />,
  'diva-course': <ScienceIcon />,
  'diva-organisation': <CorporateFareIcon />,
  'diva-journal': <NewspaperIcon />,
  'diva-subject': <HistoryEduIcon />,
  'diva-programme': <SchoolIcon />,
  'diva-series': <NewsstandIcon />,
  'diva-localGenericMarkup': <EditNoteIcon />,
  'diva-publisher': <FullCoverageIcon />,
  'diva-funder': <AttachMoneyIcon />,
};

const sortOrder = [
  'diva-output',
  'diva-person',
  'diva-project',
  'diva-course',
  'diva-organisation',
  'diva-journal',
  'diva-subject',
  'diva-programme',
  'diva-series',
  'diva-localGenericMarkup',
  'diva-publisher',
  'diva-funder',
];

export const TopNavigation = ({
  recordTypes,
  onNavigationClick,
}: TopNavigationProps) => {
  const { t } = useTranslation();
  if (recordTypes.length < 2) {
    return null;
  }

  return (
    <nav className={styles['top-navigation']}>
      <ul>
        {recordTypes
          .sort((a, b) => {
            const aIndex = sortOrder.indexOf(a.id);
            const bIndex = sortOrder.indexOf(b.id);
            return (
              (aIndex === -1 ? Infinity : aIndex) -
              (bIndex === -1 ? Infinity : bIndex)
            );
          })
          .map((recordType) => (
            <li key={recordType.id}>
              <NavigationLink
                to={href('/:recordType', { recordType: recordType.id })}
                label={t(recordType.textId)}
                icon={icons[recordType.id]}
                onClick={onNavigationClick}
              />
            </li>
          ))}
      </ul>
    </nav>
  );
};
