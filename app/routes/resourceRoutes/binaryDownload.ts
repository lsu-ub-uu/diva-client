import type { Route } from '../resourceRoutes/+types/binaryDownload';
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
