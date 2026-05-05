import { describe, expect, it } from 'vitest';
import { Funder } from '../Funder';
import { render, screen } from '@testing-library/react';
import type { NameOrganisationFunderGroup } from '@/generatedTypes/divaTypes';
import { createRoutesStub } from 'react-router';

describe('Funder', () => {
  it('Renders nothing with no funder', () => {
    render(<Funder funder={undefined} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
  it('Render a funder swedish name', () => {
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
    render(<RoutesStub />);

    expect(screen.getByRole('heading')).toHaveTextContent('Funder');
    expect(screen.getByRole('link')).toHaveTextContent('Linked funder SV');
  });

  it('Render linked funder english name', () => {
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
    render(<RoutesStub />);

    expect(screen.getByRole('link')).toHaveTextContent('Linked funder EN');
  });

  it('renders a text funder', () => {
    const funder = {
      role: { roleTerm: { value: 'fnd' } },
      namePart_type_funder: { value: 'Text funder' },
      _type: 'corporate',
      _otherType: 'funder',
      __text: { sv: 'Funder heading' },
    } as NameOrganisationFunderGroup;

    render(<Funder funder={funder} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Funder heading');
    expect(screen.getByText('Text funder')).toBeInTheDocument();
  });
});
