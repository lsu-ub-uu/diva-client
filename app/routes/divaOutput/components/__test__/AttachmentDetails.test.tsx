import type { AttachmentGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { AttachmentDetails } from '../AttachmentDetails';

describe('AttachmentDetails', () => {
  it('is initially collapsed and can be expanded', async () => {
    const user = userEvent.setup();
    const mockAttachment = {
      displayLabel: {
        __text: { en: 'Display Label', sv: 'Visningsetikett' },
        value: 'Test Attachment',
      },
      type: {
        __text: { en: 'Type', sv: 'Typ' },
        __valueText: { en: 'Image', sv: 'Bild' },
        value: 'image',
      },
    } as Partial<AttachmentGroup>;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AttachmentDetails attachment={mockAttachment} />,
      },
    ]);
    render(<RoutesStub />);

    expect(screen.queryByText('Test Attachment')).not.toBeVisible();

    await user.click(screen.getByText('divaClient_attachmentDetailsText'));

    expect(screen.getByText('Test Attachment')).toBeVisible();
  });

  it('displays basic attachment information when expanded', async () => {
    const user = userEvent.setup();
    const mockAttachment = {
      displayLabel: {
        __text: { en: 'Display Label' },
        value: 'Test Document',
      },
      type: {
        __text: { en: 'Type' },
        __valueText: { en: 'Attachment' },
        value: 'attachment',
      },
      attachmentFile: {
        value: 'binary:123456',
        linkedRecord: {
          binary: {
            originalFileName: {
              __text: { en: 'Original File Name', sv: 'Ursprungligt filnamn' },
              value: 'document.pdf',
            },
            master: {
              mimeType: {
                __text: { en: 'MIME Type', sv: 'MIME-typ' },
                value: 'application/pdf',
              },
              fileSize: {
                __text: { en: 'File Size', sv: 'Filstorlek' },
                value: '1048576',
              },
            },
          },
        },
      },
    } as AttachmentGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AttachmentDetails attachment={mockAttachment} />,
      },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_attachmentDetailsText'));

    expect(screen.getByText('Display Label')).toBeInTheDocument();
    expect(screen.getByText('Test Document')).toBeInTheDocument();

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Attachment')).toBeInTheDocument();

    expect(screen.getByText('Original File Name')).toBeInTheDocument();
    expect(screen.getByText('document.pdf')).toBeInTheDocument();

    expect(screen.getByText('MIME Type')).toBeInTheDocument();
    expect(screen.getByText('application/pdf')).toBeInTheDocument();

    expect(screen.getByText('File Size')).toBeInTheDocument();
    expect(screen.getByText('1 MB')).toBeInTheDocument();
  });

  it('displays visibility information with formatted timestamp when available', async () => {
    const user = userEvent.setup();
    const mockAttachment = {
      attachmentFile: {
        linkedRecord: {
          binary: {
            recordInfo: {
              visibility: {
                __text: { en: 'Visibility', sv: 'Synlighet' },
                __valueText: { en: 'Public', sv: 'Offentlig' },
              },
              tsVisibility: {
                value: '2023-01-01T12:00:00Z',
              },
            },
          },
        },
      },
    } as AttachmentGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AttachmentDetails attachment={mockAttachment} />,
      },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_attachmentDetailsText'));

    expect(screen.getByText('Visibility')).toBeInTheDocument();
    expect(screen.getByText(/Public/)).toBeInTheDocument();
    expect(screen.getByText(/(01\/01\/2023, 13:00:00)/)).toBeInTheDocument();
  });

  it('displays admin info fields when available', async () => {
    const user = userEvent.setup();
    const mockAttachment = {
      adminInfo: {
        identifier_type_registrationNumber: {
          __text: { en: 'Registration Number', sv: 'Registreringsnummer' },
          value: 'REG-123456',
        },
        availability: {
          __text: { en: 'Availability', sv: 'Tillgänglighet' },
          __valueText: { en: 'Available', sv: 'Tillgänglig' },
        },
        dateAvailability: {
          year: { value: '2023' },
          month: { value: '06' },
          day: { value: '15' },
        },
        secrecy: {
          __text: { en: 'Secrecy', sv: 'Sekretess' },
          __valueText: { en: 'Open', sv: 'Öppen' },
        },
        note_type_attachment: {
          __text: { en: 'Attachment Note', sv: 'Bilagenotering' },
          value: 'This is an important document',
        },
      },
    } as AttachmentGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AttachmentDetails attachment={mockAttachment} />,
      },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_attachmentDetailsText'));

    expect(screen.getByText('Registration Number')).toBeInTheDocument();
    expect(screen.getByText('REG-123456')).toBeInTheDocument();

    expect(screen.getByText('Availability')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();

    expect(screen.getByText('Secrecy')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();

    expect(screen.getByText('Attachment Note')).toBeInTheDocument();
    expect(
      screen.getByText('This is an important document'),
    ).toBeInTheDocument();
  });

  it('displays attachment version note when available', async () => {
    const user = userEvent.setup();
    const mockAttachment = {
      note_type_attachmentVersion: {
        __text: { en: 'Attachment Version', sv: 'Bilageversion' },
        __valueText: { en: 'Final Version', sv: 'Slutgiltig version' },
      },
    } as AttachmentGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AttachmentDetails attachment={mockAttachment} />,
      },
    ]);
    render(<RoutesStub />);

    await user.click(screen.getByText('divaClient_attachmentDetailsText'));

    expect(screen.getByText('Attachment Version')).toBeInTheDocument();
    expect(screen.getByText('Final Version')).toBeInTheDocument();
  });

  it('handles missing or empty data gracefully', async () => {
    const mockAttachment = {} as AttachmentGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <AttachmentDetails attachment={mockAttachment} />,
      },
    ]);
    render(<RoutesStub />);

    expect(
      screen.getByText('divaClient_attachmentDetailsText'),
    ).toBeInTheDocument();
  });
});
