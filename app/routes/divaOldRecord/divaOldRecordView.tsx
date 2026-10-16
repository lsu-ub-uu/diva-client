import { sessionContext } from '@/auth/sessionMiddleware.server';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import { createRouteErrorResponse } from '@/errorHandling/createRouteErrorResponse.server';
import type { DivaOldRecord } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { formatXml } from '@/utils/formatXml';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse } from 'react-router';
import { getDependencies } from 'server/dependencies/depencencies';
import { RecordActionBar } from '../record/ActionBar/RecordActionBar';
import type { Route } from './+types/divaOldRecordView';
import { Term } from '../divaOutput/components/Term';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { recordId } = params;
  const { auth } = context.get(sessionContext);
  const dependencies = await getDependencies();

  try {
    const record = (await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType: 'diva-oldRecord',
      recordId,
      authToken: auth?.data.token,
      decorated: true,
      mode: 'view',
    })) as BFFDataRecord<DivaOldRecord>;
    const oldId = record.data.oldRecord.recordInfo?.oldId?.value;
    return { record, breadcrumb: oldId };
  } catch (error) {
    throw createRouteErrorResponse(error);
  }
};

export default function DivaOldRecordView({
  loaderData,
}: Route.ComponentProps) {
  const language = useLanguage();
  const oldRecord = loaderData.record.data.oldRecord;
  return (
    <div className='grid main-content'>
      <div className='diva-output-view-page grid-col-12'>
        <div className='top-bar'>
          <Breadcrumbs />
          <RecordActionBar record={loaderData.record} />
        </div>
        <h1>{oldRecord?.__text?.[language]}</h1>

        <dl>
          <Term
            label={oldRecord.recordInfo?.oldId}
            value={oldRecord.recordInfo?.oldId?.value}
          />
          <Term
            variant='block'
            label={oldRecord.record}
            value={<pre>{formatXml(oldRecord.record?.value)}</pre>}
          />
        </dl>
      </div>
    </div>
  );
}

export const ErrorBoundary = ({ error, params }: Route.ErrorBoundaryProps) => {
  const { t } = useTranslation();
  const { recordId } = params;

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
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};
