import type { ActionLinks } from '@/cora/cora-data/CoraData.server';
import axios from 'axios';

export const deleteAuthTokenFromCora = async (
  actionLinks: ActionLinks,
  authToken: string | undefined,
) => {
  const url = actionLinks.delete;
  if (url === undefined) {
    throw new Error('Missing actionLink URL');
  }

  const headers = {
    Authtoken: authToken,
  };
  return axios.request({
    method: actionLinks.delete?.requestMethod,
    url: actionLinks.delete?.url,
    headers,
  });
};
