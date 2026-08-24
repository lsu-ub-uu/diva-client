import { httpClient } from '@/cora/httpClient.server';
import type { Auth } from '@/auth/Auth';

export const deleteAuthTokenFromCora = async (auth: Auth) => {
  return httpClient.action(auth.actionLinks.delete);
};
