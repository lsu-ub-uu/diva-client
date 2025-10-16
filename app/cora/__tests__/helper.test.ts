import { describe, expect, it, vi } from 'vitest';
import { coraBinaryUrl } from '../helper.server';
import type { Auth } from '@/auth/Auth';

describe('helper', () => {
  describe('url', () => {
    it('returns url with auth', () => {
      vi.stubEnv('CORA_API_URL', 'http://cora.api');

      const auth = { data: { token: '1234' } } as Auth;
      const actual = coraBinaryUrl({
        id: 'binary:123',
        name: 'master',
        auth,
      });

      expect(actual).toBe(
        'http://cora.api/record/binary/binary:123/master?authToken=1234',
      );
    });

    it('returns url without auth', () => {
      vi.stubEnv('CORA_API_URL', 'http://cora.api');

      const auth = undefined;
      const actual = coraBinaryUrl({
        id: 'binary:123',
        name: 'master',
        auth,
      });
      expect(actual).toBe('http://cora.api/record/binary/binary:123/master');
    });
  });
});
