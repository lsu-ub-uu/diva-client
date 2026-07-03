import { NotFoundError } from '@/errorHandling/NotFoundError';
import { describe, expect, it, vi } from 'vitest';

import { getMarkdown } from '../getMarkdown.server';
import { loadMarkdownFile } from '../loadMarkdownFile.server';

vi.mock('../loadMarkdownFile.server');

describe('getMarkdown', () => {
  it('returns markdown and title from a mocked dynamic import', async () => {
    const testMarkdown = '# Mock title\n\nMock body';
    vi.mocked(loadMarkdownFile).mockResolvedValueOnce(testMarkdown);
    const result = await getMarkdown('cookie', 'en');

    expect(result).toEqual({
      markdown: testMarkdown,
      title: 'Mock title',
    });
  });

  it('throws NotFoundError when article is not found', async () => {
    await expect(
      getMarkdown('non-existent-article', 'en'),
    ).rejects.toBeInstanceOf(NotFoundError);
    await expect(getMarkdown('non-existent-article', 'en')).rejects.toThrow(
      'Article non-existent-article not found for language en',
    );
  });
});
