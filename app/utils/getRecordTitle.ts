/*
 * Copyright 2024 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import type {
  DivaCourse,
  DivaFunder,
  DivaJournal,
  DivaLocalLabel,
  DivaOrganisation,
  DivaOutput,
  DivaPerson,
  DivaProgramme,
  DivaProject,
  DivaPublisher,
  DivaSeries,
  DivaSubject,
} from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';

export const getRecordTitle = (
  record: BFFDataRecord,
  lang: 'sv' | 'en',
): string | undefined => {
  const data = record.data;

  if (record.recordType === 'diva-output') {
    const divaOutput = record as unknown as DivaOutput;
    return divaOutput?.output?.titleInfo?.title?.value;
  }

  if (record.recordType === 'diva-person') {
    const divaPerson = data as unknown as DivaPerson;
    const familyName =
      divaPerson.person.authority?.name_type_personal?.namePart_type_family
        ?.value;
    const givenName =
      divaPerson.person.authority?.name_type_personal?.namePart_type_given
        ?.value;

    if (!familyName && !givenName) {
      return undefined;
    }
    return [givenName, familyName].filter(Boolean).join(' ');
  }

  if (record.recordType === 'diva-project') {
    const divaProject = record as unknown as DivaProject;
    return divaProject?.project?.titleInfo?.title?.value;
  }

  if (record.recordType === 'diva-course') {
    const divaCourse = data as unknown as DivaCourse;
    if (lang === 'en' && divaCourse?.course?.variant_lang_eng?.topic?.value) {
      return divaCourse.course.variant_lang_eng.topic.value;
    }
    return divaCourse?.course?.authority_lang_swe?.topic?.value;
  }

  if (record.recordType === 'diva-organization') {
    const divaOrganisation = data as unknown as DivaOrganisation;
    if (
      lang === 'en' &&
      divaOrganisation?.organisation?.variant_lang_eng?.name_type_corporate
        ?.namePart?.value
    ) {
      return divaOrganisation.organisation.variant_lang_eng.name_type_corporate
        .namePart.value;
    }
    return divaOrganisation?.organisation?.authority_lang_swe
      ?.name_type_corporate?.namePart?.value;
  }

  if (record.recordType === 'diva-journal') {
    const divaJournal = data as unknown as DivaJournal;
    return divaJournal?.journal?.titleInfo?.title?.value;
  }

  if (record.recordType === 'diva-subject') {
    const divaSubject = data as unknown as DivaSubject;
    if (lang === 'en' && divaSubject?.subject?.variant_lang_eng?.topic?.value) {
      return divaSubject.subject.variant_lang_eng.topic.value;
    }
    return divaSubject?.subject?.authority_lang_swe?.topic?.value;
  }

  if (record.recordType === 'diva-programme') {
    const divaProgramme = data as unknown as DivaProgramme;
    if (
      lang === 'en' &&
      divaProgramme?.programme?.variant_lang_eng?.topic?.value
    ) {
      return divaProgramme.programme.variant_lang_eng.topic.value;
    }
    return divaProgramme?.programme?.authority_lang_swe?.topic?.value;
  }

  if (record.recordType === 'diva-series') {
    const divaSeries = data as unknown as DivaSeries;
    return divaSeries?.series?.titleInfo?.title?.value;
  }

  if (record.recordType === 'diva-localLabel') {
    const divaLocalLabel = data as unknown as DivaLocalLabel;
    return divaLocalLabel?.localLabel?.localLabel?.value;
  }
  if (record.recordType === 'diva-publisher') {
    const divaPublisher = data as unknown as DivaPublisher;
    return divaPublisher?.publisher?.name_type_corporate?.namePart?.value;
  }

  if (record.recordType === 'diva-funder') {
    const divaFunder = data as unknown as DivaFunder;
    if (
      lang === 'en' &&
      divaFunder?.funder?.variant_lang_eng?.name_type_corporate?.namePart?.value
    ) {
      return divaFunder.funder.variant_lang_eng.name_type_corporate.namePart
        .value;
    }
    return divaFunder?.funder?.authority_lang_swe?.name_type_corporate?.namePart
      ?.value;
  }

  //member

  return record.id;
};
