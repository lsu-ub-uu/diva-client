/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { useSessionAutoRenew } from '@/auth/useSessionAutoRenew';
import { getLoginUnits } from '@/data/getLoginUnits.server';
import { i18nCookie } from '@/i18n/i18nCookie.server';
import { useChangeLanguage } from '@/i18n/useChangeLanguage';
import dev_favicon from '@/images/diva-star-dev.svg';
import favicon from '@/images/diva-star.svg';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import rootCss from './styles/root.css?url';

import divaLogo from '@/assets/divaLogo.svg';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { Header } from '@/components/Layout/Header/Header';
import { LanguageSwitcher } from '@/components/Layout/Header/LanguageSwitcher';
import Login from '@/components/Layout/Header/Login/Login';
import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import { canEditMemberSettings, getRecordTypes } from '@/data/getRecordTypes';
import { ErrorPage } from '@/errorHandling/ErrorPage';
import { SentimentVeryDissatisfiedIcon } from '@/icons';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/root';
import { createUser } from './auth/createUser';
import { getAppTokenLogins } from './auth/getAppTokenLogins.server';
import { renewAuthMiddleware } from './auth/renewAuthMiddleware.server';
import {
  sessionContext,
  sessionMiddleware,
} from './auth/sessionMiddleware.server';
import { ColorSchemeSwitcher } from './components/Layout/Header/ColorSchemeSwitcher';
import {
  parseUserPreferencesCookie,
  serializeUserPreferencesCookie,
} from './userPreferences/userPreferencesCookie.server';
import { getMemberFromHostname } from './utils/getMemberFromHostname';
import { NotificationSnackbar } from './utils/NotificationSnackbar';
import { useDevModeSearchParam } from './utils/useDevModeSearchParam';
import type { Auth } from './auth/Auth';
import { eq, isEqual } from 'lodash-es';
import { useIsDevMode } from './utils/useIsDevMode';

const { MODE } = import.meta.env;

export const middleware = [sessionMiddleware, renewAuthMiddleware];

export async function loader({ request, context }: Route.LoaderArgs) {
  const { dependencies } = context.get(dependenciesContext);
  const { auth, notification } = context.get(sessionContext);
  const member = getMemberFromHostname(request, dependencies);
  const loginUnits = getLoginUnits(dependencies, member?.loginUnitIds);
  const appTokenLogins = getAppTokenLogins();
  const locale = context.get(i18nContext).language;
  const recordTypes = getRecordTypes(dependencies, auth);
  const user = auth && createUser(auth);
  const userPreferences = await parseUserPreferencesCookie(request);
  const userCanEditMemberSettings = await canEditMemberSettings(member, auth);

  return {
    user,
    locale,
    loginUnits,
    appTokenLogins,
    member,
    recordTypes,
    userPreferences,
    notification,
    userCanEditMemberSettings,
    auth,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'changeLanguage') {
    return await changeLanguage(formData);
  }

  if (intent === 'changeColorScheme') {
    return await changeColorScheme(formData);
  }

  return {};
}

const changeLanguage = async (formData: FormData) => {
  const language = formData.get('language');
  if (typeof language === 'string') {
    return data(
      {},
      {
        headers: {
          'Set-Cookie': await i18nCookie.serialize(language),
        },
      },
    );
  }
};

const changeColorScheme = async (formData: FormData) => {
  const colorScheme = formData.get('colorScheme');
  if (colorScheme === 'light' || colorScheme === 'dark') {
    return data(
      {},
      {
        headers: {
          'Set-Cookie': await serializeUserPreferencesCookie({
            colorScheme,
          }),
        },
      },
    );
  }
};

export const links: Route.LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: MODE === 'development' ? dev_favicon : favicon,
  },
  { rel: 'stylesheet', href: rootCss },
];

const RootErrorPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <a href='/'>
          <img alt='' style={{ height: '2.5rem' }} src={divaLogo} />
        </a>
      </header>
      {children}
    </div>
  );
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <RootErrorPage>
        <ErrorPage
          icon={<SentimentVeryDissatisfiedIcon />}
          titleText={`${error.status}`}
          bodyText={JSON.stringify(error.data)}
        />
      </RootErrorPage>
    );
  }

  if (error instanceof Error) {
    const { stack } = error;
    return (
      <RootErrorPage>
        <ErrorPage
          icon={<SentimentVeryDissatisfiedIcon />}
          titleText='Okänt fel'
          bodyText='Ett okänt fel inträffade. Försök igen senare'
          links={<a href='/'>Gå till startsidan</a>}
        />
        <pre>{stack}</pre>
      </RootErrorPage>
    );
  }
  return (
    <RootErrorPage>
      <ErrorPage
        icon={<SentimentVeryDissatisfiedIcon />}
        titleText='Okänt fel'
        bodyText='Ett okänt fel inträffade. Försök igen senare'
        links={<a href='/'>Gå till startsidan</a>}
      />
    </RootErrorPage>
  );
}

export const Layout = ({ children }: { children: ReactNode }) => {
  const data = useRouteLoaderData<typeof loader>('root');
  const userPreferences = data?.userPreferences;
  const locale = data?.locale ?? 'sv';
  const emotionInsertionPointRef = useRef<HTMLMetaElement>(null);
  useChangeLanguage(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
        <meta
          ref={emotionInsertionPointRef}
          name='emotion-insertion-point'
          content='emotion-insertion-point'
        />
      </head>
      <body data-color-scheme={userPreferences?.colorScheme || 'light'}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App({ loaderData }: Route.ComponentProps) {
  useSessionAutoRenew();
  useDevModeSearchParam();
  const {
    userPreferences,
    member,
    loginUnits,
    appTokenLogins,
    userCanEditMemberSettings,
    auth,
  } = loaderData;
  return (
    <div className='root-layout'>
      <NotificationSnackbar notification={loaderData.notification} />

      <header className='member-bar'>
        <NavigationLoader />
        <MemberBar member={member} loggedIn={loaderData.user !== undefined}>
          <ColorSchemeSwitcher colorScheme={userPreferences.colorScheme} />
          <LanguageSwitcher />
          <Login loginUnits={loginUnits} appTokenLogins={appTokenLogins} />
        </MemberBar>
      </header>

      <header className='nav-rail'>
        <Header
          recordTypes={loaderData.recordTypes}
          loginUnits={loginUnits}
          appTokenLogins={appTokenLogins}
          editableMember={
            userCanEditMemberSettings && member ? member.id : undefined
          }
        />
      </header>

      <div className='content'>
        <Breadcrumbs />
        <Outlet />
      </div>
      <AuthLogger auth={auth} />
    </div>
  );
}

const AuthLogger = ({ auth }: { auth: Auth | undefined }) => {
  const isDev = useIsDevMode();
  const [expanded, setExpanded] = useState(false);
  const [log, setLog] = useState<
    { timestamp: number; auth: Auth | undefined }[]
  >([]);
  useEffect(() => {
    const prevAuth = log.at(-1)?.auth;
    if (!isEqual(auth, prevAuth)) {
      setLog((l) => [...l, { timestamp: Date.now(), auth }]);
    }
  }, [auth]);

  if (!isDev) {
    return null;
  }

  if (!expanded) {
    return (
      <button
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 1000,
          background: 'lightgray',
          color: 'white',
          border: 'none',
          borderTopLeftRadius: '8px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(true)}
      >
        🗝️
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1000,
        background: 'white',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '8px 8px 0 0',
        padding: '1rem',
        maxHeight: '50vh',
        overflowY: 'auto',
        width: '500px',
        fontFamily: 'monospace',
      }}
    >
      {log.map((entry, index) => (
        <details key={index}>
          <summary>{new Date(entry.timestamp).toISOString()}</summary>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <strong>User ID:</strong> {entry?.auth?.data?.userId}
            </li>
            <li>
              <strong>Token:</strong> {entry?.auth?.data?.token}
            </li>
            {entry?.auth?.data?.validUntil && (
              <li>
                <strong>Valid Until:</strong>{' '}
                {new Date(Number(entry?.auth?.data?.validUntil)).toISOString()}
              </li>
            )}
            {entry?.auth?.data?.renewUntil && (
              <li>
                <strong>Renew Until:</strong>{' '}
                {new Date(Number(entry?.auth?.data?.renewUntil)).toISOString()}
              </li>
            )}
          </ul>
        </details>
      ))}
      <button
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'lightgray',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.25rem 0.5rem',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(false)}
      >
        ✖
      </button>
    </div>
  );
};
