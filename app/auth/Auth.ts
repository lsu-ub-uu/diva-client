import type { ActionLinks } from '@/cora/cora-data/types.server';

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
