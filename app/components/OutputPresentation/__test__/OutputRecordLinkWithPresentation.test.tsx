import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { formDefWithTwoTextVariableWithModeOutput } from '@/__mocks__/data/form/textVar';
import { renderWithRoutesStub } from '@/utils/testUtils';
import { OutputRecordLinkWithPresentation } from '../OutputRecordLinkWithPresentation';

describe('OutputRecordLinkWithPresentation', () => {
  it('renders a spinner while loading', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {})),
    );

    render(
      <OutputRecordLinkWithPresentation
        linkedRecordId='someRecordId'
        linkedRecordType='someRecordType'
        presentationRecordLinkId='somePresentationRecordLinkId'
      />,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders fallback ui when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Fetch error')));

    renderWithRoutesStub(
      <OutputRecordLinkWithPresentation
        linkedRecordId='someRecordId'
        linkedRecordType='someRecordType'
        presentationRecordLinkId='somePresentationRecordLinkId'
      />,
    );

    expect(
      await screen.findByText('someRecordType/someRecordId'),
    ).toBeInTheDocument();
  });

  it('renders record data when fetch succeeds', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          presentation: formDefWithTwoTextVariableWithModeOutput,
          record: {
            record: {
              data: {
                name: 'someRootNameInData',
                children: [{ name: 'someTextVar', value: 'someValue' }],
              },
            },
          },
        }),
      } as Response),
    );

    renderWithRoutesStub(
      <OutputRecordLinkWithPresentation
        linkedRecordId='someRecordId'
        linkedRecordType='someRecordType'
        presentationRecordLinkId='somePresentationRecordLinkId'
      />,
    );

    expect(await screen.findByText('someValue')).toBeInTheDocument();
  });

  it('aborts fetch signal on unmount', async () => {
    let abortSignal: AbortSignal | undefined;
    vi.stubGlobal(
      'fetch',
      vi.fn((_, init?: RequestInit) => {
        abortSignal = init?.signal as AbortSignal;
        return new Promise(() => {});
      }),
    );

    const { unmount } = renderWithRoutesStub(
      <OutputRecordLinkWithPresentation
        linkedRecordId='someRecordId'
        linkedRecordType='someRecordType'
        presentationRecordLinkId='somePresentationRecordLinkId'
      />,
    );

    expect(abortSignal).toBeDefined();
    expect(abortSignal?.aborted).toBe(false);

    unmount();

    expect(abortSignal?.aborted).toBe(true);
  });
});
