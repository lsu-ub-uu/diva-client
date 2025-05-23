/**
 * Auto-generated types
 * Date: 2025-05-23T09:59:51.362Z
 */

import type { BFFDataRecordData } from '@/types/record';

export interface DivaSeries extends BFFDataRecordData {
  series: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-series' };
      validationType: { value: 'diva-series' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      oldId?: { value: string };
    };
    titleInfo: { title: { value: string }; subTitle?: { value: string } };
    titleInfo_type_alternative?: {
      title: { value: string };
      subTitle?: { value: string };
      _type: 'alternative';
    };
    originInfo?: {
      dateIssued_point_start?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        _point: 'start';
      };
      dateIssued_point_end?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        _point: 'end';
      };
    };
    identifier_displayLabel_pissn_type_issn?: {
      value: string;
      _type: 'issn';
      _displayLabel: 'pissn';
    };
    identifier_displayLabel_eissn_type_issn?: {
      value: string;
      _type: 'issn';
      _displayLabel: 'eissn';
    };
    related?: {
      series: { value: string };
      _type: RelatedSeriesTypeCollection;
    }[];
    location?: { url: { value: string }; displayLabel?: { value: string } };
    note_type_external?: { value: string; _type: 'external' };
    genre_type_outputType?: {
      value: OutputTypeCollection;
      _type: 'outputType';
    }[];
    organisation?: { value: string };
  };
}

export interface DivaPublisher extends BFFDataRecordData {
  publisher: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-publisher' };
      validationType: { value: 'diva-publisher' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      oldId?: { value: string };
    };
    name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
  };
}

export interface DivaProject extends BFFDataRecordData {
  project: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-project' };
      validationType: { value: 'diva-project' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      oldId?: { value: string };
    };
    titleInfo: {
      title: { value: string };
      subTitle?: { value: string };
      _lang: LanguageSweEngCollection;
    };
    titleInfo_type_alternative?: {
      title: { value: string };
      subTitle?: { value: string };
      _type: 'alternative';
      _lang: LanguageSweEngCollection;
    };
    name_type_personal: {
      person?: { value: string };
      namePart_type_family?: { value: string; _type: 'family' };
      namePart_type_given?: { value: string; _type: 'given' };
      role?: { roleTerm: { value: RoleProjectPersonalCollection }[] };
      affiliation?: {
        organisation?: { value: string };
        name_type_corporate?: {
          namePart: { value: string };
          _type: 'corporate';
        };
        identifier_type_ror?: { value: string; _type: 'ror' };
        country?: { value: CountryCollection };
        description?: { value: string };
      }[];
      _type: 'personal';
    }[];
    name_type_corporate?: {
      organisation?: { value: string };
      namePart: { value: string };
      role: { roleTerm: { value: 'pdr' } };
      identifier_type_ror?: { value: string; _type: 'ror' };
      _type: 'corporate';
    };
    abstract?: { value: string; _lang: LanguageCollection }[];
    subject?: { topic: { value: string }; _lang: LanguageCollection }[];
    subject_authority_diva?: { topic: { value: string }[]; _authority: 'diva' };
    classification_authority_ssif?: {
      value: SsifCollection;
      _authority: 'ssif';
    }[];
    subject_authority_sdg?: {
      topic: { value: SdgCollection }[];
      _authority: 'sdg';
    };
    location?: { url: { value: string }; displayLabel?: { value: string } }[];
    identifier_type_localId?: { value: string; _type: 'localId' };
    identifier_type_project: { value: string; _type: 'project' };
    identifier_type_raid?: { value: string; _type: 'raid' };
    identifier_type_reference?: { value: string; _type: 'reference' };
    note_type_external?: { value: string; _type: 'external' };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    relatedItem_type_funder?: { funder: { value: string }; _type: 'funder' }[];
    typeOfAward: { value: TypeOfAwardCollection };
    fundingAmount?: { value: string; _currency: CurrencyCollection };
    relatedItem_type_output?: { output?: { value: string }; _type: 'output' }[];
    note_type_internal?: { value: string; _type: 'internal' };
  };
}

export interface DivaOutput extends BFFDataRecordData {
  output: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-output' };
      validationType: { value: 'diva-output' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      visibility: { value: VisibilityCollection };
      tsVisibility?: { value: string };
      urn?: { value: string };
      oldId?: { value: string };
    };
    genre_type_outputType: { value: OutputTypeCollection; _type: 'outputType' };
    genre_type_subcategory?: {
      value: SubcategoryOtherCollection;
      _type: 'subcategory';
    };
    language: {
      'languageTerm_authority_iso639-2b_type_code': {
        value: LanguageCollection;
        _type: 'code';
        _authority: 'iso639-2b';
      };
    }[];
    note_type_publicationStatus?: {
      value: PublicationStatusCollection;
      _type: 'publicationStatus';
    };
    artisticWork_type_outputType?: {
      value: OutputTypeArtisticWorkCollection;
      _type: 'outputType';
    };
    genre_type_contentType: {
      value: GenreContentTypeCollection;
      _type: 'contentType';
    };
    genre_type_reviewed?: {
      value: GenreArtisticReviewedCollection;
      _type: 'reviewed';
    };
    titleInfo: {
      title: { value: string };
      subTitle?: { value: string };
      _lang: LanguageCollection;
    };
    titleInfo_type_alternative?: {
      title: { value: string };
      subTitle?: { value: string };
      _type: 'alternative';
      _lang: LanguageCollection;
    }[];
    name_type_personal?: {
      person?: { value: string };
      namePart_type_family?: { value: string; _type: 'family' };
      namePart_type_given?: { value: string; _type: 'given' };
      role?: { roleTerm: { value: RoleCollection }[] };
      affiliation?: {
        organisation?: { value: string };
        name_type_corporate?: {
          namePart: { value: string };
          _type: 'corporate';
        };
        identifier_type_ror?: { value: string; _type: 'ror' };
        country?: { value: CountryCollection };
        description?: { value: string };
      }[];
      _type: 'personal';
    }[];
    name_type_corporate?: {
      organisation?: { value: string };
      role?: { roleTerm: { value: RoleCollection }[] };
      namePart?: { value: string };
      identifier_type_ror?: { value: string; _type: 'ror' };
      description?: { value: string };
      _type: 'corporate';
    }[];
    note_type_creatorCount?: { value: string; _type: 'creatorCount' };
    typeOfResource?: { value: TypeOfResourceCollection };
    type?: { value: string; _lang: LanguageCollection }[];
    material?: { value: string; _lang: LanguageCollection }[];
    technique?: { value: string; _lang: LanguageCollection }[];
    size?: { value: string };
    duration?: {
      hh?: { value: string };
      mm?: { value: string };
      ss?: { value: string };
    };
    physicalDescription?: { extent: { value: string } };
    abstract?: { value: string; _lang: LanguageCollection }[];
    subject?: { topic: { value: string }; _lang: LanguageCollection }[];
    dateOther_type_patent?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
      _type: 'patent';
    };
    originInfo: {
      dateIssued: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
      };
      copyrightDate?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
      };
      dateOther_type_online?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        _type: 'online';
      };
      agent?: {
        publisher?: { value: string }[];
        namePart?: { value: string }[];
        role: { roleTerm: { value: 'pbl' } };
      };
      place?: { placeTerm: { value: string } }[];
      edition?: { value: string };
    };
    imprint?: { value: string };
    extent?: { value: string };
    classification_authority_ssif?: {
      value: SsifCollection;
      _authority: 'ssif';
    }[];
    subject_authority_diva?: { topic: { value: string }[]; _authority: 'diva' };
    subject_authority_sdg?: {
      topic: { value: SdgCollection }[];
      _authority: 'sdg';
    };
    identifier_type_isbn?: {
      value: string;
      _type: 'isbn';
      _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
    }[];
    identifier_type_isrn?: { value: string; _type: 'isrn' };
    identifier_type_ismn?: {
      value: string;
      _type: 'ismn';
      _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
    }[];
    identifier_type_patentNumber?: { value: string; _type: 'patentNumber' };
    identifier_type_doi?: { value: string; _type: 'doi' };
    identifier_type_pmid?: { value: string; _type: 'pmid' };
    identifier_type_wos?: { value: string; _type: 'wos' };
    identifier_type_scopus?: { value: string; _type: 'scopus' };
    identifier_type_openAlex?: { value: string; _type: 'openAlex' };
    'identifier_type_se-libr'?: { value: string; _type: 'se-libr' };
    identifier_type_archiveNumber?: { value: string; _type: 'archiveNumber' };
    identifier_type_localId?: { value: string; _type: 'localId' }[];
    location?: { url: { value: string }; displayLabel?: { value: string } }[];
    location_displayLabel_orderLink?: {
      url: { value: string };
      displayLabel?: { value: string };
      _displayLabel: 'orderLink';
    };
    note_type_external?: { value: string; _type: 'external' };
    academicSemester?: {
      year?: { value: string };
      semester?: { value: SemesterCollection };
    };
    studentDegree?: {
      degreeLevel: { value: DegreeLevelCollection };
      universityPoints: { value: UniversityPointsCollection };
      course?: { value: string };
      programme?: { value: string };
    };
    externalCollaboration?: { namePart?: { value: string }[] };
    degreeGrantingInstitution_type_corporate?: {
      organisation?: { value: string };
      namePart?: { value: string };
      role: { roleTerm: { value: 'dgg' } };
      identifier_type_ror?: { value: string; _type: 'ror' };
      _type: 'corporate';
    };
    supervisor_type_personal?: {
      person?: { value: string };
      namePart_type_family?: { value: string; _type: 'family' };
      namePart_type_given?: { value: string; _type: 'given' };
      role?: { roleTerm: { value: 'ths' } };
      affiliation?: {
        organisation?: { value: string };
        name_type_corporate?: {
          namePart: { value: string };
          _type: 'corporate';
        };
        identifier_type_ror?: { value: string; _type: 'ror' };
        country?: { value: CountryCollection };
        description?: { value: string };
      }[];
      _type: 'personal';
    }[];
    examiner_type_personal?: {
      person?: { value: string };
      namePart_type_family?: { value: string; _type: 'family' };
      namePart_type_given?: { value: string; _type: 'given' };
      role?: { roleTerm: { value: 'dgs' } };
      affiliation?: {
        organisation?: { value: string };
        name_type_corporate?: {
          namePart: { value: string };
          _type: 'corporate';
        };
        identifier_type_ror?: { value: string; _type: 'ror' };
        country?: { value: CountryCollection };
        description?: { value: string };
      }[];
      _type: 'personal';
    }[];
    opponent_type_personal?: {
      person?: { value: string };
      namePart_type_family?: { value: string; _type: 'family' };
      namePart_type_given?: { value: string; _type: 'given' };
      role?: { roleTerm: { value: 'opn' } };
      affiliation?: {
        organisation?: { value: string };
        name_type_corporate?: {
          namePart: { value: string };
          _type: 'corporate';
        };
        identifier_type_ror?: { value: string; _type: 'ror' };
        country?: { value: CountryCollection };
        description?: { value: string };
      }[];
      _type: 'personal';
    }[];
    presentation?: {
      language?: {
        'languageTerm_authority_iso639-2b_type_code': {
          value: LanguageCollection;
          _type: 'code';
          _authority: 'iso639-2b';
        };
      };
      dateOther_type_defence?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        hh?: { value: string };
        mm?: { value: string };
        _type: 'defence';
      };
      location?: { value: string };
      address?: { value: string };
      place?: { placeTerm: { value: string } };
    };
    defence?: {
      dateOther_type_defence?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        hh?: { value: string };
        mm?: { value: string };
        _type: 'defence';
      };
      location?: { value: string };
      address?: { value: string };
      place?: { placeTerm: { value: string } };
      language?: {
        'languageTerm_authority_iso639-2b_type_code': {
          value: LanguageCollection;
          _type: 'code';
          _authority: 'iso639-2b';
        };
      };
    };
    relatedItem_type_journal?: {
      journal?: { value: string };
      titleInfo?: { title: { value: string }; subTitle?: { value: string } };
      identifier_displayLabel_pissn_type_issn?: {
        value: string;
        _type: 'issn';
        _displayLabel: 'pissn';
      };
      identifier_displayLabel_eissn_type_issn?: {
        value: string;
        _type: 'issn';
        _displayLabel: 'eissn';
      };
      part?: {
        detail_type_volume?: { number?: { value: string }; _type: 'volume' };
        detail_type_issue?: { number?: { value: string }; _type: 'issue' };
        detail_type_artNo?: { number?: { value: string }; _type: 'artNo' };
        extent?: { start?: { value: string }; end?: { value: string } };
      };
      _type: 'journal';
    };
    relatedItem_type_book?: {
      titleInfo?: {
        title: { value: string };
        subTitle?: { value: string };
        _lang: LanguageCollection;
      };
      note_type_statementOfResponsibility?: {
        value: string;
        _type: 'statementOfResponsibility';
      };
      originInfo?: {
        dateIssued: {
          year: { value: string };
          month?: { value: string };
          day?: { value: string };
        };
        copyrightDate?: {
          year: { value: string };
          month?: { value: string };
          day?: { value: string };
        };
        dateOther_type_online?: {
          year: { value: string };
          month?: { value: string };
          day?: { value: string };
          _type: 'online';
        };
        agent?: {
          publisher?: { value: string }[];
          namePart?: { value: string }[];
          role: { roleTerm: { value: 'pbl' } };
        };
        place?: { placeTerm: { value: string } }[];
        edition?: { value: string };
      };
      identifier_type_isbn?: {
        value: string;
        _type: 'isbn';
        _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
      }[];
      part?: {
        extent?: { start?: { value: string }; end?: { value: string } };
      };
      relatedItem_type_series?: {
        series?: { value: string };
        titleInfo?: { title: { value: string }; subTitle?: { value: string } };
        identifier_type_issn?: {
          value: string;
          _type: 'issn';
          _displayLabel: IdentifierDisplayLabelIssnCollection;
        };
        identifier_displayLabel_eissn_type_issn?: {
          value: string;
          _type: 'issn';
          _displayLabel: 'eissn';
        };
        partNumber?: { value: string };
        _type: 'series';
      }[];
      _type: 'book';
    };
    relatedItem_type_conferencePublication?: {
      titleInfo?: {
        title: { value: string };
        subTitle?: { value: string };
        _lang: LanguageCollection;
      };
      note_type_statementOfResponsibility?: {
        value: string;
        _type: 'statementOfResponsibility';
      };
      originInfo?: {
        dateIssued: {
          year: { value: string };
          month?: { value: string };
          day?: { value: string };
        };
        copyrightDate?: {
          year: { value: string };
          month?: { value: string };
          day?: { value: string };
        };
        dateOther_type_online?: {
          year: { value: string };
          month?: { value: string };
          day?: { value: string };
          _type: 'online';
        };
        agent?: {
          publisher?: { value: string }[];
          namePart?: { value: string }[];
          role: { roleTerm: { value: 'pbl' } };
        };
        place?: { placeTerm: { value: string } }[];
        edition?: { value: string };
      };
      identifier_type_isbn?: {
        value: string;
        _type: 'isbn';
        _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
      }[];
      part?: {
        extent?: { start?: { value: string }; end?: { value: string } };
      };
      relatedItem_type_series?: {
        series?: { value: string };
        titleInfo?: { title: { value: string }; subTitle?: { value: string } };
        identifier_type_issn?: {
          value: string;
          _type: 'issn';
          _displayLabel: IdentifierDisplayLabelIssnCollection;
        };
        identifier_displayLabel_eissn_type_issn?: {
          value: string;
          _type: 'issn';
          _displayLabel: 'eissn';
        };
        partNumber?: { value: string };
        _type: 'series';
      }[];
      _type: 'conferencePublication';
    };
    relatedItem_type_conference?: {
      conference?: { value: string };
      _type: 'conference';
    };
    relatedItem_type_series?: {
      series?: { value: string };
      titleInfo?: { title: { value: string }; subTitle?: { value: string } };
      identifier_type_issn?: {
        value: string;
        _type: 'issn';
        _displayLabel: IdentifierDisplayLabelIssnCollection;
      };
      identifier_displayLabel_eissn_type_issn?: {
        value: string;
        _type: 'issn';
        _displayLabel: 'eissn';
      };
      partNumber?: { value: string };
      _type: 'series';
    }[];
    relatedItem_type_researchData?: {
      titleInfo: {
        title: { value: string };
        subTitle?: { value: string };
        _lang: LanguageCollection;
      };
      identifier_type_doi?: { value: string; _type: 'doi' };
      location?: { url: { value: string }; displayLabel?: { value: string } }[];
      _type: 'researchData';
    }[];
    relatedItem_type_project?: {
      project?: { value: string };
      titleInfo?: {
        title: { value: string };
        subTitle?: { value: string };
        _lang: LanguageSweEngCollection;
      };
      _type: 'project';
    }[];
    relatedItem_type_funder?: {
      funder: { value: string };
      identifier_type_project?: { value: string; _type: 'project' };
      _type: 'funder';
    }[];
    relatedItem_type_initiative?: {
      initiative?: { value: SfoCollection }[];
      _type: 'initiative';
    };
    related?: {
      output?: { value: string };
      _type: RelatedOutputTypeCollection;
    }[];
    'accessCondition_authority_kb-se'?: {
      value: AccessConditionCollection;
      _authority: 'kb.se';
    };
    localGenericMarkup?: { value: string }[];
    admin: {
      note_type_internal?: { value: string; _type: 'internal' };
      reviewed: { value: TrueFalseDivaCollection };
    };
    attachment?: {
      attachmentFile: { value: string };
      type: { value: AttachmentTypeCollection };
      note_type_userMessage?: { value: string; _type: 'userMessage' };
    }[];
  };
}

export interface DivaJournal extends BFFDataRecordData {
  journal: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-journal' };
      validationType: { value: 'diva-journal' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      oldId?: { value: string };
    };
    titleInfo: { title: { value: string }; subTitle?: { value: string } };
    originInfo?: {
      dateIssued_point_start?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        _point: 'start';
      };
      dateIssued_point_end?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
        _point: 'end';
      };
    };
    identifier_displayLabel_pissn_type_issn?: {
      value: string;
      _type: 'issn';
      _displayLabel: 'pissn';
    };
    identifier_displayLabel_eissn_type_issn?: {
      value: string;
      _type: 'issn';
      _displayLabel: 'eissn';
    };
    location?: { url: { value: string }; displayLabel?: { value: string } };
  };
}

export interface DivaTopOrganisation extends BFFDataRecordData {
  organisation: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-organisation' };
      validationType: { value: 'diva-topOrganisation' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      oldId?: { value: string };
    };
    authority_lang_swe: {
      name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
      _lang: 'swe';
    };
    variant_lang_eng?: {
      name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
      _lang: 'eng';
    };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    address?: {
      postOfficeBox?: { value: string };
      street?: { value: string };
      postcode?: { value: string };
      place?: { value: string };
      country?: { value: CountryCollection };
    };
    identifier_type_organisationCode?: {
      value: string;
      _type: 'organisationCode';
    };
    identifier_type_organisationNumber?: {
      value: string;
      _type: 'organisationNumber';
    };
    identifier_type_ror?: { value: string; _type: 'ror' };
    location?: { url: { value: string }; displayLabel?: { value: string } };
    note_type_internal?: { value: string; _type: 'internal' };
    related_type_earlier?: {
      organisation?: { value: string };
      _type: 'earlier';
    };
  };
}

export interface DivaCourse extends BFFDataRecordData {
  course: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-course' };
      validationType: { value: 'diva-course' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      oldId?: { value: string };
    };
    authority_lang_swe: { topic: { value: string }; _lang: 'swe' };
    variant_lang_eng?: { topic: { value: string }; _lang: 'eng' };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    identifier_type_localId?: { value: string; _type: 'localId' };
    related?: {
      course?: { value: string };
      _type: RelatedTypeTopicCollection;
    }[];
  };
}

export interface DivaProgramme extends BFFDataRecordData {
  programme: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-programme' };
      validationType: { value: 'diva-programme' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      oldId?: { value: string };
    };
    authority_lang_swe: { topic: { value: string }; _lang: 'swe' };
    variant_lang_eng?: { topic: { value: string }; _lang: 'eng' };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    identifier_type_localId?: { value: string; _type: 'localId' };
    related?: {
      programme?: { value: string };
      _type: RelatedTypeTopicCollection;
    }[];
  };
}

export interface DivaPartOfOrganisation extends BFFDataRecordData {
  organisation: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-organisation' };
      validationType: { value: 'diva-partOfOrganisation' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      oldId?: { value: string };
    };
    authority_lang_swe: {
      name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
      _lang: 'swe';
    };
    variant_lang_eng?: {
      name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
      _lang: 'eng';
    };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    address?: {
      postOfficeBox?: { value: string };
      street?: { value: string };
      postcode?: { value: string };
      place?: { value: string };
      country?: { value: CountryCollection };
    };
    identifier_type_organisationCode?: {
      value: string;
      _type: 'organisationCode';
    };
    identifier_type_organisationNumber?: {
      value: string;
      _type: 'organisationNumber';
    };
    location?: { url: { value: string }; displayLabel?: { value: string } };
    note_type_internal?: { value: string; _type: 'internal' };
    related_type_parent?: { organisation: { value: string }; _type: 'parent' };
    related_type_earlier?: {
      organisation?: { value: string };
      _type: 'earlier';
    }[];
  };
}

export interface DivaSubject extends BFFDataRecordData {
  subject: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-subject' };
      validationType: { value: 'diva-subject' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
      oldId?: { value: string };
    };
    authority_lang_swe: { topic: { value: string }; _lang: 'swe' };
    variant_lang_eng?: { topic: { value: string }; _lang: 'eng' };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    identifier_type_localId?: { value: string; _type: 'localId' };
    related?: { topic: { value: string }; _type: RelatedTypeTopicCollection }[];
  };
}

export interface DivaLocalGenericMarkup extends BFFDataRecordData {
  localGenericMarkup: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-localGenericMarkup' };
      validationType: { value: 'diva-localGenericMarkup' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      permissionUnit: { value: string };
    };
    localGenericMarkup: { value: string };
    description?: { value: string };
  };
}

export interface DivaFunder extends BFFDataRecordData {
  funder: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-funder' };
      validationType: { value: 'diva-funder' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      oldId?: { value: string };
    };
    authority_lang_swe: {
      name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
      _lang: 'swe';
    };
    variant_lang_eng?: {
      name_type_corporate: { namePart: { value: string }; _type: 'corporate' };
      _lang: 'eng';
    };
    startDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    endDate?: {
      year: { value: string };
      month?: { value: string };
      day?: { value: string };
    };
    identifier_type_organisationNumber?: {
      value: string;
      _type: 'organisationNumber';
    };
    identifier_type_doi?: { value: string; _type: 'doi' };
    identifier_type_ror?: { value: string; _type: 'ror' };
  };
}

export interface DivaPerson extends BFFDataRecordData {
  person: {
    recordInfo: {
      id: { value: string };
      type: { value: 'diva-person' };
      validationType: { value: 'diva-person' };
      dataDivider: { value: 'divaData' };
      createdBy: { value: string };
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
      oldId?: { value: string };
    };
    authority: {
      name_type_personal: {
        namePart_type_family?: { value: string; _type: 'family' };
        namePart_type_given?: { value: string; _type: 'given' };
        namePart_type_termsOfAddress?: {
          value: string;
          _type: 'termsOfAddress';
        };
        _type: 'personal';
      };
    };
    variant?: {
      name_type_personal: {
        namePart_type_family?: { value: string; _type: 'family' };
        namePart_type_given?: { value: string; _type: 'given' };
        _type: 'personal';
      }[];
    };
    personInfo?: {
      birthDate?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
      };
      deathDate?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
      };
    };
    email?: { value: string }[];
    note_type_biographical?: {
      value: string;
      _type: 'biographical';
      _lang: LanguageCollection;
    }[];
    location?: { url: { value: string }; displayLabel?: { value: string } }[];
    identifier_type_orcid?: { value: string; _type: 'orcid' }[];
    identifier_type_localId?: { value: string; _type: 'localId' }[];
    'identifier_type_se-libr'?: { value: string; _type: 'se-libr' }[];
    identifier_type_openAlex?: { value: string; _type: 'openAlex' };
    identifier_type_scopus?: { value: string; _type: 'scopus' };
    identifier_type_viaf?: { value: string; _type: 'viaf' }[];
    affiliation?: {
      organisation?: { value: string };
      name_type_corporate?: { namePart: { value: string }; _type: 'corporate' };
      identifier_type_ror?: { value: string; _type: 'ror' };
      country?: { value: CountryCollection };
      description?: { value: string };
      startDate?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
      };
      endDate?: {
        year: { value: string };
        month?: { value: string };
        day?: { value: string };
      };
    }[];
  };
}

export interface DivaTheme extends BFFDataRecordData {
  'diva-theme': {
    memberPermissionUnit?: { value: string };
    recordInfo: {
      id: { value: string };
      type: { value: string };
      validationType: { value: string };
      dataDivider: { value: string };
      createdBy: { value: string };
      permissionUnit?: { value: string }[];
      tsCreated: { value: string };
      updated: { updatedBy: { value: string }; tsUpdated: { value: string } }[];
    };
    backgroundColor: { value: string };
    textColor: { value: string };
    logo?: { value: string };
    logoSvg?: { value: string };
    linkAdmin?: {
      linkSv: { url: { value: string }; displayLabel: { value: string } };
      linkEn: { url: { value: string }; displayLabel: { value: string } };
    }[];
    linkPublic?: {
      linkSv: { url: { value: string }; displayLabel: { value: string } };
      linkEn: { url: { value: string }; displayLabel: { value: string } };
    }[];
    pageTitleSv: { value: string };
    pageTitleEn: { value: string };
    hostname: { value: string }[];
  };
}

export type RelatedSeriesTypeCollection = 'host' | 'preceding';

export type OutputTypeCollection =
  | 'artistic-work_original-creative-work'
  | 'artistic-work_artistic-thesis'
  | 'publication_book'
  | 'publication_edited-book'
  | 'publication_book-chapter'
  | 'publication_foreword-afterword'
  | 'publication_report-chapter'
  | 'publication_report'
  | 'publication_journal-article'
  | 'publication_review-article'
  | 'publication_editorial-letter'
  | 'publication_book-review'
  | 'publication_magazine-article'
  | 'publication_newspaper-article'
  | 'publication_encyclopedia-entry'
  | 'publication_doctoral-thesis-monograph'
  | 'publication_doctoral-thesis-compilation'
  | 'publication_licentiate-thesis-monograph'
  | 'publication_licentiate-thesis-compilation'
  | 'publication_critical-edition'
  | 'publication_working-paper'
  | 'publication_journal-issue'
  | 'publication_preprint'
  | 'publication_other'
  | 'conference_paper'
  | 'conference_poster'
  | 'conference_proceeding'
  | 'conference_other'
  | 'intellectual-property_patent'
  | 'intellectual-property_other'
  | 'other_software'
  | 'diva_degree-project'
  | 'diva_manuscript-thesis'
  | 'diva_dissertation';

export type LanguageSweEngCollection = 'swe' | 'eng';

export type RoleProjectPersonalCollection =
  | 'principalInvestigator'
  | 'investigator'
  | 'coInvestigator'
  | 'projectOfficer'
  | 'highlyQualifiedPersonel'
  | 'researchStudent';

export type CountryCollection =
  | 'aa'
  | 'ae'
  | 'af'
  | 'ag'
  | 'ai'
  | 'aj'
  | 'am'
  | 'an'
  | 'ao'
  | 'aq'
  | 'as'
  | 'at'
  | 'au'
  | 'aw'
  | 'ay'
  | 'ba'
  | 'bb'
  | 'bd'
  | 'be'
  | 'bf'
  | 'bg'
  | 'bh'
  | 'bi'
  | 'bl'
  | 'bm'
  | 'bn'
  | 'bo'
  | 'bp'
  | 'br'
  | 'bs'
  | 'bt'
  | 'bu'
  | 'bv'
  | 'bw'
  | 'bx'
  | 'cb'
  | 'cc'
  | 'cd'
  | 'ce'
  | 'cf'
  | 'cg'
  | 'ch'
  | 'ci'
  | 'cj'
  | 'ck'
  | 'cl'
  | 'cm'
  | 'cq'
  | 'cr'
  | 'cs'
  | 'cu'
  | 'cv'
  | 'cw'
  | 'cx'
  | 'cy'
  | 'dk'
  | 'dm'
  | 'dq'
  | 'dr'
  | 'ea'
  | 'ec'
  | 'eg'
  | 'em'
  | 'er'
  | 'es'
  | 'et'
  | 'fa'
  | 'fg'
  | 'fi'
  | 'fj'
  | 'fk'
  | 'fm'
  | 'fp'
  | 'fr'
  | 'fs'
  | 'ft'
  | 'gb'
  | 'gd'
  | 'gg'
  | 'gh'
  | 'gi'
  | 'gl'
  | 'gm'
  | 'go'
  | 'gp'
  | 'gr'
  | 'gs'
  | 'gt'
  | 'gu'
  | 'gv'
  | 'gw'
  | 'gy'
  | 'hk'
  | 'hm'
  | 'ho'
  | 'ht'
  | 'hu'
  | 'ic'
  | 'ie'
  | 'ii'
  | 'im'
  | 'io'
  | 'iq'
  | 'ir'
  | 'is'
  | 'it'
  | 'iv'
  | 'ja'
  | 'je'
  | 'jm'
  | 'jo'
  | 'ke'
  | 'kg'
  | 'kn'
  | 'ko'
  | 'ku'
  | 'kv'
  | 'kz'
  | 'lb'
  | 'le'
  | 'lh'
  | 'li'
  | 'lo'
  | 'ls'
  | 'lu'
  | 'lv'
  | 'ly'
  | 'mc'
  | 'mf'
  | 'mg'
  | 'mh'
  | 'mj'
  | 'mk'
  | 'ml'
  | 'mm'
  | 'mo'
  | 'mp'
  | 'mq'
  | 'mr'
  | 'mu'
  | 'mv'
  | 'mw'
  | 'mx'
  | 'my'
  | 'mz'
  | 'na'
  | 'ne'
  | 'ng'
  | 'nl'
  | 'nn'
  | 'no'
  | 'np'
  | 'nq'
  | 'nr'
  | 'nu'
  | 'nw'
  | 'nx'
  | 'nz'
  | 'ot'
  | 'pc'
  | 'pe'
  | 'pg'
  | 'ph'
  | 'pk'
  | 'pl'
  | 'pn'
  | 'po'
  | 'pp'
  | 'pr'
  | 'pw'
  | 'py'
  | 'qa'
  | 'rb'
  | 're'
  | 'rh'
  | 'rm'
  | 'ru'
  | 'rw'
  | 'sa'
  | 'se'
  | 'sf'
  | 'sg'
  | 'si'
  | 'sj'
  | 'sl'
  | 'sm'
  | 'so'
  | 'sp'
  | 'sq'
  | 'sr'
  | 'ss'
  | 'su'
  | 'sw'
  | 'sx'
  | 'sy'
  | 'sz'
  | 'ta'
  | 'tc'
  | 'tg'
  | 'th'
  | 'ti'
  | 'tk'
  | 'tl'
  | 'to'
  | 'tr'
  | 'ts'
  | 'tu'
  | 'tv'
  | 'tz'
  | 'ua'
  | 'ug'
  | 'un'
  | 'up'
  | 'uv'
  | 'uy'
  | 'uz'
  | 'vb'
  | 'vc'
  | 've'
  | 'vi'
  | 'wf'
  | 'vm'
  | 'ws'
  | 'xa'
  | 'xb'
  | 'xc'
  | 'xd'
  | 'xe'
  | 'xh'
  | 'xj'
  | 'xk'
  | 'xl'
  | 'xm'
  | 'xn'
  | 'xo'
  | 'xr'
  | 'xs'
  | 'xv'
  | 'xx'
  | 'xxc'
  | 'xxk'
  | 'xxr'
  | 'xxu'
  | 'ye'
  | 'yu'
  | 'za';

export type LanguageCollection =
  | 'swe'
  | 'eng'
  | 'aar'
  | 'abk'
  | 'ace'
  | 'ach'
  | 'ada'
  | 'ady'
  | 'afa'
  | 'afh'
  | 'afr'
  | 'ain'
  | 'aka'
  | 'akk'
  | 'alb'
  | 'ale'
  | 'alg'
  | 'alt'
  | 'amh'
  | 'ang'
  | 'anp'
  | 'apa'
  | 'ara'
  | 'arc'
  | 'arg'
  | 'arm'
  | 'arn'
  | 'arp'
  | 'art'
  | 'arw'
  | 'asm'
  | 'ast'
  | 'ath'
  | 'aus'
  | 'ava'
  | 'ave'
  | 'awa'
  | 'aym'
  | 'aze'
  | 'bad'
  | 'bai'
  | 'bak'
  | 'bal'
  | 'bam'
  | 'ban'
  | 'baq'
  | 'bas'
  | 'bat'
  | 'bej'
  | 'bel'
  | 'bem'
  | 'ben'
  | 'ber'
  | 'bho'
  | 'bih'
  | 'bik'
  | 'bin'
  | 'bis'
  | 'bla'
  | 'bnt'
  | 'bos'
  | 'bra'
  | 'bre'
  | 'btk'
  | 'bua'
  | 'bug'
  | 'bul'
  | 'bur'
  | 'byn'
  | 'cad'
  | 'cai'
  | 'car'
  | 'cat'
  | 'cau'
  | 'ceb'
  | 'cel'
  | 'cha'
  | 'chb'
  | 'che'
  | 'chg'
  | 'chi'
  | 'chk'
  | 'chm'
  | 'chn'
  | 'cho'
  | 'chp'
  | 'chr'
  | 'chu'
  | 'chv'
  | 'chy'
  | 'cmc'
  | 'cop'
  | 'cor'
  | 'cos'
  | 'cpe'
  | 'cpf'
  | 'cpp'
  | 'cre'
  | 'crh'
  | 'crp'
  | 'csb'
  | 'cus'
  | 'cze'
  | 'dak'
  | 'dan'
  | 'dar'
  | 'day'
  | 'del'
  | 'den'
  | 'dgr'
  | 'din'
  | 'div'
  | 'doi'
  | 'dra'
  | 'dsb'
  | 'dua'
  | 'dum'
  | 'dut'
  | 'dyu'
  | 'dzo'
  | 'efi'
  | 'egy'
  | 'eka'
  | 'elx'
  | 'enm'
  | 'epo'
  | 'est'
  | 'ewe'
  | 'ewo'
  | 'fan'
  | 'fao'
  | 'fat'
  | 'fij'
  | 'fil'
  | 'fin'
  | 'fiu'
  | 'fon'
  | 'fre'
  | 'frm'
  | 'fro'
  | 'frr'
  | 'frs'
  | 'fry'
  | 'ful'
  | 'fur'
  | 'gaa'
  | 'gay'
  | 'gba'
  | 'gem'
  | 'geo'
  | 'ger'
  | 'gez'
  | 'gil'
  | 'gla'
  | 'gle'
  | 'glg'
  | 'glv'
  | 'gmh'
  | 'goh'
  | 'gon'
  | 'gor'
  | 'got'
  | 'grb'
  | 'grc'
  | 'gre'
  | 'grn'
  | 'gsw'
  | 'guj'
  | 'gwi'
  | 'hai'
  | 'hat'
  | 'hau'
  | 'haw'
  | 'heb'
  | 'her'
  | 'hil'
  | 'him'
  | 'hin'
  | 'hit'
  | 'hmn'
  | 'hmo'
  | 'hrv'
  | 'hsb'
  | 'hun'
  | 'hup'
  | 'iba'
  | 'ibo'
  | 'ice'
  | 'ido'
  | 'iii'
  | 'ijo'
  | 'iku'
  | 'ile'
  | 'ilo'
  | 'ina'
  | 'inc'
  | 'ind'
  | 'ine'
  | 'inh'
  | 'ipk'
  | 'ira'
  | 'iro'
  | 'ita'
  | 'jav'
  | 'jbo'
  | 'jpn'
  | 'jpr'
  | 'jrb'
  | 'kaa'
  | 'kab'
  | 'kac'
  | 'kal'
  | 'kam'
  | 'kan'
  | 'kar'
  | 'kas'
  | 'kau'
  | 'kaw'
  | 'kaz'
  | 'kbd'
  | 'kha'
  | 'khi'
  | 'khm'
  | 'kho'
  | 'kik'
  | 'kin'
  | 'kir'
  | 'kmb'
  | 'kok'
  | 'kom'
  | 'kon'
  | 'kor'
  | 'kos'
  | 'kpe'
  | 'krc'
  | 'krl'
  | 'kro'
  | 'kru'
  | 'kua'
  | 'kum'
  | 'kur'
  | 'kut'
  | 'lad'
  | 'lah'
  | 'lam'
  | 'lao'
  | 'lat'
  | 'lav'
  | 'lez'
  | 'lim'
  | 'lin'
  | 'lit'
  | 'lol'
  | 'loz'
  | 'ltz'
  | 'lua'
  | 'lub'
  | 'lug'
  | 'lui'
  | 'lun'
  | 'luo'
  | 'lus'
  | 'mac'
  | 'mad'
  | 'mag'
  | 'mah'
  | 'mai'
  | 'mak'
  | 'mal'
  | 'man'
  | 'mao'
  | 'map'
  | 'mar'
  | 'mas'
  | 'may'
  | 'mdf'
  | 'mdr'
  | 'men'
  | 'mga'
  | 'mic'
  | 'min'
  | 'mis'
  | 'mkh'
  | 'mlg'
  | 'mlt'
  | 'mnc'
  | 'mni'
  | 'mno'
  | 'moh'
  | 'mon'
  | 'mos'
  | 'mul'
  | 'mun'
  | 'mus'
  | 'mwl'
  | 'mwr'
  | 'myn'
  | 'myv'
  | 'nah'
  | 'nai'
  | 'nap'
  | 'nau'
  | 'nav'
  | 'nbl'
  | 'nde'
  | 'ndo'
  | 'nds'
  | 'nep'
  | 'new'
  | 'nia'
  | 'nic'
  | 'niu'
  | 'nno'
  | 'nob'
  | 'nog'
  | 'non'
  | 'nor'
  | 'nqo'
  | 'nso'
  | 'nub'
  | 'nwc'
  | 'nya'
  | 'nym'
  | 'nyn'
  | 'nyo'
  | 'nzi'
  | 'oci'
  | 'oji'
  | 'ori'
  | 'orm'
  | 'osa'
  | 'oss'
  | 'ota'
  | 'oto'
  | 'paa'
  | 'pag'
  | 'pal'
  | 'pam'
  | 'pan'
  | 'pap'
  | 'pau'
  | 'peo'
  | 'per'
  | 'phi'
  | 'phn'
  | 'pli'
  | 'pol'
  | 'pon'
  | 'por'
  | 'pra'
  | 'pro'
  | 'pus'
  | 'que'
  | 'raj'
  | 'rap'
  | 'rar'
  | 'roa'
  | 'roh'
  | 'rom'
  | 'rum'
  | 'run'
  | 'rup'
  | 'rus'
  | 'sad'
  | 'sag'
  | 'sah'
  | 'sai'
  | 'sal'
  | 'sam'
  | 'san'
  | 'sas'
  | 'sat'
  | 'scn'
  | 'sco'
  | 'sel'
  | 'sem'
  | 'sga'
  | 'sgn'
  | 'shn'
  | 'sid'
  | 'sin'
  | 'sio'
  | 'sit'
  | 'sla'
  | 'slo'
  | 'slv'
  | 'sma'
  | 'sme'
  | 'smi'
  | 'smj'
  | 'smn'
  | 'smo'
  | 'sms'
  | 'sna'
  | 'snd'
  | 'snk'
  | 'sog'
  | 'som'
  | 'son'
  | 'sot'
  | 'spa'
  | 'srd'
  | 'srn'
  | 'srp'
  | 'srr'
  | 'ssa'
  | 'ssw'
  | 'suk'
  | 'sun'
  | 'sus'
  | 'sux'
  | 'swa'
  | 'syc'
  | 'syr'
  | 'tah'
  | 'tai'
  | 'tam'
  | 'tat'
  | 'tel'
  | 'tem'
  | 'ter'
  | 'tet'
  | 'tgk'
  | 'tgl'
  | 'tha'
  | 'tib'
  | 'tig'
  | 'tir'
  | 'tiv'
  | 'tkl'
  | 'tlh'
  | 'tli'
  | 'tmh'
  | 'tog'
  | 'ton'
  | 'tpi'
  | 'tsi'
  | 'tsn'
  | 'tso'
  | 'tuk'
  | 'tum'
  | 'tup'
  | 'tur'
  | 'tut'
  | 'tvl'
  | 'twi'
  | 'tyv'
  | 'udm'
  | 'uga'
  | 'uig'
  | 'ukr'
  | 'umb'
  | 'und'
  | 'urd'
  | 'uzb'
  | 'vai'
  | 'ven'
  | 'vie'
  | 'vol'
  | 'vot'
  | 'wak'
  | 'wal'
  | 'war'
  | 'was'
  | 'wel'
  | 'wen'
  | 'wln'
  | 'wol'
  | 'xal'
  | 'xho'
  | 'yao'
  | 'yap'
  | 'yid'
  | 'yor'
  | 'ypk'
  | 'zap'
  | 'zen'
  | 'zha'
  | 'znd'
  | 'zul'
  | 'zun'
  | 'zxx'
  | 'zza';

export type SsifCollection =
  | '1'
  | '101'
  | '10101'
  | '10102'
  | '10103'
  | '10104'
  | '10105'
  | '10106'
  | '10199'
  | '102'
  | '10201'
  | '10202'
  | '10203'
  | '10204'
  | '10205'
  | '10206'
  | '10207'
  | '10208'
  | '10210'
  | '10211'
  | '10212'
  | '10213'
  | '10214'
  | '10299'
  | '103'
  | '10301'
  | '10302'
  | '10303'
  | '10304'
  | '10305'
  | '10307'
  | '10308'
  | '10399'
  | '104'
  | '10401'
  | '10402'
  | '10403'
  | '10404'
  | '10405'
  | '10406'
  | '10407'
  | '10408'
  | '10499'
  | '105'
  | '10501'
  | '10502'
  | '10503'
  | '10504'
  | '10505'
  | '10506'
  | '10507'
  | '10508'
  | '10509'
  | '10510'
  | '10599'
  | '106'
  | '10601'
  | '10604'
  | '10605'
  | '10606'
  | '10607'
  | '10608'
  | '10609'
  | '10610'
  | '10611'
  | '10612'
  | '10613'
  | '10614'
  | '10615'
  | '10616'
  | '10699'
  | '107'
  | '10799'
  | '2'
  | '201'
  | '20101'
  | '20102'
  | '20103'
  | '20104'
  | '20105'
  | '20106'
  | '20107'
  | '20109'
  | '20110'
  | '20199'
  | '202'
  | '20201'
  | '20202'
  | '20203'
  | '20204'
  | '20205'
  | '20206'
  | '20207'
  | '20208'
  | '20209'
  | '20299'
  | '203'
  | '20301'
  | '20302'
  | '20304'
  | '20305'
  | '20306'
  | '20307'
  | '20309'
  | '20310'
  | '20399'
  | '204'
  | '20402'
  | '20403'
  | '20405'
  | '20406'
  | '20407'
  | '20499'
  | '205'
  | '20501'
  | '20502'
  | '20503'
  | '20504'
  | '20505'
  | '20506'
  | '20599'
  | '206'
  | '20601'
  | '20602'
  | '20603'
  | '20604'
  | '20605'
  | '20606'
  | '20699'
  | '207'
  | '20702'
  | '20703'
  | '20704'
  | '20705'
  | '20707'
  | '20799'
  | '208'
  | '20801'
  | '20802'
  | '20803'
  | '20899'
  | '209'
  | '20901'
  | '20902'
  | '20903'
  | '20904'
  | '20905'
  | '20906'
  | '20909'
  | '20999'
  | '210'
  | '21002'
  | '21003'
  | '21004'
  | '21005'
  | '21099'
  | '211'
  | '21199'
  | '3'
  | '301'
  | '30101'
  | '30102'
  | '30103'
  | '30104'
  | '30105'
  | '30106'
  | '30107'
  | '30108'
  | '30109'
  | '30110'
  | '30111'
  | '30112'
  | '30113'
  | '30114'
  | '30115'
  | '30116'
  | '30117'
  | '30118'
  | '30199'
  | '302'
  | '30201'
  | '30202'
  | '30203'
  | '30204'
  | '30205'
  | '30206'
  | '30207'
  | '30208'
  | '30209'
  | '30211'
  | '30212'
  | '30213'
  | '30215'
  | '30216'
  | '30217'
  | '30218'
  | '30219'
  | '30220'
  | '30221'
  | '30222'
  | '30223'
  | '30224'
  | '30225'
  | '30226'
  | '30227'
  | '30228'
  | '30229'
  | '30230'
  | '30299'
  | '303'
  | '30301'
  | '30303'
  | '30304'
  | '30305'
  | '30306'
  | '30307'
  | '30308'
  | '30309'
  | '30310'
  | '30311'
  | '30312'
  | '30313'
  | '30314'
  | '30399'
  | '304'
  | '30401'
  | '30402'
  | '30403'
  | '30499'
  | '305'
  | '30501'
  | '30502'
  | '30599'
  | '4'
  | '401'
  | '40101'
  | '40102'
  | '40103'
  | '40104'
  | '40105'
  | '40106'
  | '40107'
  | '402'
  | '40201'
  | '403'
  | '40301'
  | '40302'
  | '40303'
  | '40399'
  | '404'
  | '40401'
  | '40402'
  | '405'
  | '40502'
  | '40504'
  | '40505'
  | '40506'
  | '40507'
  | '40599'
  | '5'
  | '501'
  | '50101'
  | '50102'
  | '502'
  | '50201'
  | '50202'
  | '50203'
  | '503'
  | '50301'
  | '50302'
  | '50304'
  | '50399'
  | '504'
  | '50401'
  | '50402'
  | '50404'
  | '50405'
  | '50406'
  | '505'
  | '50501'
  | '50503'
  | '506'
  | '50601'
  | '50604'
  | '507'
  | '50701'
  | '50702'
  | '50703'
  | '508'
  | '50801'
  | '50804'
  | '50805'
  | '509'
  | '50902'
  | '50903'
  | '50904'
  | '50905'
  | '50906'
  | '50907'
  | '50908'
  | '50909'
  | '50910'
  | '50911'
  | '50912'
  | '50999'
  | '6'
  | '601'
  | '60101'
  | '60102'
  | '60103'
  | '60104'
  | '60105'
  | '602'
  | '60201'
  | '60202'
  | '60203'
  | '60204'
  | '60205'
  | '60206'
  | '60207'
  | '603'
  | '60301'
  | '60302'
  | '60303'
  | '60304'
  | '60306'
  | '604'
  | '60407'
  | '60408'
  | '60409'
  | '60410'
  | '60411'
  | '60412'
  | '60413'
  | '60414'
  | '60415'
  | '60416'
  | '60417'
  | '60418'
  | '60419'
  | '605'
  | '60502'
  | '60503'
  | '60504'
  | '60599';

export type SdgCollection =
  | 'sdg1'
  | 'sdg2'
  | 'sdg3'
  | 'sdg4'
  | 'sdg5'
  | 'sdg6'
  | 'sdg7'
  | 'sdg8'
  | 'sdg9'
  | 'sdg10'
  | 'sdg11'
  | 'sdg12'
  | 'sdg13'
  | 'sdg14'
  | 'sdg15'
  | 'sdg16'
  | 'sdg17';

export type TypeOfAwardCollection =
  | 'projectGrant'
  | 'grantForEmploymentOrScholarship'
  | 'grantToResearchEnvironment'
  | 'internationalCooperation'
  | 'researchInfrastructure'
  | 'euGrant'
  | 'otherGrant';

export type CurrencyCollection = 'eur' | 'sek';

export type VisibilityCollection = 'published' | 'unpublished' | 'hidden';

export type SubcategoryOtherCollection = 'policyDocument' | 'exhibitionCatalog';

export type PublicationStatusCollection =
  | 'submitted'
  | 'accepted'
  | 'inPress'
  | 'aheadOfPrint'
  | 'retracted';

export type OutputTypeArtisticWorkCollection = 'false' | 'true';

export type GenreContentTypeCollection = 'ref' | 'vet' | 'pop';

export type GenreArtisticReviewedCollection = 'refereed' | 'unrefereed';

export type RoleCollection =
  | 'aut'
  | 'edt'
  | 'acp'
  | 'act'
  | 'adp'
  | 'aft'
  | 'anm'
  | 'app'
  | 'aqt'
  | 'arc'
  | 'arr'
  | 'art'
  | 'aud'
  | 'aui'
  | 'aus'
  | 'chr'
  | 'cmm'
  | 'cmp'
  | 'cnd'
  | 'cng'
  | 'cov'
  | 'cre'
  | 'cst'
  | 'ctb'
  | 'cur'
  | 'cwt'
  | 'dgs'
  | 'dis'
  | 'dnc'
  | 'drt'
  | 'dsr'
  | 'dtm'
  | 'egr'
  | 'etr'
  | 'flm'
  | 'fmk'
  | 'hnr'
  | 'ill'
  | 'inv'
  | 'itr'
  | 'lbt'
  | 'lgd'
  | 'ltg'
  | 'lyr'
  | 'mcp'
  | 'mon'
  | 'msd'
  | 'mus'
  | 'nrt'
  | 'opn'
  | 'pbl'
  | 'pdr'
  | 'pht'
  | 'pro'
  | 'prt'
  | 'rce'
  | 'res'
  | 'rsg'
  | 'sce'
  | 'scl'
  | 'sds'
  | 'sng'
  | 'spk'
  | 'std'
  | 'stm'
  | 'ths'
  | 'trl'
  | 'tyd'
  | 'vdg'
  | 'wam'
  | 'wdc';

export type TypeOfResourceCollection =
  | 'artifact'
  | 'cartographic'
  | 'mixedMaterial'
  | 'movingImage'
  | 'notatedMusic'
  | 'softwareMultimedia'
  | 'soundRecordingMusical'
  | 'soundRecordingNonMusical'
  | 'soundRecording'
  | 'stillImage'
  | 'text';

export type IdentifierDisplayLabelIsbnIsmnCollection =
  | 'print'
  | 'online'
  | 'invalid';

export type SemesterCollection = 'ht' | 'vt';

export type DegreeLevelCollection =
  | 'L1'
  | 'L2'
  | 'L3'
  | 'M1'
  | 'M2'
  | 'M3'
  | 'M4'
  | 'M5'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5';

export type UniversityPointsCollection =
  | '5'
  | '7,5'
  | '10'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '18'
  | '20'
  | '22,5'
  | '25,5'
  | '28'
  | '30'
  | '33'
  | '37,5'
  | '45'
  | '60'
  | '90'
  | '120'
  | '180'
  | '210'
  | '240'
  | '300'
  | '330';

export type IdentifierDisplayLabelIssnCollection = 'eissn' | 'pissn';

export type SfoCollection =
  | 'cancer'
  | 'diabetes'
  | 'epidemiology'
  | 'neuroscience'
  | 'molecularBiosciences'
  | 'stemcellsAndRegenerativeMedicine'
  | 'healthCareResearch'
  | 'eScience'
  | 'itAndMobileCommunications'
  | 'materialsscience'
  | 'nanoscienceAndNanotechnology'
  | 'productionTechnology'
  | 'transportResearch'
  | 'impactOnNaturalResources'
  | 'energy'
  | 'sustainableUseOfNaturalResources'
  | 'climateModels'
  | 'marineEnvironmentResearch'
  | 'securityAndEmergencyPreparedness'
  | 'politicalImportantGeographicalRegions';

export type RelatedOutputTypeCollection =
  | 'retracted'
  | 'constituent'
  | 'thesis';

export type AccessConditionCollection = 'gratis' | 'restricted';

export type TrueFalseDivaCollection = 'true' | 'false';

export type AttachmentTypeCollection =
  | 'fullText'
  | 'attachment'
  | 'audio'
  | 'cover'
  | 'dataSet'
  | 'errata'
  | 'image'
  | 'inside'
  | 'movie'
  | 'notificationOfSubmissionOfAThesis'
  | 'popularSummary'
  | 'previewImage'
  | 'references'
  | 'software'
  | 'summary'
  | 'toc';

export type RelatedTypeTopicCollection = 'earlier' | 'broader';
