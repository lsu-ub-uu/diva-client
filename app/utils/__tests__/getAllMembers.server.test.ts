import { describe, expect, it } from 'vitest';
import { listToPool } from 'server/dependencies/util/listToPool';
import type { BFFMember } from '@/cora/bffTypes.server';
import { getAllMembers } from '../getAllMembers.server';

const members: BFFMember[] = [
  {
    id: 'diva',
    pageTitle: { sv: 'Diva', en: 'Diva' },
    logo: { svg: '<svg>Diva</svg>' },
  } as BFFMember,
  {
    id: 'uu',
    pageTitle: { sv: 'Uppsala Universitet', en: 'Uppsala University' },
    logo: { svg: '<svg>UU</svg>' },
  } as BFFMember,
  {
    id: 'kth',
    pageTitle: { sv: 'KTH', en: 'KTH' },
    logo: { svg: '<svg>KTH</svg>' },
  } as BFFMember,
];

describe('getAllMembers', () => {
  it('should return all members from the memberPool', () => {
    const mockDependencies = {
      memberPool: listToPool(members),
    } as any;

    const result = getAllMembers(mockDependencies);

    expect(result).toEqual(members);
  });
});
