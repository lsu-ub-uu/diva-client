import { messageIsFromWindowOpenedFromHere } from '@/components/Layout/Header/Login/utils/utils';
import { useEffect } from 'react';
import { useFetcher } from 'react-router';

export const useWebRedirectLogin = ({ returnTo }: { returnTo: string }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    const receiveMessage = (event: MessageEvent<any>) => {
      if (
        messageIsFromWindowOpenedFromHere(event) &&
        event.data.authentication
      ) {
        window.removeEventListener('message', receiveMessage);
        fetcher.submit(
          {
            loginType: 'webRedirect',
            auth: JSON.stringify(event.data),
            returnTo,
          },
          { action: '/login', method: 'post' },
        );
      }
    };

    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  });
};

export const logInWithWebRedirect = (url: string) => {
  window.open(import.meta.env.MODE === 'development' ? '/devLogin' : url);
};
