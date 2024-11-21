import { ActionLinks } from '@/cora/cora-data/CoraData';

export interface Auth {
  data: {
    token: string;
    validForNoSeconds: string;
    userId: string;
    loginId: string;
    lastName: string;
    firstName: string;
  };
  actionLinks?: ActionLinks;
}
