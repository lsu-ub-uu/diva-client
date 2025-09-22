import type {
  OutputUpdateGroup,
  SubjectSubjectGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { mapISO639_2b_to_ISO639_1 } from '@/utils/mapLanguageCode';
import { useTranslation } from 'react-i18next';
import { getLanguageTextId } from '../utils/translateLanguage';
import { SdgImage } from './SdgImage';
import { SearchLinkList } from './SearchLinkList';

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
          items={subject.topic.value.split(',').map((topicPart) => ({
            href: topicPart,
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
            items={output.classification_authority_ssif.map(
              (classification) => ({
                href: classification.value,
                label: classification.__valueText[language].replace(
                  /^\(\d+\) /,
                  '',
                ),
              }),
            )}
          />
        )}
      {output.subject_authority_diva && (
        <SearchLinkList
          pill
          heading={output.subject_authority_diva.__text[language]}
          searchTerm='topicSearchTerm'
          items={output.subject_authority_diva.topic.map((topic) => ({
            label: getSubjectTopicName(topic, language) || topic.value,
          }))}
        />
      )}
      {output.subject_authority_sdg && (
        <SearchLinkList
          heading={output.subject_authority_sdg.__text[language]}
          searchTerm='sdgSearchTerm'
          items={output.subject_authority_sdg.topic.map((topic) => ({
            href: topic.value,
            label: <SdgImage topic={topic} />,
          }))}
        />
      )}
    </>
  );
};

function getSubjectTopicName(
  topic: SubjectSubjectGroup['topic'][0],
  language: 'en' | 'sv',
): string | undefined {
  if (!topic) {
    return undefined;
  }

  if (language === 'en') {
    return topic.linkedRecord?.subject?.variant_lang_eng?.topic.value;
  }
  return topic.linkedRecord?.subject?.authority_lang_swe.topic.value;
}
