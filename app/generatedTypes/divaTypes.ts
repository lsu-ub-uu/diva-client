/**
 * Auto-generated types
 * Date: 2025-05-21T09:18:52.130Z
 */

export interface DivaSeries {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    oldId: [{ value: string }] | undefined;
  };
  titleInfo: {
    title: { value: string };
    subTitle: [{ value: string }] | undefined;
  };
  titleInfo_type_alternative:
    | [{ title: { value: string }; subTitle: [{ value: string }] | undefined }]
    | undefined;
  originInfo:
    | [
        {
          dateIssued_point_start:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          dateIssued_point_end:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                },
              ]
            | undefined;
        },
      ]
    | undefined;
  identifier_displayLabel_pissn_type_issn: [{ value: string }] | undefined;
  identifier_displayLabel_eissn_type_issn: [{ value: string }] | undefined;
  related: { series: { value: string } }[] | undefined;
  location:
    | [
        {
          url: { value: string };
          displayLabel: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  note_type_external: [{ value: string }] | undefined;
  genre_type_outputType: { value: string }[] | undefined;
  organisation: [{ value: string }] | undefined;
}

export interface DivaPublisher {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    oldId: [{ value: string }] | undefined;
  };
  name_type_corporate: { namePart: { value: string } };
}

export interface DivaProject {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    oldId: [{ value: string }] | undefined;
  };
  titleInfo: {
    title: { value: string };
    subTitle: [{ value: string }] | undefined;
  };
  titleInfo_type_alternative:
    | [{ title: { value: string }; subTitle: [{ value: string }] | undefined }]
    | undefined;
  name_type_personal: {
    person: [{ value: string }] | undefined;
    namePart_type_family: [{ value: string }] | undefined;
    namePart_type_given: [{ value: string }] | undefined;
    role: [{ roleTerm: { value: string }[] }] | undefined;
    affiliation:
      | {
          organisation: [{ value: string }] | undefined;
          name_type_corporate: [{ namePart: { value: string } }] | undefined;
          identifier_type_ror: [{ value: string }] | undefined;
          country: [{ value: string }] | undefined;
          description: [{ value: string }] | undefined;
        }[]
      | undefined;
  }[];
  name_type_corporate:
    | [
        {
          organisation: [{ value: string }] | undefined;
          namePart: { value: string };
          role: { roleTerm: { value: string } };
          identifier_type_ror: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  abstract: { value: string }[] | undefined;
  subject: { topic: { value: string } }[] | undefined;
  subject_authority_diva: [{ topic: { value: string }[] }] | undefined;
  classification_authority_ssif: { value: string }[] | undefined;
  subject_authority_sdg: [{ topic: { value: string }[] }] | undefined;
  location:
    | {
        url: { value: string };
        displayLabel: [{ value: string }] | undefined;
      }[]
    | undefined;
  identifier_type_localId: [{ value: string }] | undefined;
  identifier_type_project: { value: string };
  identifier_type_raid: [{ value: string }] | undefined;
  identifier_type_reference: [{ value: string }] | undefined;
  note_type_external: [{ value: string }] | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  relatedItem_type_funder: { funder: { value: string } }[] | undefined;
  typeOfAward: { value: string };
  fundingAmount: [{ value: string }] | undefined;
  relatedItem_type_output:
    | { output: [{ value: string }] | undefined }[]
    | undefined;
  note_type_internal: [{ value: string }] | undefined;
}

export interface DivaOutput {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    visibility: { value: string };
    tsVisibility: [{ value: string }] | undefined;
    urn: [{ value: string }] | undefined;
    oldId: [{ value: string }] | undefined;
  };
  genre_type_outputType: { value: string };
  genre_type_subcategory: [{ value: string }] | undefined;
  language: {
    'languageTerm_authority_iso639-2b_type_code': { value: string };
  }[];
  note_type_publicationStatus: [{ value: string }] | undefined;
  artisticWork_type_outputType: [{ value: string }] | undefined;
  genre_type_contentType: { value: string };
  genre_type_reviewed: [{ value: string }] | undefined;
  titleInfo: {
    title: { value: string };
    subTitle: [{ value: string }] | undefined;
  };
  titleInfo_type_alternative:
    | { title: { value: string }; subTitle: [{ value: string }] | undefined }[]
    | undefined;
  name_type_personal:
    | {
        person: [{ value: string }] | undefined;
        namePart_type_family: [{ value: string }] | undefined;
        namePart_type_given: [{ value: string }] | undefined;
        role: [{ roleTerm: { value: string }[] }] | undefined;
        affiliation:
          | {
              organisation: [{ value: string }] | undefined;
              name_type_corporate:
                | [{ namePart: { value: string } }]
                | undefined;
              identifier_type_ror: [{ value: string }] | undefined;
              country: [{ value: string }] | undefined;
              description: [{ value: string }] | undefined;
            }[]
          | undefined;
      }[]
    | undefined;
  name_type_corporate:
    | {
        organisation: [{ value: string }] | undefined;
        role: [{ roleTerm: { value: string }[] }] | undefined;
        namePart: [{ value: string }] | undefined;
        identifier_type_ror: [{ value: string }] | undefined;
        description: [{ value: string }] | undefined;
      }[]
    | undefined;
  note_type_creatorCount: [{ value: string }] | undefined;
  typeOfResource: [{ value: string }] | undefined;
  type: { value: string }[] | undefined;
  material: { value: string }[] | undefined;
  technique: { value: string }[] | undefined;
  size: [{ value: string }] | undefined;
  duration:
    | [
        {
          hh: [{ value: string }] | undefined;
          mm: [{ value: string }] | undefined;
          ss: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  physicalDescription: [{ extent: { value: string } }] | undefined;
  abstract: { value: string }[] | undefined;
  subject: { topic: { value: string } }[] | undefined;
  dateOther_type_patent:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  originInfo: {
    dateIssued: {
      year: { value: string };
      month: [{ value: string }] | undefined;
      day: [{ value: string }] | undefined;
    };
    copyrightDate:
      | [
          {
            year: { value: string };
            month: [{ value: string }] | undefined;
            day: [{ value: string }] | undefined;
          },
        ]
      | undefined;
    dateOther_type_online:
      | [
          {
            year: { value: string };
            month: [{ value: string }] | undefined;
            day: [{ value: string }] | undefined;
          },
        ]
      | undefined;
    agent:
      | [
          {
            publisher: { value: string }[] | undefined;
            namePart: { value: string }[] | undefined;
            role: { roleTerm: { value: string } };
          },
        ]
      | undefined;
    place: { placeTerm: { value: string } }[] | undefined;
    edition: [{ value: string }] | undefined;
  };
  imprint: [{ value: string }] | undefined;
  extent: [{ value: string }] | undefined;
  classification_authority_ssif: { value: string }[] | undefined;
  subject_authority_diva: [{ topic: { value: string }[] }] | undefined;
  subject_authority_sdg: [{ topic: { value: string }[] }] | undefined;
  identifier_type_isbn: { value: string }[] | undefined;
  identifier_type_isrn: [{ value: string }] | undefined;
  identifier_type_ismn: { value: string }[] | undefined;
  identifier_type_patentNumber: [{ value: string }] | undefined;
  identifier_type_doi: [{ value: string }] | undefined;
  identifier_type_pmid: [{ value: string }] | undefined;
  identifier_type_wos: [{ value: string }] | undefined;
  identifier_type_scopus: [{ value: string }] | undefined;
  identifier_type_openAlex: [{ value: string }] | undefined;
  'identifier_type_se-libr': [{ value: string }] | undefined;
  identifier_type_archiveNumber: [{ value: string }] | undefined;
  identifier_type_localId: { value: string }[] | undefined;
  location:
    | {
        url: { value: string };
        displayLabel: [{ value: string }] | undefined;
      }[]
    | undefined;
  location_displayLabel_orderLink:
    | [
        {
          url: { value: string };
          displayLabel: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  note_type_external: [{ value: string }] | undefined;
  academicSemester:
    | [
        {
          year: [{ value: string }] | undefined;
          semester: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  studentDegree:
    | [
        {
          degreeLevel: { value: string };
          universityPoints: { value: string };
          course: [{ value: string }] | undefined;
          programme: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  externalCollaboration:
    | [{ namePart: { value: string }[] | undefined }]
    | undefined;
  degreeGrantingInstitution_type_corporate:
    | [
        {
          organisation: [{ value: string }] | undefined;
          namePart: [{ value: string }] | undefined;
          role: { roleTerm: { value: string } };
          identifier_type_ror: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  supervisor_type_personal:
    | {
        person: [{ value: string }] | undefined;
        namePart_type_family: [{ value: string }] | undefined;
        namePart_type_given: [{ value: string }] | undefined;
        role: [{ roleTerm: { value: string } }] | undefined;
        affiliation:
          | {
              organisation: [{ value: string }] | undefined;
              name_type_corporate:
                | [{ namePart: { value: string } }]
                | undefined;
              identifier_type_ror: [{ value: string }] | undefined;
              country: [{ value: string }] | undefined;
              description: [{ value: string }] | undefined;
            }[]
          | undefined;
      }[]
    | undefined;
  examiner_type_personal:
    | {
        person: [{ value: string }] | undefined;
        namePart_type_family: [{ value: string }] | undefined;
        namePart_type_given: [{ value: string }] | undefined;
        role: [{ roleTerm: { value: string } }] | undefined;
        affiliation:
          | {
              organisation: [{ value: string }] | undefined;
              name_type_corporate:
                | [{ namePart: { value: string } }]
                | undefined;
              identifier_type_ror: [{ value: string }] | undefined;
              country: [{ value: string }] | undefined;
              description: [{ value: string }] | undefined;
            }[]
          | undefined;
      }[]
    | undefined;
  presentation:
    | [
        {
          language:
            | [
                {
                  'languageTerm_authority_iso639-2b_type_code': {
                    value: string;
                  };
                },
              ]
            | undefined;
          dateOther_type_defence:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                  hh: [{ value: string }] | undefined;
                  mm: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          location: [{ value: string }] | undefined;
          address: [{ value: string }] | undefined;
          place: [{ placeTerm: { value: string } }] | undefined;
        },
      ]
    | undefined;
  defence:
    | [
        {
          dateOther_type_defence:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                  hh: [{ value: string }] | undefined;
                  mm: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          location: [{ value: string }] | undefined;
          address: [{ value: string }] | undefined;
          place: [{ placeTerm: { value: string } }] | undefined;
          language:
            | [
                {
                  'languageTerm_authority_iso639-2b_type_code': {
                    value: string;
                  };
                },
              ]
            | undefined;
        },
      ]
    | undefined;
  relatedItem_type_journal:
    | [
        {
          journal: [{ value: string }] | undefined;
          titleInfo:
            | [
                {
                  title: { value: string };
                  subTitle: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          identifier_displayLabel_pissn_type_issn:
            | [{ value: string }]
            | undefined;
          identifier_displayLabel_eissn_type_issn:
            | [{ value: string }]
            | undefined;
          part:
            | [
                {
                  detail_type_volume:
                    | [{ number: [{ value: string }] | undefined }]
                    | undefined;
                  detail_type_issue:
                    | [{ number: [{ value: string }] | undefined }]
                    | undefined;
                  detail_type_artNo:
                    | [{ number: [{ value: string }] | undefined }]
                    | undefined;
                  extent:
                    | [
                        {
                          start: [{ value: string }] | undefined;
                          end: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                },
              ]
            | undefined;
        },
      ]
    | undefined;
  relatedItem_type_book:
    | [
        {
          titleInfo:
            | [
                {
                  title: { value: string };
                  subTitle: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          note_type_statementOfResponsibility: [{ value: string }] | undefined;
          originInfo:
            | [
                {
                  dateIssued: {
                    year: { value: string };
                    month: [{ value: string }] | undefined;
                    day: [{ value: string }] | undefined;
                  };
                  copyrightDate:
                    | [
                        {
                          year: { value: string };
                          month: [{ value: string }] | undefined;
                          day: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                  dateOther_type_online:
                    | [
                        {
                          year: { value: string };
                          month: [{ value: string }] | undefined;
                          day: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                  agent:
                    | [
                        {
                          publisher: { value: string }[] | undefined;
                          namePart: { value: string }[] | undefined;
                          role: { roleTerm: { value: string } };
                        },
                      ]
                    | undefined;
                  place: { placeTerm: { value: string } }[] | undefined;
                  edition: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          identifier_type_isbn: { value: string }[] | undefined;
          part:
            | [
                {
                  extent:
                    | [
                        {
                          start: [{ value: string }] | undefined;
                          end: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                },
              ]
            | undefined;
          relatedItem_type_series:
            | {
                series: [{ value: string }] | undefined;
                titleInfo:
                  | [
                      {
                        title: { value: string };
                        subTitle: [{ value: string }] | undefined;
                      },
                    ]
                  | undefined;
                identifier_type_issn: [{ value: string }] | undefined;
                identifier_displayLabel_eissn_type_issn:
                  | [{ value: string }]
                  | undefined;
                partNumber: [{ value: string }] | undefined;
              }[]
            | undefined;
        },
      ]
    | undefined;
  relatedItem_type_conferencePublication:
    | [
        {
          titleInfo:
            | [
                {
                  title: { value: string };
                  subTitle: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          note_type_statementOfResponsibility: [{ value: string }] | undefined;
          originInfo:
            | [
                {
                  dateIssued: {
                    year: { value: string };
                    month: [{ value: string }] | undefined;
                    day: [{ value: string }] | undefined;
                  };
                  copyrightDate:
                    | [
                        {
                          year: { value: string };
                          month: [{ value: string }] | undefined;
                          day: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                  dateOther_type_online:
                    | [
                        {
                          year: { value: string };
                          month: [{ value: string }] | undefined;
                          day: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                  agent:
                    | [
                        {
                          publisher: { value: string }[] | undefined;
                          namePart: { value: string }[] | undefined;
                          role: { roleTerm: { value: string } };
                        },
                      ]
                    | undefined;
                  place: { placeTerm: { value: string } }[] | undefined;
                  edition: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          identifier_type_isbn: { value: string }[] | undefined;
          part:
            | [
                {
                  extent:
                    | [
                        {
                          start: [{ value: string }] | undefined;
                          end: [{ value: string }] | undefined;
                        },
                      ]
                    | undefined;
                },
              ]
            | undefined;
          relatedItem_type_series:
            | {
                series: [{ value: string }] | undefined;
                titleInfo:
                  | [
                      {
                        title: { value: string };
                        subTitle: [{ value: string }] | undefined;
                      },
                    ]
                  | undefined;
                identifier_type_issn: [{ value: string }] | undefined;
                identifier_displayLabel_eissn_type_issn:
                  | [{ value: string }]
                  | undefined;
                partNumber: [{ value: string }] | undefined;
              }[]
            | undefined;
        },
      ]
    | undefined;
  relatedItem_type_conference:
    | [{ conference: [{ value: string }] | undefined }]
    | undefined;
  relatedItem_type_series:
    | {
        series: [{ value: string }] | undefined;
        titleInfo:
          | [
              {
                title: { value: string };
                subTitle: [{ value: string }] | undefined;
              },
            ]
          | undefined;
        identifier_type_issn: [{ value: string }] | undefined;
        identifier_displayLabel_eissn_type_issn:
          | [{ value: string }]
          | undefined;
        partNumber: [{ value: string }] | undefined;
      }[]
    | undefined;
  relatedItem_type_researchData:
    | {
        titleInfo: {
          title: { value: string };
          subTitle: [{ value: string }] | undefined;
        };
        identifier_type_doi: [{ value: string }] | undefined;
        location:
          | {
              url: { value: string };
              displayLabel: [{ value: string }] | undefined;
            }[]
          | undefined;
      }[]
    | undefined;
  relatedItem_type_project:
    | {
        project: [{ value: string }] | undefined;
        titleInfo:
          | [
              {
                title: { value: string };
                subTitle: [{ value: string }] | undefined;
              },
            ]
          | undefined;
      }[]
    | undefined;
  relatedItem_type_funder:
    | {
        funder: { value: string };
        identifier_type_project: [{ value: string }] | undefined;
      }[]
    | undefined;
  relatedItem_type_initiative:
    | [{ initiative: { value: string }[] | undefined }]
    | undefined;
  related: { output: [{ value: string }] | undefined }[] | undefined;
  'accessCondition_authority_kb-se': [{ value: string }] | undefined;
  localGenericMarkup: { value: string }[] | undefined;
  admin: {
    note_type_internal: [{ value: string }] | undefined;
    reviewed: { value: string };
  };
  attachment:
    | {
        attachmentFile: { value: string };
        type: { value: string };
        note_type_userMessage: [{ value: string }] | undefined;
      }[]
    | undefined;
}

export interface DivaJournal {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: [{ value: string }] | undefined;
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    oldId: [{ value: string }] | undefined;
  };
  titleInfo: {
    title: { value: string };
    subTitle: [{ value: string }] | undefined;
  };
  originInfo:
    | [
        {
          dateIssued_point_start:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          dateIssued_point_end:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                },
              ]
            | undefined;
        },
      ]
    | undefined;
  identifier_displayLabel_pissn_type_issn: [{ value: string }] | undefined;
  identifier_displayLabel_eissn_type_issn: [{ value: string }] | undefined;
  location:
    | [
        {
          url: { value: string };
          displayLabel: [{ value: string }] | undefined;
        },
      ]
    | undefined;
}

export interface DivaTopOrganisation {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    oldId: [{ value: string }] | undefined;
  };
  authority_lang_swe: { name_type_corporate: { namePart: { value: string } } };
  variant_lang_eng:
    | [{ name_type_corporate: { namePart: { value: string } } }]
    | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  address:
    | [
        {
          postOfficeBox: [{ value: string }] | undefined;
          street: [{ value: string }] | undefined;
          postcode: [{ value: string }] | undefined;
          place: [{ value: string }] | undefined;
          country: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  identifier_type_organisationCode: [{ value: string }] | undefined;
  identifier_type_organisationNumber: [{ value: string }] | undefined;
  identifier_type_ror: [{ value: string }] | undefined;
  location:
    | [
        {
          url: { value: string };
          displayLabel: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  note_type_internal: [{ value: string }] | undefined;
  related_type_earlier:
    | [{ organisation: [{ value: string }] | undefined }]
    | undefined;
}

export interface DivaCourse {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    oldId: [{ value: string }] | undefined;
  };
  authority_lang_swe: { topic: { value: string } };
  variant_lang_eng: [{ topic: { value: string } }] | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  identifier_type_localId: [{ value: string }] | undefined;
  related: { course: [{ value: string }] | undefined }[] | undefined;
}

export interface DivaProgramme {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    oldId: [{ value: string }] | undefined;
  };
  authority_lang_swe: { topic: { value: string } };
  variant_lang_eng: [{ topic: { value: string } }] | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  identifier_type_localId: [{ value: string }] | undefined;
  related: { programme: [{ value: string }] | undefined }[] | undefined;
}

export interface DivaPartOfOrganisation {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    oldId: [{ value: string }] | undefined;
  };
  authority_lang_swe: { name_type_corporate: { namePart: { value: string } } };
  variant_lang_eng:
    | [{ name_type_corporate: { namePart: { value: string } } }]
    | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  address:
    | [
        {
          postOfficeBox: [{ value: string }] | undefined;
          street: [{ value: string }] | undefined;
          postcode: [{ value: string }] | undefined;
          place: [{ value: string }] | undefined;
          country: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  identifier_type_organisationCode: [{ value: string }] | undefined;
  identifier_type_organisationNumber: [{ value: string }] | undefined;
  location:
    | [
        {
          url: { value: string };
          displayLabel: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  note_type_internal: [{ value: string }] | undefined;
  related_type_parent: [{ organisation: { value: string } }] | undefined;
  related_type_earlier:
    | { organisation: [{ value: string }] | undefined }[]
    | undefined;
}

export interface DivaSubject {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
    oldId: [{ value: string }] | undefined;
  };
  authority_lang_swe: { topic: { value: string } };
  variant_lang_eng: [{ topic: { value: string } }] | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  identifier_type_localId: [{ value: string }] | undefined;
  related: { topic: { value: string } }[] | undefined;
}

export interface DivaLocalGenericMarkup {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    permissionUnit: { value: string };
  };
  localGenericMarkup: { value: string };
  description: [{ value: string }] | undefined;
}

export interface DivaFunder {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    oldId: [{ value: string }] | undefined;
  };
  authority_lang_swe: { name_type_corporate: { namePart: { value: string } } };
  variant_lang_eng:
    | [{ name_type_corporate: { namePart: { value: string } } }]
    | undefined;
  startDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  endDate:
    | [
        {
          year: { value: string };
          month: [{ value: string }] | undefined;
          day: [{ value: string }] | undefined;
        },
      ]
    | undefined;
  identifier_type_organisationNumber: [{ value: string }] | undefined;
  identifier_type_doi: [{ value: string }] | undefined;
  identifier_type_ror: [{ value: string }] | undefined;
}

export interface DivaPerson {
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    oldId: [{ value: string }] | undefined;
  };
  authority: {
    name_type_personal: {
      namePart_type_family: [{ value: string }] | undefined;
      namePart_type_given: [{ value: string }] | undefined;
      namePart_type_termsOfAddress: [{ value: string }] | undefined;
    };
  };
  variant:
    | [
        {
          name_type_personal: {
            namePart_type_family: [{ value: string }] | undefined;
            namePart_type_given: [{ value: string }] | undefined;
          }[];
        },
      ]
    | undefined;
  personInfo:
    | [
        {
          birthDate:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                },
              ]
            | undefined;
          deathDate:
            | [
                {
                  year: { value: string };
                  month: [{ value: string }] | undefined;
                  day: [{ value: string }] | undefined;
                },
              ]
            | undefined;
        },
      ]
    | undefined;
  email: { value: string }[] | undefined;
  note_type_biographical: { value: string }[] | undefined;
  location:
    | {
        url: { value: string };
        displayLabel: [{ value: string }] | undefined;
      }[]
    | undefined;
  identifier_type_orcid: { value: string }[] | undefined;
  identifier_type_localId: { value: string }[] | undefined;
  'identifier_type_se-libr': { value: string }[] | undefined;
  identifier_type_openAlex: [{ value: string }] | undefined;
  identifier_type_scopus: [{ value: string }] | undefined;
  identifier_type_viaf: { value: string }[] | undefined;
  affiliation:
    | {
        organisation: [{ value: string }] | undefined;
        name_type_corporate: [{ namePart: { value: string } }] | undefined;
        identifier_type_ror: [{ value: string }] | undefined;
        country: [{ value: string }] | undefined;
        description: [{ value: string }] | undefined;
        startDate:
          | [
              {
                year: { value: string };
                month: [{ value: string }] | undefined;
                day: [{ value: string }] | undefined;
              },
            ]
          | undefined;
        endDate:
          | [
              {
                year: { value: string };
                month: [{ value: string }] | undefined;
                day: [{ value: string }] | undefined;
              },
            ]
          | undefined;
      }[]
    | undefined;
}

export interface DivaTheme {
  memberPermissionUnit: [{ value: string }] | undefined;
  recordInfo: {
    id: { value: string };
    type: { value: string };
    validationType: { value: string };
    dataDivider: { value: string };
    createdBy: { value: string };
    permissionUnit: { value: string }[] | undefined;
    tsCreated: { value: string };
    updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
  };
  backgroundColor: { value: string };
  textColor: { value: string };
  logo: [{ value: string }] | undefined;
  logoSvg: [{ value: string }] | undefined;
  linkAdmin: {
    linkSv: { url: { value: string }; displayLabel: { value: string } };
    linkEn: { url: { value: string }; displayLabel: { value: string } };
  }[];
  linkPublic: {
    linkSv: { url: { value: string }; displayLabel: { value: string } };
    linkEn: { url: { value: string }; displayLabel: { value: string } };
  }[];
  pageTitleSv: { value: string };
  pageTitleEn: { value: string };
  hostname: { value: string }[];
}
