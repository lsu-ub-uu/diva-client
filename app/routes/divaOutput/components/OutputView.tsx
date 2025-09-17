import type { DivaOutput, DurationGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { ShoppingCartIcon } from '@/icons';
import { Attachement } from '@/routes/divaOutput/components/Attachment';

import { Date } from '@/routes/divaOutput/components/Date';
import { Event } from '@/routes/divaOutput/components/Event';
import { Location } from '@/routes/divaOutput/components/Location';
import { Organisation } from '@/routes/divaOutput/components/Organisation';
import { SdgImage } from '@/routes/divaOutput/components/SdgImage';
import { Term } from '@/routes/divaOutput/components/Term';
import { createTitle } from '@/routes/divaOutput/utils/createTitle';
import { getLanguageTextId } from '@/routes/divaOutput/utils/translateLanguage';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { CollapsableText } from '../../../components/CollapsableText/CollapsableText';
import { Identifiers } from './Identifiers';
import { OriginInfo } from './OriginInfo';
import { Persons } from './Persons';
import { StudentDegrees } from './StudentDegrees';

interface OutputViewProps {
  data: DivaOutput;
}

export const OutputView = ({ data }: OutputViewProps) => {
  const language = useLanguage();
  const { t } = useTranslation();
  const output = data.output;
  return (
    <div className='diva-output-view'>
      <main>
        <article>
          <h1
            lang={mapISO639_2b_to_ISO639_1(output.titleInfo._lang)}
            dir='auto'
          >
            {createTitle(output.titleInfo)}
          </h1>
          <dl>
            <Persons persons={output.name_type_personal} />
            {output.name_type_corporate && (
              <>
                <dt>{output.name_type_corporate?.[0]?.__text[language]}</dt>
                {output.name_type_corporate?.map((organisation, index) => (
                  <dd key={index} className='block'>
                    <Organisation organisation={organisation} />
                  </dd>
                ))}
              </>
            )}
            <Term
              label={output.note_type_creatorCount?.__text[language]}
              value={output.note_type_creatorCount?.value}
            />
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
                output.academicSemester?.academicSemester?.value?.toUpperCase(),
                output.academicSemester?.year?.value,
              ]
                .filter(Boolean)
                .join(' ')}
            />
            {output.externalCollaboration && (
              <>
                <dt>{output.externalCollaboration.__text[language]}</dt>
                {output.externalCollaboration.namePart?.map(
                  (namePart, index) => (
                    <dd key={index}>{namePart.value}</dd>
                  ),
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
            <Persons persons={output.supervisor_type_personal} />
            <Persons persons={output.examiner_type_personal} />
            <Persons persons={output.opponent_type_personal} />

            <Event event={output.defence} />
            <Event event={output.presentation} />
          </dl>
          <StudentDegrees studentDegrees={output.studentDegree} />
        </article>
      </main>
      <aside>
        {output.attachment?.map((attachment, index) => {
          return <Attachement attachement={attachment} key={index} />;
        })}
        <dl>
          <Term
            label={output['accessCondition_authority_kb-se']?.__text[language]}
            value={
              output['accessCondition_authority_kb-se']?.__valueText[language]
            }
          />
        </dl>
        <OriginInfo originInfo={output.originInfo} />
        <dl>
          <Term
            label={output.dateOther_type_patent?.__text[language]} //Patent
            value={<Date date={output.dateOther_type_patent} />}
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
        <Identifiers output={output} />

        <div>
          {output.subject?.map((subject, index) => (
            <div key={index}>
              <h2>
                {subject.__text[language]} (
                {t(getLanguageTextId(subject._lang))})
              </h2>
              <ul
                className='pill-container'
                lang={mapISO639_2b_to_ISO639_1(subject._lang)}
              >
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
    </div>
  );
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
// TODO:
// genre type subcategory
// name type person affilierings ror
// name type corp, description, ror
// note type context
// patentHolder
// patentCountry
// origin agent link, (editions saknas i ultimate)
// imprint
// subject authority diva
// ismn (saknas i ultimate)
// pmid  (saknas i ultimate)
// pubmed  (saknas i ultimate)
// scupus  (saknas i ultimate)
// arkivnummer
// student degree course, programme
// relatedItems
// related
// localGenericMarkup
// attachment, rättigheter, större thumbnail
