import { getFetchRequestFromActionLink } from '@/cora/helper.server';
import type { Auth } from '@/auth/Auth';

export const deleteAuthTokenFromCora = async (auth: Auth) => {
  const { url, ...init } = getFetchRequestFromActionLink(
    auth.actionLinks.delete,
    auth.data.token,
  );
  return fetch(url, init);
};
