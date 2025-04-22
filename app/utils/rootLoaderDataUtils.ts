import type { loader } from '@/root';
import { useRouteLoaderData } from 'react-router';

export const useTheme = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  return rootLoaderData?.theme;
};

export const useAuth = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  return rootLoaderData?.auth;
};
