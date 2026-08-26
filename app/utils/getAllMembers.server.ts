import type { BFFMember, Dependencies } from '@/cora/bffTypes.server';

export const getAllMembers = (dependencies: Dependencies): BFFMember[] => {
  return Array.from(dependencies.memberPool.values());
};
