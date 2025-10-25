import type { OriginInfoGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OriginInfo } from '../OriginInfo';

describe('OriginInfo', () => {
  it('renders linked and unlinked agents correctly', () => {
    const originInfo = {
      __text: { en: 'Origin info', sv: 'Ursprung' },
      agent: [
        {
          publisher: {
            value: 'publisher1',
            linkedRecord: {
              publisher: {
                name_type_corporate: {
                  namePart: { value: 'Linked publisher1' },
                },
              },
            },
          },
        },
        {
          publisher: {
            value: 'publisher2',
            linkedRecord: {
              publisher: {
                name_type_corporate: {
                  namePart: { value: 'Linked publisher2' },
                },
              },
            },
          },
        },
        { namePart: { value: 'Uncontrolled agent1' } },
        { namePart: { value: 'Uncontrolled agent2' } },
      ],
    } as OriginInfoGroup;

    render(<OriginInfo originInfo={originInfo} />);

    expect(screen.getByText('agentGroupText')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled agent1')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled agent2')).toBeInTheDocument();
    expect(screen.getByText('Linked publisher1')).toBeInTheDocument();
    expect(screen.getByText('Linked publisher2')).toBeInTheDocument();
  });

  it('renders linked publisher name over uncontrolled', () => {
    const originInfo = {
      __text: { en: 'Origin info', sv: 'Ursprung' },
      agent: [
        {
          namePart: { value: 'Uncontrolled name' },
          publisher: {
            value: 'publisher2',
            linkedRecord: {
              publisher: {
                name_type_corporate: {
                  namePart: { value: 'Linked name' },
                },
              },
            },
          },
        },
      ],
    } as OriginInfoGroup;

    render(<OriginInfo originInfo={originInfo} />);

    expect(screen.getByText('Linked name')).toBeInTheDocument();
    expect(screen.queryByText('Uncontrolled name')).not.toBeInTheDocument();
  });
});
