import { useLanguage } from '@/i18n/useLanguage';
import { useAllMembers } from '@/utils/rootLoaderDataUtils';
import { getMemberByPermissionUnit } from '@/utils/getMemberByPermissionUnit';
import styles from './MemberBadge.module.css';

interface MemberBadgeProps {
  permissionUnit: string | undefined;
}

export const MemberBadge = ({ permissionUnit }: MemberBadgeProps) => {
  const language = useLanguage();
  const members = useAllMembers();
  const member = getMemberByPermissionUnit(members, permissionUnit);

  if (!member) {
    return null;
  }

  return (
    <span
      className={styles.badge}
      style={
        {
          '--badge-color': member.backgroundColor,
          '--badge-text-color': member.textColor,
        } as React.CSSProperties
      }
    >
      {member.logo?.svg && (
        <span
          className={styles.logo}
          role='img'
          aria-label={`${member.pageTitle[language]} logo`}
          dangerouslySetInnerHTML={{ __html: member.logo.svg }}
        />
      )}
    </span>
  );
};
