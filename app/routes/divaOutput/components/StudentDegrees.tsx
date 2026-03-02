import type { StudentDegreeGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import {
  getTitleForCourse,
  getTitleForProgramme,
} from '@/utils/getRecordTitle';
import { Term } from './Term';

interface StudentDegreeGroupProps {
  studentDegrees?: StudentDegreeGroup[];
}

export const StudentDegrees = ({ studentDegrees }: StudentDegreeGroupProps) => {
  const language = useLanguage();

  return studentDegrees?.map((studentDegree, index) => (
    <section key={index} aria-labelledby={`student-degree-${index}`}>
      <h2 id={`student-degree-${index}`}>{studentDegree.__text?.[language]}</h2>
      <dl>
        <Term
          label={studentDegree.course?.__text?.[language]}
          value={
            studentDegree.course?.linkedRecord
              ? getTitleForCourse(studentDegree.course?.linkedRecord, language)
              : studentDegree.course?.value
          }
        />
        <Term
          label={studentDegree.programme?.__text?.[language]}
          value={
            studentDegree.programme?.linkedRecord
              ? getTitleForProgramme(
                  studentDegree.programme?.linkedRecord,
                  language,
                )
              : studentDegree.programme?.value
          }
        />
        <Term
          label={studentDegree.degreeLevel?.__text?.[language]}
          value={studentDegree.degreeLevel?.__valueText?.[language]}
        />
        <Term
          label={studentDegree.universityPoints?.__text?.[language]}
          value={studentDegree.universityPoints?.__valueText?.[language]}
        />
      </dl>
    </section>
  ));
};
