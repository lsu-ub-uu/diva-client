import type { NamePersonGroup } from '@/generatedTypes/divaTypes';
import { Person } from './Person';
import { useLanguage } from '@/i18n/useLanguage';

interface AuthorsProps {
  authors: NamePersonGroup[] | undefined;
}
export const Authors = ({ authors }: AuthorsProps) => {
  const language = useLanguage();
  if (!authors || authors.length === 0) {
    return null;
  }

  return (
    <>
      <dt>{authors[0].__text[language]}</dt>
      {authors?.map((person, index) => (
        <dd key={index}>
          <Person person={person} key={index} />
        </dd>
      ))}
    </>
  );
};
