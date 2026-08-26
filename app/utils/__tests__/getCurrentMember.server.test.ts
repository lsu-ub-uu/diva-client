import { describe, expect, it } from 'vitest';
import { getCurrentMember } from '../getCurrentMember.server';
import type { BFFMember, Dependencies } from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { LookupError } from 'server/dependencies/util/lookup';

const dependenciesMock = {
  memberPool: listToPool([
    { id: 'diva' } as BFFMember,
    { id: 'uu' } as BFFMember,
  ]),
} as Dependencies;

describe('getCurrentMember', () => {
  it('returns diva member when no member search param', () => {
    const member = getCurrentMember(
      new Request('https://www.diva-portal.org'),
      dependenciesMock,
    );

    expect(member.id).toBe('diva');
  });

  it('returns correct member with member search param', () => {
    const member = getCurrentMember(
      new Request('https://www.diva-portal.org?member=uu'),
      dependenciesMock,
    );

    expect(member.id).toBe('uu');
  });

  it('returns diva member when member param does not match a member', () => {
    const member = getCurrentMember(
      new Request('https://www.diva-portal.org?member=kth'),
      dependenciesMock,
    );

    expect(member.id).toBe('diva');
  });

  it('returns diva member when member param contains wierd characters', () => {
    const member = getCurrentMember(
      new Request('https://www.diva-portal.org?member=###%&%&'),
      dependenciesMock,
    );

    expect(member.id).toBe('diva');
  });

  it('throws an error when memberPool does not contain diva member', () => {
    const dependenciesWithoutDiva = {
      memberPool: listToPool([{ id: 'uu' } as BFFMember]),
    } as Dependencies;

    expect(() =>
      getCurrentMember(
        new Request('https://www.diva-portal.org'),
        dependenciesWithoutDiva,
      ),
    ).toThrow(new LookupError('[diva] does not exist in Lookup pool'));
  });
});
