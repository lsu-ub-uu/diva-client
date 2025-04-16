import type { ActionLink } from '@/cora/cora-data/types.server';

export interface Auth {
  data: {
    token: string;
    validUntil: string;
    renewUntil: string;
    userId: string;
    loginId: string;
    lastName?: string;
    firstName?: string;
    permissionUnit?: string[];
  };
  actionLinks: {
    renew: ActionLink;
    delete: ActionLink;
  };
}
