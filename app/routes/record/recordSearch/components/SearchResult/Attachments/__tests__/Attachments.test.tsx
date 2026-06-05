import type { AttachmentsGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Attachments } from '../Attachments';

vi.mock('@/i18n/useLanguage');
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
  beforeEach(() => {
    vi.mocked(useLanguage).mockReturnValue('sv');
  });

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
          __text: { sv: 'Fulltext sv', en: 'Fulltext en' },
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
    expect(img).toHaveAttribute('alt', 'Fulltext sv');
  });

  it('uses correct language for alt text', () => {
    vi.mocked(useLanguage).mockReturnValue('en');

    const attachments = {
      attachment: [
        {
          _label: 'fullText',
          __text: { sv: 'Fulltext sv', en: 'Fulltext en' },
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
    expect(img).toHaveAttribute('alt', 'Fulltext en');
  });
});
