import styles from '@/components/Article/Article.module.css';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { i18nContext } from 'server/i18n';
import type { Route } from '../article/+types/article';

import { Markdown } from '@/components/Markdown/Markdown';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse } from 'react-router';
import { getMarkdown } from './getMarkdown.server';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { language } = context.get(i18nContext);
  const { articleId } = params;

  try {
    const { markdown, title } = await getMarkdown(articleId, language);
    return { markdown, breadcrumb: title };
  } catch (error) {
    return createRouteErrorResponse(error);
  }
};

export const meta: Route.MetaFunction = ({ loaderData }) => {
  return [{ title: `${loaderData.breadcrumb} | DiVA` }];
};

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();

  if (isRouteErrorResponse(error)) {
    const { status } = error;
    return (
      <ErrorPage
        icon={getIconByHTTPStatus(status)}
        titleText={t(`divaClient_error${status}TitleText`)}
        bodyText={t(`divaClient_error${status}BodyText`)}
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};

export default function Article({ loaderData }: Route.ComponentProps) {
  return (
    <main className='grid main-content'>
      <div className='grid-col-12'>
        <Breadcrumbs />
      </div>

      <article className={`grid-col-12 ${styles['article']}`}>
        <Markdown content={loaderData.markdown} />
      </article>
    </main>
  );
}
