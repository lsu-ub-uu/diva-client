import type { RelatedItemBookGroup } from '@/generatedTypes/divaTypes';
import { useLanguage } from '@/i18n/useLanguage';
import { Term } from './Term';
import { href, Link } from 'react-router';
import { Series } from './Series';
import { formatIsbnIsmnLabel } from '../utils/format';
import { useId } from 'react';
import { TitleInfo } from './TitleInfo';
import { createTitle } from '../utils/createTitle';

interface BookProps {
  book: RelatedItemBookGroup | undefined;
}

export const Book = ({ book }: BookProps) => {
  const id = useId();
  const language = useLanguage();
  if (!book) {
    return null;
  }

  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{book?.__text?.[language]}</h2>
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
                {createTitle(book.book.linkedRecord.output.titleInfo)}
              </Link>
            }
          />
        )}
        <TitleInfo titleInfo={book.titleInfo} />
        <Term
          label={book.note_type_statementOfResponsibility?.__text[language]}
          value={book.note_type_statementOfResponsibility?.value}
        />
        {book.identifier_type_isbn?.map((identifier, index) => (
          <Term
            key={index}
            label={formatIsbnIsmnLabel(identifier, language)}
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
      {book.relatedItem_otherType_link_type_series?.map((series, index) => (
        <Series key={index} series={series} headlineLevel='h3' />
      ))}
      {book.relatedItem_otherType_text_type_series?.map((series, index) => (
        <Series key={index} series={series} headlineLevel='h3' />
      ))}
    </section>
  );
};
