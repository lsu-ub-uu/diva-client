import type { BFFMember } from '@/cora/bffTypes.server';
import type { Dependencies } from '@/cora/bffTypes.server';
import { NotFoundError } from '@/errorHandling/NotFoundError';
import { parseUserPreferencesCookie } from '@/userPreferences/userPreferencesCookie.server';

// POC: member is selected via ?member= searchParam (override) or cookie, not hostname.
export const getMember = async (
  request: Request,
  dependencies: Dependencies,
): Promise<BFFMember> => {
  const { searchParams } = new URL(request.url);
  const searchParamMember = searchParams.get('member') ?? undefined;
  const { member: cookieMember } = await parseUserPreferencesCookie(request);
  const selected = searchParamMember ?? cookieMember;

  const members = Array.from(dependencies.memberPool.values());
  const member =
    (selected
      ? members.find(
          (candidate) =>
            candidate.id === selected ||
            candidate.memberPermissionUnit === selected,
        )
      : undefined) ?? dependencies.memberPool.get('diva');

  if (!member) {
    throw new NotFoundError('No member found');
  }

  return member;
};
