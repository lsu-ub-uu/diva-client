import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { TopNavigation } from '@/components/Layout/TopNavigation/TopNavigation';
import { TrashAlert } from '@/components/TrashAlert/TrashAlert';
import { externalCoraApiUrl } from '@/cora/helper.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import { OutputView } from '@/routes/divaOutput/components/OutputView';
import type { BFFDataRecord } from '@/types/record';
import { assertDefined } from '@/utils/invariant';
import { useTranslation } from 'react-i18next';
import {
  href,
  isRouteErrorResponse,
  Link,
  useRouteLoaderData,
  type MetaDescriptor,
} from 'react-router';
import { dependenciesContext } from 'server/depencencies';
import { i18nContext } from 'server/i18n';
import type { Route } from '../divaOutput/+types/divaOutputView';
import { ActionBar } from '../record/ActionBar/ActionBar';
import css from './divaOutputView.css?url';
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
      mode: 'view',
    })) as BFFDataRecord<DivaOutput>;
    return {
      record: record,
      pageTitle: record.data.output.titleInfo
        ? createTitle(record.data.output.titleInfo)
        : t('divaClient_missingTitleText'),
      breadcrumb: record.data.output.titleInfo?.title?.value
        ? t(record.data.output.titleInfo.title.value)
        : t('divaClient_missingTitleText'),
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
  const { recordTypes, editableMember } = useRouteLoaderData('root');

  const record = loaderData.record;
  const apiUrl = loaderData.apiUrl;
  const isInTrashBin =
    record.data.output.recordInfo?.inTrashBin?.value === 'true';
  return (
    <>
      <aside className='nav-rail'>
        <TopNavigation
          recordTypes={recordTypes}
          editableMember={editableMember}
        />
      </aside>
      <div className='content'>
        <div className='record-status-bar'>
          {isInTrashBin && (
            <TrashAlert recordType='diva-output' recordId={record.id} />
          )}
        </div>
        <div className='diva-output-view-page'>
          <div className='top-content'>
            <Breadcrumbs />
            <ActionBar record={record} apiUrl={apiUrl} />
          </div>
          <OutputView data={record.data} />
        </div>
      </div>
    </>
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
