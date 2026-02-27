import coraRecordType from '@/__mocks__/bff/coraDivaRecordTypes.json';
import coraLoginUnit from '@/__mocks__/bff/coraLoginUnit.json';
import coraLoginWebRedirect from '@/__mocks__/bff/coraLoginWebRedirect.json';
import testMetaData from '@/__mocks__/bff/coraMetadata.json';
import coraOrganisations from '@/__mocks__/bff/coraOrganisationList.json';
import coraPresentationGroup from '@/__mocks__/bff/coraPresentationGroup.json';
import coraGuiElements from '@/__mocks__/bff/coraPresentationGuiElement.json';
import coraSearch from '@/__mocks__/bff/coraSearch.json';
import coraTexts from '@/__mocks__/bff/coraTextWithOneChild.json';
import coraMembers from '@/__mocks__/bff/divaMemberListWithSvgLogo.json';
import coraValidationType from '@/__mocks__/bff/validationTypeList.json';
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import type { AxiosResponse } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import type { Lookup } from '../util/lookup';

// Helper get fresh module with empty cache in each test
const importDependenciesModule = async () => {
  vi.resetModules();
  return await import('../depencencies');
};

vi.mock('@/cora/getRecordDataListByType.server');
vi.mock('@/cora/getRecordDataById.server');
vi.mock('@/cora/getDeploymentInfo.server');
vi.mock('@/cora/getRecordDataListByType.server');

const testDataByRecordTypeId: Record<string, DataListWrapper> = {
  text: coraTexts,
  metadata: testMetaData,
  presentation: coraPresentationGroup,
  validationType: coraValidationType,
  guiElement: coraGuiElements,
  recordType: coraRecordType,
  search: coraSearch,
  loginUnit: coraLoginUnit,
  login: coraLoginWebRedirect,
  'diva-member': coraMembers,
  'diva-organisation': coraOrganisations as DataListWrapper,
};

const setUpMocks = () => {
  const mockGetRecordDataListByType = async (type: string) => {
    if (type === 'text') {
      return {
        data: coraTexts as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'metadata') {
      return {
        data: testMetaData as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'presentation') {
      return {
        data: coraPresentationGroup as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'validationType') {
      return {
        data: coraValidationType as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'recordType') {
      return {
        data: coraRecordType as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'search') {
      return {
        data: coraSearch as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'loginUnit') {
      return {
        data: coraLoginUnit as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'login') {
      return {
        data: coraLoginWebRedirect as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'diva-member') {
      return {
        data: coraMembers as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'diva-organisation') {
      return {
        data: coraOrganisations as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    if (type === 'guiElement') {
      return {
        data: coraGuiElements as DataListWrapper,
      } as AxiosResponse<DataListWrapper>;
    }
    return {
      data: {},
    } as AxiosResponse<DataListWrapper>;
  };
  vi.mocked(getRecordDataListByType).mockImplementation(
    mockGetRecordDataListByType,
  );
};

describe('dependencies', () => {
  describe('getDependencies', () => {
    it('should load dependencies when not initialized', async () => {
      const { getDependencies } = await importDependenciesModule();

      setUpMocks();

      await getDependencies();

      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith('text');
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'metadata',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'presentation',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'validationType',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'guiElement',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'recordType',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith('search');
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'loginUnit',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith('login');
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'diva-member',
      );
      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledWith(
        'diva-organisation',
      );
    });

    it('should return cached dependencies when already initialized', async () => {
      const { getDependencies } = await importDependenciesModule();

      setUpMocks();
      await getDependencies();

      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledTimes(11);

      await getDependencies();

      expect(vi.mocked(getRecordDataListByType)).toHaveBeenCalledTimes(11);
    });
  });

  describe('handleDataChanged', () => {
    it('handles delete', async () => {
      const { getDependencies, handleDataChanged } =
        await importDependenciesModule();

      setUpMocks();
      const dependencies = await getDependencies();

      handleDataChanged({
        type: 'text',
        id: 'someRecordId',
        action: 'delete',
        messagingId: '1234',
      });

      expect(dependencies.textPool.has('someRecordId')).toBe(false);
    });

    it('handles update', async () => {
      const { getDependencies, handleDataChanged } =
        await importDependenciesModule();

      setUpMocks();

      const dependencies = await getDependencies();
      const oldValue = Array.from(dependencies.textPool.values())[0];

      vi.mocked(getRecordDataById).mockResolvedValueOnce({
        data: coraTexts.dataList.data[0] as RecordWrapper,
      } as AxiosResponse<RecordWrapper>);

      await handleDataChanged({
        type: 'text',
        id: 'someRecordId',
        action: 'update',
        messagingId: '1234',
      });

      expect(getRecordDataById).toHaveBeenCalledWith('text', 'someRecordId');

      const newValue = dependencies.textPool.get('someRecordId');
      expect(newValue).not.toBe(oldValue);
    });
  });

  it.each([
    ['text', 'someText', 'textPool'],
    ['metadata', 'someTextVar', 'metadataPool'],
    ['presentation', 'someNewPGroup', 'presentationPool'],
    ['validationType', 'someValidationTypeId', 'validationTypePool'],
    ['guiElement', 'demoTestLinkGuiElement', 'presentationPool'],
    ['recordType', 'someId', 'recordTypePool'],
    ['validationType', 'someValidationTypeId', 'validationTypePool'],
    ['search', 'personSearch', 'searchPool'],
    ['loginUnit', 'someLoginUnitId', 'loginUnitPool'],
    ['login', 'someLoginUnitId', 'loginPool'],
    ['diva-member', 'uu-theme', 'memberPool'],
    [
      'diva-organisation',
      'diva-organisation:19263605242540875',
      'organisationPool',
    ],
  ])(
    'handles update with correct transformation for recordType %s',
    async (recordType, recordId, poolName) => {
      const { getDependencies, handleDataChanged } =
        await importDependenciesModule();

      setUpMocks();

      const dependencies = await getDependencies();
      const pool = dependencies[
        poolName as keyof typeof dependencies
      ] as Lookup<string, any>;
      const oldValue = pool.get(recordId);

      vi.mocked(getRecordDataById).mockResolvedValueOnce({
        data: testDataByRecordTypeId[recordType].dataList
          .data[0] as RecordWrapper,
      } as AxiosResponse<RecordWrapper>);

      await handleDataChanged({
        action: 'update',
        type: recordType,
        id: recordId,
        messagingId: '1234',
      });
      expect(getRecordDataById).toHaveBeenCalledWith(recordType, recordId);

      const newValue = pool.get(recordId);
      expect(newValue).not.toBe(oldValue);
    },
  );
});
