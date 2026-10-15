import { describe, expect, it } from 'vitest';
import { formatXml } from '../formatXml';

describe('formatXml', () => {
  it('strips an outer CDATA wrapper and indents XML', () => {
    expect(
      formatXml(
        '<![CDATA[<publication><pid>diva2:1255381</pid></publication>]]>',
      ),
    ).toBe('<publication>\n  <pid>diva2:1255381</pid>\n</publication>');
  });

  it('formats empty elements and keeps XML declarations', () => {
    expect(
      formatXml(
        '<?xml version="1.0"?><publication><note/><title>Title</title></publication>',
      ),
    ).toBe(
      '<?xml version="1.0"?>\n<publication>\n  <note/>\n  <title>Title</title>\n</publication>',
    );
  });

  it('returns an empty string for a missing value', () => {
    expect(formatXml(undefined)).toBe('');
  });
});
