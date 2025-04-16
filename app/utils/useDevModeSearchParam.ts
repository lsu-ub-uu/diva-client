import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export const useDevModeSearchParam = () => {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('dev');

  useEffect(() => {
    if (searchParam === 'false') {
      localStorage.removeItem('diva-dev');
    } else if (searchParam === 'true') {
      localStorage.setItem('diva-dev', 'true');
    }
  }, [searchParam]);
};
