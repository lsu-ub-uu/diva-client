import type {
  JournalUpdateGroup,
  RelatedItemJournalGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';

interface JournalProps {
  journal: RelatedItemJournalGroup | undefined;
}

export const Journal = ({ journal }: JournalProps) => {
  const language = useLanguage();
  if (!journal) {
    return null;
  }

  return (
    <div>
      <h2>{journal.__text[language]}</h2>
      <dl className='inline-definitions'>
        <JournalInfo
          journal={journal}
          linkedJournal={journal.journal?.linkedRecord.journal}
        />
        <Term
          label={journal.part?.detail_type_volume?.__text[language]}
          value={journal.part?.detail_type_volume?.number?.value}
        />
        <Term
          label={journal.part?.detail_type_issue?.__text[language]}
          value={journal.part?.detail_type_issue?.number?.value}
        />
        <Term
          label={journal.part?.detail_type_artNo?.__text[language]}
          value={journal.part?.detail_type_artNo?.number?.value}
        />
        <Term
          label={journal.part?.extent?.start?.__text[language]}
          value={journal.part?.extent?.start?.value}
        />
        <Term
          label={journal.part?.extent?.end?.__text[language]}
          value={journal.part?.extent?.end?.value}
        />
      </dl>
    </div>
  );
};

const JournalInfo = ({
  journal,
  linkedJournal,
}: {
  journal: RelatedItemJournalGroup;
  linkedJournal: JournalUpdateGroup | undefined;
}) => {
  const language = useLanguage();
  const titleInfo = journal.titleInfo ?? linkedJournal?.titleInfo;
  const pissn =
    journal.identifier_displayLabel_pissn_type_issn ??
    linkedJournal?.identifier_displayLabel_pissn_type_issn;
  const eissn =
    journal.identifier_displayLabel_eissn_type_issn ??
    linkedJournal?.identifier_displayLabel_eissn_type_issn;

  return (
    <>
      <Term label={titleInfo?.__text[language]} value={getTitle(titleInfo)} />
      <Term label={pissn?.__text[language]} value={pissn?.value} />
      <Term label={eissn?.__text[language]} value={eissn?.value} />
    </>
  );
};

const getTitle = (titleInfo: RelatedItemJournalGroup['titleInfo']) => {
  return [titleInfo?.title.value, titleInfo?.subtitle?.value]
    .filter(Boolean)
    .join(': ');
};
