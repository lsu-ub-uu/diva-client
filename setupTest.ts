import { afterEach, beforeAll, vi } from 'vitest';
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

  window.open = vi.fn();
  HTMLElement.prototype.showPopover = vi.fn();
  HTMLElement.prototype.hidePopover = vi.fn();
  CSS.supports = vi.fn().mockReturnValue(true);

  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
  HTMLDialogElement.prototype.show = vi.fn();

  // @ts-expect-error: this is fine
  global.IS_REACT_ACT_ENVIRONMENT = true;

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
