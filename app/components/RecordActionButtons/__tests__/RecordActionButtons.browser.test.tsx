/*
 * Copyright 2026 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { RecordActionButtons } from '@/components/RecordActionButtons/RecordActionButtons';
import type { BFFDataRecord } from '@/types/record';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

const createDeferredResult = () => {
  let resolvePromise: () => void = () => {};
  const promise = new Promise<null>((resolve) => {
    resolvePromise = () => resolve(null);
  });

  return {
    promise,
    resolve: resolvePromise,
  };
};

const makeRecord = (overrides: Partial<BFFDataRecord> = {}): BFFDataRecord => ({
  id: 'someId',
  recordType: 'someRecordType',
  validationType: 'someValidationType',
  data: {},
  actionLinks: {},
  ...overrides,
});

const renderWithRoutes = async (record: BFFDataRecord) => {
  const RoutesStub = createRoutesStub([
    {
      path: '/',
      Component: () => <RecordActionButtons record={record} />,
    },
    { path: '/:recordType/:recordId', Component: () => null },
    { path: '/:recordType/:recordId/update', Component: () => null },
    {
      path: '/:recordType/:recordId/delete',
      action: async () => null,
      Component: () => null,
    },
    {
      path: '/:recordType/:recordId/trash',
      action: async () => null,
      Component: () => null,
    },
    {
      path: '/:recordType/:recordId/untrash',
      action: async () => null,
      Component: () => null,
    },
    {
      path: '/:recordType/:recordId/publish',
      action: async () => null,
      Component: () => null,
    },
    {
      path: '/:recordType/:recordId/unpublish',
      action: async () => null,
      Component: () => null,
    },
  ]);
  return render(<RoutesStub />);
};

describe('RecordActionButtons', () => {
  describe('read', () => {
    it('renders a view link for non-diva-output records', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['read'] }),
      );

      await expect
        .element(
          screen.getByRole('link', { name: 'divaClient_viewRecordText' }),
        )
        .toHaveAttribute('href', '/someRecordType/someId');
    });

    it('renders nothing for diva-output records', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ recordType: 'diva-output', userRights: ['read'] }),
      );

      await expect
        .element(
          screen.getByRole('link', { name: 'divaClient_viewRecordText' }),
        )
        .not.toBeInTheDocument();
    });
  });

  describe('update', () => {
    it('renders an edit link', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['update'] }),
      );

      await expect
        .element(
          screen.getByRole('link', { name: 'divaClient_editRecordText' }),
        )
        .toHaveAttribute('href', '/someRecordType/someId/update');
    });
  });

  describe('publish', () => {
    it('renders a publish button', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['publish'] }),
      );

      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_publishRecordText' }),
        )
        .toBeVisible();
    });

    it('submits publish when publish button is clicked', async () => {
      let publishActionCalled = false;

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['publish'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/publish',
          action: async () => {
            publishActionCalled = true;
            return null;
          },
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);

      await screen
        .getByRole('button', { name: 'divaClient_publishRecordText' })
        .click();

      await expect.poll(() => publishActionCalled).toBe(true);
    });

    it('shows icon when idle and spinner while publishing', async () => {
      const deferredPublish = createDeferredResult();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['publish'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/publish',
          action: async () => deferredPublish.promise,
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);
      const publishButton = screen.getByRole('button', {
        name: 'divaClient_publishRecordText',
      });

      expect(publishButton.element().innerHTML).toContain('lucide-book-check');

      await publishButton.click();

      await expect
        .element(publishButton.getByRole('progressbar'))
        .toBeVisible();
      expect(publishButton.element().innerHTML).not.toContain(
        'lucide-book-check',
      );

      deferredPublish.resolve();

      await expect
        .poll(() => publishButton.element().innerHTML)
        .toContain('lucide-book-check');
    });
  });

  describe('unpublish', () => {
    it('renders an unpublish button', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['unpublish'] }),
      );

      await expect
        .element(
          screen.getByRole('button', {
            name: 'divaClient_unpublishRecordText',
          }),
        )
        .toBeVisible();
    });

    it('submits unpublish when unpublish button is clicked', async () => {
      let unpublishActionCalled = false;

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['unpublish'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/unpublish',
          action: async () => {
            unpublishActionCalled = true;
            return null;
          },
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);

      await screen
        .getByRole('button', { name: 'divaClient_unpublishRecordText' })
        .click();

      await expect.poll(() => unpublishActionCalled).toBe(true);
    });

    it('shows icon when idle and spinner while unpublishing', async () => {
      const deferredUnpublish = createDeferredResult();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['unpublish'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/unpublish',
          action: async () => deferredUnpublish.promise,
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);
      const unpublishButton = screen.getByRole('button', {
        name: 'divaClient_unpublishRecordText',
      });

      expect(unpublishButton.element().innerHTML).toContain(
        'lucide-book-dashed',
      );

      await unpublishButton.click();

      await expect
        .element(unpublishButton.getByRole('progressbar'))
        .toBeVisible();
      expect(unpublishButton.element().innerHTML).not.toContain(
        'lucide-book-dashed',
      );

      deferredUnpublish.resolve();

      await expect
        .poll(() => unpublishButton.element().innerHTML)
        .toContain('lucide-book-dashed');
    });
  });

  describe('delete', () => {
    it('renders a delete button', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['delete'] }),
      );

      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_deleteRecordText' }),
        )
        .toBeVisible();
    });

    it('opens a confirm dialog when the delete button is clicked', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['delete'] }),
      );

      await screen
        .getByRole('button', { name: 'divaClient_deleteRecordText' })
        .click();

      await expect.element(screen.getByRole('dialog')).toBeVisible();
      await expect
        .element(
          screen.getByRole('heading', {
            name: 'divaClient_confirmDeleteHeadingText',
          }),
        )
        .toBeVisible();
    });

    it('closes the confirm dialog when cancel is clicked', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['delete'] }),
      );

      await screen
        .getByRole('button', { name: 'divaClient_deleteRecordText' })
        .click();

      await screen
        .getByRole('button', { name: 'divaClient_cancelText' })
        .click();

      await expect
        .element(screen.getByText('divaClient_confirmDeleteHeadingText'))
        .not.toBeVisible();
    });

    it('submits delete when confirm submit is clicked', async () => {
      let deleteActionCalled = false;

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['delete'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/delete',
          action: async () => {
            deleteActionCalled = true;
            return null;
          },
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);

      await screen
        .getByRole('button', { name: 'divaClient_deleteRecordText' })
        .click();

      await screen
        .getByRole('dialog')
        .getByRole('button', { name: 'divaClient_deleteRecordText' })
        .click();

      await expect.poll(() => deleteActionCalled).toBe(true);
    });

    it('shows icon when idle and spinner while deleting', async () => {
      const deferredDelete = createDeferredResult();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['delete'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/delete',
          action: async () => deferredDelete.promise,
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);
      const deleteButton = screen
        .getByRole('button', { name: 'divaClient_deleteRecordText' })
        .first();

      expect(deleteButton.element().innerHTML).toContain('lucide-shredder');

      await deleteButton.click();

      await screen
        .getByRole('dialog')
        .getByRole('button', { name: 'divaClient_deleteRecordText' })
        .click();

      await expect.element(deleteButton.getByRole('progressbar')).toBeVisible();
      expect(deleteButton.element().innerHTML).not.toContain('lucide-shredder');

      deferredDelete.resolve();

      await expect
        .poll(() => deleteButton.element().innerHTML)
        .toContain('lucide-shredder');
    });
  });

  describe('trash', () => {
    it('renders a trash button', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['trash'] }),
      );

      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_trashRecordText' }),
        )
        .toBeVisible();
    });

    it('opens a confirm dialog when the trash button is clicked', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['trash'] }),
      );

      await screen
        .getByRole('button', { name: 'divaClient_trashRecordText' })
        .click();

      await expect.element(screen.getByRole('dialog')).toBeVisible();
      await expect
        .element(
          screen.getByRole('heading', {
            name: 'divaClient_confirmTrashHeadingText',
          }),
        )
        .toBeVisible();
    });

    it('closes the confirm dialog when cancel is clicked', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['trash'] }),
      );

      await screen
        .getByRole('button', { name: 'divaClient_trashRecordText' })
        .click();

      await screen
        .getByRole('button', { name: 'divaClient_cancelText' })
        .click();

      await expect
        .element(screen.getByText('divaClient_confirmTrashHeadingText'))
        .not.toBeVisible();
    });

    it('submits trash when confirm submit is clicked', async () => {
      let trashActionCalled = false;

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['trash'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/trash',
          action: async () => {
            trashActionCalled = true;
            return null;
          },
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);

      await screen
        .getByRole('button', { name: 'divaClient_trashRecordText' })
        .click();

      await screen
        .getByRole('dialog')
        .getByRole('button', { name: 'divaClient_trashRecordText' })
        .click();

      await expect.poll(() => trashActionCalled).toBe(true);
    });

    it('shows icon when idle and spinner while trashing', async () => {
      const deferredTrash = createDeferredResult();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['trash'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/trash',
          action: async () => deferredTrash.promise,
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);
      const trashButton = screen
        .getByRole('button', { name: 'divaClient_trashRecordText' })
        .first();

      expect(trashButton.element().innerHTML).toContain('lucide-trash-2');

      await trashButton.click();

      await screen
        .getByRole('dialog')
        .getByRole('button', { name: 'divaClient_trashRecordText' })
        .click();

      await expect.element(trashButton.getByRole('progressbar')).toBeVisible();
      expect(trashButton.element().innerHTML).not.toContain('lucide-trash-2');

      deferredTrash.resolve();

      await expect
        .poll(() => trashButton.element().innerHTML)
        .toContain('lucide-trash-2');
    });
  });

  describe('untrash', () => {
    it('renders an untrash button', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['untrash'] }),
      );

      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_untrashButtonText' }),
        )
        .toBeVisible();
    });

    it('submits untrash when untrash button is clicked', async () => {
      let untrashActionCalled = false;

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['untrash'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/untrash',
          action: async () => {
            untrashActionCalled = true;
            return null;
          },
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);

      await screen
        .getByRole('button', { name: 'divaClient_untrashButtonText' })
        .click();

      await expect.poll(() => untrashActionCalled).toBe(true);
    });

    it('shows icon when idle and spinner while untrashing', async () => {
      const deferredUntrash = createDeferredResult();

      const RoutesStub = createRoutesStub([
        {
          path: '/',
          Component: () => (
            <RecordActionButtons
              record={makeRecord({ userRights: ['untrash'] })}
            />
          ),
        },
        {
          path: '/:recordType/:recordId/untrash',
          action: async () => deferredUntrash.promise,
          Component: () => null,
        },
      ]);

      const screen = await render(<RoutesStub />);
      const untrashButton = screen.getByRole('button', {
        name: 'divaClient_untrashButtonText',
      });

      expect(untrashButton.element().innerHTML).toContain(
        'lucide-archive-restore',
      );

      await untrashButton.click();

      await expect
        .element(untrashButton.getByRole('progressbar'))
        .toBeVisible();
      expect(untrashButton.element().innerHTML).not.toContain(
        'lucide-archive-restore',
      );

      deferredUntrash.resolve();

      await expect
        .poll(() => untrashButton.element().innerHTML)
        .toContain('lucide-archive-restore');
    });
  });

  describe('multiple rights', () => {
    it('renders buttons for each user right', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['read', 'update', 'delete'] }),
      );

      await expect
        .element(
          screen.getByRole('link', { name: 'divaClient_viewRecordText' }),
        )
        .toBeVisible();
      await expect
        .element(
          screen.getByRole('link', { name: 'divaClient_editRecordText' }),
        )
        .toBeVisible();
      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_deleteRecordText' }),
        )
        .toBeVisible();
    });
  });

  describe('unknown right', () => {
    it('renders nothing for unknown rights', async () => {
      const screen = await renderWithRoutes(
        makeRecord({ userRights: ['read_incoming_links' as any] }),
      );

      const buttons = screen.getByRole('button');
      await expect.element(buttons).not.toBeInTheDocument();
    });
  });
});
