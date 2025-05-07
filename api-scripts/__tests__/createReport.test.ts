import { beforeEach, describe, expect, test, vi } from 'vitest';
import createReport from '../createReport';
import { readFileSync } from 'fs';
import { mock } from 'vitest-mock-extended';

// Mock dependencies
vi.mock('fs');

describe('createReport', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  test('should successfully create a report and log the result', async () => {
    // Arrange

    const mockBody = '<xml>mock data</xml>';
    vi.mocked(readFileSync).mockReturnValue(mockBody);

    const mockResponse = mock<Response>({
      text: vi.fn().mockResolvedValue('<xml>response data</xml>'),
    });
    vi.mocked(fetch).mockResolvedValue(mockResponse);

    const consoleInfoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => {});

    // Act
    await createReport('mock-token');

    // Assert
    expect(readFileSync).toHaveBeenCalledWith(
      new URL('../diva-report.xml', import.meta.url),
      'utf8',
    );
    expect(fetch).toHaveBeenCalledWith(
      'https://cora.epc.ub.uu.se/diva/rest/record/diva-output',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.cora.recordGroup+xml',
          Accept: 'application/vnd.cora.record+xml',
          authToken: 'mock-token',
        },
        body: mockBody,
      },
    );
    expect(mockResponse.text).toHaveBeenCalledOnce();
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Successfully created record',
      '<xml>response data</xml>',
    );

    // Cleanup
    consoleInfoSpy.mockRestore();
  });

  test('should log an error if the fetch fails', async () => {
    // Arrange
    const mockBody = '<xml>mock data</xml>';
    vi.mocked(readFileSync).mockReturnValue(mockBody);

    const mockError = new Error('Fetch failed');
    vi.mocked(fetch).mockRejectedValue(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Act
    await createReport('mock-token');

    // Assert
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    // Cleanup
    consoleErrorSpy.mockRestore();
  });
});
