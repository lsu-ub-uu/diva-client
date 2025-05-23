import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type {
  DivaOutput,
  LanguageCollection,
  NameOrganisationGroup,
  NamePersonalGroup,
} from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';
import type { ReactNode } from 'react';
import { href, Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import type { Route } from '../divaOutput/+types/divaOutputView';
import css from './divaOutputView.css?url';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
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
          <h1 lang={output.titleInfo._lang} dir='auto'>
            {createTitle(output.titleInfo)}
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
              value={output.note_type_creatorCount?.value}
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
                lang={title._lang}
              />
            ))}

            <Term label='Typ' value={output.genre_type_outputType.value} />
            <Term
              label='Underkategori'
              value={output.genre_type_subcategory?.value}
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
            {output.abstract?.map((abstract, index) => (
              <Term
                key={index}
                label={`Abstract (${abstract._lang})`}
                value={<CollapsableText text={abstract.value ?? ''} />}
                lang={abstract._lang}
              />
            ))}
            <Term
              label='Publiceringsstatus'
              value={output.note_type_publicationStatus?.value}
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
              value={<Date date={output.originInfo.copyrightDate} />}
            />

            <Term
              label='Online'
              value={<Date date={output.originInfo.dateOther_type_online} />}
            />

            <Term
              label='Förlag'
              value={output.originInfo.agent?.namePart
                ?.map((namePart) => namePart.value)
                .join(', ')} //Todo add linked publishers
            />

            <Term label='Upplaga' value={output.originInfo.edition?.value} />

            <Term label='Fysisk omfattning' value={output.extent?.value} />
          </dl>
          <h2>Identifierare</h2>
          <dl className='identifiers'>
            <Term label='DiVA-id' value={output.recordInfo.id.value} />
            <Term label={'URN'} value={output.recordInfo.urn?.value} />
            {output.identifier_type_isbn?.map((identifier, index) => (
              <Term
                key={index}
                label={`ISBN (${identifier._displayLabel})`}
                value={identifier.value}
              />
            ))}

            <Term label={'ISRN'} value={output.identifier_type_isrn?.value} />
            {output.identifier_type_ismn?.map((identifier, index) => (
              <Term
                key={index}
                label={`ISMN (${identifier._displayLabel})`}
                value={identifier.value}
              />
            ))}
            <Term label={'DOI'} value={output.identifier_type_doi?.value} />
            <Term label={'PMID'} value={output.identifier_type_pmid?.value} />
            <Term label={'WOS'} value={output.identifier_type_wos?.value} />
            <Term
              label={'SCOPUS'}
              value={output.identifier_type_scopus?.value}
            />
            <Term
              label={'OpenAlex'}
              value={output.identifier_type_openAlex?.value}
            />
            <Term
              label={'Libris'}
              value={output['identifier_type_se-libr']?.value}
            />
            {output['identifier_type_localId']?.map((identifier, index) => (
              <Term
                key={index}
                label={`Lokal identifier`}
                value={identifier.value}
              />
            ))}
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
              <ul className='pill-container' lang={subject._lang}>
                {subject.topic.value.split(',').map((topicPart) => (
                  <li className='pill' key={topicPart}>
                    <Link
                      to={`/diva-output?search.include.includePart.keywordsSearchTerm.value=${topicPart}&search.rows.value=10`}
                    >
                      {topicPart}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

const createTitle = (titleInfo: DivaOutput['output']['titleInfo']) => {
  return `${titleInfo.title.value}${titleInfo.subTitle && `: ${titleInfo.subTitle.value}`}`;
};

interface PersonProps {
  person: NamePersonalGroup;
}

const Person = ({ person }: PersonProps) => {
  // TODO show affiliation and role
  if (person.person) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-person',
          recordId: person.person.value,
        })}
      >
        <span>
          {person.namePart_type_given?.value}{' '}
          {person.namePart_type_family?.value}
        </span>
      </Link>
    );
  }

  return (
    <span>
      {person.namePart_type_given?.value} {person.namePart_type_family?.value}
    </span>
  );
};

interface OrganisationProps {
  organisation: NameOrganisationGroup;
}

const Organisation = ({ organisation }: OrganisationProps) => {
  if (organisation.organisation) {
    return (
      <Link
        to={href('/:recordType/:recordId', {
          recordType: 'diva-organisation',
          recordId: organisation.organisation?.value,
        })}
      >
        <span>{organisation.namePart?.value}</span>
      </Link>
    );
  }

  return <span>{organisation.namePart?.value}</span>;
};

interface TermProps {
  label: string;
  value?: ReactNode;
  lang?: LanguageCollection;
}

const Term = ({ label, value, lang }: TermProps) => {
  if (!value) {
    return null;
  }

  return (
    <>
      <dt>{label}</dt>
      <dd {...(lang && { lang: mapISO639_2b_to_ISO639_1(lang) })} dir='auto'>
        {value}
      </dd>
    </>
  );
};

interface DateProps {
  date?: {
    year: {
      value: string;
    };
    month?: {
      value: string;
    };
    day?: {
      value: string;
    };
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
      {month && `-${month.value}`}
      {day && `-${day.value}`}
    </span>
  );
};
