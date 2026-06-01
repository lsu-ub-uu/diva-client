import { Alert, AlertTitle } from '@/components/Alert/Alert';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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

  it.each([
    ['success', 'lucide-circle-check-big'],
    ['info', 'lucide-info'],
    ['neutral', 'lucide-info'],
    ['error', 'lucide-circle-x'],
    ['warning', 'lucide-triangle-alert'],
    ['unknown', 'lucide-triangle-alert'],
  ] as const)(
    'renders the correct icon for %s severity',
    (severity, expectedIconClass) => {
      const { container } = render(
        <Alert severity={severity as any}>alert text for {severity}</Alert>,
      );

      const icon = container.querySelector('svg');

      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass(expectedIconClass);
    },
  );

  it('renders action content when action prop is provided', () => {
    render(
      <Alert severity='info' action={<button type='button'>Undo</button>}>
        some alert text
      </Alert>,
    );

    expect(
      screen.getByRole('button', {
        name: 'Undo',
      }),
    ).toBeInTheDocument();
  });
});
