import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { exportForTesting } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { SentimentNeutralIcon } from '@/icons';

describe('<Alert />', () => {
  it('renders an alert with text', () => {
    render(<Alert severity='success'>some alert text</Alert>);
    const alertText = screen.getByText('some alert text');
    expect(alertText).toBeInTheDocument();
  });
    it.each([['success', 'CheckCircle'], ['info', 'Info'], ['warning', 'Warning'], ['error', 'Error']])(
    'render an alert with icon for %s and text',
    (arg1, arg2) => {
      // @ts-ignore
      render(<Alert severity={arg1}>some alert text</Alert>);
      const expected = screen.getByTitle(arg2);
      expect(expected).toBeInTheDocument();
      const alertText = screen.getByText('some alert text');
      expect(alertText).toBeInTheDocument();
    },
  );
  it('renders an alert with overridden icon', () => {
    render(<Alert severity='success' icon={<SentimentNeutralIcon />}>some alert text</Alert>);
    const expected = screen.getByTitle('SentimentNeutral');
    expect(expected).toBeInTheDocument();
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
