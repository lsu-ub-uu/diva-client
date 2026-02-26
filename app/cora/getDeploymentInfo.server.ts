import type { DeploymentInfo } from '@/cora/bffTypes.server';
import { coraApiUrl, DEPLOYMENT_INFO_CONTENT_TYPE } from './helper.server';
import axios from 'axios';

export const getDeploymentInfo = async (): Promise<DeploymentInfo> => {
  const response = await axios.get<DeploymentInfo>(coraApiUrl('/'), {
    headers: {
      Accept: DEPLOYMENT_INFO_CONTENT_TYPE,
    },
  });
  return response.data;
};
