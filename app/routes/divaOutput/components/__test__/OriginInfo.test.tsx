import type { OriginInfoGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OriginInfo } from '../OriginInfo';

describe('OriginInfo', () => {
  it('renders linked and unlinked agents correctly', () => {
    const originInfo = {
      __text: { en: 'Origin info', sv: 'Ursprung' },
      agent_otherType_link: [
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
      ],
      agent_otherType_text: [
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
});
