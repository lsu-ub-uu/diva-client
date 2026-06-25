import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { afterEach, beforeAll, vi } from 'vitest';

beforeAll(() => {
  vi.stubEnv('CORA_API_URL', 'https://cora.epc.ub.uu.se/diva/rest');
  vi.stubEnv('CORA_LOGIN_URL', 'https://cora.epc.ub.uu.se/diva/login');

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          Welcome: 'Welcome to the DiVA tests',
        },
      },
      sv: {
        translation: {
          Welcome: 'Välkommen till DiVA tester',
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetAllMocks();
  vi.clearAllMocks();
  vi.useRealTimers();
});
