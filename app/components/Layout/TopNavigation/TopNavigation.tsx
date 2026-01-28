import { Button } from '@/components/Button/Button';
import { NavigationLink } from '@/components/Layout/NavigationLink/NavigationLink';
import type { BFFRecordType } from '@/cora/transform/bffTypes.server';
import { useIsDevMode } from '@/utils/useIsDevMode';
import {
  BookCheckIcon,
  BookOpenIcon,
  BuildingIcon,
  ChartGanttIcon,
  FlaskRoundIcon,
  GraduationCapIcon,
  HandCoinsIcon,
  LibraryIcon,
  NewspaperIcon,
  NotebookTabsIcon,
  PaletteIcon,
  RefreshCwIcon,
  Settings2Icon,
  TagIcon,
  UsersIcon,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, href, useLocation } from 'react-router';
import styles from './TopNavigation.module.css';
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
  'diva-localLabel',
  'diva-publisher',
  'diva-funder',
];
export interface TopNavigationLink {
  label: string;
  to: string;
}

export interface TopNavigationProps {
  recordTypes: BFFRecordType[];
  editableMember?: string;
  onNavigationClick?: () => void;
}

export const icons: Record<string, ReactNode> = {
  'diva-output': <BookOpenIcon />,
  'diva-person': <UsersIcon />,
  'diva-project': <ChartGanttIcon />,
  'diva-course': <NotebookTabsIcon />,
  'diva-organisation': <BuildingIcon />,
  'diva-journal': <NewspaperIcon />,
  'diva-subject': <FlaskRoundIcon />,
  'diva-programme': <GraduationCapIcon />,
  'diva-series': <LibraryIcon />,
  'diva-localLabel': <TagIcon />,
  'diva-publisher': <BookCheckIcon />,
  'diva-funder': <HandCoinsIcon />,
};

export const TopNavigation = ({
  recordTypes,
  editableMember,
  onNavigationClick,
}: TopNavigationProps) => {
  const devMode = useIsDevMode();
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname + location.search);

  const { t } = useTranslation();

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
        {editableMember && (
          <li>
            <NavigationLink
              to={href('/:recordType/:recordId/update', {
                recordType: 'diva-member',
                recordId: editableMember,
              })}
              label='Medlems­inställningar'
              icon={<Settings2Icon />}
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
                icon={<PaletteIcon />}
              />
            </li>
            <li>
              <Form
                action={href('/refreshDefinitions')}
                method='POST'
                reloadDocument
              >
                <input type='hidden' name='returnTo' value={returnTo} />
                <Button variant='tertiary' type='submit' fullWidth>
                  <RefreshCwIcon />
                </Button>
              </Form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
