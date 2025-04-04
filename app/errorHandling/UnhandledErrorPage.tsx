/*
 * Copyright 2025 Uppsala University Library
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

import { ErrorPage } from '@/errorHandling/ErrorPage';
import { SentimentVeryDissatisfiedIcon } from '@/icons';
import { useTranslation } from 'react-i18next';

interface UnhandledErrorPageProps {
  error: unknown;
}

export const UnhandledErrorPage = ({ error }: UnhandledErrorPageProps) => {
  const { t } = useTranslation();

  if (error instanceof Error) {
    const { message, stack } = error;
    return (
      <ErrorPage
        icon={<SentimentVeryDissatisfiedIcon />}
        titleText={t(`divaClient_error500TitleText`)}
        bodyText={message}
        technicalInfo={stack && <pre>{stack}</pre>}
      />
    );
  }
  return (
    <ErrorPage
      icon={<SentimentVeryDissatisfiedIcon />}
      titleText={t(`divaClient_unknownErrorTitleText`)}
      bodyText={t(`divaClient_unknownErrorBodyText`)}
    />
  );
};
