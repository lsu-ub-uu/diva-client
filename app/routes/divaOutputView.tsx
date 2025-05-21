import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { Route } from './+types/divaOutputView';
import type { BFFDataRecord } from '@/types/record';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import css from './divaOutputView.css?url';
import { Fragment } from 'react/jsx-runtime';
import { href, Link } from 'react-router';
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

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DivaOutputView({ loaderData }: Route.ComponentProps) {
  const output = loaderData.record.data.output;
  return (
    <div className='diva-output-view'>
      <main>
        <article>
          <h1>
            {output.titleInfo.title.value}
            {output.titleInfo.subTitle &&
              `: ${output.titleInfo.subTitle[0].value}`}
          </h1>

          <dl>
            {output.name_type_personal && (
              <>
                <dt>Upphovspersoner</dt>
                <dd>
                  {output.name_type_personal.map((person, index) => (
                    <Fragment key={index}>
                      <Person person={person} key={index} />
                      {index < output.name_type_personal!.length - 1 && ', '}
                    </Fragment>
                  ))}
                </dd>
              </>
            )}
          </dl>
        </article>
      </main>
      <aside></aside>
    </div>
  );
}

interface PersonProps {
  person: NonNullable<DivaOutput['output']['name_type_personal']>[number];
}

const Person = ({ person }: PersonProps) => {
  if (person.person) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-person',
          recordId: person.person[0].value,
        })}
      >
        <span>
          {person.namePart_type_given?.[0]?.value}{' '}
          {person.namePart_type_family?.[0]?.value}
        </span>
      </Link>
    );
  }

  return (
    <span>
      {person.namePart_type_given?.[0]?.value}{' '}
      {person.namePart_type_family?.[0]?.value}
    </span>
  );
};
