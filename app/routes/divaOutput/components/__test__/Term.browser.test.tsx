import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Term } from '../Term';

describe('Term', () => {
  it('retains translated labels, language mapping and text direction', async () => {
    const screen = await render(
      <dl data-values='inline'>
        <Term
          label={{ __text: { en: 'Title', sv: 'Titel' } }}
          value='Research'
          lang='eng'
        />
      </dl>,
    );

    await expect.element(screen.getByRole('term')).toHaveTextContent('Title');
    const description = screen.getByRole('definition');
    await expect.element(description).toHaveAttribute('lang', 'en');
    await expect.element(description).toHaveAttribute('dir', 'auto');
    await expect.element(description).toHaveAttribute('data-display', 'inline');
    expect(getComputedStyle(description.element()).display).toBe('inline');
  });

  it('renders array values as separate block descriptions', async () => {
    const screen = await render(
      <dl data-values='inline'>
        <Term label='Authors' value={['Anna', 'Erik']} variant='block' />
      </dl>,
    );

    for (const name of ['Anna', 'Erik']) {
      const description = screen.getByText(name).element();
      expect(getComputedStyle(description).display).toBe('block');
      expect(getComputedStyle(description, '::before').display).toBe('none');
    }
  });

  it('continues to omit terms without a label or value', async () => {
    const screen = await render(
      <dl>
        <Term label='Missing value' />
        <Term value='Missing label' />
        <Term label='Empty value' value='' />
      </dl>,
    );

    await expect.element(screen.getByRole('term')).not.toBeInTheDocument();
    await expect
      .element(screen.getByRole('definition'))
      .not.toBeInTheDocument();
  });
});
