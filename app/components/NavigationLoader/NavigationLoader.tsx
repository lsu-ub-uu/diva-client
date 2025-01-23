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

import { LinearProgress } from '@mui/material';
import { useNavigation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import styles from './NavigationLoader.module.css';

const LOADER_DELAY = 500;

export const NavigationLoader = () => {
  const navigation = useNavigation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [showLoader, setShowLoader] = useState(false);

  /**
   * Show loader if navigation takes longer than LOADER_DELAY milliseconds
   */
  useEffect(() => {
    if (navigation.state === 'idle') {
      clearTimeout(timerRef.current);
      setShowLoader(false);
    } else {
      timerRef.current = setTimeout(() => setShowLoader(true), LOADER_DELAY);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [navigation.state]);

  if (showLoader) {
    return (
      <LinearProgress
        color='primary'
        className={styles.navigationLoader}
        // sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      />
    );
  }
};
