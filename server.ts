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

import compression from 'compression';
import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';
import os from 'os';
import process from 'node:process';
import prometheusClient from 'prom-client';
import pino from 'pino';

// Short-circuit the type-checking of the built output.
const BUILD_PATH = './dist/server/index.js';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const BASE_PATH = process.env.BASE_PATH ?? '';
const PORT = Number.parseInt(process.env.PORT || '5173');
const USE_CORA_MSW = process.env.USE_CORA_MSW === 'true';
const { CORA_API_URL, CORA_LOGIN_URL, CORA_EXTERNAL_SYSTEM_URL } = process.env;

const log = pino();

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

prometheusClient.collectDefaultMetrics();

const app = express();

if (USE_CORA_MSW) {
  const { startCoraMswServer } =
    await import('./playwright/cora-simulator/cora-msw.server');
  startCoraMswServer();
}

app.use(compression());
app.disable('x-powered-by');

app.get(`${BASE_PATH}/metrics`, prometheusMetrics);

process.on('unhandledRejection', (reason) => {
  log.error({ err: reason }, 'Unhandled Rejection');
});

// Redirect root path to BASE_PATH if it is set
if (BASE_PATH && BASE_PATH !== '/') {
  app.get('/', (_req, res) => {
    res.redirect(BASE_PATH);
  });
}

if (DEVELOPMENT) {
  log.info('Starting development server');
  app.get('/devLogin', (req, res) => {
    res.sendFile(new URL('devLogin.html', import.meta.url).pathname);
  });

  const viteDevServer = await import('vite').then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  const reactRouterApp = await viteDevServer.ssrLoadModule('./server/app.ts');

  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      return await reactRouterApp.app(req, res, next);
    } catch (error) {
      if (typeof error === 'object' && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  log.info('Starting production server');
  const reactRouterApp = await import(BUILD_PATH);
  app.use(
    `${BASE_PATH}/assets`,
    express.static('dist/client/assets', { immutable: true, maxAge: '1y' }),
  );
  app.use(
    `${BASE_PATH}/images`,
    express.static('dist/client/images', { immutable: false, maxAge: '1d' }),
  );
  app.use(express.static('dist/client', { maxAge: '1h' }));
  app.use(reactRouterApp.app);
}

app.use(morgan('tiny'));

const server = app.listen(PORT, async () => {
  log.info(`CORA_API_URL ${CORA_API_URL}`);
  log.info(`CORA_LOGIN_URL ${CORA_LOGIN_URL}`);
  log.info(`BASE_PATH ${BASE_PATH}`);
  log.info(`CORA_EXTERNAL_SYSTEM_URL ${CORA_EXTERNAL_SYSTEM_URL}`);

  if (DEVELOPMENT) {
    log.info(
      `*** Development server is running on http://localhost:${PORT}${BASE_PATH} ***`,
    );
    log.info(
      `*** Local network http://${getLocalIp()}:${PORT}${BASE_PATH} ***`,
    );
  } else {
    log.info(
      `*** Server is started and listening on port ${PORT} ${BASE_PATH} ***`,
    );
  }
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    log.error(
      `Port ${PORT} is already in use. Please choose another port or stop the process using it.`,
    );
    process.exit(1);
  } else {
    log.error(err, 'Server error');
    process.exit(1);
  }
});

const getLocalIp = () => {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    for (const address of iface ?? []) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
};

async function prometheusMetrics(_req: Request, res: Response) {
  try {
    res.setHeader('Content-Type', prometheusClient.register.contentType);
    res.end(await prometheusClient.register.metrics());
  } catch (err) {
    log.error({ err }, 'Error collecting metrics');
    res
      .status(500)
      .end(err instanceof Error ? err.message : 'Error collecting metrics');
  }
}
