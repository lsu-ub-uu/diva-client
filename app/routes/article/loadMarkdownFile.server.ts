export const loadMarkdownFile = async (
  articleId: string,
  language: 'sv' | 'en',
) => {
  const markdown = await import(
    `./markdown/${articleId}.${language}.md?raw`
  ).catch(() => {
    return null;
  });
  return markdown ? markdown.default.trim() : null;
};
