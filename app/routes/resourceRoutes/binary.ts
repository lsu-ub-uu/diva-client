import type { Route } from './+types/binary';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { coraApiUrl } from '@/cora/helper.server';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

  return await fetch(
    coraApiUrl(
      `/record/binary/${params.id}/${params.name}?authToken=${auth?.data.token}`,
    ),
  );
};

export const action = async ({ request, params }: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);

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
