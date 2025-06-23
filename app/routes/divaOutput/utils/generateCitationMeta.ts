import type {
  DivaOutput,
  RelatedItemJournalGroup,
} from '@/generatedTypes/divaTypes';
import { createTitle } from './createTitle';
import { createDownloadLinkFromResourceLink } from '@/utils/createDownloadLinkFromResourceLink';
import type { MetaDescriptors } from 'react-router/route-module';

export const generateCitationMeta = (
  divaOutput: DivaOutput,
  origin: string,
): MetaDescriptors => {
  const meta = [];

  meta.push({
    name: 'citation_title',
    content: createTitle(divaOutput.output.titleInfo),
  });

  divaOutput.output.name_type_personal?.forEach((person) => {
    if (
      person.role &&
      person.role.roleTerm.some((role) => role.value === 'aut')
    ) {
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

  if (divaOutput.output.originInfo.dateOther_type_online) {
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

  const pdfFulltextAttachements = (divaOutput.output.attachment || []).filter(
    (attachment) =>
      attachment.type.value === 'fullText' &&
      attachment.attachmentFile.linkedRecord.binary.master?.master?.mimeType ===
        'application/pdf',
  );

  pdfFulltextAttachements.forEach((attachment) => {
    meta.push({
      name: 'citation_pdf_url',
      content:
        origin +
        createDownloadLinkFromResourceLink(
          attachment.attachmentFile.linkedRecord.binary.master!.master,
        ),
    });
  });

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

  if (journal.identifier_displayLabel_eissn_type_issn) {
    meta.push({
      name: 'citation_issn',
      content: journal.identifier_displayLabel_eissn_type_issn.value,
    });
  }
};
