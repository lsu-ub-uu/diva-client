import { authContext } from '@/auth/authMiddleware.server';
import { coraApiUrl } from '@/cora/helper.server';
import type { Route } from './+types/binary';

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const auth = context.get(authContext);

  return await fetch(
    coraApiUrl(
      `/record/binary/${params.id}/${params.name}?authToken=${auth?.data.token}`,
    ),
  );
};

export const action = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const auth = context.get(authContext);

  return await fetch(
    coraApiUrl(
      `/record/binary/${params.id}/${params.name}?authToken=${auth?.data.token}`,
    ),
    {
      body: request.body,
      headers: request.headers,
      method: request.method,
      // @ts-expect-error duplex is not yet in RequestInit
      duplex: 'half',
    },
  );
};
