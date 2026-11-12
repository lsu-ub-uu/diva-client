import type { BFFDataRecord } from '@/types/record';
import { createRoutesStub } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { useUser } from '@/utils/rootLoaderDataUtils';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { RecordActionBar } from '../RecordActionBar';
import type { User } from '@/auth/createUser';

vi.mock('@/utils/rootLoaderDataUtils');

describe('RecordActionBar', () => {
  it('shows only view in api link and no  menu if not logged in', async () => {
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
      { id: 'root', path: '/', loader: () => undefined },
      {
        id: 'routes/divaOutput/divaOutputView',
        path: '/diva-output/:recordId',
        Component: () => (
          <RecordActionBar
            record={record}
            recordTypeUserRights={[]}
            apiUrl='someUrl/rest'
          />
        ),
      },
    ]);

    const screen = await render(
      <RoutesStub initialEntries={['/diva-output/1234']} />,
    );
    await expect
      .element(screen.getByRole('link', { name: 'divaClient_viewInApiText' }))
      .toBeInTheDocument();
  });

  it('keeps update in the action bar when it is the only action', async () => {
    vi.mocked(useUser).mockReturnValue({} as User);
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
          <RecordActionBar
            record={record}
            recordTypeUserRights={[]}
            apiUrl='someUrl/rest'
          />
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
    vi.mocked(useUser).mockReturnValue({} as User);

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
          <RecordActionBar
            record={record}
            recordTypeUserRights={['create']}
            apiUrl='someUrl/rest'
          />
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

  it('renders the view link instead of the update link on the update page', async () => {
    const screen = await renderRecordActionBar(
      createRecord(['read', 'update', 'delete']),
      '/someRecordType/123/update',
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_viewRecordText' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('link', { name: 'divaClient_editRecordText' }))
      .not.toBeInTheDocument();
  });

  it('renders the update link instead of the view link on the view page', async () => {
    const screen = await renderRecordActionBar(
      createRecord(['read', 'update', 'delete']),
      '/someRecordType/123',
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_editRecordText' }))
      .toBeInTheDocument();
    await expect
      .element(screen.getByRole('link', { name: 'divaClient_viewRecordText' }))
      .not.toBeInTheDocument();
  });

  it.each([
    ['delete', 'divaClient_deleteRecordText'],
    ['trash', 'divaClient_trashRecordText'],
    ['untrash', 'divaClient_untrashRecordText'],
    ['publish', 'divaClient_publishRecordText'],
    ['unpublish', 'divaClient_unpublishRecordText'],
    ['viewOldRecord', 'divaClient_viewOldRecordText'],
  ] as const)(
    'shows the %s action when the user has that right',
    async (right, label) => {
      const screen = await renderRecordActionBar(
        createRecord(['update', right]),
      );

      await userEvent.click(
        screen.getByRole('button', { name: 'divaClient_moreNavigationText' }),
      );

      await expect
        .element(screen.getByRole('menuitem', { name: label }))
        .toBeInTheDocument();
    },
  );
  it('does not show the view link when the user lacks read right', async () => {
    const screen = await renderRecordActionBar(
      createRecord(['update', 'delete']),
      '/someRecordType/123/update',
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_viewRecordText' }))
      .not.toBeInTheDocument();
  });

  it('does not show the update link when the user lacks update right', async () => {
    const screen = await renderRecordActionBar(
      createRecord(['read', 'delete']),
      '/someRecordType/123',
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_editRecordText' }))
      .not.toBeInTheDocument();
  });

  it.each([
    ['delete', 'divaClient_deleteRecordText'],
    ['trash', 'divaClient_trashRecordText'],
    ['untrash', 'divaClient_untrashRecordText'],
    ['publish', 'divaClient_publishRecordText'],
    ['unpublish', 'divaClient_unpublishRecordText'],
    ['viewOldRecord', 'divaClient_viewOldRecordText'],
  ] as const)(
    'does not show the %s action without that right',
    async (missingRight, label) => {
      const allRights: NonNullable<BFFDataRecord['userRights']> = [
        'update',
        'delete',
        'trash',
        'untrash',
        'publish',
        'unpublish',
        'viewOldRecord',
      ];
      const userRights = allRights.filter((right) => right !== missingRight);
      const screen = await renderRecordActionBar(createRecord(userRights));

      await userEvent.click(
        screen.getByRole('button', { name: 'divaClient_moreNavigationText' }),
      );

      await expect
        .element(screen.getByRole('menuitem', { name: label }))
        .not.toBeInTheDocument();
    },
  );

  it('renders copy-as-new menu option when user has create right for record type', async () => {
    const screen = await renderRecordActionBar(
      createRecord(),
      '/diva-output/1234',
      ['create'],
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'divaClient_moreNavigationText' }),
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_copyAsNewText' }))
      .toBeInTheDocument();
  });

  it('does not render copy-as-new menu option when user lacks create right for record type', async () => {
    const screen = await renderRecordActionBar(
      createRecord(['update', 'trash']),
      '/diva-output/1234',
      [],
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_copyAsNewText' }))
      .not.toBeInTheDocument();
  });

  it('does not render when the record has no actions', async () => {
    const screen = await renderRecordActionBar(createRecord(), '/', [], true);

    await expect
      .element(
        screen.getByRole('button', { name: 'divaClient_moreNavigationText' }),
      )
      .not.toBeInTheDocument();
    await expect
      .element(screen.getByRole('link', { name: 'divaClient_viewInApiText' }))
      .toBeInTheDocument();
  });

  it('renders copy as new when the record type has create right', async () => {
    const screen = await renderRecordActionBar(
      createRecord(),
      '/diva-output/1234',
      ['create'],
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'divaClient_moreNavigationText' }),
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_copyAsNewText' }))
      .toHaveAttribute(
        'href',
        '/diva-person/create?duplicateFrom=1234&validationType=diva-person',
      );
  });

  it('does not render copy as new when the record type lacks create right', async () => {
    const screen = await renderRecordActionBar(
      createRecord(['update']),
      '/diva-output/1234',
    );

    await expect
      .element(screen.getByRole('link', { name: 'divaClient_copyAsNewText' }))
      .not.toBeInTheDocument();
  });
});

const createRecord = (
  userRights: BFFDataRecord['userRights'] = [],
  data: BFFDataRecord['data'] = {
    root: {
      recordInfo: {
        id: '1234',
        oldRecord: {
          value: '123',
        },
      },
    },
  },
) =>
  ({
    id: '1234',
    recordType: 'diva-person',
    validationType: 'diva-person',
    updated: [],
    userRights,
    actionLinks: {},
    data,
  }) as BFFDataRecord;

const renderRecordActionBar = async (
  record: BFFDataRecord,
  initialEntry = '/',
  recordTypeUserRights: 'create'[] = [],
  loggedIn = true,
) => {
  vi.mocked(useUser).mockReturnValue(loggedIn ? ({} as User) : undefined);
  const Component = () => (
    <RecordActionBar
      record={record}
      recordTypeUserRights={recordTypeUserRights}
      apiUrl='someUrl/rest'
    />
  );
  const RoutesStub = createRoutesStub([
    {
      id: 'routes/record/recordView',
      path: '/:recordType/:recordId',
      Component,
    },
    {
      id: 'routes/record/recordUpdate',
      path: '/:recordType/:recordId/update',
      Component,
    },
    {
      id: 'routes/divaOutput/divaOutputView',
      path: '/diva-output/:recordId',
      Component,
    },
    { id: 'root', path: '/', Component },
  ]);

  return render(<RoutesStub initialEntries={[initialEntry]} />);
};
