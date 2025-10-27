import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import { useTranslation } from 'react-i18next';
import {
  Form,
  href,
  isRouteErrorResponse,
  Link,
  type MetaDescriptor,
} from 'react-router';
import type { Route } from '../divaOutput/+types/divaOutputView';
import css from './divaOutputView.css?url';

import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Button } from '@/components/Button/Button';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import { CodeIcon, DeleteIcon, EditDocumentIcon } from '@/icons';
import { OutputView } from '@/routes/divaOutput/components/OutputView';
import { assertDefined } from '@/utils/invariant';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import { createTitle } from './utils/createTitle';
import { generateCitationMeta } from './utils/generateCitationMeta';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const { t } = context.get(i18nContext);
  const { auth } = context.get(sessionContext);
  const { dependencies } = context.get(dependenciesContext);
  const { recordId } = params;
  const apiUrl = externalCoraApiUrl(`/record/diva-output/${recordId}`);
  const externalSystemUrl = process.env.CORA_EXTERNAL_SYSTEM_URL;
  assertDefined(externalSystemUrl, 'CORA_EXTERNAL_SYSTEM_URL is not defined');

  const origin = new URL(request.url).origin;

  try {
    const record = (await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType: 'diva-output',
      recordId,
      authToken: auth?.data.token,
      decorated: true,
    })) as BFFDataRecord<DivaOutput>;
    return {
      record: record,
      pageTitle: createTitle(record.data.output.titleInfo),
      breadcrumb: t(record.data.output.titleInfo.title.value),
      apiUrl,
      externalSystemUrl,
      origin,
    };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export const meta = ({ loaderData, error }: Route.MetaArgs) => {
  let citationMeta: MetaDescriptor[] = [];
  try {
    if (loaderData) {
      citationMeta = generateCitationMeta(
        loaderData?.record.data,
        loaderData.externalSystemUrl,
      );
    }
  } catch (error) {
    console.error('Failed to generate citation meta:', error);
  }
  return [
    { title: error ? getMetaTitleFromError(error) : loaderData?.pageTitle },
    ...citationMeta,
  ];
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DivaOutputView({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation();
  const record = loaderData.record;
  return (
    <div className='diva-output-view-page'>
      <Button
        className='api-button'
        variant='tertiary'
        as='a'
        href={loaderData.apiUrl}
        target='_blank'
        rel='noopener noreferrer'
      >
        <CodeIcon />
        {t('divaClient_viewInApiText')}
      </Button>
      <OutputView data={record.data} />
      <FloatingActionButtonContainer>
        {record.userRights?.includes('update') && (
          <FloatingActionButton
            as={Link}
            to={href('/:recordType/:recordId/update', {
              recordType: record.recordType,
              recordId: record.id,
            })}
            text={t('divaClient_editRecordText')}
            icon={<EditDocumentIcon />}
          />
        )}
        {record.userRights?.includes('delete') && (
          <Form method='POST' action='delete'>
            <FloatingActionButton
              type='submit'
              text={t('divaClient_deleteRecordText')}
              icon={<DeleteIcon />}
            />
          </Form>
        )}
      </FloatingActionButtonContainer>
    </div>
  );
}

export const ErrorBoundary = ({ error, params }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();
  const { recordId } = params;
  const recordType = 'diva-output';

  if (isRouteErrorResponse(error)) {
    const { status } = error;

    const errorBodyText =
      status === 404
        ? t('divaClient_errorDivaOutputNotFoundText', {
            recordId,
          })
        : t(`divaClient_error${status}BodyText`);

    return (
      <ErrorPage
        icon={getIconByHTTPStatus(status)}
        titleText={t(`divaClient_error${status}TitleText`)}
        bodyText={errorBodyText}
        links={
          <Link to={href('/:recordType', { recordType })}>
            {t('divaClient_errorGoToSearchText', { recordType })}
          </Link>
        }
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};
