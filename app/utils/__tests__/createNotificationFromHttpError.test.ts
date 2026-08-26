/*
 * Copyright 2026 Uppsala University Library
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

import { HttpError } from '@/cora/httpClient.server';
import { createNotificationFromHttpError } from '@/utils/createNotificationFromHttpError';
import type { TFunction } from 'i18next';
import { describe, expect, it } from 'vitest';

const mockT = ((key: string, options?: { defaultValue?: string }) =>
  options?.defaultValue ?? key) as TFunction;

describe('createNotificationFromHttpError', () => {
  it('uses response body as details for HttpError with non-HTML body', () => {
    const error = new HttpError(
      400,
      'Validation failed: missing field "title"',
    );

    const notification = createNotificationFromHttpError(mockT, error);

    expect(notification).toEqual({
      severity: 'error',
      summary: 'Request failed with status 400',
      details: 'Validation failed: missing field "title"',
    });
  });

  it('falls back to translated text when body is empty', () => {
    const error = new HttpError(404, '');

    const notification = createNotificationFromHttpError(mockT, error);

    expect(notification).toEqual({
      severity: 'error',
      summary: 'Request failed with status 404',
      details: 'divaClient_error404BodyText',
    });
  });

  it('falls back to translated text when body is HTML', () => {
    const error = new HttpError(
      502,
      '<!DOCTYPE html><html><body>Bad Gateway</body></html>',
    );

    const notification = createNotificationFromHttpError(mockT, error);

    expect(notification).toEqual({
      severity: 'error',
      summary: 'Request failed with status 502',
      details: 'divaClient_error502BodyText',
    });
  });

  it('falls back to translated text when body starts with <html', () => {
    const error = new HttpError(
      503,
      '<html><body>Service Unavailable</body></html>',
    );

    const notification = createNotificationFromHttpError(mockT, error);

    expect(notification).toEqual({
      severity: 'error',
      summary: 'Request failed with status 503',
      details: 'divaClient_error503BodyText',
    });
  });

  it('falls back to translated text when body starts with <?xml', () => {
    const error = new HttpError(
      500,
      '<?xml version="1.0"?><error>fail</error>',
    );

    const notification = createNotificationFromHttpError(mockT, error);

    expect(notification).toEqual({
      severity: 'error',
      summary: 'Request failed with status 500',
      details: 'divaClient_error500BodyText',
    });
  });

  it('returns unknown error notification for non-HttpError', () => {
    const error = new Error('Something went wrong');

    const notification = createNotificationFromHttpError(mockT, error);

    expect(notification).toEqual({
      severity: 'error',
      summary: 'divaClient_unknownErrorTitleText',
      details: 'divaClient_unknownErrorBodyText',
    });
  });
});
