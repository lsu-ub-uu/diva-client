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
  PaletteIcon,
  PersonsIcon,
  SchemaIcon,
  SchoolIcon,
  ScienceIcon,
} from '@/icons';
import type { ReactNode } from 'react';
import { NavigationLink } from '@/components/Layout/NavigationLink/NavigationLink';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import { useTranslation } from 'react-i18next';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  recordTypes: BFFRecordType[];
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
  'diva-theme': <PaletteIcon />,
  'diva-funder': <AttachMoneyIcon />,
};

export const TopNavigation = ({ recordTypes }: TopNavigationProps) => {
  const { t } = useTranslation();
  if (recordTypes.length < 2) {
    return null;
  }

  return (
    <nav className={styles['top-navigation']}>
      <ul>
        {recordTypes.map((recordType) => (
          <li key={recordType.id}>
            <NavigationLink
              to={`/${recordType.id}`}
              label={t(recordType.textId)}
              icon={icons[recordType.id]}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
