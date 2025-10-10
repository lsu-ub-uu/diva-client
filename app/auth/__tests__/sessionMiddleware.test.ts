import { describe, expect, it, vi } from 'vitest';
import { sessionMiddleware } from '../sessionMiddleware.server';
import type { RouterContextProvider, Session, SessionData } from 'react-router';
import {
  getSessionFromCookie,
  commitSession,
  destroySession,
  type SessionFlashData,
} from '../sessions.server';

describe('sessionMiddleware', () => {
  vi.mock('../sessions.server');

  it('sets auth', async () => {
    const mockRequest = createMockRequest();
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession();
    const { mockCommitSession } = setupSessionMocks(mockSession);

    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      sessionContext.setAuth({ userId: '123' });
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    const sessionContext = setContextSpy.mock.calls[0][1];

    expect(mockSession.set).toHaveBeenCalledWith('auth', { userId: '123' });

    expect(mockResponse.headers.append).toHaveBeenCalledWith(
      'Set-Cookie',
      'mock-cookie-value',
    );
    expect(mockCommitSession).toHaveBeenCalledWith(mockSession);

    expect(sessionContext.auth).toEqual({ userId: '123' });
  });

  it('updates auth on context when calling removeAuth', async () => {
    const mockRequest = createMockRequest();
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({ auth: { userId: '123' } });
    const { mockCommitSession } = setupSessionMocks(mockSession);

    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      sessionContext.removeAuth();
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    const sessionContext = setContextSpy.mock.calls[0][1];

    expect(mockSession.unset).toHaveBeenCalledWith('auth');

    expect(mockResponse.headers.append).toHaveBeenCalledWith(
      'Set-Cookie',
      'mock-cookie-value',
    );
    expect(mockCommitSession).toHaveBeenCalledWith(mockSession);

    expect(sessionContext.auth).toEqual(undefined);
  });

  it('destroys session when calling destroySession', async () => {
    const mockRequest = createMockRequest();
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({ auth: { userId: '123' } });
    const { mockDestroySession } = setupDestroySessionMock(mockSession);

    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      sessionContext.destroySession();
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    expect(mockResponse.headers.append).toHaveBeenCalledWith(
      'Set-Cookie',
      'destroy-cookie-value',
    );
    expect(mockDestroySession).toHaveBeenCalledWith(mockSession);
  });

  it('flashNotification on GET request updates context but does not set cookie or commit session', async () => {
    const mockRequest = createMockRequest({ method: 'GET' });
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({ auth: { userId: '123' } });
    const { mockCommitSession } = setupSessionMocks(
      mockSession,
      'commit-cookie-value',
    );

    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      sessionContext.flashNotification({
        severity: 'success',
        summary: 'Test notification',
      });
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    expect(mockSession.flash).not.toHaveBeenCalled();

    expect(mockResponse.headers.append).not.toHaveBeenCalled();
    expect(mockCommitSession).not.toHaveBeenCalled();

    const sessionContext = setContextSpy.mock.calls[0][1];
    expect(sessionContext.notification).toEqual({
      severity: 'success',
      summary: 'Test notification',
    });
  });

  it('flashNotification on POST request sets cookie and commits session but does not update context', async () => {
    const mockRequest = createMockRequest({ method: 'POST' });
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({ auth: { userId: '123' } });
    const { mockCommitSession } = setupSessionMocks(
      mockSession,
      'commit-cookie-value',
    );

    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      sessionContext.flashNotification({
        severity: 'success',
        summary: 'Test notification',
      });
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    expect(mockSession.flash).toHaveBeenCalledWith('notification', {
      severity: 'success',
      summary: 'Test notification',
    });

    expect(mockResponse.headers.append).toHaveBeenCalledWith(
      'Set-Cookie',
      'commit-cookie-value',
    );
    expect(mockCommitSession).toHaveBeenCalledWith(mockSession);

    const sessionContext = setContextSpy.mock.calls[0][1];
    expect(sessionContext.notification).toBeUndefined();
  });

  it('does not commit session if there was not notification on session', async () => {
    const mockRequest = createMockRequest();
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({
      auth: { userId: '123' },
      notification: undefined,
    });
    const { mockCommitSession } = setupSessionMocks(
      mockSession,
      'commit-cookie-value',
    );

    let notificationReadInNextFunction;
    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      notificationReadInNextFunction = sessionContext.notification;
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    expect(mockResponse.headers.append).not.toHaveBeenCalled();
    expect(mockCommitSession).not.toHaveBeenCalled();

    expect(notificationReadInNextFunction).toBeUndefined();
    const sessionContext = setContextSpy.mock.calls[0][1];
    expect(sessionContext.notification).toBeUndefined();
  });

  it('commits session if notification was read', async () => {
    const mockRequest = createMockRequest();
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({
      auth: { userId: '123' },
      notification: { summary: 'Test notification' },
    });
    const { mockCommitSession } = setupSessionMocks(
      mockSession,
      'commit-cookie-value',
    );

    let notificationReadInNextFunction;
    const mockNextFunction = vi.fn().mockImplementation(async () => {
      const sessionContext = setContextSpy.mock.calls[0][1];
      notificationReadInNextFunction = sessionContext.notification;
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    expect(mockResponse.headers.append).toHaveBeenCalledWith(
      'Set-Cookie',
      'commit-cookie-value',
    );
    expect(mockCommitSession).toHaveBeenCalledWith(mockSession);

    expect(notificationReadInNextFunction).toEqual({
      summary: 'Test notification',
    });
    const sessionContext = setContextSpy.mock.calls[0][1];
    expect(sessionContext.notification).toEqual({
      summary: 'Test notification',
    });
  });

  it('does not commit session if notification were not read', async () => {
    const mockRequest = createMockRequest();
    const { mockContext, setContextSpy } = createMockContext();
    const mockResponse = createMockResponse();
    const mockSession = createMockSession({
      auth: { userId: '123' },
      notification: { summary: 'Test notification' },
    });
    const { mockCommitSession } = setupSessionMocks(
      mockSession,
      'commit-cookie-value',
    );

    const mockNextFunction = vi.fn().mockImplementation(async () => {
      return mockResponse;
    });

    await sessionMiddleware(
      { request: mockRequest, context: mockContext, params: {} },
      mockNextFunction,
    );

    expect(setContextSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalledTimes(1);

    expect(mockResponse.headers.append).not.toHaveBeenCalled();
    expect(mockCommitSession).not.toHaveBeenCalled();

    const sessionContext = setContextSpy.mock.calls[0][1];
    expect(sessionContext.notification).toEqual({
      summary: 'Test notification',
    });
  });
});

interface MockRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

function createMockRequest(
  { method }: MockRequestOptions = { method: 'GET' },
): Request {
  return { method } as Request;
}

function createMockResponse() {
  return {
    headers: {
      append: vi.fn(),
    },
  } as unknown as Response;
}

function createMockContext() {
  const setContextSpy = vi.fn();
  const mockContext = {
    set: setContextSpy,
  } as unknown as RouterContextProvider;
  return { mockContext, setContextSpy };
}

interface MockSessionOptions {
  auth?: any;
  notification?: any;
}

function createMockSession(options: MockSessionOptions = {}) {
  return {
    get: vi.fn().mockImplementation((key: string) => {
      if (key === 'auth') return options.auth;
      if (key === 'notification') return options.notification;
      return undefined;
    }),
    set: vi.fn(),
    unset: vi.fn(),
    flash: vi.fn(),
  } as unknown as Session<SessionData, SessionFlashData>;
}

function setupSessionMocks(
  session: Session<SessionData, SessionFlashData>,
  commitCookieValue = 'mock-cookie-value',
) {
  const mockCommitSession = vi
    .mocked(commitSession)
    .mockResolvedValue(commitCookieValue);
  vi.mocked(getSessionFromCookie).mockResolvedValue(session);
  return { mockCommitSession };
}

function setupDestroySessionMock(
  session: Session<SessionData, SessionFlashData>,
  destroyCookieValue = 'destroy-cookie-value',
) {
  const mockDestroySession = vi
    .mocked(destroySession)
    .mockResolvedValue(destroyCookieValue);
  vi.mocked(getSessionFromCookie).mockResolvedValue(session);
  return { mockDestroySession };
}
