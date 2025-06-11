import type {
  DivaOutput,
  RelatedItemJournalGroup,
} from '@/generatedTypes/divaTypes';
import type { MetaDescriptors } from 'react-router/route-module';
import { createTitle } from './createTitle';

export const generateSEOMeta = (divaOutput: DivaOutput): MetaDescriptors => {
  const meta = [];

  meta.push({
    name: 'citation_title',
    content: createTitle(divaOutput.output.titleInfo),
  });

  divaOutput.output.name_type_personal?.forEach((person) => {
    if (person.role?.roleTerm.some((role) => role.value === 'aut')) {
      const family = person.namePart_type_family?.value || '';
      const given = person.namePart_type_given?.value || '';
      meta.push({
        name: 'citation_author',
        content: [family, given].filter(Boolean).join(', '),
      });
    }
  });

  meta.push({
    name: 'citation_publication_date',
    content: [
      divaOutput.output.originInfo.dateIssued.year?.value,
      divaOutput.output.originInfo.dateIssued.month?.value,
      divaOutput.output.originInfo.dateIssued.day?.value,
    ]
      .filter(Boolean)
      .join('/'),
  });

  if (divaOutput.output.relatedItem_type_journal) {
    addMetaJournalInfo(meta, divaOutput.output.relatedItem_type_journal);
  }

  if (divaOutput.output.identifier_type_doi) {
    meta.push({
      name: 'citation_doi',
      content: divaOutput.output.identifier_type_doi.value,
    });
  }

  return meta;
};

const addMetaJournalInfo = (
  meta: MetaDescriptors,
  journal: RelatedItemJournalGroup,
) => {
  // TODO Handle linked journal
  if (journal.titleInfo) {
    meta.push({
      name: 'citation_journal_title',
      content: createTitle(journal.titleInfo),
    });
  }
  if (journal.part?.detail_type_volume?.number) {
    meta.push({
      name: 'citation_volume',
      content: journal.part.detail_type_volume.number.value,
    });
  }
  if (journal.part?.detail_type_issue?.number) {
    meta.push({
      name: 'citation_issue',
      content: journal.part.detail_type_issue.number.value,
    });
  }
  if (journal.part?.extent?.start) {
    meta.push({
      name: 'citation_firstpage',
      content: journal.part.extent.start.value,
    });
  }
  if (journal.part?.extent?.end) {
    meta.push({
      name: 'citation_lastpage',
      content: journal.part.extent.end.value,
    });
  }
  if (journal.identifier_displayLabel_pissn_type_issn) {
    meta.push({
      name: 'citation_issn',
      content: journal.identifier_displayLabel_pissn_type_issn.value,
    });
  }
};
