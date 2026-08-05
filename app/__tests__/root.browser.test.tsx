import { Layout } from '@/root';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';

describe('root layout', () => {
  it('does not include any React Router scroll restoration script', async () => {
    const RoutesStub = createRoutesStub([
      {
        id: 'root',
        path: '/',
        loader: () => ({
          locale: 'sv',
          userPreferences: { colorScheme: 'light' },
        }),
        Component: () => (
          <Layout>
            <div>content</div>
          </Layout>
        ),
      },
    ]);

    await render(<RoutesStub />);

    const inlineScripts = Array.from(document.querySelectorAll('script'))
      .map((script) => script.textContent ?? '')
      .filter(Boolean);

    const hasScrollStorageKey = inlineScripts.some((scriptText) =>
      scriptText.includes('react-router-scroll-positions'),
    );

    const hasScrollRestorationToggle = inlineScripts.some((scriptText) =>
      scriptText.includes('history.scrollRestoration'),
    );

    const hasScrollSessionStorageUsage = inlineScripts.some(
      (scriptText) =>
        scriptText.includes('sessionStorage') &&
        scriptText.includes('scroll') &&
        scriptText.includes('position'),
    );

    expect(hasScrollStorageKey).toBe(false);
    expect(hasScrollRestorationToggle).toBe(false);
    expect(hasScrollSessionStorageUsage).toBe(false);
    expect(window.history.scrollRestoration).toBe('auto');
  });
});
