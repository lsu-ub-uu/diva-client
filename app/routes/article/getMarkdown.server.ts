import { NotFoundError } from '@/errorHandling/NotFoundError';
import { loadMarkdownFile } from './loadMarkdownFile.server';

export const getMarkdown = async (articleId: string, language: 'sv' | 'en') => {
  const markdownContent = await loadMarkdownFile(articleId, language);

  if (!markdownContent) {
    throw new NotFoundError(
      `Article ${articleId} not found for language ${language}`,
    );
  }

  const title = markdownContent.split('\n')[0].replace(/^#\s+/, '').trim();
  return { markdown: markdownContent, title };
};
