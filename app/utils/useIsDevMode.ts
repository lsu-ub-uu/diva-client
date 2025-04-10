import { useEffect, useState } from 'react';

export const useIsDevMode = () => {
  const [dev, setDev] = useState(false);

  useEffect(() => {
    const isDev = localStorage.getItem('diva-dev');
    setDev(isDev !== null);
  }, []);

  return dev;
};
