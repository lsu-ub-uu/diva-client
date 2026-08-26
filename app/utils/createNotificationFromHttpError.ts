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

import { isHttpError } from '@/cora/httpClient.server';
import type { Notification } from '@/auth/sessions.server';
import type { TFunction } from 'i18next';

const isHtmlContent = (data: unknown): boolean => {
  if (typeof data !== 'string') {
    return false;
  }
  // Check if the string starts with common HTML patterns
  const htmlPattern = /^\s*<!DOCTYPE|^\s*<html|^\s*<\?xml/i;
  return htmlPattern.test(data);
};

export const createNotificationFromHttpError = (
  t: TFunction,
  error: unknown,
): Notification => {
  if (isHttpError(error)) {
    const responseBody = error.body;
    const shouldShowResponseBody = responseBody && !isHtmlContent(responseBody);
    return {
      severity: 'error',
      summary: t(`divaClient_error${error.status}TitleText`, {
        defaultValue: error.message,
      }),
      details: shouldShowResponseBody
        ? responseBody
        : t(`divaClient_error${error.status}BodyText`),
    };
  }

  return {
    severity: 'error',
    summary: t(`divaClient_unknownErrorTitleText`),
    details: t(`divaClient_unknownErrorBodyText`),
  };
};
