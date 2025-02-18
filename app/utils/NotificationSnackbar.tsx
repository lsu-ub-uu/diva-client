/*
 * Copyright 2024 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router';
import type { Notification } from '@/auth/sessions.server';
import { Snackbar } from '@/components/Snackbar/Snackbar';

interface NotificationSnackbarProps {
  notification: Notification | undefined;
}

export const NotificationSnackbar = ({
  notification,
}: NotificationSnackbarProps) => {
  const navigation = useNavigation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (notification && navigation.state === 'idle') {
      setSnackbarOpen(true);
    }
  }, [notification, navigation.state]);

  return (
    <Snackbar
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
      severity={notification?.severity ?? 'info'}
      text={notification?.summary ?? ''}
    />
  );
};
