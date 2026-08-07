import type {
  AttachmentGroup,
  BinaryGroup,
  MasterGroup,
  ThumbnailGroup,
} from '@/generatedTypes/divaTypes';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { Attachment } from '../Attachment';

vi.mock('@/i18n/useLanguage', () => ({
  useLanguage: () => 'en',
}));

vi.mock('@/utils/createDownloadLinkFromResourceLink', () => ({
  createDownloadLinkFromResourceLink: ({
    id,
    name,
  }: {
    id: string;
    name: string;
  }) => `/binary/${id}/${name}`,
}));

vi.mock('../AttachmentDetails', () => ({
  AttachmentDetails: () => <div data-testid='attachment-details' />,
}));

const masterLink = {
  id: 'master123',
  mimeType: 'application/pdf',
  name: 'document.pdf',
};
const thumbnailLink = {
  id: 'thumb123',
  mimeType: 'image/jpeg',
  name: 'thumb.jpg',
};

const makeAttachment = (
  overrides?: Partial<AttachmentGroup>,
): AttachmentGroup =>
  ({
    _label: 'fullText',
    file: {
      value: 'binary:123',
      linkedRecord: {
        binary: {
          master: {
            master: masterLink,
            fileSize: { value: '1048576' },
            mimeType: { value: 'application/pdf' },
          },
        } as BinaryGroup,
      },
    },
    ...overrides,
  }) as AttachmentGroup;

describe('<Attachment>', () => {
  it('returns null when file is absent', async () => {
    const attachment = { _label: 'fullText' } as AttachmentGroup;

    const screen = await render(<Attachment attachment={attachment} />);

    expect(screen.baseElement.querySelector('.attachment')).toBeNull();
  });

  it('returns null when master resource link is absent', async () => {
    const attachment = makeAttachment();
    (attachment.file!.linkedRecord.binary.master as MasterGroup).master =
      undefined;

    const screen = await render(<Attachment attachment={attachment} />);

    expect(screen.baseElement.querySelector('.attachment')).toBeNull();
  });

  it('renders attachment container with heading and download link', async () => {
    const screen = await render(<Attachment attachment={makeAttachment()} />);

    await expect
      .element(screen.getByRole('heading', { level: 3 }))
      .toBeVisible();
    const link = screen.getByRole('link', { name: /fullTextItemText/ });
    await expect.element(link).toBeVisible();
    await expect
      .element(link)
      .toHaveAttribute('href', '/binary/master123/document.pdf');
  });

  it('renders thumbnail when available', async () => {
    const attachment = makeAttachment();
    (attachment.file!.linkedRecord.binary as BinaryGroup).thumbnail = {
      thumbnail: thumbnailLink,
    } as ThumbnailGroup;

    const screen = await render(<Attachment attachment={attachment} />);

    const img = screen.getByRole('img');
    await expect.element(img).toBeVisible();
    await expect
      .element(img)
      .toHaveAttribute('src', '/binary/thumb123/thumb.jpg');
  });

  it('renders displayLabel when provided', async () => {
    const attachment = makeAttachment({
      displayLabel: { value: 'My custom label' },
    });

    const screen = await render(<Attachment attachment={attachment} />);

    await expect.element(screen.getByText('My custom label')).toBeVisible();
  });

  it('renders formatted MIME type label', async () => {
    const screen = await render(<Attachment attachment={makeAttachment()} />);

    await expect.element(screen.getByText('PDF')).toBeVisible();
  });

  it.each([
    ['application/pdf', 'PDF'],
    ['text/html', 'HTML'],
    ['image/jpeg', 'JPEG'],
    ['image/png', 'PNG'],
    ['image/gif', 'GIF'],
    ['image/tiff', 'TIFF'],
    ['application/msword', 'Word'],
    [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Word',
    ],
    ['application/vnd.ms-excel', 'Excel'],
    [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Excel',
    ],
    ['application/zip', 'ZIP'],
    ['text/plain', 'Text'],
  ])('maps MIME type %s to label %s', async (mimeType, expectedLabel) => {
    const attachment = makeAttachment();
    (attachment.file!.linkedRecord.binary.master as MasterGroup).mimeType = {
      value: mimeType,
    };

    const screen = await render(<Attachment attachment={attachment} />);

    await expect
      .element(screen.getByText(expectedLabel, { exact: true }))
      .toBeVisible();
  });

  it('does not render MIME type label when mimeType is absent', async () => {
    const attachment = makeAttachment();
    delete (attachment.file!.linkedRecord.binary.master as MasterGroup)
      .mimeType;

    const screen = await render(<Attachment attachment={attachment} />);

    expect(screen.baseElement.textContent).not.toContain('PDF');
  });

  it('renders AttachmentDetails component', async () => {
    const screen = await render(<Attachment attachment={makeAttachment()} />);

    await expect
      .element(screen.getByTestId('attachment-details'))
      .toBeInTheDocument();
  });
});
