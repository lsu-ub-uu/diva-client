import type { Auth } from '@/auth/Auth';
import type { Dependencies } from './formDefinition/formDefinitionsDep.server';
import { getRecordByRecordTypeAndRecordId } from './getRecordByRecordTypeAndRecordId.server';
import type { BFFDataRecord, BFFDataRecordData } from '@/types/record';
import type { DataAtomic, RecordLink } from '@/cora/cora-data/types.server';

interface BFFDataAtomic {
  value: string;
}

interface DivaOutputData {
  recordInfo: {
    id: BFFDataAtomic;
    type: BFFDataAtomic;

    validationType: BFFDataAtomic;
    dataDivider: BFFDataAtomic;
    createdBy: BFFDataAtomic;
    tsCreated: BFFDataAtomic;
    updated: {
      updatedBy: BFFDataAtomic;
      tsUpdated: BFFDataAtomic;
    }[];
    permissionUnit: BFFDataAtomic;
    visibility: BFFDataAtomic;
    tsVisibility: [BFFDataAtomic] | undefined;
    urn: [BFFDataAtomic] | undefined;
    oldId: [BFFDataAtomic] | undefined;
  };
  genre_type_outputType: {
    value: string;
    _type: 'outputType';
  };
  genre_type_subcategory: {
    value: 'policyDocument' | 'exhibitionCatalog';
    _type: 'subcategory';
  };
  language: [
    {
      'languageTerm_authority_iso639-2b_type_code': {
        value: string;
        _authority: 'iso639-2b';
        _type: 'code';
      };
    },
  ];
  note_type_publicationStatus:
    | [
        {
          value:
            | 'submitted'
            | 'accepted'
            | 'inPress'
            | 'aheadOfPrint'
            | 'retracted';
          _type: 'publicationStatus';
        },
      ]
    | undefined;
  artisticWork_type_outputType: {
    value: string;
    _type: 'outputType';
  };
}

interface DivaOutput extends BFFDataRecord {
  recordType: 'diva-output';
  data: DivaOutputData;
}

export const getDivaOutput = async (
  dependencies: Dependencies,
  recordId: string,
  auth: Auth | undefined,
) => {
  const data = await getRecordByRecordTypeAndRecordId({
    dependencies,
    recordId,
    recordType: 'divaOutput',
    authToken: auth?.data.token,
  });

  return data;
};
