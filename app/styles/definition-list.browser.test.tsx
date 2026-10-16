import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

describe('Definition list styles', () => {
  it('keeps descriptions block-level and unpunctuated by default', async () => {
    const screen = await render(
      <dl>
        <dt>Authors</dt>
        <dd>First author</dd>
        <dd>Second author</dd>
        <dt>Published</dt>
        <dd>2026</dd>
      </dl>,
    );

    const firstTerm = screen.getByText('Authors').element();
    const secondTerm = screen.getByText('Published').element();
    const description = screen.getByText('Second author').element();
    expect(getComputedStyle(firstTerm).marginTop).toBe('0px');
    expect(parseFloat(getComputedStyle(secondTerm).marginTop)).toBeGreaterThan(
      0,
    );
    expect(getComputedStyle(description).display).toBe('block');
    expect(getComputedStyle(description, '::before').content).toBe('none');
    expect(
      parseFloat(getComputedStyle(description).paddingLeft),
    ).toBeGreaterThan(0);
  });

  it('supports compact spacing and inline labels', async () => {
    const screen = await render(
      <>
        <dl>
          <dt>Default first</dt>
          <dd>One</dd>
          <dt>Default second</dt>
          <dd>Two</dd>
        </dl>
        <dl data-density='compact'>
          <dt>Compact first</dt>
          <dd>Three</dd>
          <dt>Compact second</dt>
          <dd>Four</dd>
        </dl>
        <dl data-layout='inline'>
          <dt>Inline first</dt>
          <dd>Five</dd>
          <dt>Inline second</dt>
          <dd>Six</dd>
          <dt>Block override</dt>
          <dd data-display='block'>Block value</dd>
        </dl>
      </>,
    );

    expect(
      parseFloat(
        getComputedStyle(screen.getByText('Compact second').element())
          .marginTop,
      ),
    ).toBeLessThan(
      parseFloat(
        getComputedStyle(screen.getByText('Default second').element())
          .marginTop,
      ),
    );
    const inlineTerm = screen.getByText('Inline second').element();
    expect(getComputedStyle(inlineTerm).display).toBe('inline');
    expect(getComputedStyle(inlineTerm).marginTop).toBe('0px');
    expect(getComputedStyle(inlineTerm, '::before').display).toBe('block');
    expect(getComputedStyle(inlineTerm, '::after').content).toBe('":"');
    expect(getComputedStyle(screen.getByText('Six').element()).display).toBe(
      'inline',
    );
    expect(
      getComputedStyle(screen.getByText('Block value').element()).display,
    ).toBe('block');
  });

  it('opts into repeated-value commas but excludes buttons and block values', async () => {
    const screen = await render(
      <dl data-values='inline'>
        <dt>Authors</dt>
        <dd>First</dd>
        <dd>Second</dd>
        <dd>
          <button type='button'>Show more</button>
        </dd>
        <dt>Notes</dt>
        <dd data-display='block'>First note</dd>
        <dd data-display='block'>Second note</dd>
        <dt>Single</dt>
        <dd data-display='inline'>Inline value</dd>
      </dl>,
    );

    const second = screen.getByText('Second', { exact: true }).element();
    expect(getComputedStyle(second).display).toBe('inline');
    expect(getComputedStyle(second).paddingLeft).toBe('0px');
    expect(getComputedStyle(second, '::before').content).toBe('", "');
    const buttonDescription = screen
      .getByRole('button')
      .element().parentElement!;
    expect(getComputedStyle(buttonDescription, '::before').content).toBe(
      'none',
    );
    const block = screen.getByText('Second note').element();
    expect(getComputedStyle(block).display).toBe('block');
    expect(getComputedStyle(block, '::before').display).toBe('none');
    expect(
      getComputedStyle(screen.getByText('Inline value').element()).display,
    ).toBe('inline');
  });

  it('does not apply outer list variants to a nested list', async () => {
    const screen = await render(
      <dl data-layout='inline' data-values='inline'>
        <dt>Outer</dt>
        <dd>
          <dl>
            <dt>Nested</dt>
            <dd>Nested first</dd>
            <dd>Nested second</dd>
          </dl>
        </dd>
      </dl>,
    );

    const term = screen.getByText('Nested', { exact: true }).element();
    const description = screen.getByText('Nested second').element();
    expect(getComputedStyle(term).display).toBe('block');
    expect(getComputedStyle(term, '::after').content).toBe('none');
    expect(getComputedStyle(description).display).toBe('block');
    expect(getComputedStyle(description, '::before').content).toBe('none');
  });
});
