import { requestAuthTokenOnLogin } from '@/cora/requestAuthTokenOnLogin.server';
export async function loginWithAppToken(loginId: string, appToken: string) {
  try {
    return requestAuthTokenOnLogin(loginId, appToken, 'apptoken');
  } catch {
    return null;
  }
}
