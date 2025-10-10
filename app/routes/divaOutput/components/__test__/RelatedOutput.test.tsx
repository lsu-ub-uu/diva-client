import { describe, expect, it } from 'vitest';
import { RelatedOutput } from '../RelatedOutput';
import { render, screen } from '@testing-library/react';
import type { RelatedOutputGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('RelatedOutput', () => {
  it('Renders nothing when no related output', () => {
    render(<RelatedOutput relatedOutput={undefined} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('Renders nothing when no related output', () => {
    const relatedOutput = {
      output: {
        value: 'divaOutput:1234',
        linkedRecord: {
          output: {
            titleInfo: { title: { value: 'Linked record title' } },
          },
        },
        __text: { en: 'Linked Related Output' },
      },
      __text: { en: 'RelatedOutput' },
    } as RelatedOutputGroup;

    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <RelatedOutput relatedOutput={relatedOutput} />,
      },
    ]);
    render(<RoutesStub />);

    expect(
      screen.getByRole('link', { name: 'Linked record title' }),
    ).toBeInTheDocument();
  });
});
