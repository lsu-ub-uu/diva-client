import type { loader } from '@/root';
import { useRouteLoaderData } from 'react-router';

export const useMember = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  return rootLoaderData?.member;
};

export const useAllMembers = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  return rootLoaderData?.members ?? [];
};

export const useUser = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  return rootLoaderData?.user;
};

export const useLoginUnits = () => {
  const rootLoaderData = useRouteLoaderData<typeof loader>('root');
  return rootLoaderData?.loginUnits;
};
