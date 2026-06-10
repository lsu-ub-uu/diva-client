import axios from 'axios';
import { coraApiUrl, DEPLOYMENT_INFO_CONTENT_TYPE } from './helper.server';
import { log } from '@/logging/logger';

export interface ExampleUser {
  name: string;
  text: string;
  type: string;
  loginId: string;
  appToken: string;
}

export interface DeploymentInfo {
  applicationName: string;
  deploymentName: string;
  coraVersion: string;
  applicationVersion: string;
  urls: {
    REST: string;
    appTokenLogin: string;
    passwordLogin: string;
    record: string;
    recordType: string;
    iiif: string;
    [key: string]: string;
  };
  exampleUsers: ExampleUser[];
}

let cachedDeploymentInfo: DeploymentInfo | null = null;

export const getDeploymentInfo = async (): Promise<DeploymentInfo> => {
  if (cachedDeploymentInfo) {
    return cachedDeploymentInfo;
  }

  log.info('Fetching deployment info from Cora API');
  const response = await axios.get<DeploymentInfo>(coraApiUrl('/'), {
    headers: {
      Accept: DEPLOYMENT_INFO_CONTENT_TYPE,
    },
  });
  cachedDeploymentInfo = response.data;
  log.info('Deployment info fetched successfully');
  return response.data;
};
