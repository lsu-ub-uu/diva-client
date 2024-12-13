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
  Links,
  type LinksFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';
import { type ReactNode, useEffect, useRef } from 'react';
import { SnackbarProvider } from '@/components/Snackbar/SnackbarProvider';
import { CssBaseline } from '@mui/material';
import { divaTheme } from '@/mui/theme';
import { getAuthentication, getSessionFromCookie } from '@/.server/sessions';
import { i18nCookie } from '@/i18n/i18nCookie';
import { getLoginUnits } from '@/.server/data/getLoginUnits';
import { useChangeLanguage } from '@/i18n/useChangeLanguage';
import type { Route } from '../.react-router/types/app/+types/root';
import { PageLayout } from '@/components/Layout';
import { withEmotionCache } from '@emotion/react';
import './root.css';
import dev_favicon from './images/dev_favicon.svg';
import favicon from './images/favicon.svg';

const { MODE } = import.meta.env;

interface DocumentProps {
  children: ReactNode;
}

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: MODE === 'development' ? dev_favicon : favicon,
  },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);

  const loginUnits = getLoginUnits(context.dependencies);
  const locale = context.i18n.language;
  return { auth, locale, loginUnits };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
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
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const data = useRouteLoaderData<typeof loader>('root');
    const locale = data?.locale ?? 'sv';
    const emotionInsertionPointRef = useRef<HTMLMetaElement>(null);

    useChangeLanguage(locale);

    /**
     * When a top level ErrorBoundary or CatchBoundary are rendered, the document head gets removed,
     * so we have to create the style tags.
     */
    useEffect(() => {
      const stylesLoaded =
        emotionInsertionPointRef.current?.nextSibling?.nodeName === 'STYLE';

      if (stylesLoaded) {
        return;
      }

      emotionCache.sheet.container = document.head;
      emotionCache.sheet.hydrate(emotionCache.sheet.tags);
    }, [emotionCache.sheet]);

    return (
      <html lang={locale}>
        <head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1'
          />
          <meta
            name='theme-color'
            content={divaTheme.palette.primary.main}
          />
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
  },
);

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Document>
      <CssBaseline />
      {children}
    </Document>
  );
};

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </SnackbarProvider>
  );
}
