import { createUser } from '../createUser';
import { describe, expect, it } from 'vitest';
import { createMockAuth } from '../__mocks__/auth';

describe('createUser', () => {
  it('returns a user', () => {
    const actual = createUser(createMockAuth());
    expect(actual).toStrictEqual({
      firstName: 'Everything',
      lastName: 'DiVA',
      loginId: 'user@domain.x',
      renewUntil: '1736431339581',
      userId: 'coraUser:111111111111111',
      validUntil: '1736345539581',
    });
  });
});
