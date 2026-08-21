import {
  coraBinaryUrl,
  getFetchRequestFromActionLink,
} from '@/cora/helper.server';
import type { ActionLink } from '@/cora/cora-data/types.server';
import type { Auth } from '@/auth/Auth';
import { describe, expect, it, vi } from 'vitest';

describe('helper', () => {
  describe('coraBinaryUrl', () => {
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

  describe('getFetchRequestFromActionLink', () => {
    it('maps method and url from action link', () => {
      const actionLink: ActionLink = {
        rel: 'renew',
        requestMethod: 'POST',
        url: 'https://example.com/auth/renew',
      };

      const result = getFetchRequestFromActionLink(actionLink, undefined);

      expect(result).toMatchObject({
        method: 'POST',
        url: 'https://example.com/auth/renew',
      });
    });

    it('includes Accept header from action link accept field', () => {
      const actionLink: ActionLink = {
        rel: 'renew',
        requestMethod: 'POST',
        url: 'https://example.com/auth/renew',
        accept: 'application/vnd.cora.authentication+json',
      };

      const result = getFetchRequestFromActionLink(actionLink, undefined);

      expect(result.headers).toMatchObject({
        Accept: 'application/vnd.cora.authentication+json',
      });
    });

    it('includes Content-Type header from action link contentType field', () => {
      const actionLink: ActionLink = {
        rel: 'update',
        requestMethod: 'PUT',
        url: 'https://example.com/record/1',
        contentType: 'application/vnd.cora.record+json',
      };

      const result = getFetchRequestFromActionLink(actionLink, undefined);

      expect(result.headers).toMatchObject({
        'Content-Type': 'application/vnd.cora.record+json',
      });
    });

    it('adds Authtoken header when authToken is provided', () => {
      const actionLink: ActionLink = {
        rel: 'renew',
        requestMethod: 'POST',
        url: 'https://example.com/auth/renew',
      };

      const result = getFetchRequestFromActionLink(
        actionLink,
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      );

      expect(result.headers).toMatchObject({
        Authtoken: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      });
    });

    it('omits Authtoken header when authToken is undefined', () => {
      const actionLink: ActionLink = {
        rel: 'renew',
        requestMethod: 'POST',
        url: 'https://example.com/auth/renew',
      };

      const result = getFetchRequestFromActionLink(actionLink, undefined);

      expect(result.headers).not.toHaveProperty('Authtoken');
    });

    it('includes body from action link as JSON string', () => {
      const body = {
        name: 'someGroup',
        children: [{ name: 'someAtom', value: 'someValue' }],
      };
      const actionLink: ActionLink = {
        rel: 'update',
        requestMethod: 'POST',
        url: 'https://example.com/record/1',
        body,
      };

      const result = getFetchRequestFromActionLink(actionLink, undefined);

      expect(result.body).toBe(JSON.stringify(body));
    });

    it('sets body to undefined when action link has no body', () => {
      const actionLink: ActionLink = {
        rel: 'renew',
        requestMethod: 'POST',
        url: 'https://example.com/auth/renew',
      };

      const result = getFetchRequestFromActionLink(actionLink, undefined);

      expect(result.body).toBeUndefined();
    });
  });
});
