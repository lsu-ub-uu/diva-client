import { describe, expect, it } from 'vitest';
import { Funder } from '../Funder';
import { render, screen } from '@testing-library/react';
import type { RelatedItemFunderGroup } from '@/generatedTypes/divaTypes';
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
            authority_lang_swe: {
              name_type_corporate: {
                namePart: { value: 'Linked funder SV' },
              },
            },
          },
        },
        __text: { en: 'Linked funder' },
      },
      identifier_type_project: {
        value: '123456789',
        _type: 'project',
        __text: { en: 'project' },
      },
      _type: 'funder',
      __text: { en: 'Funder' },
    } as RelatedItemFunderGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Funder funder={funder} /> },
    ]);
    render(<RoutesStub />);

    expect(screen.getByRole('heading')).toHaveTextContent('Funder');
    expect(screen.getByRole('link')).toHaveTextContent('Linked funder SV');
    expect(screen.getByText('123456789')).toBeInTheDocument();
  });

  it('Render linked funder english name', () => {
    const funder = {
      funder: {
        value: '987654321',
        linkedRecord: {
          funder: {
            recordInfo: { type: { value: 'diva-funder' } },
            authority_lang_swe: {
              name_type_corporate: {
                namePart: { value: 'Linked funder' },
              },
            },
            variant_lang_eng: {
              name_type_corporate: {
                namePart: { value: 'Linked funder EN' },
              },
            },
          },
        },
        __text: { en: 'Linked funder' },
      },
      _type: 'funder',
      __text: { en: 'Funder' },
    } as RelatedItemFunderGroup;

    const RoutesStub = createRoutesStub([
      { path: '/', Component: () => <Funder funder={funder} /> },
    ]);
    render(<RoutesStub />);

    expect(screen.getByRole('link')).toHaveTextContent('Linked funder EN');
  });
});
