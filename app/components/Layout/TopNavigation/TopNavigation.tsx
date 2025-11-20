import styles from './TopNavigation.module.css';
import {
  AttachMoneyIcon,
  CachedIcon,
  ContractIcon,
  CorporateFareIcon,
  DesignServicesIcon,
  EditNoteIcon,
  FullCoverageIcon,
  HistoryEduIcon,
  MemberSettingsIcon,
  NewspaperIcon,
  NewsstandIcon,
  PersonsIcon,
  SchemaIcon,
  SchoolIcon,
  ScienceIcon,
} from '@/icons';
import { useEffect, useRef, type ReactNode } from 'react';
import { NavigationLink } from '@/components/Layout/NavigationLink/NavigationLink';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import { useTranslation } from 'react-i18next';
import { Form, href, useLocation } from 'react-router';
import { useIsDevMode } from '@/utils/useIsDevMode';
import { Button } from '@/components/Button/Button';

export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  recordTypes: BFFRecordType[];
  editableMember: string | undefined;
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
  editableMember,
  onNavigationClick,
}: TopNavigationProps) => {
  const navRef = useRef<HTMLElement>(null);
  const devMode = useIsDevMode();
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  const { t } = useTranslation();

  useEffect(() => {
    if (!navRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('observer!');
      },
      { threshold: [1] },
    );

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  if (recordTypes.length < 2) {
    return null;
  }

  return (
    <nav className={styles['top-navigation']} ref={navRef}>
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
        {editableMember && (
          <li>
            <NavigationLink
              to={href('/:recordType/:recordId/update', {
                recordType: 'diva-member',
                recordId: editableMember,
              })}
              label='Medlems­inställningar'
              icon={<MemberSettingsIcon />}
              onClick={onNavigationClick}
            />
          </li>
        )}
        {devMode && (
          <>
            <li>
              <NavigationLink
                to={href('/design-system')}
                label='Design system'
                icon={<DesignServicesIcon />}
              />
            </li>
            <li>
              <Form action={href('/refreshDefinitions')} method='POST'>
                <input type='hidden' name='returnTo' value={returnTo} />
                <Button variant='tertiary' type='submit' fullWidth>
                  <CachedIcon />
                </Button>
              </Form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
