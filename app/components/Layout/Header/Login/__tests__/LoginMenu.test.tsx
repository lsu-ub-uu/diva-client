import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LoginMenu from '../LoginMenu';
import { createRoutesStub } from 'react-router';
import * as useWebRedirectLoginModule from '@/auth/useWebRedirectLogin';
import type { LoginDefinition } from '@/data/loginDefinition/loginDefinition.server';
import type { AppTokenLogin } from '@/auth/getAppTokenLogins.server';
import * as ReactRouter from 'react-router';

// Mock dependencies
vi.mock('@/utils/rootLoaderDataUtils', () => ({ useUser: () => null }));
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));
vi.mock('@/utils/useHydrated', () => ({ useHydrated: () => true }));
vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigation: () => ({ state: 'idle' }),
    useSubmit: () => vi.fn(),
    useFetcher: () => ({ submit: vi.fn() }),
  };
});

const loginUnits = [
  {
    loginDescription: 'rkhTestDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/rkh?target=https://www.diva-portal.org/diva-test/idplogin/login',
    type: 'webRedirect',
  },
  {
    loginDescription: 'skhTestDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/uniarts?target=https://www.diva-portal.org/diva-test/idplogin/login',
    type: 'webRedirect',
  },
  {
    loginDescription: 'ltuDiVALoginUnitText',
    url: 'https://www.diva-portal.org/Shibboleth.sso/Login/ltu?target=https://www.diva-portal.org/diva/idplogin/login',
    type: 'webRedirect',
  },
] as LoginDefinition[];

const appTokenLogins: AppTokenLogin[] = [
  {
    displayName: 'DiVA Admin',
    loginId: 'diva-admin',
    appToken: 'diva-admin-token',
  },
  {
    displayName: 'DiVA Everything',
    loginId: 'diva-everything',
    appToken: 'diva-everything-token',
  },
];

describe('LoginMenu returnTo logic', () => {
  it('should change returnTo from "/" to "/diva-output"', () => {
    vi.spyOn(ReactRouter, 'useLocation').mockReturnValue({
      pathname: '/',
      search: '?returnTo=/',
      state: null,
      key: 'mock-key',
      hash: '',
    });
    let capturedReturnTo = '';
    vi.spyOn(
      useWebRedirectLoginModule,
      'useWebRedirectLogin',
    ).mockImplementation(({ returnTo }: any) => {
      capturedReturnTo = decodeURIComponent(returnTo);
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={loginUnits} appTokenLogins={appTokenLogins} />
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(capturedReturnTo).toBe('/diva-output');
  });

  it('should not change returnTo if not "/"', () => {
    vi.spyOn(ReactRouter, 'useLocation').mockReturnValue({
      pathname: '/foo',
      search: '?returnTo=/foo',
      state: null,
      key: 'mock-key',
      hash: '',
    });
    let capturedReturnTo = '';
    vi.spyOn(
      useWebRedirectLoginModule,
      'useWebRedirectLogin',
    ).mockImplementation(({ returnTo }: any) => {
      capturedReturnTo = decodeURIComponent(returnTo);
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={loginUnits} appTokenLogins={appTokenLogins} />
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(capturedReturnTo).toBe('/foo');
  });

  it('should change returnTo from "/%2F" to "/diva-output"', () => {
    vi.spyOn(ReactRouter, 'useLocation').mockReturnValue({
      pathname: '/',
      search: '?returnTo=%2F',
      state: null,
      key: 'mock-key',
      hash: '',
    });
    let capturedReturnTo = '';
    vi.spyOn(
      useWebRedirectLoginModule,
      'useWebRedirectLogin',
    ).mockImplementation(({ returnTo }: any) => {
      capturedReturnTo = decodeURIComponent(returnTo);
    });

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <LoginMenu loginUnits={loginUnits} appTokenLogins={appTokenLogins} />
        ),
      },
    ]);
    render(<RoutesStub />);

    expect(capturedReturnTo).toBe('/diva-output');
  });
});
