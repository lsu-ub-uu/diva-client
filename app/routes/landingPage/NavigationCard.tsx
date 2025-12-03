import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './NavigationCard.module.css';
import { clsx } from 'clsx';

interface NavigationCardProps {
  to: string;
  icon?: LucideIcon;
  iconNode?: ReactNode;
  iconColor: string;
  title: string;
  description?: string;
}

export const NavigationCard = ({
  to,
  icon: Icon,
  iconNode,
  iconColor,
  title,
  description,
}: NavigationCardProps) => {
  return (
    <Link to={to} className={styles['navigation-link']}>
      <div className={styles['navigation-card']}>
        {Icon ? (
          <Icon className={clsx(styles[`card-icon`], styles[iconColor])} />
        ) : (
          iconNode
        )}
        <h2 className={styles['card-title']}>{title}</h2>
        <p className={styles['card-description']}>{description}</p>
      </div>
    </Link>
  );
};
