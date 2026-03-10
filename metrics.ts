import type { RequestHandler } from 'express';
import prometheusClient from 'prom-client';

prometheusClient.collectDefaultMetrics();

const httpRequestCounter = new prometheusClient.Counter({
  name: 'diva_client_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDuration = new prometheusClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 5],
  registers: [prometheusClient.register],
});

export const prometheusMiddleware: RequestHandler = (req, res, next) => {
  const end = httpRequestDuration.startTimer({
    method: req.method,
    route: req.path,
  });

  res.on('finish', () => {
    end({ status_code: res.statusCode });
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });
  next();
};

export const prometheusMetrics: RequestHandler = async (_req, res) => {
  try {
    res.setHeader('Content-Type', prometheusClient.register.contentType);
    res.end(await prometheusClient.register.metrics());
  } catch (err) {
    res
      .status(500)
      .end(err instanceof Error ? err.message : 'Error collecting metrics');
  }
};
