import type { BFFMember } from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';

export const getMemberFromHostname = (
  request: Request,
  dependencies: Dependencies,
): BFFMember | undefined => {
  const { hostname } = new URL(request.url);
  return Array.from(dependencies.memberPool.values()).find((member) =>
    member.hostnames?.includes(hostname),
  );
};
