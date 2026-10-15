export function formatXml(value: string | undefined): string {
  if (!value) return '';

  const xml = value
    .trim()
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
    .trim();
  const tokens =
    xml.match(/<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<[^>]+>|[^<]+/g) ?? [];
  const lines: string[] = [];
  let depth = 0;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (!token.startsWith('<')) {
      const text = token.trim();
      if (text) lines.push(`${'  '.repeat(depth)}${text}`);
      continue;
    }

    if (token.startsWith('</')) {
      depth = Math.max(0, depth - 1);
      lines.push(`${'  '.repeat(depth)}${token}`);
      continue;
    }

    if (token.startsWith('<!') || token.startsWith('<?')) {
      lines.push(`${'  '.repeat(depth)}${token}`);
      continue;
    }

    const nextText = tokens[index + 1];
    const nextClose = tokens[index + 2];
    const elementName = token.match(/^<([^\s/>]+)/)?.[1];

    if (
      elementName &&
      nextText &&
      !nextText.startsWith('<') &&
      nextClose === `</${elementName}>`
    ) {
      lines.push(`${'  '.repeat(depth)}${token}${nextText.trim()}${nextClose}`);
      index += 2;
      continue;
    }

    lines.push(`${'  '.repeat(depth)}${token}`);
    if (!token.endsWith('/>')) depth += 1;
  }

  return lines.join('\n');
}
