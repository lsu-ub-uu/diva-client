/*
 * Copyright 2024 Uppsala University Library
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

import 'dotenv/config';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import process from 'node:process';

// Short-circuit the type-checking of the built output.
const BUILD_PATH = './dist/server/index.js';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const BASE_PATH = process.env.BASE_PATH ?? '';
const PORT = Number.parseInt(process.env.PORT || '5173');
const { CORA_API_URL, CORA_LOGIN_URL, CORA_EXTERNAL_SYSTEM_URL } = process.env;

if (!CORA_API_URL) {
  throw new Error('Missing required environment variable CORA_API_URL');
}
if (!CORA_LOGIN_URL) {
  throw new Error('Missing required environment variable CORA_LOGIN_URL');
}
if (!CORA_EXTERNAL_SYSTEM_URL) {
  throw new Error(
    'Missing required environment variable CORA_EXTERNAL_SYSTEM_URL',
  );
}

const app = express();

app.use(compression());
app.disable('x-powered-by');

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection', reason);
});

// Redirect root path to BASE_PATH if it is set
if (BASE_PATH && BASE_PATH !== '/') {
  app.get('/', (_req, res) => {
    res.redirect(BASE_PATH);
  });
}

if (DEVELOPMENT) {
  console.info('Starting development server');
  app.get('/devLogin', (req, res) => {
    res.sendFile(new URL('devLogin.html', import.meta.url).pathname);
  });
  const viteDevServer = await import('vite').then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule('./server/app.ts');
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === 'object' && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.info('Starting production server');
  app.use(
    `${BASE_PATH}/assets`,
    express.static('dist/client/assets', { immutable: true, maxAge: '1y' }),
  );
  app.use(express.static('dist/client', { maxAge: '1h' }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

app.use(morgan('tiny'));

app.listen(PORT, () => {
  console.info(`CORA_API_URL ${CORA_API_URL}`);
  console.info(`CORA_LOGIN_URL ${CORA_LOGIN_URL}`);
  console.info(`BASE_PATH ${BASE_PATH}`);
  console.info(`CORA_EXTERNAL_SYSTEM_URL ${CORA_EXTERNAL_SYSTEM_URL}`);

  if (DEVELOPMENT) {
    console.info(
      `*** Development server is running on http://localhost:${PORT}${BASE_PATH} ***`,
    );
  } else {
    console.info(
      `*** Server is started and listening on port ${PORT} ${BASE_PATH} ***`,
    );
  }
});
