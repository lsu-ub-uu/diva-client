import type { BFFMember } from '@/cora/bffTypes.server';
import { Button } from '@/components/Button/Button';
import { Popover } from '@/components/Popover/Popover';
import { useLanguage } from '@/i18n/useLanguage';
import { CheckIcon, ChevronDownIcon } from '@/icons/icons';
import clsx from 'clsx';
import { useFetcher } from 'react-router';
import styles from './MemberPicker.module.css';

interface MemberPickerProps {
  member: BFFMember | undefined;
  members: BFFMember[];
}

const POPOVER_ID = 'member-picker-popover';

const allMembersLabel = (language: 'sv' | 'en') =>
  language === 'en' ? 'All members' : 'Alla medlemmar';

const isAllMembers = (member: BFFMember | undefined) =>
  !member || member.id === 'diva';

const MemberLogoTile = ({
  member,
  language,
}: {
  member: BFFMember;
  language: 'sv' | 'en';
}) =>
  member.logo?.svg ? (
    <span
      className={styles['logo-tile']}
      style={
        {
          background: member.backgroundColor,
          color: member.textColor,
        } as React.CSSProperties
      }
    >
      <span
        className={styles.logo}
        role='img'
        aria-label={`${member.pageTitle[language]} logo`}
        dangerouslySetInnerHTML={{ __html: member.logo.svg }}
      />
    </span>
  ) : null;

export const MemberPicker = ({ member, members }: MemberPickerProps) => {
  const language = useLanguage();
  const fetcher = useFetcher();

  const pendingMember = fetcher.formData?.get('member');
  const currentId = pendingMember
    ? String(pendingMember)
    : (member?.id ?? 'diva');
  const currentMember = members.find((m) => m.id === currentId);

  return (
    <div className={styles['member-picker']}>
      <Button
        variant='tertiary'
        className={styles.trigger}
        popoverTarget={POPOVER_ID}
        style={
          {
            '--picker-accent': isAllMembers(currentMember)
              ? 'var(--color-diva-purple)'
              : currentMember?.backgroundColor,
          } as React.CSSProperties
        }
      >
        <span className={styles['trigger-value']}>
          {currentMember && (
            <span className={styles['option-logo-wrapper']}>
              <MemberLogoTile member={currentMember} language={language} />
            </span>
          )}
        </span>
        <span className={styles['trigger-label']}>
          {isAllMembers(currentMember)
            ? allMembersLabel(language)
            : currentMember?.pageTitle[language]}
        </span>
        <ChevronDownIcon className={styles.chevron} />
      </Button>

      <Popover
        id={POPOVER_ID}
        closeButton={false}
        anchor='bottom'
        className={styles.panel}
      >
        <ul className={styles.options}>
          {members.toReversed().map((option) => {
            const all = isAllMembers(option);
            const selected = option.id === currentId;
            return (
              <li key={option.id}>
                <fetcher.Form method='post' action='/'>
                  <input type='hidden' name='intent' value='changeMember' />
                  <button
                    type='submit'
                    name='member'
                    value={option.id}
                    className={clsx(styles.option, selected && styles.selected)}
                    style={
                      {
                        '--option-accent': all
                          ? 'var(--color-diva-purple)'
                          : option.backgroundColor,
                      } as React.CSSProperties
                    }
                    onClick={() =>
                      document.getElementById(POPOVER_ID)?.hidePopover?.()
                    }
                  >
                    <span className={styles['option-logo-wrapper']}>
                      {<MemberLogoTile member={option} language={language} />}
                    </span>
                    <span className={styles['option-label']}>
                      {all
                        ? allMembersLabel(language)
                        : option.pageTitle[language]}
                    </span>
                    {selected && (
                      <CheckIcon className={styles['option-check']} />
                    )}
                  </button>
                </fetcher.Form>
              </li>
            );
          })}
        </ul>
      </Popover>
    </div>
  );
};
