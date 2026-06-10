import { sessionContext } from '@/auth/sessionMiddleware.server';
import { coraBinaryUrl } from '@/cora/helper.server';
import type { Route } from './+types/binary';
import { transformCoraBinaryResponse } from './utils/transformCoraBinaryResponse';
import { logError } from '@/utils/logError';

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { id, name } = params;

  try {
    const response = await fetch(coraBinaryUrl({ id, name, auth }));

    if (!response.ok) {
      console.error(
        `Binary download failed: ${response.status} ${response.statusText} for ${name}`,
      );
      return new Response('Failed to download binary', {
        status: response.status,
        statusText: response.statusText,
      });
    }

    return transformCoraBinaryResponse(response, name);
  } catch (error) {
    logError(error, `Binary download error for ${name}:`);

    // Return error response instead of throwing to prevent error boundary
    return new Response('Failed to download binary due to connection error', {
      status: 502,
      statusText: 'Bad Gateway',
    });
  }
};

export const action = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { id, name } = params;

  try {
    const response = await fetch(coraBinaryUrl({ id, name, auth }), {
      body: request.body,
      headers: request.headers,
      method: request.method,
      // @ts-expect-error duplex is not yet in RequestInit
      duplex: 'half',
    });

    if (!response.ok) {
      console.error(
        `Binary upload failed: ${response.status} ${response.statusText} for ${name}`,
      );
    }

    return new Response(null, {
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error(`Binary upload error for ${name}:`, errorMessage);

    // Return error response instead of throwing to prevent form data loss
    return new Response('Failed to upload binary due to connection error', {
      status: 502,
      statusText: 'Bad Gateway',
    });
  }
};
