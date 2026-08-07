import { describe, expect, it } from 'vitest';
import { RelatedOutput } from '../RelatedOutput';
import { render } from 'vitest-browser-react';
import type { RelatedOutputGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('RelatedOutput', () => {
  it('Renders nothing when no related output', async () => {
    const screen = await render(<RelatedOutput relatedOutput={undefined} />);

    expect(
      screen.baseElement.querySelector('h1, h2, h3, h4, h5, h6'),
    ).toBeNull();
  });

  it('Renders nothing when no related output', async () => {
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
    const screen = await render(<RoutesStub />);

    await expect
      .element(screen.getByRole('link', { name: 'Linked record title' }))
      .toBeVisible();
  });
});
