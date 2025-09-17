import type {
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFOrganisation,
  BFFPresentation,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFTheme,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import type { Lookup } from '@/utils/structs/lookup';

export interface Dependencies {
  validationTypePool: Lookup<string, BFFValidationType>;
  metadataPool: Lookup<string, BFFMetadata>;
  presentationPool: Lookup<string, BFFPresentation>;
  textPool: Lookup<string, BFFText>;
  recordTypePool: Lookup<string, BFFRecordType>;
  searchPool: Lookup<string, BFFSearch>;
  loginUnitPool: Lookup<string, BFFLoginUnit>;
  loginPool: Lookup<string, BFFLoginWebRedirect | BFFLoginPassword>;
  themePool: Lookup<string, BFFTheme>;
  organisationPool: Lookup<string, BFFOrganisation>;
}
