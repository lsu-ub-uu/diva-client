import type {
  RelatedItemBookGroup,
  TitleInfoLangGroup,
} from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { href, Link } from 'react-router';

interface BookProps {
  book: RelatedItemBookGroup | undefined;
}

export const Book = ({ book }: BookProps) => {
  const language = useLanguage();
  if (!book) {
    return null;
  }

  return (
    <section aria-labelledby='book-heading'>
      <h2 id='book-heading'>{book?.__text?.[language]}</h2>
      <dl className='inline-definitions'>
        {book.book && (
          <Term
            label={book.book?.__text[language]}
            value={
              <Link
                to={href('/diva-output/:recordId', {
                  recordId: book.book.value,
                })}
              >
                {getTitle(book.book.linkedRecord.output.titleInfo)}
              </Link>
            }
          />
        )}
        <Term
          label={book.titleInfo?.__text[language]}
          value={getTitle(book.titleInfo)}
        />
        <Term
          label={book.note_type_statementOfResponsibility?.__text[language]}
          value={book.note_type_statementOfResponsibility?.value}
        />
        {book.identifier_type_isbn?.map((identifier, index) => (
          <Term
            key={index}
            label={`${identifier?.__text[language]} (${identifier._displayLabel})`}
            value={identifier.value}
          />
        ))}
        <Term
          label={book.identifier_type_doi?.__text[language]}
          value={book.identifier_type_doi?.value}
        />
        <Term
          label={book.part?.extent?.start?.__text[language]}
          value={book.part?.extent?.start?.value}
        />
        <Term
          label={book.part?.extent?.end?.__text[language]}
          value={book.part?.extent?.end?.value}
        />
      </dl>
    </section>
  );
};

const getTitle = (titleInfo: TitleInfoLangGroup | undefined) => {
  return [titleInfo?.title.value, titleInfo?.subtitle?.value]
    .filter(Boolean)
    .join(': ');
};
