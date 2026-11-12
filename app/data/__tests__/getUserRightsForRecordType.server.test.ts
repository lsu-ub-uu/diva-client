import type { Auth } from '@/auth/Auth';
import type {
  ActionLink,
  CoraRecord,
  DataGroup,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import type { HttpResponse } from '@/cora/httpClient.server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getUserRightsForRecordType } from '../getUserRightsForRecordType.server';

vi.mock('@/cora/getRecordDataById.server');

const createResponse = (actionLinks?: CoraRecord['actionLinks']) =>
  ({
    data: {
      record: {
        data: {} as DataGroup,
        ...(actionLinks ? { actionLinks } : {}),
      } as CoraRecord,
    } as RecordWrapper,
  }) as HttpResponse<RecordWrapper>;

describe('getUserRightsForRecordType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(['create', 'index', 'search', 'list', 'batch_index', 'validate'])(
    'returns %s when its action link exists and ignores unsupported links',
    async (actionLinkKey) => {
      const auth = { data: { token: 'test-token' } } as Auth;
      vi.mocked(getRecordDataById).mockResolvedValue(
        createResponse({
          [actionLinkKey]: { url: `/${actionLinkKey}` } as ActionLink,
          update: { url: '/update' } as ActionLink,
          read: { url: '/read' } as ActionLink,
        }),
      );

      const userRights = await getUserRightsForRecordType(
        'someRecordType',
        auth,
      );

      expect(userRights).toEqual([actionLinkKey]);
      expect(getRecordDataById).toHaveBeenCalledWith(
        'recordType',
        'someRecordType',
        'test-token',
      );
    },
  );

  it('returns an empty list when action links are missing', async () => {
    vi.mocked(getRecordDataById).mockResolvedValue(createResponse());

    const userRights = await getUserRightsForRecordType('someRecordType');

    expect(userRights).toEqual([]);
    expect(getRecordDataById).toHaveBeenCalledWith(
      'recordType',
      'someRecordType',
      undefined,
    );
  });
});
