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
import { type ReactNode, useEffect } from 'react';
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
import { getNavigation } from '@/data/getNavigation.server';
import { ErrorPage } from '@/errorHandling/ErrorPage';
import { AngryIcon } from 'lucide-react';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from './+types/root';
import { createUser } from './auth/createUser';
import { renewAuthMiddleware } from './auth/renewAuthMiddleware.server';
import {
  sessionContext,
  sessionMiddleware,
} from './auth/sessionMiddleware.server';
import { Alert, type Severity } from './components/Alert/Alert';
import { Footer } from './components/Layout/Footer/Footer';
import { Header } from './components/Layout/Header/Header';
import {
  parseUserPreferencesCookie,
  serializeUserPreferencesCookie,
} from './userPreferences/userPreferencesCookie.server';
import { getMemberFromHostname } from './utils/getMemberFromHostname';
import { NotificationSnackbar } from './utils/NotificationSnackbar';
import { useDevModeSearchParam } from './utils/useDevModeSearchParam';

const { MODE } = import.meta.env;

export const middleware = [sessionMiddleware, renewAuthMiddleware];

export async function loader({ request, context }: Route.LoaderArgs) {
  const { dependencies } = context.get(dependenciesContext);
  const { auth, notification } = context.get(sessionContext);
  const { t } = context.get(i18nContext);
  const member = getMemberFromHostname(request, dependencies);
  const loginUnits = getLoginUnits(dependencies, member?.loginUnitIds);
  const exampleUsers = dependencies.deploymentInfo.exampleUsers;
  const applicationVersion = dependencies.deploymentInfo.applicationVersion;
  const locale = context.get(i18nContext).language;
  const navigation = await getNavigation(dependencies, member, auth);
  const user = auth && createUser(auth);
  const userPreferences = await parseUserPreferencesCookie(request);
  const globalAlert = {
    severity: 'warning' as Severity,
    text: t('divaClient_metadataWarningText'),
  };
  const blockRobotIndexing = process.env.BLOCK_ROBOT_INDEXING !== 'false';

  return {
    user,
    locale,
    loginUnits,
    exampleUsers,
    member,
    navigation,
    userPreferences,
    notification,
    globalAlert,
    blockRobotIndexing,
    applicationVersion,
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
          icon={<AngryIcon />}
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
          icon={<AngryIcon />}
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
        icon={<AngryIcon />}
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
  useChangeLanguage(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
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
  useHydratedFlag();
  useSessionAutoRenew();
  useDevModeSearchParam();

  const {
    userPreferences,
    member,
    loginUnits,
    exampleUsers,
    user,
    navigation,
    globalAlert,
    blockRobotIndexing,
    applicationVersion,
  } = loaderData;

  return (
    <div>
      {blockRobotIndexing && <meta name='robots' content='noindex, nofollow' />}
      <NotificationSnackbar
        key={loaderData.notification?.summary}
        notification={loaderData.notification}
      />
      {globalAlert && (
        <div className='global-alert'>
          <Alert severity={globalAlert.severity} variant='banner'>
            {globalAlert.text}
          </Alert>
        </div>
      )}
      <Header
        className='header'
        member={member}
        user={user}
        userPreferences={userPreferences}
        loginUnits={loginUnits}
        exampleUsers={exampleUsers}
        navigation={navigation}
      />
      <Outlet />
      <Footer applicationVersion={applicationVersion} />
    </div>
  );
}

const useHydratedFlag = () => {
  useEffect(() => {
    document.body.setAttribute('data-hydrated', 'true');
  }, []);
};
