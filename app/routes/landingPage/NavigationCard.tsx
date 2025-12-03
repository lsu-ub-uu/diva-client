import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './NavigationCard.module.css';

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
          <Icon className={styles[`card-icon ${iconColor}`]} />
        ) : (
          iconNode
        )}
        <h2 className={styles['card-title']}>{title}</h2>
        <p className={styles['card-description']}>{description}</p>
      </div>
    </Link>
  );
};
