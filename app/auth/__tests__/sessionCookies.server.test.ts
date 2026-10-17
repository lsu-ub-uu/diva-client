import { createMockAuth } from '@/auth/__mocks__/auth';
import {
  sessionContext,
  sessionMiddleware,
} from '@/auth/sessionMiddleware.server';
import {
  commitSession,
  getSession,
  type Notification,
} from '@/auth/sessions.server';
import { deleteSession } from '@/data/deleteSession.server';
import { loginWithUsernameAndPassword } from '@/data/loginWithUsernameAndPassword.server';
import {
  action as loginAction,
  loader as loginLoader,
} from '@/routes/auth/login';
import { action as logoutAction } from '@/routes/auth/logout';
import i18n from 'i18next';
import { RouterContextProvider } from 'react-router';
import { i18nContext } from 'server/i18n';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/data/loginWithUsernameAndPassword.server');
vi.mock('@/data/deleteSession.server');

const notification: Notification = {
  severity: 'error',
  summary: 'Invalid credentials',
};

describe('session cookies', () => {
  it('does not set a cookie when a guest reads empty session context', async () => {
    const response = await withSession(createRequest('/'), async (context) => {
      const session = context.get(sessionContext);
      expect(session.auth).toBeUndefined();
      expect(session.notification).toBeUndefined();
      return new Response();
    });

    expect(response.headers.has('Set-Cookie')).toBe(false);
  });

  it.each([undefined, '__session=invalid', 'preferences=value'])(
    'does not set a cookie for an anonymous login page request with cookie %s',
    async (cookie) => {
      const request = createRequest('/login', cookie);
      const response = await withSession(request, (context) =>
        loadLogin(request, context),
      );

      expect(response.headers.has('Set-Cookie')).toBe(false);
      expect(await response.json()).toEqual({
        breadcrumb: 'divaClient_LoginText',
        returnTo: null,
        loginUnit: null,
      });
    },
  );

  it('preserves login page parameters without setting a cookie', async () => {
    const request = createRequest(
      '/login?returnTo=%2Frecords&loginUnit=password',
    );
    const response = await withSession(request, (context) =>
      loadLogin(request, context),
    );

    expect(response.headers.has('Set-Cookie')).toBe(false);
    expect(await response.json()).toMatchObject({
      returnTo: '/records',
      loginUnit: 'password',
    });
  });

  it.each(['/login', '/login?returnTo=%2Frecords'])(
    'redirects authenticated users from %s',
    async (path) => {
      const session = await getSession();
      session.set('auth', createMockAuth());
      const request = createRequest(path, await commitSession(session));
      const response = await withSession(request, (context) =>
        loadLogin(request, context),
      );

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe(
        path.includes('returnTo') ? '/records' : '/',
      );
      expect(response.headers.has('Set-Cookie')).toBe(false);
    },
  );

  it('persists a guest notification and clears it after it is displayed', async () => {
    const postResponse = await withSession(
      createRequest('/login', undefined, new FormData()),
      async (context) => {
        context.get(sessionContext).flashNotification(notification);
        return new Response();
      },
    );
    const cookie = postResponse.headers.get('Set-Cookie')!;
    expect(cookie).toMatch(/^__session=/);

    const request = createRequest('/login', cookie);
    const response = await withSession(request, async (context) => {
      // The root and login loaders share the same notification.
      expect(context.get(sessionContext).notification).toMatchObject(
        notification,
      );
      return loadLogin(request, context);
    });

    expect(await response.json()).toMatchObject({
      notification: { ...notification, id: expect.any(String) },
    });
    const clearedCookie = response.headers.get('Set-Cookie')!;
    expect(response.headers.getSetCookie()).toHaveLength(1);
    expect(clearedCookie).toMatch(/^__session=/);
    expect((await getSession(clearedCookie)).has('notification')).toBe(false);

    const nextRequest = createRequest('/login', clearedCookie);
    const nextResponse = await withSession(nextRequest, (context) =>
      loadLogin(nextRequest, context),
    );
    expect(nextResponse.headers.has('Set-Cookie')).toBe(false);
    expect(await nextResponse.json()).not.toHaveProperty('notification');
  });

  it('does not persist a guest notification created and read during GET', async () => {
    const request = createRequest('/login');
    const response = await withSession(request, async (context) => {
      context.get(sessionContext).flashNotification(notification);
      return loadLogin(request, context);
    });

    expect(await response.json()).toMatchObject({
      notification: { ...notification, id: expect.any(String) },
    });
    expect(response.headers.has('Set-Cookie')).toBe(false);
  });

  it('uses current auth after middleware removes expired credentials', async () => {
    const session = await getSession();
    session.set('auth', createMockAuth());
    const request = createRequest('/login', await commitSession(session));
    const response = await withSession(request, async (context) => {
      context.get(sessionContext).removeAuth();
      context.get(sessionContext).flashNotification(notification);
      return loadLogin(request, context);
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ notification });
    const cookie = response.headers.get('Set-Cookie')!;
    expect(cookie).toMatch(/^__session=/);
    expect((await getSession(cookie)).has('auth')).toBe(false);
  });

  it('persists auth after successful login', async () => {
    const auth = createMockAuth();
    vi.mocked(loginWithUsernameAndPassword).mockResolvedValue(auth);
    const request = createRequest('/login', undefined, loginForm());
    const response = await withSession(request, async (context) => {
      const result = await loginAction(routeArgs(request, context));
      expect(result).toBeInstanceOf(Response);
      return result!;
    });

    expect(response.headers.get('Location')).toBe('/');
    const cookie = response.headers.get('Set-Cookie')!;
    expect(cookie).toMatch(/^__session=/);
    expect((await getSession(cookie)).get('auth')).toEqual(auth);
  });

  it('persists the error notification after failed login', async () => {
    vi.mocked(loginWithUsernameAndPassword).mockResolvedValue(null);
    const request = createRequest('/login', undefined, loginForm());
    const response = await withSession(request, async (context) => {
      await loginAction(routeArgs(request, context));
      return new Response();
    });

    const cookie = response.headers.get('Set-Cookie')!;
    expect(cookie).toMatch(/^__session=/);
    const session = await getSession(cookie);
    expect(session.has('auth')).toBe(false);
    expect(session.get('notification')).toMatchObject({
      severity: 'error',
      summary: 'divaClient_loginInvalidCredentialsText',
    });
  });

  it.each([false, true])(
    'expires the cookie on logout (authenticated: %s)',
    async (authenticated) => {
      const auth = createMockAuth();
      const session = await getSession();
      if (authenticated) session.set('auth', auth);
      const form = new FormData();
      form.set('returnTo', '/');
      const request = createRequest(
        '/logout',
        await commitSession(session),
        form,
      );
      const response = await withSession(request, (context) =>
        logoutAction(routeArgs(request, context)),
      );

      expect(response.headers.get('Location')).toBe('/');
      expect(response.headers.get('Set-Cookie')).toContain('__session=;');
      expect(response.headers.get('Set-Cookie')).toContain(
        'Expires=Thu, 01 Jan 1970',
      );
      if (authenticated) {
        expect(deleteSession).toHaveBeenCalledWith(auth);
      } else {
        expect(deleteSession).not.toHaveBeenCalled();
      }
    },
  );
});

function createRequest(path: string, cookie?: string, form?: FormData) {
  return new Request(`http://localhost${path}`, {
    headers: cookie ? { Cookie: cookie.split(';')[0] } : undefined,
    method: form ? 'POST' : 'GET',
    body: form,
  });
}

function routeArgs(request: Request, context: RouterContextProvider) {
  return {
    request,
    context,
    params: {},
    url: new URL(request.url),
    pattern: '',
  };
}

async function loadLogin(request: Request, context: RouterContextProvider) {
  const result = await loginLoader(routeArgs(request, context));
  return result instanceof Response
    ? result
    : Response.json(result.data, result.init ?? undefined);
}

async function withSession(
  request: Request,
  handle: (context: RouterContextProvider) => Promise<Response>,
) {
  const context = new RouterContextProvider();
  context.set(i18nContext, i18n);
  let response: Response;
  await sessionMiddleware(routeArgs(request, context), async () => {
    response = await handle(context);
    return response;
  });
  return response!;
}

function loginForm() {
  const form = new FormData();
  form.set('loginType', 'password');
  form.set('password.loginId.value', 'test-user');
  form.set('password.password.value', 'test-password');
  return form;
}
