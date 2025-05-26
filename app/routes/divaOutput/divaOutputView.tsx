import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { useTranslation } from 'react-i18next';
import { data, isRouteErrorResponse, Link } from 'react-router';
import type { Route } from '../divaOutput/+types/divaOutputView';
import css from './divaOutputView.css?url';
import { AxiosError } from 'axios';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';

import { Term } from './components/Term';
import { Person } from './components/Person';
import { Organisation } from './components/Organisation';
import { Date } from './components/Date';
import { SdgImage } from './components/SdgImage';

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
            {output.name_type_personal && (
              <>
                <dt>{output.name_type_personal?.[0]?.__text[language]}</dt>
                {output.name_type_personal?.map((person, index) => (
                  <dd key={index} className='comma-separated'>
                    <Person person={person} key={index} />
                  </dd>
                ))}
              </>
            )}
            <Term
              label={output.note_type_creatorCount?.__text[language]}
              value={output.note_type_creatorCount?.value}
            />
            {output.name_type_corporate && (
              <>
                <dt>{output.name_type_corporate?.[0]?.__text[language]}</dt>
                {output.name_type_corporate?.map((organisation, index) => (
                  <dd className='comma-separated' key={index}>
                    <Organisation organisation={organisation} />
                  </dd>
                ))}
              </>
            )}
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

            <dt>
              {
                output.language[0]['languageTerm_authority_iso639-2b_type_code']
                  ?.__text[language]
              }
            </dt>
            {output.language.map((language, index) => (
              <dd className='comma-separated' key={index}>
                {t(
                  `${language['languageTerm_authority_iso639-2b_type_code'].value}LangItemText`,
                )}
              </dd>
            ))}

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
              value={output.note_type_publicationStatus?.__valueText[language]}
            />
          </dl>

          <dl>
            <Term
              label={output.note_type_external?.__text[language]}
              value={output.note_type_external?.value}
            />
            <Term
              label={output.typeOfResource?.__text[language]}
              value={output.typeOfResource?.__valueText[language]}
            />

            {output.type && (
              <>
                <dt>{output.type[0].__text[language]}</dt>
                {output.type.map((type) => (
                  <dd
                    className='comma-separated'
                    key={type.value}
                    lang={mapISO639_2b_to_ISO639_1(type._lang)}
                    dir='auto'
                  >
                    {type.value}
                  </dd>
                ))}
              </>
            )}
            {output.material && (
              <>
                <dt>{output.material[0].__text[language]}</dt>
                {output.material.map((material) => (
                  <dd
                    className='comma-separated'
                    key={material.value}
                    lang={mapISO639_2b_to_ISO639_1(material._lang)}
                    dir='auto'
                  >
                    {material.value}
                  </dd>
                ))}
              </>
            )}
            {output.technique && (
              <>
                <dt>{output.technique[0].__text[language]}</dt>
                {output.technique.map((technique) => (
                  <dd
                    className='comma-separated'
                    key={technique.value}
                    lang={mapISO639_2b_to_ISO639_1(technique._lang)}
                    dir='auto'
                  >
                    {technique.value}
                  </dd>
                ))}
              </>
            )}
            <Term
              label={output.size?.__text[language]}
              value={output.size?.value}
            />
            <Term
              label={output.duration?.__text[language]}
              value={[
                output.duration?.hh?.value,
                output.duration?.mm?.value,
                output.duration?.ss?.value,
              ].join(':')}
            />
            <Term
              label={output.physicalDescription?.__text[language]}
              value={output.physicalDescription?.extent.value}
            />

            <Term
              label={output.academicSemester?.__text[language]}
              value={[
                output.academicSemester?.semester?.__valueText[language],
                output.academicSemester?.year?.__text[language],
              ]
                .filter(Boolean)
                .join(' ')}
            />
          </dl>
          {output.studentDegree && (
            <>
              <h2>{output.studentDegree.__text[language]}</h2>
              <dl>
                <Term
                  label={output.studentDegree.course?.__text[language]}
                  value={output.studentDegree.course?.value} // TODO linked record
                />
                <Term
                  label={output.studentDegree.degreeLevel?.__text[language]}
                  value={
                    output.studentDegree.degreeLevel?.__valueText[language]
                  }
                />
                <Term
                  label={
                    output.studentDegree.universityPoints?.__text[language]
                  }
                  value={
                    output.studentDegree.universityPoints?.__valueText[language]
                  }
                />
                <Term
                  label={output.studentDegree.programme?.__text[language]}
                  value={output.studentDegree.programme?.value} // TODO linked record
                />
              </dl>
            </>
          )}
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
                    <SdgImage topic={topic} />
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
