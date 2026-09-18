import { useLanguage } from '@/i18n/useLanguage';
import { useAllMembers } from '@/utils/rootLoaderDataUtils';
import { getMemberByPermissionUnit } from '@/utils/getMemberByPermissionUnit';
import styles from './MemberBranding.module.css';

interface MemberBrandingProps {
  permissionUnit: string | undefined;
}

export const MemberBranding = ({ permissionUnit }: MemberBrandingProps) => {
  const language = useLanguage();
  const members = useAllMembers();
  const member = getMemberByPermissionUnit(members, permissionUnit);

  if (!member) {
    return null;
  }

  return (
    <aside
      className={styles.branding}
      style={
        {
          '--branding-bg': member.backgroundColor,
          '--branding-text': member.textColor,
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
      <span className={styles.title}>{member.pageTitle[language]}</span>
    </aside>
  );
};
