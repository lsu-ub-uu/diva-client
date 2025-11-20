import type {
  CourseUpdateGroup,
  ProgrammeUpdateGroup,
  StudentDegreeGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
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
          value={formatCourseOrProgramme(
            studentDegree.course?.linkedRecord.course,
            language,
          )}
        />
        <Term
          label={studentDegree.programme?.__text?.[language]}
          value={formatCourseOrProgramme(
            studentDegree.programme?.linkedRecord.programme,
            language,
          )}
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

const formatCourseOrProgramme = (
  courseOrProgramme: ProgrammeUpdateGroup | CourseUpdateGroup | undefined,
  language: 'sv' | 'en',
) => {
  if (!courseOrProgramme) return undefined;

  const topicSwedish = courseOrProgramme.authority_lang_swe?.topic?.value;
  const topicEnglish = courseOrProgramme.variant_lang_eng?.topic?.value;

  if (language === 'en' && topicEnglish) {
    return topicEnglish;
  }

  return topicSwedish;
};
