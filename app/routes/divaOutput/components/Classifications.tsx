import type {
  OutputUpdateGroup,
  SubjectSubjectGroup,
} from '@/generatedTypes/divaTypes';
import { SearchLinkList } from './SearchLinkList';
import { useLanguage } from '@/i18n/useLanguage';
import { useTranslation } from 'react-i18next';
import { getLanguageTextId } from '../utils/translateLanguage';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { SdgImage } from './SdgImage';

interface ClassificationsProps {
  output: OutputUpdateGroup;
}

export const Classifications = ({ output }: ClassificationsProps) => {
  const { t } = useTranslation();
  const language = useLanguage();
  return (
    <>
      {output.subject?.map((subject, index) => (
        <SearchLinkList
          pill
          key={index}
          heading={`${subject.__text[language]} (${t(getLanguageTextId(subject._lang))})`}
          searchTerm='keywordsSearchTerm'
          links={subject.topic.value.split(',').map((topicPart) => ({
            value: topicPart,
            label: topicPart,
          }))}
          language={mapISO639_2b_to_ISO639_1(subject._lang)}
        />
      ))}

      {output.classification_authority_ssif &&
        output.classification_authority_ssif.length > 0 && (
          <SearchLinkList
            pill
            heading={output.classification_authority_ssif?.[0].__text[language]}
            searchTerm='ssifSearchTerm'
            links={output.classification_authority_ssif.map(
              (classification) => ({
                value: classification.value,
                label: classification.__valueText[language].replace(
                  /^\(\d+\) /,
                  '',
                ),
              }),
            )}
          />
        )}
      {/* {output.subject_authority_diva && (
        <SearchLinkList
          pill
          heading={output.subject_authority_diva.__text[language]}
          searchTerm='topicSearchTerm'
          links={output.subject_authority_diva.topic.map((topic) => ({
            value: `topic_${topic.value}`,
            label: getSubjectTopicName(topic, language) || topic.value,
          }))}
        />
      )} */}
      {output.subject_authority_sdg && (
        <SearchLinkList
          heading={output.subject_authority_sdg.__text[language]}
          searchTerm='sdgSearchTerm'
          links={output.subject_authority_sdg.topic.map((topic) => ({
            value: topic.value,
            label: <SdgImage topic={topic} />,
          }))}
        />
      )}
    </>
  );
};

// function getSubjectTopicName(
//   topic: SubjectSubjectGroup['topic'][0],
//   language: 'en' | 'sv',
// ): string | undefined {
//   if (!topic) {
//     return undefined;
//   }

//   if (language === 'en') {
//     return topic.linkedRecord?.subject?.variant_lang_eng?.topic.value;
//   }
//   return topic.linkedRecord?.subject?.authority_lang_swe.topic.value;
// }
