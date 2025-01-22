import type { ActionLinks } from '@/cora/cora-data/types.server';
import axios from 'axios';
import { getAxiosRequestFromActionLink } from '@/cora/helper.server';

export const deleteAuthTokenFromCora = async (
  actionLinks: ActionLinks,
  authToken: string | undefined,
) => {
  if (actionLinks.delete === undefined) {
    throw new Error('Missing actionLink URL');
  }
  return axios.request(
    getAxiosRequestFromActionLink(actionLinks.delete, authToken),
  );
};
