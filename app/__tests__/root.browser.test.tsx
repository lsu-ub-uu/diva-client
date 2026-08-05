import { Layout } from '@/root';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/data/getLoginUnits.server', () => ({
  getLoginUnits: vi.fn(),
}));

vi.mock('@/data/getNavigation.server', () => ({
  getNavigation: vi.fn(),
}));

vi.mock('@/cora/getDeploymentInfo.server', () => ({
  getDeploymentInfo: vi.fn(),
}));

vi.mock('server/dependencies/depencencies', () => ({
  getClientContent: vi.fn(),
  getDependencies: vi.fn(),
}));

vi.mock('server/i18n', () => ({
  i18nContext: {},
}));

vi.mock('@/auth/renewAuthMiddleware.server', () => ({
  renewAuthMiddleware: vi.fn(),
}));

vi.mock('@/auth/sessionMiddleware.server', () => ({
  sessionContext: {},
  sessionMiddleware: vi.fn(),
}));

vi.mock('@/userPreferences/userPreferencesCookie.server', () => ({
  parseUserPreferencesCookie: vi.fn(),
  serializeUserPreferencesCookie: vi.fn(),
}));

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

    expect(
      inlineScripts.some((s) => s.includes('react-router-scroll-positions')),
    ).toBe(false);
    expect(
      inlineScripts.some((s) => s.includes('history.scrollRestoration')),
    ).toBe(false);
    expect(
      inlineScripts.some(
        (s) =>
          s.includes('sessionStorage') &&
          s.includes('scroll') &&
          s.includes('position'),
      ),
    ).toBe(false);
  });
});
