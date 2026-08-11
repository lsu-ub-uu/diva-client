import { MobileNavigation } from '@/components/Layout/Header/MobileNavigation/MobileNavigation';
import type { Navigation } from '@/data/getNavigation.server';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

describe('<MobileNavigation />', () => {
  it('closes the drawer when viewport changes to desktop width', async () => {
    await page.viewport(800, 900);

    const navigation: Navigation = {
      mainNavigationItems: [
        {
          id: 'someRecordType',
          link: '/record/someRecordType',
          textId: 'Output',
        },
      ],
      otherNavigationItems: [],
    };

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        loader: () => ({ locale: 'sv' }),
        Component: () => (
          <MobileNavigation
            navigation={navigation}
            userPreferences={{ colorScheme: 'light' }}
          />
        ),
      },
    ]);

    const screen = await render(<RoutesStub />);

    await screen
      .getByRole('button', { name: 'divaClient_showMenuText' })
      .click();

    const dialog = document.querySelector('dialog');
    expect(dialog).toBeVisible();
    expect(dialog?.hasAttribute('open')).toBe(true);

    await page.viewport(1200, 900);

    await expect.poll(() => dialog?.hasAttribute('open')).toBe(false);

    await page.viewport(1280, 720);
  });
});
