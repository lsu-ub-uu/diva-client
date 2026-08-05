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
import axios from 'axios';
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
      vi.spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockImplementationOnce(async (_url, _data, config) => {
          config?.onUploadProgress?.({
            loaded: 50,
            total: 100,
            bytes: 50,
            lengthComputable: true,
          });
          return {};
        });

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

      const file = new File(['content'], 'report.pdf', {
        type: 'application/pdf',
      });
      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        file,
      );

      await expect.element(screen.getByRole('progressbar')).toBeVisible();
    });

    it('posts to /binaryRecord with fileName, fileSize, hostRecordType and hostRecordId', async () => {
      const postSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockResolvedValue({});

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

      const file = new File(['hello'], 'report.pdf', {
        type: 'application/pdf',
      });
      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        file,
      );

      expect(postSpy).toHaveBeenCalledWith(
        expect.stringContaining('/binaryRecord'),
        {
          fileName: 'report.pdf',
          fileSize: '5',
          hostRecordType: 'hostType',
          hostRecordId: 'hostId',
        },
      );
    });

    it('posts the file to the binary upload URL with multipart/form-data', async () => {
      const postSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockResolvedValue({});

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

      const file = new File(['content'], 'report.pdf', {
        type: 'application/pdf',
      });
      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        file,
      );

      expect(postSpy).toHaveBeenCalledWith(
        expect.stringContaining('/binary/someBinaryId/someBinaryName'),
        expect.any(FormData),
        expect.objectContaining({
          headers: { 'content-type': 'multipart/form-data' },
        }),
      );
    });

    it('calls setValue with the binary record id after upload', async () => {
      vi.spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockResolvedValue({});

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

      const file = new File(['content'], 'report.pdf', {
        type: 'application/pdf',
      });
      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        file,
      );

      expect(setValueSpy).toHaveBeenCalledWith(
        'someFile',
        'someBinaryRecordId',
      );
    });

    it('extracts id and name from the binary upload URL', async () => {
      const postSpy = vi
        .spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockResolvedValue({});

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

      const file = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });
      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        file,
      );

      const binaryUploadUrl = postSpy.mock.calls[1][0] as string;
      expect(binaryUploadUrl).toContain('someBinaryId');
      expect(binaryUploadUrl).toContain('someBinaryName');
    });

    it('updates progress during upload', async () => {
      vi.spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockImplementationOnce(async (_url, _data, config) => {
          config?.onUploadProgress?.({
            loaded: 75,
            total: 100,
            bytes: 75,
            lengthComputable: true,
          });
          return {};
        });

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

      const file = new File(['content'], 'test.pdf', {
        type: 'application/pdf',
      });
      await userEvent.upload(
        screen.getByRole('button', { name: 'someFileLabelText' }),
        file,
      );

      const progressBar = screen.getByRole('progressbar');
      await expect.element(progressBar).toHaveAttribute('aria-valuenow', '75');
    });

    it('rounds progress to the nearest integer', async () => {
      vi.spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockImplementationOnce(async (_url, _data, config) => {
          config?.onUploadProgress?.({
            loaded: 1,
            total: 3,
            bytes: 1,
            lengthComputable: true,
          });
          return {};
        });

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
      vi.spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
        .mockImplementationOnce(async (_url, _data, config) => {
          config?.onUploadProgress?.({
            loaded: 42,
            total: undefined,
            bytes: 42,
            lengthComputable: false,
          });
          return {};
        });

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

  it('does not call axios when no file is selected', async () => {
    const postSpy = vi.spyOn(axios, 'post');

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

    expect(postSpy).not.toHaveBeenCalled();
  });

  it('derives hostRecordId and hostRecordType from root form values', async () => {
    const postSpy = vi
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: { binaryRecord: mockBinaryRecord } })
      .mockResolvedValue({});

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

    const file = new File(['content'], 'test.pdf', {
      type: 'application/pdf',
    });
    await userEvent.upload(
      screen.getByRole('button', { name: 'someFileLabelText' }),
      file,
    );

    expect(postSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        hostRecordId: 'myRecordId',
        hostRecordType: 'myRecordType',
      }),
    );
  });
});
