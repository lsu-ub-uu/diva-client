import type { Lookup } from '@/utils/structs/lookup';
import type {
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';

export interface Dependencies {
  validationTypePool: Lookup<string, BFFValidationType>;
  metadataPool: Lookup<string, BFFMetadata>;
  presentationPool: Lookup<string, BFFPresentation>;
  textPool: Lookup<string, BFFText>;
  recordTypePool: Lookup<string, BFFRecordType>;
  searchPool: Lookup<string, BFFSearch>;
  loginUnitPool: Lookup<string, BFFLoginUnit>;
  loginPool: Lookup<string, BFFLoginWebRedirect | BFFLoginPassword>;
}
