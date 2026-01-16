import { sessionContext } from '@/auth/sessionMiddleware.server';
import { coraBinaryUrl } from '@/cora/helper.server';
import type { Route } from './+types/binary';

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { id, name } = params;

  return await fetch(coraBinaryUrl({ id, name, auth }));
};

export const action = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const { id, name } = params;

  const response = await fetch(coraBinaryUrl({ id, name, auth }), {
    body: request.body,
    headers: request.headers,
    method: request.method,
    // @ts-expect-error duplex is not yet in RequestInit
    duplex: 'half',
  });

  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
  });
};
