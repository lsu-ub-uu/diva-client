import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DegreeProjectFields } from '../DegreeProjectFields';
import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';

describe('DegreeProjectFields', () => {
  it('should render with no data', async () => {
    const output = {} as DivaOutputGroup;

    const screen = await render(<DegreeProjectFields output={output} />);

    await expect(screen.baseElement.querySelector('dd')).toBeNull();
    await expect(
      screen.baseElement.querySelector('h1, h2, h3, h4, h5, h6'),
    ).toBeNull();
  });

  it('should render academic semester', async () => {
    const output = {
      academicSemester: {
        __text: { en: 'Academic semester' },
        academicSemester: { value: 'ht' },
        year: { value: '2023' },
      },
    } as DivaOutputGroup;

    const screen = await render(<DegreeProjectFields output={output} />);
    await expect(screen.getByText('Academic semester')).toBeVisible();
    await expect(screen.getByText('HT 2023')).toBeVisible();
  });

  it('should render external collaboration', async () => {
    const output = {
      name_otherType_externalCollaboration_type_corporate: [
        {
          __text: { en: 'External collaboration' },
          _type: 'corporate',
          _otherType: 'externalCollaboration',
          role: { roleTerm: { value: 'ctb' } },
          namePart: { value: 'Company A' },
          identifier_type_ror: { value: 'https://ror.org/123456789' },
        },
        {
          __text: { en: 'External collaboration' },
          _type: 'corporate',
          _otherType: 'externalCollaboration',
          role: { roleTerm: { value: 'ctb' } },
          namePart: { value: 'Company B' },
          identifier_type_ror: { value: 'https://ror.org/987654321' },
        },
      ],
    } as DivaOutputGroup;

    const screen = await render(<DegreeProjectFields output={output} />);
    await expect
      .element(screen.getByText('External collaboration'))
      .toBeVisible();
    await expect.element(screen.getByText('Company A')).toBeVisible();
    await expect.element(screen.getByText('Company B')).toBeVisible();
  });

  it('should render degree granting institution', async () => {
    const output = {
      name_otherType_degreeGrantingInstitution_type_corporate: {
        __text: { en: 'Degree Granting Institution' },
        namePart: { value: 'University X' },
      },
    } as DivaOutputGroup;

    const screen = await render(<DegreeProjectFields output={output} />);
    await expect
      .element(screen.getByText('Degree Granting Institution'))
      .toBeVisible();
    await expect.element(screen.getByText('University X')).toBeVisible();
  });

  it('should render thesis advisors', async () => {
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

    const screen = await render(<DegreeProjectFields output={output} />);
    await expect.element(screen.getByText('Thesis Advisor')).toBeVisible();
    await expect.element(screen.getByText('John Doe')).toBeVisible();
    await expect.element(screen.getByText('Jane Smith')).toBeVisible();
  });

  it('should render opponents', async () => {
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

    const screen = await render(<DegreeProjectFields output={output} />);
    await expect.element(screen.getByText('Opponent')).toBeVisible();
    await expect.element(screen.getByText('John Doe')).toBeVisible();
    await expect.element(screen.getByText('Jane Smith')).toBeVisible();
  });

  it('should render degree supervisors', async () => {
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

    const screen = await render(<DegreeProjectFields output={output} />);
    await expect.element(screen.getByText('Degree Supervisor')).toBeVisible();
    await expect.element(screen.getByText('John Doe')).toBeVisible();
    await expect.element(screen.getByText('Jane Smith')).toBeVisible();
  });

  it('should render presentation event', async () => {
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
        address: { location: { value: 'Auditorium' } },
      },
    } as DivaOutputGroup;
    const screen = await render(<DegreeProjectFields output={output} />);
    await expect.element(screen.getByText('Presentation')).toBeVisible();
    await expect.element(screen.getByText('2023-06-20 14:30')).toBeVisible();
    await expect.element(screen.getByText('Auditorium')).toBeVisible();
  });
});
