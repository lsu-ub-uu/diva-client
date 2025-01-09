import type { ActionLinks } from '@/.server/cora/cora-data/CoraData';

export interface Auth {
  data: {
    token: string;
    validUntil: string;
    renewUntil: string;
    userId: string;
    loginId: string;
    lastName?: string;
    firstName?: string;
  };
  actionLinks?: ActionLinks;
}
