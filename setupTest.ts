import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

beforeAll(() => {
  vi.stubEnv('CORA_API_URL', 'https://cora.epc.ub.uu.se/diva/rest');
  vi.stubEnv('CORA_LOGIN_URL', 'https://cora.epc.ub.uu.se/diva/login');

  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

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
  cleanup();
  vi.unstubAllGlobals();
  vi.resetAllMocks();
  vi.clearAllMocks();
  vi.useRealTimers();
});
