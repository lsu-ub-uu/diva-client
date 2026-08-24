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
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { getDependencies } from 'server/dependencies/depencencies';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { language } = context.get(i18nContext);
  const { articleId } = params;
  const dependencies = await getDependencies();

  try {
    const record = await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType: 'diva-clientArticle',
      recordId: articleId,
      mode: 'view',
    });
    const lang = language === 'sv' ? 'swe' : 'eng';

    console.log(JSON.stringify(record.data['diva-clientArticle'], null, 2));
    const title = record.data['diva-clientArticle'].title.text_lang_swe.value;
    const markdown =
      record.data['diva-clientArticle'].body.markdown_lang_swe.value;

    return { markdown, breadcrumb: title };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const meta: Route.MetaFunction = ({ loaderData }) => {
  return [{ title: `${loaderData?.breadcrumb ?? ''} | DiVA` }];
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
