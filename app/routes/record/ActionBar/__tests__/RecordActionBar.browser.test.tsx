import type { BFFDataRecord } from '@/types/record';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { RecordActionBar } from '../RecordActionBar';

describe('RecordActionBar action menu', () => {
  it('keeps update in the action bar when it is the only action', async () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: ['update'],
      actionLinks: {},
      data: {},
    } as BFFDataRecord;
    const RoutesStub = createRoutesStub([
      {
        id: 'routes/divaOutput/divaOutputView',
        path: '/diva-output/:recordId',
        Component: () => (
          <RecordActionBar record={record} recordTypeUserRights={[]} />
        ),
      },
    ]);

    const screen = await render(
      <RoutesStub initialEntries={['/diva-output/1234']} />,
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_editRecordText' }))
      .toHaveAttribute('href', '/diva-person/1234/update');
    await expect
      .element(screen.getByRole('button', { name: 'Actions' }))
      .not.toBeInTheDocument();
  });

  it('shows the remaining available actions in the dropdown', async () => {
    const record = {
      id: '1234',
      recordType: 'diva-person',
      validationType: 'diva-person',
      updated: [],
      userRights: [
        'update',
        'publish',
        'unpublish',
        'trash',
        'untrash',
        'delete',
        'viewOldRecord',
      ],
      actionLinks: {},
      data: {
        root: { recordInfo: { oldRecord: { value: 'old-record-id' } } },
      },
    } as BFFDataRecord;
    const RoutesStub = createRoutesStub([
      {
        id: 'routes/divaOutput/divaOutputView',
        path: '/diva-output/:recordId',
        Component: () => (
          <RecordActionBar record={record} recordTypeUserRights={['create']} />
        ),
      },
    ]);

    const screen = await render(
      <RoutesStub initialEntries={['/diva-output/1234']} />,
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_editRecordText' }))
      .toHaveAttribute('href', '/diva-person/1234/update');
    await userEvent.click(
      screen.getByRole('button', { name: 'divaClient_moreNavigationText' }),
    );

    const menu = screen.getByRole('menu');
    const menuItemNames = Array.from(
      menu
        .element()
        .querySelectorAll('[role="menuitem"] > a, [role="menuitem"] > button'),
    ).map((item) => item.textContent?.trim());

    expect(menuItemNames).toEqual([
      'divaClient_copyAsNewText',
      'divaClient_deleteRecordText',
      'divaClient_trashRecordText',
      'divaClient_untrashRecordText',
      'divaClient_publishRecordText',
      'divaClient_unpublishRecordText',
      'divaClient_viewOldRecordText',
    ]);
    await expect
      .element(
        screen.getByRole('menuitem', { name: 'divaClient_editRecordText' }),
      )
      .not.toBeInTheDocument();
  });
});
