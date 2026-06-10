import { NotFoundError } from '@/errorHandling/NotFoundError';
import { AxiosError, isAxiosError } from 'axios';
import pino from 'pino';

const log = pino();

export { log };

export const logError = (error: unknown, contextMessage?: string) => {
  if (error instanceof NotFoundError) {
    return;
  }
  if (isAxiosError(error)) {
    if (error.status && error.status >= 500) {
      log.error(formatAxiosError(error, contextMessage));
    }
  } else {
    log.error(contextMessage ? `${contextMessage}: ${error}` : error);
  }
};

const formatAxiosError = (error: AxiosError, contextMessage?: string) => {
  const method = error.config?.method?.toUpperCase();
  const url = formatRequestUrl(error.config?.baseURL, error.config?.url);
  const status = error.response?.status ?? error.status;
  const statusText = error.response?.statusText;
  const code = error.code;
  const responseDetails = formatResponseDetails(error.response?.data);

  const requestDetails = [method, url].filter(Boolean).join(' ');
  const statusDetails = [
    status !== undefined ? `HTTP ${status}` : undefined,
    statusText,
  ]
    .filter(Boolean)
    .join(' ');

  return [
    contextMessage,
    requestDetails,
    statusDetails,
    code,
    error.message,
    responseDetails,
  ]
    .filter(Boolean)
    .join(' | ');
};

const formatRequestUrl = (baseURL?: string, url?: string) => {
  if (!url) {
    return baseURL;
  }

  if (!baseURL || /^https?:\/\//i.test(url)) {
    return url;
  }

  return `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};

const formatResponseDetails = (data: unknown) => {
  if (data === undefined || data === null || data === '') {
    return undefined;
  }

  if (typeof data === 'string') {
    return `response=${data}`;
  }

  try {
    return `response=${JSON.stringify(data)}`;
  } catch {
    return 'response=[unserializable]';
  }
};
