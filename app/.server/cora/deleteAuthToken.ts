import type { ActionLinks } from '@/.server/cora/cora-data/CoraData';
import axios from 'axios';
import { getAxiosRequestFromActionLink } from '@/.server/cora/helper';

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
