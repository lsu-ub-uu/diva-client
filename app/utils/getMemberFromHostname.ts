import type { BFFMember } from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import { NotFoundError } from '@/errorHandling/NotFoundError';

export const getMemberFromHostname = (
  request: Request,
  dependencies: Dependencies,
): BFFMember => {
  const { hostname } = new URL(request.url);

  const member =
    Array.from(dependencies.memberPool.values()).find((member) =>
      member.hostnames?.includes(hostname),
    ) ?? dependencies.memberPool.get('diva');

  if (!member) {
    throw new NotFoundError(`No member found for hostname: ${hostname}`);
  }

  return member;
};
