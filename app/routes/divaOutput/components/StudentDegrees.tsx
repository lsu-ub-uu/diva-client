import type { StudentDegreeGroup } from '@/generatedTypes/divaTypes';
import { Term } from './Term';
import { useLanguage } from '@/i18n/useLanguage';

interface StudentDegreeGroupProps {
  studentDegrees?: StudentDegreeGroup[];
}

export const StudentDegrees = ({ studentDegrees }: StudentDegreeGroupProps) => {
  const language = useLanguage();
  return studentDegrees?.map((studentDegree) => (
    <>
      <h2>{studentDegree.__text[language]}</h2>
      <dl>
        <Term
          label={studentDegree.course?.__text[language]}
          value={studentDegree.course?.value} // TODO linked record
        />
        <Term
          label={studentDegree.degreeLevel?.__text[language]}
          value={studentDegree.degreeLevel?.__valueText[language]}
        />
        <Term
          label={studentDegree.universityPoints?.__text[language]}
          value={studentDegree.universityPoints?.__valueText[language]}
        />
        <Term
          label={studentDegree.programme?.__text[language]}
          value={studentDegree.programme?.value} // TODO linked record
        />
      </dl>
    </>
  ));
};
