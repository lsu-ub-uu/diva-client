import { HydratedRouter } from 'react-router/dom';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import i18next from 'i18next';
import { MuiProvider } from '@/mui/MuiProvider';
import { I18nextProvider } from 'react-i18next';
import { initClienti18n } from '@/i18n/i18n.client';

async function hydrate() {
  await initClienti18n();

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <MuiProvider>
            <HydratedRouter />
          </MuiProvider>
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
