/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
// Utility to detect iOS (2026-safe)
import styles from './DrawerDialog.module.css';
import { clsx } from 'clsx';

interface DrawerDialogProps {
  children: ReactNode;
  ref: RefObject<HTMLDialogElement | null>;
  variant?: 'left' | 'right';
  className?: string;
}

export const DrawerDialog = ({
  children,
  ref,
  variant = 'left',
  className,
}: DrawerDialogProps) => {
  const dialogPanelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  const handleBeforeToggle = (e: ToggleEvent) => {
    if (e.newState === 'open') {
      scrollYRef.current = window.scrollY;
      document.body.classList.add('dialog-open');
      document.body.style.top = `-${scrollYRef.current}px`;
    } else {
      document.body.classList.remove('dialog-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollYRef.current);
      scrollYRef.current = 0;
    }
  };

  useEffect(() => {
    if (!isIOS()) return;

    const dialog = ref.current;
    dialog?.addEventListener('beforetoggle', handleBeforeToggle);
    return () => {
      dialog?.removeEventListener('beforetoggle', handleBeforeToggle);
    };
  }, [ref]);

  return (
    <dialog
      ref={ref}
      className={clsx(styles['dialog'], className)}
      data-variant={variant}
      onClick={(e) => {
        if (!dialogPanelRef.current?.contains(e.target as Node)) {
          ref?.current?.close();
        }
      }}
    >
      <div ref={dialogPanelRef} className={styles['dialog-panel']}>
        {children}
      </div>
    </dialog>
  );
};

export const useDrawerDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return {
    showDrawerDialog: () => {
      dialogRef.current?.showModal();
    },
    closeDrawerDialog: () => {
      dialogRef.current?.close();
    },
    drawerDialogRef: dialogRef,
  };
};

const isIOS = () => {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document)
  );
};
