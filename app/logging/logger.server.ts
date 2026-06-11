import pino from 'pino';

const log = pino();

export { log };

export const logError = (error: unknown, contextMessage?: string) => {
  if (error instanceof Error) {
    log.error(
      { err: error },
      contextMessage ? `${contextMessage}: ${error.message}` : error.message,
    );
  } else {
    log.error({ err: error }, contextMessage ?? 'Unknown error');
  }
};
