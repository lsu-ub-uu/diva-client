import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CollapsableText } from '../CollapsableText';
import userEvent from '@testing-library/user-event';

describe('CollapsableText', () => {
  it('does not render button for short text', () => {
    render(<CollapsableText text='Short text' />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Short text')).toBeInTheDocument();
  });

  it('shows collapsed text by default and expands on button click', async () => {
    const user = userEvent.setup();
    render(
      <CollapsableText
        text='Long text that exceeds the maximum length of 20 characters.'
        maxLength={20}
      />,
    );
    expect(screen.getByText('Long text that excee...')).toBeInTheDocument();
    await user.click(
      screen.getByRole('button', {
        name: 'divaClient_showMoreText',
      }),
    );
    expect(
      screen.getByText(
        'Long text that exceeds the maximum length of 20 characters.',
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'divaClient_showLessText',
      }),
    );
    expect(screen.getByText('Long text that excee...')).toBeInTheDocument();
  });
});
