import type { DeploymentInfo } from '@/data/formDefinition/formDefinitionsDep.server';
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
