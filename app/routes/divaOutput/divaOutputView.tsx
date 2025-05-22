import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import type { ReactNode } from 'react';
import { href, Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import type { Route } from '../divaOutput/+types/divaOutputView';
import css from './divaOutputView.css?url';
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
          <h1>{createTitle(output.titleInfo)}</h1>

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
              label='Upphovsorganisationer'
              value={output.name_type_corporate?.map((organisation, index) => (
                <Fragment key={index}>
                  <Organisation organisation={organisation} key={index} />

                  {index < output.name_type_corporate!.length - 1 && ', '}
                </Fragment>
              ))}
            />
            {output.titleInfo_type_alternative?.map((title, index) => (
              <Term
                key={index}
                label={`Alternativ titel (${title._lang})`}
                value={createTitle(title)}
              />
            ))}

            <Term label='Typ' value={output.genre_type_outputType.value} />
            <Term
              label='Underkategori'
              value={output.genre_type_subcategory?.[0]?.value}
            />
            <Term
              label='Språk'
              value={output.language
                .map(
                  (language) =>
                    language['languageTerm_authority_iso639-2b_type_code']
                      .value,
                )
                .join(', ')}
            />

            {output.artisticWork_type_outputType && (
              <Term label='Konstnärligt arbete' value='Ja' />
            )}
            <Term
              label='Typ av innehåll'
              value={output.genre_type_contentType.value}
            />
            <Term
              label='Abstract'
              value={
                <CollapsableText text={output.abstract?.[0]?.value ?? ''} />
              }
            />
          </dl>

          <h2>Ursprung</h2>
          <dl className='origin-info'>
            <Term
              label='Ort'
              value={output.originInfo.place
                ?.map((place) => place?.placeTerm.value)
                .join(', ')}
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

            <Term
              label='Förlag'
              value={output.originInfo.agent?.[0]?.namePart
                ?.map((namePart) => namePart.value)
                .join(', ')} //Todo add linked publishers
            />

            <Term
              label='Upplaga'
              value={output.originInfo.edition?.[0]?.value}
            />

            <Term label='Fysisk omfattning' value={output.extent?.[0]?.value} />
          </dl>
          <h2>Identifierare</h2>
          <dl className='identifiers'>
            <Term label='DiVA-id' value={output.recordInfo.id.value} />
            <Term label={'URN'} value={output.recordInfo.urn?.[0]?.value} />
            {output.identifier_type_isbn?.map((identifier, index) => (
              <Term
                key={index}
                label={`ISBN (${identifier._displayLabel})`}
                value={identifier.value}
              />
            ))}

            <Term
              label={'ISRN'}
              value={output.identifier_type_isrn?.[0]?.value}
            />
            {output.identifier_type_ismn?.map((identifier, index) => (
              <Term
                key={index}
                label={`ISMN (${identifier._displayLabel})`}
                value={identifier.value}
              />
            ))}
            <Term
              label={'DOI'}
              value={output.identifier_type_doi?.[0]?.value}
            />
            <Term
              label={'PMID'}
              value={output.identifier_type_pmid?.[0]?.value}
            />
            <Term
              label={'WOS'}
              value={output.identifier_type_wos?.[0]?.value}
            />
            <Term
              label={'SCOPUS'}
              value={output.identifier_type_scopus?.[0]?.value}
            />
            <Term
              label={'OpenAlex'}
              value={output.identifier_type_openAlex?.[0]?.value}
            />
            <Term
              label={'Libris'}
              value={output['identifier_type_se-libr']?.[0]?.value}
            />
            <Term
              label={'Lokal identifier'}
              value={output['identifier_type_localId']?.[0]?.value}
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

const createTitle = (titleInfo: DivaOutput['output']['titleInfo']) => {
  return `${titleInfo.title.value}${titleInfo.subTitle && `: ${titleInfo.subTitle[0].value}`}`;
};

interface PersonProps {
  person: NonNullable<DivaOutput['output']['name_type_personal']>[number];
}

const Person = ({ person }: PersonProps) => {
  // TODO show affiliation and role
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

interface OrganisationProps {
  organisation: NonNullable<
    DivaOutput['output']['name_type_corporate']
  >[number];
}

const Organisation = ({ organisation }: OrganisationProps) => {
  if (organisation.organisation) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-organisation',
          recordId: organisation.organisation?.[0]?.value,
        })}
      >
        <span>{organisation.namePart?.[0]?.value}</span>
      </Link>
    );
  }

  return <span>{organisation.namePart?.[0]?.value}</span>;
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
