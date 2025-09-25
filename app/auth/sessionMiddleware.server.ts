import { createContext, type MiddlewareFunction } from 'react-router';
import type { Auth } from './Auth';
import {
  commitSession,
  destroySession,
  getSessionFromCookie,
  type Notification,
} from './sessions.server';

export interface SessionContext {
  auth: Auth | undefined;
  setAuth: (auth: Auth) => void;
  removeAuth: () => void;
  notification: Notification | undefined;
  flashNotification: (notification: Notification) => void;
  destroySession: () => void;
}

export const sessionContext = createContext<SessionContext>();

export const sessionMiddleware: MiddlewareFunction<Response> = async (
  { request, context },
  next,
) => {
  const session = await getSessionFromCookie(request);
  const auth = session.get('auth');
  const notification = session.get('notification');

  // If notification flash message was read, we need to commit the session
  let shouldCommitSession = notification !== undefined;
  let shouldDestroySession = false;

  context.set(sessionContext, {
    auth,
    setAuth: (auth: Auth) => {
      session.set('auth', auth);
      shouldCommitSession = true;
    },
    removeAuth: () => {
      session.unset('auth');
      shouldCommitSession = true;
    },
    notification,
    flashNotification: (notification) => {
      session.flash('notification', notification);
      shouldCommitSession = true;
    },
    destroySession: () => {
      shouldDestroySession = true;
    },
  });

  const response = await next();

  if (shouldDestroySession) {
    response.headers.append('Set-Cookie', await destroySession(session));
  } else if (shouldCommitSession) {
    response.headers.append('Set-Cookie', await commitSession(session));
  }
};
