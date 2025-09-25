import { useLanguage } from '@/i18n/useLanguage';
import { Persons } from './Persons';
import { Organisation } from './Organisation';
import { Term } from './Term';
import { Event } from './Event';
import type { OutputUpdateGroup } from '@/generatedTypes/divaTypes';

interface DegreeProjectFieldsProps {
  output: OutputUpdateGroup;
}

export const DegreeProjectFields = ({ output }: DegreeProjectFieldsProps) => {
  const language = useLanguage();
  return (
    <>
      <Term
        label={output.academicSemester?.__text[language]}
        value={[
          output.academicSemester?.academicSemester?.value?.toUpperCase(),
          output.academicSemester?.year?.value,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {output.externalCollaboration && (
        <>
          <dt>{output.externalCollaboration.__text[language]}</dt>
          {output.externalCollaboration.namePart?.map((namePart, index) => (
            <dd key={index}>{namePart.value}</dd>
          ))}
        </>
      )}
      <Term
        label={
          output.degreeGrantingInstitution_type_corporate?.__text[language]
        }
        value={
          output.degreeGrantingInstitution_type_corporate && (
            <Organisation
              organisation={output.degreeGrantingInstitution_type_corporate}
            />
          )
        }
      />
      <Persons persons={output.supervisor_type_personal} />
      <Persons persons={output.examiner_type_personal} />
      <Persons persons={output.opponent_type_personal} />

      <Event event={output.defence} />
      <Event event={output.presentation} />
    </>
  );
};
