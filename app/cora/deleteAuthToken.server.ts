import axios from 'axios';
import { getAxiosRequestFromActionLink } from '@/cora/helper.server';
import type { Auth } from '@/auth/Auth';

export const deleteAuthTokenFromCora = async (auth: Auth) => {
  return axios.request(
    getAxiosRequestFromActionLink(auth.actionLinks.delete, auth.data.token),
  );
};
