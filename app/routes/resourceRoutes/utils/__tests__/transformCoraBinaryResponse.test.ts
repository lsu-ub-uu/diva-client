import { describe, expect, it } from 'vitest';
import { transformCoraBinaryResponse } from '../transformCoraBinaryResponse';

describe('transformCoraBinaryResponse', () => {
  it('preserves Cora filename when it already has an extension', async () => {
    const response = new Response('binary-data', {
      headers: {
        'content-type': 'application/pdf',
        'content-disposition':
          'attachment; filename="fallback.pdf"; filename*=UTF-8\'\'r%C3%A9sum%C3%A9.pdf',
      },
    });

    const transformed = await transformCoraBinaryResponse(response, 'ignored');
    const contentDisposition = transformed.headers.get('content-disposition');

    expect(contentDisposition).toContain('filename="r_sum_.pdf"');
    expect(contentDisposition).toContain(
      "filename*=UTF-8''r%C3%A9sum%C3%A9.pdf",
    );
  });

  it('appends extension when Cora filename has none', async () => {
    const response = new Response('binary-data', {
      headers: {
        'content-type': 'application/pdf',
        'content-disposition':
          'attachment; filename="report"; filename*=UTF-8\'\'report',
      },
    });

    const transformed = await transformCoraBinaryResponse(response, 'ignored');
    const contentDisposition = transformed.headers.get('content-disposition');

    expect(contentDisposition).toContain('filename="report.pdf"');
    expect(contentDisposition).toContain("filename*=UTF-8''report.pdf");
  });

  it('uses fallback filename and inferred extension when Cora filename is missing', async () => {
    const response = new Response('binary-data', {
      headers: {
        'content-type': 'image/jpeg',
      },
    });

    const transformed = await transformCoraBinaryResponse(
      response,
      'image-file',
    );
    const contentDisposition = transformed.headers.get('content-disposition');

    expect(contentDisposition).toContain('filename="image-file.jpg"');
    expect(contentDisposition).toContain("filename*=UTF-8''image-file.jpg");
  });

  it('keeps fallback filename extension when already present', async () => {
    const response = new Response('binary-data', {
      headers: {
        'content-type': 'application/pdf',
      },
    });

    const transformed = await transformCoraBinaryResponse(
      response,
      'already-there.txt',
    );

    expect(transformed.headers.get('content-disposition')).toContain(
      'filename="already-there.txt"',
    );
  });

  it('preserves response status and body', async () => {
    const response = new Response('binary-data', {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'content-type': 'application/pdf',
      },
    });

    const transformed = await transformCoraBinaryResponse(response, 'download');

    expect(transformed.status).toBe(206);
    expect(transformed.statusText).toBe('Partial Content');
    await expect(transformed.text()).resolves.toBe('binary-data');
  });
});
