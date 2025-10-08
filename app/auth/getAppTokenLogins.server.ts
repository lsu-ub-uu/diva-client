export interface AppTokenLogin {
  displayName: string;
  loginId: string;
  appToken: string;
}

export const getAppTokenLogins = (): AppTokenLogin[] => {
  try {
    const users = process.env.APP_TOKEN_USERS;
    return users !== undefined ? JSON.parse(users) : [];
  } catch {
    console.error('Failed to parse APP_TOKEN_USERS');
    return [];
  }
};
