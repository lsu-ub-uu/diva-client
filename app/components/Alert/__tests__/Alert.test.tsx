import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle } from '@/components/Alert/Alert';

describe('<Alert />', () => {
  it('renders an alert with text', () => {
    render(<Alert severity='success'>some alert text</Alert>);
    const alertText = screen.getByText('some alert text');
    expect(alertText).toBeInTheDocument();
  });

  it('render an alert with text and icon, and title', () => {
    render(
      <Alert severity='success'>
        <AlertTitle>some alert title text</AlertTitle>some alert text
      </Alert>,
    );
    const alertText = screen.getByText('some alert text');
    const alertTitleText = screen.getByText('some alert title text');
    expect(alertText).toBeInTheDocument();
    expect(alertTitleText).toBeInTheDocument();
  });
});
