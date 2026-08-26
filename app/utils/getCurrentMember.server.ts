import type { BFFMember, Dependencies } from '@/cora/bffTypes.server';

export const getCurrentMember = (
  request: Request,
  dependencies: Dependencies,
): BFFMember => {
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get('member');

  if (!memberId || !dependencies.memberPool.has(memberId)) {
    return dependencies.memberPool.get('diva');
  }

  return dependencies.memberPool.get(memberId);
};
