import { Record } from './Record';

export type Name = {
  familyName: string;
  givenName: string;
};

export type ExternalUrl = {
  linkTitle: string;
  URL: string;
};

export type Affiliation = {
  name: string;
  fromYear?: string;
  untilYear?: string;
};

export interface Person extends Record {
  public: string;
  domains?: string[];
  authorisedName?: Name;
  academicTitle?: string;
  yearOfBirth?: string;
  yearOfDeath?: string;
  emailAddress?: string;
  alternativeNames?: Name[];
  externalURLs?: ExternalUrl[];
  otherAffiliation?: Affiliation;
  orcids?: string[];
  viafIDs?: string[];
  librisIDs?: string[];
  biographyEnglish?: string;
  biographySwedish?: string;
  personDomainParts: {
    recordId: string;
  }[];
}
