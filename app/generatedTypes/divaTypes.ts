/**
 * Auto-generated types
 * Date: 2025-05-21T08:55:06.974Z
 */

export interface DivaSeries {
  series: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      oldId: { value: string };
    };
    titleInfo: { title: { value: string }; subTitle: { value: string } };
    titleInfo_type_alternative: {
      title: { value: string };
      subTitle: { value: string };
    };
    originInfo: {
      dateIssued_point_start: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      dateIssued_point_end: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
    };
    identifier_displayLabel_pissn_type_issn: { value: string };
    identifier_displayLabel_eissn_type_issn: { value: string };
    related: { series: { value: string } };
    location: { url: { value: string }; displayLabel: { value: string } };
    note_type_external: { value: string };
    genre_type_outputType: { value: string };
    organisation: { value: string };
  };
}

export interface DivaPublisher {
  publisher: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      oldId: { value: string };
    };
    name_type_corporate: { namePart: { value: string } };
  };
}

export interface DivaProject {
  project: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      oldId: { value: string };
    };
    titleInfo: { title: { value: string }; subTitle: { value: string } };
    titleInfo_type_alternative: {
      title: { value: string };
      subTitle: { value: string };
    };
    name_type_personal: {
      person: { value: string };
      namePart_type_family: { value: string };
      namePart_type_given: { value: string };
      role: { roleTerm: { value: string } };
      affiliation: {
        organisation: { value: string };
        name_type_corporate: { namePart: { value: string } };
        identifier_type_ror: { value: string };
        country: { value: string };
        description: { value: string };
      };
    };
    name_type_corporate: {
      organisation: { value: string };
      namePart: { value: string };
      role: { roleTerm: { value: string } };
      identifier_type_ror: { value: string };
    };
    abstract: { value: string };
    subject: { topic: { value: string } };
    subject_authority_diva: { topic: { value: string } };
    classification_authority_ssif: { value: string };
    subject_authority_sdg: { topic: { value: string } };
    location: { url: { value: string }; displayLabel: { value: string } };
    identifier_type_localId: { value: string };
    identifier_type_project: { value: string };
    identifier_type_raid: { value: string };
    identifier_type_reference: { value: string };
    note_type_external: { value: string };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    relatedItem_type_funder: { funder: { value: string } };
    typeOfAward: { value: string };
    fundingAmount: { value: string };
    relatedItem_type_output: { output: { value: string } };
    note_type_internal: { value: string };
  };
}

export interface DivaOutput {
  output: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      visibility: { value: string };
      tsVisibility: { value: string };
      urn: { value: string };
      oldId: { value: string };
    };
    genre_type_outputType: { value: string };
    genre_type_subcategory: { value: string };
    language: {
      'languageTerm_authority_iso639-2b_type_code': { value: string };
    };
    note_type_publicationStatus: { value: string };
    artisticWork_type_outputType: { value: string };
    genre_type_contentType: { value: string };
    genre_type_reviewed: { value: string };
    titleInfo: { title: { value: string }; subTitle: { value: string } };
    titleInfo_type_alternative: {
      title: { value: string };
      subTitle: { value: string };
    };
    name_type_personal: {
      person: { value: string };
      namePart_type_family: { value: string };
      namePart_type_given: { value: string };
      role: { roleTerm: { value: string } };
      affiliation: {
        organisation: { value: string };
        name_type_corporate: { namePart: { value: string } };
        identifier_type_ror: { value: string };
        country: { value: string };
        description: { value: string };
      };
    };
    name_type_corporate: {
      organisation: { value: string };
      role: { roleTerm: { value: string } };
      namePart: { value: string };
      identifier_type_ror: { value: string };
      description: { value: string };
    };
    note_type_creatorCount: { value: string };
    typeOfResource: { value: string };
    type: { value: string };
    material: { value: string };
    technique: { value: string };
    size: { value: string };
    duration: {
      hh: { value: string };
      mm: { value: string };
      ss: { value: string };
    };
    physicalDescription: { extent: { value: string } };
    abstract: { value: string };
    subject: { topic: { value: string } };
    dateOther_type_patent: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    originInfo: {
      dateIssued: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      copyrightDate: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      dateOther_type_online: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      agent: {
        publisher: { value: string };
        namePart: { value: string };
        role: { roleTerm: { value: string } };
      };
      place: { placeTerm: { value: string } };
      edition: { value: string };
    };
    imprint: { value: string };
    extent: { value: string };
    classification_authority_ssif: { value: string };
    subject_authority_diva: { topic: { value: string } };
    subject_authority_sdg: { topic: { value: string } };
    identifier_type_isbn: { value: string };
    identifier_type_isrn: { value: string };
    identifier_type_ismn: { value: string };
    identifier_type_patentNumber: { value: string };
    identifier_type_doi: { value: string };
    identifier_type_pmid: { value: string };
    identifier_type_wos: { value: string };
    identifier_type_scopus: { value: string };
    identifier_type_openAlex: { value: string };
    'identifier_type_se-libr': { value: string };
    identifier_type_archiveNumber: { value: string };
    identifier_type_localId: { value: string };
    location: { url: { value: string }; displayLabel: { value: string } };
    location_displayLabel_orderLink: {
      url: { value: string };
      displayLabel: { value: string };
    };
    note_type_external: { value: string };
    academicSemester: { year: { value: string }; semester: { value: string } };
    studentDegree: {
      degreeLevel: { value: string };
      universityPoints: { value: string };
      course: { value: string };
      programme: { value: string };
    };
    externalCollaboration: { namePart: { value: string } };
    degreeGrantingInstitution_type_corporate: {
      organisation: { value: string };
      namePart: { value: string };
      role: { roleTerm: { value: string } };
      identifier_type_ror: { value: string };
    };
    supervisor_type_personal: {
      person: { value: string };
      namePart_type_family: { value: string };
      namePart_type_given: { value: string };
      role: { roleTerm: { value: string } };
      affiliation: {
        organisation: { value: string };
        name_type_corporate: { namePart: { value: string } };
        identifier_type_ror: { value: string };
        country: { value: string };
        description: { value: string };
      };
    };
    examiner_type_personal: {
      person: { value: string };
      namePart_type_family: { value: string };
      namePart_type_given: { value: string };
      role: { roleTerm: { value: string } };
      affiliation: {
        organisation: { value: string };
        name_type_corporate: { namePart: { value: string } };
        identifier_type_ror: { value: string };
        country: { value: string };
        description: { value: string };
      };
    };
    presentation: {
      language: {
        'languageTerm_authority_iso639-2b_type_code': { value: string };
      };
      dateOther_type_defence: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
        hh: { value: string };
        mm: { value: string };
      };
      location: { value: string };
      address: { value: string };
      place: { placeTerm: { value: string } };
    };
    defence: {
      dateOther_type_defence: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
        hh: { value: string };
        mm: { value: string };
      };
      location: { value: string };
      address: { value: string };
      place: { placeTerm: { value: string } };
      language: {
        'languageTerm_authority_iso639-2b_type_code': { value: string };
      };
    };
    relatedItem_type_journal: {
      journal: { value: string };
      titleInfo: { title: { value: string }; subTitle: { value: string } };
      identifier_displayLabel_pissn_type_issn: { value: string };
      identifier_displayLabel_eissn_type_issn: { value: string };
      part: {
        detail_type_volume: { number: { value: string } };
        detail_type_issue: { number: { value: string } };
        detail_type_artNo: { number: { value: string } };
        extent: { start: { value: string }; end: { value: string } };
      };
    };
    relatedItem_type_book: {
      titleInfo: { title: { value: string }; subTitle: { value: string } };
      note_type_statementOfResponsibility: { value: string };
      originInfo: {
        dateIssued: {
          year: { value: string };
          month: { value: string };
          day: { value: string };
        };
        copyrightDate: {
          year: { value: string };
          month: { value: string };
          day: { value: string };
        };
        dateOther_type_online: {
          year: { value: string };
          month: { value: string };
          day: { value: string };
        };
        agent: {
          publisher: { value: string };
          namePart: { value: string };
          role: { roleTerm: { value: string } };
        };
        place: { placeTerm: { value: string } };
        edition: { value: string };
      };
      identifier_type_isbn: { value: string };
      part: { extent: { start: { value: string }; end: { value: string } } };
      relatedItem_type_series: {
        series: { value: string };
        titleInfo: { title: { value: string }; subTitle: { value: string } };
        identifier_type_issn: { value: string };
        identifier_displayLabel_eissn_type_issn: { value: string };
        partNumber: { value: string };
      };
    };
    relatedItem_type_conferencePublication: {
      titleInfo: { title: { value: string }; subTitle: { value: string } };
      note_type_statementOfResponsibility: { value: string };
      originInfo: {
        dateIssued: {
          year: { value: string };
          month: { value: string };
          day: { value: string };
        };
        copyrightDate: {
          year: { value: string };
          month: { value: string };
          day: { value: string };
        };
        dateOther_type_online: {
          year: { value: string };
          month: { value: string };
          day: { value: string };
        };
        agent: {
          publisher: { value: string };
          namePart: { value: string };
          role: { roleTerm: { value: string } };
        };
        place: { placeTerm: { value: string } };
        edition: { value: string };
      };
      identifier_type_isbn: { value: string };
      part: { extent: { start: { value: string }; end: { value: string } } };
      relatedItem_type_series: {
        series: { value: string };
        titleInfo: { title: { value: string }; subTitle: { value: string } };
        identifier_type_issn: { value: string };
        identifier_displayLabel_eissn_type_issn: { value: string };
        partNumber: { value: string };
      };
    };
    relatedItem_type_conference: { conference: { value: string } };
    relatedItem_type_series: {
      series: { value: string };
      titleInfo: { title: { value: string }; subTitle: { value: string } };
      identifier_type_issn: { value: string };
      identifier_displayLabel_eissn_type_issn: { value: string };
      partNumber: { value: string };
    };
    relatedItem_type_researchData: {
      titleInfo: { title: { value: string }; subTitle: { value: string } };
      identifier_type_doi: { value: string };
      location: { url: { value: string }; displayLabel: { value: string } };
    };
    relatedItem_type_project: {
      project: { value: string };
      titleInfo: { title: { value: string }; subTitle: { value: string } };
    };
    relatedItem_type_funder: {
      funder: { value: string };
      identifier_type_project: { value: string };
    };
    relatedItem_type_initiative: { initiative: { value: string } };
    related: { output: { value: string } };
    'accessCondition_authority_kb-se': { value: string };
    localGenericMarkup: { value: string };
    admin: {
      note_type_internal: { value: string };
      reviewed: { value: string };
    };
    attachment: {
      attachmentFile: { value: string };
      type: { value: string };
      note_type_userMessage: { value: string };
    };
  };
}

export interface DivaJournal {
  journal: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      oldId: { value: string };
    };
    titleInfo: { title: { value: string }; subTitle: { value: string } };
    originInfo: {
      dateIssued_point_start: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      dateIssued_point_end: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
    };
    identifier_displayLabel_pissn_type_issn: { value: string };
    identifier_displayLabel_eissn_type_issn: { value: string };
    location: { url: { value: string }; displayLabel: { value: string } };
  };
}

export interface DivaTopOrganisation {
  organisation: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      oldId: { value: string };
    };
    authority_lang_swe: {
      name_type_corporate: { namePart: { value: string } };
    };
    variant_lang_eng: { name_type_corporate: { namePart: { value: string } } };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    address: {
      postOfficeBox: { value: string };
      street: { value: string };
      postcode: { value: string };
      place: { value: string };
      country: { value: string };
    };
    identifier_type_organisationCode: { value: string };
    identifier_type_organisationNumber: { value: string };
    identifier_type_ror: { value: string };
    location: { url: { value: string }; displayLabel: { value: string } };
    note_type_internal: { value: string };
    related_type_earlier: { organisation: { value: string } };
  };
}

export interface DivaCourse {
  course: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      oldId: { value: string };
    };
    authority_lang_swe: { topic: { value: string } };
    variant_lang_eng: { topic: { value: string } };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    identifier_type_localId: { value: string };
    related: { course: { value: string } };
  };
}

export interface DivaProgramme {
  programme: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      oldId: { value: string };
    };
    authority_lang_swe: { topic: { value: string } };
    variant_lang_eng: { topic: { value: string } };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    identifier_type_localId: { value: string };
    related: { programme: { value: string } };
  };
}

export interface DivaPartOfOrganisation {
  organisation: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      oldId: { value: string };
    };
    authority_lang_swe: {
      name_type_corporate: { namePart: { value: string } };
    };
    variant_lang_eng: { name_type_corporate: { namePart: { value: string } } };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    address: {
      postOfficeBox: { value: string };
      street: { value: string };
      postcode: { value: string };
      place: { value: string };
      country: { value: string };
    };
    identifier_type_organisationCode: { value: string };
    identifier_type_organisationNumber: { value: string };
    location: { url: { value: string }; displayLabel: { value: string } };
    note_type_internal: { value: string };
    related_type_parent: { organisation: { value: string } };
    related_type_earlier: { organisation: { value: string } };
  };
}

export interface DivaSubject {
  subject: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
      oldId: { value: string };
    };
    authority_lang_swe: { topic: { value: string } };
    variant_lang_eng: { topic: { value: string } };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    identifier_type_localId: { value: string };
    related: { topic: { value: string } };
  };
}

export interface DivaLocalGenericMarkup {
  localGenericMarkup: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      permissionUnit: { value: string };
    };
    localGenericMarkup: { value: string };
    description: { value: string };
  };
}

export interface DivaFunder {
  funder: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      oldId: { value: string };
    };
    authority_lang_swe: {
      name_type_corporate: { namePart: { value: string } };
    };
    variant_lang_eng: { name_type_corporate: { namePart: { value: string } } };
    startDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    endDate: {
      year: { value: string };
      month: { value: string };
      day: { value: string };
    };
    identifier_type_organisationNumber: { value: string };
    identifier_type_doi: { value: string };
    identifier_type_ror: { value: string };
  };
}

export interface DivaPerson {
  person: {
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
      oldId: { value: string };
    };
    authority: {
      name_type_personal: {
        namePart_type_family: { value: string };
        namePart_type_given: { value: string };
        namePart_type_termsOfAddress: { value: string };
      };
    };
    variant: {
      name_type_personal: {
        namePart_type_family: { value: string };
        namePart_type_given: { value: string };
      };
    };
    personInfo: {
      birthDate: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      deathDate: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
    };
    email: { value: string };
    note_type_biographical: { value: string };
    location: { url: { value: string }; displayLabel: { value: string } };
    identifier_type_orcid: { value: string };
    identifier_type_localId: { value: string };
    'identifier_type_se-libr': { value: string };
    identifier_type_openAlex: { value: string };
    identifier_type_scopus: { value: string };
    identifier_type_viaf: { value: string };
    affiliation: {
      organisation: { value: string };
      name_type_corporate: { namePart: { value: string } };
      identifier_type_ror: { value: string };
      country: { value: string };
      description: { value: string };
      startDate: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
      endDate: {
        year: { value: string };
        month: { value: string };
        day: { value: string };
      };
    };
  };
}

export interface DivaTheme {
  'diva-theme': {
    memberPermissionUnit: { value: string };
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      permissionUnit: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } };
    };
    backgroundColor: { value: string };
    textColor: { value: string };
    logo: { value: string };
    logoSvg: { value: string };
    linkAdmin: {
      linkSv: { url: { value: string }; displayLabel: { value: string } };
      linkEn: { url: { value: string }; displayLabel: { value: string } };
    };
    linkPublic: {
      linkSv: { url: { value: string }; displayLabel: { value: string } };
      linkEn: { url: { value: string }; displayLabel: { value: string } };
    };
    pageTitleSv: { value: string };
    pageTitleEn: { value: string };
    hostname: { value: string };
  };
}
