import type { AttachmentsGroup } from '@/generatedTypes/divaTypes';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Attachments } from '../Attachments';

vi.mock('@/utils/createDownloadLinkFromResourceLink', () => ({
  createDownloadLinkFromResourceLink: ({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) => `/binary/${id}/${name}`,
}));

describe('<Attachments />', () => {
  it('uses preview image thumbnail as fallback when firstAttachment has no master url', () => {
    const attachments = {
      attachment: [
        {
          _label: 'fullText',
          file: {
            value: 'someFileId',
            linkedRecord: {
              binary: {
                recordInfo: { id: { value: 'binary1' } },
                _type: 'generic',
              },
            },
          },
        },
        {
          _label: 'previewImage',
          file: {
            value: 'previewFileId',
            linkedRecord: {
              binary: {
                recordInfo: { id: { value: 'binary2' } },
                thumbnail: {
                  thumbnail: {
                    id: 'thumb-id',
                    mimeType: 'image/jpeg',
                    name: 'preview-thumb.jpg',
                  },
                },
                _type: 'generic',
              },
            },
          },
        },
      ],
    } as AttachmentsGroup;

    const { container } = render(<Attachments attachments={attachments} />);

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/binary/thumb-id/preview-thumb.jpg');
    expect(img).toHaveAttribute('alt', '');
  });

  it('returns null when attachments is undefined', () => {
    const { container } = render(<Attachments />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when attachments.attachment is undefined', () => {
    const { container } = render(<Attachments attachments={{}} />);
    expect(container.innerHTML).toBe('');
  });

  it('returns null when attachments.attachment is empty', () => {
    const { container } = render(
      <Attachments attachments={{ attachment: [] }} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('returns null when firstAttachment has no master and no preview image exists', () => {
    const attachments = {
      attachment: [
        {
          _label: 'fullText',
          file: {
            value: 'someFileId',
            linkedRecord: {
              binary: {
                recordInfo: { id: { value: 'binary1' } },
                _type: 'generic',
              },
            },
          },
        },
      ],
    } as AttachmentsGroup;

    const { container } = render(<Attachments attachments={attachments} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders linked thumbnail with download link when binary has master and thumbnail', () => {
    const attachments = {
      attachment: [
        {
          _label: 'fullText',
          file: {
            value: 'someFileId',
            linkedRecord: {
              binary: {
                recordInfo: { id: { value: 'binary1' } },
                master: {
                  master: {
                    id: 'master-id',
                    mimeType: 'application/pdf',
                    name: 'file.pdf',
                  },
                  fileSize: { value: '1048576' },
                },
                thumbnail: {
                  thumbnail: {
                    id: 'thumb-id',
                    mimeType: 'image/jpeg',
                    name: 'thumb.jpg',
                  },
                },
                _type: 'generic',
              },
            },
          },
        },
      ],
    } as AttachmentsGroup;

    const { container } = render(<Attachments attachments={attachments} />);

    const anchor = container.querySelector('a');
    expect(anchor).toHaveAttribute('href', '/binary/master-id/file.pdf');
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/binary/thumb-id/thumb.jpg');
  });

  it('includes displayLabel in alt text when present', () => {
    const attachments = {
      attachment: [
        {
          _label: 'fullText',
          displayLabel: { value: 'Chapter 1' },
          file: {
            value: 'someFileId',
            linkedRecord: {
              binary: {
                recordInfo: { id: { value: 'binary1' } },
                master: {
                  master: {
                    id: 'master-id',
                    mimeType: 'application/pdf',
                    name: 'file.pdf',
                  },
                  fileSize: { value: '1048576' },
                },
                thumbnail: {
                  thumbnail: {
                    id: 'thumb-id',
                    mimeType: 'image/jpeg',
                    name: 'thumb.jpg',
                  },
                },
                _type: 'generic',
              },
            },
          },
        },
      ],
    } as AttachmentsGroup;

    const { container } = render(<Attachments attachments={attachments} />);

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'Chapter 1, fullTextItemText (1 MB)');
  });

  it('does not include displayLabel prefix in alt text when displayLabel is absent', () => {
    const attachments = {
      attachment: [
        {
          _label: 'fullText',
          file: {
            value: 'someFileId',
            linkedRecord: {
              binary: {
                recordInfo: { id: { value: 'binary1' } },
                master: {
                  master: {
                    id: 'master-id',
                    mimeType: 'application/pdf',
                    name: 'file.pdf',
                  },
                  fileSize: { value: '2048' },
                },
                thumbnail: {
                  thumbnail: {
                    id: 'thumb-id',
                    mimeType: 'image/jpeg',
                    name: 'thumb.jpg',
                  },
                },
                _type: 'generic',
              },
            },
          },
        },
      ],
    } as AttachmentsGroup;

    const { container } = render(<Attachments attachments={attachments} />);

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'fullTextItemText (2 KB)');
  });
});
