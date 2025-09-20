import { createContext, type MiddlewareFunction } from 'react-router';
import type { Auth } from './Auth';
import { getSessionFromCookie } from './sessions.server';

export const authContext = createContext<Auth | undefined>();

export const authMiddleware: MiddlewareFunction<Response> = async ({
  request,
  context,
}) => {
  const session = await getSessionFromCookie(request);
  const auth = session.get('auth');
  context.set(authContext, auth);
};
