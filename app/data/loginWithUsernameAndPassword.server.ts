import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin.server';

export const loginWithUsernameAndPassword = async (
  loginId: string,
  password: string,
) => {
  try {
    return await requestAuthTokenOnLogin(loginId, password, 'password');
  } catch {
    return null;
  }
};
