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
  DivaMember,
  DivaOrganisation,
  DivaOutput,
  DivaPerson,
  DivaProgramme,
  DivaProject,
  DivaPublisher,
  DivaSeries,
  DivaSubject,
  TitleInfoGroup,
} from '@/generatedTypes/divaTypes';
import type { BFFDataRecord } from '@/types/record';

export const handledRecordTypes = [
  'diva-output',
  'diva-person',
  'diva-project',
  'diva-course',
  'diva-organization',
  'diva-journal',
  'diva-subject',
  'diva-programme',
  'diva-series',
  'diva-localLabel',
  'diva-publisher',
  'diva-funder',
  'diva-member',
];

export const getRecordTitle = (
  record: BFFDataRecord,
  lang: 'sv' | 'en',
): string => {
  const title = getTitleByRecordType(record, lang);
  return title ?? record.id;
};

const getTitleByRecordType = (
  record: BFFDataRecord,
  lang: 'sv' | 'en',
): string | undefined => {
  switch (record.recordType) {
    case 'diva-output':
      return getTitleForOutput(record.data as DivaOutput);
    case 'diva-person':
      return getTitleForPerson(record.data as DivaPerson);
    case 'diva-project':
      return getTitleForProject(record.data as DivaProject);
    case 'diva-course':
      return getTitleForCourse(record.data as DivaCourse, lang);
    case 'diva-organisation':
      return getTitleForOrganization(record.data as DivaOrganisation, lang);
    case 'diva-journal':
      return getTitleForJournal(record.data as DivaJournal);
    case 'diva-subject':
      return getTitleForSubject(record.data as DivaSubject, lang);
    case 'diva-programme':
      return getTitleForProgramme(record.data as DivaProgramme, lang);
    case 'diva-series':
      return getTitleForSeries(record.data as DivaSeries);
    case 'diva-localLabel':
      return getTitleForLocalLabel(record.data as DivaLocalLabel);
    case 'diva-publisher':
      return getTitleForPublisher(record.data as DivaPublisher);
    case 'diva-funder':
      return getTitleForFunder(record.data as DivaFunder, lang);
    case 'diva-member':
      return getTitleForMember(record.data as DivaMember, lang);
    default:
      return undefined;
  }
};

export const getTitleForOutput = (
  divaOutput: DivaOutput,
): string | undefined => {
  return divaOutput?.output?.titleInfo?.title?.value;
};

export const getFullTitleForOutput = (
  divaOutput: DivaOutput,
): string | undefined => {
  return getTitleFromTitleInfo(divaOutput?.output?.titleInfo);
};

export const getTitleForPerson = (
  divaPerson: DivaPerson,
): string | undefined => {
  const familyName =
    divaPerson.person.authority?.name_type_personal?.namePart_type_family
      ?.value;
  const givenName =
    divaPerson.person.authority?.name_type_personal?.namePart_type_given?.value;

  if (!familyName && !givenName) {
    return undefined;
  }
  return [givenName, familyName].filter(Boolean).join(' ');
};

export const getTitleForProject = (
  divaProject: DivaProject,
): string | undefined => {
  return divaProject?.project?.titleInfo?.title?.value;
};

export const getFullTitleForProject = (
  divaProject: DivaProject,
): string | undefined => {
  return getTitleFromTitleInfo(divaProject?.project?.titleInfo);
};

export const getTitleForCourse = (
  divaCourse: DivaCourse,
  lang: 'sv' | 'en',
): string | undefined => {
  const sweTopic = divaCourse.course.authority?.find(
    (authority) => authority._lang === 'swe',
  )?.topic?.value;
  const engTopic = divaCourse.course.authority?.find(
    (authority) => authority._lang === 'eng',
  )?.topic?.value;

  if (lang === 'en') {
    return engTopic ?? sweTopic;
  }
  return sweTopic ?? engTopic;
};

export const getTitleForOrganization = (
  divaOrganisation: DivaOrganisation,
  lang: 'sv' | 'en',
): string | undefined => {
  const sweName = divaOrganisation.organisation.authority?.find(
    (authority) => authority._lang === 'swe',
  )?.name_type_corporate?.namePart?.value;
  const engName = divaOrganisation.organisation.authority?.find(
    (authority) => authority._lang === 'eng',
  )?.name_type_corporate?.namePart?.value;

  if (lang === 'en') {
    return engName ?? sweName;
  }
  return sweName ?? engName;
};

export const getTitleForJournal = (
  divaJournal: DivaJournal,
): string | undefined => {
  return divaJournal?.journal?.titleInfo?.title?.value;
};

export const getFullTitleForJournal = (
  divaJournal: DivaJournal,
): string | undefined => {
  return getTitleFromTitleInfo(divaJournal?.journal?.titleInfo);
};

export const getTitleForSubject = (
  divaSubject: DivaSubject,
  lang: 'sv' | 'en',
): string | undefined => {
  const sweTopic = divaSubject.subject.authority?.find(
    (authority) => authority._lang === 'swe',
  )?.topic?.value;
  const engTopic = divaSubject.subject.authority?.find(
    (authority) => authority._lang === 'eng',
  )?.topic?.value;

  if (lang === 'en') {
    return engTopic ?? sweTopic;
  }
  return sweTopic ?? engTopic;
};

export const getTitleForProgramme = (
  divaProgramme: DivaProgramme,
  lang: 'sv' | 'en',
): string | undefined => {
  const sweTopic = divaProgramme.programme.authority?.find(
    (authority) => authority._lang === 'swe',
  )?.topic?.value;
  const engTopic = divaProgramme.programme.authority?.find(
    (authority) => authority._lang === 'eng',
  )?.topic?.value;

  if (lang === 'en') {
    return engTopic ?? sweTopic;
  }
  return sweTopic ?? engTopic;
};

export const getTitleForSeries = (
  divaSeries: DivaSeries,
): string | undefined => {
  return divaSeries?.series?.titleInfo?.title?.value;
};

export const getTitleForLocalLabel = (
  divaLocalLabel: DivaLocalLabel,
): string | undefined => {
  return divaLocalLabel?.localLabel?.localLabel?.value;
};

export const getTitleForFunder = (
  divaFunder: DivaFunder,
  lang: 'sv' | 'en',
): string | undefined => {
  const sweName = divaFunder.funder.authority?.find(
    (authority) => authority._lang === 'swe',
  )?.name_type_corporate?.namePart?.value;
  const engName = divaFunder.funder.authority?.find(
    (authority) => authority._lang === 'eng',
  )?.name_type_corporate?.namePart?.value;

  if (lang === 'en') {
    return engName ?? sweName;
  }

  return sweName ?? engName;
};

export const getTitleForPublisher = (
  divaPublisher: DivaPublisher,
): string | undefined => {
  return divaPublisher?.publisher?.name_type_corporate?.namePart?.value;
};

export const getTitleForMember = (
  divaMember: DivaMember,
  lang: 'sv' | 'en',
): string | undefined => {
  const pageTitleEn = divaMember?.['diva-member']?.pageTitleEn?.value;
  const pageTitleSv = divaMember?.['diva-member']?.pageTitleSv?.value;

  if (lang === 'en') {
    return pageTitleEn ?? pageTitleSv;
  }
  return pageTitleSv ?? pageTitleEn;
};

export const getTitleFromTitleInfo = (
  titleInfo: TitleInfoGroup | undefined,
) => {
  if (!titleInfo) return undefined;

  return [titleInfo?.title?.value, titleInfo?.subtitle?.value]
    .filter(Boolean)
    .join(': ');
};
