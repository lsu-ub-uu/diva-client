import { omit } from 'lodash-es';
import type { Auth } from './Auth';

export type User = Omit<Auth['data'], 'token'>;

export const createUser = (auth: Auth): User => {
  return omit(auth.data, 'token');
};
