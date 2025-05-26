import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type {
  DivaOutput,
  LanguageCollection,
  NameOrganisationGroup,
  NamePersonalGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { data, href, isRouteErrorResponse, Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import type { Route } from '../divaOutput/+types/divaOutputView';
import css from './divaOutputView.css?url';
import { AxiosError } from 'axios';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import sdg1 from '@/images/sdg/sdg1.png';
import sdg2 from '@/images/sdg/sdg2.png';
import sdg3 from '@/images/sdg/sdg3.png';
import sdg4 from '@/images/sdg/sdg4.png';
import sdg5 from '@/images/sdg/sdg5.png';
import sdg6 from '@/images/sdg/sdg6.png';
import sdg7 from '@/images/sdg/sdg7.png';
import sdg8 from '@/images/sdg/sdg8.png';
import sdg9 from '@/images/sdg/sdg9.png';
import sdg10 from '@/images/sdg/sdg10.png';
import sdg11 from '@/images/sdg/sdg11.png';
import sdg12 from '@/images/sdg/sdg12.png';
import sdg13 from '@/images/sdg/sdg13.png';
import sdg14 from '@/images/sdg/sdg14.png';
import sdg15 from '@/images/sdg/sdg15.png';
import sdg16 from '@/images/sdg/sdg16.png';
import sdg17 from '@/images/sdg/sdg17.png';

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
  try {
    const record = (await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType: 'diva-output',
      recordId,
      authToken: auth?.data.token,
      decorated: true,
    })) as BFFDataRecord<DivaOutput>;
    return { record, breadcrumb: t(record.data.output.titleInfo.title.value) };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error?.response?.data, { status: error.status });
    }
    throw error;
  }
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DivaOutputView({ loaderData }: Route.ComponentProps) {
  const language = useLanguage();
  const { t } = useTranslation();
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
              label={output.name_type_personal?.[0]?.__text[language]}
              value={output.name_type_personal?.map((person, index) => (
                <Fragment key={index}>
                  <Person person={person} key={index} />
                  {index < output.name_type_personal!.length - 1 && ', '}
                </Fragment>
              ))}
            />
            <Term
              label={output.note_type_creatorCount?.__text[language]}
              value={output.note_type_creatorCount?.value}
            />
            <Term
              label={output.name_type_corporate?.[0]?.__text[language]}
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
                label={`${title.__text[language]} (${t(`${title._lang}LangItemText`)})`}
                value={createTitle(title)}
                lang={title._lang}
              />
            ))}

            <Term
              label={output.genre_type_outputType.__text[language]}
              value={output.genre_type_outputType.__valueText[language]}
            />
            <Term
              label={output.genre_type_subcategory?.__text[language]}
              value={output.genre_type_subcategory?.__valueText[language]}
            />

            <Term
              label={
                output.language[0]?.[
                  'languageTerm_authority_iso639-2b_type_code'
                ]?.__text[language]
              }
              value={output.language
                .map((language) =>
                  t(
                    `${language['languageTerm_authority_iso639-2b_type_code'].value}LangItemText`,
                  ),
                )
                .join(', ')}
            />

            {output.artisticWork_type_outputType && (
              <Term
                label={output.artisticWork_type_outputType.__text[language]}
                value={
                  output.artisticWork_type_outputType.__valueText[language]
                }
              />
            )}
            <Term
              label={output.genre_type_contentType?.__text[language]}
              value={output.genre_type_contentType?.__valueText[language]}
            />
            {output.abstract?.map((abstract, index) => (
              <Term
                key={index}
                label={`${abstract?.__text[language]} (${t(`${abstract._lang}LangItemText`)})`}
                value={<CollapsableText text={abstract.value ?? ''} />}
                lang={abstract._lang}
              />
            ))}
            <Term
              label={output.note_type_publicationStatus?.__text[language]}
              value={output.note_type_publicationStatus?.value}
            />
          </dl>

          <h2>{output.originInfo.__text[language]}</h2>
          <dl className='origin-info'>
            <Term
              label={output.originInfo.place?.[0]?.__text[language]}
              value={output.originInfo.place
                ?.map((place) => place?.placeTerm.value)
                .join(', ')}
            />

            <Term
              label={output.originInfo.dateIssued.__text[language]}
              value={<Date date={output.originInfo.dateIssued} />}
            />

            <Term
              label={output.originInfo?.copyrightDate?.__text[language]}
              value={<Date date={output.originInfo.copyrightDate} />}
            />

            <Term
              label={output.originInfo.dateOther_type_online?.__text[language]} //'Online'
              value={<Date date={output.originInfo.dateOther_type_online} />}
            />

            <Term
              label={output.originInfo.agent?.__text[language]}
              value={output.originInfo.agent?.namePart
                ?.map((namePart) => namePart.value)
                .join(', ')} //Todo add linked publishers
            />

            <Term
              label={output.originInfo.edition?.__text[language]}
              value={output.originInfo.edition?.value}
            />

            <Term
              label={output.extent?.__text[language]}
              value={output.extent?.value}
            />
          </dl>

          <h2>{t('divaClient_identifierText')}</h2>
          <dl className='identifiers'>
            <Term
              label={t('divaClient_divaIdText')}
              value={output.recordInfo.id.value}
            />
            <Term
              label={output.recordInfo.urn?.__text[language]}
              value={output.recordInfo.urn?.value}
            />
            {output.identifier_type_isbn?.map((identifier, index) => (
              <Term
                key={index}
                label={`${output.identifier_type_isbn?.[0]?.__text[language]}} (${identifier._displayLabel})`}
                value={identifier.value}
              />
            ))}

            <Term
              label={output.identifier_type_isrn?.__text[language]}
              value={output.identifier_type_isrn?.value}
            />
            {output.identifier_type_ismn?.map((identifier, index) => (
              <Term
                key={index}
                label={`${identifier.__text[language]} (${identifier._displayLabel})`}
                value={identifier.value}
              />
            ))}
            <Term
              label={output.identifier_type_doi?.__text[language]}
              value={output.identifier_type_doi?.value}
            />
            <Term
              label={output.identifier_type_pmid?.__text[language]}
              value={output.identifier_type_pmid?.value}
            />
            <Term
              label={output.identifier_type_wos?.__text[language]}
              value={output.identifier_type_wos?.value}
            />
            <Term
              label={output.identifier_type_scopus?.__text[language]}
              value={output.identifier_type_scopus?.value}
            />
            <Term
              label={output.identifier_type_openAlex?.__text[language]}
              value={output.identifier_type_openAlex?.value}
            />
            <Term
              label={output['identifier_type_se-libr']?.__text[language]}
              value={output['identifier_type_se-libr']?.value}
            />
            {output['identifier_type_localId']?.map((identifier, index) => (
              <Term
                key={index}
                label={output.identifier_type_localId?.[0]?.__text[language]}
                value={identifier.value}
              />
            ))}
          </dl>
        </article>
      </main>
      <aside>
        {/*<div>
          <h3>Bilaga</h3>
          <img
            alt='fulltext'
            src='https://pre.diva-portal.org/rest/record/binary/binary:15459311940110593/thumbnail'
          />
        </div>
        <p>FULLTEXT.pdf (432 kB)</p>

        <a href='/asdf'>Ladda ner</a>*/}

        <div>
          {output.subject?.map((subject, index) => (
            <div key={index}>
              <h2>
                {subject.__text[language]} ({t(`${subject._lang}LangItemText`)})
              </h2>
              <ul className='pill-container' lang={subject._lang}>
                {subject.topic.value.split(',').map((topicPart) => (
                  <li key={topicPart} className='pill'>
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
        {output.classification_authority_ssif &&
          output.classification_authority_ssif.length > 0 && (
            <div>
              <h2>
                {output.classification_authority_ssif?.[0].__text[language]}
              </h2>
              <ul className='pill-container'>
                {output.classification_authority_ssif.map((classification) => (
                  <li key={classification.value} className='pill'>
                    <Link
                      to={`/diva-output?search.include.includePart.subjectSearchTerm.value=${classification.value}&search.rows.value=10`}
                    >
                      {classification.__valueText[language].replace(
                        /^\(\d+\) /,
                        '',
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        {output.subject_authority_sdg && (
          <div>
            <h2>{output.subject_authority_sdg.__text[language]}</h2>
            <ul className='sdg-container'>
              {output.subject_authority_sdg.topic.map((topic) => (
                <li key={topic.value} className=''>
                  <Link
                    to={`/diva-output?search.include.includePart.subjectSearchTerm.value=${topic.value}&search.rows.value=10`}
                  >
                    {/* {topic.__valueText[language].replace(/^\d+\. /, '')} */}
                    <img
                      src={sdgImage(topic.value)}
                      alt={topic.__valueText[language]}
                      className='sdg-image'
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}

const createTitle = (titleInfo: DivaOutput['output']['titleInfo']) => {
  return `${titleInfo.title.value}${titleInfo.subTitle ? `: ${titleInfo.subTitle.value}` : ''}`;
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
  label?: string;
  value?: ReactNode;
  lang?: LanguageCollection;
}

const Term = ({ label, value, lang }: TermProps) => {
  if (!label || !value) {
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
          <Link to={`/${recordType}/search`}>
            {t('divaClient_errorGoToSearchText', { recordType })}
          </Link>
        }
        technicalInfo={error.data}
      />
    );
  }

  return <UnhandledErrorPage error={error} />;
};

const sdgImage = (value: string) => {
  switch (value) {
    case 'sdg1':
      return sdg1;
    case 'sdg2':
      return sdg2;
    case 'sdg3':
      return sdg3;
    case 'sdg4':
      return sdg4;
    case 'sdg5':
      return sdg5;
    case 'sdg6':
      return sdg6;
    case 'sdg7':
      return sdg7;
    case 'sdg8':
      return sdg8;
    case 'sdg9':
      return sdg9;
    case 'sdg10':
      return sdg10;
    case 'sdg11':
      return sdg11;
    case 'sdg12':
      return sdg12;
    case 'sdg13':
      return sdg13;
    case 'sdg14':
      return sdg14;
    case 'sdg15':
      return sdg15;
    case 'sdg16':
      return sdg16;
    case 'sdg17':
      return sdg17;
  }
};
