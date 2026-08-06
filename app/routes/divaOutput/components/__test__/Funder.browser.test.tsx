import { describe, expect, it } from 'vitest';
import { Funder } from '../Funder';
import { render } from 'vitest-browser-react';
import type { NameOrganisationFunderGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('Funder', () => {
  it('Renders nothing with no funder', async () => {
    const screen = await render(<Funder funder={undefined} />);

    expect(
      screen.baseElement.querySelector('h1, h2, h3, h4, h5, h6'),
    ).toBeNull();
  });
  it('Render a funder swedish name', async () => {
    const funder = {
      funder: {
        value: 'funder:987654321',
        linkedRecord: {
          funder: {
            recordInfo: { type: { value: 'diva-funder' } },
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Linked funder SV',
                  },
                },
              },
            ],
          },
        },
        __text: { en: 'Linked funder' },
      },
      role: { roleTerm: { value: 'fnd' } },
      _type: 'corporate',
      _otherType: 'funder',
      __text: { en: 'Funder' },
    } as NameOrganisationFunderGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Funder funder={funder} /> },
    ]);
    const screen = await render(<RoutesStub />);

    expect(screen.getByRole('heading').element()).toHaveTextContent('Funder');
    expect(screen.getByRole('link').element()).toHaveTextContent(
      'Linked funder SV',
    );
  });

  it('Render linked funder english name', async () => {
    const funder = {
      funder: {
        value: '987654321',
        linkedRecord: {
          funder: {
            recordInfo: { type: { value: 'diva-funder' } },
            authority: [
              {
                _lang: 'swe',
                name_type_corporate: {
                  namePart: {
                    value: 'Linked funder',
                  },
                },
              },
              {
                _lang: 'eng',
                name_type_corporate: {
                  namePart: {
                    value: 'Linked funder EN',
                  },
                },
              },
            ],
          },
        },
        __text: { en: 'Linked funder' },
      },
      role: { roleTerm: { value: 'fnd' } },
      _type: 'corporate',
      _otherType: 'funder',
      __text: { en: 'Funder' },
    } as NameOrganisationFunderGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Funder funder={funder} /> },
    ]);
    const screen = await render(<RoutesStub />);

    expect(screen.getByRole('link').element()).toHaveTextContent(
      'Linked funder EN',
    );
  });

  it('renders a text funder', async () => {
    const funder = {
      role: { roleTerm: { value: 'fnd' } },
      namePart_type_funder: { value: 'Text funder', __text: { en: 'Funder' } },
      _type: 'corporate',
      _otherType: 'funder',
      __text: { en: 'Funder heading' },
    } as NameOrganisationFunderGroup;

    const screen = await render(<Funder funder={funder} />);

    expect(screen.getByRole('heading').element()).toHaveTextContent(
      'Funder heading',
    );
    await expect.element(screen.getByText('Text funder')).toBeVisible();
  });
});
