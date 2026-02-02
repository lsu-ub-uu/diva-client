import styles from './ActionBar.module.css';
import { Button, type ButtonProps } from '@/components/Button/Button';

export const ActionBarButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <div className={styles['action-bar-button']}>
      <Button size='small' variant='tertiary' {...rest}>
        {children}
      </Button>
    </div>
  );
};
