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
import { type ReactNode, useRef } from 'react';
import dev_favicon from '@/images/diva-star-dev.svg';
import favicon from '@/images/diva-star.svg';
import { i18nCookie } from '@/i18n/i18nCookie.server';
import { getLoginUnits } from '@/data/getLoginUnits.server';
import { useChangeLanguage } from '@/i18n/useChangeLanguage';
import rootCss from './root.css?url';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { useSessionAutoRenew } from '@/auth/useSessionAutoRenew';
import { renewAuth } from '@/auth/renewAuth.server';

import type { Route } from './+types/root';
import type { TopNavigationLink } from '@/components/Layout/TopNavigation/TopNavigation';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import { Header } from '@/components/Layout/Header/Header';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { ErrorPage } from '@/errorHandling/ErrorPage';
import { SentimentVeryDissatisfiedIcon } from '@/icons';
import divaLogo from '@/assets/divaLogo.svg';

const { MODE } = import.meta.env;

export async function loader({ request, context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const { hostname } = new URL(request.url);
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);
  const theme = dependencies.themePool.has(hostname)
    ? dependencies.themePool.get(hostname)
    : undefined;

  const loginUnits = getLoginUnits(await context.dependencies);
  const locale = context.i18n.language;

  const topNavigationLinks: TopNavigationLink[] = auth
    ? [
        { label: 'Output', to: '/diva-output' },
        { label: 'Personer', to: '/diva-person' },
        { label: 'Projekt', to: '/diva-project' },
      ]
    : [];

  return { auth, locale, loginUnits, theme, topNavigationLinks };
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  const intent = formData.get('intent');

  if (intent === 'changeLanguage') {
    return await changeLanguage(formData);
  }

  if (intent === 'renewAuthToken') {
    return await renewAuth(request, context.i18n);
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
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App({ loaderData }: Route.ComponentProps) {
  useSessionAutoRenew();
  const theme = loaderData.theme;
  return (
    <>
      <header>
        <NavigationLoader />
        <MemberBar theme={theme} loggedIn={loaderData.auth !== undefined} />
        <Header topNavigationLinks={loaderData.topNavigationLinks} />
      </header>
      <div className='container'>
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  );
}
