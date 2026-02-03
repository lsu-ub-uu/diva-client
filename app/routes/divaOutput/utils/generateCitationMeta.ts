import type {
  DivaOutput,
  RelatedItemJournalGroup,
} from '@/generatedTypes/divaTypes';
import type { MetaDescriptor } from 'react-router';
import { createTitle } from './createTitle';
import { formatPersonName } from './formatPersonName';

export const generateCitationMeta = (
  divaOutput: DivaOutput,
  externalSystemUrl: string,
): MetaDescriptor[] => {
  const meta = [];

  if (divaOutput.output.titleInfo) {
    meta.push({
      name: 'citation_title',
      content: createTitle(divaOutput.output.titleInfo),
    });
  }

  divaOutput.output.name_type_personal?.forEach((person) => {
    if (person?.role?.roleTerm?.some((role) => role.value === 'aut')) {
      meta.push({
        name: 'citation_author',
        content: formatPersonName(person),
      });
    }
  });

  if (divaOutput.output.originInfo?.dateIssued) {
    meta.push({
      name: 'citation_publication_date',
      content: [
        divaOutput.output.originInfo?.dateIssued?.year?.value,
        divaOutput.output.originInfo?.dateIssued?.month?.value,
        divaOutput.output.originInfo?.dateIssued?.day?.value,
      ]
        .filter(Boolean)
        .join('/'),
    });
  }

  if (divaOutput.output?.originInfo?.dateOther_type_online) {
    meta.push({
      name: 'citation_online_date',
      content: [
        divaOutput.output.originInfo.dateOther_type_online.year?.value,
        divaOutput.output.originInfo.dateOther_type_online.month?.value,
        divaOutput.output.originInfo.dateOther_type_online.day?.value,
      ]
        .filter(Boolean)
        .join('/'),
    });
  }

  if (divaOutput.output.relatedItem_type_journal) {
    addMetaJournalInfo(meta, divaOutput.output.relatedItem_type_journal);
  }

  if (divaOutput.output.identifier_type_isbn) {
    divaOutput.output.identifier_type_isbn.forEach((isbn) => {
      meta.push({
        name: 'citation_isbn',
        content: isbn.value,
      });
    });
  }

  if (divaOutput.output.identifier_type_doi) {
    meta.push({
      name: 'citation_doi',
      content: divaOutput.output.identifier_type_doi.value,
    });
  }

  const pdfFulltextAttachments = (divaOutput.output.attachment || []).filter(
    (attachment) =>
      attachment?.label?.value === 'fullText' &&
      attachment?.file?.linkedRecord?.binary?.master?.master?.mimeType ===
        'application/pdf',
  );

  pdfFulltextAttachments
    .map((attachment) => attachment?.file?.linkedRecord?.binary)
    .filter((binary) => binary?.recordInfo.visibility.value === 'published')
    .forEach((binary) => {
      if (binary?.master?.master) {
        meta.push({
          name: 'citation_pdf_url',
          content: `${externalSystemUrl}/rest/record/binary/${binary.master?.master.id}/${binary.master?.master.name}`,
        });
      }
    });

  return meta;
};

const addMetaJournalInfo = (
  meta: MetaDescriptor[],
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

  if (journal.identifier_displayLabel_eissn_type_issn) {
    meta.push({
      name: 'citation_issn',
      content: journal.identifier_displayLabel_eissn_type_issn.value,
    });
  }
};
