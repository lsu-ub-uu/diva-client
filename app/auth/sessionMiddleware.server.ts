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
  let auth = session.get('auth') as Auth | undefined;
  let notification = session.get('notification');

  let shouldCommitSession = false;
  let shouldDestroySession = false;

  context.set(sessionContext, {
    get auth() {
      return auth;
    },
    setAuth: (newAuth: Auth) => {
      session.set('auth', newAuth);
      auth = newAuth;
      shouldCommitSession = true;
    },
    removeAuth: () => {
      session.unset('auth');
      auth = undefined;
      shouldCommitSession = true;
    },
    get notification() {
      shouldCommitSession = notification !== undefined;
      return notification;
    },
    flashNotification: (flashedNotification) => {
      if (request.method === 'GET') {
        // For GET request, just add the notification to the context
        notification = flashedNotification;
      } else {
        // For POST request, flash the notification to the session to be shown in subsequent GET
        session.flash('notification', flashedNotification);
        shouldCommitSession = true;
      }
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
