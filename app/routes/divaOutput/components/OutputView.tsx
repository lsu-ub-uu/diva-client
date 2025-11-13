import type { DivaOutput } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { ShoppingCartIcon } from '@/icons';
import { Date } from '@/routes/divaOutput/components/Date';
import { Location } from '@/routes/divaOutput/components/Location';
import { Term } from '@/routes/divaOutput/components/Term';
import { createTitle } from '@/routes/divaOutput/utils/createTitle';
import { getLanguageTextId } from '@/routes/divaOutput/utils/translateLanguage';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { useTranslation } from 'react-i18next';
import { CollapsableText } from '../../../components/CollapsableText/CollapsableText';
import { ArtisticWorkFields } from './ArtisticWork';
import { Attachments } from './Attachments';
import { Book } from './Book';
import { Classifications } from './Classifications';
import { ConferencePublication } from './ConferencePublication';
import { DegreeProjectFields } from './DegreeProjectFields';
import { Funder } from './Funder';
import { Identifiers } from './Identifiers';
import { Journal } from './Journal';
import { Organisations } from './Organisations';
import { OriginInfo } from './OriginInfo';
import { Persons } from './Persons';
import { Project } from './Project';
import { RelatedOutput } from './RelatedOutput';
import { ResearchData } from './ResearchData';
import { Series } from './Series';
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
            lang={
              output.titleInfo?._lang &&
              mapISO639_2b_to_ISO639_1(output.titleInfo._lang)
            }
            dir='auto'
          >
            {output.titleInfo
              ? createTitle(output.titleInfo)
              : t('divaClient_missingTitleText')}
          </h1>
          <dl>
            <Persons persons={output.name_type_personal} />
            <Organisations organisations={output.name_type_corporate} />
            <Term
              label={output.note_type_creatorCount?.__text?.[language]}
              value={output.note_type_creatorCount?.value}
            />
            {output.titleInfo_type_alternative?.map((title, index) => (
              <Term
                key={index}
                label={`${title.__text?.[language]} (${t(getLanguageTextId(title._lang))})`}
                value={createTitle(title)}
                lang={title._lang}
              />
            ))}
            <Term
              label={output.genre_type_outputType?.__text?.[language]}
              value={output.genre_type_outputType?.__valueText?.[language]}
            />
            <Term
              label={output.genre_type_subcategory?.__text?.[language]}
              value={output.genre_type_subcategory?.__valueText?.[language]}
            />
            <Term
              label={
                output.language?.[0][
                  'languageTerm_authority_iso639-2b_type_code'
                ]?.__text?.[language]
              }
              value={output.language?.map(
                (outputLanguage) =>
                  outputLanguage['languageTerm_authority_iso639-2b_type_code']
                    ?.__valueText?.[language],
              )}
            />

            {output.artisticWork_type_outputType && (
              <Term
                label={output.artisticWork_type_outputType.__text?.[language]}
                value={
                  output.artisticWork_type_outputType.__valueText?.[language]
                }
              />
            )}
            <Term
              label={output.genre_type_contentType?.__text?.[language]}
              value={output.genre_type_contentType?.__valueText?.[language]}
            />
            {output.abstract?.map((abstract, index) => (
              <Term
                key={index}
                label={`${abstract?.__text?.[language]} (${t(getLanguageTextId(abstract._lang))})`}
                value={<CollapsableText text={abstract.value ?? ''} />}
                lang={abstract._lang}
              />
            ))}
            <Term
              label={output.note_type_publicationStatus?.__text?.[language]}
              value={
                output.note_type_publicationStatus?.__valueText?.[language]
              }
            />
          </dl>

          <dl>
            <ArtisticWorkFields output={output} />
            <DegreeProjectFields output={output} />
            <Term
              label={output.relatedItem_type_conference?.__text?.[language]}
              value={output.relatedItem_type_conference?.conference?.value}
            />
            <Term
              label={
                output.relatedItem_type_publicationChannel?.__text?.[language]
              }
              value={
                output.relatedItem_type_publicationChannel?.publicationChannel
                  ?.value
              }
            />
            <Term
              label={output.relatedItem_type_initiative?.__text?.[language]}
              value={output.relatedItem_type_initiative?.initiative?.map(
                (initiative) => initiative.__valueText?.[language],
              )}
            />
          </dl>

          <StudentDegrees studentDegrees={output.studentDegree} />

          {/* Related items*/}
          <Journal journal={output.relatedItem_type_journal} />
          <Book book={output.relatedItem_type_book} />
          <ConferencePublication
            conferencePublication={
              output.relatedItem_type_conferencePublication
            }
          />
          {output.relatedItem_type_researchData?.map((researchData, index) => (
            <ResearchData key={index} researchData={researchData} />
          ))}
          {output.relatedItem_type_project?.map((project, index) => (
            <Project key={index} project={project} />
          ))}

          {output.relatedItem_type_funder?.map((funder, index) => (
            <Funder key={index} funder={funder} />
          ))}

          {output.relatedItem_type_series?.map((series, index) => (
            <Series key={index} series={series} />
          ))}

          {(output.related ||
            output.related_type_constituent ||
            output.related_type_retracted) && (
            <section>
              <h2>{t('divaClient_relatedPublicationsText')}</h2>
              <dl>
                {output.related?.map((relatedOutput, index) => (
                  <RelatedOutput key={index} relatedOutput={relatedOutput} />
                ))}
                {output.related_type_constituent?.map((constituent, index) => (
                  <RelatedOutput key={index} relatedOutput={constituent} />
                ))}
                {output.related_type_retracted?.map((retracted, index) => (
                  <RelatedOutput key={index} relatedOutput={retracted} />
                ))}
              </dl>
            </section>
          )}
        </article>
      </main>
      <aside>
        <Attachments attachments={output.attachment} />
        <dl>
          <Term
            label={
              output['accessCondition_authority_kb-se']?.__text?.[language]
            }
            value={
              output['accessCondition_authority_kb-se']?.__valueText?.[language]
            }
          />
        </dl>
        <OriginInfo originInfo={output.originInfo} />
        <dl>
          <Term
            label={output.dateOther_type_patent?.__text?.[language]} //Patent
            value={<Date date={output.dateOther_type_patent} />}
          />
          {output.patentHolder_type_corporate && (
            <Organisations
              organisations={[output.patentHolder_type_corporate]}
            />
          )}
          <Term
            label={output.patentCountry?.__text?.[language]}
            value={output.patentCountry?.__valueText?.[language]}
          />

          {output.location && (
            <>
              <dt>{output.location?.[0].__text?.[language]}</dt>
              {output.location?.map((location, index) => (
                <dd key={index}>
                  <Location location={location} />
                </dd>
              ))}
            </>
          )}
          <Term
            label={output.location_displayLabel_orderLink?.__text?.[language]}
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

        <Classifications output={output} />
        <dl>
          <Term
            label={output.note_type_external?.__text?.[language]}
            value={output.note_type_external?.value}
          />
        </dl>
      </aside>
    </div>
  );
};
