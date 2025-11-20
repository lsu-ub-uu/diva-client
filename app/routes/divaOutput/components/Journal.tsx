import type {
  JournalUpdateGroup,
  RelatedItemJournalGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { useId } from 'react';
import { TitleInfo } from './TitleInfo';

interface JournalProps {
  journal: RelatedItemJournalGroup | undefined;
}

export const Journal = ({ journal }: JournalProps) => {
  const language = useLanguage();
  const id = useId();
  if (!journal) {
    return null;
  }

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{journal.__text?.[language]}</h2>
      <dl className='inline-definitions'>
        {journal.journal?.linkedRecord.journal ? (
          <JournalInfo journal={journal.journal?.linkedRecord.journal} />
        ) : (
          <JournalInfo journal={journal} />
        )}
        <Term
          label={journal.part?.detail_type_volume?.__text?.[language]}
          value={journal.part?.detail_type_volume?.number?.value}
        />
        <Term
          label={journal.part?.detail_type_issue?.__text?.[language]}
          value={journal.part?.detail_type_issue?.number?.value}
        />
        <Term
          label={journal.part?.detail_type_artNo?.__text?.[language]}
          value={journal.part?.detail_type_artNo?.number?.value}
        />
        <Term
          label={journal.part?.extent?.start?.__text?.[language]}
          value={journal.part?.extent?.start?.value}
        />
        <Term
          label={journal.part?.extent?.end?.__text?.[language]}
          value={journal.part?.extent?.end?.value}
        />
      </dl>
    </section>
  );
};

const JournalInfo = ({
  journal,
}: {
  journal: RelatedItemJournalGroup | JournalUpdateGroup;
}) => {
  const language = useLanguage();
  return (
    <>
      <TitleInfo titleInfo={journal.titleInfo} />
      <Term
        label={
          journal.identifier_displayLabel_pissn_type_issn?.__text?.[language]
        }
        value={journal.identifier_displayLabel_pissn_type_issn?.value}
      />

      <Term
        label={
          journal.identifier_displayLabel_eissn_type_issn?.__text?.[language]
        }
        value={journal.identifier_displayLabel_eissn_type_issn?.value}
      />
    </>
  );
};
