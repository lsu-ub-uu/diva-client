import { getAuth, getSessionFromCookie } from '@/auth/sessions.server';
import { CollapsableText } from '@/components/CollapsableText/CollapsableText';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import { ErrorPage, getIconByHTTPStatus } from '@/errorHandling/ErrorPage';
import { UnhandledErrorPage } from '@/errorHandling/UnhandledErrorPage';
import type { DivaOutput, DurationGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import type { BFFDataRecord } from '@/types/record';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { data, Form, href, isRouteErrorResponse, Link } from 'react-router';
import type { Route } from '../divaOutput/+types/divaOutputView';
import css from './divaOutputView.css?url';

import { Button } from '@/components/Button/Button';
import { FloatingActionButton } from '@/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonContainer } from '@/components/FloatingActionButton/FloatingActionButtonContainer';
import { coraApiUrl } from '@/cora/helper.server';
import { getMetaTitleFromError } from '@/errorHandling/getMetaTitleFromError';
import {
  CodeIcon,
  DeleteIcon,
  EditDocumentIcon,
  ShoppingCartIcon,
} from '@/icons';
import { Date } from './components/Date';
import { Event } from './components/Event';
import { Location } from './components/Location';
import { Organisation } from './components/Organisation';
import { Person } from './components/Person';
import { SdgImage } from './components/SdgImage';
import { Term } from './components/Term';
import { createTitle } from './utils/createTitle';
import { generateCitationMeta } from './utils/generateCitationMeta';
import { getLanguageTextId } from './utils/translateLanguage';

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
  const apiUrl = coraApiUrl(`/record/diva-output/${recordId}`);

  const origin = new URL(request.url).origin;

  try {
    const record = (await getRecordByRecordTypeAndRecordId({
      dependencies,
      recordType: 'diva-output',
      recordId,
      authToken: auth?.data.token,
      decorated: true,
    })) as BFFDataRecord<DivaOutput>;
    return {
      record,
      pageTitle: createTitle(record.data.output.titleInfo),
      breadcrumb: t(record.data.output.titleInfo.title.value),
      apiUrl,
      origin,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw data(error?.response?.data, { status: error.status });
    }
    throw error;
  }
};

export const meta = ({ data, error }: Route.MetaArgs) => {
  return [
    { title: error ? getMetaTitleFromError(error) : data?.pageTitle },
    ...generateCitationMeta(data.record.data, data.origin),
  ];
};

export const links = () => [{ rel: 'stylesheet', href: css }];

export default function DivaOutputView({ loaderData }: Route.ComponentProps) {
  const language = useLanguage();
  const { t } = useTranslation();
  const record = loaderData.record;
  const output = record.data.output;
  return (
    <div className='diva-output-view'>
      <main>
        <article>
          <h1 lang={output.titleInfo._lang} dir='auto'>
            {loaderData.pageTitle}
          </h1>
          <dl>
            {output.name_type_personal && (
              <>
                <dt>{output.name_type_personal?.[0]?.__text[language]}</dt>
                {output.name_type_personal?.map((person, index) => (
                  <dd key={index}>
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
                  <dd key={index}>
                    <Organisation organisation={organisation} />
                  </dd>
                ))}
              </>
            )}
            {output.titleInfo_type_alternative?.map((title, index) => (
              <Term
                key={index}
                label={`${title.__text[language]} (${t(getLanguageTextId(title._lang))})`}
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
            {output.language.map((outputLanguage, index) => (
              <dd key={index}>
                {
                  outputLanguage['languageTerm_authority_iso639-2b_type_code']
                    .__valueText[language]
                }
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
                label={`${abstract?.__text[language]} (${t(getLanguageTextId(abstract._lang))})`}
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
              value={
                output.duration && (
                  <time dateTime={createDurationString(output.duration)}>
                    {createDurationString(output.duration)}
                  </time>
                )
              }
            />
            <Term
              label={output.physicalDescription?.__text[language]}
              value={output.physicalDescription?.extent.value}
            />
            <Term
              label={output.academicSemester?.__text[language]}
              value={[
                output.academicSemester?.semester?.value?.toUpperCase(),
                output.academicSemester?.year?.value,
              ]
                .filter(Boolean)
                .join(' ')}
            />
            {output.externalCollaboration && (
              <>
                <dt>{output.externalCollaboration.__text[language]}</dt>
                {output.externalCollaboration.namePart?.map(
                  (namePart, index) => <dd key={index}>{namePart.value}</dd>,
                )}
              </>
            )}
            <Term
              label={
                output.degreeGrantingInstitution_type_corporate?.__text[
                  language
                ]
              }
              value={
                output.degreeGrantingInstitution_type_corporate && (
                  <Organisation
                    organisation={
                      output.degreeGrantingInstitution_type_corporate
                    }
                  />
                )
              }
            />
            {output.supervisor_type_personal && (
              <>
                <dt>
                  {output.supervisor_type_personal?.[0]?.__text[language]}
                </dt>
                {output.supervisor_type_personal?.map((supervisor, index) => (
                  <dd key={index}>
                    <Person person={supervisor} />
                  </dd>
                ))}
              </>
            )}
            {output.examiner_type_personal && (
              <>
                <dt>{output.examiner_type_personal?.[0]?.__text[language]}</dt>
                {output.examiner_type_personal?.map((examiner, index) => (
                  <dd key={index}>
                    <Person person={examiner} />
                  </dd>
                ))}
              </>
            )}
            {output.opponent_type_personal && (
              <>
                <dt>{output.opponent_type_personal?.[0]?.__text[language]}</dt>
                {output.opponent_type_personal?.map((opponent, index) => (
                  <dd key={index}>
                    <Person person={opponent} />
                  </dd>
                ))}
              </>
            )}
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
                <Event event={output.defence} />
                <Event event={output.presentation} />
              </dl>
            </>
          )}
        </article>
      </main>
      <aside>
        <Button
          className='api-button'
          variant='tertiary'
          as='a'
          href={loaderData.apiUrl}
          target='_blank'
          rel='noopener noreferrer'
        >
          <CodeIcon />
          {t('divaClient_viewInApiText')}
        </Button>

        <Term
          label={output['accessCondition_authority_kb-se']?.__text[language]}
          value={
            output['accessCondition_authority_kb-se']?.__valueText[language]
          }
        />

        <h2>{output.originInfo.__text[language]}</h2>
        <dl className='inline-definitions'>
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
            label={output.dateOther_type_patent?.__text[language]} //Patent
            value={<Date date={output.dateOther_type_patent} />}
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
          {output.location && (
            <>
              <dt>{output.location?.[0].__text[language]}</dt>
              {output.location?.map((location, index) => (
                <dd key={index}>
                  <Location location={location} />
                </dd>
              ))}
            </>
          )}
          <Term
            label={output.location_displayLabel_orderLink?.__text[language]}
            value={
              output.location_displayLabel_orderLink && (
                <Location
                  location={output.location_displayLabel_orderLink}
                  icon={<ShoppingCartIcon />}
                />
              )
            }
          />
        </dl>

        <h2>{t('divaClient_identifierText')}</h2>
        <dl className='inline-definitions'>
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
              label={`${output.identifier_type_isbn?.[0]?.__text[language]} (${identifier._displayLabel})`}
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
          <Term
            label={output.identifier_type_patentNumber?.__text[language]}
            value={output.identifier_type_patentNumber?.value}
          />
        </dl>

        <div>
          {output.subject?.map((subject, index) => (
            <div key={index}>
              <h2>
                {subject.__text[language]} (
                {t(getLanguageTextId(subject._lang))})
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
                      to={`/diva-output?search.include.includePart.ssifSearchTerm.value=${classification.value}&search.rows.value=10`}
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
                    to={`/diva-output?search.include.includePart.sdgSearchTerm.value=${topic.value}&search.rows.value=10`}
                  >
                    <SdgImage topic={topic} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <dl>
          <Term
            label={output.note_type_external?.__text[language]}
            value={output.note_type_external?.value}
          />
        </dl>
      </aside>
      <FloatingActionButtonContainer>
        {record.userRights?.includes('update') && (
          <FloatingActionButton
            as={Link}
            to={href('/:recordType/:recordId/update', {
              recordType: record.recordType,
              recordId: record.id,
            })}
            text={t('divaClient_editRecordText')}
            icon={<EditDocumentIcon />}
          />
        )}
        {record.userRights?.includes('delete') && (
          <Form method='POST' action='delete'>
            <FloatingActionButton
              type='submit'
              text={t('divaClient_deleteRecordText')}
              icon={<DeleteIcon />}
            />
          </Form>
        )}
      </FloatingActionButtonContainer>
    </div>
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

function createDurationString(duration: DurationGroup) {
  const hours = duration.hh?.value;
  const minutes = duration.mm?.value;
  const seconds = duration.ss?.value;

  return [
    hours && `${hours}h`,
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
  ]
    .filter(Boolean)
    .join(' ');
}
