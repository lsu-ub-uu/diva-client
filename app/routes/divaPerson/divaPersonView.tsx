import { getDependencies } from 'server/dependencies/depencencies';
import type { Route } from '../divaPerson/+types/divaPersonView';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { sessionContext } from '@/auth/sessionMiddleware.server';
import type { DivaPerson, NamePersonGroup } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from '../divaOutput/components/Term';
import css from '../divaOutput/divaOutputView.css';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { auth } = context.get(sessionContext);
  const dependencies = await getDependencies();

  const record = (await getRecordByRecordTypeAndRecordId({
    dependencies,
    recordType: 'diva-person',
    recordId: params.recordId,
    authToken: auth?.data.token,
    decorated: true,
    mode: 'view',
  })) as BFFDataRecord<DivaPerson>;

  return {
    record: record,
    breadcrumb:
      `${record.data.person.authority?.name_type_personal?.namePart_type_family?.value ?? ''}, ${record.data.person.authority?.name_type_personal?.namePart_type_given?.value ?? ''}`.trim(),
  };
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DivaPersonView({ loaderData }: Route.ComponentProps) {
  const language = useLanguage();
  const person = loaderData.record.data.person;
  const name = person.authority?.name_type_personal;
  return (
    <div className='grid main-content'>
      <div className='grid-col-12'>
        <Breadcrumbs />
        <h1>{formatName(name)}</h1>
        <dl>
          <Term
            label={person.variant?.[0]?.__text?.[language]}
            value={person.variant
              ?.map((v) => formatName(v.name_type_personal))
              .filter(Boolean)
              .join(', ')}
          />
          <Term
            label={person.email?.[0]?.__text?.[language]}
            value={person.email?.map((e) => e.value)}
          />
          <Term
            label={person.location?.[0]?.__text?.[language]}
            value={person.location?.map((l) => l.value)}
          />
        </dl>
      </div>
    </div>
  );
}

const formatName = (name?: NamePersonGroup) => {
  return [name?.namePart_type_given?.value, name?.namePart_type_family?.value]
    .filter(Boolean)
    .join(' ');
};
