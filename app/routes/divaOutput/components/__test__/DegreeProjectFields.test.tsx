import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DegreeProjectFields } from '../DegreeProjectFields';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

describe('DegreeProjectFields', () => {
  it('should render with no data', () => {
    const output = {} as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);

    expect(screen.queryByRole('definition')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should render academic semester', () => {
    const output = {
      academicSemester: {
        __text: { en: 'Academic semester' },
        academicSemester: { value: 'ht' },
        year: { value: '2023' },
      },
    } as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Academic semester')).toBeInTheDocument();
    expect(screen.getByText('HT 2023')).toBeInTheDocument();
  });

  it('should render external collaboration', () => {
    const output = {
      externalCollaboration: {
        __text: { en: 'External collaboration' },
        namePart: [{ value: 'Company A' }, { value: 'Company B' }],
      },
    } as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('External collaboration')).toBeInTheDocument();
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
  });

  it('should render degree granting institution', () => {
    const output = {
      degreeGrantingInstitution_type_corporate: {
        __text: { en: 'Degree Granting Institution' },
        namePart: { value: 'University X' },
      },
    } as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Degree Granting Institution')).toBeInTheDocument();
    expect(screen.getByText('University X')).toBeInTheDocument();
  });

  it('should render thesis advisors', () => {
    const output = {
      name_otherType_thesisAdvisor_type_personal: [
        {
          __text: { en: 'Thesis Advisor' },
          namePart_type_family: { value: 'Doe' },
          namePart_type_given: { value: 'John' },
        },
        {
          __text: { en: 'Thesis Advisor' },
          namePart_type_family: { value: 'Smith' },
          namePart_type_given: { value: 'Jane' },
        },
      ],
    } as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Thesis Advisor')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render opponents', () => {
    const output = {
      name_otherType_opponent_type_personal: [
        {
          __text: { en: 'Opponent' },
          namePart_type_family: { value: 'Doe' },
          namePart_type_given: { value: 'John' },
        },
        {
          __text: { en: 'Opponent' },
          namePart_type_family: { value: 'Smith' },
          namePart_type_given: { value: 'Jane' },
        },
      ],
    } as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Opponent')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render degree supervisors', () => {
    const output = {
      name_otherType_degreeSupervisor_type_personal: [
        {
          __text: { en: 'Degree Supervisor' },
          namePart_type_family: { value: 'Doe' },
          namePart_type_given: { value: 'John' },
        },
        {
          __text: { en: 'Degree Supervisor' },
          namePart_type_family: { value: 'Smith' },
          namePart_type_given: { value: 'Jane' },
        },
      ],
    } as DivaOutputGroup;

    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Degree Supervisor')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should render defence event', () => {
    const output = {
      defence: {
        __text: { en: 'Defence' },
        dateOther_type_presentation: {
          year: { value: '2023' },
          month: { value: '05' },
          day: { value: '15' },
          hh: { value: '10' },
          mm: { value: '00' },
        },
        location: { value: 'Room 101' },
      },
    } as DivaOutputGroup;
    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Defence')).toBeInTheDocument();
    expect(screen.getByText('2023-05-15 10:00')).toBeInTheDocument();
    expect(screen.getByText('Room 101')).toBeInTheDocument();
  });

  it('should render presentation event', () => {
    const output = {
      presentation: {
        __text: { en: 'Presentation' },
        dateOther_type_presentation: {
          year: { value: '2023' },
          month: { value: '06' },
          day: { value: '20' },
          hh: { value: '14' },
          mm: { value: '30' },
        },
        location: { value: 'Auditorium' },
      },
    } as DivaOutputGroup;
    render(<DegreeProjectFields output={output} />);
    expect(screen.getByText('Presentation')).toBeInTheDocument();
    expect(screen.getByText('2023-06-20 14:30')).toBeInTheDocument();
    expect(screen.getByText('Auditorium')).toBeInTheDocument();
  });
});
