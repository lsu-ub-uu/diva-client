import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { Route } from '../divaOutput/+types/divaOutputView';
import type { BFFDataRecord } from '@/types/record';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import css from './divaOutputView.css?url';
import { Fragment } from 'react/jsx-runtime';
import { href, Link } from 'react-router';
import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import type { ReactNode } from 'react';
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
            <Term
              label='Upphovspersoner'
              value={output.name_type_personal?.map((person, index) => (
                <Fragment key={index}>
                  <Person person={person} key={index} />
                  {index < output.name_type_personal!.length - 1 && ', '}
                </Fragment>
              ))}
            />

            <Term
              label='Totalt antal upphovspersoner'
              value={output.note_type_creatorCount?.[0]?.value}
            />

            <Term
              label='Abstract'
              value={
                <CollapsableText text={output.abstract?.[0]?.value ?? ''} />
              }
            />

            <Term
              label='Ort'
              value={output.originInfo.place?.[0]?.placeTerm.value}
            />

            <Term
              label='Utgiven'
              value={<Date date={output.originInfo.dateIssued} />}
            />
            <Term
              label='Copyright'
              value={<Date date={output.originInfo.copyrightDate?.[0]} />}
            />
            <Term
              label='Online'
              value={
                <Date date={output.originInfo.dateOther_type_online?.[0]} />
              }
            />
          </dl>
        </article>
      </main>
      <aside>
        <div>
          <h3>Bilaga</h3>
          <img
            alt='fulltext'
            src='https://pre.diva-portal.org/rest/record/binary/binary:15459311940110593/thumbnail'
          />
        </div>
        <p>FULLTEXT.pdf (432 kB)</p>

        <a href='/asdf'>Ladda ner</a>

        <div>
          {output.subject?.map((subject, index) => (
            <div key={index}>
              <h3>Nyckelord ({subject._lang})</h3>
              <div className='pill-container'>
                {subject.topic.value.split(',').map((topicPart) => (
                  <Link
                    to={`/diva-output?search.include.includePart.keywordsSearchTerm[0].value=${topicPart}&search.rows[0].value=10`}
                    key={topicPart}
                    className='pill'
                  >
                    {topicPart}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
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

interface TermProps {
  label: string;
  value?: ReactNode;
}

const Term = ({ label, value }: TermProps) => {
  if (!value) {
    return null;
  }

  return (
    <>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </>
  );
};

interface DateProps {
  date?: {
    year: {
      value: string;
    };
    month?: [
      {
        value: string;
      },
    ];
    day?: [
      {
        value: string;
      },
    ];
  };
}

const Date = ({ date }: DateProps) => {
  if (!date) {
    return null;
  }

  const { year, month, day } = date;

  return (
    <span>
      {year.value}
      {month && `-${month[0].value}`}
      {day && `-${day[0].value}`}
    </span>
  );
};
