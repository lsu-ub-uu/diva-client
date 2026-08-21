/*
 * Copyright 2025 Uppsala University Library
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
 */

import { FormGeneratorContext } from '@/components/FormGenerator/FormGeneratorContext';
import { FileUpload } from '@/components/FormGenerator/components/FileUpload';
import type { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { MockFormProvider } from '@/utils/testUtils';
import { userEvent } from '@vitest/browser/context';
import type { FieldValues, FormState } from 'react-hook-form';
import { mock } from 'vitest-mock-extended';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';

const fileUploadComponent: FormComponentRecordLink = {
  type: 'recordLink',
  name: 'someFile',
  label: 'someFileLabelText',
  showLabel: true,
  mode: 'input',
  repeat: { repeatMin: 0, repeatMax: 1 },
};

const mockBinaryRecord = {
  id: 'someBinaryRecordId',
  recordType: 'binary',
  validationType: 'genericBinary',
  data: {},
  actionLinks: {
    upload: {
      rel: 'upload',
      url: '/record/binary/someBinaryId/someBinaryName',
      requestMethod: 'POST',
      accept: 'application/octet-stream',
    },
  },
};

const makeGetValues = (
  pathValues: Record<string, unknown> = {},
  rootValue: Record<string, unknown> = {},
) =>
  vi.fn().mockImplementation((key?: string) => {
    if (key === undefined) return rootValue;
    return pathValues[key];
  });

const makeHostGetValues = () =>
  makeGetValues(
    {},
    {
      someRoot: {
        recordInfo: {
          id: { value: 'hostId' },
          type: { value: 'hostType' },
        },
      },
    },
  );

const makeFetchMock = (binaryRecord = mockBinaryRecord) =>
  vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ binaryRecord }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    }),
  );

const stubXHR = (progress?: { loaded: number; total?: number }) => {
  const instances: Array<{
    upload: { onprogress: ((e: any) => void) | null };
    onload: (() => void) | null;
    onerror: (() => void) | null;
    open: ReturnType<typeof vi.fn>;
    send: ReturnType<typeof vi.fn>;
  }> = [];

  class MockXMLHttpRequest {
    upload = { onprogress: null as ((e: any) => void) | null };
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    open = vi.fn();
    send = vi.fn().mockImplementation(() => {
      if (progress !== undefined && this.upload.onprogress) {
        this.upload.onprogress({
          loaded: progress.loaded,
          total: progress.total,
        });
      }
      this.onload?.();
    });

    constructor() {
      instances.push(this);
    }
  }

  vi.stubGlobal('XMLHttpRequest', MockXMLHttpRequest as any);

  return instances;
};

describe('FileUpload', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    it('renders a file input in input mode', async () => {
      const screen = await render(
        <MockFormProvider overrides={{ getValues: makeGetValues() }}>
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect
        .element(screen.getByRole('button', { name: 'someFileLabelText' }))
        .toBeVisible();
    });

    it('returns null in output mode when there is no value', async () => {
      const { container } = await render(
        <MockFormProvider overrides={{ getValues: makeGetValues() }}>
          <FileUpload
            component={{ ...fileUploadComponent, mode: 'output' }}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders file input in output mode when there is a value', async () => {
      const screen = await render(
        <MockFormProvider
          overrides={{
            getValues: makeGetValues({ someFile: 'someBinaryId' }),
          }}
        >
          <FileUpload
            component={{ ...fileUploadComponent, mode: 'output' }}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect
        .element(screen.getByRole('button', { name: 'someFileLabelText' }))
        .toBeVisible();
    });

    it('does not render a label when showLabel is false', async () => {
      const { container } = await render(
        <MockFormProvider overrides={{ getValues: makeGetValues() }}>
          <FileUpload
            component={{ ...fileUploadComponent, showLabel: false }}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('label')).toBeNull();
    });

    it('renders with inline variant when parentPresentationStyle is inline', async () => {
      const { container } = await render(
        <MockFormProvider overrides={{ getValues: makeGetValues() }}>
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle='inline'
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('[data-variant="inline"]')).not.toBeNull();
    });

    it('renders with block variant when parentPresentationStyle is undefined', async () => {
      const { container } = await render(
        <MockFormProvider overrides={{ getValues: makeGetValues() }}>
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      expect(container.querySelector('[data-variant="block"]')).not.toBeNull();
    });

    it('displays an error message', async () => {
      const screen = await render(
        <MockFormProvider
          overrides={{
            getValues: makeGetValues(),
            formState: {
              ...mock<FormState<FieldValues>>(),
              errors: {
                someFile: { message: 'someErrorMessage', type: 'required' },
              },
            },
          }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await expect.element(screen.getByText('someErrorMessage')).toBeVisible();
    });

    it('shows tooltip info when showTooltips is true', async () => {
      const screen = await render(
        <FormGeneratorContext
          value={{ showDevInfo: false, boxGroups: false, showTooltips: true }}
        >
          <MockFormProvider overrides={{ getValues: makeGetValues() }}>
            <FileUpload
              component={{
                ...fileUploadComponent,
                tooltip: { title: 'tooltipTitle', body: 'tooltipBody' },
              }}
              path='someFile'
              parentPresentationStyle={undefined}
            />
          </MockFormProvider>
        </FormGeneratorContext>,
      );

      await expect
        .element(
          screen.getByRole('button', { name: 'divaClient_fieldInfoText' }),
        )
        .toBeVisible();
    });

    it('does not show tooltip when showTooltips is false', async () => {
      const { container } = await render(
        <FormGeneratorContext
          value={{ showDevInfo: false, boxGroups: false, showTooltips: false }}
        >
          <MockFormProvider overrides={{ getValues: makeGetValues() }}>
            <FileUpload
              component={{
                ...fileUploadComponent,
                tooltip: { title: 'tooltipTitle', body: 'tooltipBody' },
              }}
              path='someFile'
              parentPresentationStyle={undefined}
            />
          </MockFormProvider>
        </FormGeneratorContext>,
      );

      expect(
        container.querySelector('[aria-label="divaClient_fieldInfoText"]'),
      ).toBeNull();
    });
  });

  describe('file upload flow', () => {
    it('shows a progress bar after selecting a file', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      stubXHR({ loaded: 50, total: 100 });

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['content'], 'report.pdf', { type: 'application/pdf' }),
      );

      await expect.element(screen.getByRole('progressbar')).toBeVisible();
    });

    it('posts to /binaryRecord with fileName, fileSize, hostRecordType and hostRecordId', async () => {
      const fetchMock = makeFetchMock();
      vi.stubGlobal('fetch', fetchMock);
      stubXHR();

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['hello'], 'report.pdf', { type: 'application/pdf' }),
      );

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/binaryRecord'),
        expect.objectContaining({
          body: JSON.stringify({
            fileName: 'report.pdf',
            fileSize: '5',
            hostRecordType: 'hostType',
            hostRecordId: 'hostId',
          }),
        }),
      );
    });

    it('posts the file to the binary upload URL via XHR with FormData', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      const xhrInstances = stubXHR();

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['content'], 'report.pdf', { type: 'application/pdf' }),
      );

      expect(xhrInstances[0].open).toHaveBeenCalledWith(
        'POST',
        expect.stringContaining('/binary/someBinaryId/someBinaryName'),
      );
      expect(xhrInstances[0].send).toHaveBeenCalledWith(expect.any(FormData));
    });

    it('calls setValue with the binary record id after upload', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      stubXHR();
      const setValueSpy = vi.fn();

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: setValueSpy }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['content'], 'report.pdf', { type: 'application/pdf' }),
      );

      expect(setValueSpy).toHaveBeenCalledWith(
        'someFile',
        'someBinaryRecordId',
      );
    });

    it('extracts id and name from the binary upload URL', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      const xhrInstances = stubXHR();

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['content'], 'test.pdf', { type: 'application/pdf' }),
      );

      const uploadUrl = xhrInstances[0].open.mock.calls[0][1] as string;
      expect(uploadUrl).toContain('someBinaryId');
      expect(uploadUrl).toContain('someBinaryName');
    });

    it('updates progress during upload', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      stubXHR({ loaded: 75, total: 100 });

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['content'], 'test.pdf', { type: 'application/pdf' }),
      );

      await expect
        .element(screen.getByRole('progressbar'))
        .toHaveAttribute('aria-valuenow', '75');
    });

    it('rounds progress to the nearest integer', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      stubXHR({ loaded: 1, total: 3 });

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['x'], 'test.pdf', { type: 'application/pdf' }),
      );

      await expect
        .element(screen.getByRole('progressbar'))
        .toHaveAttribute('aria-valuenow', '33');
    });

    it('defaults total to 100 when event.total is undefined', async () => {
      vi.stubGlobal('fetch', makeFetchMock());
      stubXHR({ loaded: 42, total: undefined });

      const screen = await render(
        <MockFormProvider
          overrides={{ getValues: makeHostGetValues(), setValue: vi.fn() }}
        >
          <FileUpload
            component={fileUploadComponent}
            path='someFile'
            parentPresentationStyle={undefined}
          />
        </MockFormProvider>,
      );

      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        new File(['x'], 'test.pdf', { type: 'application/pdf' }),
      );

      await expect
        .element(screen.getByRole('progressbar'))
        .toHaveAttribute('aria-valuenow', '42');
    });
  });

  it('does not call fetch when no file is selected', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const { container } = await render(
      <MockFormProvider overrides={{ getValues: makeGetValues() }}>
        <FileUpload
          component={fileUploadComponent}
          path='someFile'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('derives hostRecordId and hostRecordType from root form values', async () => {
    const fetchMock = makeFetchMock();
    vi.stubGlobal('fetch', fetchMock);
    stubXHR();

    const screen = await render(
      <MockFormProvider
        overrides={{
          getValues: makeGetValues(
            {},
            {
              someRootKey: {
                recordInfo: {
                  id: { value: 'myRecordId' },
                  type: { value: 'myRecordType' },
                },
              },
            },
          ),
          setValue: vi.fn(),
        }}
      >
        <FileUpload
          component={fileUploadComponent}
          path='someFile'
          parentPresentationStyle={undefined}
        />
      </MockFormProvider>,
    );

    await userEvent.upload(
      screen.getByRole('button', { name: 'someFileLabelText' }),
      new File(['content'], 'test.pdf', { type: 'application/pdf' }),
    );

    const body = JSON.parse(
      (fetchMock.mock.calls[0][1] as RequestInit).body as string,
    );
    expect(body).toMatchObject({
      hostRecordId: 'myRecordId',
      hostRecordType: 'myRecordType',
    });
  });
});
