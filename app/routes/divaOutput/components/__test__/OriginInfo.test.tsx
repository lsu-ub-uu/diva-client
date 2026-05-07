import type { OriginInfoGroup } from '@/generatedTypes/divaTypes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OriginInfo } from '../OriginInfo';

describe('OriginInfo', () => {
  it('renders date issued', () => {
    const originInfo = {
      dateIssued: {
        day: { value: '01' },
        month: { value: '01' },
        year: { value: '2023' },
        __text: { en: 'Date issued' },
      },
    } as OriginInfoGroup;

    render(<OriginInfo originInfo={originInfo} />);

    expect(screen.getByText('Date issued')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });

  it('renders copyright date', () => {
    const originInfo = {
      copyrightDate: {
        day: { value: '15' },
        month: { value: '06' },
        year: { value: '2020' },
        __text: { en: 'Copyright date' },
      },
    } as OriginInfoGroup;

    render(<OriginInfo originInfo={originInfo} />);

    expect(screen.getByText('Copyright date')).toBeInTheDocument();
    expect(screen.getByText('2020-06-15')).toBeInTheDocument();
  });

  it('renders other dates', () => {
    const originInfo = {
      dateOther: [
        {
          _type: 'accepted',
          year: { value: '2001' },
          __text: { en: 'Other date' },
        },
        {
          _type: 'inPress',
          year: { value: '2002' },
          __text: { en: 'Other date' },
        },
        {
          _type: 'online',
          year: { value: '2000' },
          __text: { en: 'Other date' },
        },
        {
          _type: 'retracted',
          year: { value: '2003' },
          __text: { en: 'Other date' },
        },
        {
          _type: 'submitted',
          year: { value: '2004' },
          __text: { en: 'Other date' },
        },
      ],
    } as OriginInfoGroup;

    render(<OriginInfo originInfo={originInfo} />);

    expect(screen.getByText('Other date (accepted)')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();
    expect(screen.getByText('Other date (inPress)')).toBeInTheDocument();
    expect(screen.getByText('2001')).toBeInTheDocument();
    expect(screen.getByText('Other date (online)')).toBeInTheDocument();
    expect(screen.getByText('2002')).toBeInTheDocument();
    expect(screen.getByText('Other date (retracted)')).toBeInTheDocument();
    expect(screen.getByText('2003')).toBeInTheDocument();
    expect(screen.getByText('Other date (submitted)')).toBeInTheDocument();
    expect(screen.getByText('2004')).toBeInTheDocument();
  });

  it('renders linked and unlinked publishers correctly', () => {
    const originInfo = {
      __text: { en: 'Origin info', sv: 'Ursprung' },
      name_otherType_publisher_type_corporate: [
        {
          __text: { en: 'Publisher', sv: 'Förlag' },
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
          __text: { en: 'Publisher', sv: 'Förlag' },
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
        {
          __text: { en: 'Publisher', sv: 'Förlag' },
          namePart_type_publisher: {
            value: 'Uncontrolled publisher1',
          },
        },
      ],
    } as OriginInfoGroup;

    render(<OriginInfo originInfo={originInfo} />);

    expect(screen.getByText('Publisher')).toBeInTheDocument();
    expect(screen.getByText('Linked publisher1')).toBeInTheDocument();
    expect(screen.getByText('Linked publisher2')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled publisher1')).toBeInTheDocument();
  });

  it('renders linked publisher name over uncontrolled', () => {
    const originInfo = {
      __text: { en: 'Origin info', sv: 'Ursprung' },
      name_otherType_publisher_type_corporate: [
        {
          __text: { en: 'Publisher', sv: 'Förlag' },
          namePart_type_publisher: { value: 'Uncontrolled name' },
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
