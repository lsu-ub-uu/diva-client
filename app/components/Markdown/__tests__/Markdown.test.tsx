import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../Markdown';

const normalizeHtml = (html: string) =>
  html.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();

describe('Markdown', () => {
  it.each([
    {
      description: 'renders heading 1',
      markdown: '# Main heading',
      expectedHtml: '<h1>Main heading</h1>',
    },
    {
      description: 'renders heading 2',
      markdown: '## Main heading',
      expectedHtml: '<h2>Main heading</h2>',
    },
    {
      description: 'renders heading 3',
      markdown: '### Main heading',
      expectedHtml: '<h3>Main heading</h3>',
    },
    {
      description: 'renders heading 4',
      markdown: '#### Main heading',
      expectedHtml: '<h4>Main heading</h4>',
    },
    {
      description: 'renders heading 5',
      markdown: '##### Main heading',
      expectedHtml: '<h5>Main heading</h5>',
    },
    {
      description: 'renders heading 6',
      markdown: '###### Main heading',
      expectedHtml: '<h6>Main heading</h6>',
    },
    {
      description: 'renders paragraph',
      markdown: 'This is a paragraph.',
      expectedHtml: '<p>This is a paragraph.</p>',
    },
    {
      description: 'renders multiple paragraph',
      markdown: `This is a paragraph.\n\nThis is another paragraph.`,
      expectedHtml:
        '<p>This is a paragraph.</p><p>This is another paragraph.</p>',
    },
    {
      description: 'renders bold text',
      markdown: '**Bold**',
      expectedHtml: '<p><strong>Bold</strong></p>',
    },
    {
      description: 'renders emphasis text',
      markdown: '*italic*',
      expectedHtml: '<p><em>italic</em></p>',
    },
    {
      description: 'renders block quotes',
      markdown: '>To be or not to be',
      expectedHtml: '<blockquote><p>To be or not to be</p></blockquote>',
    },
    {
      description: 'renders nested block quotes',
      markdown: `>To be or not to be\n>>That is the question`,
      expectedHtml:
        '<blockquote><p>To be or not to be</p><blockquote><p>That is the question</p></blockquote></blockquote>',
    },
    {
      description: 'renders unordered lists',
      markdown: '- First item\n- Second item',
      expectedHtml: '<ul><li>First item</li><li>Second item</li></ul>',
    },
    {
      description: 'renders ordered lists',
      markdown: '1. First item\n2. Second item',
      expectedHtml: '<ol><li>First item</li><li>Second item</li></ol>',
    },
    {
      description: 'renders gfm strikethrough',
      markdown: '~~Deprecated~~',
      expectedHtml: '<p><del>Deprecated</del></p>',
    },
    {
      description: 'renders inline code',
      markdown: 'Use `npm test` command.',
      expectedHtml: '<p>Use <code>npm test</code> command.</p>',
    },
    {
      description: 'renders fenced code block',
      markdown: '```\nconst value = 1;\n```',
      expectedHtml: '<pre><code>const value = 1; </code></pre>',
    },
    {
      description: 'renders fenced code block with language',
      markdown: '```typescript\nconst value = 1;\n```',
      expectedHtml:
        '<pre><code class="language-typescript">const value = 1; </code></pre>',
    },
    {
      description: 'renders hard line break',
      markdown: `First line  \nSecond line`,
      expectedHtml: '<p>First line<br> Second line</p>',
    },
    {
      description: 'renders horizontal line',
      markdown: `---`,
      expectedHtml: '<hr>',
    },
    {
      description: 'renders gfm table',
      markdown: `| Name  | Role      |
| ----- | --------- |
| Ada   | Engineer  |
| Grace | Scientist |`,
      expectedHtml:
        '<table><thead><tr><th>Name</th><th>Role</th></tr></thead><tbody><tr><td>Ada</td><td>Engineer</td></tr><tr><td>Grace</td><td>Scientist</td></tr></tbody></table>',
    },
    {
      description: 'renders links with target and rel attributes',
      markdown: '[Example](https://example.com)',
      expectedHtml:
        '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">Example</a></p>',
    },
  ])('$description', ({ markdown, expectedHtml }) => {
    const { container } = render(<Markdown content={markdown} />);

    expect(normalizeHtml(container.innerHTML)).toBe(expectedHtml);
  });
});
