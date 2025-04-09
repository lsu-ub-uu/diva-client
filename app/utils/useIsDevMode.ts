import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useIsDevMode = () => {
  const [dev, setDev] = useState(false);
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('dev');

  useEffect(() => {
    if (searchParam === 'false') {
      setDev(false);
      localStorage.removeItem('diva-dev');
    } else if (searchParam === 'true') {
      setDev(true);
      localStorage.setItem('diva-dev', 'true');
    } else {
      const isDev = localStorage.getItem('diva-dev');
      setDev(isDev !== null);
    }
  }, [searchParam]);

  return dev;
};
