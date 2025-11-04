import { useEffect, useState } from 'react';

export const useIsDevMode = () => {
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDev(
      typeof localStorage !== 'undefined' &&
        localStorage.getItem('diva-dev') !== null,
    );
  }, []);

  return isDev;
};
