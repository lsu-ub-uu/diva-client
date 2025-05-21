import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { Route } from './+types/divaOutputView';
import type { BFFDataRecord } from '@/types/record';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const { t } = context.i18n;
  const session = await getSessionFromCookie(request);
  const auth = getAuth(session);
  const dependencies = await context.dependencies;
  const { recordId } = params;
  const record = (await getRecordByRecordTypeAndRecordId({
    dependencies,
    recordType: 'diva-output',
    recordId,
    authToken: auth?.data.token,
  })) as BFFDataRecord<DivaOutput>;

  return { record, breadcrumb: t(record.data.output.titleInfo.title.value) };
};

export default function DivaOutputView({ loaderData }: Route.ComponentProps) {
  const output = loaderData.record.data.output;
  return <h1>{output.titleInfo.title.value}</h1>;
}
