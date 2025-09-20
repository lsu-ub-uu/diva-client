import {
  commitSession,
  getSessionFromCookie,
  type Notification,
} from '@/auth/sessions.server';
import { createContext, type MiddlewareFunction } from 'react-router';

interface NotificationContextType {
  notification: Notification | undefined;
  flashNotification: (notification: Notification) => void;
}

export const notificationContext = createContext<NotificationContextType>();

export const notificationMiddleware: MiddlewareFunction<Response> = async (
  { request, context },
  next,
) => {
  const session = await getSessionFromCookie(request);
  const notification = session.get('notification');
  // session.get() removes flash messages, so we need to commit if there was one
  let sessionUpdated = notification !== undefined;

  context.set(notificationContext, {
    notification,
    flashNotification: (notification) => {
      sessionUpdated = true;
      session.flash('notification', notification);
    },
  });

  const response = await next();

  if (sessionUpdated) {
    response.headers.append('Set-Cookie', await commitSession(session));
  }

  return response;
};
