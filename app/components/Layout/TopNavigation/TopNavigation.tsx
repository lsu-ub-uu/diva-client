import styles from './TopNavigation.module.css';
import {
  HandCoinsIcon,
  BookOpenIcon,
  BuildingIcon,
  PenLineIcon,
  BookCheckIcon,
  FlaskRoundIcon,
  NewspaperIcon,
  LibraryIcon,
  UsersIcon,
  ChartGnattIcon,
  GraduationCapIcon,
  NotebookTabsIcon,
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
}

const icons: Record<string, ReactNode> = {
  'diva-output': <BookOpenIcon />,
  'diva-person': <UsersIcon />,
  'diva-project': <ChartGnattIcon />,
  'diva-course': <NotebookTabsIcon />,
  'diva-organisation': <BuildingIcon />,
  'diva-journal': <NewspaperIcon />,
  'diva-subject': <FlaskRoundIcon />,
  'diva-programme': <GraduationCapIcon />,
  'diva-series': <LibraryIcon />,
  'diva-localGenericMarkup': <PenLineIcon />,
  'diva-publisher': <BookCheckIcon />,
  'diva-funder': <HandCoinsIcon />,
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

export const TopNavigation = ({ recordTypes }: TopNavigationProps) => {
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
              />
            </li>
          ))}
      </ul>
    </nav>
  );
};
