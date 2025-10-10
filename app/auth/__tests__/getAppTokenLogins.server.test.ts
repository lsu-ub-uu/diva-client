import { expect, vi } from 'vitest';
import { describe, it } from 'vitest';
import { getAppTokenLogins } from '../getAppTokenLogins.server';

describe('getAppTokenLogins', () => {
  it('returns empty array when no APP_TOKEN_USERS is set', () => {
    vi.stubEnv('APP_TOKEN_USERS', undefined);
    expect(getAppTokenLogins()).toEqual([]);
  });

  it('returns empty array when APP_TOKEN_USERS is invalid JSON', () => {
    vi.stubEnv('APP_TOKEN_USERS', 'invalid-json');
    expect(getAppTokenLogins()).toEqual([]);
  });

  it('returns array of app token logins when APP_TOKEN_USERS is valid JSON', () => {
    const appTokenUsers = [
      {
        displayName: 'Test User',
        loginId: 'test-user',
        appToken: 'test-token',
      },
    ];
    vi.stubEnv('APP_TOKEN_USERS', JSON.stringify(appTokenUsers));
    expect(getAppTokenLogins()).toEqual(appTokenUsers);
  });
});
