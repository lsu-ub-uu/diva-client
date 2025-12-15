import type {
  DivaOutputGroup,
  SubjectUpdateGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { SdgImage } from './SdgImage';
import { SearchLinkList } from './SearchLinkList';

interface ClassificationsProps {
  output: DivaOutputGroup;
}

export const Classifications = ({ output }: ClassificationsProps) => {
  const language = useLanguage();
  return (
    <>
      {output.subject && output.subject.length > 0 && (
        <SearchLinkList
          pill
          heading={output.subject[0].__text?.[language]}
          searchTerm='keywordsSearchTerm'
          items={output.subject.map((subject) => ({
            href: subject.topic?.value,
            label: subject.topic?.value,
          }))}
        />
      )}

      {output.classification_authority_ssif &&
        output.classification_authority_ssif.length > 0 && (
          <SearchLinkList
            pill
            heading={
              output.classification_authority_ssif?.[0].__text?.[language]
            }
            searchTerm='ssifSearchTerm'
            items={output.classification_authority_ssif.map(
              (classification) => ({
                href: classification.value,
                label: classification.__valueText?.[language].replace(
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
          heading={output.subject_authority_diva.__text?.[language]}
          searchTerm='subjectTopicSearchTerm'
          items={output.subject_authority_diva?.topic?.map((topic) => ({
            label: getSubjectTopicName(topic, language) || topic.value,
            href: `diva-subject_${topic.value}`,
          }))}
        />
      )}
      {output.subject_authority_sdg && (
        <SearchLinkList
          heading={output.subject_authority_sdg.__text?.[language]}
          searchTerm='sdgSearchTerm'
          items={output.subject_authority_sdg?.topic?.map((topic) => ({
            href: topic.value,
            label: <SdgImage topic={topic} />,
          }))}
        />
      )}
      {output.localLabel && (
        <SearchLinkList
          pill
          heading={output.localLabel[0].__text?.[language]}
          searchTerm='localLabelsLinkSearchTerm'
          items={output.localLabel.map((label, index) => ({
            key: index,
            label: label.linkedRecord?.localLabel?.localLabel?.value,
            href: `diva-localLabel_${label.value}`,
          }))}
        />
      )}
    </>
  );
};

function getSubjectTopicName(
  topic: {
    value: string;
    linkedRecord: {
      subject: SubjectUpdateGroup;
    };

    __text?: { sv: string; en: string };
  },
  language: 'en' | 'sv',
): string | undefined {
  if (!topic) {
    return undefined;
  }

  if (language === 'en') {
    return topic?.linkedRecord?.subject?.variant_lang_eng?.topic?.value || '';
  }
  return topic?.linkedRecord?.subject?.authority_lang_swe?.topic?.value || '';
}
