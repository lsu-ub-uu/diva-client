/**
 * Auto-generated types
 */

import type { BFFDataRecordData } from '@/types/record';

export interface DivaSeries extends BFFDataRecordData {
  series: SeriesUpdateGroup;
}

export interface DivaPublisher extends BFFDataRecordData {
  publisher: PublisherUpdateGroup;
}

export interface DivaProject extends BFFDataRecordData {
  project: ProjectUpdateGroup;
}

export interface DivaMember extends BFFDataRecordData {
  'diva-member': DivaMemberGroup;
}

export interface User extends BFFDataRecordData {
  user: UserGroup;
}

export interface UpdatedGroup {
  updatedBy: {
    value: string;
    linkedRecord: {
      user: UserGroup;
    };

    __text: { sv: string; en: string };
  };
  tsUpdated: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface RecordInfoWithPermissionUnitGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: string; __text: { sv: string; en: string } };
  validationType: { value: string; __text: { sv: string; en: string } };
  dataDivider: { value: string; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  permissionUnit?: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedGroup[];
  __text: { sv: string; en: string };
}

export interface PermissionUnit extends BFFDataRecordData {
  permissionUnit: PermissionUnitGroup;
}

export interface RecordInfoPermissionUnitGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type?: { value: string; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  dataDivider: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedGroup[];
  validationType: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface Text extends BFFDataRecordData {
  text: TextGroup;
}

export interface RecordInfoTextGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type?: { value: string; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  dataDivider: { value: string; __text: { sv: string; en: string } };
  permissionUnit?: { value: string; __text: { sv: string; en: string } }[];
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedGroup[];
  validationType: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type TextPartTypeCollection = 'default' | 'alternative';

export type SystemLanguagesCollection = 'sv' | 'en' | 'no';

export interface TextPartGroup {
  text: { value: string; __text: { sv: string; en: string } };
  _type: TextPartTypeCollection;
  _lang: SystemLanguagesCollection;
  __text: { sv: string; en: string };
}

export interface TextGroup {
  recordInfo: RecordInfoTextGroup;
  textPart: TextPartGroup[];
  __text: { sv: string; en: string };
}

export interface ExtraDataPermissionUnitGroup {
  notInUse: { value: 'notInUse'; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface PermissionUnitGroup {
  recordInfo: RecordInfoPermissionUnitGroup;
  name: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  url?: { value: string; __text: { sv: string; en: string } };
  note?: { value: string; __text: { sv: string; en: string } };
  extraData?: ExtraDataPermissionUnitGroup;
  __text: { sv: string; en: string };
}

export interface PermissionRole extends BFFDataRecordData {
  permissionRole: PermissionRoleGroup;
}

export interface RecordInfoGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: string; __text: { sv: string; en: string } };
  validationType: { value: string; __text: { sv: string; en: string } };
  dataDivider: { value: string; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  permissionUnit?: { value: string; __text: { sv: string; en: string } }[];
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedGroup[];
  __text: { sv: string; en: string };
}

export interface PermissionRule extends BFFDataRecordData {
  permissionRule: DefaultPermissionRuleGroup;
}

export interface PermissionRulePartActionGroup {
  permissionRulePartValue: {
    value: string;
    __text: { sv: string; en: string };
  }[];
  _type: 'action';
  __text: { sv: string; en: string };
}

export interface PermissionRulePartRecordTypeGroup {
  permissionRulePartValue: {
    value: string;
    __text: { sv: string; en: string };
  }[];
  _type: 'recordType';
  __text: { sv: string; en: string };
}

export type ActiveStatusItemCollection = 'active' | 'inactive';

export interface CollectTerm extends BFFDataRecordData {
  collectTerm: CollectTermGroup;
}

export type CollectTermTypeCollection = 'index' | 'permission' | 'storage';

export type IndexTypeCollection =
  | 'indexTypeId'
  | 'indexTypeBoolean'
  | 'indexTypeString'
  | 'indexTypeDate'
  | 'indexTypeNumber'
  | 'indexTypeText';

export type PermissionTermModeCollection = 'standard' | 'state';

export interface CollectTermExtraDataGroup {
  indexFieldName?: { value: string; __text: { sv: string; en: string } };
  indexType?: {
    value: IndexTypeCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  permissionKey?: { value: string; __text: { sv: string; en: string } };
  mode?: {
    value: PermissionTermModeCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  storageKey?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface CollectTermGroup {
  recordInfo: RecordInfoGroup;
  nameInData?: { value: string; __text: { sv: string; en: string } };
  extraData: CollectTermExtraDataGroup;
  _type: CollectTermTypeCollection;
  __text: { sv: string; en: string };
}

export interface PermissionTermRulePartGroup {
  rule: {
    value: string;
    linkedRecord: {
      collectTerm: CollectTermGroup;
    };

    __text: { sv: string; en: string };
  };
  value: { value: string; __text: { sv: string; en: string } }[];
  __text: { sv: string; en: string };
}

export interface RuleRecordPartReadPermissionGroup {
  readPermission: { value: string; __text: { sv: string; en: string } }[];
  __text: { sv: string; en: string };
}

export interface RuleRecordPartWritePermissionGroup {
  writePermission: { value: string; __text: { sv: string; en: string } }[];
  __text: { sv: string; en: string };
}

export interface DefaultPermissionRuleGroup {
  recordInfo: RecordInfoGroup;
  permissionRulePart_type_action?: PermissionRulePartActionGroup;
  permissionRulePart_type_recordType?: PermissionRulePartRecordTypeGroup;
  activeStatus: {
    value: ActiveStatusItemCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  permissionTermRulePart?: PermissionTermRulePartGroup[];
  readPermissions?: RuleRecordPartReadPermissionGroup;
  writePermissions?: RuleRecordPartWritePermissionGroup;
  metadataDescription?: { value: string; __text: { sv: string; en: string } };
  textId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  defTextId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface PermissionRoleGroup {
  recordInfo: RecordInfoGroup;
  permissionRuleLink: {
    value: string;
    linkedRecord: {
      permissionRule: DefaultPermissionRuleGroup;
    };

    __text: { sv: string; en: string };
  }[];
  activeStatus: {
    value: ActiveStatusItemCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  textId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  defTextId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface UserRoleRelationGroup {
  userRole: {
    value: string;
    linkedRecord: {
      permissionRole: PermissionRoleGroup;
    };

    __text: { sv: string; en: string };
  };
  permissionTermRulePart?: PermissionTermRulePartGroup[];
  __text: { sv: string; en: string };
}

export interface SystemSecret extends BFFDataRecordData {
  systemSecret: SystemSecretGroup;
}

export interface SystemSecretGroup {
  recordInfo: RecordInfoGroup;
  secret: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface AppTokenSystemSecretGroup {
  appTokenLink?: {
    value: string;
    linkedRecord: {
      systemSecret: SystemSecretGroup;
    };

    __text: { sv: string; en: string };
  };
  appTokenNote: { value: string; __text: { sv: string; en: string } };
  appTokenClearText?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface AppTokensGroup {
  appToken: AppTokenSystemSecretGroup[];
  __text: { sv: string; en: string };
}

export type TrueFalseCollection = 'false' | 'true';

export interface UserGroup {
  recordInfo: RecordInfoWithPermissionUnitGroup;
  loginId: { value: string; __text: { sv: string; en: string } };
  userFirstname: { value: string; __text: { sv: string; en: string } };
  userLastname: { value: string; __text: { sv: string; en: string } };
  email?: { value: string; __text: { sv: string; en: string } };
  permissionUnit?: {
    value: string;
    linkedRecord: {
      permissionUnit: PermissionUnitGroup;
    };

    __text: { sv: string; en: string };
  }[];
  userRole: UserRoleRelationGroup[];
  activeStatus: {
    value: ActiveStatusItemCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  appTokens?: AppTokensGroup;
  usePassword: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  plainTextPassword?: { value: string; __text: { sv: string; en: string } };
  tsPasswordUpdated?: { value: string; __text: { sv: string; en: string } };
  passwordLink?: {
    value: string;
    linkedRecord: {
      systemSecret: SystemSecretGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface UpdatedDivaGroup {
  updatedBy: {
    value: string;
    linkedRecord: {
      user: UserGroup;
    };

    __text: { sv: string; en: string };
  };
  tsUpdated: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface RecordInfoSeriesUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-series'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-series'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface TitleInfoGroup {
  title: { value: string; __text: { sv: string; en: string } };
  subtitle?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface TitleInfoAlternativeGroup {
  title: { value: string; __text: { sv: string; en: string } };
  subtitle?: { value: string; __text: { sv: string; en: string } };
  _type: 'alternative';
  __text: { sv: string; en: string };
}

export interface DateIssuedStartGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  _point: 'start';
  __text: { sv: string; en: string };
}

export interface DateIssuedEndGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  _point: 'end';
  __text: { sv: string; en: string };
}

export interface OriginInfoDateIssuedStartEndGroup {
  dateIssued_point_start?: DateIssuedStartGroup;
  dateIssued_point_end?: DateIssuedEndGroup;
  __text: { sv: string; en: string };
}

export type RelatedSeriesTypeCollection = 'host' | 'preceding';

export interface DivaSeries extends BFFDataRecordData {
  series: SeriesUpdateGroup;
}

export interface RelatedSeriesGroup {
  series: {
    value: string;
    linkedRecord: {
      series: SeriesUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: RelatedSeriesTypeCollection;
  __text: { sv: string; en: string };
}

export interface LocationGroup {
  url: { value: string; __text: { sv: string; en: string } };
  displayLabel?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

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
  | 'diva_degree-project'
  | 'diva_dissertation';

export interface DivaOrganisation extends BFFDataRecordData {
  organisation: OrganisationUpdateGroup;
}

export interface RecordInfoOrganisationUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-organisation'; __text: { sv: string; en: string } };
  validationType: { value: string; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type OrganisationTypeCollection =
  | 'topOrganisation'
  | 'partOfOrganisation';

export interface NameCorporateGroup {
  namePart: { value: string; __text: { sv: string; en: string } };
  _type: 'corporate';
  __text: { sv: string; en: string };
}

export interface AuthorityCorporateLangGroup {
  name_type_corporate: NameCorporateGroup;
  _lang: 'swe';
  __text: { sv: string; en: string };
}

export interface VariantCorporateLangGroup {
  name_type_corporate: NameCorporateGroup;
  _lang: 'eng';
  __text: { sv: string; en: string };
}

export interface StartDateGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface EndDateGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

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

export interface AddressGroup {
  postOfficeBox?: { value: string; __text: { sv: string; en: string } };
  street?: { value: string; __text: { sv: string; en: string } };
  postcode?: { value: string; __text: { sv: string; en: string } };
  place?: { value: string; __text: { sv: string; en: string } };
  country?: {
    value: CountryCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface RelatedOrganisationParentGroup {
  organisation: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  _type: 'parent';
  __text: { sv: string; en: string };
}

export interface RelatedOrganisationEarlierGroup {
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  _type: 'earlier';
  __text: { sv: string; en: string };
}

export interface OrganisationUpdateGroup {
  recordInfo: RecordInfoOrganisationUpdateGroup;
  genre_type_organisationType: {
    value: OrganisationTypeCollection;
    _type: 'organisationType';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  authority_lang_swe: AuthorityCorporateLangGroup;
  variant_lang_eng?: VariantCorporateLangGroup;
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  address?: AddressGroup;
  identifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  identifier_type_organisationNumber?: {
    value: string;
    _type: 'organisationNumber';
    __text: { sv: string; en: string };
  };
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  location?: LocationGroup;
  note_type_internal?: {
    value: string;
    _type: 'internal';
    __text: { sv: string; en: string };
  };
  related_type_parent?: RelatedOrganisationParentGroup[];
  related_type_earlier?: RelatedOrganisationEarlierGroup[];
  __text: { sv: string; en: string };
}

export interface SeriesUpdateGroup {
  recordInfo: RecordInfoSeriesUpdateGroup;
  titleInfo: TitleInfoGroup;
  titleInfo_type_alternative?: TitleInfoAlternativeGroup;
  originInfo?: OriginInfoDateIssuedStartEndGroup;
  identifier_displayLabel_pissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'pissn';
    __text: { sv: string; en: string };
  };
  identifier_displayLabel_eissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'eissn';
    __text: { sv: string; en: string };
  };
  related?: RelatedSeriesGroup[];
  location?: LocationGroup;
  note_type_internal?: {
    value: string;
    _type: 'internal';
    __text: { sv: string; en: string };
  };
  genre_type_outputType?: {
    value: OutputTypeCollection;
    _type: 'outputType';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface RecordInfoPublisherUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-publisher'; __text: { sv: string; en: string } };
  validationType: {
    value: 'diva-publisher';
    __text: { sv: string; en: string };
  };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface PublisherUpdateGroup {
  recordInfo: RecordInfoPublisherUpdateGroup;
  name_type_corporate: NameCorporateGroup;
  __text: { sv: string; en: string };
}

export interface RecordInfoProjectUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-project'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-project'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type LanguageSweEngCollection = 'swe' | 'eng';

export interface TitleInfoLangSweEngGroup {
  title: { value: string; __text: { sv: string; en: string } };
  subtitle?: { value: string; __text: { sv: string; en: string } };
  _lang: LanguageSweEngCollection;
  __text: { sv: string; en: string };
}

export interface TitleInfoAlternativeLangSweEngGroup {
  title: { value: string; __text: { sv: string; en: string } };
  subtitle?: { value: string; __text: { sv: string; en: string } };
  _type: 'alternative';
  _lang: LanguageSweEngCollection;
  __text: { sv: string; en: string };
}

export interface DivaPerson extends BFFDataRecordData {
  person: PersonUpdateGroup;
}

export interface RecordInfoPersonUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-person'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-person'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface NamePersonGroup {
  namePart_type_family: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  namePart_type_termsOfAddress?: {
    value: string;
    _type: 'termsOfAddress';
    __text: { sv: string; en: string };
  };
  namePart_type_date?: {
    value: string;
    _type: 'date';
    __text: { sv: string; en: string };
  };
  _type: 'personal';
  __text: { sv: string; en: string };
}

export interface AuthorityPersonalGroup {
  name_type_personal: NamePersonGroup;
  __text: { sv: string; en: string };
}

export interface NamePersonVariantGroup {
  namePart_type_family?: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  _type: 'personal';
  __text: { sv: string; en: string };
}

export interface VariantPersonalGroup {
  name_type_personal: NamePersonVariantGroup[];
  __text: { sv: string; en: string };
}

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

export interface AffiliationGroup {
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  name_type_corporate?: NameCorporateGroup;
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  country?: {
    value: CountryCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  description?: { value: string; __text: { sv: string; en: string } };
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  __text: { sv: string; en: string };
}

export interface PersonUpdateGroup {
  recordInfo: RecordInfoPersonUpdateGroup;
  authority: AuthorityPersonalGroup;
  variant?: VariantPersonalGroup;
  email?: { value: string; __text: { sv: string; en: string } }[];
  location?: LocationGroup[];
  note_type_biographical?: {
    value: string;
    _type: 'biographical';
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  nameIdentifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  }[];
  nameIdentifier_type_orcid?: {
    value: string;
    _type: 'orcid';
    __text: { sv: string; en: string };
  }[];
  'nameIdentifier_type_se-libr'?: {
    value: string;
    _type: 'se-libr';
    __text: { sv: string; en: string };
  }[];
  nameIdentifier_type_openAlex?: {
    value: string;
    _type: 'openAlex';
    __text: { sv: string; en: string };
  }[];
  nameIdentifier_type_scopus?: {
    value: string;
    _type: 'scopus';
    __text: { sv: string; en: string };
  }[];
  nameIdentifier_type_viaf?: {
    value: string;
    _type: 'viaf';
    __text: { sv: string; en: string };
  }[];
  affiliation?: AffiliationGroup[];
  __text: { sv: string; en: string };
}

export type RoleProjectPersonalCollection =
  | 'principalInvestigator'
  | 'investigator'
  | 'coInvestigator'
  | 'projectOfficer'
  | 'highlyQualifiedPersonel'
  | 'researchStudent';

export interface RoleProjectPersonalGroup {
  roleTerm: {
    value: RoleProjectPersonalCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}

export interface AffiliationPersonalGroup {
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  name_type_corporate?: NameCorporateGroup;
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  country?: {
    value: CountryCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  description?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface NamePersonalProjectGroup {
  person?: {
    value: string;
    linkedRecord: {
      person: PersonUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  namePart_type_family: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  namePart_type_date?: {
    value: string;
    _type: 'date';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_orcid?: {
    value: string;
    _type: 'orcid';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  role: RoleProjectPersonalGroup;
  affiliation?: AffiliationPersonalGroup[];
  _type: 'personal';
  __text: { sv: string; en: string };
}

export type RelatedItemOtherTypeCollection = 'link' | 'text';

export interface RoleProjectOrganisationGroup {
  roleTerm: {
    value: 'pdr';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NameOrganisationProjectGroup {
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  namePart: { value: string; __text: { sv: string; en: string } };
  role: RoleProjectOrganisationGroup;
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  _type: 'corporate';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface SubjectKeywordsGroup {
  topic: { value: string; __text: { sv: string; en: string } };
  _lang: LanguageCollection;
  __text: { sv: string; en: string };
}

export interface DivaSubject extends BFFDataRecordData {
  subject: SubjectUpdateGroup;
}

export interface RecordInfoSubjectUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-subject'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-subject'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface AuthorityTopicLangGroup {
  topic: { value: string; __text: { sv: string; en: string } };
  _lang: 'swe';
  __text: { sv: string; en: string };
}

export interface VariantTopicLangGroup {
  topic: { value: string; __text: { sv: string; en: string } };
  _lang: 'eng';
  __text: { sv: string; en: string };
}

export type RelatedTypeEarlierBroaderCollection = 'earlier' | 'broader';

export interface RelatedSubjectGroup {
  topic: {
    value: string;
    linkedRecord: {
      subject: SubjectUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: RelatedTypeEarlierBroaderCollection;
  __text: { sv: string; en: string };
}

export interface SubjectUpdateGroup {
  recordInfo: RecordInfoSubjectUpdateGroup;
  authority_lang_swe: AuthorityTopicLangGroup;
  variant_lang_eng?: VariantTopicLangGroup;
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  identifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  related?: RelatedSubjectGroup[];
  __text: { sv: string; en: string };
}

export interface SubjectSubjectGroup {
  topic: {
    value: string;
    linkedRecord: {
      subject: SubjectUpdateGroup;
    };

    __text: { sv: string; en: string };
  }[];
  _authority: 'diva';
  __text: { sv: string; en: string };
}

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

export interface SubjectSdgGroup {
  topic: {
    value: SdgCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  _authority: 'sdg';
  __text: { sv: string; en: string };
}

export interface DivaFunder extends BFFDataRecordData {
  funder: FunderUpdateGroup;
}

export interface RecordInfoFunderUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-funder'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-funder'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface FunderUpdateGroup {
  recordInfo: RecordInfoFunderUpdateGroup;
  authority_lang_swe: AuthorityCorporateLangGroup;
  variant_lang_eng?: VariantCorporateLangGroup;
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  identifier_type_organisationNumber?: {
    value: string;
    _type: 'organisationNumber';
    __text: { sv: string; en: string };
  };
  identifier_type_doi?: {
    value: string;
    _type: 'doi';
    __text: { sv: string; en: string };
  };
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface RelatedItemFunderProjectGroup {
  funder: {
    value: string;
    linkedRecord: {
      funder: FunderUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: 'funder';
  __text: { sv: string; en: string };
}

export type TypeOfAwardCollection =
  | 'projectGrant'
  | 'grantForEmploymentOrScholarship'
  | 'grantToResearchEnvironment'
  | 'internationalCooperation'
  | 'researchInfrastructure'
  | 'euGrant'
  | 'otherGrant';

export type CurrencyCollection = 'eur' | 'sek';

export interface DivaOutput extends BFFDataRecordData {
  output: DivaOutputGroup;
}

export type VisibilityCollection = 'published' | 'unpublished';

export interface RecordInfoOutputUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-output'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-output'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaPreview'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  visibility: {
    value: VisibilityCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  tsVisibility?: { value: string; __text: { sv: string; en: string } };
  urn?: { value: string; __text: { sv: string; en: string } };
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type DataQualityCollection = 'classic' | '2026';

export type SubcategoryOtherCollection = 'policyDocument' | 'exhibitionCatalog';

export interface LanguageGroup {
  'languageTerm_authority_iso639-2b_type_code': {
    value: LanguageCollection;
    _type: 'code';
    _authority: 'iso639-2b';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export type PublicationStatusCollection =
  | 'published'
  | 'submitted'
  | 'accepted'
  | 'inPress'
  | 'aheadOfPrint'
  | 'retracted';

export type OutputTypeArtisticWorkCollection = 'true' | 'false';

export type GenreContentTypeCollection = 'ref' | 'vet' | 'pop';

export interface TitleInfoLangGroup {
  title: { value: string; __text: { sv: string; en: string } };
  subtitle?: { value: string; __text: { sv: string; en: string } };
  _lang: LanguageCollection;
  __text: { sv: string; en: string };
}

export interface TitleInfoAlternativeLangGroup {
  title: { value: string; __text: { sv: string; en: string } };
  subtitle?: { value: string; __text: { sv: string; en: string } };
  _type: 'alternative';
  _lang: LanguageCollection;
  __text: { sv: string; en: string };
}

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
  | 'rsp'
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

export interface RoleGroup {
  roleTerm: {
    value: RoleCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}

export interface NamePersonalGroup {
  person?: {
    value: string;
    linkedRecord: {
      person: PersonUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  namePart_type_family: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  namePart_type_date?: {
    value: string;
    _type: 'date';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_orcid?: {
    value: string;
    _type: 'orcid';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  role: RoleGroup;
  affiliation?: AffiliationPersonalGroup[];
  _type: 'personal';
  __text: { sv: string; en: string };
}

export interface NameOrganisationGroup {
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  role: RoleGroup;
  namePart?: { value: string; __text: { sv: string; en: string } };
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  description?: { value: string; __text: { sv: string; en: string } };
  _type: 'corporate';
  __text: { sv: string; en: string };
}

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

export interface DurationGroup {
  hh?: { value: string; __text: { sv: string; en: string } };
  mm?: { value: string; __text: { sv: string; en: string } };
  ss?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface PhysicalDescriptionGroup {
  extent: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface DateOtherPatentGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month: { value: string; __text: { sv: string; en: string } };
  day: { value: string; __text: { sv: string; en: string } };
  _type: 'patent';
  __text: { sv: string; en: string };
}

export interface RolePatentHolderGroup {
  roleTerm: {
    value: 'pth';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NameOrganisationPatentHolderGroup {
  namePart: { value: string; __text: { sv: string; en: string } };
  role: RolePatentHolderGroup;
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  description?: { value: string; __text: { sv: string; en: string } };
  _type: 'corporate';
  __text: { sv: string; en: string };
}

export interface DateIssuedGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface CopyrightDateGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface DateOtherOnlineGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  _type: 'online';
  __text: { sv: string; en: string };
}

export interface DivaPublisher extends BFFDataRecordData {
  publisher: PublisherUpdateGroup;
}

export interface RolePublisherGroup {
  roleTerm: {
    value: 'pbl';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface AgentGroup {
  publisher?: {
    value: string;
    linkedRecord: {
      publisher: PublisherUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  namePart?: { value: string; __text: { sv: string; en: string } };
  role: RolePublisherGroup;
  __text: { sv: string; en: string };
}

export interface PlaceGroup {
  placeTerm: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface OriginInfoGroup {
  dateIssued: DateIssuedGroup;
  copyrightDate?: CopyrightDateGroup;
  dateOther_type_online?: DateOtherOnlineGroup;
  agent?: AgentGroup[];
  place?: PlaceGroup[];
  edition?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type IdentifierDisplayLabelIsbnIsmnCollection =
  | 'print'
  | 'online'
  | 'undefined'
  | 'invalid';

export interface LocationOrderLinkGroup {
  url: { value: string; __text: { sv: string; en: string } };
  displayLabel?: { value: string; __text: { sv: string; en: string } };
  _displayLabel: 'orderLink';
  __text: { sv: string; en: string };
}

export type AcademicSemesterCollection = 'ht' | 'vt';

export interface AcademicSemesterGroup {
  year: { value: string; __text: { sv: string; en: string } };
  academicSemester: {
    value: AcademicSemesterCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

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

export interface DivaCourse extends BFFDataRecordData {
  course: CourseUpdateGroup;
}

export interface RecordInfoCourseUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-course'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-course'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface RelatedCourseGroup {
  course?: {
    value: string;
    linkedRecord: {
      course: CourseUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: RelatedTypeEarlierBroaderCollection;
  __text: { sv: string; en: string };
}

export interface CourseUpdateGroup {
  recordInfo: RecordInfoCourseUpdateGroup;
  authority_lang_swe: AuthorityTopicLangGroup;
  variant_lang_eng?: VariantTopicLangGroup;
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  identifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  related?: RelatedCourseGroup[];
  __text: { sv: string; en: string };
}

export interface DivaProgramme extends BFFDataRecordData {
  programme: ProgrammeUpdateGroup;
}

export interface RecordInfoProgrammeUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-programme'; __text: { sv: string; en: string } };
  validationType: {
    value: 'diva-programme';
    __text: { sv: string; en: string };
  };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface RelatedProgrammeGroup {
  programme?: {
    value: string;
    linkedRecord: {
      programme: ProgrammeUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: RelatedTypeEarlierBroaderCollection;
  __text: { sv: string; en: string };
}

export interface ProgrammeUpdateGroup {
  recordInfo: RecordInfoProgrammeUpdateGroup;
  authority_lang_swe: AuthorityTopicLangGroup;
  variant_lang_eng?: VariantTopicLangGroup;
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  identifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  related?: RelatedProgrammeGroup[];
  __text: { sv: string; en: string };
}

export interface StudentDegreeGroup {
  degreeLevel: {
    value: DegreeLevelCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  universityPoints: {
    value: UniversityPointsCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  course?: {
    value: string;
    linkedRecord: {
      course: CourseUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  programme?: {
    value: string;
    linkedRecord: {
      programme: ProgrammeUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NameOrganisationExternalCollaborationGroup {
  namePart: { value: string; __text: { sv: string; en: string } }[];
  __text: { sv: string; en: string };
}

export interface RoleDegreeGrantingInstitutionGroup {
  roleTerm: {
    value: 'dgg';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NameOrganisationDegreeGrantingInstitutionGroup {
  organisation?: {
    value: string;
    linkedRecord: {
      organisation: OrganisationUpdateGroup;
    };
    displayName?: { sv: string; en: string };
    __text: { sv: string; en: string };
  };
  namePart?: { value: string; __text: { sv: string; en: string } };
  role: RoleDegreeGrantingInstitutionGroup;
  identifier_type_ror?: {
    value: string;
    _type: 'ror';
    __text: { sv: string; en: string };
  };
  _type: 'corporate';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface RoleThesisAdvisorGroup {
  roleTerm: {
    value: 'ths';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NamePersonalThesisAdvisorGroup {
  person?: {
    value: string;
    linkedRecord: {
      person: PersonUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  namePart_type_family: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  namePart_type_termsOfAddress?: {
    value: string;
    _type: 'termsOfAddress';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_orcid?: {
    value: string;
    _type: 'orcid';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  role: RoleThesisAdvisorGroup;
  affiliation?: AffiliationPersonalGroup[];
  _type: 'personal';
  _otherType: 'thesisAdvisor';
  __text: { sv: string; en: string };
}

export interface RoleDegreeSupervisorGroup {
  roleTerm: {
    value: 'dgs';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NamePersonalDegreeSupervisorGroup {
  person?: {
    value: string;
    linkedRecord: {
      person: PersonUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  namePart_type_family: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  namePart_type_termsOfAddress?: {
    value: string;
    _type: 'termsOfAddress';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_orcid?: {
    value: string;
    _type: 'orcid';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  role: RoleDegreeSupervisorGroup;
  affiliation?: AffiliationPersonalGroup[];
  _type: 'personal';
  _otherType: 'degreeSupervisor';
  __text: { sv: string; en: string };
}

export interface RoleOpponentGroup {
  roleTerm: {
    value: 'opn';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface NamePersonalOpponentGroup {
  person?: {
    value: string;
    linkedRecord: {
      person: PersonUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  namePart_type_family: {
    value: string;
    _type: 'family';
    __text: { sv: string; en: string };
  };
  namePart_type_given?: {
    value: string;
    _type: 'given';
    __text: { sv: string; en: string };
  };
  namePart_type_termsOfAddress?: {
    value: string;
    _type: 'termsOfAddress';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_orcid?: {
    value: string;
    _type: 'orcid';
    __text: { sv: string; en: string };
  };
  nameIdentifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  role: RoleOpponentGroup;
  affiliation?: AffiliationPersonalGroup[];
  _type: 'personal';
  _otherType: 'opponent';
  __text: { sv: string; en: string };
}

export interface DateOtherPresentationGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month: { value: string; __text: { sv: string; en: string } };
  day: { value: string; __text: { sv: string; en: string } };
  hh?: { value: string; __text: { sv: string; en: string } };
  mm?: { value: string; __text: { sv: string; en: string } };
  _type: 'presentation';
  __text: { sv: string; en: string };
}

export interface PresentationDivaGroup {
  language: LanguageGroup;
  dateOther_type_presentation: DateOtherPresentationGroup;
  location: { value: string; __text: { sv: string; en: string } };
  address?: { value: string; __text: { sv: string; en: string } };
  place?: PlaceGroup;
  __text: { sv: string; en: string };
}

export interface DefenceGroup {
  language: LanguageGroup;
  dateOther_type_presentation: DateOtherPresentationGroup;
  location: { value: string; __text: { sv: string; en: string } };
  address?: { value: string; __text: { sv: string; en: string } };
  place?: PlaceGroup;
  __text: { sv: string; en: string };
}

export interface DivaJournal extends BFFDataRecordData {
  journal: JournalUpdateGroup;
}

export interface RecordInfoJournalUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-journal'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-journal'; __text: { sv: string; en: string } };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  oldId?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface JournalUpdateGroup {
  recordInfo: RecordInfoJournalUpdateGroup;
  titleInfo: TitleInfoGroup;
  originInfo?: OriginInfoDateIssuedStartEndGroup;
  identifier_displayLabel_pissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'pissn';
    __text: { sv: string; en: string };
  };
  identifier_displayLabel_eissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'eissn';
    __text: { sv: string; en: string };
  };
  location?: LocationGroup;
  __text: { sv: string; en: string };
}

export interface DetailVolumeGroup {
  number: { value: string; __text: { sv: string; en: string } };
  _type: 'volume';
  __text: { sv: string; en: string };
}

export interface DetailIssueGroup {
  number: { value: string; __text: { sv: string; en: string } };
  _type: 'issue';
  __text: { sv: string; en: string };
}

export interface DetailArtNoGroup {
  number: { value: string; __text: { sv: string; en: string } };
  _type: 'artNo';
  __text: { sv: string; en: string };
}

export interface ExtentGroup {
  start?: { value: string; __text: { sv: string; en: string } };
  end?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface RelatedItemPartJournalGroup {
  detail_type_volume?: DetailVolumeGroup;
  detail_type_issue?: DetailIssueGroup;
  detail_type_artNo?: DetailArtNoGroup;
  extent?: ExtentGroup;
  __text: { sv: string; en: string };
}

export interface RelatedItemJournalGroup {
  journal?: {
    value: string;
    linkedRecord: {
      journal: JournalUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  titleInfo?: TitleInfoGroup;
  identifier_displayLabel_pissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'pissn';
    __text: { sv: string; en: string };
  };
  identifier_displayLabel_eissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'eissn';
    __text: { sv: string; en: string };
  };
  part?: RelatedItemPartJournalGroup;
  _type: 'journal';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface RelatedItemPartBookGroup {
  extent: ExtentGroup;
  __text: { sv: string; en: string };
}

export interface RelatedItemSeriesGroup {
  series?: {
    value: string;
    linkedRecord: {
      series: SeriesUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  titleInfo?: TitleInfoGroup;
  identifier_displayLabel_pissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'pissn';
    __text: { sv: string; en: string };
  };
  identifier_displayLabel_eissn_type_issn?: {
    value: string;
    _type: 'issn';
    _displayLabel: 'eissn';
    __text: { sv: string; en: string };
  };
  partNumber?: { value: string; __text: { sv: string; en: string } };
  _type: 'series';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface RelatedItemBookGroup {
  book?: {
    value: string;
    linkedRecord: {
      output: DivaOutputGroup;
    };

    __text: { sv: string; en: string };
  };
  titleInfo?: TitleInfoGroup;
  note_type_statementOfResponsibility?: {
    value: string;
    _type: 'statementOfResponsibility';
    __text: { sv: string; en: string };
  };
  identifier_type_isbn?: {
    value: string;
    _type: 'isbn';
    _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
    __text: { sv: string; en: string };
  }[];
  identifier_type_doi?: {
    value: string;
    _type: 'doi';
    __text: { sv: string; en: string };
  };
  'identifier_type_se-libr'?: {
    value: string;
    _type: 'se-libr';
    __text: { sv: string; en: string };
  }[];
  part?: RelatedItemPartBookGroup;
  relatedItem_type_series?: RelatedItemSeriesGroup[];
  _type: 'book';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface RelatedItemConferencePublicationGroup {
  proceeding?: {
    value: string;
    linkedRecord: {
      output: DivaOutputGroup;
    };

    __text: { sv: string; en: string };
  };
  titleInfo?: TitleInfoGroup;
  note_type_statementOfResponsibility?: {
    value: string;
    _type: 'statementOfResponsibility';
    __text: { sv: string; en: string };
  };
  identifier_type_isbn?: {
    value: string;
    _type: 'isbn';
    _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
    __text: { sv: string; en: string };
  }[];
  identifier_type_doi?: {
    value: string;
    _type: 'doi';
    __text: { sv: string; en: string };
  };
  'identifier_type_se-libr'?: {
    value: string;
    _type: 'se-libr';
    __text: { sv: string; en: string };
  }[];
  part?: RelatedItemPartJournalGroup;
  relatedItem_type_series?: RelatedItemSeriesGroup[];
  _type: 'conferencePublication';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface RelatedItemConferenceGroup {
  conference?: { value: string; __text: { sv: string; en: string } };
  _type: 'conference';
  __text: { sv: string; en: string };
}

export interface RelatedItemPublicationChannelGroup {
  publicationChannel: { value: string; __text: { sv: string; en: string } };
  _type: 'publicationChannel';
  __text: { sv: string; en: string };
}

export interface RelatedItemResearchDataGroup {
  titleInfo: TitleInfoGroup;
  identifier_type_doi?: {
    value: string;
    _type: 'doi';
    __text: { sv: string; en: string };
  };
  location?: LocationGroup[];
  _type: 'researchData';
  __text: { sv: string; en: string };
}

export interface DivaProject extends BFFDataRecordData {
  project: ProjectUpdateGroup;
}

export interface RelatedOutputGroup {
  output: {
    value: string;
    linkedRecord: {
      output: DivaOutputGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface ProjectUpdateGroup {
  recordInfo: RecordInfoProjectUpdateGroup;
  titleInfo: TitleInfoLangSweEngGroup;
  titleInfo_type_alternative?: TitleInfoAlternativeLangSweEngGroup;
  name_type_personal: NamePersonalProjectGroup[];
  name_type_corporate?: NameOrganisationProjectGroup;
  abstract?: {
    value: string;
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  subject?: SubjectKeywordsGroup[];
  subject_authority_diva?: SubjectSubjectGroup;
  classification_authority_ssif?: {
    value: SsifCollection;
    _authority: 'ssif';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  subject_authority_sdg?: SubjectSdgGroup;
  location?: LocationGroup[];
  identifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  };
  identifier_type_project: {
    value: string;
    _type: 'project';
    __text: { sv: string; en: string };
  };
  identifier_type_raid?: {
    value: string;
    _type: 'raid';
    __text: { sv: string; en: string };
  };
  identifier_type_reference?: {
    value: string;
    _type: 'reference';
    __text: { sv: string; en: string };
  };
  note_type_external?: {
    value: string;
    _type: 'external';
    __text: { sv: string; en: string };
  };
  startDate?: StartDateGroup;
  endDate?: EndDateGroup;
  relatedItem_type_funder?: RelatedItemFunderProjectGroup[];
  typeOfAward: {
    value: TypeOfAwardCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  fundingAmount?: {
    value: string;
    _currency: CurrencyCollection;
    __text: { sv: string; en: string };
  };
  related?: RelatedOutputGroup[];
  note_type_internal?: {
    value: string;
    _type: 'internal';
    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface RelatedItemProjectGroup {
  project?: {
    value: string;
    linkedRecord: {
      project: ProjectUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  titleInfo?: TitleInfoGroup;
  _type: 'project';
  _otherType: RelatedItemOtherTypeCollection;
  __text: { sv: string; en: string };
}

export interface RelatedItemFunderGroup {
  funder: {
    value: string;
    linkedRecord: {
      funder: FunderUpdateGroup;
    };

    __text: { sv: string; en: string };
  };
  identifier_type_project?: {
    value: string;
    _type: 'project';
    __text: { sv: string; en: string };
  };
  _type: 'funder';
  __text: { sv: string; en: string };
}

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

export interface RelatedItemInitiativeGroup {
  initiative: {
    value: SfoCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  _type: 'initiative';
  __text: { sv: string; en: string };
}

export interface RelatedOutputRetractedGroup {
  output: {
    value: string;
    linkedRecord: {
      output: DivaOutputGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: 'retracted';
  __text: { sv: string; en: string };
}

export interface RelatedOutputConstituentGroup {
  output: {
    value: string;
    linkedRecord: {
      output: DivaOutputGroup;
    };

    __text: { sv: string; en: string };
  };
  _type: 'constituent';
  __text: { sv: string; en: string };
}

export type AccessConditionCollection = 'gratis' | 'restricted';

export interface DivaLocalGenericMarkup extends BFFDataRecordData {
  localGenericMarkup: LocalGenericMarkupUpdateGroup;
}

export interface RecordInfoLocalGenericMarkupUpdateGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: {
    value: 'diva-localGenericMarkup';
    __text: { sv: string; en: string };
  };
  validationType: {
    value: 'diva-localGenericMarkup';
    __text: { sv: string; en: string };
  };
  dataDivider: { value: 'divaData'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface LocalGenericMarkupUpdateGroup {
  recordInfo: RecordInfoLocalGenericMarkupUpdateGroup;
  localGenericMarkup: { value: string; __text: { sv: string; en: string } };
  description?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type FailedCollection = 'true' | 'false';

export type ReviewedCollection = 'true' | 'false';

export interface AdminInfoDivaGroup {
  failed?: {
    value: FailedCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  reviewed?: {
    value: ReviewedCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  note_type_internal?: {
    value: string;
    _type: 'internal';
    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface Binary extends BFFDataRecordData {
  binary: BinaryGroup;
}

export type BinaryTypeCollection =
  | 'generic'
  | 'image'
  | 'sound'
  | 'video'
  | 'document'
  | 'text'
  | 'compressed';

export interface RecordInfoBinaryGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type?: { value: string; __text: { sv: string; en: string } };
  validationType: { value: string; __text: { sv: string; en: string } };
  dataDivider: { value: string; __text: { sv: string; en: string } };
  createdBy?: { value: string; __text: { sv: string; en: string } };
  permissionUnit?: { value: string; __text: { sv: string; en: string } }[];
  tsCreated?: { value: string; __text: { sv: string; en: string } };
  updated?: UpdatedGroup[];
  visibility: {
    value: VisibilityCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  tsVisibility?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface MasterGroup {
  originalFileName: { value: string; __text: { sv: string; en: string } };
  resourceId: { value: string; __text: { sv: string; en: string } };
  master: { id: string; mimeType: string; name: string };
  fileSize: { value: string; __text: { sv: string; en: string } };
  mimeType: { value: string; __text: { sv: string; en: string } };
  width?: { value: string; __text: { sv: string; en: string } };
  height?: { value: string; __text: { sv: string; en: string } };
  resolution?: { value: string; __text: { sv: string; en: string } };
  checksum?: { value: string; __text: { sv: string; en: string } };
  checksumType?: { value: 'SHA-512'; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface ThumbnailGroup {
  resourceId: { value: string; __text: { sv: string; en: string } };
  thumbnail: { id: string; mimeType: string; name: string };
  fileSize: { value: string; __text: { sv: string; en: string } };
  mimeType: { value: string; __text: { sv: string; en: string } };
  height: { value: string; __text: { sv: string; en: string } };
  width: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface MediumGroup {
  resourceId: { value: string; __text: { sv: string; en: string } };
  medium: { id: string; mimeType: string; name: string };
  fileSize: { value: string; __text: { sv: string; en: string } };
  mimeType: { value: string; __text: { sv: string; en: string } };
  height: { value: string; __text: { sv: string; en: string } };
  width: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface LargeGroup {
  resourceId: { value: string; __text: { sv: string; en: string } };
  large: { id: string; mimeType: string; name: string };
  fileSize: { value: string; __text: { sv: string; en: string } };
  mimeType: { value: string; __text: { sv: string; en: string } };
  height: { value: string; __text: { sv: string; en: string } };
  width: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface Jp2Group {
  resourceId: { value: string; __text: { sv: string; en: string } };
  jp2: { id: string; mimeType: string; name: string };
  fileSize: { value: string; __text: { sv: string; en: string } };
  mimeType: { value: string; __text: { sv: string; en: string } };
  height: { value: string; __text: { sv: string; en: string } };
  width: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface BinaryGroup {
  recordInfo: RecordInfoBinaryGroup;
  master?: MasterGroup;
  thumbnail?: ThumbnailGroup;
  medium?: MediumGroup;
  large?: LargeGroup;
  jp2?: Jp2Group;
  expectedFileSize?: { value: string; __text: { sv: string; en: string } };
  expectedChecksum?: { value: string; __text: { sv: string; en: string } };
  originalFileName?: { value: string; __text: { sv: string; en: string } };
  _type: BinaryTypeCollection;
  __text: { sv: string; en: string };
}

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

export type AttachmentVersionCollection =
  | 'submitted'
  | 'accepted'
  | 'published';

export type AttachmentAvailabilityCollection =
  | 'archiveOnly'
  | 'availableNow'
  | 'availableLater';

export interface DateAttachmentAvailabilityGroup {
  year: { value: string; __text: { sv: string; en: string } };
  month?: { value: string; __text: { sv: string; en: string } };
  day?: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type SecrecyCollection = 'true' | 'false';

export interface AdminInfoAttachmentGroup {
  availability: {
    value: AttachmentAvailabilityCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  dateAvailability?: DateAttachmentAvailabilityGroup;
  secrecy?: {
    value: SecrecyCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  identifier_type_registrationNumber?: {
    value: string;
    _type: 'registrationNumber';
    __text: { sv: string; en: string };
  };
  note_type_attachment?: {
    value: string;
    _type: 'attachment';
    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface AttachmentGroup {
  attachmentFile: {
    value: string;
    linkedRecord: {
      binary: BinaryGroup;
    };

    __text: { sv: string; en: string };
  };
  type: {
    value: AttachmentTypeCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  displayLabel?: { value: string; __text: { sv: string; en: string } };
  note_type_attachmentVersion: {
    value: AttachmentVersionCollection;
    _type: 'attachmentVersion';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  adminInfo: AdminInfoAttachmentGroup;
  __text: { sv: string; en: string };
}

export interface DivaOutputGroup {
  recordInfo: RecordInfoOutputUpdateGroup;
  dataQuality: {
    value: DataQualityCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  genre_type_outputType: {
    value: OutputTypeCollection;
    _type: 'outputType';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  genre_type_subcategory?: {
    value: SubcategoryOtherCollection;
    _type: 'subcategory';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  language: LanguageGroup[];
  note_type_publicationStatus?: {
    value: PublicationStatusCollection;
    _type: 'publicationStatus';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  artisticWork_type_outputType?: {
    value: OutputTypeArtisticWorkCollection;
    _type: 'outputType';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  genre_type_contentType: {
    value: GenreContentTypeCollection;
    _type: 'contentType';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  titleInfo: TitleInfoLangGroup;
  titleInfo_type_alternative?: TitleInfoAlternativeLangGroup[];
  name_type_personal?: NamePersonalGroup[];
  name_type_corporate?: NameOrganisationGroup[];
  note_type_creatorCount?: {
    value: string;
    _type: 'creatorCount';
    __text: { sv: string; en: string };
  };
  typeOfResource?: {
    value: TypeOfResourceCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  type?: {
    value: string;
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  material?: {
    value: string;
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  technique?: {
    value: string;
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  size?: { value: string; __text: { sv: string; en: string } };
  duration?: DurationGroup;
  physicalDescription?: PhysicalDescriptionGroup;
  note_type_context?: {
    value: string;
    _type: 'context';
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  abstract?: {
    value: string;
    _lang: LanguageCollection;
    __text: { sv: string; en: string };
  }[];
  subject?: SubjectKeywordsGroup[];
  dateOther_type_patent?: DateOtherPatentGroup;
  patentHolder_type_corporate?: NameOrganisationPatentHolderGroup;
  patentCountry?: {
    value: CountryCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  originInfo: OriginInfoGroup;
  classification_authority_ssif: {
    value: SsifCollection;
    _authority: 'ssif';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  subject_authority_diva?: SubjectSubjectGroup;
  subject_authority_sdg?: SubjectSdgGroup;
  identifier_type_isbn?: {
    value: string;
    _type: 'isbn';
    _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
    __text: { sv: string; en: string };
  }[];
  identifier_type_isrn?: {
    value: string;
    _type: 'isrn';
    __text: { sv: string; en: string };
  };
  identifier_type_ismn?: {
    value: string;
    _type: 'ismn';
    _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
    __text: { sv: string; en: string };
  }[];
  identifier_type_patentNumber?: {
    value: string;
    _type: 'patentNumber';
    __text: { sv: string; en: string };
  };
  identifier_type_doi?: {
    value: string;
    _type: 'doi';
    __text: { sv: string; en: string };
  };
  identifier_type_pmid?: {
    value: string;
    _type: 'pmid';
    __text: { sv: string; en: string };
  };
  identifier_type_wos?: {
    value: string;
    _type: 'wos';
    __text: { sv: string; en: string };
  };
  identifier_type_scopus?: {
    value: string;
    _type: 'scopus';
    __text: { sv: string; en: string };
  };
  identifier_type_openAlex?: {
    value: string;
    _type: 'openAlex';
    __text: { sv: string; en: string };
  };
  'identifier_type_se-libr'?: {
    value: string;
    _type: 'se-libr';
    __text: { sv: string; en: string };
  }[];
  identifier_type_archiveNumber?: {
    value: string;
    _type: 'archiveNumber';
    __text: { sv: string; en: string };
  };
  identifier_type_localId?: {
    value: string;
    _type: 'localId';
    __text: { sv: string; en: string };
  }[];
  location?: LocationGroup[];
  location_displayLabel_orderLink?: LocationOrderLinkGroup;
  note_type_external?: {
    value: string;
    _type: 'external';
    __text: { sv: string; en: string };
  };
  academicSemester?: AcademicSemesterGroup;
  studentDegree?: StudentDegreeGroup[];
  externalCollaboration?: NameOrganisationExternalCollaborationGroup;
  degreeGrantingInstitution_type_corporate?: NameOrganisationDegreeGrantingInstitutionGroup;
  name_otherType_thesisAdvisor_type_personal?: NamePersonalThesisAdvisorGroup[];
  name_otherType_degreeSupervisor_type_personal?: NamePersonalDegreeSupervisorGroup[];
  name_otherType_opponent_type_personal?: NamePersonalOpponentGroup[];
  presentation?: PresentationDivaGroup;
  defence?: DefenceGroup;
  relatedItem_type_journal?: RelatedItemJournalGroup;
  relatedItem_type_book?: RelatedItemBookGroup;
  relatedItem_type_conferencePublication?: RelatedItemConferencePublicationGroup;
  relatedItem_type_conference?: RelatedItemConferenceGroup;
  relatedItem_type_publicationChannel?: RelatedItemPublicationChannelGroup;
  relatedItem_type_series?: RelatedItemSeriesGroup[];
  relatedItem_type_researchData?: RelatedItemResearchDataGroup[];
  relatedItem_type_project?: RelatedItemProjectGroup[];
  relatedItem_type_funder?: RelatedItemFunderGroup[];
  relatedItem_type_initiative?: RelatedItemInitiativeGroup;
  related?: RelatedOutputGroup[];
  related_type_retracted?: RelatedOutputRetractedGroup[];
  related_type_constituent?: RelatedOutputConstituentGroup[];
  'accessCondition_authority_kb-se'?: {
    value: AccessConditionCollection;
    _authority: 'kb.se';
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  localGenericMarkup?: {
    value: string;
    linkedRecord: {
      localGenericMarkup: LocalGenericMarkupUpdateGroup;
    };

    __text: { sv: string; en: string };
  }[];
  adminInfo?: AdminInfoDivaGroup;
  attachment?: AttachmentGroup[];
  __text: { sv: string; en: string };
}

export interface RecordInfoMemberGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: 'diva-member'; __text: { sv: string; en: string } };
  validationType: { value: 'diva-member'; __text: { sv: string; en: string } };
  dataDivider: { value: 'diva'; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  permissionUnit: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedDivaGroup[];
  __text: { sv: string; en: string };
}

export interface ThemeLinkSweGroup {
  url: { value: string; __text: { sv: string; en: string } };
  displayLabel: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface ThemeLinkEngGroup {
  url: { value: string; __text: { sv: string; en: string } };
  displayLabel: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export interface ThemeLinkAdminGroup {
  linkSv: ThemeLinkSweGroup;
  linkEn: ThemeLinkEngGroup;
  __text: { sv: string; en: string };
}

export interface ThemeLinkPublicGroup {
  linkSv: ThemeLinkSweGroup;
  linkEn: ThemeLinkEngGroup;
  __text: { sv: string; en: string };
}

export interface LoginUnit extends BFFDataRecordData {
  loginUnit: LoginUnitGroup;
}

export interface Login extends BFFDataRecordData {
  login: LoginGroup;
}

export type LoginTypeCollection = 'webRedirect' | 'token' | 'password';

export interface Metadata extends BFFDataRecordData {
  metadata: MetadataGroup;
}

export type MetadataTypeCollection =
  | 'group'
  | 'textVariable'
  | 'numberVariable'
  | 'recordLink'
  | 'itemCollection'
  | 'collectionItem'
  | 'collectionVariable'
  | 'resourceLink';

export interface AttributeReferencesGroup {
  ref: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}

export interface RecordType extends BFFDataRecordData {
  recordType: RecordTypeGroup;
}

export interface UniqueGroup {
  uniqueTerm: {
    value: string;
    linkedRecord: {
      collectTerm: CollectTermGroup;
    };

    __text: { sv: string; en: string };
  };
  combineTerm?: {
    value: string;
    linkedRecord: {
      collectTerm: CollectTermGroup;
    };

    __text: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}

export interface Presentation extends BFFDataRecordData {
  presentation: PresentationGroup;
}

export type PresentationTypeCollection =
  | 'pGroup'
  | 'pVar'
  | 'pNumVar'
  | 'container'
  | 'pRecordLink'
  | 'pCollVar'
  | 'pResourceLink';

export interface PresentationsOfGroup {
  presentationOf: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}

export type AttributesToShowCollection = 'all' | 'selectable' | 'none';

export type ModeCollection = 'input' | 'output';

export type RepeatCollection = 'this' | 'children';

export type TextStyleItemCollection =
  | 'h1TextStyle'
  | 'h2TextStyle'
  | 'h3TextStyle'
  | 'h4TextStyle'
  | 'h5TextStyle'
  | 'h6TextStyle'
  | 'bodyTextStyle'
  | 'italicTextStyle'
  | 'boldTextStyle'
  | 'labelTextStyle'
  | 'specificationTextStyle'
  | 'specificationNormalTextStyle'
  | 'labelSquareBracketTextStyle';

export type ChildStyleItemCollection =
  | 'zeroChildStyle'
  | 'oneChildStyle'
  | 'twoChildStyle'
  | 'threeChildStyle'
  | 'fourChildStyle'
  | 'fiveChildStyle'
  | 'sixChildStyle'
  | 'sevenChildStyle'
  | 'eightChildStyle'
  | 'nineChildStyle'
  | 'tenChildStyle'
  | 'elevenChildStyle'
  | 'twelveChildStyle'
  | 'compactChildStyle'
  | 'frameChildStyle'
  | 'blockChildStyle'
  | 'specificationChildStyle'
  | 'rowBasedChildStyle';

export interface GuiElement extends BFFDataRecordData {
  guiElement: GuiElementGroup;
}

export type PresentationTypeGuiElementCollection =
  | 'guiElementLink'
  | 'guiElement';

export type GuiElementPresentAsCollection = 'link' | 'image';

export interface GuiElementGroup {
  recordInfo: RecordInfoGroup;
  url: { value: string; __text: { sv: string; en: string } };
  elementText: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  presentAs: {
    value: GuiElementPresentAsCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  _type: PresentationTypeGuiElementCollection;
  __text: { sv: string; en: string };
}

export interface PresentationRefGroup {
  ref_type_text?: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    _type: 'text';
    __text: { sv: string; en: string };
  };
  ref_type_presentation?: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    _type: 'presentation';
    __text: { sv: string; en: string };
  };
  ref_type_guiElement?: {
    value: string;
    linkedRecord: {
      guiElement: GuiElementGroup;
    };

    _type: 'guiElement';
    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export type PresentationSizeCollection =
  | 'firstSmaller'
  | 'firstLarger'
  | 'bothEqual'
  | 'singleInitiallyHidden'
  | 'singleInitiallyVisible';

export type SpecifiedHeadlineLevelCollection =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export interface PresentationChildReferenceGroup {
  textStyle?: {
    value: TextStyleItemCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  childStyle?: {
    value: ChildStyleItemCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  refGroup: PresentationRefGroup[];
  minNumberOfRepeatingToShow?: {
    value: string;
    __text: { sv: string; en: string };
  };
  presentationSize?: {
    value: PresentationSizeCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  title?: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  titleHeadlineLevel?: {
    value: SpecifiedHeadlineLevelCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  addText?: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface PresentationChildReferencesGroup {
  childReference: PresentationChildReferenceGroup[];
  __text: { sv: string; en: string };
}

export type PresentationStyleCollection =
  | 'frame'
  | 'inline'
  | 'specification'
  | 'highlight'
  | 'rowBased';

export type OutputFormatCollection =
  | 'text'
  | 'image'
  | 'link'
  | 'video'
  | 'sound'
  | 'download';

export type InputTypeItemCollection = 'input' | 'textarea';

export type InputFormatCollection = 'password';

export interface LinkedRecordPresentationGroup {
  presentedRecordType: {
    value: string;
    linkedRecord: {
      recordType: RecordTypeGroup;
    };

    __text: { sv: string; en: string };
  };
  presentation: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface LinkedRecordPresentationsGroup {
  linkedRecordPresentation: LinkedRecordPresentationGroup[];
  __text: { sv: string; en: string };
}

export interface Search extends BFFDataRecordData {
  search: SearchGroup;
}

export type SearchGroupCollection = 'autocomplete' | 'publicSearch';

export interface SearchGroup {
  recordInfo: RecordInfoGroup;
  metadataId: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  presentationId: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  recordTypeToSearchIn: {
    value: string;
    linkedRecord: {
      recordType: RecordTypeGroup;
    };

    __text: { sv: string; en: string };
  }[];
  searchGroup: {
    value: SearchGroupCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  textId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  defTextId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  searchResultPresentation?: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export type PresentAsCollection =
  | 'map'
  | 'recordRelation'
  | 'externalLinkWithValue'
  | 'onlyTranslatedText'
  | 'permissionUnit';

export interface PresentationGroup {
  recordInfo: RecordInfoGroup;
  presentationsOf?: PresentationsOfGroup;
  attributesToShow?: {
    value: AttributesToShowCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  presentationOf?: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  mode?: {
    value: ModeCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  repeat?: {
    value: RepeatCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  childReferences?: PresentationChildReferencesGroup;
  presentationStyle?: {
    value: PresentationStyleCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  emptyTextId?: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  outputFormat?: {
    value: OutputFormatCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  inputType?: {
    value: InputTypeItemCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  inputFormat?: {
    value: InputFormatCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  linkedRecordPresentations?: LinkedRecordPresentationsGroup;
  search?: {
    value: string;
    linkedRecord: {
      search: SearchGroup;
    };

    __text: { sv: string; en: string };
  };
  presentAs?: {
    value: PresentAsCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  showLabel?: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  specifiedLabelText?: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  showHeadline?: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  specifiedHeadlineText?: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  specifiedHeadlineLevel?: {
    value: SpecifiedHeadlineLevelCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  _type: PresentationTypeCollection;
  __text: { sv: string; en: string };
}

export type IdSourceCollection = 'userSupplied' | 'timestamp' | 'sequence';

export interface Sequence extends BFFDataRecordData {
  sequence: SequenceGroup;
}

export interface RecordInfoSequenceGroup {
  id: { value: string; __text: { sv: string; en: string } };
  type: { value: string; __text: { sv: string; en: string } };
  validationType: { value: 'sequence'; __text: { sv: string; en: string } };
  dataDivider: { value: string; __text: { sv: string; en: string } };
  createdBy: { value: string; __text: { sv: string; en: string } };
  tsCreated: { value: string; __text: { sv: string; en: string } };
  updated: UpdatedGroup[];
  __text: { sv: string; en: string };
}

export interface SequenceGroup {
  recordInfo: RecordInfoSequenceGroup;
  currentNumber: { value: string; __text: { sv: string; en: string } };
  __text: { sv: string; en: string };
}

export type GroupOfRecordTypeCollection =
  | 'publicationType'
  | 'controlledLists'
  | 'typeOfResource'
  | 'authority'
  | 'metadata'
  | 'presentation'
  | 'search'
  | 'permission'
  | 'systemConfiguration'
  | 'other';

export type RecordTypeCategoryCollection =
  | 'clientNavigation'
  | 'categoryOne'
  | 'categoryTwo'
  | 'categoryThree';

export interface RecordTypeGroup {
  recordInfo: RecordInfoGroup;
  metadataId: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  unique?: UniqueGroup[];
  presentationViewId: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  menuPresentationViewId: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  listPresentationViewId: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  textId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  defTextId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  search?: {
    value: string;
    linkedRecord: {
      search: SearchGroup;
    };

    __text: { sv: string; en: string };
  };
  idSource: {
    value: IdSourceCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  sequence?: {
    value: string;
    linkedRecord: {
      sequence: SequenceGroup;
    };

    __text: { sv: string; en: string };
  };
  autocompletePresentationView?: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  groupOfRecordType: {
    value: GroupOfRecordTypeCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  filter?: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  filterPresentation?: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  public: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  recordTypeCategory?: {
    value: RecordTypeCategoryCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  }[];
  indexSettings?: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  storeInArchive: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  usePermissionUnit: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  useVisibility: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  useTrashBin: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export type RecordPartConstraintCollection = 'write' | 'readWrite';

export interface ChildReferenceGroup {
  repeatMin: { value: string; __text: { sv: string; en: string } };
  repeatMinKey?: { value: string; __text: { sv: string; en: string } };
  repeatMax: { value: string; __text: { sv: string; en: string } };
  ref: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  childRefCollectTerm_type_index?: {
    value: string;
    linkedRecord: {
      collectTerm: CollectTermGroup;
    };

    _type: 'index';
    __text: { sv: string; en: string };
  }[];
  childRefCollectTerm_type_permission?: {
    value: string;
    linkedRecord: {
      collectTerm: CollectTermGroup;
    };

    _type: 'permission';
    __text: { sv: string; en: string };
  };
  childRefCollectTerm_type_storage?: {
    value: string;
    linkedRecord: {
      collectTerm: CollectTermGroup;
    };

    _type: 'storage';
    __text: { sv: string; en: string };
  };
  recordPartConstraint?: {
    value: RecordPartConstraintCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface ChildReferencesGroup {
  childReference: ChildReferenceGroup[];
  __text: { sv: string; en: string };
}

export interface CollectionItemReferencesGroup {
  ref: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}

export type ExtraDataTypeCollection = 'undefined';

export interface CollectionItemExtraDataPartGroup {
  value: { value: string; __text: { sv: string; en: string } };
  _type: ExtraDataTypeCollection;
  __text: { sv: string; en: string };
}

export interface CollectionItemExtraDataGroup {
  extraDataPart?: CollectionItemExtraDataPartGroup[];
  __text: { sv: string; en: string };
}

export interface MetadataGroup {
  recordInfo: RecordInfoGroup;
  nameInData: { value: string; __text: { sv: string; en: string } };
  textId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  defTextId: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  attributeReferences?: AttributeReferencesGroup;
  linkedRecordType?: {
    value: string;
    linkedRecord: {
      recordType: RecordTypeGroup;
    };

    __text: { sv: string; en: string };
  };
  refParentId?: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  finalValue?: { value: string; __text: { sv: string; en: string } };
  regEx?: { value: string; __text: { sv: string; en: string } };
  childReferences?: ChildReferencesGroup;
  excludePGroupCreation?: {
    value: TrueFalseCollection;
    __text: { sv: string; en: string };
    __valueText: { sv: string; en: string };
  };
  min?: { value: string; __text: { sv: string; en: string } };
  max?: { value: string; __text: { sv: string; en: string } };
  warningMin?: { value: string; __text: { sv: string; en: string } };
  warningMax?: { value: string; __text: { sv: string; en: string } };
  numberOfDecimals?: { value: string; __text: { sv: string; en: string } };
  refCollection?: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  collectionItemReferences?: CollectionItemReferencesGroup;
  extraData?: CollectionItemExtraDataGroup;
  _type: MetadataTypeCollection;
  __text: { sv: string; en: string };
}

export interface LoginGroup {
  recordInfo: RecordInfoGroup;
  url?: { value: string; __text: { sv: string; en: string } };
  loginName?: { value: string; __text: { sv: string; en: string } };
  viewDefinition?: {
    value: string;
    linkedRecord: {
      metadata: MetadataGroup;
    };

    __text: { sv: string; en: string };
  };
  viewPresentation?: {
    value: string;
    linkedRecord: {
      presentation: PresentationGroup;
    };

    __text: { sv: string; en: string };
  };
  description?: { value: string; __text: { sv: string; en: string } };
  _type: LoginTypeCollection;
  __text: { sv: string; en: string };
}

export interface LoginUnitLoginInfoGroup {
  login: {
    value: string;
    linkedRecord: {
      login: LoginGroup;
    };

    __text: { sv: string; en: string };
  };
  loginDescription: {
    value: string;
    linkedRecord: {
      text: TextGroup;
    };

    __text: { sv: string; en: string };
  };
  __text: { sv: string; en: string };
}

export interface LoginUnitGroup {
  recordInfo: RecordInfoGroup;
  loginInfo: LoginUnitLoginInfoGroup;
  __text: { sv: string; en: string };
}

export interface DivaMemberGroup {
  recordInfo: RecordInfoMemberGroup;
  memberPermissionUnit?: {
    value: string;
    linkedRecord: {
      permissionUnit: PermissionUnitGroup;
    };

    __text: { sv: string; en: string };
  };
  backgroundColor: { value: string; __text: { sv: string; en: string } };
  textColor: { value: string; __text: { sv: string; en: string } };
  backgroundColorDarkMode?: {
    value: string;
    __text: { sv: string; en: string };
  };
  textColorDarkMode?: { value: string; __text: { sv: string; en: string } };
  logoSvg: { value: string; __text: { sv: string; en: string } };
  linkAdmin?: ThemeLinkAdminGroup[];
  linkPublic?: ThemeLinkPublicGroup[];
  pageTitleSv: { value: string; __text: { sv: string; en: string } };
  pageTitleEn: { value: string; __text: { sv: string; en: string } };
  hostname: { value: string; __text: { sv: string; en: string } }[];
  loginUnit: {
    value: string;
    linkedRecord: {
      loginUnit: LoginUnitGroup;
    };

    __text: { sv: string; en: string };
  }[];
  __text: { sv: string; en: string };
}
